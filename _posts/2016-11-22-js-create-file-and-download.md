---
layout: post
title:  "使用 JavaScript 創建並下載文件"
categories: JavaScript
tags:  文件 下載 JavaScript
author: HyG
---

* content
{:toc}

本文將介紹如何使用 JavaScript 創建文件，並自動/手動將文件下載。這在導出原始數據時會比較方便。

## 先上代碼

```js
/**
 * 創建並下載文件
 * @param  {String} fileName 文件名
 * @param  {String} content  文件內容
 */
function createAndDownloadFile(fileName, content) {
    var aTag = document.createElement('a');
    var blob = new Blob([content]);
    aTag.download = fileName;
    aTag.href = URL.createObjectURL(blob);
    aTag.click();
    URL.revokeObjectURL(blob);
}
```

很簡單對吧，直接調用這個方法，傳入文件名和文件內容，程序新建 a 標籤，新建 Blob 對象，將文件名賦給 a 標籤，同時將 Blob 對象作為 Url 也賦給 a 標籤，模擬點擊事件，自動下載成功，最後再回收內存。下面我們來看看具體是怎麼操作的。





![](https://img.alicdn.com/tfs/TB16.GnOpXXXXXdapXXXXXXXXXX-307-134.png)

## Blob 對象

Blob 對象是一個字節序列。擁有 `size` 和 `type` 等屬性。

擁有 2 個只讀狀態 `OPEND` 和 `CLOSED。`

Blob 對象屬於 JavaScript Web APIs 中的 File API 規定的部分，可以參考 W3C 文檔中的 [ The Blob Interface and Binary Data](https://www.w3.org/TR/2015/WD-FileAPI-20150421/#blob)

再回來看看我們的代碼裡是這麼寫的，使用了 Blob 的構造函數：

```js
var blob = new Blob([content]);
```

使用方括號的原因是，其構造函數的參數為以下4中：

- ArrayBuffer [TypedArrays] elements.
- ArrayBufferView [TypedArrays] elements.
- Blob elements.
- DOMString [WebIDL] elements.

所謂 `ArrayBuffer` 是一種用於呈現通用、固定長度的二進制數據的類型。詳情可以參考 [ArrayBuffer -MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) 以及 [ECMAScript2015 標準中的 ArrayBuffer](http://www.ecma-international.org/ecma-262/6.0/#sec-arraybuffer-objects)。

## Blob URLs

Blob URLs 被創建或註銷是使用 `URL` 對象上的方法。這個 `URL` 對象被掛在 `Window` (HTML) 對象下，或者 `WorkerGlobalScope` (Web Workers)對象下。

擁有以下靜態方法 `createObjectURL` 和 `revokeObjectURL`，用於創建一個 blob 對象的 url 和註銷這個 blob url。

詳情可查看 [關於創建和註銷 Blob URL 的 W3C 標準文檔]( https://www.w3.org/TR/2015/WD-FileAPI-20150421/#creating-revoking)

## 模擬 click

```js
element.click();
```

在 W3C 中很早就有這個[規範](https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-2651361)，不需要寫繁瑣的模擬事件觸發的代碼。

## 小結

目前我將這個技術使用在 天貓雙十一技術和UED慶功會 的搖火箭大屏遊戲中。最後的遊戲結果排名，在請求了接口後，在前端直接生成並下載到了本地，作為記錄保存。主要也是因為服務端暫時沒有提供這個一張表去記錄遊戲結果，於是採用了前端記錄的解決方案。

大家當時都玩的好開心啊，😁。你們的甘其食和全家卡的名單就是這樣生成的！

## 參考

- [在瀏覽器端用JS創建和下載文件 -alloyteam](http://www.alloyteam.com/2014/01/use-js-file-download/)
