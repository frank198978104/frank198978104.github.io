---
layout: post
title:  "Git 如何 clone 非 master 分支的代碼"
categories: GitHub
tags:  Git GitHub 分支
---

* content
{:toc}

## 問題描述

我們每次使用命令

```
git clone git@gitlab.xxx.com:xxxxx.git
```

默認 clone 的是這個倉庫的 master 分支。如果最新的代碼不在 master 分支上，該如何拿到呢？如下圖所示，最新的代碼可能在`daily/1.4.1`分支上，我們希望拿到這個分支上的代碼。




![7f07c8f6deef169ef6be5103bbd3e932f8676bb1.png](https://ooo.0o0.ooo/2016/07/07/577e349ab42ed.png)

## 解決方法

**剛剛開週會的時候，自己洋洋得意的分享我的解決方案，但是……經過與團隊成員的的討論，自己的方法弱爆了，現在把更優雅的方法寫一下。原來寫的方法並不太適合用在這個場景裡。** 我之前寫的方法在文章後面。

直接使用命令

```
git branch -r #查看遠程分支
```
或

```
git branch -a #查看所有分支
```

會顯示

```
origin/HEAD -> origin/master
origin/daily/1.2.2
origin/daily/1.3.0
origin/daily/1.4.1
origin/develop
origin/feature/daily-1.0.0
origin/master
```

然後直接

```
git checkout origin/daily/1.4.1
```

就好了。。。

## 原來的解決方案

**其實我原來寫的這個方法更多的是：設置已有的本地分支跟蹤一個剛剛拉取下來的遠程分支，或者想要修改正在跟蹤的上游分支。**

我們在本地先建立一個分支，建議名稱和遠程的想要同步的分支名稱一樣。

```
git branch daily/1.4.1
```

在切換到這個本地分支

```
git checkout daily/1.4.1
# Switched to branch 'daily/1.4.1'
```

接下來就可以去建立上游分支的關聯了，但是這個命令比較長，不好記，我們可以直接先`pull`一下，git 會提示我們相應的操作和命令。

```
git pull
There is no tracking information for the current branch.
Please specify which branch you want to merge with.
See git-pull(1) for details.

    git pull <remote> <branch>

If you wish to set tracking information for this branch you can do so with:

    git branch --set-upstream-to=origin/<branch> daily/1.4.1
```

我們看到最後一行，執行這個命令，即可完成與上游分支的關聯。

```
git branch --set-upstream-to=origin/daily/1.4.1 daily/1.4.1
# Branch daily/1.4.1 set up to track remote branch daily/1.4.1 from origin.
```

然後再`pull`一下就好了！

```
git pull
```
