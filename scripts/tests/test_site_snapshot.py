import contextlib
import importlib.util
import io
import tempfile
import threading
import unittest
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

spec = importlib.util.spec_from_file_location('snapshot', Path(__file__).parents[1] / 'site-snapshot.py')
snapshot = importlib.util.module_from_spec(spec)
spec.loader.exec_module(snapshot)


class SnapshotTest(unittest.TestCase):
    def test_backup_can_be_read_and_missing_pages_fail(self):
        class Handler(BaseHTTPRequestHandler):
            broken = False

            def do_GET(self):
                if self.broken and self.path == '/about':
                    self.send_error(404)
                    return
                if self.path == '/sitemap.xml':
                    body = ('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + ''.join(f'<url><loc>https://canonical.example/post/{i}</loc></url>' for i in range(10)) + '</urlset>').encode()
                    kind = 'application/xml'
                else:
                    body, kind = b'<html>YANG Yi <img src="/images/photo.webp"></html>', 'text/html'
                self.send_response(200)
                self.send_header('Content-Type', kind)
                self.end_headers()
                self.wfile.write(body)

            def log_message(self, *args):
                pass

        server = ThreadingHTTPServer(('127.0.0.1', 0), Handler)
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        try:
            with tempfile.TemporaryDirectory() as target, contextlib.redirect_stdout(io.StringIO()):
                origin = f'http://127.0.0.1:{server.server_port}'
                snapshot.run(origin, target)
                self.assertIn('YANG', (Path(target) / 'site/about/index.html').read_text())
                self.assertTrue((Path(target) / 'manifest.json').is_file())
                Handler.broken = True
                with self.assertRaises(SystemExit):
                    snapshot.run(origin)
        finally:
            server.shutdown()
            server.server_close()


if __name__ == '__main__':
    unittest.main()
