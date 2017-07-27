---
layout: post
title:  "JavaScript 中的 this"
date:   2015-06-12 14:06:05
categories: JavaScript
tags: JavaScript 慕課網 this ife
---

* content
{:toc}

本文為慕課網 [JavaScript深入淺出](http://www.imooc.com/learn/277) JavaScript 中的 this筆記。





## 全局的 this

全局 this 一般指向全局對象，瀏覽器中的全局對象就是 `window`。

例如：


```js
console.log(this.document === document); //true
console.log(this === window); //true

this.a = 91;
console.log(window.a); //91
```

## 一般函數的 this

```js
function f1 () {
    return this;
}
console.log(f1() === window);//true, global object
```

可以看到一般函數的 this 也指向 window，在 nodeJS 中為 global object

```js
function f2 () {
    "use strict";//使用嚴格模式
    return this;
}
console.log(f1() === undefined);//true
```

嚴格模式中，函數的 this 為 undefined


## 作為對象方法的函數的 this

```js
var o = {
    prop: 37,
    f: function() {
        return this.prop;
    }
};
console.log(o.f()); // 37
```

上述代碼通過字面量創建對象 o。

f 為對象 o 的方法。這個方法的 this 指向這個對象，在這裡即對象 o。

```js
var o = {
    prop: 37
};

function independent() {
    return this.prop;
}
o.f = independent;
console.log(o.f()); // 37
```

上面的代碼，創建了對象 o，但是沒有給對象 o，添加方法。而是通過 `o.f = independent` 臨時添加了方法屬性。這樣這個方法中的 this 同樣也指向這個對象 o。

## 對象原型鏈上的 this

```js
var o = {
    f: function() {
        return this.a + this.b;
    }
};
var p = Object.create(o);
p.a = 1;
p.b = 2;
console.log(p.f()); //3
```

通過 `var p = Object.create(o)` 創建的對象，p 是基於原型 o 創建出的對象。

p 的原型是 o，調用 f() 的時候是調用了 o 上的方法 f()，這裡面的 this 是可以指向當前對象的，即對象 p。

## get/set 方法與 this

```js
function modulus() {
    return Math.sqrt(this.re * this.re + this.im * this.im);
}
var o = {
    re: 1,
    im: -1,
    get phase() {
        return Math.atan2(this.im, this.re);
    }
};
Object.defineProperty(o, 'modulus', {
    get: modulus,
    enumerable: true,
    configurable: true
});
console.log(o.phase, o.modulus); // -0.78 1.4142
```

get/set 方法中的 this 也會指向 get/set 方法所在的對象的。

## 構造器中的 this

```js
function MyClass() {
    this.a = 25;
}
var o = new MyClass();
console.log(o.a); //25
```

new MyClass() 的時候，MyClass()中的 this 會指向一個空對象，這個對象的原型會指向 MyClass.prototype。MyClass()沒有返回值或者返回為基本類型時，默認將 this 返回。

```js
function C2() {
    this.a = 26;
    return {
        a: 24
    };
}

o = new C2();
console.log(o.a); //24
```

因為返回了對象，將這個對象作為返回值


## call/apply 方法與 this

```js
function add(c, d) {
    return this.a + this.b + c + d;
}
var o = {
    a: 1,
    b: 3
};
add.call(o, 5, 7); // 1 + 3 + 5 + 7 = 16
add.apply(o, [10, 20]); // 1 + 3 + 10 + 20 = 34
function bar() {
    console.log(Object.prototype.toString.call(this));
}
bar.call(7); // "[object Number]"
```

## bind 方法與 this

```js
function f() {
    return this.a;
}
var g = f.bind({
    a: "test"
});
console.log(g()); // test
var o = {
    a: 37,
    f: f,
    g: g
};
console.log(o.f(), o.g()); // 37, test
```

綁定之後再調用時，仍然會按綁定時的內容走，所以 o.g() 結果是 test
