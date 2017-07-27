---
layout: post
title:  "ES2015學習筆記1-let和const、變量解構賦值、字符串、正則、數值"
categories: JavaScript
tags:  ES2015
---

* content
{:toc}

新的框架都支持 ES2015 了，雖然瀏覽器不支持部分語法，但是有 Babel 這個神器，ES2015 的普及大勢所趨。更優雅地寫代碼，對技術的追求是一件很有意思的事情！




![bloggbild_david_JS.jpg](https://ooo.0o0.ooo/2016/06/15/576125e78370d.jpg)

本文主要以 [ECMAScript 6 入門 -阮一峰](http://es6.ruanyifeng.com/) 作為參考資料。

## `let` 和 `const`

### `let`

#### 基本用法

用於聲明變量，用法類似於`var`，但聲明的變量只在`let`所在的代碼塊內有效。

```js
{
    let a = 10;
    var b = 1;
}
console.log(a) // ReferenceError: a is not defined.
console.log(b) // 1
```

`for`循環計數器，就很適合`let`命令。

```js
for (let i = 0; i < array.length; i++) {
    //...
}
console.log(i) //ReferenceError: i is not defined.
```

#### 不存在變量提升

`let`不像`var`那樣會發生“變量提升”現象。所以，變量一定要在聲明後使用，否則報錯。

```js
console.log(a) //undefined
console.log(b) //VM248:2 Uncaught ReferenceError: b is not defined(…)

var a = 1
let b = 2
```

聲明`b`之前，變量`b`是不存在的，這時如果用到它，就會拋出一個錯誤。

#### 暫時性死區

```js
if (true) {
    // TDZ開始
    tmp = 'abc'; // ReferenceError
    console.log(tmp); // ReferenceError

    let tmp; // TDZ結束
    console.log(tmp); // undefined

    tmp = 123;
    console.log(tmp); // 123
}
```

ES6 明確規定，如果區塊中存在`let`和`const`命令，這個區塊對這些命令聲明的變量，從一開始就形成了封閉作用域。凡是在聲明之前就使用這些變量，就會報錯。

總之，在代碼塊內，使用`let`命令聲明變量之前，該變量都是不可用的。這在語法上，稱為“暫時性死區”（temporal dead zone，簡稱TDZ）。

#### 不允許重複聲明

`let`不允許在相同作用域內，重複聲明同一個變量。

```js
// 報錯
function a() {
    let a = 10;
    var a = 1;
}

// 報錯
function b() {
    let a = 10;
    let a = 1;
}
```

### 塊級作用域

沒有塊級作用域時會出現的兩個問題：

1. 內層變量可能會覆蓋外層變量。
2. 用來計數的循環變量泄露為全局變量。

`let`實際上為 JavaScript 新增了塊級作用域。

* 外層作用域無法讀取內層作用域的變量。
* 內層作用域可以定義外層作用域的同名變量。
* 塊級作用域的出現，實際上使得獲得廣泛應用的立即執行匿名函數（IIFE）不再必要了。
* 函數本身的作用域，在其所在的塊級作用域之內。

### `const`

`const`聲明一個只讀的常量。一旦聲明，常量的值就不能改變。

```js
const PI = 3.1415;
PI = 3; // 常規模式時，重新賦值無效，但不報錯
//但是我在Chrome下運行報錯了，錯誤如下
//Uncaught TypeError: Assignment to constant variable.
console.log(PI); // 3.1415
```

`const`聲明的變量不得改變值，這意味著，`const`一旦聲明變量，就必須立即初始化，不能留到以後賦值。

`const`的作用域與`let`命令相同：只在聲明所在的塊級作用域內有效。

`const`命令聲明的常量也是不提升，同樣存在暫時性死區，只能在聲明的位置後面使用。

對於複合類型的變量，變量名不指向數據，而是指向數據所在的地址。`const`命令只是保證變量名指向的地址不變，並不保證該地址的數據不變，所以將一個對象聲明為常量必須非常小心。

```js
const foo = {};
foo.prop = 123;

console.log(foo.prop) // 123

foo = {}; // TypeError: "foo" is read-only
```

上面代碼中，常量`foo`儲存的是一個地址，這個地址指向一個對象。不可變的只是這個地址，即不能把`foo`指向另一個地址，但對象本身是可變的，所以依然可以為其添加新屬性。

如果真的想將對象凍結，應該使用`Object.freeze`方法。

ES5 只有兩種聲明變量的方法：`var`命令和`function`命令。ES6 除了添加`let`和`const`命令，後面章節還會提到，另外兩種聲明變量的方法：`import`命令和`class`命令。所以，ES6 一共有6種聲明變量的方法。

### 全局對象屬性

`var`命令和`function`命令聲明的全局變量，依舊是全局對象的屬性；另一方面規定，`let`命令、`const`命令、`class`命令聲明的全局變量，不屬於全局對象的屬性。也就是說，從 ES6 開始，全局變量將逐步與全局對象的屬性脫鉤。

```js
var a = 1;
// 如果在Node的REPL環境，可以寫成global.a
// 或者採用通用方法，寫成this.a
window.a // 1

let b = 1;
window.b // undefined
```

## 變量的解構賦值

### 數組的解構賦值

#### 基本用法

ES6允許按照一定模式，從數組和對象中提取值，對變量進行賦值，這被稱為解構（Destructuring）。

```js
var a = 1
var b = 2
var c = 3

//ES6 中允許寫成下面這樣
var [a,b,c] = [1,2,3]
```

如果解構不成功，變量的值就等於`undefined`。

```js
let [a, b] = [1]
console.log(a); //1
console.log(b); //undefined
```

另一種情況是不完全解構，即等號左邊的模式，只匹配一部分的等號右邊的數組。這種情況下，解構依然可以成功。如下：

```js
let [a, b] = [1]
console.log(a); //1
console.log(b); //undefined

let [c, [d]] = [4, [5, 6], 7]
console.log(c); //4
console.log(d); //5
```

如果等號的右邊不是數組（或者嚴格地說，不是可遍歷的結構，參見《Iterator》一章），那麼將會報錯。

解構賦值不僅適用於var命令，也適用於let和const命令。

#### 默認值

解構賦值允許指定默認值。

```js
let [foo = true] = [];
console.log(foo); //true

let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x2, y2 = 'b'] = ['a', undefined]; // x2='a', y2='b'
```

注意，ES6 內部使用嚴格相等運算符（`===`），判斷一個位置是否有值。所以，如果一個數組成員不嚴格等於`undefined`，默認值是不會生效的。

如果默認值是一個表達式，那麼這個表達式是惰性求值的，即只有在用到的時候，才會求值。

```js
function f() {
    console.log('aaa');
}

let [x = f()] = [1];
// x = 1
```

上述代碼的`f()`根本不會執行。因為`x`能取到值。

默認值可以引用解構賦值的其他變量，但該變量必須已經聲明。

### 對象的解構賦值

解構不僅可以用於數組，還可以用於對象。

```js
let { foo, bar } = { foo: "aaa", bar: "bbb" }
foo // "aaa"
bar // "bbb"
```

對象的解構與數組有一個重要的不同。數組的元素是按次序排列的，變量的取值由它的位置決定；而對象的屬性沒有次序，變量必須與屬性同名，才能取到正確的值。

```js
let { bar, foo } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: "aaa", bar: "bbb" };
baz // undefined
```

如果變量名與屬性名不一致，必須寫成下面這樣。

```js
var { foo: baz } = { foo: "aaa", bar: "bbb" };
baz // "aaa"

//轉化為如下代碼：
var _foo$bar2 = { foo: "aaa", bar: "bbb" };
var baz = _foo$bar2.foo;


let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'
```

也就是說，對象的解構賦值的內部機制，是先找到同名屬性，然後再賦給對應的變量。真正被賦值的是後者，而不是前者。

```js
var { foo: baz } = { foo: "aaa", bar: "bbb" };
baz // "aaa"
foo // error: foo is not defined
```

對於 let 和 const 來說，變量不能重新聲明，所以一旦賦值的變量以前聲明過，就會報錯。

和數組一樣，解構也可以用於嵌套結構的對象。

對象的解構也可以指定默認值。默認值生效的條件是，對象的屬性值嚴格等於`undefined`。

```js
var {x = 3} = {x: undefined};
x // 3

var {x = 3} = {x: null};
x // null
```

如果解構失敗，變量的值等於`undefined`。

```js
var {foo} = {bar: 'baz'};
foo // undefined
```

### 字符串的解構賦值

字符串也可以解構賦值。字符串被轉換為一個類似數組的對象。

```js
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```

### 數值和布爾值的解構賦值

解構賦值時，如果等號右邊是數值和布爾值，則會先轉為對象。

### 函數參數的解構賦值

函數的參數也可以使用解構賦值。

```js
function add([x, y]){
  return x + y;
}

add([1, 2]); // 3
```

### 圓括號問題

### 用途

## 字符串

## 正則

## 數值
