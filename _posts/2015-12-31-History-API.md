---
layout: post
title:  "前端處理動態 url 和 pushStatus 的使用"
date:   2015-12-31 23:06:05
categories: JavaScript
tags: JavaScript Ajax URL HistoryApi pushState pjax
---

* content
{:toc}

## 起因

起因是這樣的，在嘗試前後端分離的這條道路上，我自己也在不斷摸索，感覺要把大部分的坑都踩踩了。目前我用的技術是：

* webpack 自動構建
* AMD 模塊化 js
* Sass 預處理 CSS
* 使用前端模板引擎 handlebars 解決動態操作將 html 拼接在 js 中的問題

但最近寫了一個項目類似知乎這樣的多頁網站。前端 url 的處理讓我覺得不夠優雅。我使用的是 hash 的方式處理動態 url 的，為此我專門在知乎上提了一個問題：[前端如何處理動態url？](https://www.zhihu.com/question/38802932)




這裡我將問題描述如下：

> 前後端徹底分離的情況下，頁面跳轉頁全部由前端控制。那麼如何更好的處理動態url地址？
> 例如本問題的url為
> https://www.zhihu.com/question/38802932
> 這肯定是用後台路由處理的url
>
> 純前端怎麼處理？用hash嗎，如下:
> https://www.zhihu.com/question#38802932
> 那如果本頁跳轉，只改變hash的話，頁面不會刷新。
> 使用`location.reload()`倒是可以解決。
>
> **但總覺得這樣處理不夠優雅。大家在工作中是如何處理此類場景的？還是用傳統的後台路由來提供動態url？**


感謝鄭海波和劇中人的熱心回答。都提到了`history`對象中的`pushState`，這是我第一次接觸到這方面的內容（頓時覺得自己真是才疏學淺）。

同時也有人提到了`pjax`，這個就是`pushState`+`Ajax`的封裝，也很有意思。

下面就來研究和實踐一下吧。

## History

`window`對象通過`history`對象提供對瀏覽器歷史記錄的訪問能力。它暴露了一些非常有用的方法和屬性，讓你在歷史記錄中自由前進和後退，而在 HTML5 中，更可以操縱歷史記錄中的數據。

### `back()`, `forward()`, `go()`, `length`

瀏覽器的歷史記錄就好像一個棧，最新的在最上面，較早之前看過的在下面。

如下圖，Chrome的歷史記錄：

![chrome history](http://ww2.sinaimg.cn/large/7011d6cfjw1ezb16fn2bfj20k008htan.jpg)

下面介紹怎麼在這些歷史記錄中跳轉，但要**注意**，上圖中的瀏覽器歷史記錄和本文說的 history 還不太同。

* `back()`

    在歷史記錄中後退

        history.back();

* `forward()`

    在歷史記錄中前進

        history.forward();

* `go()`

    移動到指定的歷史記錄點

        history.go(-1);

    通過指定一個相對於當前頁面位置的數值，你可以使用go()方法從當前會話的歷史記錄中加載頁面（當前頁面位置索引值為0，上一頁就是-1，下一頁為1）。

    **go()不填參數或參數為go(0)時，頁面會刷新，即`history.go()`或`history.go(0)`相當於`location.reload()`**

* `length`

    `length`為history的屬性，顯示history長度。

本節在線demo見：[History & pjax demo](http://gaohaoyang.github.io/history-pjax-demo/) 源代碼：[]()

**經過親自測試，`history`對象只記錄同一個 tab 頁內的歷史。如果是在新窗口打開的，則無效。如：在a標籤中添加`target="_blank"`，或按住`ctrl`點擊，這類場景下，在新的tab頁中，`history`對象也是新的。**

**且`history`對象記錄的信息與是否同源也無關，所以唯一要滿足的就是同一個標籤頁。**

### `pushState()`, `replaceState()`

HTML5 引進了`history.pushState()`方法和`history.replaceState()`方法，它們允許你逐條地添加和修改歷史記錄條目，能夠在不加載新頁面的情況下沒改變瀏覽器的URL。這些方法可以協同`window.onpopstate`事件一起工作。

使用`history.pushState()`會改變`referrer`的值，而在你調用方法後創建的  XMLHttpRequest 對象會在 HTTP 請求頭中使用這個值。`referrer的`值則是創建  XMLHttpRequest 對象時所處的窗口的 URL。

* `pushState(any data, string title, [string url])`

    第一個參數為`history`對象的`state`屬性值，可以放任意數據，記錄歷史狀態。第二個參數是新狀態的標題，目前瀏覽器基本不支持。第三個參數為可選的相對url。

    執行`pushState`後，可以在不加載新頁面的情況下，更改url。同時`history`棧中新增一條數據。

    例如，我們有這樣一段代碼：

        <button id="push1">pushState()</button>

        document.querySelector('#push1').addEventListener('click', function() {
            history.pushState('abc','pushStatePageTitle','pushState.html');
            document.querySelector('#length').innerHTML = history.length;//重新讀取歷史長度
        });

    當點擊按鈕的時候，頁面不會刷新，但`url`地址的最後已經變為`pushState.html`。這一點非常像`hash`的作用，但比`hash`更優雅。


* `replaceState(any data, string title, [string url])`

    與`pushState()`類似，只是在`history`棧中不是新增記錄，而是替換一條記錄。

**需要注意的是：**`pushState()`和`replaceState()`方法存在安全方面的限制，本地測試是無效的，會報錯，可以簡單放到任何服務端測試，或者使用`http-server`開啟簡單服務器，通過訪問`localhost`來查看效果。

本節demo見：[History & pjax demo - pushState](http://gaohaoyang.github.io/history-pjax-demo/index.html)

## pjax

現在再看本文一開始提出的問題，如何讓前端優雅的控制 url，這裡就可以考慮 pjax 技術了。我們把 pushState + ajax 進行封裝，合起來簡稱為 pjax。雖然不是什麼新的技術，但概念已然不同。

如果不使用 pjax。我們依然可以使用`hash`來實現文本開始的需求。但會不利於 SEO，看著也不夠優雅。

Pjax的原理十分簡單。

1. 攔截 a 標籤的默認跳轉動作或某些按鈕的點擊事件。
2. 使用 Ajax 請求新頁面。
3. 將返回的 Html 替換到頁面中。
4. 使用 HTML5 的`pushState()`修改Url。

個人理解3中也可以僅僅請求數據，再由瀏覽器渲染。

每當同一個文檔的瀏覽歷史（即history對象）出現變化時，會觸發`window.onpopstate`事件。

    window.onpopstate = function(event) {
        console.log(event.state);
        console.log(location);
    };

這樣在用戶點擊前進後退時也可以很好的監聽url，來做相應的頁面渲染。

若用戶刷新了頁面，但沒有相應的頁面資源，這時頁面就會顯示不存在。所以我認為較好的方法是在寫`pushState()`第三個參數的時候，寫為`?a=1`這樣的參數形式。[History.js](https://github.com/browserstate/history.js) 也是這麼寫的。但是這樣應該會多一次請求。也許使用 nodeJS 作為中間層會好一些吧。

對於上述的探索，不知道是不是我還不夠深入，總覺得還是不夠完美。

## 參考

* [MDN History](https://developer.mozilla.org/en-US/docs/Web/API/History)
* [MDN 操縱瀏覽器的歷史記錄](https://developer.mozilla.org/zh-CN/docs/DOM/Manipulating_the_browser_history)
* [pjax 是如何工作的？ 知乎](https://www.zhihu.com/question/20289254)
* [PJAX的實現與應用 小鬍子哥](http://www.cnblogs.com/hustskyking/p/history-api-in-html5.html)
* [URL的井號-阮一峰](http://www.ruanyifeng.com/blog/2011/03/url_hash.html)
* [history對象 JavaScript 標準參考教程（alpha） 阮一峰](http://javascript.ruanyifeng.com/bom/history.html)
* [Pjax(pushState and Ajax) 黯羽輕揚](http://www.ayqy.net/blog/pjaxpushstate-and-ajax/)
* [操縱歷史，利用HTML5 History API實現無刷新跳轉 藍飛](http://www.clanfei.com/2012/09/1646.html)
* [前端：將網站打造成單頁面應用SPA（一） Coffce](http://segmentfault.com/a/1190000002920768)
* [coffce-pjax](https://github.com/Coffcer/coffce-pjax)
* [History.js](https://github.com/browserstate/history.js)
* [defunkt/jquery-pjax GitHub](https://github.com/defunkt/jquery-pjax)
* [welefen/pjax](https://github.com/welefen/pjax)
