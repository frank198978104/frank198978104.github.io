---
layout: post
title:  "代碼校驗工具 SublimeLinter 的安裝與使用"
date:   2015-03-26 15:14:54
categories: Sublime
tags: Sublime jshint csslint
---

* content
{:toc}

本文我將講述一下 SublimeLinter 的安裝過程。其組件 jshint 的安裝與使用。其組件 csslint 的安裝與使用。我將基於 [Sublime Text 3](http://sublimetext.com/3) 來安裝。使用 Sublime Text 2 的用戶閱讀本文是沒有幫助的。

SublimeLinter 是 Sublime 的插件，它的作用是檢查代碼語法是否有錯誤，並提示。習慣了 IDE 下寫代碼的人一定需要一款在 Sublime 上類似的語法檢查工具。下面我們開始。   





## 安裝 SublimeLinter   

如同其他插件一樣使用 Package Control 來安裝。   

1. 按下 `Ctrl+Shift+p` 進入 Command Palette   
2. 輸入`install`進入 Package Control: Install Package   
3. 輸入`SublimeLinter`。進行安裝.   

![SublimeLinter](http://7q5cdt.com1.z0.glb.clouddn.com/SublimeLinter-sublimeLinter.jpg)   

安裝完成後可以看到這樣一段話：   

```
Welcome to SublimeLinter, a linter framework for Sublime Text 3.

                  * * * IMPORTANT! * * *

         SublimeLinter 3 is NOT a drop-in replacement for
        earlier versions.

         Linters *NOT* included with SublimeLinter 3,
         they must be installed separately.

         The settings are different.

                 * * * READ THE DOCS! * * *

 Otherwise you will never know how to install linters, nor will
 you know about all of the great new features in SublimeLinter 3.

 For complete documentation on how to install and use SublimeLinter,
 please see:

 http://www.sublimelinter.com
```

可以看到具體的 Linters 組件**不**被包含在 SublimeLinter 3 中，所以我們要額外獨立安裝組件。   
可以針對不同的語言安裝不同的組件。   

## JavaScript 語法檢查   

SublimeLinter-jshint 是基於 nodeJS 下的 jshint 的插件，實際上 SublimeLinter-jshint 調用了 nodeJS 中 jshint 的接口來進行語法檢查的。   

---

### 安裝 SublimeLinter-jshint

為了讓 JavaScript 代碼有語法檢查，我們安裝 SublimeLinter-jshint   
同樣的方法，我們安裝 SublimeLinter-jshint    

1. 按下 `Ctrl+Shift+p` 進入 Command Palette   
2. 輸入`install`進入 Package Control: Install Package   
3. 輸入`SublimeLinter-jshint`。進行安裝.   

如下圖   

![SublimeLinter-jshint](http://7q5cdt.com1.z0.glb.clouddn.com/SublimeLinter-jshint.jpg)   

安裝完成後我們可以看到下面的一段話   

```
SublimeLinter-jshint
  -------------------------------
  This linter plugin for SublimeLinter provides an interface to jshint.

  ** IMPORTANT! **

  Before this plugin will activate, you *must*
  follow the installation instructions here:

  https://github.com/SublimeLinter/SublimeLinter-jshint
```

### 安裝 nodeJS 和 jshint

在插件開始工作之前，我們必須再看一下上述插件的[安裝說明](https://github.com/SublimeLinter/SublimeLinter-jshint)   
通過 [SublimeLinter-jshint 的說明](https://github.com/SublimeLinter/SublimeLinter-jshint) 我們可以看到，這個組件依賴於 nodeJS 下的 jshint，所以我們安裝 nodeJS 環境和 nodeJS 下的 jshint。   

1. 安裝 [Node.js](https://nodejs.org/)   
2. 通過 npm 安裝`jshint`   

在命令行下輸入如下代碼，完成安裝   

	npm install -g jshint

安裝完成後命令行中出現如下的信息   

```
C:\Users\Administrator\AppData\Roaming\npm\jshint -> C:\Users\Administrator\AppData\Roaming\npm\node_modules\jshint\bin\jshint
jshint@2.6.3 C:\Users\Administrator\AppData\Roaming\npm\node_modules\jshint
├── strip-json-comments@1.0.2
├── underscore@1.6.0
├── exit@0.1.2
├── shelljs@0.3.0
├── console-browserify@1.1.0 (date-now@0.1.4)
├── htmlparser2@3.8.2 (domelementtype@1.3.0, entities@1.0.0, domhandler@2.3.0, readable-stream@1.1.13, domutils@1.5.1)
├── minimatch@1.0.0 (sigmund@1.0.0, lru-cache@2.5.0)
└── cli@0.6.6 (glob@3.2.11)
```

可以查看 jshint 版本，已確認安裝完成。  

```
C:\Users\Administrator>jshint -v
jshint v2.6.3
```

現在，恭喜你，我們使用 Sublime 編輯 JavaScript 文件，就會有語法檢查了！   

在編輯過程中，會有如下提示   

![SublimeLinter-jshint-test](http://7q5cdt.com1.z0.glb.clouddn.com/SublimeLinter-jshint-test.jpg)

點擊提示點後，Sublime 狀態欄也會有相應的說明   

![SublimeLinter-jshint-test2](http://7q5cdt.com1.z0.glb.clouddn.com/SublimeLinter-jshint-test2.jpg)

## css 語法檢查

與 jshint 同理，SublimeLinter-csslint 也是基於 nodeJS 下的 csslint 的插件，實際上 SublimeLinter-csslint 調用了 nodeJS 中 csslint 的接口來進行語法檢查的。   

---

### 安裝 SublimeLinter-csslint   

同樣的方法。   

1. 按下 `Ctrl+Shift+p` 進入 Command Palette   
2. 輸入`install`進入 Package Control: Install Package   
3. 輸入`SublimeLinter-csslint`。進行安裝.   

如下圖   

![SublimeLinter-csslint](http://7q5cdt.com1.z0.glb.clouddn.com/SublimeLinter-csslint.jpg)   

安裝完成後我們可以看到下面的一段話   

```
SublimeLinter-csslint
-------------------------------
This linter plugin for SublimeLinter provides an interface to csslint.

** IMPORTANT! **

Before this plugin will activate, you *must*
follow the installation instructions here:

https://github.com/SublimeLinter/SublimeLinter-csslint
```

在使用插件之前，必須遵循上述網址中的[安裝說明](https://github.com/SublimeLinter/SublimeLinter-csslint)   

### 在 nodeJS 下安裝 csslint   

進入上述的 GitHub 地址，csslint 的說明頁。我們知道了和 jshint 一樣，csslint 也是基於 nodeJS 下的 csslint 來使用的。   

這裡安裝 nodeJS 過程省略。   
只需用 npm 安裝 csslint 即可。   

在命令行中輸入     

```
npm install -g csslint   
```

安裝完成後命令行中出現如下的信息     

```
C:\Users\Administrator\AppData\Roaming\npm\csslint -> C:\Users\Administrator\AppData\Roaming\npm\node_modules\csslint\cli.js
csslint@0.10.0 C:\Users\Administrator\AppData\Roaming\npm\node_modules\csslint
└── parserlib@0.2.5
```

可以查看 csslint 版本，已確認安裝完成。   

```
C:\Users\Administrator>csslint --version
v0.10.0
```

現在，恭喜你，我們使用 Sublime 編輯 css 文件，就會有語法檢查了！     

在編輯過程中，會有如下提示   

![SublimeLinter-csslint-test](http://7q5cdt.com1.z0.glb.clouddn.com/SublimeLinter-csslint-test.jpg)

點擊提示點後，Sublime 狀態欄也會有相應的說明   

![SublimeLinter-csslint-test2](http://7q5cdt.com1.z0.glb.clouddn.com/SublimeLinter-csslint-test2.jpg)
