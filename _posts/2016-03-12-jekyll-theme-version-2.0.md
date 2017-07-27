---
layout: post
title:  "對這個 jekyll 博客主題的改版和重構"
date:   2016-03-12 11:40:18 +0800
categories: jekyll
tags: jekyll 端口 markdown Foxit RubyGems HTML CSS
author: Haoyang Gao
---

* content
{:toc}

本文主要說明對這個博客主題的改版和代碼重構的過程。這個簡潔高雅的博客主題受到了很多朋友的喜歡。在寫第一版界面時，我對前端並不是很熟悉，對`Jekyll`也不熟悉。現在距離當時也一年了，對自己當時寫的代碼也不太滿意了，同時`Jekyll`如今也已經升級了，目前最新版為3.1.2。因此我在臨近畢業尚未入職前做一下博客主題的代碼重構和改版吧。

主要想做這些事情有：添加歸檔，添加標籤，添加分類頁面，主頁顯示文章摘要，代碼去除 jQuery 和 BootStrap，優化移動端顯示，將所有變量寫入配置文件`_config.yml`中等。再優化一些細節吧。希望更多人會喜歡。






## 改版重構說明

* **使用 GitHub 風格的代碼塊 Markdown 寫法 (Fenced code blocks)。**

    即 GFM(github flavored markdown) 的方式。

    Jekyll 已經升級至 3.1.2（2016-03），其中有一些新的要注意的地方，比如官網上說使用了 `Rouge` 去做代碼高亮而不是默認的 `Pygments`，因為 `Jekyll` 本身是基於 Ruby 的，因此我看到官方說希望不再使用基於 Python 的 `Pygments` 了，而是都使用基於 Ruby 的代碼。詳情見官網升級說明 [syntax-highlighter-changed](https://jekyllrb.com/docs/upgrading/2-to-3/#syntax-highlighter-changed)。
* **首頁中添加摘要**

    摘要可以在每一篇 md 文件頭中使用 excerpt 屬性寫出來。也可以在正文中，4個換行符來分割，這個設置見配置文件`_config.yml`。
* **添加歸檔**

    上一版中沒有歸檔，現在專門做了一個歸檔頁面，當文章很多時方便根據年份快速查閱。
* **添加標籤**

    標籤還是很有必要添加的，上一版中也沒有這個功能。現在也可以根據標籤查找文章了。同時標籤還有一個重要的作用是，用來獲取相似文章的。
* **添加分類頁**

    之前的分類就是在首頁中直接完成的，現在和標籤和歸檔類似，我將分類單獨製作為一頁，方便查閱。
* **去掉 jQuery 和 BootStrap**

    我覺得太重了，沒必要使用這兩個庫，使用原生 JavaScript 和 CSS就可以做到一樣的效果，代碼量大大減輕，載入速度略有提高。

* **重寫了demo頁的瀑布流布局**

    改變數據寫死的方式，將數據用 json 格式錄入，由 JavaScript 拼接為 HTML 代碼。同時，使用 [Masonry](http://masonry.desandro.com/)，重寫了瀑布流布局。

* **簡化評論配置，支持 多說 和 disqus**

    在`_config.yml`中評論配置直接添加自己的`short_name`，評論就能正常使用了。

下面列舉一些可能遇到的問題，至少我是遇到了：

## RubyGems 無法訪問，SSL 證書問題

以前我使用的是 RubyGems 的淘寶鏡像[https://ruby.taobao.org/](https://ruby.taobao.org/)。現在這個鏡像已經不再維護了，作者 [huacnlee (李華順)](https://ruby-china.org/huacnlee) 轉到 [Ruby China](https://ruby-china.org/) 中繼續維護了，詳情見 [RubyGems 鏡像- Ruby China](https://gems.ruby-china.org/)。

### 錯誤呈現

在執行任何`gem`命令的時候出現以下錯誤：

```
ERROR:  While executing gem ... (Gem::RemoteFetcher::FetchError)
    SSL_connect returned=1 errno=0 state=SSLv3 read server certificate B: certificate verify failed (https://gems.ruby-china.org/specs.4.8.gz)
```

### 解決方法

根據 [https://gems.ruby-china.org/](https://gems.ruby-china.org/) 頁面最下方提供的 GitHub Issue 地址。

可以進入這個 issue：[https://github.com/ruby-china/rubygems-mirror/issues/3](https://github.com/ruby-china/rubygems-mirror/issues/3)

其中 sanlengjingvv 給出了一個鏈接地址 [https://gist.github.com/fnichol/867550](https://gist.github.com/fnichol/867550) 裡面提供了方法。我就是採用這裡面的方法解決的。

我使用的是 [The Manual Way](https://gist.github.com/fnichol/867550#the-manual-way-boring)，因為 [The Ruby Way](https://gist.github.com/fnichol/867550#the-ruby-way-fun) 我沒有成功，不知道什麼原因，有興趣的朋友可以試試。下面說說我的具體操作吧。

首先從 [https://curl.haxx.se/ca/cacert.pem](https://curl.haxx.se/ca/cacert.pem) 將文件`cacert.pem`下載至 `C:\RailsInstaller\cacert.pem`

然後執行

```
set SSL_CERT_FILE=C:\RailsInstaller\cacert.pem
```

就成功了，不會再出現 SSL 錯誤了。

最後原文中說，為了長久設置，將這個目錄存入控制面板中。我沒理解是什麼意思，是指環境變量嗎？有朋友知道的話，歡迎留言告知我。

我存入環境變量後，還是會出現 SSL 錯誤，這時再次執行上面那條命令即可。

## jekyll-paginate 依賴缺失

因為 jekyll 3 中默認安裝已經沒有這個分頁組件了，官方把這個分頁組件插件化了，因此要獨立安裝。詳情見 [https://jekyllrb.com/docs/pagination/](https://jekyllrb.com/docs/pagination/)。

### 錯誤呈現

在啟動 jekyll 服務的時候出現以下錯誤：

```
jekyll serve
Configuration file: c:/gitWorkSpace/blog-based-on-jekyll-3/_config.yml
  Dependency Error: Yikes! It looks like you don't have jekyll-paginate or one of its dependencies installed. In order to use Jekyll as currently configured, you'll need to install this gem. The full error message from Ruby is: 'cannot load such file -- jekyll-paginate' If you run into trouble, you can find helpful resources at http://jekyllrb.com/help/!
jekyll 3.1.2 | Error:  jekyll-paginate
```

### 解決方法

我們安裝這個插件到本地即可。

```
gem install jekyll-paginate
Fetching: jekyll-paginate-1.1.0.gem (100%)
Successfully installed jekyll-paginate-1.1.0
Parsing documentation for jekyll-paginate-1.1.0
Installing ri documentation for jekyll-paginate-1.1.0
Done installing documentation for jekyll-paginate after 3 seconds
1 gem installed
```

## 被 Foxit pdf reader 占用4000端口

### 錯誤呈現

在本地使用命令

```
jekyll serve
```

出現錯誤，如下

```
jekyll serve
Configuration file: E:/GitWorkSpace/blog/_config.yml
           Source: E:/GitWorkSpace/blog
      Destination: E:/GitWorkSpace/blog/_site
Incremental build: disabled. Enable with --incremental
     Generating...
                   done in 0.547 seconds.
 Please add the following to your Gemfile to avoid polling for changes:
   gem 'wdm', '>= 0.1.0' if Gem.win_platform?
Auto-regeneration: enabled for 'E:/GitWorkSpace/blog'
Configuration file: E:/GitWorkSpace/blog/_config.yml
jekyll 3.1.1 | Error:  Permission denied - bind(2) for 127.0.0.1:4000
```

網上查閱後，這篇博文解決了我的問題。[誰占了我的端口 for Windows --By Liu Xia, ThoughtWorks Senior Consultant. .NET Expert](http://lxconan.github.io/2016/01/07/who-is-using-my-port/)

上述報錯主要原因是，jekyll 啟動使用的4000端口被福昕pdf閱讀器的自動更新進程占用了，關掉這個進程，jekyll在本地調試啟動服務時就沒有問題了。

### 解決方法

簡單的解決方法是：

輸入命令，查看各端口被占用情況

```
netstat -ano
```

找到4000端口被占用的`PID`

我的結果如下：

```
協議  本地地址          外部地址          狀態           PID
TCP  0.0.0.0:80        0.0.0.0:0         LISTENING     4
TCP  0.0.0.0:135       0.0.0.0:0         LISTENING     836
TCP  0.0.0.0:445       0.0.0.0:0         LISTENING     4
TCP  0.0.0.0:1801      0.0.0.0:0         LISTENING     2312
TCP  0.0.0.0:2103      0.0.0.0:0         LISTENING     2312
TCP  0.0.0.0:2105      0.0.0.0:0         LISTENING     2312
TCP  0.0.0.0:2107      0.0.0.0:0         LISTENING     2312
TCP  0.0.0.0:3306      0.0.0.0:0         LISTENING     2404
TCP  0.0.0.0:3389      0.0.0.0:0         LISTENING     1172
TCP  0.0.0.0:49664     0.0.0.0:0         LISTENING     584
TCP  0.0.0.0:49665     0.0.0.0:0         LISTENING     1072
TCP  0.0.0.0:49666     0.0.0.0:0         LISTENING     460
TCP  0.0.0.0:49667     0.0.0.0:0         LISTENING     1000
TCP  0.0.0.0:49670     0.0.0.0:0         LISTENING     696
TCP  0.0.0.0:49678     0.0.0.0:0         LISTENING     2312
TCP  0.0.0.0:49692     0.0.0.0:0         LISTENING     688
TCP  127.0.0.1:4000    0.0.0.0:0         LISTENING     2476
TCP  127.0.0.1:4000    127.0.0.1:55160   ESTABLISHED   2476
TCP  127.0.0.1:4012    0.0.0.0:0         LISTENING     12724
```

可以看到4000端口的PID是2476。下面查看是什麼進程，命令行中輸入：

```
tasklist /svc /FI "PID eq 2476"
```

得到結果：

```
映像名稱                       PID 服務
========================= ======== ============================================
FoxitProtect.exe              2476 FxService
```

可以看到正是福昕閱讀器。下面關掉這個服務就好了。在 win10 中進入任務管理器，選擇服務選項卡，關閉這個服務就好了，如下圖：

![](http://ww4.sinaimg.cn/large/7011d6cfjw1f1ty28wwj4j20g00aiju7.jpg)

當然也可以在啟動jekyll服務的時候指定端口號，如下：

```
jekyll serve --port 3000
```

這樣在瀏覽器中輸入 http://localhost:3000/ 就可以訪問了。

還可以在配置文件`_config.yml`中添加端口號設置（參考[官網文檔-Serve Command OptionsPermalink](https://jekyllrb.com/docs/configuration/#serve-command-options)），如下：

```
# port
port: 1234
```

此時，啟動jekyll服務後，訪問 http://localhost:1234/ 即可
