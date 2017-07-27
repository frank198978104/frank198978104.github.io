---
layout: post
title:  "JavaScript 函數"
date:   2015-06-11 14:06:05
categories: JavaScript
tags: JavaScript 函數 慕課網 ife
---

* content
{:toc}

本文為慕課網 [JavaScript深入淺出](http://www.imooc.com/learn/277) JavaScript 函數筆記。





## 概念

函數是一塊JavaScript代碼，被定義一次，但可執行和調用多次。

JS中的函數也是對象，所以JS函數可以像其它對象那樣操作和傳遞。

所以我們也常叫JS中的函數為函數對象。

例如：

```js
function foo(x, y) {
    if (typeof x === 'number' &&
        typeof y === 'number') {
        return x + y;
    } else {
        return 0;
    }
}
foo(1, 2); // 3
```

一般由3部分組成：

* 函數名
* 參數列表
* 函數體

### 調用方式

* 直接調用

```js
foo();
```

* 對象方法

```js
o.method();
```

* 構造器

```js
new Foo();
```

* call/apply/bind

```js
func.call(o);
```

## 函數聲明與函數表達式

### 函數聲明

就是對函數進行普通的聲明

```js
function add(a, b) {
    return a + b;
}
```

### 函數表達式

* 將函數賦值給變量

```js
//function variable
var add = function(a, b) {
    // body...
};
```

* 立即執行函數

    把匿名函數用括號括起來，再直接調用。

```js
// IEF(Immediately Executed Function)
(function() {
    // body...
})();
```

* 函數對象作為返回值

```js
return function() {
    // body...
};
```

* 命名式函數表達式

```js
//NFE(Named Function Expression)
var add = function foo(a, b) {
    // body...
};
```

這裡大家肯定會好奇，這個函數怎麼調用？到底用哪個名字呢？

做一個測試：

```js
var func = function nfe() {};
console.log(func === nfe);
// 在 IE6~8，得到 false
// 在 IE9+ 及現代瀏覽器中 Uncaught ReferenceError: nfe is not defined
```

那麼命名函數表達式有什麼使用場景呢？

* 一般用於調試方便，如果使用匿名函數，執行的時候看不到函數名，命名函數表達式是可以看到函數名的。
* 或者在遞歸時，使用名字調用自己。

但是這兩種用法都不常見。

### 變量 & 函數的聲明前置

舉兩個例子

例1，函數聲明：

```js
var num = add(1,2);
console.log(num);

function add(a, b) {
    return a + b;
}
```

例2，函數表達式：

```js
var num = add(1, 2);
console.log(num);

var add = function(a, b) {
    return a + b;
};
```

例1中得到的結果是 3，而例2中是 `Uncaught TypeError: add is not a function`。

因為函數和變量在聲明的時候，會被前置到當前作用域的頂端。例1將函數聲明 `function add(a, b)` 前置到作用域前端，例2將聲明 `var add` 前置到其作用域的前端了，並沒有賦值。**賦值的過程是在函數執行到響應位置的時候才進行的**。

### Function 構造器

除了函數聲明、函數表達式。還有一種創建函數對象的方式，是使用函數構造器。

```js
var func = new Function('a','b','console.log(a+b);');
func(1,2);//3

var func2 = Function('a','b','console.log(a+b);');
func2(1,2);//3
```

Function 中前面的參數為後面函數體的形參，最後一個參數為函數體。可以看到傳入的都是字符串，這樣的創建函數對象的方法是不安全的。

還有一點，Function 構造器的得到的函數對象，拿不到外層函數的變量，但是可以拿到全局變量。它的作用域與眾不同，這也是很少使用的原因之一。

### 對比

![函數對比](http://7q5cdt.com1.z0.glb.clouddn.com/blog-function.png)

---

## 函數屬性 & arguments

### 函數屬性 & arguments

```js
function foo(x, y, z) {
    arguments.length; // 2
    arguments[0]; // 1
    arguments[0] = 10;
    x; // change to 10

    arguments[2] = 100;
    z; // still undefined!!!
    arguments.callee === foo; // true
}

foo(1, 2);
foo.length; // 3
foo.name; //"foo"
```

* `foo.name` 函數名
* `foo.length` 形參個數
* `arguments.length` 實參個數

未傳參數時，arguments[i] 相應的位置仍然是 undefined。

嚴格模式下，代碼中的改變實參失效。即 x 仍為 1。同時 callee 屬性失效。

* 關於 `callee`

    callee 屬性的初始值就是正被執行的 Function 對象。

    callee 屬性是 arguments 對象的一個成員，它表示對函數對象本身的引用，這有利於匿名函數的遞歸或者保證函數的封裝性，例如下邊示例的遞歸計算1到n的自然數之和。而該屬性僅當相關函數正在執行時才可用。還有需要注意的是callee擁有length屬性，這個屬性有時用於驗證還是比較好的。

    arguments.length是實參長度，arguments.callee.length是形參長度，由此可以判斷調用時形參長度是否和實參長度一致。


### apply/call 方法（瀏覽器）

```js
function foo(x, y) {
    console.log(x, y, this);
}

foo.call(100, 1, 2); //1 2 Number {[[PrimitiveValue]]: 100}
foo.apply(true, [3, 4]); //3 4 Boolean {[[PrimitiveValue]]: true}
foo.apply(null); //undefined undefined Window
foo.apply(undefined); //undefined undefined Window
```

* call/apply 的作用：調用一個對象的一個方法，以另一個對象替換當前對象(其實就是更改對象的內部指針，即改變對象的this指向的內容)。
* call/apply 的第一個參數為對象，即使不是對象，也會被包裝為對象。
* call 為扁平化傳參，apply 後面的參數為數組
* 傳入 null/undefined 時，實際為 Window 對象
* 在嚴格模式下：上述代碼最後兩行分別輸出 `null`, `undefined`

### bind 方法

`bind` 是 ES5 中提出的方法，所以瀏覽器支持為 IE9+ 及現代瀏覽器。

```js
this.x = 9;
var module = {
    x: 81,
    getX: function() {
        return console.log(this.x);
    }
};

module.getX(); //81

var getX = module.getX;
getX(); //9

var boundGetX = getX.bind(module);
boundGetX(); //81
```

`bind` 主要用於改變函數中的 `this`

* `module.getX(); ` 直接通過對象調用自己的方法，結果是 81
* `var getX = module.getX;` 將這個方法賦值給一個全局變量，這時 this 指向了 Window，所以結果為 9
* `var boundGetX = getX.bind(module);` 使用 bind 綁定了自己的對象，這樣 this 仍然指向 module 對象，所以結果為 81


#### bind 與 currying

bind 可以使函數柯裡化，那麼什麼是柯裡化？

> 在計算機科學中，柯裡化（Currying）是把接受多個參數的函數變換成接受一個單一參數(最初函數的第一個參數)的函數，並且返回接受餘下的參數且返回結果的新函數的技術。這個技術由 Christopher Strachey 以邏輯學家 Haskell Curry 命名的，儘管它是 Moses Schnfinkel 和 Gottlob Frege 發明的。

```js
function add(a, b, c) {
    return a + b + c;
}

var func = add.bind(undefined, 100);
func(1, 2); //103

var func2 = func.bind(undefined, 200);
func2(10); //310
```

add 函數擁有 3 個參數。我們想先傳入一個參數，再去傳其他參數。

`var func = add.bind(undefined, 100);` add 函數對象調用 bind 方法，由於不需要將 this 指向原來的 add 函數對象，所以第一個參數寫為 undefined 或 null。第二個參數 100 傳給了 add 函數中的形參 a，並賦值給一個新的函數對象 func。

這時，`func(1, 2)` 即相當於傳入後兩個參數，所以結果為 103。

同理，基於 func 可以創造一個函數 func2。它只用傳最後一個參數。


#### bind 與 new

```js
function foo() {
    this.b = 100;
    return this.a;
}

console.log(foo()); //undefined

var func = foo.bind({
    a: 1
});

console.log(func()); //1
console.log(new func()); //foo {b: 100}
```

對於使用了 `new func()` 這種方式創建對象，其返回值為一個對象。

而原函數 foo 的返回值不是對象，所以會直接忽視這個 return 方法。而是變為 `return this;`。並且 this 會被初始化為一個空對象，這個空對象的原型指向 foo.prototype。所以後面的 bind 是不起作用的。

這裡面這個 this 對象包含一個屬性 `b = 100`。所以返回的是對象 `{b: 100}`。
