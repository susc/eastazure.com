---
title: 如何更新 AstroPaper 的依赖
author: Sat Naing
pubDatetime: 2023-07-20T15:33:05.569Z
slug: how-to-update-dependencies
featured: false
draft: false
ogImage: ../../assets/images/forrest-gump-quote.png
tags:
  - FAQ
description: 如何更新项目依赖和 AstroPaper 模板。
---

更新项目依赖可能很繁琐，但长期忽略依赖更新也不是好主意 😬。本文将以 AstroPaper 为例，分享我通常如何更新项目。这些步骤同样适用于其他 JavaScript／Node.js 项目。

![阿甘伪名言](@/assets/images/forrest-gump-quote.png)

## 目录

## 更新软件包依赖

更新依赖有多种方式，我尝试过很多方法来寻找最简单的方案。其中一种是使用 `npm install package-name@latest` 手动逐个更新软件包。这种方法最直接，但效率可能不高。

我更推荐使用 [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) 更新依赖。freeCodeCamp 有一篇很好的[相关文章](https://www.freecodecamp.org/news/how-to-update-npm-dependencies/)，因此这里不再详细解释它是什么以及如何使用，而是直接展示我通常采用的流程。

首先，全局安装 `npm-check-updates`：

```bash
npm install -g npm-check-updates
```

开始更新前，最好先查看所有可用的新版本：

```bash
ncu
```

大多数情况下，补丁版本更新不会影响项目。因此，我通常运行 `ncu -i --target patch` 或 `ncu -u --target patch` 来更新补丁版本。两者的区别是：`ncu -u --target patch` 会更新所有补丁版本，而 `ncu -i --target patch` 允许你选择要更新的软件包。具体使用哪种方式由你决定。

接下来更新次版本。软件包的次版本更新通常不会破坏项目，但最好仍然查看相应的发布说明。这些更新往往包含一些可以应用到项目中的实用新功能。

```bash
ncu -i --target minor
```

最后，依赖中可能还有主版本更新。运行以下命令检查剩余更新：

```bash
ncu -i
```

如果存在主版本更新（或其他尚未完成的更新），该命令会列出剩余软件包。主版本更新很可能破坏整个项目，因此必须格外谨慎。请仔细阅读对应的发布说明或文档，并根据要求调整代码。

如果运行 `ncu -i` 后没有发现需要更新的软件包，*恭喜！*你已经成功更新项目中的全部依赖。

## 更新 AstroPaper 模板

与其他开源项目一样，AstroPaper 也在不断修复问题和增加功能。如果你把 AstroPaper 用作模板，可能也希望在新版本发布时同步更新模板。

但你或许已经按自己的喜好修改过模板，因此我无法给出一种适合所有人的“完美更新方案”。下面提供一些避免在更新过程中破坏仓库的建议。请记住，多数情况下，仅更新软件包依赖可能就已经足够。

### 需要留意的文件和目录

通常不希望被覆盖的内容包括 `src/content/blog/`、`src/config.ts`、`src/pages/about.md`，以及 `public/`、`src/styles/base.css` 等资源和样式，因为你很可能已经修改过它们。

如果你只对模板做了最少的改动，那么除上述文件和目录外，直接用最新版 AstroPaper 替换其他内容通常没有问题。这就像原生 Android 与 One UI 等厂商系统：对基础部分修改得越少，需要处理的更新也越少。

你可以逐个手动替换文件，也可以利用 Git 一次性完成更新。手动替换非常直观，这里不再演示。如果你对这种直接但低效的方法不感兴趣，请继续看下去 🐻。

### 使用 Git 更新 AstroPaper

**重要提示！**

> 只有在你能够解决合并冲突时，才执行以下操作。否则，最好手动替换文件或只更新依赖。

首先，在项目中将 AstroPaper 添加为远程仓库：

```bash
git remote add astro-paper https://github.com/satnaing/astro-paper.git
```

切换到一个新分支来更新模板。如果你清楚自己在做什么，并且对 Git 操作有信心，可以跳过此步骤。

```bash
git checkout -b build/update-astro-paper
```

然后运行以下命令拉取 AstroPaper 的变更：

```bash
git pull astro-paper main
```

如果遇到 `fatal: refusing to merge unrelated histories` 错误，可运行以下命令解决：

```bash
git pull astro-paper main --allow-unrelated-histories
```

执行上述命令后，项目中很可能出现冲突。你需要手动解决这些冲突，并根据自己的需求做必要调整。

解决冲突后，请全面测试博客，确保一切正常。检查文章、组件以及所有自定义内容。

确认结果无误后，将更新分支合并回主分支（如果你是在另一个分支中更新模板）。恭喜！你已经成功把模板更新到最新版本，现在博客已经准备好再次闪亮登场了！🎉

## 总结

本文分享了我更新依赖和 AstroPaper 模板时的一些经验与流程。真心希望这些内容能帮助你更高效地管理项目。

如果你有其他或更好的依赖／AstroPaper 更新方式，我很乐意了解。欢迎在仓库中发起讨论、给我发邮件或提交 Issue，非常感谢你的意见和想法！

最近我的日程比较繁忙，可能无法快速回复，但我会尽快答复。😬

感谢你花时间阅读本文，祝你的项目一切顺利！
