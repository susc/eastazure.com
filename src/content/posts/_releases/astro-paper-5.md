---
pubDatetime: 2025-03-08T08:18:19.693Z
title: AstroPaper 5.0
slug: astro-paper-v5
featured: false
ogImage: ../../../assets/images/AstroPaper-v5.png
tags:
  - release
description: "AstroPaper v5：外观依旧简洁，内部全面升级。"
---

期待已久的 AstroPaper v5 终于发布了。它保留了原有的极简、清爽外观，同时在内部实现上带来了大量重要更新。

![AstroPaper v5](@/assets/images/AstroPaper-v5.png)

## 目录

## 主要变更

### 升级到 Astro v5 [#455](https://github.com/satnaing/astro-paper/pull/455)

AstroPaper 现已升级到 Astro v5，可使用该版本带来的全部新功能和改进。

### Tailwind v4

AstroPaper 已升级到 Tailwind v4，因此底层样式发生了许多变化。`tailwind.config.js` 文件已被移除，所有配置现在都位于 `src/styles/global.css` 中。与排版相关的样式则被提取到 `src/styles/typography.css`。

由于 TailwindCSS v4 的新行为，组件 `<style>` 块中的样式已被移除，改用内联 Tailwind 类。

此外，整个界面的调色板也已更新。新调色板现在只包含五种颜色：

```css
:root,
html[data-theme="light"] {
  --background: #fdfdfd;
  --foreground: #282728;
  --accent: #006cac;
  --muted: #e6e6e6;
  --border: #ece9e9;
}

html[data-theme="dark"] {
  --background: #212737;
  --foreground: #eaedf3;
  --accent: #ff6b01;
  --muted: #343f60bf;
  --border: #ab4b08;
}
```

### 移除 React 和 Fuse.js，改用 Pagefind 搜索

此前版本使用 React.js 和 Fuse.js 实现搜索与 OG 图片生成功能。在 AstroPaper v5 中，React.js 已被移除，搜索功能改用静态网站搜索工具 [Pagefind](https://pagefind.app/)。

搜索体验与旧版本几乎相同，但借助 Pagefind，现在不只是标题和描述，文章的全部内容都可以建立索引并参与搜索。

在开发模式中使用 Pagefind 的思路来自[这篇博客文章](https://chrispennington.blog/blog/pagefind-static-search-for-astro-sites/)。

### 更新导入别名

导入别名由 `@directory` 改为 `@/directory`，现在需要按以下方式导入：

```astro
---
import { slugifyStr } from "@/utils/slugify";
import IconHash from "@/assets/icons/IconHash.svg";
---
```

### 改用 `pnpm`

AstroPaper 已从 `npm` 切换到 `pnpm`，从而获得更快速、更高效的包管理体验。

### 使用 Astro SVG 组件替代图标／SVG

AstroPaper v5 使用 Astro 的实验性 [SVG 组件](https://docs.astro.build/en/reference/experimental-flags/svg/)替代内联 SVG。这减少了在 `socialIcons` 对象中预定义 SVG 代码的需要，使代码库更加简洁、易于维护。

### 分离常量与配置

项目结构已经重新组织。`src/config.ts` 文件现在只包含保存项目主要配置的 `SITE` 对象。`LOCALE`、`SOCIALS` 和 `SHARE_LINKS` 等常量都已移动到 `src/constants.ts`。

## 其他值得关注的变更

- 博客文章目录从 `src/content/blog/` 改为 `src/data/blog/`；
- 集合定义文件 `src/content/config.ts` 被 `src/content.config.ts` 取代；
- 升级了多项依赖，以提升性能和安全性；
- 移除 `IBM Plex Mono` 字体，改用系统默认等宽字体；
- 更新了“返回”按钮逻辑。AstroPaper v5 不再调用浏览器 History API，而是使用会话存储临时保存返回 URL。如果会话中没有返回 URL，则跳转到首页；
- 另外还有一些细微的样式和布局调整。

## 结语

AstroPaper v5 带来了许多变化，但核心体验依然不变。在保留 AstroPaper 标志性简洁设计的同时，你可以享受更流畅、更高效的博客平台。

欢迎探索这些变化并分享你的看法。和往常一样，感谢你的支持！

如果你喜欢这个主题，请考虑为仓库点亮 Star。你也可以通过 GitHub Sponsors 或请我喝杯咖啡来支持我。当然，这些都完全出于自愿，并非必要。

祝你使用愉快！

[Sat Naing](https://satnaing.dev/)
