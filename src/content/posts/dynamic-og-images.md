---
author: Sat Naing
pubDatetime: 2022-12-28T04:59:04.866Z
modDatetime: 2026-06-03T00:00:00.000Z
title: 在 AstroPaper 博客文章中动态生成 OG 图片
slug: dynamic-og-image-generation-in-astropaper-blog-posts
featured: false
draft: false
tags:
  - docs
  - release
description: AstroPaper v1.4.0 的新功能：为博客文章动态生成 OG 图片。
---

AstroPaper v1.4.0 引入了一项新功能：为博客文章动态生成 OG 图片。

![在 AstroPaper 博客文章中动态生成 OG 图片](/posts/dynamic-og-image-generation-in-astropaper-blog-posts/index.png)

## 目录

## 简介

OG 图片（也称社交分享图片）对社交媒体传播非常重要。如果你不清楚 OG 图片是什么，它就是我们在 Facebook、Discord 等社交媒体上分享网站链接时显示的预览图片。

> 严格来说，Twitter 使用的社交图片并不叫 OG 图片。不过在本文中，我会用“OG 图片”统称各种社交分享图片。

## 默认／静态 OG 图片（旧方式）

AstroPaper 原本就支持为博客文章添加 OG 图片。作者可以在 frontmatter 的 `ogImage` 字段中指定图片。即使没有指定，也会使用默认 OG 图片作为后备方案（本项目中为 `public/default-og.jpg`）。但默认图片是静态的，这意味着所有未单独配置 OG 图片的文章都会使用同一张图片，无法体现各篇文章在标题和内容上的差异。

## 动态 OG 图片

为每篇文章动态生成 OG 图片后，作者就不必逐篇指定图片，同时也能避免所有文章使用完全相同的后备图片。

AstroPaper v1.4.0 使用 Vercel 的 [Satori](https://github.com/vercel/satori) 包动态生成 OG 图片。

AstroPaper v6 及更高版本仍沿用相同思路：先由 Satori 渲染 SVG，再通过 [Sharp](https://sharp.pixelplumbing.com/) 生成 PNG。不过字体改为从 Astro 的 **Fonts** 配置获取，并通过 [`experimental_getFontFileURL()`](https://astro.build/blog/astro-620/) 加载，让 OG 图片生成和网站共用同一套字体处理流程。

构建时会为符合以下条件的博客文章生成动态 OG 图片：

- frontmatter 中没有设置 OG 图片；
- 未标记为草稿。

## AstroPaper 动态 OG 图片的组成

动态 OG 图片包含*文章标题*、*作者姓名*和*网站标题*。作者姓名和网站标题分别取自 `astro-paper.config.ts` 中的 `site.author` 与 `site.title`，文章标题则取自 frontmatter 的 `title`。

![动态 OG 图片示例](https://user-images.githubusercontent.com/53733092/209704501-e9c2236a-3f4d-4c67-bab3-025aebd63382.png)

### 非拉丁字符的问题

> [!CAUTION]
> 默认情况下，包含非拉丁字符的标题可能无法正确显示。请将 Google 字体切换为覆盖目标书写系统的字体，并同时包含 `400` 和 `700` 两种字重。Satori 会分别使用常规与粗体的字体数据，缺少任意一种都会导致渲染不一致。

```ts file="astro.config.ts"
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  fonts: [
    {
      // 示例：支持日文（请根据受众选择合适的字体）
      name: "Noto Sans JP",
      cssVariable: "--font-google-sans-code",
      provider: fontProviders.google(),
      fallbacks: ["monospace"],
      weights: [400, 700],
      styles: ["normal", "italic"],
      formats: ["woff", "ttf"],
    },
  ],
});
```

如果修改了 `cssVariable`，还要同步更新以下文件中的对应键名：

- `src/pages/og.png.ts`
- `src/pages/posts/[...slug]/index.png.ts`

> 更多信息请参阅[这个 PR](https://github.com/satnaing/astro-paper/pull/318)。

> [!WARNING] 注意事项
>
> - **构建时间**会随内容数量增加——构建时会为每篇符合条件的文章生成一张 PNG。v6 中的生成速度已有提升（PR [#632](https://github.com/satnaing/astro-paper/pull/632)），但对于超大型网站，你可以在 `astro-paper.config.ts` 中设置 `features.dynamicOgImage: false` 来关闭此功能。
> - 暂不支持**从右到左（RTL）的语言**。
> - 标题中的 **Emoji** 可能比较棘手，部分字符可能无法正确渲染。
