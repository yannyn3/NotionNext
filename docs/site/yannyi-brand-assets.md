# YANG 易：站点视觉与维护

主色：陶土 #995b3d；背景：暖米色 #f7f2ea；卡片：#fdfaf5。深色模式使用暖灰与浅陶土。

Notion 配置中心控制 TITLE、AUTHOR、BIO、AUTHOR_INTRO、AVATAR、OG_IMAGE、BLOG_FAVICON 和 FUWARI_COLOR_*。文章已有有效封面优先；缺图、退役的 source.unsplash.com 地址或加载失败时，Fuwari 使用站内分类插图。该功能是自动匹配已生成图片，不会为每篇文章自动调用付费生成服务。

## 本地素材

- public/images/yang-yi-mark.svg：代码绘制的 Y 字母标记。
- public/images/yang-yi-share.png：1200×630 社交分享图。
- public/images/covers/technology.webp：AI、代码与工具主题。
- public/images/covers/learning.webp：阅读、写作与学习主题。
- public/images/covers/life.webp：生活与其他主题。

## 图片生成提示词

三张封面均由原生图像生成工具创建，统一提示模板如下：

ONE polished landscape 16:9 editorial image for Chinese personal blog YANG 易. [subject]. Cohesive warm ivory, clay terracotta and muted sage, refined natural textures, natural magazine photography, slightly dreamy, thumbnail-readable, no text/logos/people/UI/watermarks.

Subjects:
- Learning: an open notebook and books, olive branch, warm window light.
- Technology: a minimal laptop with translucent geometric objects, thoughtful creative workspace.
- Life: a terracotta arch, olive tree and distant rolling hills.

输出经 Sharp 转为 960×540 WebP，quality 80。保留新的 Notion 封面即可覆盖默认插图。

## 搜索与发布

站点输出规范链接、Open Graph、Person/WebSite/BlogPosting/ProfilePage JSON-LD、robots.txt、sitemap.xml、RSS 和 llms.txt。这些帮助访问与理解内容，不保证收录、排名或 AI 引用。Google 验证码只能使用 Search Console 签发的实际值。

现有文章网址和真实日期应保持稳定；缺失日期需作者核实。GitHub main 触发 Vercel 生产部署；上游同步工作流每日 08:00（上海）执行。
