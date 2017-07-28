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
1. 先到 **[GitHub](https://github.com/new)** 上申請帳號

2. 建立專案，Repository name的名稱必須是<span style="color:red">**你的username.github.io**</span>(參照下圖
<img src="/images/2017-07-28-welcome-to-jekyll-image1.jpg" width="500" alt="Repository name範例" title="Repository name範例"/>

3. 專案建立好後，點擊**Set up in Desktop**(如下圖位置)，之後他會詢問你要開啟<br/>
如果沒有安裝 **[GitHub桌面版](https://desktop.github.com/)** 他就會詢問你是否要安裝**(在此提供連結也可以先行安裝)**
<img src="/images/2017-07-28-welcome-to-jekyll-image2.jpg" width="500" alt="Set up in Desktop位置" title="Set up in Desktop位置"/>

4. 若已安裝完成，他會跳出如下圖的畫面，自動幫你連結和創資料夾<br/>
如果你想自己複製(如上圖)Set up in Desktop右邊的HTTPS或是改資料夾路徑也是可以的
<img src="/images/2017-07-28-welcome-to-jekyll-image3.jpg" width="500" alt="桌面版範例" title="桌面版範例"/>

5. 試著建立一個 index.html 放到裡面(可直接複製下面黑框內的範例)

6. 右邊的 index.html 已經待上傳了，左下角的Summary輸入概要之後就可以點下**Commit to master**就可以上傳了
<img src="/images/2017-07-28-welcome-to-jekyll-image4.jpg" alt="上傳範例" title="上傳範例"/>

7. 打開網址 https://username.github.io (username換成自己的帳號) 就完成了！

>第5點index.html範例
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
![index.html範例結果](/images/2017-07-28-welcome-to-jekyll-image5.jpg)

### **Step 2 - Jekyll**

(編輯未完)