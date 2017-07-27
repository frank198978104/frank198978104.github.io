---
layout: post
title:  "在低版本 IE 中點擊空 block 元素的問題"
date:   2015-07-24 00:06:05
categories: CSS
tags: IE CSS 兼容性 HTML
---

* content
{:toc}

## 問題描述

當我們點擊一個空的、沒有任何內容的 div 或者其他塊級元素時。在 IE11 以下，是沒有反應的。





## 使用場景

這類問題使用場景還是很普遍的。比如 UI 給了一張大圖，要點擊圖上的某一塊位置的時候。可以用一個空的 div 定位到相應的位置，然後對它進行綁定事件。

---

## 解決辦法

解決方法很簡單，即給這個塊級元素填充任意顏色，然後將其透明度設置為0。代碼如下：

    background-color: #fff;
    opacity: 0;
    filter:alpha(opacity=0);
