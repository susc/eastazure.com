---
author: Simon Smale
pubDatetime: 2024-01-03T20:40:08Z
modDatetime: 2024-01-08T18:59:05Z
title: 使用 Git Hooks 设置创建和修改时间
featured: false
draft: false
tags:
  - docs
  - FAQ
canonicalURL: https://smale.codes/posts/setting-dates-via-git-hooks/
description: 如何使用 Git Hooks 自动设置 AstroPaper 文章的创建和修改时间。
---

本文将介绍如何使用 Git 的 pre-commit 钩子，自动填写 AstroPaper 博客主题 frontmatter 中的创建时间（`pubDatetime`）和修改时间（`modDatetime`）。

## 目录

## 让钩子随处可用

[Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) 很适合用来自动执行任务，例如在提交信息中[添加](https://gist.github.com/SSmale/3b380e5bbed3233159fb7031451726ea)或[检查](https://itnext.io/using-git-hooks-to-enforce-branch-naming-policy-ffd81fa01e5e)分支名称，或[阻止你提交明文密钥](https://gist.github.com/SSmale/367deee757a9b2e119d241e120249000)。它最大的缺点是客户端钩子只能在当前机器上生效。

你可以创建一个 `hooks` 目录，再手动把文件复制到 `.git/hooks`，或者建立符号链接来解决这个问题。但这些方式都要求你记得完成设置，而我并不擅长记住这种事。

由于项目使用 npm，我们可以借助 [Husky](https://typicode.github.io/husky/) 自动安装钩子（AstroPaper 已经安装了它）。

> 更新：AstroPaper [v4.3.0](https://github.com/satnaing/astro-paper/releases/tag/v4.3.0) 已移除 pre-commit 钩子，改用 GitHub Actions。不过，你仍然可以自行轻松[安装 Husky](https://typicode.github.io/husky/get-started.html)。

## 钩子脚本

我们希望在提交代码时运行钩子，先更新时间，再把更改纳入本次提交，因此需要使用 `pre-commit` 钩子。AstroPaper 项目已经配置好了它；如果没有，可以运行 `npx husky add .husky/pre-commit 'echo "This is our new pre-commit hook"'`。

打开 `hooks/pre-commit` 文件，添加下面一段或两段代码。

### 编辑文件时更新修改时间

---

**更新说明：**

本节已改用更智能的新版本钩子。文章发布前，它不会增加 `modDatetime`。首次发布时，只需将草稿状态设为 `first`，然后见证奇迹发生。

---

```shell
# Modified files, update the modDatetime
git diff --cached --name-status |
grep -i '^M.*\.md$' |
while read _ file; do
  filecontent=$(cat "$file")
  frontmatter=$(echo "$filecontent" | awk -v RS='---' 'NR==2{print}')
  draft=$(echo "$frontmatter" | awk '/^draft: /{print $2}')
  if [ "$draft" = "false" ]; then
    echo "$file modDateTime updated"
    cat $file | sed "/---.*/,/---.*/s/^modDatetime:.*$/modDatetime: $(date -u "+%Y-%m-%dT%H:%M:%SZ")/" > tmp
    mv tmp $file
    git add $file
  fi
  if [ "$draft" = "first" ]; then
    echo "First release of $file, draft set to false and modDateTime removed"
    cat $file | sed "/---.*/,/---.*/s/^modDatetime:.*$/modDatetime:/" | sed "/---.*/,/---.*/s/^draft:.*$/draft: false/" > tmp
    mv tmp $file
    git add $file
  fi
done
```

`git diff --cached --name-status` 会获取已经暂存、准备提交的文件，输出如下：

```shell
A       src/content/blog/setting-dates-via-git-hooks.md
```

开头的字母表示执行的操作。上例中的文件是新增文件，而修改过的文件以 `M` 开头。

我们把输出通过管道传给 `grep`，逐行寻找修改过的文件。每一行需要以 `M` 开头（`^(M)`），后面可以有任意数量的字符（`.*`），并以 `.md` 扩展名结尾（`.(md)$`）。这样，`egrep -i "^(M).*\.(md)$"` 就会过滤掉并非已修改 Markdown 文件的行。

---

#### 改进建议：更明确的范围

还可以让脚本只检查 `blog` 目录中的 Markdown 文件，因为只有这些文件才会包含正确的 frontmatter。

---

正则表达式会捕获字母和文件路径两部分。我们把列表通过管道传给 `while` 循环，遍历匹配的行，并将字母赋给 `a`、路径赋给 `b`。暂时不需要使用 `a`。

为了获取文件的草稿状态，我们首先需要读取 frontmatter。下面的代码使用 `cat` 获取文件内容，再用 `awk` 根据 frontmatter 分隔符（`---`）拆分文件，并取得第二个区块，也就是两个 `---` 之间的 frontmatter。接着再次使用 `awk` 查找 `draft` 键并输出其值。

```shell
  filecontent=$(cat "$file")
  frontmatter=$(echo "$filecontent" | awk -v RS='---' 'NR==2{print}')
  draft=$(echo "$frontmatter" | awk '/^draft: /{print $2}')
```

得到 `draft` 的值后，会出现三种情况：当草稿值为 `false` 时，将 `modDatetime` 设为当前时间（`if [ "$draft" = "false" ]; then`）；当草稿值为 `first` 时，清空 `modDatetime` 并把 `draft` 设为 `false`（`if [ "$draft" = "first" ]; then`）；其他情况不做任何操作。

后面的 `sed` 命令对我来说有些像魔法，因为我并不常用它。这段代码参考了[另一篇实现类似功能的文章](https://mademistakes.com/notes/adding-last-modified-timestamps-with-git/)。简单来说，它会在文件的 frontmatter 标记（`---`）之间查找 `pubDatetime:` 键，获取整行内容，再用同一个键和格式正确的当前时间 `pubDatetime: $(date -u "+%Y-%m-%dT%H:%M:%SZ")/"` 替换它。

替换针对整个文件执行，因此结果先写入临时文件（`> tmp`），再将新文件移动（`mv`）到旧文件的位置并覆盖它。最后，把文件添加到 Git 暂存区，就像我们亲手修改过它一样，等待提交。

---

#### 注意

要让 `sed` 正常工作，frontmatter 中必须已经存在 `modDatetime` 键。为了让应用能在日期为空时正常构建，还需要进行一些其他修改，详见[下文](#空-moddatetime-所需的修改)。

---

### 为新文件添加日期

为新文件添加日期与上述流程相同，但这次要寻找新增（`A`）的行，并替换 `pubDatetime` 的值。

```shell
# New files, add/update the pubDatetime
git diff --cached --name-status | egrep -i "^(A).*\.(md)$" | while read a b; do
  cat $b | sed "/---.*/,/---.*/s/^pubDatetime:.*$/pubDatetime: $(date -u "+%Y-%m-%dT%H:%M:%SZ")/" > tmp
  mv tmp $b
  git add $b
done
```

---

#### 改进建议：只循环一次

可以在同一个循环中使用变量 `a` 进行分支判断，选择更新 `modDatetime` 或添加 `pubDatetime`，从而只遍历一次。

---

## 填充 Frontmatter

如果 IDE 支持代码片段，可以创建自定义片段来填充 frontmatter。[AstroPaper v4 将默认提供 VS Code 代码片段。](https://github.com/satnaing/astro-paper/pull/206)

<video autoplay muted="muted" controls plays-inline="true" class="border border-skin-line">
  <source src="https://github.com/satnaing/astro-paper/assets/17761689/e13babbc-2d78-405d-8758-ca31915e41b0" type="video/mp4">
</video>

## 空 `modDatetime` 所需的修改

为了让 Astro 能够编译 Markdown 并正常处理内容，它需要知道 frontmatter 中的数据结构。这一结构通过 `src/content/config.ts` 中的配置定义。

要允许某个键存在但没有值，需要编辑第 10 行并添加 `.nullable()`：

```ts
const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional(), // [!code --]
      modDatetime: z.date().optional().nullable(), // [!code ++]
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      readingTime: z.string().optional(),
    }),
});
```

为了避免 IDE 在博客引擎文件中报错，我还进行了以下修改：

1. 在 `src/layouts/Layout.astro` 第 15 行添加 `| null`，使其变为：

   ```typescript
   export interface Props {
     title?: string;
     author?: string;
     description?: string;
     ogImage?: string;
     canonicalURL?: string;
     pubDatetime?: Date;
     modDatetime?: Date | null;
   }
   ```

2. 在 `src/components/Datetime.tsx` 第 5 行添加 `| null`，使其变为：

   ```typescript
   interface DatetimesProps {
     pubDatetime: string | Date;
     modDatetime: string | Date | undefined | null;
   }
   ```
