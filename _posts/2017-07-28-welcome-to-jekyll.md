---
layout: post
title:  "在GitHub上使用jekyll建立自己的部落格"
date:   2017-07-28 00:00:00
categories: jekyll
tags: jekyll
excerpt: 既然剛架好，就順便做一篇簡單的教學吧。
mathjax: true
---

* content
{:toc}

### **前言小語：**

　　前一陣子有朋友在問我網頁前端的相關問題，一開始也只是很平常的回覆他，但是過一陣後我想想，他是寫iOS的為什麼在問我網頁前端的東西呢？他才跟我說他在GitHub上建立部落格，紀錄一些事情。我回頭想想，也對，當遇到問題的時候好像會回去開以前寫過的專案，頗浪費時間的，所以就想說我也來架一個紀錄一下我所做過的專案跟曾經碰到的問題，也算是某種筆記。

<div align="center" style="margin-top:50px;">
<label style="font-size: 28px;" align="center">那就讓我們開始流程跟教學吧！</label>
</div>

## **建置流程**

### **Step 1 - GitHub**
1. 先到 **[GitHub](https://github.com/)** 上申請帳號

2. 建立專案，Repository name的名稱必須是<span style="color:red">**你的username.github.io**</span>(參照下圖
<img src="/images/2017-07-28-welcome-to-jekyll/2017-07-28-welcome-to-jekyll-image1.jpg" width="500" alt="Repository name範例" title="Repository name範例"/>

3. 專案建立好後，點擊**Set up in Desktop**(如下圖位置)，之後他會詢問你要開啟<br/>
如果沒有安裝 **[GitHub桌面版](https://desktop.github.com/)** 他就會詢問你是否要安裝**(在此提供連結也可以先行安裝)**
<img src="/images/2017-07-28-welcome-to-jekyll/2017-07-28-welcome-to-jekyll-image2.jpg" width="500" alt="Set up in Desktop位置" title="Set up in Desktop位置"/>

4. 若已安裝完成，他會跳出如下圖的畫面，自動幫你連結和創資料夾<br/>
如果你想自己複製(如上圖)Set up in Desktop右邊的HTTPS或是改資料夾路徑也是可以的
<img src="/images/2017-07-28-welcome-to-jekyll/2017-07-28-welcome-to-jekyll-image3.jpg" width="500" alt="桌面版範例" title="桌面版範例"/>

5. 試著建立一個 index.html 放到裡面(可直接複製下面黑框內的範例)

6. 右邊的 index.html 已經待上傳了，左下角的Summary輸入概要之後就可以點下**Commit to master**就可以上傳了
<img src="/images/2017-07-28-welcome-to-jekyll/2017-07-28-welcome-to-jekyll-image4.jpg" alt="上傳範例" title="上傳範例"/>

7. 打開網址 https://username.github.io (username換成自己的帳號) 就完成了！

>第5點 index.html 範例
>```html
><!DOCTYPE html>
><html>
>  <body>
>    <h1>Hello World</h1>
>    <p>I'm hosted with GitHub Pages.</p>
>  </body>
></html>
>```
index.html 顯示的結果如下<br/>
![index.html範例結果](/images/2017-07-28-welcome-to-jekyll/2017-07-28-welcome-to-jekyll-image5.jpg)

### **Step 2 - Jekyll**
有興趣可以去看看 Jekyll 網站 → [Jekyll 中文版](http://jekyll.com.cn/)

換句話說， Jekyll 就是幫助你建立一個部落格平台，只是利用 **[GitHub](https://github.com/)** 來免費管理你的部落格，使用者可以利用 Markdown 來編寫你的文章， Jekyll 會自動幫你編譯成 HTML 網頁，如果你本身很熟悉 HTML 及 CSS 語法，也是可以接做使用。

 [Markdown官方網站](http://markdown.tw/)

 [Markdown常用語法](https://support.discordapp.com/hc/zh-tw/articles/210298617-Markdown%E6%96%87%E5%AD%97%E6%A0%BC%E5%BC%8F%E8%A8%AD%E5%AE%9A-%E8%81%8A%E5%A4%A9%E6%A1%86%E6%A0%BC%E5%BC%8F-%E7%B2%97%E9%AB%94-%E6%96%9C%E9%AB%94-%E4%B8%8B%E5%8A%83%E7%B7%9A-)

#### **安裝方法**
* Windows - [官方版前置作業](https://jekyllrb.com/docs/windows/)
* MAC - [若是Ruby版本太舊請先更新](https://www.ruby-lang.org/zh_tw/documentation/installation/#homebrew)

1. 在終端機輸入
```
gem install jekyll
jekyll new mysite
cd mysite
jekyll serve
```

2. 打開網頁
![localhost:4000範例結果](/images/2017-07-28-welcome-to-jekyll/2017-07-28-welcome-to-jekyll-image6.jpg)


基本上到這邊大致上就完成了

只要照著 Step 1 的第 6 點就可以把你的資料同步上去了

#### **新增文章**
只要從相對資料夾下的 _posts 這個資料夾裡面新增一個 .md 檔就可以開始撰寫文章了

因為工作的關係，我本身比較習慣使用 **[Visual Studio Code](https://code.visualstudio.com/)**

我是直接把整包資料夾拉進 Visual Studio Code 當中，

### **總結**
GitHub Pages ＋ Jekyll使用上的特點：

優點-

* 免費
* 無限流量
* 架設容易
* 無廣告 (可以自己加進去)
* 彈性極高
* 支援 markdown
* 支援版本控制 (GitHub本身)
* 可在離線編輯/預覽
* 中國可瀏覽

缺點-

* 完全開源 (同為優點)
* 靜態網頁限定
* 無資料庫
(以上缺點其實對一般部落格都沒什麼影響)