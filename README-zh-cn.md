# 關於這個簡潔明快的博客主題 🤘🤘🤘

[![GitHub stars](https://img.shields.io/github/stars/Gaohaoyang/gaohaoyang.github.io.svg)](https://github.com/Gaohaoyang/gaohaoyang.github.io/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Gaohaoyang/gaohaoyang.github.io.svg)](https://github.com/Gaohaoyang/gaohaoyang.github.io/network)
[![GitHub issues](https://img.shields.io/github/issues/Gaohaoyang/gaohaoyang.github.io.svg)](https://github.com/Gaohaoyang/gaohaoyang.github.io/issues)
[![GitHub release](https://img.shields.io/github/release/Gaohaoyang/gaohaoyang.github.io.svg)](https://github.com/Gaohaoyang/gaohaoyang.github.io/releases)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/Gaohaoyang/gaohaoyang.github.io/master/LICENSE)

隨著 jekyll 的版本升級，同時我也想重構我的舊版博客主題，因此在這個月對博客進行了重構加改版，這個倉庫存放我的新博客，並且我也會一直使用這個主題。目前基本改版完成，後續可能還會有些細節上的修補。

**博客訪問地址：[http://gaohaoyang.github.io/](http://gaohaoyang.github.io/)**。若您喜歡這個新的博客主題，請給我個star以示鼓勵吧，歡迎大家使用。

## 目錄

* [預覽圖](#預覽圖)
* [各部分詳情](#各部分詳情)
    * [主頁 Home](#主頁-home)
    * [歸檔頁 Archives](#歸檔頁-archives)
    * [分類頁 Categories](#分類頁-categories)
    * [標籤頁 Tags](#標籤頁-tags)
    * [收藏頁 Collections](#收藏頁-collections)
    * [展示頁 Demo](#展示頁-demo)
    * [關於頁 About](#關於頁-about)
    * [評論](#評論)
    * [目錄 Contents](#目錄-contents)
    * [代碼高亮](#代碼高亮)
    * [燈泡效果](#燈泡效果)
    * [移動端適配](#移動端適配)
    * [Footer](#footer)
    * [統計](#統計)
* [博客主題使用方法](#博客主題使用方法)
    * [1. 安裝 ruby 和 jekyll 環境](#1-安裝-ruby-和-jekyll-環境)
    * [2. 複製博客主題代碼](#2-複製博客主題代碼)
    * [3. 修改參數](#3-修改參數)
        * [基本信息](#基本信息)
        * [鏈接信息](#鏈接信息)
        * [評論信息](#評論信息)
        * [統計信息](#統計信息)
    * [4. 寫文章](#4-寫文章)
    * [5. 本地運行](#5-本地運行)
    * [6. 發布到 GitHub](#6-發布到-github)
* [捐助 donate](#捐助-donate)
* [Update Log](#update-log)
* [License](#license)

## 預覽圖

先上預覽圖：

主頁
![index](http://ww3.sinaimg.cn/large/7011d6cfjw1f3bdli86awj211k0oyqen.jpg)

文章頁
![post](http://ww4.sinaimg.cn/large/7011d6cfjw1f3bdmzb9v6j210p0j7gwn.jpg)

## 各部分詳情

### 主頁 Home

主頁默認展示5篇文章的摘要部分，用戶點擊標題或閱讀全文後進入文章頁。右側為近期文章、分類和標籤3塊區域，用戶可以繼續在這部分添加區域，只需修改`index.html`即可。

### 歸檔頁 Archives

按照年份歸檔文章。

### 分類頁 Categories

按照文章的分類，顯示文章。

### 標籤頁 Tags

按照文章的標籤顯示文章。

### 收藏頁 Collections

本頁是用`markdown`寫的，用戶可以收藏自己喜歡的文章鏈接。

### 展示頁 Demo

使用 [Masonry](http://masonry.desandro.com/) 重寫了瀑布流布局，響應式布局，更好的交互體驗。

### 關於頁 About

對個人和對本站的介紹，使用`markdown`寫的。

### 評論

支持 [多說評論](http://duoshuo.com/) 和 [disqus](https://disqus.com/) 評論。

只需要在 `_config.yml` 修改相應的配置`short_name`即可，如下：

```yml
# comments
# two ways to comment, only choose one, and use your own short name
# 兩種評論插件，選一個就好了，使用自己的 short_name
duoshuo_shortname: #xxx
disqus_shortname: xxx
```

### 目錄 Contents

頁面滾動時目錄固定在屏幕右側，若目錄高度超出屏幕高度，目錄產生滾動條。

### 代碼高亮

隨著 jekyll 的升級，目前代碼高亮使用風格與 github 上的 markdown 寫法一致。

### 燈泡效果

![light](http://ww3.sinaimg.cn/large/7011d6cfjw1f3be6y4vp3j209i02rweg.jpg)

可以看到導航按鈕高亮時，下面的陰影效果，我把這個稱為燈泡效果。

### 移動端適配

完美適配移動端。

![mobile](http://ww4.sinaimg.cn/large/7011d6cfjw1f3bebnzxkpj20ah0fzgp4.jpg)

### Footer

**歡迎使用這個主題，使用時請保留 footer 上的模板主題來源。** Theme designed by [HyG](https://github.com/gaohaoyang).
![footer](http://ww3.sinaimg.cn/large/7011d6cfjw1f3bepd8002j20hl02ct95.jpg)

### 統計

博客支持百度統計和 Google Analytics，只需在`_config.yml`中配置響應的id即可，代碼如下。

```yml
# statistic analysis 統計代碼
# 百度統計 id，將統計代碼替換為自己的百度統計id，即
# hm.src = "//hm.baidu.com/hm.js?xxxxxxxxxxxx";
# xxxxx字符串
baidu_tongji_id: xxxxxxxxxxxx
google_analytics_id: UA-xxxxxxxx # google 分析追蹤id
```

## 博客主題使用方法

歡迎使用這個主題，以下簡單說一下使用方法。

### 1. 安裝 ruby 和 jekyll 環境

這一步和第5步主要是為了讓博客系統在本地跑起來，如果不想在本地運行，可以無視這兩步，但我還是強烈建議試著先在本地跑起來，沒有什麼問題後再推送的 GitHub 上。

Windows 用戶可以直接使用 [RubyInstaller](http://rubyinstaller.org/) 安裝 ruby 環境。後續的操作中可能還會提示安裝 DevKit，根據提示操作即可。

建議使用 [RubyGems 鏡像- Ruby China](https://gems.ruby-china.org/) 安裝 jekyll。

安裝 jekyll 命令如下

```
gem install jekyll
```

詳情可以查看 jekyll 官網。[https://jekyllrb.com/](https://jekyllrb.com/) 或 中文翻譯版 jekyll 官網[http://jekyllcn.com/](http://jekyllcn.com/) （中文文檔翻譯落後於英文官網，有興趣有時間的小夥伴可以參與翻譯，為開源世界貢獻一份力哦~）

在 mac OS X El Capitan 系統下安裝可能會出現問題，解決方案詳情見 jekyll 官網: [ https://jekyllrb.com/docs/troubleshooting/#jekyll-amp-mac-os-x-1011]( https://jekyllrb.com/docs/troubleshooting/#jekyll-amp-mac-os-x-1011)

對 jekyll 本身感興趣的同學可以看看 jekyll 源碼: [https://github.com/jekyll/jekyll](https://github.com/jekyll/jekyll)

![jekyll logo](http://jekyllcn.com/img/logo-2x.png)

### 2. 複製博客主題代碼

可以直接 clone 、下載 或 fork 這個倉庫的代碼即可

### 3. 修改參數

主要修改 `_config.yml` 中的參數和自己的網站小圖`favicon.ico`

`_config.yml`文件中

#### 基本信息

主要用於網站頭部header。

```yml
# Site settings
title: HyG
brief-intro: Front-end Dev Engineer
baseurl: "" # the subpath of your site, e.g. /blog
url: "http://gaohaoyang.github.io" # the base hostname & protocol for your site
```

#### 鏈接信息

主要用於網站底部footer。

```yml
# other links
twitter_username: gaohaoyang126
facebook_username: gaohaoyang.water
github_username:  Gaohaoyang
email: gaohaoyang126@126.com
weibo_username: 3115521wh
zhihu_username: gaohaoyang
linkedIn_username: gaohaoyang
dribbble_username:

description_footer: 本站記錄我前端之旅的沿途風景！
```

#### 評論信息

獲取`short_name`的方法：

訪問 https://disqus.com/ 或 http://duoshuo.com/ 根據提示操作即可。

```yml
# comments
# two ways to comment, only choose one, and use your own short name
# 兩種評論插件，選一個就好了，使用自己的 short_name
duoshuo_shortname: #hygblog
disqus_shortname: gaohaoyang
```

運行成功後，可以在 disqus 或 多說 的後台管理頁看到相關信息。

#### 統計信息

獲取 百度統計id 或 Google Analytics id 的方法：

訪問 http://tongji.baidu.com/ 或 https://www.google.com/analytics/ 根據提示操作即可。當然，如果不想添加統計信息，這兩個參數可以不填。

```yml
# statistic analysis 統計代碼
# 百度統計 id，將統計代碼替換為自己的百度統計id，即
# hm.src = "//hm.baidu.com/hm.js?xxxxxxxxxxxx";
# xxxxx字符串
baidu_tongji_id: cf8506e0ef223e57ff6239944e5d46a4
google_analytics_id: UA-72449510-4 # google 分析追蹤id
```

成功後，進入自己的百度統計或 Google Analytics 後台管理，即可看到網站的訪問量、訪客等相關信息。

### 4. 寫文章

`_posts`目錄下存放文章信息，文章頭部註明 layout(布局)、title、date、categories、tags、author(可選)、mathjax(可選，點擊[這裡](https://www.mathjax.org/)查看更多關於`Mathjax`)，如下：

```
---
layout: post
title:  "對這個 jekyll 博客主題的改版和重構"
date:   2016-03-12 11:40:18 +0800
categories: jekyll
tags: jekyll 端口 markdown Foxit RubyGems HTML CSS
author: Haoyang Gao
mathjax: true
---
```

下面這兩行代碼為產生目錄時使用
```
* content
{:toc}
```

文章中存在的4次換行為摘要分割符，換行前的內容會以摘要的形式顯示在主頁Home上，進入文章頁不影響。

換行符的設置見配置文件`_config.yml`的 excerpt，如下：

```yml
# excerpt
excerpt_separator: "\n\n\n\n"
```

使用 markdown 語法寫文章。

代碼風格與 GitHub 上 README 或 issue 中的一致。使用3個\`\`\`的方式。

### 5. 本地運行

本地執行

```
jekyll s
```

顯示

```
Configuration file: E:/GitWorkSpace/blog/_config.yml
            Source: E:/GitWorkSpace/blog
       Destination: E:/GitWorkSpace/blog/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
                    done in 6.33 seconds.
  Please add the following to your Gemfile to avoid polling for changes:
    gem 'wdm', '>= 0.1.0' if Gem.win_platform?
 Auto-regeneration: enabled for 'E:/GitWorkSpace/blog'
Configuration file: E:/GitWorkSpace/blog/_config.yml
    Server address: http://127.0.0.1:4000/
  Server running... press ctrl-c to stop.
```

在本地訪問 localhost:4000 即可看到博客主頁。

若安裝了 Foxit 福昕pdf閱讀器可能會占用4000端口，關閉 Foxit服務 或切換 jekyll 端口即可解決。詳情見文章：[對這個 jekyll 博客主題的改版和重構](http://gaohaoyang.github.io/2016/03/12/jekyll-theme-version-2.0/)

若正在使用全局代理，可能會報錯502，關閉全局代理即可。

### 6. 發布到 GitHub

沒什麼問題，推送到自己的博客倉庫即可。

## 捐助 donate

您也可以捐助我喝杯咖啡！感謝！

<!-- PayPal

<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="hosted_button_id" value="Q44JFSYQXBFL2">
<input type="image" src="https://www.paypalobjects.com/webstatic/en_US/btn/btn_donate_cc_147x47.png" border="0" name="submit" alt="PayPal——最安全便捷的在線支付方式！">
<img alt="" border="0" src="https://www.paypalobjects.com/zh_XC/i/scr/pixel.gif" width="1" height="1">
</form><br>      -->

|                                   支付寶                                    |                                  微信支付                                   |                                                                     PayPal                                                                     |
|:---------------------------------------------------------------------------:|:---------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------:|
| ![alipay](http://ww2.sinaimg.cn/large/7011d6cfjw1f3bk8ikzoij20740743z5.jpg) | ![wechat](http://ww2.sinaimg.cn/large/7011d6cfjw1f3bkdw3bslj206z06q3z6.jpg) | [![PayPal](https://www.paypalobjects.com/webstatic/paypalme/images/pp_logo_small.png)<br>Donate via PayPal ](https://www.paypal.me/gaohaoyang) |

感謝捐贈的小夥伴！！！

* 2017.05.25 收到 微信用戶 ¥1.00
* 2017.05.19 收到 風之箏 ¥6.66
* 2017.05.16 收到 張馳 ¥6.00
* 2017.05.03 收到 希成 ¥6.66
* 2017.04.24 收到 deezer ¥10.00
* 2017.04.13 收到 Abraham Xiao ¥30.00
* 2017.04.11 收到 微信用戶 ¥4.00
* 2017.04.01 收到 Elvin Zeng ¥6.66
* 2017.03.13 收到 微信用戶 ¥6.66
* 2017.03.04 收到 史萊姆 ¥9.90
* 2017.03.02 收到 夢想小熊 ¥6.66
* 2017.02.27 收到 夏友傑 ¥6.66
* 2017.02.26 收到 蘭緣小妖 ¥10.00
* 2017.02.25 收到 微信用戶 ¥6.66
* 2017.02.22 收到 微信用戶 ¥6.66
* 2017.02.15 收到 微信用戶 ¥10.00
* 2017.02.06 收到 Light ¥10.24
* 2017.01.15 收到 微信用戶 ¥6.66
* 2016.12.17 收到 HitNoah ¥12.00
* 2016.12.09 收到 情融 ¥6.60
* 2016.11.16 收到 微信用戶 ¥6.66
* 2016.11.16 收到 微信用戶 ¥1.00
* 2016.10.24 收到 奇峰 ¥6.66
* 2016.10.21 收到 旭廷 ¥10.00
* 2016.09.24 收到 鑫 ¥6.66
* 2016.08.25 收到 Erlend Aakre $2.50
* 2016.08.10 收到 微信用戶 ¥4.40
* 2016.07.25 收到 鄧炳初 ¥6.66
* 2016.07.11 收到 彥風 ¥6.66
* 2016.07.07 收到 Klci ¥2.50
* 2016.05.08 收到 1057 ¥10.57
* 2016.05.07 收到 吳林 ¥2
* 2016.04.29 收到 北歸 ¥10
* 2016.04.28 收到 魏楚陽_Brian ¥2
* 2016.04.28 收到 薛彬 ¥8.8

## Update Log

### 2017.2.28

- `[^]` 修復目錄滾動 bug [#22](https://github.com/Gaohaoyang/gaohaoyang.github.io/issues/22), [#48](https://github.com/Gaohaoyang/gaohaoyang.github.io/issues/48)

### 2016.6.20

* `[+]` 在文章頁中添加上一篇和下一篇文章鏈接。
* `[^]` 修改 font-family 順序，避免微軟雅黑將單引號解析為全角。
* `[^]` 修復標籤雲算法中被除數為零的 bug。[#26](https://github.com/Gaohaoyang/gaohaoyang.github.io/issues/26), [#28](https://github.com/Gaohaoyang/gaohaoyang.github.io/issues/28), [#30](https://github.com/Gaohaoyang/gaohaoyang.github.io/issues/30)

### 2016.5.11 v2.0.1

* `[^]` 優化代碼，將頁面中的大段評論相關代碼抽離出來，放入`comments.html`
* `[+]` 添加百度統計和Google分析代碼，在`_config.yml`中配置相關參數即可
* `[+]` 更新文檔，添加博客主題使用方法，便於上手
* `[+]` 添加了`favicon.ico`
* `[^]` 修復 bug，目錄太長時，滾動到最底部時隱藏到footer下面。修復後長目錄在滾動到底部時使用`position:absolute`
* `[^]` 修改目錄區的滾動條樣式（僅針對`webkit`內核瀏覽器）
* `[^]` 修改 demo 頁中 disqus 評論區 a 標籤的顏色 bug，修改 blockqoute 中 p 標籤的 margin
* `[+]` 添加不蒜子計數功能，在footer上顯示訪問量
* `[+]` 添加回到頂部功能

### 2016.4.27 v2.0.0

* `[^]` 基於 jekyll 3.1.2 重構了所有代碼
* `[+]` 主頁添加了摘要，在正文中使用4個換行符來分割，可在`_config.yml`中修改
* `[+]` 主頁添加了近期文章、分類列表和標籤雲
* `[+]` 主頁導航區做了視覺優化，陰影效果
* `[+]` 增加了歸檔、標籤和分類頁面
* `[+]` 增加了收藏頁面
* `[+]` 評論插件可以選擇 disqus 或 多說，直接在`_config.yml`中修改
* `[+]` 適配移動端
* `[+]` 頁面滾動時，文章目錄固定在右側
* `[+]` 頁面內容較少時，固定 footer 在頁面底部
* `[^]` 使用 GitHub 風格的代碼高亮寫法，即\`\`\`的寫法，去除`highlight.js`代碼高亮插件的使用
* `[^]` 使用 Masonry 重寫了 Demo 頁中的瀑布流布局，響應式交互體驗更好
* `[-]` 去除了 jQuery 和 BootStrap，使得加載速度更快

關於舊版博客，我不再維護，同時我把代碼轉移到了另一個倉庫，見 [Gaohaoyang/old-blog](https://github.com/Gaohaoyang/old-blog)。

## License

[MIT License](https://github.com/Gaohaoyang/gaohaoyang.github.io/blob/master/LICENSE.md)
