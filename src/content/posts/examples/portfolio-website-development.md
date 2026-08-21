---
title: 我如何开发自己的作品集网站和博客
author: Sat Naing
pubDatetime: 2022-03-25T16:55:12.000+00:00
slug: how-do-i-develop-my-portfolio-and-blog
featured: false
draft: false
tags:
  - NextJS
  - TailwindCSS
  - HeadlessCMS
  - Blog
description: "示例文章：我使用 NextJS 和无头 CMS 开发第一个作品集网站与博客的经历。"
timezone: "Asia/Yangon"
---

> 本文最初发布在我的[博客](https://satnaing.dev/blog/posts/how-do-i-develop-my-portfolio-and-blog)上。这里收录它，是为了演示如何使用 AstroPaper 主题撰写博客文章。

这是我使用 NextJS 和无头 CMS 开发第一个作品集网站与博客的经历。

![开发作品集网站](https://satnaing.dev/_ipx/w_2048,q_75/https%3A%2F%2Fres.cloudinary.com%2Fnoezectz%2Fimage%2Fupload%2Fv1653050141%2FSatNaing%2Fblog_at_cafe_ei1wf4.jpg?url=https%3A%2F%2Fres.cloudinary.com%2Fnoezectz%2Fimage%2Fupload%2Fv1653050141%2FSatNaing%2Fblog_at_cafe_ei1wf4.jpg&w=2048&q=75)

## 写作动机

从大学时代起，我就一直想用自己的域名（**satnaing.dev**）上线个人网站，但直到这个项目之前都没有真正实现。我做过不少 Web 应用开发项目和工作，却始终没有认真着手这件事。

你可能会问：“博客呢？”没错，博客也在我的项目清单上放了很久。我一直想用一些最新技术搭建博客，但工作和其他项目让我迟迟没有开始。

最近，我在开发个人项目时更关注质量而不是数量。项目完成后，我通常会在 GitHub 仓库中编写完整的 README，但我认为 README 更适合记录技术层面的内容。我还想写下开发过程中的经历和挑战，于是决定创建自己的博客。到了这个阶段，我也积累了足够的经验和信心来完成它。

## 技术栈

前端方面，我原本想使用 [React](https://reactjs.org/ "React 官网")。但单独使用 React 对 SEO 不够友好，同时还要考虑路由、图片优化等因素，因此我选择 [NextJS](https://nextjs.org/ "NextJS 官网") 作为主要前端技术栈。当然，还会使用 TypeScript 进行类型检查（据说习惯之后你会爱上 TypeScript 😉）。

样式方面使用 [TailwindCSS](https://tailwindcss.com/ "Tailwind CSS 官网")。我很喜欢 Tailwind 提供的开发体验，而且相比 MUI 或 React Bootstrap 等组件库，它拥有更高的灵活性。

项目的全部内容都存放在 GitHub 仓库中。所有博客文章（包括本文）都以 Markdown 格式编写，因为我对此非常熟悉。为了更轻松地同时编写 Markdown 和 frontmatter，我使用 [Forestry](https://forestry.io/ "Forestry 官网") 无头 CMS。它是一个基于 Git 的 CMS，可用于管理 Markdown 和其他内容，因此我既可以直接编写 Markdown，也可以使用所见即所得编辑器，填写 frontmatter 也非常方便。

图片和资源上传并存储在 [Cloudinary](https://cloudinary.com/ "Cloudinary 官网")。我通过 Forestry 连接 Cloudinary，并直接在控制面板中管理资源。

总结一下，本项目使用的技术栈如下：

- 前端：NextJS（TypeScript）
- 样式：TailwindCSS
- 动画：GSAP
- CMS：Forestry Headless CMS
- 部署：Vercel

## 功能

下面介绍作品集和博客的一些主要功能。

### SEO 友好

整个项目始终以 SEO 为重点，正确使用 Meta 标签、描述和标题层级。网站目前已被 Google 收录。

> 你可以在 Google 中搜索 `sat naing dev` 等关键词找到这个网站。

![在 Google 中搜索 satnaing.dev](https://res.cloudinary.com/noezectz/image/upload/v1648231400/SatNaing/satnaing-on-google_asflq6.png "satnaing.dev 已被收录")

此外，由于正确设置了 Meta 标签，网站分享到社交媒体时也能获得良好的预览效果。

![satnaing.dev 分享到 Facebook 时的卡片布局](https://res.cloudinary.com/noezectz/image/upload/v1653106955/SatNaing/satnaing-dev-share-on-facebook_1_zjoehx.png "分享到 Facebook 时的卡片布局")

### 动态站点地图

站点地图对 SEO 非常重要，因此网站的每个页面都应包含在 `sitemap.xml` 中。我为网站实现了自动生成站点地图的功能，每当创建新内容、标签或分类时都会同步更新。

### 深浅色主题

近年来深色主题越来越流行，许多网站都默认支持它。我的网站当然也同时支持浅色和深色主题。

### 完整的无障碍支持

这个网站具备完整的无障碍支持，只使用键盘也能浏览。我采用了各项无障碍最佳实践，例如为所有图片添加替代文本、不跳过标题层级、使用语义化 HTML 标签，并正确设置 ARIA 属性。

### 搜索框、分类与标签

所有博客内容都可以通过搜索框查找，也可以按分类和标签筛选。这样，读者可以快速找到并阅读真正感兴趣的内容。

### 性能与 Lighthouse 分数

得益于正确的开发方式和最佳实践，网站获得了优秀的性能与 Lighthouse 分数。下面是该网站的评分：

![satnaing.dev 的 Lighthouse 分数](https://user-images.githubusercontent.com/53733092/159957822-7082e459-11e9-4616-8f1e-49d0881f7cbb.png "satnaing.dev Lighthouse 分数")

### 动画

最初，我使用 [Framer Motion](https://www.framer.com/motion/ "Framer Motion") 为网站添加动画和微交互。但在尝试复杂动画和视差效果时，我发现 Framer Motion 的集成并不方便（也可能是我还不够熟练）。因此，我决定改用 [GSAP](https://greensock.com/ "GSAP 动画库") 实现所有动画。它是最流行的动画库之一，能够处理复杂、高级的动画效果。你几乎可以在网站的每个页面看到动画和微交互。

![satnaing.dev 上的动画](https://res.cloudinary.com/noezectz/image/upload/v1653108324/SatNaing/ezgif.com-gif-maker_2_hehtlm.gif "satnaing.dev 网站")

## 结语

这个项目让我积累了大量开发静态生成博客网站的经验和信心。我了解了基于 Git 的 CMS 以及它与 NextJS 的交互方式，也学习了 SEO、动态生成站点地图和提交 Google 收录的流程。未来我会继续做出更好的项目，敬请期待！✌🏻

最后，我想感谢朋友 [Swann Fevian Kyaw](https://www.facebook.com/bon.zai.3910 "Swann Fevian Kyaw 的 Facebook 账号")（@[ToonHa](https://www.facebook.com/ToonHa-102639465752883 "ToonHa Facebook 页面")），他为网站首页首屏绘制了一幅精美插图。

## 项目链接

- 网站：[https://satnaing.dev/](https://satnaing.dev/ "https://satnaing.dev/")
- 博客：[https://satnaing.dev/blog](https://satnaing.dev/blog "https://satnaing.dev/blog")
- 仓库：[https://github.com/satnaing/my-portfolio](https://github.com/satnaing/my-portfolio "https://github.com/satnaing/my-portfolio")
