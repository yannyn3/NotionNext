#!/usr/bin/env python3
"""Check the public blog or save a portable snapshot; never reads private Notion data."""
import argparse
import concurrent.futures
import hashlib
import json
import re
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path


def fetch(url):
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'YANG-Yi-Site-Backup/1.0'})
            with urllib.request.urlopen(req, timeout=40) as response:
                if response.status != 200:
                    raise ValueError(f'HTTP {response.status}')
                return response.read(), response.headers.get_content_type()
        except Exception:
            if attempt == 2:
                raise
            time.sleep(2)


def run(origin, output=None):
    origin = origin.rstrip('/')
    sitemap, _ = fetch(origin + '/sitemap.xml')
    root = ET.fromstring(sitemap)
    urls = {origin + suffix for suffix in ['/', '/about', '/robots.txt', '/sitemap.xml', '/rss/feed.xml', '/llms.txt']}
    for entry in root.findall('{*}url/{*}loc'):
        parsed = urllib.parse.urlsplit(entry.text)
        # Sitemap canonical host may differ for local recovery verification.
        urls.add(origin + (parsed.path or '/') + ('?' + parsed.query if parsed.query else ''))
    if len(urls) < 10:
        raise ValueError('Sitemap unexpectedly contains fewer than 10 pages')
    manifest = {'origin': origin, 'created_utc': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()), 'files': [], 'errors': []}
    assets = set()

    def save(url):
        body, content_type = fetch(url)
        path = urllib.parse.urlsplit(url).path
        if path == '/' and b'YANG' not in body:
            raise ValueError('Homepage is missing the expected site identity')
        if content_type == 'text/html':
            for value in re.findall(rb'(?:src|href)=[\"\']([^\"\']+)', body):
                candidate = urllib.parse.urljoin(url, value.decode('utf-8', errors='ignore'))
                parsed = urllib.parse.urlsplit(candidate)
                if parsed.netloc == urllib.parse.urlsplit(origin).netloc and parsed.path.startswith(('/_next/static/', '/images/')):
                    assets.add(origin + parsed.path)
        record = {'url': url, 'bytes': len(body), 'sha256': hashlib.sha256(body).hexdigest()}
        if output:
            parts = [part for part in path.split('/') if part and part not in ('.', '..')]
            target = Path(output).joinpath('site', *parts)
            if content_type == 'text/html':
                target = target / 'index.html'
            elif path.endswith('/'):
                target = target / 'index'
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(body)
            record['file'] = str(target.relative_to(output))
        return record

    def batch(targets):
        with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
            futures = {pool.submit(save, url): url for url in targets}
            for future in concurrent.futures.as_completed(futures):
                url = futures[future]
                try:
                    manifest['files'].append(future.result())
                except Exception as exc:
                    manifest['errors'].append({'url': url, 'error': str(exc)})
    batch(urls)
    if output:
        batch(sorted(assets - urls))
        Path(output).mkdir(parents=True, exist_ok=True)
        (Path(output) / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2))
    print(json.dumps({'checked': len(manifest['files']), 'errors': manifest['errors']}, ensure_ascii=False))
    if manifest['errors']:
        raise SystemExit(1)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--origin', default='https://yannyi.com')
    parser.add_argument('--output')
    args = parser.parse_args()
    run(args.origin, args.output)
