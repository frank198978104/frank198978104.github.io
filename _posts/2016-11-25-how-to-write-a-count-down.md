---
layout: post
title:  "前端如何寫一個精確的倒計時"
categories: JavaScript
tags:  countdown JavaScript
author: HyG
---

* content
{:toc}

關於寫倒計時大家可能都都比較熟悉，使用 setTimeout 或 setInterval 就可以搞定。幾秒鐘或者幾分鐘的倒計時這樣寫沒有問題，但是如果是長時間的倒計時，這樣寫就會不準確。如果用戶修改了他的設備時間，這樣的倒計時就沒有意義了。今天就說說寫一個精確的倒計時的方法。

![](https://img.alicdn.com/tfs/TB18QnlOpXXXXcVXpXXXXXXXXXX-388-256.png)




## 原理

眾所周知 setTimeout 或者 setInterval 調用的時候會有微小的誤差。有人做了一個 [demo](https://bl.ocks.org/kenpenn/raw/92ebaa71696b4c4c3acd672b1bb3f49a/) 來觀察這個現象並對其做了修正。短時間的誤差倒也可以接受，但是作為一個長時間的倒計時，誤差累計就會導致倒計時不準確。

因此我們可以在獲取剩餘時間的時候，每次 new 一個設備時間，因為設備時間的流逝相對是準確的，並且如果設備打開了網絡時間同步，也會解決這個問題。

但是，如果用戶修改了設備時間，那麼整個倒計時就沒有意義了，用戶只要將設備時間修改為倒計時的 endTime 就可以輕易看到倒計時結束是頁面的變化。因此一開始獲取服務端時間就是很重要的。

簡單的說，一個簡單的精確倒計時原理如下：

- 初始化時請求一次服務器時間 serverTime，再 new 一個設備時間 deviceTime
- deviceTime 與 serverTime 的差作為時間偏移修正
- 每次遞歸時 new 一個系統時間，解決 setTimeout 不準確的問題

## 代碼

獲取剩餘時間的代碼如下：

```js
/**
 * 獲取剩餘時間
 * @param  {Number} endTime    截止時間
 * @param  {Number} deviceTime 設備時間
 * @param  {Number} serverTime 服務端時間
 * @return {Object}            剩餘時間對象
 */
let getRemainTime = (endTime, deviceTime, serverTime) => {
    let t = endTime - Date.parse(new Date()) - serverTime + deviceTime
    let seconds = Math.floor((t / 1000) % 60)
    let minutes = Math.floor((t / 1000 / 60) % 60)
    let hours = Math.floor((t / (1000 * 60 * 60)) % 24)
    let days = Math.floor(t / (1000 * 60 * 60 * 24))
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    }
}
```

<del>獲取服務器時間可以使用 mtop 接口 `mtop.common.getTimestamp` </del>

然後可以通過下面的方式來使用：

```js
// 獲取服務端時間（獲取服務端時間代碼略）
getServerTime((serverTime) => {

    //設置定時器
    let intervalTimer = setInterval(() => {

        // 得到剩餘時間
        let remainTime = getRemainTime(endTime, deviceTime, serverTime)

        // 倒計時到兩個小時內
        if (remainTime.total <= 7200000 && remainTime.total > 0) {
            // do something

        //倒計時結束
        } else if (remainTime.total <= 0) {
            clearInterval(intervalTimer);
            // do something
        }
    }, 1000)
})
```

這樣的的寫法也可以做到準確倒計時，同時也比較簡潔。不需要隔段時間再去同步一次服務端時間。

## 補充

在寫倒計時的時候遇到了一個坑這裡記錄一下。

**千萬別在倒計時結束的時候請求接口**。會讓服務端瞬間 QPS 峰值達到非常高。

![](https://img.alicdn.com/tfs/TB1LBzjOpXXXXcnXpXXXXXXXXXX-154-71.png)

如果在倒計時結束的時候要使用新的數據渲染頁面，正確的做法是：

在倒計時結束前的一段時間裡，先請求好數據，倒計時結束後，再渲染頁面。

關於倒計時，如果你有什麼更好的解決方案，歡迎評論交流。
