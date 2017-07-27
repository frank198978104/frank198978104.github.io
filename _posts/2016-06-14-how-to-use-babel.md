---
layout: post
title:  "如何使用 babel"
categories: JavaScript
tags:  ES2015 ES6 ES5 babel 
---

* content
{:toc}

[Babel](https://babeljs.io/) 用於將 ES6 的代碼轉化為 ES5，使得 ES6 可以在目前的瀏覽器環境下使用。學習使用 babel 是為了使用 ES2015 做準備。本文將介紹如何使用 babel，以及一些相關的配置。




![](https://babeljs.io/images/logo.svg)

學習 Babel 可以通過其手冊 Babel handbook。

* [babel-handbook](https://github.com/thejameskyle/babel-handbook)

其中包含多語言版本，分為[用戶手冊](https://github.com/thejameskyle/babel-handbook/blob/master/translations/zh-Hans/user-handbook.md)和[插件手冊](https://github.com/thejameskyle/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)。這是一個很好的學習 Babel 的資料。

## babel-cli

在 node 和 npm 環境安裝好的前提下，安裝 babel，如下：

```sh
npm install --global babel-cli
```

安裝完成後就可以編譯文件了。

```sh
babel main.js
```

編譯後的文件顯示在終端上，可以添加其他命令讓它輸出到指定文件下：

```sh
babel example.js --out-file compiled.js
或
babel example.js -o compiled.js
```

或將整個目錄編譯成一個新的目錄：

```sh
babel src --out-dir lib
或
babel src -d lib
```

但這很麻煩，並且並不是一個很好的解決方案，請看下一節項目內運行 babel-cli。

## 在項目內運行 babel-cli

初始化項目

```sh
npm init
```

再安裝 babel-cli

```sh
npm install --save-dev babel-cli
```

項目中的`package.json`應該包含如下內容：

```json
{
  "name": "learn-es6",
  "version": "1.0.0",
  "devDependencies": {
    "babel-cli": "^6.10.1"
  }
}
```

添加 npm scripts 命令。

```diff
{
  "name": "learn-es6",
  "version": "1.0.0",
+   "scripts": {
+     "build": "babel src -d lib"
+   },
  "devDependencies": {
    "babel-cli": "^6.10.1"
  }
}
```

此時在終端裡運行

```sh
npm run build
```

還不能成功編譯，因為沒有配置`.babelrc`文件。

## 配置`.babelrc`

通過配置`.babelrc`來告訴 babel 來做什麼。

在項目的根路徑下創建`.babelrc`文件。然後輸入以下內容作為開始：

```json
{
    "presets": [],
    "plugins": []
}
```

為了讓 babel 將 ES2015 轉化為 ES5，我們要安裝如下：

```sh
npm install --save-dev babel-preset-es2015
```

安裝完成後在`.babelrc`中添加參數：

```diff
{
    "presets": [
+       "es2015"
    ],
    "plugins": []
}
```

現在在項目`src/main.js`中寫一些 ES2015 的代碼試試吧。

```js
let a = 1
```

在終端中輸入命令

```sh
npm run build
```

執行後終端中顯示：

```
> learn-es6@1.0.0 build c:\gitWorkSpace\learn-es6
> babel src -d lib
```

然後可以看到目錄中出現了`lib/main.js`

```js
"use strict";

var a = 1;
```

即編譯成功。

## 配置`.jshintrc`

若編輯器中安裝了 jshint 語法檢查的插件。默認對於 ES2015 的代碼可能會報錯或者警告，看著可能會不爽。我們可以在配置文件中將它設置為允許 ES2015 的模式。

在項目根目錄下創建文件`.jshintrc`。內容如下：

```json
{
    "asi": true,
    "esversion": 2015
}
```

上述文件我分別設置了，使用無分號模式，es 版本使用 2015。

關於`.jshintrc`的更詳細配置可以參見官方示例：[https://github.com/jshint/jshint/blob/master/examples/.jshintrc](https://github.com/jshint/jshint/blob/master/examples/.jshintrc)

好，babel 就說到這裡，下面開始進入真正的 ES2015 的學習！
