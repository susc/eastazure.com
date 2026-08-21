---
author: Sat Naing
pubDatetime: 2023-01-30T15:57:52.737Z
title: AstroPaper 2.0
slug: astro-paper-2
featured: false
ogImage: https://user-images.githubusercontent.com/53733092/215771435-25408246-2309-4f8b-a781-1f3d93bdf0ec.png
tags:
  - release
description: AstroPaper 结合 Astro v2 带来的增强功能，包括类型安全的 Markdown 内容、问题修复和更好的开发体验等。
---

Astro 2.0 已经发布，带来了许多出色的新功能、破坏性变更、开发体验改进和更完善的错误提示等。AstroPaper 充分利用了这些能力，尤其是 Content Collections API。

<!-- ![AstroPaper 2.0 正式发布](https://user-images.githubusercontent.com/53733092/215683840-dc2502f5-8c5a-44f0-a26c-4e7180455056.png) -->

![AstroPaper 2.0 正式发布](https://user-images.githubusercontent.com/53733092/215771435-25408246-2309-4f8b-a781-1f3d93bdf0ec.png)

## 目录

## 功能与变更

### 类型安全的 Frontmatter 与重新定义的博客 Schema

得益于 Astro 的 Content Collections，AstroPaper 2.0 中 Markdown 内容的 frontmatter 现在具备类型安全。博客 schema 定义在 `src/content/_schemas.ts` 文件中。

### 博客内容的新位置

所有博客文章都从 `src/contents` 目录移动到了 `src/content/blog`。

### 新的内容获取 API

现在通过 `getCollection` 函数获取内容，不再需要指定内容文件的相对路径。

```ts
// 旧的内容获取方式
- const postImportResult = import.meta.glob<MarkdownInstance<Frontmatter>>(
  "../contents/**/**/*.md",);

// 新的内容获取方式
+ const postImportResult = await getCollection("blog");
```

### 改进搜索逻辑，获得更好的搜索结果

在旧版 AstroPaper 中，搜索文章时会匹配 `title`、`description` 和 `headings`（即文章中的 h1～h6 标题）。在 AstroPaper v2 中，用户输入时只会搜索 `title` 和 `description`。

### Frontmatter 属性重命名

以下 frontmatter 属性已重命名：

| 旧名称   | 新名称      |
| -------- | ----------- |
| datetime | pubDatetime |
| slug     | postSlug    |

### 博客文章的默认标签

如果文章没有任何标签（即未指定 frontmatter 的 `tags` 属性），系统会使用默认标签 `others`。你也可以在 `/src/content/_schemas.ts` 文件中修改默认标签。

```ts
// src/contents/_schemas.ts
export const blogSchema = z.object({
  // ---
  // 将 "others" 替换为你想使用的值
  tags: z.array(z.string()).default(["others"]),
  ogImage: z.string().optional(),
  description: z.string(),
});
```

### 新增预设深色配色

AstroPaper v2 新增了一套基于 Astro 深色 Logo 的深色配色方案，包含高对比度和低对比度两个版本。更多信息请查看[此链接](https://astro-paper.pages.dev/posts/predefined-color-schemes#astro-dark)。

![新的预设深色配色](https://user-images.githubusercontent.com/53733092/215680520-59427bb0-f4cb-48c0-bccc-f182a428d72d.svg)

### 自动排序 CSS 类

AstroPaper 2.0 通过 [TailwindCSS Prettier 插件](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier)支持自动排序 CSS 类。

### 更新文档与 README

所有 [#docs](https://astro-paper.pages.dev/tags/docs/) 博客文章和 [README](https://github.com/satnaing/astro-paper#readme) 都已针对 AstroPaper v2 更新。

## 问题修复

- 修复博客文章页面中损坏的标签；
- 在标签页面中，将面包屑最后一部分统一改为小写；
- 在标签页面中排除草稿文章；
- 修复页面重新加载后 `onChange` 的值不更新的问题。
