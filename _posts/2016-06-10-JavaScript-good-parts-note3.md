---
layout: post
title:  "JavaScript 語言精粹筆記3-方法、毒瘤等"
categories: JavaScript
tags:  函數 JavaScript
---

* content
{:toc}

記錄一下閱讀蝴蝶書的筆記，本篇為書中最後一部分：方法、代碼風格、優美的特性、毒瘤、糟粕等。




## 方法

這一章主要介紹了一些方法集。這裡寫幾個我不太熟悉的方法和要點吧。

* `array.join()`

    > 對於IE6/7，使用`array.join()`連接大量字符串的效率確實優於使用`+`元素運算符。但是目前主流的瀏覽器，包括IE8以後的版本，都對`+`元素運算符連接字符串做了特別優化，性能已經顯著高於`array.join()`。

* `number.toExponential(fractionDigits)`

    把這個`number`轉換成一個指數形式的字符串。

* `number.toFixed(fractionDigits)`

    將這個`number`轉換成一個十進制形式的字符串。


## 毒瘤

* 注意全局變量的引入。

* JavaScript 中 Unicode 是16位的。包含65536個字符（基本多文種平面 Basic Multilingual Plane）。剩下的百萬字符中的每一個都可以用一對字符來表示。Unicode 把一對字符視為一個單一的字符，而 JavaScript 認為一對字符是兩個不同的字符。

* 檢測`null`的方式。

```js
console.log(typeof null) //object

myValue === null //檢測 null

if (myValue && typeof myValue === 'object') {
    // myValue 是一個對象或數組！
}
```

* `parseInt` 把字符串轉化為整數的函數。它遇到非數字時會停止解析，所以`parseInt('16')`和`parseInt('16ton')`產生相同的結果。

    如果該字符串第一個字符是0，那麼該字符串會基於八進制而不是十進制來求職。在八進制中，8和9不是數字，所以`parseInt('08')`和`parseInt('09')`都產生0作為結果。但`parseInt()`可以接受基數，因此`parseInt('08',10)`結果為8，建議總是加上這個基數參數。

* JavaScript 的對象永遠不會是真的空對象，因為它們可以送原型鏈中取得成員屬性。

## 糟粕

* 避免使用`with`語句。

* 避免使用`eval`語句。

* `continue`可能會降低運算性能。

* 位運算符在 JavaScript 會非常慢。

    Java 裡，位運算符處理的是整數。JavaScript 沒有整數類型，它只有雙精度的浮點數，因此，位運算符把它們的數字運算數先轉換為整數，執行運算，在轉換回去。JavaScript 的執行環境一般接觸不到硬件，所以非常慢。

* 避免使用包裝對象。`new Object`和`new Array`等。

* 避免使用`void`。

本系列結束。
