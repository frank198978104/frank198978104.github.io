---
layout: post
title:  "JavaScript 面向對象"
date:   2015-06-15 14:06:05
categories: JavaScript
tags: JavaScript 面向對象 慕課網 ife
---

* content
{:toc}

本文為慕課網 [JavaScript深入淺出](http://www.imooc.com/learn/277)  JavaScript 面向對象筆記。





## 概念

> 面向對象程序設計（Object-oriented programming，OOP）是一種程序設計范型，同時也是一種程序開發的方法。對象指的是類的實例。它將對象作為程序的基本單元，將程序和數據封裝其中，以提高軟件的重用性、靈活性和擴展性。
>
> ——維基百科

一般面向對象包含：繼承，封裝，多態，抽象

---

## 基於原型的繼承

    function Foo() {
        this.y = 2;
    }
    console.log(typeof Foo.prototype); //object

    Foo.prototype.x = 1;
    var obj3 = new Foo();

    console.log(obj3.y); //2
    console.log(obj3.x); //1

創建函數 `Foo` 的時候，就會有一個內置的 `Foo.prototype` 屬性，並且這個屬性是對象。

在使用 `new Foo();` 創建對象實例時。`this` 會指向一個對象，並且這個對象的原型會指向 `Foo.prototype` 屬性。`this.y = 2` 給這個對象賦值，並把這個對象返回。把這個對象賦值給 `obj3`。

`y` 是 `obj3` 上的，`x` 是 `obj3` 的原型 `Foo.prototype` 上的。

![prototype](http://7q5cdt.com1.z0.glb.clouddn.com/blog-prototype.png)

---

### prototype 屬性與原型

prototype 是函數對象上預設的對象屬性。

原型是對象上的原型，通常是構造器的 prototype 屬性。

---

#### 例

    function Person(name, age) {
        this.name = name;
        this.age = age;
    }

    Person.prototype.LEGS_NUM = 2;
    Person.prototype.ARMS_NUM = 2;

    Person.prototype.hi = function() {
        console.log('Hi, my name is ' + this.name + ". I'm " + this.age + ' years old now');
    };

    Person.prototype.walking = function() {
        console.log(this.name + ' is walking...');
    };

    function Student(name, age, className) {
        Person.call(this, name, age); //使 Person 中的 this 指向 Student
        this.className = className;
    }

    Student.prototype = Object.create(Person.prototype);
    Student.prototype.constructor = Student;

    Student.prototype.hi = function() {
        console.log('Hi, my name is ' + this.name + ". I'm " + this.age + ' years old now, and from ' + this.className + ".");
    };

    Student.prototype.learn = function(subject) {
        console.log(this.name + ' is learning ' + subject + ' at ' + this.className + '.');
    }

    //test
    var gao = new Student('Gao', '24', 'Class 3123');
    console.log(gao); // 這個對象的具體內容見下圖
    gao.hi(); //Hi, my name is Gao. I'm 24 years old now, and from Class 3123.
    gao.LEGS_NUM; //2
    gao.walking(); //Gao is walking...
    gao.learn('JavaScript'); //Gao is learning JavaScript at Class 3123.

* `Object.create(arg)` 創建一個空對象，並且這個對象的原型指向參數 `arg`。
* `Student.prototype.constructor = Student` 為了保證一致性，否則 constructor 指向 Person。

---

### 原型鏈

gao 對象的原型鏈：

![Object](http://7q5cdt.com1.z0.glb.clouddn.com/blog-oop-gao.png)

下面通過圖形展示原型鏈：

![原型鏈](http://7q5cdt.com1.z0.glb.clouddn.com/blog-原型鏈.png)

---

#### `Object.create(null)` & `.bind(null)`

這兩種算是特例。

`Object.create(null)` 和 `.bind(null)` 這兩種方式創建出來的對象是沒有 `prototype` 屬性的，為 `undefined`。

---

## prototype 屬性

### 改變 prototype

JavaScript 中的 prototype 是對象，在運行的時候可以修改。

給 prototype 添加或刪除一些屬性，是會影響到已經創建好的實例對象的。

但是，直接修改 prototype 屬性，是不會影響到已經創建好的實例對象的。但是會影響到新的實例對象。如下代碼：

    // 上接上面的代碼

    // 給 prototype 添加或刪除一些屬性
    Student.prototype.x = 101;
    console.log(gao.x); //101

    // 直接修改 prototype 屬性
    Student.prototype = {
        y: 2
    };

    // 不會影響到已創建好的實例對象
    console.log(gao.x); //101
    console.log(gao.y); //undefined

    // 會影響到新創建的實例對象
    var ying = new Student('Ying', 24, 'UI');
    console.log(ying.x); //undefined
    console.log(ying.y); //2

---

### 內置構造器的 `prototype` 屬性

修改內置構造器的 `prototype` 屬性後，在實例化這個對象後，枚舉其屬性時，會把修改的內置構造器的 `prototype` 屬性也枚舉出來，有時候這是要避免的。可用 `defineProperty` 方法解決。如下代碼：

    Object.prototype.x = 1;
    var obj = {};
    console.log(obj.x); //1
    console.log(obj);

    for (var k in obj) {
        console.log('result--->' + k);
    }
    // result--->x

使用 `defineProperty` 後：

    Object.defineProperty(Object.prototype, 'x', {
        writable: true,
        value: 1
    });
    var obj = {};
    console.log(obj.x);//1
    console.log(obj);
    for (var k in obj) {
        console.log('result--->' + k);
    }
    // nothing output here

其實也可以這樣枚舉，使用 `hasOwnProperty` 方法：

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            console.log("result--->" + key);
        }
    }

---

### 創建對象-new/原型鏈

![prototype](http://7q5cdt.com1.z0.glb.clouddn.com/blog-new prototype.png)

---

## instanceof

    console.log([1, 2] instanceof Array); //true
    console.log([1, 2] instanceof Object); //true
    console.log(new Object() instanceof Array); //false

左邊要求是對象，右邊要求是構造器或函數。它會判斷：**右邊的構造器中的 `prototype` 屬性是否出現在左邊的對象的原型鏈上。**

* **注意：**不同的 window 或 iframe 間的對象類型檢測**不能**使用 `instanceof`！

---

## 實現繼承的方式

    function Person() {}

    function Student() {}

    Student.prototype = Person.prototype; //1

    Student.prototype = new Person(); //2

    Student.prototype = Object.create(Person.prototype); //3

    Student.prototype.constructor = Student;

注釋中：

1 是錯誤的。如果改變了 Student 就會改變 Person

2 可以實現繼承，但是其調用了構造函數，若父類構造函數中有形參，那麼傳值就會比較奇怪。

3 是最好的方法。創建了一個空對象，並且對象的原型指向參數 Person.prototype。這樣便實現了繼承。同時原型鏈寫，不向上查找。但是 `Object.create` 是ES5 中的方法，所以可以使用下列代碼做兼容：

    if (!Object.create) {
        Object.create = function(proto) {
            function F() {}
            F.prototype = proto;
            return new F;
        };
    }

---

## 模擬重載

    function Person() {
        var args = arguments;
        if (typeof args[0] === 'object' && args[0]) {
            if (args[0].name) {
                this.name = args[0].name;
            }
            if(args[0].age){
                this.age = args[0].age;
            }
        } else {
            if (args[0]) {
                this.name = args[0];
            }
            if (args[1]) {
                this.age = args[1];
            }
        }
    }

    //重寫 toString 方法
    Person.prototype.toString = function() {
        console.log('name='+this.name+', age='+this.age);
    };

    var gao = new Person({name:'Gao',age:24});
    gao.toString(); // name=Gao, age=24

    var ying = new Person('Ying',25);
    ying.toString(); // name=Ying, age=25

對參數進行判斷，模擬實現重載。

---

## 調用子類方法

    function Person(name) {
        this.name = name;
    }

    function Student(name, className) {
        this.className = className;
        Person.call(this, name); // 調用基類的構造器
    }

    var gao = new Student('Gao', '3123');
    console.log(gao); // Student {className: "3123", name: "Gao"}

    Person.prototype.init = function() {};

    Student.prototype.init = function() {
        // do sth...
        Person.prototype.init.apply(this, arguments); // 同時也想調用父類被覆蓋的方法
    };

主要是兩種：調用父類的構造器，調用原型鏈上父類被覆蓋的方法。

---

## 鏈式調用

    function ClassManager() {}
    ClassManager.prototype.addClass = function(str) {
        console.log('Class: ' + str + ' added');
        return this;
    };

    var manager = new ClassManager();
    manager.addClass('classA').addClass('classB').addClass('classC');
    // Class: classA added
    // Class: classB added
    // Class: classC added

重點在於 return this。返回這個 ClassManager 的實例。這樣這個實例又可以繼續調用方法。

---

## 抽象類

在構造器中 `throw new Error('');` 拋異常。這樣防止這個類被直接調用。

    function DetectorBase() {
        throw new Error('Abstract class can not be invoked directly!');
    }

    DetectorBase.detect = function() {
        console.log('Detection starting...');
    }
    DetectorBase.stop = function() {
        console.log('Detection stopped.');
    };
    DetectorBase.init = function() {
        throw new Error('Error');
    }

    var d = new DetectorBase();// Uncaught Error: Abstract class can not be invoked directly!

    function LinkDetector() {}
    LinkDetector.prototype = Object.create(DetectorBase.prototype);
    LinkDetector.prototype.constructor = LinkDetector;

    var l = new LinkDetector();
    console.log(l); //LinkDetector {}__proto__: LinkDetector
    l.detect(); //Uncaught TypeError: l.detect is not a function
    l.init(); //Uncaught TypeError: l.init is not a function

`var d = new DetectorBase();` 是不能實例化的，會報錯

`l.detect();` 但是這個為什麼報錯我就不知道了。

已經在原課程下提問了，期待老師的講解。 [抽象類中子類為什麼不能調用父類的非抽象方法？](http://www.imooc.com/qadetail/82732)

問題已經解決了，應該是老師當時的課件寫錯了，應該再基類中將這兩個方法寫在其原型 prototype 上。如下：

    function DetectorBase() {
        throw new Error('Abstract class can not be invoked directly!');
    }

    DetectorBase.prototype.detect = function() {
        console.log('Detection starting...');
    };
    DetectorBase.prototype.stop = function() {
        console.log('Detection stopped.');
    };
    DetectorBase.prototype.init = function() {
        throw new Error('Error');
    };

    // var d = new DetectorBase();// Uncaught Error: Abstract class can not be invoked directly!

    function LinkDetector() {}
    LinkDetector.prototype = Object.create(DetectorBase.prototype);
    LinkDetector.prototype.constructor = LinkDetector;

    var l = new LinkDetector();
    console.log(l); //LinkDetector {}__proto__: LinkDetector
    l.detect(); //Detection starting...
    l.init(); //Uncaught Error: Error

---

## 模塊化

    var moduleA;
    moduleA = function() {
        var prop = 1;

        function func() {}

        return {
            func: func,
            prop: prop
        };
    }(); // 立即執行匿名函數

prop，func 不會被泄露到全局作用域。

或者另一種寫法，使用 new

    moduleA = new function() {
        var prop = 1;

        function func() {}

        this.func = func;
        this.prop = prop;
    }

更複雜的可以使用 Sea.js Kissy Require.js 模塊化工具。

---

最後補充一點設計模式相關的資料，我還沒有來得及看的：

* [學用 JavaScript 設計模式](http://www.oschina.net/translate/learning-javascript-design-patterns)
* [常用的Javascript設計模式](http://blog.jobbole.com/29454/)
* [JavaScript設計模式深入分析](http://developer.51cto.com/art/201109/288650_all.htm)
