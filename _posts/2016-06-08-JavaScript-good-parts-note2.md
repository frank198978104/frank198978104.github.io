---
layout: post
title:  "JavaScript 語言精粹筆記2-繼承、數組、正則表達式"
categories: JavaScript
tags:  繼承 對象 原型 Array 正則
---

* content
{:toc}

記錄一下閱讀蝴蝶書的筆記，本篇為書中以下章節的筆記：繼承、數組和正則表達式。




## 繼承

繼承的兩大好處：代碼重用，引入一套類型系統的規範。

### 偽類

JavaScript 通過構造器函數產生對象。

構造器調用模式，即用`new`前綴去調用一個函數。

```js
var Mammal = function(name) {
    this.name = name
}

Mammal.prototype.getName = function() {
    return this.name
}

Mammal.prototype.says = function() {
    return this.saying || ''
};

var myMammal = new Mammal('Herb')
console.log(myMammal.getName()) //Herb
```

書中不推薦這樣的寫法。有很多風險。若忘記添加`new`前綴，`this`無法綁定到新的對象上。而是綁定到了全局對象上，破壞了全局變量環境。

### 對象說明符

上一節中的構造器可能要接受一大串參數。我們可以這樣寫：

```js
var myObject = Maker({
    first: f,
    middle: m,
    last: l,
    state: s,
    city: c
})
```

將JSON對象傳遞給構造器，而它返回一個構造完全的對象。

### 原型

在一個純粹的原型模式中，我們將摒棄類，轉而專注於對象。一個新對象可以繼承一個就對象的屬性。

```js
var myMammal = {
    name: 'MM',
    getName: function() {
        return this.name
    },
    says: function() {
        return this.saying || ''
    }
}

var myCat = Object.create(myMammal)
myCat.name = 'Kitty'
myCat.saying = 'meow'
myCat.run = function() {
    return 'Kitty is running'
}
myCat.getName = function() {
    return this.says + ' ' + this.name + ' ' + this.says
}
```

這是一種差異化繼承。

### 函數化

前文看到的繼承模式沒法保護隱私。對象的所有屬性都是可見的。無法得到私有變量和私有函數。為了解決這一問題，我們有模塊模式。

構造一個生成對象的函數需要4步驟：

1. 創建一個新對象。
2. 有選擇的定義私有變量和方法。
3. 給這個新對象擴充方法。
4. 返回那個新對象。

```js
var mammal = function(spec) {
    var that = {}

    that.getName = function() {
        return spec.name
    }
    that.says = function() {
        return spec.saying || ''
    }

    return that
}

var myMammal = mammal({
    name: 'Herb',
    saying: 'Cheers!'
})

console.log(myMammal.getName()) //Herb
console.log(myMammal.says()) //Cheers!
```

也可以參考上一篇文章，[JavaScript 語言精粹筆記1-語法、對象、函數 之模塊部分](http://gaohaoyang.github.io/2016/06/07/JavaScript-good-parts-note1/#section-34)。

### 部件

這一部分看的不是特別懂，我想等我學完ES2015中的類和模塊部分後再看看吧。

## 數組

### 數組字面量

一個數組字面量是在一對方括號中包圍零個或多個用逗號分隔的值的表達式。

再大多數語言中，一個數組的多有元素都要求是相同的類型。JavaScript 允許數組包含任意混合類型的值。

### 長度

JavaScript 數組的`length`屬性是沒有上界的。如果用大於或等於當前`length`的數字作為下標來存儲一個元素，那麼`length`值會被增大以容納新元素，不會發生數組越界錯誤。

### 刪除

數組也是對象，可以用`delete`來刪除元素

```js
var numbers = ['one', 'two', 3, 'four', 'wu']

delete numbers[0]
console.log(numbers[0]) //undefined
console.log(numbers.length) //5
```

可以使用`splice`方法，進行刪除和修改操作。

```js
numbers.splice(0, 1)
console.log(numbers[0]) //two
console.log(numbers.length) //4
```

### 枚舉

使用常規`for`循環即可，可以保證數組的順序。

### 容易混淆的地方

當屬性名是小而連續的整數時，應該使用數組，否則使用對象。

```js
console.log(typeof [1, 2]) //object
```

返回數組的類型是`object`，沒有任何意義。

判斷數組類型的方法

```js
console.log(Array.isArray(numbers)) //true
```
ECMAScript 5.1 (ECMA-262) 和 ECMAScript 2015 (6th Edition, ECMA-262) 標準中的方法。

或者下面這個方法。
```js
var is_array = function(value) {
    return Object.prototype.toString.apply(value) === '[object Array]'
}
console.log(is_array(numbers)) //true
```

### 方法

數組的方法被存儲在`Array.prototype`中的函數。

數組是對象，因此`Array.prototype`也是可擴充的。

### 指定初始值

JavaScript 的數組不會預制值。

JavaScript 沒有多維數組，單項大多數類 C 語言一樣，支持元素為數組的數組。

```js
var matrix = [
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3]
]
console.log(matrix[1][2]) //6
```

## 正則表達式

關於正則表達式，以前的博文寫的比較多了，詳情見：

[百度Web前端技術學院(2)-JavaScript 基礎 之正則表達式部分1](http://gaohaoyang.github.io/2015/04/22/baidu-ife-2-javascript/#section-10)

[百度Web前端技術學院(2)-JavaScript 基礎 之正則表達式部分2](http://gaohaoyang.github.io/2015/04/22/baidu-ife-2-javascript/#section-12)

[淺談正則表達式中的分組和引用](http://gaohaoyang.github.io/2016/05/06/regular-expression-group/)
