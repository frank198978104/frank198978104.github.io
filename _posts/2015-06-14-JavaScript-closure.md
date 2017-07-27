---
layout: post
title:  "JavaScript 中的閉包"
date:   2015-06-14 14:06:05
categories: JavaScript
tags: JavaScript 閉包 慕課網 ife
---

* content
{:toc}

本文為慕課網 [JavaScript深入淺出](http://www.imooc.com/learn/277) JavaScript 中的閉包筆記。





## 閉包的例子

    function outer() {
        var localVal = 30;
        return localVal;
    }

    console.log(outer()); //30

    function outer2() {
        var localVal = 30;
        return function() {
            return localVal;
        };
    }

    var func = outer2();
    console.log(func()); //30

對於第一個普通的函數，在執行過之後，它的局部變量就可以被釋放。

對於第二個函數，`localVal` 是不能被釋放的。因為調用 `outer2()` 後，返回的是匿名函數，匿名函數可以訪問外部的 `outer2()` 中的局部變量，並返回了這個局部變量 localVal。當 `outer2()` 賦值給 `func` 後，再次調用 `func()`，仍能訪問到局部變量 `localVal`。這種情況就是閉包。

---

## 應用

* **所謂閉包就是：子函數可以使用父函數中的局部變量。**

        ! function() {
            var localData = "localData here";
            document.addEventListener('click',
                function() {
                    console.log(localData); //這裡訪問外部數據
                });
        }();

        ! function() {
            var localData = "localData here";
            var url = "http://www.baidu.com/";
            $.ajax({
                url: url,
                success: function() {
                    // do sth...
                    console.log(localData); //這裡訪問外部數據
                }
            });
        }()

---

## 常見錯誤之循環閉包

比如我們想循環綁定點擊事件

    document.body.innerHTML = "<div id=div1>aaa</div><div id=div2>bbb</div><div id=div3>ccc</div>";
    for (var i = 1; i < 4; i++) {
        document.getElementById('div' + i).
        addEventListener('click', function() {
            alert(i); // all are 4!
        });
    }

上面的代碼，我們點擊任何一個 div，彈出的都是 4

這是因為，for 循環中的 i 是一個全局變量。這裡內函數的點擊事件，訪問到的是循環後的 i 值，所以是 4

    document.body.innerHTML = "<div id=div1>aaa</div><div id=div2>bbb</div><div id=div3>ccc</div>";
    for (var i = 1; i < 4; i++) {
        ! function(i) {
            document.getElementById('div' + i).
            addEventListener('click', function() {
                alert(i); // 1, 2, 3
            });
        }(i);
    }

這裡使用了立即執行函數，並給匿名函數賦值 i，這樣點擊事件每一次就會訪問到相應的 i。

---

## 封裝

    (function() {
        var _userId = 9527;
        var _typeId = "item";
        var exp = {};

        function converter(userId) {
            return +userId;
        }

        exp.getUserId = function() {
            return converter(_userId);
        };

        exp.getTypeId = function() {
            return _typeId;
        };

        window.a = exp;
    })();

    console.log(a.getUserId()); //9527
    console.log(a.getTypeId()); //item

    console.log(a._userId); //undefined
    console.log(a._typeId); //undefined
    console.log(converter); //Uncaught ReferenceError: converter is not defined

上面的代碼通過閉包實現了一個封裝。

---

## 總結

> * 在計算機科學中，閉包（也稱詞法閉包或函數閉包）是指一個函數或函數的引用，與一個引用環境綁定在一起。這個引用環境是一個存儲該函數每個非局部變量（也叫自由變量）的表。
>
> * 閉包，不同於一般的函數，它允許一個函數在立即詞法作用域外調用時，仍可訪問非本地變量。
>
> from 維基百科

* 閉包的優點
    * 靈活和方便
    * 封裝

* 缺點
    * 空間浪費
    * 內存泄露
    * 性能消耗
