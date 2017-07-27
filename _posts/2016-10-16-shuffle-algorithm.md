---
layout: post
title:  "Fisher–Yates shuffle 洗牌算法"
categories: JavaScript
tags:  算法 shuffle 亂序 洗牌
author: HyG
---

* content
{:toc}

簡單來說 Fisher–Yates shuffle 算法是一個用來將一個有限集合生成一個隨機排列的算法（數組隨機排序）。這個算法生成的隨機排列是等概率的。同時這個算法非常高效。

本文主要介紹這個算法的來源、演變、原理。並舉出一個例子為大家清晰的描述每次迭代過程。最後使用 JavaScript 代碼將算法實現。

![](https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Riffle_shuffle.jpg/320px-Riffle_shuffle.jpg)




## Fisher and Yates 的原始版

![](https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Biologist_and_statistician_Ronald_Fisher.jpg/189px-Biologist_and_statistician_Ronald_Fisher.jpg)

Fisher–Yates shuffle 的原始版本，最初描述在 1938 年的 Ronald Fisher（上圖） 和 Frank Yates 寫的書中，書名為《Statistical tables for biological, agricultural and medical research》。他們使用紙和筆去描述了這個算法，並使用了一個隨機數表來提供隨機數。它給出了 1 到 N 的數字的的隨機排列，具體步驟如下：

1. 寫下從 1 到 N 的數字
2. 取一個從 1 到剩下的數字（包括這個數字）的隨機數 k
3. 從低位開始，得到第 k 個數字（這個數字還沒有被取出），把它寫在獨立的一個列表的最後一位
4. 重複第 2 步，直到所有的數字都被取出
5. 第 3 步寫出的這個序列，現在就是原始數字的隨機排列

已經證明如果第 2 步取出的數字是真隨機的，那麼最後得到的排序一定也是。

## 現代方法

Fisher–Yates shuffle 算法的現代版本是為計算機設計的。由 Richard Durstenfeld 在1964年 描述。並且是被 Donald E. Knuth 在 《The Art of Computer Programming》 中推廣。但是不管是 Durstenfeld 還是 Knuth，都沒有在書的第一版中承認這個算法是 Fisher 和 Yates 的研究成果。也許他們並不知道。不過後來出版的 《The Art of Computer Programming》提到了 Fisher 和 Yates 貢獻。

現代版本的描述與原始略有不同，因為如果按照原始方法，愚蠢的計算機會花很多無用的時間去計算上述第 3 步的剩餘數字。**這裡的方法是在每次迭代時交換這個被取出的數字到原始列表的最後**。這樣就將時間複雜度從 O(n^2) 減小到了 **O(n)**。算法的偽代碼如下：

```
-- To shuffle an array a of n elements (indices 0..n-1):
for i from n−1 downto 1 do
     j ← random integer such that 0 ≤ j ≤ i
     exchange a[j] and a[i]
```

## 例子

### 迭代步驟演示

根據每次迭代次數可以用下面的表格，描述這個算法的執行過程

| 隨機數取值範圍 | 隨機數 |        原始數據 | 結果          |
|:---------------|:-------|----------------:|:--------------|
|                |        | 1 2 3 4 5 6 7 8 |               |
| 1-8            | 6      |   1 2 3 4 5 7 8 | 6             |
| 1-7            | 2      |     1 7 3 4 5 8 | 2 6           |
| 1–6            | 6      |       1 7 3 4 5 | 8 2 6         |
| 1–5            | 1      |         5 7 3 4 | 1 8 2 6       |
| 1–4            | 3      |           5 7 4 | 3 1 8 2 6     |
| 1–3            | 3      |             5 7 | 4 3 1 8 2 6   |
| 1–2            | 1      |               7 | 5 4 3 1 8 2 6 |

### 動畫演示

下面這個動畫就是整個數組 0-19 的隨機排序過程

<iframe height='317' scrolling='no' src='//codepen.io/haoyang/embed/jrvrQq/?height=317&theme-id=dark&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/haoyang/pen/jrvrQq/'>Fisher–Yates shuffle</a> by Chuan shi (<a href='http://codepen.io/haoyang'>@haoyang</a>) on <a href='http://codepen.io'>CodePen</a>.
</iframe>

## JavaScript 代碼實現

```js
/**
 * Fisher–Yates shuffle
 */
Array.prototype.shuffle = function() {
    var input = this;

    for (var i = input.length-1; i >=0; i--) {

        var randomIndex = Math.floor(Math.random()*(i+1));
        var itemAtIndex = input[randomIndex];

        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
}
```

使用方式也很簡單，直接用數組調用這個方法即可

```js
[1,2,3,4,5,6,7,8].shuffle()

//[4, 6, 3, 2, 5, 1, 7, 8] // 每次結果都是隨機的
```

## 總結

總之，Fisher–Yates shuffle 算法是一個非常高效又公平的隨機排序算法，如果有隨機排序數組的需求，用這個就對了！

## 參考

- [Fisher–Yates shuffle From Wikipedia](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
