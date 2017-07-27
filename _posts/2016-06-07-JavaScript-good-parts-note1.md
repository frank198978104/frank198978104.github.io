---
layout: post
title:  "JavaScript 語言精粹筆記1-語法、對象、函數"
categories: JavaScript
tags:  對象 函數 this 閉包 面向對象 作用域
---

* content
{:toc}

記錄一下閱讀蝴蝶書的筆記，本篇為第一部分包含書中前三章內容：語法、對象和函數。




![](https://img3.doubanio.com/lpic/s3651235.jpg)

原書中第一章為精華，做了一些周邊介紹，略去。

## 語法

### 空白

這裡說一下JavaScript的注釋，一種是 `/* */` 包圍的塊注釋，另一種是 `//` 開頭的行注釋。

因為塊注釋的字符可能是JavaScript中正則表達式字面量，因此不是很安全，如：

```js
/*
    var rm_a = /a*/.match(s)
*/
```

### 標識符

標識符由一個字母開頭，後面可選擇性的加上一個或多個字母、數字或下劃線。要避免保留字。

標識符被用於語句、變量、參數、屬性名、運算符和標記。

### 數字

可以存在指數部分，100和1e2完全相等

```js
100 === 1e2 // true
```

使用`isNaN`來檢測`NaN`。

### 字符串

當年 JavaScript 被創建的時候，Unicode 是16位字符集，因此 JavaScript 字符串是16位的。

用雙引號或單引號包裹。

重點說一下轉義字符`\`

反斜槓後面可以跟`"`, `'`, `\`, `/`, `b` (backspace), `f` (formfeed), `n`, `r` (carriage return), `t`, `u1234`

```js
'A' === '\u0041' // true
```

### 語句

每個`<script>`標籤的內容被一起拋到一個公共的全局名字空間中。

`{...}`代碼塊不會創建新的作用域，因此變量應該被定義在函數的頭部，而不是在代碼塊中。

下列值當做假：

* `false`
* `null`
* `undefined`
* `''`
* `0`
* `NaN`

其他所有值都當做真

`for in`語句枚舉對象的所有屬性名（鍵名），使用`object.hasOwnProperty(variable)`來確定這個屬性名是該對象成員，還是來自原型鏈。

```js
for (myvar in obj) {
    if (obj.hasOwnProperty(myvar)) {
        ...
    }
}
```

### 表達式

運算符優先級

運算符 | 說明
----- | -----
`.` `[]` `()` | 提取屬性與調用函數
`delete` `new` `typeof` `+` `-` `!` | 一元運算符
`*` `/` `%` |
`+` `-` |
`>=` `<=` `>` `<` |
`===` `!==` |
`&&` | 邏輯與
`||` | 邏輯或
`?:` | 三目

### 字面量

對象字面量是一種可以方便地按指定規格創建新對象的表示法。

數組字面量是一種可以方便地按指定規格創建新數組的表示法。

### 函數

函數字面量定義了函數值。後續章節詳談。

## 對象

對象是屬性的容器，每一個屬性都擁有名字和值。屬性的名字可以是包含空字符串在內的任意字符串。屬性的值可以是除`undefined`值之外的任何值。

JavaScript 包含一種原型鏈的特性，允許對象繼承另一個對象的屬性。正確地使用它能減少對象初始化時消耗的時間和內存。

### 對象字面量

一個對象字面量就是包圍在一對花括號中的零或多個“名/值”對。

```js
var empty_object = {}

var stooge = {
    firstName: 'Haoyang',
    lastName: 'Gao'
}
```

### 檢索

```js
console.log(stooge.firstName); // Haoyang
console.log(stooge['firstName']); // Haoyang
```

不存在的屬性返回`undefined`。

使用`||`來填充默認值。

```js
console.log(stooge.firstName || 'Joe'); // Haoyang
console.log(stooge.age || 25); // 25
```

### 更新

直接使用賦值語句更新，若不存在這個屬性，則作為擴充操作。

```js
stooge.firstName = 'aaa'
stooge.nickName = 'peip'
console.log(stooge) //Object {firstName: "aaa", lastName: "Gao", nickName: "peip"}
```

### 引用

對象通過引用來傳遞他們永遠不會被複製。

```js
var x = stooge
x.hair = 'black'
stooge.hair //"black"
```

### 原型

每一個對象都連接到一個原型對象，並且它可以從中繼承屬性。所有通過字面量創建的對象都連接到`Object.prototype`，它是JavaScript中的標配對象。

可以使用`Object.create()`方法創建一個使用原對象作為其原型的新對象。

```js
var anotherStooge = Object.create(stooge)
anotherStooge.firstName //"aaa"
anotherStooge.firstName = 'bbb'
anotherStooge.firstName //"bbb"
anotherStooge.hair //"black"
```

新對象先查找自己的屬性，若不存在則會向原型方向查找。

![](http://ww1.sinaimg.cn/large/7011d6cfjw1f4ieu7focqj207h05caaf.jpg)

當我們對某個對象作出改變時，不會觸及該對象的原型。

原型關係是一種動態關係。如果我們添加一個新的屬性到原型中，該屬性會立即對所有基於該原型創建的對象可見。

### 反射

在計算機科學中，反射是指計算機程序在運行時（Run time）可以訪問、檢測和修改它本身狀態或行為的一種能力。

檢查對象並確定對象有什麼屬性是很容易的事情，只要試著去檢索該屬性並驗證取得的值。

`typeof`用來確定對象屬性的類型。

`hasOwnProperty`，若對象擁有獨有的屬性，它將返回`true`。不會檢查原型鏈。

### 枚舉

使用`for in`可以遍歷一個對象中的所有屬性名，包括原型鏈上的屬性名。可以使用`hasOwnProperty`過濾原型鏈上的屬性，使用`typeof`來排除函數。

```js
for (var name in anotherStooge) {
    if (anotherStooge.hasOwnProperty(name) && typeof anotherStooge[name] !== 'function') {
        console.log(name + '--->' + anotherStooge[name])
    }
}
// firstName--->bbb
```

屬性名是無序的，若想保持順序應使用數組和`for`循環。

### 刪除

`delete`可以用來刪除對象的屬性。若對象包含該屬性，則會被移除。它不會觸及原型鏈中的任何對象。

```js
anotherStooge.firstName //"bbb"
delete anotherStooge.firstName
anotherStooge.firstName //"aaa"
```

### 減少全局變量污染

JavaScript 可以隨意的定義全局變量來容納應用的所有資源。但這會削弱程序的靈活性，應避免使用全局變量。

最小化使用全局變量的方法之一是為應用只創建一個唯一的全局變量。

```js
var MYAPP = {}

MYAPP.stooge = {
    //...
}

MYAPP.flight = {
    //...
}
```
下一章將使用閉包來進行信息隱藏，是另一種有效減少全局污染的方法。

## 函數

### 函數對象

JavaScript 中的函數就是對象。函數對象連接到`Function.prototype`（該原型對象本身連接到`Object.prototype`）。每個函數對象在創建時會附加兩個隱藏屬性：函數的上下文和實現函數行為的代碼。

函數對象在創建時也隨配有一個`prototype`屬性。它的值是一個擁有`constructor`屬性且值即為該函數對象。

```js
function add(a, b) {
    return a + b
}
```

![](http://ww1.sinaimg.cn/large/7011d6cfjw1f4lrei2b3pj208f06et95.jpg)

因為函數是對象，所以可以像任何其他的值一樣被使用。函數可以保存在變量、對象和數組中。函數可以被當做參數傳遞給其他函數，函數也可以再返回函數。函數也可以擁有方法。

函數的與眾不同之處在於可以被調用。

### 函數字面量

函數對象通過函數字面量來創建。

```js
var add = function(a, b) {
    return a + b
}
```

函數字面量包含4部分，分別是：保留字 function、函數名、參數、花括號中的語句。

### 調用

調用一個函數會暫停當前函數的執行，傳遞控制權和參數給新函數。除了聲明時定義的形式參數，還有兩個附加參數：`this`和`arguments`。參數`this`在面向對象編程中非常重要，它的值取決於調用的模式。JavaScript中一共有4中調用模式：方法調用模式、函數調用模式、構造器調用模式、apply調用模式。

實參和形參個數不匹配時，不會有運行時錯誤。實參過多時，超出的實參被忽略。形參過多時，缺失的值被替換為`undefined`。

下面的內容也可以參考我以前的博文 [JavaScript 中的 this](http://gaohaoyang.github.io/2015/06/12/JavaScript-this/)

#### 方法調用模式

當一個函數被保存為對象的一個屬性時，我們稱它為一個方法。當一個方法被調用時，`this`被綁定到該對象。

```js
var myObject = {
    value: 0,
    increment: function(inc) {
        this.value += typeof inc === 'number' ? inc : 1
    }
}

myObject.increment()
console.log(myObject.value) //1

myObject.increment(3)
console.log(myObject.value) //4
```

#### 函數調用模式

當一個函數並非一個對象的屬性時，那麼它就是被當做一個函數來調用的。

此時`this`被綁定到全局對象。即時是內部函數也會將`this`綁定到全局對象。

可以在函數內創建一個屬性並賦值為`this`來解決這個問題。如下：

```js
var add = function(a, b) {
    return a + b
}

myObject.double = function() {
    var that = this
    var helper = function() {
        that.value = add(that.value, that.value)
    }
    helper()
}

myObject.double()
console.log(myObject.value) //8
```

#### 構造器調用模式

JavaScript是一門基於原型繼承的語言。對象可以直接從其他對象繼承屬性。該語言是無類型的。

如果在一個函數前面帶上`new`來調用，那麼背地裡將會創建一個連接到該函數的`prototype`成員的新對象，同時`this`會被綁定到那個新對象上。

```js
//創建構造器函數
var Quo = function(string) {
    this.status = string
}

//給Que的所有實例提供一個公共方法
Quo.prototype.getStatus = function() {
    return this.status
}

//實例化
var myQuo = new Quo('confused')

console.log(myQuo.getStatus()) //confused
```

書中不推薦這種形式的構造器函數，下一章有更好的解決方案。

#### Apply 調用模式

`apply`方法讓我們構建一個參數數組傳遞給調用函數。他也允許我們選擇`this`的值。`apply`方法接受兩個參數，第一個是要綁定給`this`的值，第二個是參數數組。

```js
var arr = [3, 4]
var sum = add.apply(null, arr)
console.log(sum) //7

var statusObject = {
    status: 'hello'
}

var status = Quo.prototype.getStatus.apply(statusObject)
console.log(status) //hello
```

### 參數

當函數被調用時，會得到一個`arguments`數組。通過此參數可以訪問所有它被調用時傳遞給它的參數列表，包括那些沒有被分配給函數聲明時定義的形參的多餘參數。這使得編寫一個無須指定參數個數的函數成為可能。

```js
var sum = function() {
    var i, sum = 0
    for (i = 0; i < arguments.length; i++) {
        sum += arguments[i]
    }
    return sum
}
console.log(sum(1, 2, 3, 4, 5, 6, 7, 8, 9)) //45
```

因語言的設計錯誤，`arguments`並不是一個真正的數組。是一個“類似數組”的對象。有`length`屬性，但沒有任何數組的方法。

### 返回

函數執行時遇到關閉函數體的`}`時結束。然後把控制權交還給調用該函數的程序。

`return`可以使函數提前返回，不在執行餘下的語句。

函數總是會返回一個值，若沒有指定，則返回`undefined`。

若函數調用時在前面加上了`new`前綴，且返回值不是一個對象的時候，則返回`this`（該新對象）。

### 異常

異常是干擾程序的正常流暢的不尋常的事故。

```js
var add2 = function(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw {
            name: 'TypeError',
            message: 'add needs numbers'
        }
    }
    return a + b
}
console.log(add2(2, 3)) //5
console.log(add2('a', 6))
```

![](http://ww1.sinaimg.cn/large/7011d6cfjw1f4mprafcvhj20ml00xjrj.jpg)

`throw`語句中斷函數的執行。拋出一個`exception`對象，該對象包含一個用來識別異常類型的`name`屬性和一個描述性的`message`屬性。也可以自定義其他屬性。

```js
var try_it = function() {
    try {
        add2('a')
    } catch (e) {
        console.log(e.name + ': ' + e.message)
    }
}
try_it() //TypeError: add needs numbers
```

如果在`try`代碼塊內拋出一個異常，控制權就會跳轉到它的`catch`語句中。

### 擴充類型的功能

JavaScript 允許給語言的基本類型擴充功能。通過`Object.prototype`添加方法，可以讓該方法對所有對象都適用。

```js
// 先添加方法使得該方法對所有函數可用
Function.prototype.method = function(name, func) {
    this.prototype[name] = func
    return this
}

//添加一個取整方法
Number.method('integer', function() {
    return Math[this < 0 ? 'ceil' : 'floor'](this)
})
console.log((-10 / 3).integer()) //-3

//添加 trim()
String.method('trim', function() {
    return this.replace(/^\s+|\s+$/g, '')
})
console.log('  hello alibaba  '.trim()) //hello alibaba
```

JavaScript 原型繼承是動態的，因此新的方法立刻被賦予到所有的對象實例上，即使對象實例是在方法被增加之前就創建好了。

### 遞歸

遞歸函數就是會直接或者間接地調用自身的一種函數。

```js
var walkTheDom = function walk(node, func) {
    func(node)
    node = node.firstChild
    while (node) {
        walk(node, func)
        node = node.nextSibling
    }
}

var getElementsByAttribute = function(att, value) {
    var results = []
    walkTheDom(document.body, function(node) {
        var actual = node.nodeType === 1 && node.getAttribute(att)
        if (typeof actual === 'string' && (actual === value || typeof value !== 'string')) {
            results.push(node)
        }
    })
    return results
}

//在知乎主頁上操作
console.log(getElementsByAttribute('data-za-module', 'AnswerItem'))
//得到下列數據
//[div.feed-content, div.feed-content, div.feed-content, div.feed-content, div.feed-content, div.feed-content, div.feed-content]
```

### 作用域

作用域控制著變量與參數的可見性及生命週期。它減少了名稱衝突，並提供了自動內存管理。

無塊級作用域。

有函數作用域。

建議在函數體的頂部聲明函數中可能用到的所有變量。

### 閉包

作用域的好處是內部函數可以訪問定義他們的外部函數的參數和變量（除了`this`和`arguments`）。

```js
var quo = function(status) {
    return {
        get_status: function() {
            return status
        }
    }
}

var myQuo = quo('amazed')
console.log(myQuo.get_status()) //amazed
```
狹義的說，返回的那個對象即閉包，它裡面的方法可以訪問它被創建時所處的上下文環境。

避免在循環中創建函數，容易引起混淆。可以現在循環之外創建一個輔助函數，讓輔助函數在返回一個綁定了當前`i`值的函數，這樣就不會導致混淆了。

### 回調

將一個函數作為參數，一旦接收到響應，再調用這個函數。

### 模塊

可以用函數和閉包構造模塊。

模塊模式的一般形式是：一個定義了私有變量和函數的函數；利用閉包創建可以訪問私有變量和函數的特權函數；最後返回這個特權函數，或者把他們保存到一個可訪問到的地方。

```js
var numberCal = (function() {
    var half = function(n) {
        return n / 2
    }
    var double = function(n) {
        return n * 2
    }
    var tribble = function(n) {
        return n * 3
    }
    return {
        half: half,
        double: double,
        tribble: tribble
    }
}())

console.log(numberCal.half(5)) //2.5
console.log(numberCal.half(6)) //3
console.log(numberCal.double(7)) //14
console.log(numberCal.tribble(7)) //21
```

### 級聯

如果讓方法返回`this`而不是默認的`undefined`，就可以啟用級聯，即連續調用。

### 柯裡化

柯裡化允許我們把函數與傳遞給它的參數相結合，產生出一個新的函數。

詳情見以前的博文 [JavaScript 函數 -bind 與 currying](http://gaohaoyang.github.io/2015/06/11/JavaScript-function/#bind--currying)。

### 記憶

函數可以將先前操作的結果記錄在某個對象裡，從而避免無謂的重複運算。這種優化被稱為記憶（memoization）。
