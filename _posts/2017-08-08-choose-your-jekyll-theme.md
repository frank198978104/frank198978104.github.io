---
layout: post
author: Frank Sun (孫景承)
title:  "Jekyll 更換主題及安裝插件"
date:   2017-08-08 00:00:00
categories: Jekyll
tags: Jekyll 懶人包 部落格 教學 GitHub 網站
excerpt: <center><img src="/images/2017-08-08-choose-your-jekyll-theme/2017-08-08-choose-your-jekyll-theme-image1.jpg" width="500" alt="Jekyll 更換主題及安裝插件" title="Jekyll 更換主題及安裝插件"/></center><br/>跟著上一篇操作我們建立好了自己的 GitHub 和 Jekyll 的使用環境，那接下來就是跟大家分享一下 Jekyll 的一些主題和套件囉。
mathjax: true
---

* content
{:toc}

### **前情提要**
上一篇：[在 GitHub 上使用 Jekyll 建立自己的部落格](https://frank198978104.github.io/2017/07/28/welcome-to-jekyll/)

跟著上一篇操作我們建立好了自己的 GitHub 和 Jekyll 的使用環境，那接下來就是跟大家分享一下 Jekyll 的一些主題和套件囉。

### **主題**
在 **[官方的說明](http://jekyllcn.com/docs/themes/)** 中，我們可以看到一些比較完整(複雜)的方法，但是其實我們可以從以下的網址中去找你喜歡的主題來使用，既然我們是寫程式的，那麼就要去發揮 OO 的精神。有些主題的作者可能會希望你去他的 GitHub 上按個 Start 或是 Fork ，別人做那麼辛苦，我們也應該去給人家一些鼓勵，反正點一下也不用錢。
<center itemprop="image" itemscope itemtype="http://schema.org/ImageObject">
  <img itemprop="image" src="/images/2017-08-08-choose-your-jekyll-theme/2017-08-08-choose-your-jekyll-theme-image1.jpg" alt="Jekyll主題範例圖" title="Jekyll主題範例圖"/>
</center>

[http://jekyllthemes.org/](http://jekyllthemes.org/)

[https://jekyllthemes.io/](https://jekyllthemes.io/)

[http://themes.jekyllrc.org/](http://themes.jekyllrc.org/)

### **插件**
在 **[官方的說明](http://jekyllcn.com/docs/plugins/)** 中，我們看到了他寫了一堆中文可是你卻看不懂的解釋，簡而言之就是有些套件不支援，但是你還是可以上傳，若要不支援的套件有作用，那你要自己想辦法修改啦。

#### 推薦的插件

* [jekyll-paginate](https://github.com/jekyll/jekyll-paginate)
>Pagination Generator for Jekyll
* [jekyll-sitemap](https://github.com/jekyll/jekyll-sitemap)
>Jekyll plugin to silently generate a sitemaps.org compliant sitemap for your Jekyll site
* [jekyll-admin](https://github.com/jekyll/jekyll-admin)
>A Jekyll plugin that provides users with a traditional CMS-style graphical interface to author content and administer Jekyll sites.

#### 安裝

前置作業需要先安裝bundler,終端機下個等他跑完吧

[如果Ruby版本太舊, 請先更新](https://www.ruby-lang.org/zh_tw/)

```
sudo gem install bundler
```

在 Gemfile 檔案中加入，例如：

(如果沒有Gemfile可直接用記事本新增)

```
 group :jekyll_plugins do
   gem "jekyll-paginate"
   gem "jekyll-sitemap"
 end
 ```

儲存後,到終端機輸入就可以開始安裝

```
sudo gem install bundler
```
輸入就可以啟動了

```
bundle exec jekyll server
```