# YANG 易：更新、备份与恢复

## 当前部署

域名 https://yannyi.com；仓库 yannyn3/NotionNext；Vercel 项目 printyang0gmailcoms-projects/notion-next。Notion 主数据库 ID：bb79b4f17450416bad4fe01b249cb529。Notion 配置中心优先级高于环境变量。

## 更新规则

每日 08:00（上海）检查 notionnext-org/NotionNext 上游。更新仅合并到 codex/upstream-update，运行 lint、类型、单元测试与真实数据库构建，通过后创建待审核 PR。main 不自动更新。冲突或检查失败时保留现有生产版本；如果已有更新 PR，先处理它再准备下一批。

GitHub 的 GITHUB_TOKEN 创建的 PR 检查可能需要人工批准运行，因此同步流程自行执行检查。仓库若禁止 Actions 创建 PR，更新分支仍会保留，可手动创建 PR。应查看 Actions 中 Upstream Sync 的实际结果，不能把“定时运行”当成“更新成功”。

## 备份

- Blog backup：每日 08:30（上海）保存完整 main 历史 Git bundle、已发布网站 HTML、RSS、地图和本站图片/脚本等静态资源。结果位于 GitHub Actions 的 Artifacts，保留 90 天；Actions 定时执行可能延迟。
- 2026-11-02 的独立副本位于作者 iCloud 笔记库“博客备份/2026-11-02”，包含通过验证的 NotionNext.bundle、56 个 Notion 已发布文章/页面/公告文本及网站快照。它不在公开仓库内。
- 网站快照是公开内容的归档，不包含草稿、登录权限、支付资料或 Vercel 密钥；第三方远程媒体、Notion 附件二进制和 Notion 原生数据库视图并不构成完整导出。建议每月在 Notion 导出一次整个博客数据库（Markdown/CSV 并包含子页面和附件），存入个人云盘。
- Artifacts 在同一个 GitHub 账号内，不能替代异地副本。每月下载一份到个人云盘；重要改版前另留 Git 分支/标签和 Vercel 已成功部署记录。
- Vercel 环境变量应保存在个人密码管理器内，不要放进公开 Git 仓库。域名续费与 Google/Notion/GitHub/Vercel 账号恢复方式也需由站主维护。

## 监控

Blog availability 每小时检查首页、站点地图、公开文章、关于页和订阅接口。失败会显示为 GitHub Actions 失败；在 GitHub 个人通知设置中启用 Actions 失败通知。该检查依赖 GitHub，且不是实时独立监控，也不自动回滚生产。

## 故障恢复

1. 更新代码后出错：在 Vercel Deployments 中找到上一条已成功的 Production 部署，使用 Instant Rollback；随后在 GitHub 撤回故障提交。回滚不会恢复 Notion 内容更改，Notion 配置需要单独恢复。
2. 上游项目改名、停更或删除：自己的 fork/代码副本仍可部署，现有网站不会因为上游消失自动删除。停止上游更新，继续维护自己的 main；后续迁移时保留域名和文章 URL。
3. 自己的 GitHub 仓库丢失：独立副本用 `git clone -b main NotionNext.bundle NotionNext`，Actions 副本用 `git clone -b backup-main NotionNext.bundle NotionNext`，然后在克隆目录执行 `git branch -M main`；新建仓库并推送 main，再把 Vercel 项目连接到新仓库。核对 NOTION_PAGE_ID、域名与环境变量。
4. Notion 临时中断：首页与关于页生成失败会抛错，保留已有静态版本；缓存未命中的文章仍可能受影响。等待服务恢复后重试。不要为了恢复访问把整个数据库改成公开或删除数据。
5. Notion 内容误删：先用 Notion 页面历史或回收站恢复；仍无法恢复时，用独立 Markdown/CSV/附件备份导入，核对 slug、category、status 与日期。
6. 验证恢复：运行 `python3 scripts/site-snapshot.py --origin https://yannyi.com`；核对文章总数、旧网址、站名、封面、站点地图和 RSS。首次恢复后先用 Vercel Preview 测试再绑定正式域名。

## 广告

Google AdSense 发布商：ca-pub-9685210659641794。Notion ADSENSE_GOOGLE_ID 控制广告脚本；ads.txt 声明对应发布商。采用 Google 自动广告，手动广告单元不要使用模板 ID。审核通过、政策状态、流量与平台投放均由 Google 决定。不要点击自己的广告。

## 无法保证的部分

以上降低更新风险并缩短恢复时间，不承诺零故障、零数据损失、固定恢复时限或 AdSense/搜索审核结果。Vercel、Notion、GitHub、DNS 和第三方服务的故障、账号权限与套餐变化仍可能影响网站。
