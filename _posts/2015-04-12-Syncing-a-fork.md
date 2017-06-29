---
layout: post
title:  "同步一個 fork"
date:   2015-04-12 15:14:54
categories: GitHub
excerpt: fork 了之後同步，fork了別人的代碼，保持遠程同步。
---

* content
{:toc}


## 如何使用搜索引擎

其實這個問題並不難，我又被坑了。百度搜的東西不靠譜啊，以後這種問題一定要用**英文**在 [Google](http://www.google.com) 或者 [Bing](http://cn.bing.com/) 上搜索，這樣才能搜到原汁原味的答案。就當是一個教訓吧。   

搜索 fork sync，就可以看到 GitHub 自己的幫助文檔 [Syncing a fork](https://help.github.com/articles/syncing-a-fork/) 點進去看這篇的時候，注意到有一個 Tip: Before you can sync your fork with an upstream repository, you must [configure a remote that points to the upstream repository](https://help.github.com/articles/configuring-a-remote-for-a-fork/) in Git.    
根據這兩篇文章，問題迎刃而解！   

---

## 具體方法

---

### Configuring a remote for a fork

* 給 fork 配置一個 remote   

* 主要使用 `git remote -v` 查看遠程狀態。   


<pre><code>git remote -v
# origin  https://github.com/YOUR_USERNAME/YOUR_FORK.git (fetch)
# origin  https://github.com/YOUR_USERNAME/YOUR_FORK.git (push)
</code></pre>

* 添加一個將被同步給 fork 遠程的上游倉庫      


<pre><code>git remote add upstream https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git
</code></pre>


* 再次查看狀態確認是否配置成功。   

<pre><code>git remote -v
# origin    https://github.com/YOUR_USERNAME/YOUR_FORK.git (fetch)
# origin    https://github.com/YOUR_USERNAME/YOUR_FORK.git (push)
# upstream  https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git (fetch)
# upstream  https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git (push)
</code></pre>

---

### Syncing a fork

* 從上游倉庫 fetch 分支和提交點，傳送到本地，並會被存儲在一個本地分支 upstream/master   
`git fetch upstream`    

<pre><code>git fetch upstream
# remote: Counting objects: 75, done.
# remote: Compressing objects: 100% (53/53), done.
# remote: Total 62 (delta 27), reused 44 (delta 9)
# Unpacking objects: 100% (62/62), done.
# From https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY
#  * [new branch]      master     -> upstream/master
</code></pre>

* 切換到本地主分支(如果不在的話)    
`git checkout master`    

<pre><code>git checkout master
# Switched to branch 'master'
</code></pre>

* 把 upstream/master 分支合併到本地 master 上，這樣就完成了同步，並且不會丟掉本地修改的內容。    
`git merge upstream/master`      

<pre><code>git merge upstream/master
# Updating a422352..5fdff0f
# Fast-forward
#  README                    |    9 -------
#  README.md                 |    7 ++++++
#  2 files changed, 7 insertions(+), 9 deletions(-)
#  delete mode 100644 README
#  create mode 100644 README.md
</code></pre>

* 如果想更新到 GitHub 的 fork 上，直接 `git push origin master` 就好了。