---
author: Sat Naing
pubDatetime: 2023-09-25T10:25:54.547Z
title: AstroPaper 3.0
slug: astro-paper-v3
featured: false
ogImage: https://github.com/satnaing/astro-paper/assets/53733092/1ef0cf03-8137-4d67-ac81-84a032119e3a
tags:
  - release
description: "AstroPaper 3：借助 Astro v3 与无缝视图过渡提升网站体验。"
---

我们很高兴宣布 AstroPaper v3 正式发布！此版本包含多项新功能、增强和问题修复，将进一步提升你的 Web 开发体验。下面来看看本次发布的亮点。

![AstroPaper v3](@/assets/images/AstroPaper-v3.png)

## 目录

## 功能与变更

### 集成 Astro v3

<video autoplay loop="loop" muted="muted" plays-inline="true">
  <source src="https://github.com/satnaing/astro-paper/assets/53733092/18fdb604-1ca3-41a0-8372-1367759091ff" type="video/mp4">
  <!-- <source src="/assets/docs/astro-paper-v3-view-transitions-demo.mp4" type="video/mp4"> -->
</video>

AstroPaper 现在完整支持 [Astro v3](https://astro.build/blog/astro-3/)，拥有更好的性能和渲染速度。

此外，我们还加入了对 Astro [View Transitions API](https://docs.astro.build/en/guides/view-transitions/) 的支持，让你能够在不同视图之间创建生动流畅的动态过渡。

“最新文章”区域现在只显示非精选文章，以避免内容重复，并更好地支持 View Transitions API。

### 更新 OG 图片生成逻辑

![OG 图片示例](https://user-images.githubusercontent.com/40914272/269252964-a0dc6735-80f7-41ed-8e74-4d4d70f96891.png)

我们更新了自动生成 OG 图片的逻辑，使其更加可靠、高效。文章标题中的特殊字符现在也能得到支持，从而生成准确、灵活且醒目的社交媒体预览。

`SITE.ogImage` 现在是可选项。如果没有指定，AstroPaper 会使用 `SITE.title`、`SITE.desc` 和 `SITE.website` 自动生成 OG 图片。

### 主题色 Meta 标签

新增 `theme-color` Meta 标签，它会随主题切换动态调整，从而提供更连贯的用户体验。

> 请留意页面顶部的差异。

**_AstroPaper v2 主题切换_**

<video autoplay loop="loop" muted="muted" plays-inline="true">
  <source src="https://github.com/satnaing/astro-paper/assets/53733092/3ab5a1e8-1891-4264-a5bb-0ded69143c1a" type="video/mp4">
</video>

**_AstroPaper v3 主题切换_**

<video autoplay loop="loop" muted="muted" plays-inline="true">
  <source src="https://github.com/satnaing/astro-paper/assets/53733092/8ac9deb8-d1f8-4029-86bd-6aa0def380b4" type="video/mp4">
</video>

## 其他变更

### Astro Prettier 插件

项目默认安装 Astro Prettier 插件，帮助代码保持整洁有序。

### 细微样式调整

修复单行代码块换行问题，让代码片段显示得更加清晰。

更新导航样式 CSS，以便在导航栏中添加更多链接。

## 升级到 AstroPaper v3

> 本节仅适用于希望从旧版本升级到 AstroPaper v3 的用户。

下面将帮助你从 AstroPaper v2 迁移到 AstroPaper v3。

继续阅读前，你也可以先查看[这篇文章](https://astro-paper.pages.dev/posts/how-to-update-dependencies/)，了解如何升级依赖和 AstroPaper。

## 方案一：全新开始（推荐）

此版本包含大量变化，包括使用新 Astro API 替换旧 API、修复问题和增加新功能等。因此，如果你没有对主题进行太多定制，建议采用此方案。

**_第 1 步：保留所有已修改的文件_**

请务必保留你已经修改过的文件，包括：

- `/src/config.ts`（v3 中未修改）；
- `/src/styles/base.css`（v3 中有少量变更，见下文）；
- `/src/assets/`（v3 中未修改）；
- `/public/assets/`（v3 中未修改）；
- `/content/blog/`（这是你的博客内容目录 🤷🏻‍♂️）；
- 其他任何自定义文件。

```css
/* 文件：/src/styles/base.css */
@layer base {
  /* 其他代码 */
  ::-webkit-scrollbar-thumb:hover {
    @apply bg-skin-card-muted;
  }

  /* 旧代码
  code {
    white-space: pre;
    overflow: scroll;
  }
  */

  /* 新代码 */
  code,
  blockquote {
    word-wrap: break-word;
  }
  pre > code {
    white-space: pre;
  }
}

@layer components {
  /* 其他代码 */
}
```

**_第 2 步：将其余内容替换为 AstroPaper v3_**

除上述文件／目录和其他自定义内容外，将其余所有内容替换为 AstroPaper v3。

**_第 3 步：更新 Schema_**

请注意，`/src/content/_schemas.ts` 已被 `/src/content/config.ts` 替代。

此外，`/src/content/config.ts` 不再导出 `BlogFrontmatter` 类型。

因此，文件中的所有 `BlogFrontmatter` 类型都需要改为 `CollectionEntry<"blog">["data"]`。

以 `src/components/Card.tsx` 为例：

```ts
// AstroPaper v2
import type { BlogFrontmatter } from "@content/_schemas";

export interface Props {
  href?: string;
  frontmatter: BlogFrontmatter;
  secHeading?: boolean;
}
```

```ts
// AstroPaper v3
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}
```

## 方案二：使用 Git 升级

大多数用户不建议采用此方案。如果条件允许，请使用“方案一”。只有在你清楚自己在做什么，并且能够解决合并冲突时才使用此方案。

我已经针对这种情况写过一篇文章，可以[在这里查看](https://astro-paper.pages.dev/posts/how-to-update-dependencies/#updating-astropaper-using-git)。

## 结语

准备好体验 AstroPaper v3 令人兴奋的新功能和改进了吗？现在就开始[使用 AstroPaper](https://github.com/satnaing/astro-paper) 吧。

其他问题修复和集成更新，请查看[发布说明](https://github.com/satnaing/astro-paper/releases/tag/v3.0.0)。

如果你遇到问题或在升级过程中碰到困难，欢迎在 [GitHub](https://github.com/satnaing/astro-paper) 上提交 Issue 或发起讨论。
