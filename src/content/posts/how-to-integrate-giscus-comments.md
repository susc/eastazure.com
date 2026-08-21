---
author: FjellOverflow
pubDatetime: 2024-07-25T11:11:53Z
modDatetime: 2025-03-12T12:28:53Z
title: 如何为 AstroPaper 集成 Giscus 评论
slug: how-to-integrate-giscus-comments
featured: false
draft: false
tags:
  - astro
  - blog
  - docs
description: 使用 Giscus 为托管在 GitHub Pages 上的静态博客添加评论功能。
---

将轻量静态博客托管在 [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) 等平台上有很多优势，但也会失去一些交互能力。幸运的是，[Giscus](https://giscus.app/) 可以让我们在静态网站中嵌入用户评论。

## 目录

## Giscus 的工作原理

[Giscus 使用 GitHub API](https://github.com/giscus/giscus?tab=readme-ov-file#how-it-works)，在仓库关联的 `Discussions` 中读取和存储 GitHub 用户发表的评论。

只需在网站中嵌入 Giscus 客户端脚本，并配置正确的仓库 URL，已登录 GitHub 的用户就可以查看和发表评论。

这种方式不需要服务器：评论存储在 GitHub 上，并由客户端动态加载，因此非常适合 AstroPaper 这样的静态博客。

## 设置 Giscus

你可以在 [giscus.app](https://giscus.app/) 上轻松完成设置，下面简要介绍整个流程。

### 前提条件

使用 Giscus 需要满足以下条件：

- 仓库必须是[公开仓库](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility#making-a-repository-public)；
- 已安装 [Giscus 应用](https://github.com/apps/giscus)；
- 仓库已启用 [Discussions](https://docs.github.com/en/github/administering-a-repository/managing-repository-settings/enabling-or-disabling-github-discussions-for-a-repository) 功能。

如果由于某种原因无法满足任意一项条件，就无法集成 Giscus。

### 配置 Giscus

接下来需要配置 Giscus。大多数情况下，默认选项已经足够，只有在有明确需求并了解其作用时才需要修改。即使选错也不必担心，之后随时可以调整。

不过，你必须：

- 为界面选择正确的语言；
- 指定要连接的 GitHub 仓库，通常就是在 GitHub Pages 上托管 AstroPaper 博客的仓库；
- 如果不希望他人直接在 GitHub 上随意创建评论，可以创建并选择一个 `Announcement` 类型的 Discussion；
- 定义配色方案。

完成配置后，Giscus 会生成一个 `<script>` 标签，后续步骤将使用它。

## 使用简单的 Script 标签

现在你应该已经获得类似下面的 Script 标签：

```html
<script
  src="https://giscus.app/client.js"
  data-repo="[在此填写仓库]"
  data-repo-id="[在此填写仓库 ID]"
  data-category="[在此填写分类名称]"
  data-category-id="[在此填写分类 ID]"
  data-mapping="pathname"
  data-strict="0"
  data-reactions-enabled="1"
  data-emit-metadata="0"
  data-input-position="bottom"
  data-theme="preferred_color_scheme"
  data-lang="zh-CN"
  crossorigin="anonymous"
  async
></script>
```

将它加入网站源码即可。如果你使用 AstroPaper，并希望在文章中启用评论，请打开 `PostDetails.astro`，将脚本粘贴到希望显示评论的位置，例如“分享本文”按钮下方。

```astro file=src/layouts/PostDetails.astro
<Layout {...layoutProps}>
  <main>
    <ShareLinks />

    <!-- [!code ++:6] -->
    <script
      src="https://giscus.app/client.js"
      data-repo="[在此填写仓库]"
      data-repo-id="[在此填写仓库 ID]"
      data-category="[在此填写分类名称]"
      data-category-id="[在此填写分类 ID]"></script>
  </main>
  <Footer />
</Layout>
```

完成！你已经成功为 AstroPaper 集成评论功能。

## 支持深浅色主题的 React 组件

直接嵌入布局的 Script 标签比较静态，包括 `theme` 在内的 Giscus 配置都被硬编码在布局中。AstroPaper 支持深浅色主题切换，如果评论区也能跟随网站无缝切换主题，体验会更好。为此，需要采用更完善的 Giscus 嵌入方式。

首先，安装 Giscus 的 [React 组件](https://www.npmjs.com/package/@giscus/react)：

```bash
npm i @giscus/react && npx astro add react
```

然后在 `src/components` 中新建 `Comments.tsx` React 组件：

```tsx file=src/components/Comments.tsx
import Giscus, { type Theme } from "@giscus/react";
import { GISCUS } from "@/constants";
import { useEffect, useState } from "react";

interface CommentsProps {
  lightTheme?: Theme;
  darkTheme?: Theme;
}

export default function Comments({
  lightTheme = "light",
  darkTheme = "dark",
}: CommentsProps) {
  const [theme, setTheme] = useState(() => {
    const currentTheme = localStorage.getItem("theme");
    const browserTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    return currentTheme || browserTheme;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = ({ matches }: MediaQueryListEvent) => {
      setTheme(matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const themeButton = document.querySelector("#theme-btn");
    const handleClick = () => {
      setTheme(prevTheme => (prevTheme === "dark" ? "light" : "dark"));
    };

    themeButton?.addEventListener("click", handleClick);

    return () => themeButton?.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="mt-8">
      <Giscus theme={theme === "light" ? lightTheme : darkTheme} {...GISCUS} />
    </div>
  );
}
```

这个 React 组件不仅封装了原生 Giscus 组件，还增加了 `lightTheme` 和 `darkTheme` 两个 props。借助两个事件监听器，当网站主题或浏览器主题发生变化时，Giscus 评论区也会动态切换深浅色模式。

还需要定义 `GISCUS` 配置，最合适的位置是 `constants.ts`：

```ts file=src/constants.ts
import type { GiscusProps } from "@giscus/react";

// ...

export const GISCUS: GiscusProps = {
  repo: "[在此填写仓库]",
  repoId: "[在此填写仓库 ID]",
  category: "[在此填写分类名称]",
  categoryId: "[在此填写分类 ID]",
  mapping: "pathname",
  reactionsEnabled: "0",
  emitMetadata: "0",
  inputPosition: "bottom",
  lang: "zh-CN",
  loading: "lazy",
};
```

注意，如果在这里指定 `theme`，它会覆盖 `lightTheme` 和 `darkTheme` props，最终得到静态主题，效果与此前直接嵌入 Giscus `<script>` 标签相同。

最后，把新的 Comments 组件添加到 `PostDetails.astro`，替换上一步中的 Script 标签。

```jsx file=src/layouts/PostDetails.astro
// [!code ++:1]
import Comments from "@/components/Comments";

<ShareLinks />

// [!code ++:1]
<Comments client:only="react" />

<hr class="my-6 border-dashed" />

<Footer />
```

至此，全部完成！
