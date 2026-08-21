---
pubDatetime: 2026-05-17T07:15:45.792Z
title: AstroPaper 6.0
slug: astro-paper-v6
featured: true
ogImage: assets/AstroPaper-v6.png
tags:
  - release
description: "AstroPaper v6：基于 Astro v6、Tailwind v4 和全新配置系统的彻底重写。"
---

AstroPaper v6 基于 Astro v6、Tailwind CSS v4 和 TypeScript v6 完全重写。此版本使用统一配置文件替代旧的 `SITE`／`constants.ts` 配置，并对整个代码库的结构进行了多项改进。

![AstroPaper v6](assets/AstroPaper-v6.png)

## 目录

## 主要变更

### 升级到 Astro v6

AstroPaper 现在使用 Astro v6.3，其中包括：

- **稳定的 Content Layer API**——使用 `glob()` 加载器替代旧的 `type: "content"` 集合模式；
- **稳定的 Fonts API**——`experimental.fonts` 已升级为 `astro.config.ts` 中的顶层 `fonts` 配置项；
- **TypeScript v6**——完整支持最新的 TypeScript 编译器。

### 全新的统一配置系统

`src/config.ts` 中扁平的 `SITE` 对象和独立的 `constants.ts` 文件，已被项目根目录中的单一 `astro-paper.config.ts` 取代。使用 `defineAstroPaperConfig()` 可获得完整的智能提示：

```ts file="astro-paper.config.ts"
import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://your-site.com/",
    title: "AstroPaper",
    description: "…",
    author: "Your Name",
    lang: "en",
    timezone: "UTC",
    googleVerification: "your-verification-value",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000, // 毫秒
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: { enabled: true, url: "https://github.com/…/edit/main/" },
    search: "pagefind",
  },
  socials: [{ name: "github", url: "https://github.com/…" }],
  shareLinks: [{ name: "x", url: "https://x.com/intent/post?url=" }],
});
```

网站元数据、分页、功能开关、社交链接和分享链接等所有选项，现在都集中在一个文件中。

### 稳定的 Fonts API

字体配置已从 `experimental.fonts` 升级为 `astro.config.ts` 中的顶层 `fonts` 配置项，与 Astro v6 的稳定 API 保持一致：

```ts file="astro.config.ts"
export default defineConfig({
  fonts: [
    {
      name: "Google Sans Code",
      cssVariable: "--font-google-sans-code",
      provider: fontProviders.google(),
      weights: [300, 400, 500, 600, 700],
      styles: ["normal", "italic"],
    },
  ],
});
```

### MDX 支持

项目现已包含 `@astrojs/mdx`。文章可以使用 `.mdx` 扩展名，以便嵌入组件、使用 JSX 表达式或从其他文件导入内容。内容加载模式 `**/[^_]*.{md,mdx}` 会自动匹配两种格式。

### 重构内容集合

博客文章从 `src/data/blog/` 移动到 `src/content/posts/`，与 Astro 的约定保持一致。新的 `src/content/pages/` 集合用于存放“关于”等独立页面。`posts` 集合使用 Astro 的 `glob()` 加载器，不再使用带有 `type: "content"` 的 `defineCollection`：

```ts file="src/content.config.ts"
const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/posts" }),
  schema: ({ image }) =>
    z.object({
      author: z.string(),
      pubDatetime: z.date(),
      title: z.string(),
      tags: z.array(z.string()).default(["others"]),
      description: z.string(),
      // …
    }),
});
```

### 设计令牌系统

v5 的 5 色调色板在 `src/styles/theme.css` 中扩展为 7 个令牌。这些令牌以 CSS 自定义属性定义，并通过 `@theme inline` 注册到 Tailwind v4：

```css file="src/styles/theme.css"
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-border: var(--border);
}

:root,
[data-theme="light"] {
  --background: #fdfdfd;
  --foreground: #282728;
  --accent: #006cac;
  --accent-foreground: #ffffff;
  --muted: #e6e6e6;
  --muted-foreground: #6b7280;
  --border: #ece9e9;
}

[data-theme="dark"] {
  --background: #212737;
  --foreground: #eaedf3;
  --accent: #ff6b01;
  --accent-foreground: #ffffff;
  --muted: #343f60;
  --muted-foreground: #afb9ca;
  --border: #ab4b08;
}
```

`theme.css` 是一个由 `global.css` 导入的独立文件。新增的两个令牌是 `--accent-foreground` 和 `--muted-foreground`。

### 提取国际化字符串

所有界面字符串都被提取到 `src/i18n/lang/en.ts`，并通过 `UIStrings` 接口约束。添加新语言只需在 `src/i18n/lang/` 中新增一个文件：

```ts file="src/i18n/lang/en.ts"
export default {
  nav: { home: "Home", posts: "Posts" /* … */ },
  post: { publishedAt: "Published at" /* … */ },
  /* … */
} satisfies UIStrings;
```

`tplStr()` 辅助函数负责处理带参数的字符串，让译者可以自由调整占位符顺序。

### 支持基础路径和子目录部署

所有内部链接都通过 `getRelativeLocaleUrl()` 和 `withBase.ts` 辅助函数（`stripLocale`、`stripBase`、`getAssetPath`）处理。部署到子目录（例如 `/astro-paper`）时无需手动更新链接。

### 通过配置进行 Google 网站验证

推荐在 `astro-paper.config.ts` 中使用 `site.googleVerification` 设置 Google 网站验证：

```ts file="astro-paper.config.ts"
export default defineAstroPaperConfig({
  site: {
    // …
    googleVerification: "your-google-site-verification-value",
  },
});
```

如果不希望把验证值提交到配置文件，仍可使用 `PUBLIC_GOOGLE_SITE_VERIFICATION` 环境变量作为后备方案。

```bash file=".env"
PUBLIC_GOOGLE_SITE_VERIFICATION=your-google-site-verification-value
```

如果两者都已设置，优先使用 `site.googleVerification`。

## 其他值得关注的变更

- 更新并重命名多个辅助函数和工具函数；
- 相邻文章导航（上一篇／下一篇）现在只在 `getStaticPaths` 中计算一次并通过 props 传递，组件不再为每个页面获取全部文章；
- `_components/` 作用域：文章专用组件位于 `pages/posts/[...slug]/_components/` 下，不会混入全局 `src/components/` 目录；
- `PostLayout.astro` 只负责结构化数据和 SEO，文章页面逻辑保留在页面文件中。

## 总结

AstroPaper v6 保留了极简、清爽的外观，同时围绕 Astro v6 的新能力重建内部实现。配置系统更加简单，代码库更易浏览，并且开箱即用地支持国际化和子目录部署。

## 相关阅读

- [预设配色方案](/posts/predefined-color-schemes/)
- [如何配置 AstroPaper 主题](/posts/how-to-configure-astropaper-theme/)
- [在 AstroPaper 中添加新文章](/posts/adding-new-posts-in-astropaper-theme)
