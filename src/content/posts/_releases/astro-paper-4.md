---
author: Sat Naing
pubDatetime: 2024-01-04T09:30:41.816Z
title: AstroPaper 4.0
slug: "astro-paper-v4"
featured: false
ogImage: ../../../assets/images/AstroPaper-v4.png
tags:
  - release
description: "AstroPaper v4：带来更流畅、功能更丰富的博客体验。"
---

大家好！祝各位新年快乐 🎉，愿 2024 年一切顺利！我们很高兴宣布 AstroPaper v4 正式发布。这是一次重要更新，带来一系列新功能、改进和问题修复，将进一步提升你的博客体验。衷心感谢所有贡献者，是大家宝贵的建议和付出促成了 v4 的诞生！

![AstroPaper v4](@/assets/images/AstroPaper-v4.png)

## 目录

## 主要变更

### 升级到 Astro v4 [#202](https://github.com/satnaing/astro-paper/pull/202)

AstroPaper 现在充分利用 Astro v4 的能力。不过，这是一次平稳升级，对大多数 Astro 用户不会造成破坏性影响。

![Astro v4](https://astro.build/_astro/header-astro-4.YunweN9V_OmV0l.webp)

### 使用 Astro Content 的 `slug` 替代 `postSlug` [#197](https://github.com/satnaing/astro-paper/pull/197)

AstroPaper v4 的博客内容 schema 不再提供 `postSlug`。早期 Astro 没有 `slug` 机制，因此我们只能自行实现。从 Astro v3 开始，框架已支持内容集合和 slug 功能，现在是时候采用 Astro 开箱即用的 `slug` 了。

**_文件：src/content/blog/astro-paper-4.md_**

```bash
---
author: Sat Naing
pubDatetime: 2024-01-01T04:35:33.428Z
title: AstroPaper 4.0
slug: "astro-paper-v4" # 未指定 slug 时，将使用文件名 astro-paper-4
# slug: "" ❌ 不能是空字符串
---
```

`slug` 的行为现在略有不同。在旧版 AstroPaper 中，如果博客文章未指定 `postSlug`，系统会把文章标题转换为 slug。AstroPaper v4 则会在未指定 `slug` 字段时使用 Markdown 文件名。需要注意：`slug` 字段可以省略，但不能是空字符串（`slug: ""` ❌）。

如果要从 AstroPaper v3 升级到 v4，请务必将 `src/content/blog/*.md` 文件中的 `postSlug` 替换为 `slug`。

## 新功能

### 添加内容创作代码片段 [#206](https://github.com/satnaing/astro-paper/pull/206)

AstroPaper 现在内置新博客文章的 VS Code 代码片段，不再需要手动复制粘贴 frontmatter 和内容结构（目录、标题、摘要等）。

有关 VS Code Snippets 的更多信息，请参阅[此文档](https://code.visualstudio.com/docs/editor/userdefinedsnippets#:~:text=In%20Visual%20Studio%20Code%2C%20snippets,Snippet%20in%20the%20Command%20Palette)。

<video autoplay muted="muted" controls plays-inline="true" class="border border-skin-line">
  <source src="https://github.com/satnaing/astro-paper/assets/53733092/136f1903-bade-40a2-b6bb-285a3c726350" type="video/mp4">
</video>

### 在博客文章中显示修改时间 [#195](https://github.com/satnaing/astro-paper/pull/195)

通过显示文章的修改时间，让读者了解最新更新。这不仅能增强读者对内容时效性的信任，也有助于改善博客 SEO。

![AstroPaper 的最后修改时间功能](https://github.com/satnaing/astro-paper/assets/53733092/cc89585e-148e-444d-9da1-0d496e867175)

修改博客文章后，可以为其添加 `modDatetime`。文章的排序方式也略有变化：所有文章会同时根据 `pubDatetime` 和 `modDatetime` 排序。如果一篇文章同时包含两者，则由 `modDatetime` 决定排序位置；否则只使用 `pubDatetime`。

### 实现返回顶部按钮 [#188](https://github.com/satnaing/astro-paper/pull/188)

新增返回顶部按钮，改善博客文章详情页中的导航体验。

![AstroPaper 中的返回顶部按钮](https://github.com/satnaing/astro-paper/assets/53733092/79854957-7877-4f19-936e-ad994b772074)

### 为标签文章添加分页 [#201](https://github.com/satnaing/astro-paper/pull/201)

标签文章现在支持分页，内容组织和导航更加清晰，用户也更容易浏览相关内容。当某个标签下有大量文章时，读者不会再被所有内容一次性淹没。

<video autoplay loop="loop" muted="muted" plays-inline="true" class="border border-skin-line">
  <source src="https://github.com/satnaing/astro-paper/assets/53733092/9bad87f5-dcf5-4b79-b67a-d6c7244cd616" type="video/mp4">
</video>

### 动态生成 robots.txt [#130](https://github.com/satnaing/astro-paper/pull/130)

AstroPaper v4 现在会动态生成 `robots.txt`，让你更好地控制搜索引擎索引和网页抓取。站点地图 URL 也会被加入 `robots.txt` 文件。

### 添加 Docker Compose 文件 [#174](https://github.com/satnaing/astro-paper/pull/174)

新增 Docker Compose 文件，简化部署和配置，让 AstroPaper 环境管理比以往更加轻松。

## 重构与问题修复

### 使用未 Slug 化的标签名称替代 Slug 化标题 [#198](https://github.com/satnaing/astro-paper/pull/198)

为了提升清晰度、用户体验和 SEO，标签页面的标题不再显示为 Slug 化形式（`Tag: some-tag`），而会显示为正常名称（`Tag: Some Tag`）。

![未 Slug 化的标签名称](https://github.com/satnaing/astro-paper/assets/53733092/2fe90d6e-ec52-467b-9c44-95009b3ae0b7)

### 使用 100svh 设置最小高度（[79d569d](https://github.com/satnaing/astro-paper/commit/79d569d053036f2113519f41b0d257523d035b76)）

页面 `body` 的最小高度已改为 `100svh`，为移动端用户提供更好的体验。

### 将站点 URL 设为单一事实来源 [#143](https://github.com/satnaing/astro-paper/pull/143)

站点 URL 现在只有一个配置来源，从而简化配置并避免不一致。详情请阅读[此 PR](https://github.com/satnaing/astro-paper/pull/143) 及其关联 Issue。

### 解决浅色模式下代码块文本不可见的问题 [#163](https://github.com/satnaing/astro-paper/pull/163)

修复浅色模式下代码块文本不可见的问题。

### 解码面包屑中的 Unicode 标签字符 [#175](https://github.com/satnaing/astro-paper/pull/175)

面包屑中标签的最后一部分现在会进行解码，从而更好地显示非英文 Unicode 字符。

### 扩展 LOCALE 配置支持范围（[cd02b04](https://github.com/satnaing/astro-paper/commit/cd02b047d2b5e3b4a2940c0ff30568cdebcec0b8)）

LOCALE 配置已更新，可覆盖更广泛的区域设置，为更多样化的受众提供支持。

## 结语

我们相信这些更新会显著提升你的 AstroPaper 使用体验。感谢所有为 AstroPaper 贡献代码、解决问题和点亮 Star 的朋友。期待看到你使用 AstroPaper v4 创作的精彩内容！

祝写作愉快！

[Sat Naing](https://satnaing.dev) <br/>
AstroPaper 创建者
