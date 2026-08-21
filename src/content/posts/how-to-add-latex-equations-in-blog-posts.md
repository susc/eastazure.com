---
author: Alberto Perdomo
pubDatetime: 2024-09-08T20:58:52.737Z
modDatetime: 2025-03-22T09:25:46.734Z
title: 如何在 Astro 博客文章中添加 LaTeX 公式
tags:
  - docs
description: 学习如何使用 Markdown、KaTeX 以及 remark/rehype 插件，在 Astro 博客文章中添加 LaTeX 公式。
---

本文演示如何在 AstroPaper 的 Markdown 文件中使用 LaTeX 公式。LaTeX 是一套强大的排版系统，经常用于数学和科学文档。

<figure>
  <img
    src="https://images.pexels.com/photos/22690748/pexels-photo-22690748/free-photo-of-close-up-of-complicated-equations-written-on-a-blackboard.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    alt="黑板上写满复杂的化学与数学公式"
  />
  <figcaption class="text-center">
    照片由 <a href="https://www.pexels.com/photo/close-up-of-complicated-equations-written-on-a-blackboard-22690748/">Vitaly Gariev</a> 拍摄
  </figcaption>
</figure>

## 目录

## 操作步骤

本节介绍如何让 AstroPaper 的 Markdown 文件支持 LaTeX。

1. 运行以下命令，安装所需的 remark 和 rehype 插件：

   ```bash
   pnpm install rehype-katex remark-math katex
   ```

2. 更新 Astro 配置以使用这些插件：

   ```ts file=astro.config.ts
   // ...
   import remarkMath from "remark-math";
   import rehypeKatex from "rehype-katex";

   export default defineConfig({
     // ...
     markdown: {
       remarkPlugins: [
         remarkMath, // [!code ++]
         remarkToc,
         [remarkCollapse, { test: "目录" }],
       ],
       rehypePlugins: [rehypeKatex], // [!code ++]
       shikiConfig: {
         // 更多主题请访问 https://shiki.style/themes
         themes: { light: "min-light", dark: "night-owl" },
         wrap: false,
       },
     },
     // ...
   });
   ```

3. 在主布局文件中导入 KaTeX CSS：

   ```astro file=src/layouts/Layout.astro
   ---
   import { SITE } from "@config";

   // Astro 代码
   ---

   <!doctype html>
   <!-- 其他元素 -->
   <meta property="og:image" content={socialImageURL} />

   <!-- [!code highlight:4] -->
   <link
     rel="stylesheet"
     href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css"
   />

   <body>
     <slot />
   </body>
   ```

4. 最后，在 `typography.css` 中为 `katex` 设置文本颜色：

   ```css file=src/styles/typography.css
   @plugin "@tailwindcss/typography";

   @layer base {
     /* 其他类 */

     /* KaTeX 文本颜色 */
     /* [!code highlight:3] */
     .prose .katex-display {
       @apply text-foreground;
     }

     /* ===== 代码块与语法高亮 ===== */
     /* 其他类 */
   }
   ```

大功告成！完成这些设置后，你就能在 Markdown 文件中编写 LaTeX 公式，它们会在网站构建时得到正确渲染。本文后续的内容也会正常显示。

---

## 行内公式

行内公式写在一对美元符号 `$...$` 之间。下面是几个示例：

1. 著名的质能等价公式：`$E = mc^2$`
2. 一元二次方程求根公式：`$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$`
3. 欧拉恒等式：`$e^{i\pi} + 1 = 0$`

---

## 块级公式

对于更复杂的公式，或希望让公式独占一行时，请使用双美元符号 `$$...$$`。

高斯积分：

```bash
$$ \int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi} $$
```

黎曼 ζ 函数的定义：

```bash
$$ \zeta(s) = \sum_{n=1}^{\infty} \frac{1}{n^s} $$
```

微分形式的麦克斯韦方程组：

```bash
$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0\left(\mathbf{J} + \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t}\right)
\end{aligned}
$$
```

---

## 使用数学符号

LaTeX 提供了丰富的数学符号：

- 希腊字母：`$\alpha$`、`$\beta$`、`$\gamma$`、`$\delta$`、`$\epsilon$`、`$\pi$`
- 运算符：`$\sum$`、`$\prod$`、`$\int$`、`$\partial$`、`$\nabla$`
- 关系符号：`$\leq$`、`$\geq$`、`$\approx$`、`$\sim$`、`$\propto$`
- 逻辑符号：`$\forall$`、`$\exists$`、`$\neg$`、`$\wedge$`、`$\vee$`
