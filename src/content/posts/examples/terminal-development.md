---
title: 我如何使用 React 开发终端风格的作品集网站
author: Sat Naing
pubDatetime: 2022-06-09T03:42:51Z
slug: how-do-i-develop-my-terminal-portfolio-website-with-react
featured: false
draft: false
tags:
  - JavaScript
  - ReactJS
  - ContextAPI
  - Styled-Components
  - TypeScript
description:
  "示例文章：使用 ReactJS、TypeScript 和 Styled-Components 开发终端风格的网站，
  包含自动补全、多主题、命令提示等功能。"
timezone: "Asia/Yangon"
---

> 本文最初发布在我的[博客](https://satnaing.dev/blog/posts/how-do-i-develop-my-terminal-portfolio-website-with-react)上。这里收录它，是为了演示如何使用 AstroPaper 主题撰写博客文章。

使用 ReactJS、TypeScript 和 Styled-Components 开发一个终端风格的网站，包含自动补全、多主题、命令提示等功能。

![Sat Naing 的终端风格作品集](https://satnaing.dev/_ipx/w_2048,q_75/https%3A%2F%2Fres.cloudinary.com%2Fnoezectz%2Fimage%2Fupload%2Fv1654754125%2FSatNaing%2Fterminal-screenshot_gu3kkc.png?url=https%3A%2F%2Fres.cloudinary.com%2Fnoezectz%2Fimage%2Fupload%2Fv1654754125%2FSatNaing%2Fterminal-screenshot_gu3kkc.png&w=2048&q=75)

## 目录

## 简介

最近，我开发并发布了自己的作品集和博客，很高兴收到了不少积极反馈。今天我想介绍一个新的终端风格作品集网站。它使用 ReactJS 和 TypeScript 开发，灵感来自 CodePen 和 YouTube。

## 技术栈

这是一个不包含任何后端代码的纯前端项目，UI/UX 部分使用 Figma 设计。在前端界面上，我没有选择原生 JavaScript 或 NextJS，而是选择了 React。原因如下：

- 首先，我想编写声明式代码。使用 JavaScript 以命令式方式管理 HTML DOM 非常繁琐。
- 其次，因为它是 React！快速而且可靠。
- 最后，我并不需要 NextJS 提供的大量 SEO、路由和图片优化功能。

当然，项目还使用 TypeScript 进行类型检查。

在样式方面，我采用了与以往不同的方案。我没有选择纯 CSS、Sass 或 TailwindCSS 这类原子化 CSS 框架，而是使用 CSS-in-JS（Styled-Components）。虽然我很早就知道 Styled-Components，但此前从未真正用过，因此本项目中的代码风格和结构可能还不够规范。

这个项目不需要复杂的状态管理。我只使用 ContextAPI 来实现多主题，并避免逐层传递 props。

下面快速总结一下技术栈：

- 前端：[ReactJS](https://reactjs.org/ "React 官网")、[TypeScript](https://www.typescriptlang.org/ "TypeScript 官网")
- 样式：[Styled-Components](https://styled-components.com/ "Styled-Components 官网")
- UI/UX：[Figma](https://figma.com/ "Figma 官网")
- 状态管理：[ContextAPI](https://reactjs.org/docs/context.html "React ContextAPI")
- 部署：[Netlify](https://www.netlify.com/ "Netlify 官网")

## 功能

以下是项目的一些主要功能。

### 多主题

用户可以切换多种主题。撰写本文时共有 5 种主题，未来可能还会继续增加。所选主题会保存到本地存储中，因此刷新页面后不会丢失。

![切换不同主题](https://i.ibb.co/fSTCnWB/terminal-portfolio-multiple-themes.gif)

### 命令行补全

为了让体验尽可能接近真实终端，我加入了命令行补全功能。输入部分命令后，只需按下 `Tab` 或 `Ctrl + I` 即可自动补全。

![命令行补全演示](https://i.ibb.co/CQTGGLF/terminal-autocomplete.gif)

### 历史命令

用户可以按上下方向键返回或浏览之前输入过的命令。

![使用上方向键返回上一条命令](https://i.ibb.co/vD1pSRv/terminal-up-down.gif)

### 查看／清除命令历史

在命令行中输入 `history` 可以查看此前输入的命令。输入 `clear` 或按下 `Ctrl + L`，则可以清除全部命令历史和终端屏幕内容。

![使用 clear 或 Ctrl + L 清空终端](https://i.ibb.co/SJBy8Rr/terminal-clear.gif)

## 结语

这是一个非常有趣的项目。它的特别之处在于，尽管属于前端项目，我却需要把更多精力放在逻辑而不是用户界面上。

## 项目链接

- 网站：[https://terminal.satnaing.dev/](https://terminal.satnaing.dev/ "https://terminal.satnaing.dev/")
- 仓库：[https://github.com/satnaing/terminal-portfolio](https://github.com/satnaing/terminal-portfolio "https://github.com/satnaing/terminal-portfolio")
