---
layout: post
author: Frank Sun (孫景承)
title:  "使用 SEO 讓你的網站更容易被看見 - 搜尋引擎最佳化"
date:   2017-08-21 00:00:00
categories: SEO
tags: SEO 教學 網站 搜尋優化  Google搜尋  schema.org  Microdata  結構化
excerpt: <center><img src="/images/2017-08-21-how-to-use-seo/2017-08-21-how-to-use-seo-image1.jpg" width="500" alt="使用 SEO 讓你的網站更容易被看見 - 搜尋引擎最佳化" title="使用 SEO 讓你的網站更容易被看見 - 搜尋引擎最佳化"/></center><br/>　　SEO 為 Search Engine Optimization 的縮寫，中文為「搜尋引擎最佳化」，是一種透過了解搜尋引擎的運作規則來調整網站，以及提高目的網站在有關搜尋引擎內排名的方式。簡單的來說就是，使用一些搜尋引擎的規則，讓你的網站更容易被搜尋引擎給收尋到，甚至順序更前面。
mathjax: true
---

* content
{:toc}

## **什麼是 SEO ?**
<center itemprop="image" itemscope itemtype="http://schema.org/ImageObject">
    <img itemprop="image url height width" src="/images/2017-08-21-how-to-use-seo/2017-08-21-how-to-use-seo-image1.jpg" width="500" alt="使用 SEO 讓你的網站更容易被看見 - 搜尋引擎最佳化" title="使用 SEO 讓你的網站更容易被看見 - 搜尋引擎最佳化"/>
</center><br/>
SEO 為 Search Engine Optimization 的縮寫，中文為「搜尋引擎最佳化」，是一種透過了解搜尋引擎的運作規則來調整網站，以及提高目的網站在有關搜尋引擎內排名的方式。簡單的來說就是，使用一些搜尋引擎的規則，讓你的網站更容易被搜尋引擎給收尋到，甚至順序更前面。

## **基本做法**
#### **好辨識的 URL**
URL是搜尋引擎第一個參考的要素，很多廠商為了讓使用者容易記得，甚至讓搜尋引擎好辨認，就會花大錢去購買有意義的網域(domain)，但是像我們這種小老百姓一般部落格都是掛在別人網站底下<span style="color:red;">(P.S：GitHub可以改變網域，所以可以自己去申請有意義的網域名稱掛上去)</span>，那網域後面的參數可能就是你的部落格名稱，但是中文放到URL時就會被轉碼程URL的語言，在搜尋引擎上就很容易被當成沒有意義的字元，在搜尋過程中就會被篩掉。所以建議在設定與URL相關的標題時最好是有意義或示好辨識的英文為主尤佳。
<img src="/images/2017-08-21-how-to-use-seo/2017-08-21-how-to-use-seo-image2.jpg" width="500" alt="URL" title="URL"/>

#### **慎選標題 Title Tag**
這是簡單又重要的事情，Title Tag 只要取的簡潔扼要又包含關鍵字的話，被搜尋到的機會也會大大的提升，如果在標題中有使用到 「 - (dash)」 符號的話，要記得重要的字要往前擺，字元的順序也會影響搜尋，例如：「我的部落格 - 文章」，這樣搜尋引擎才會把「我的部落格」列入考慮。
<img src="/images/2017-08-21-how-to-use-seo/2017-08-21-how-to-use-seo-image3.jpg" width="500" alt="Title Tag" title="Title Tag"/>

#### **善用 Heading Tag**
常寫HTML的朋友對於 h1 ~ h6 應該是相當的熟悉，在你認為他只有大一點或小一點的同時，其實搜尋引擎也默默地將他考慮進去了；根據標題關鍵字的重要性使用適當的 Heading Tag 對於被搜尋到的可能性也會有所提升。
<img src="/images/2017-08-21-how-to-use-seo/2017-08-21-how-to-use-seo-image4.jpg" width="500" alt="Heading Tag" title="Heading Tag"/>

## **介紹你的網頁 Meta Tag**
< meta > 一般都是加在 <head> 當中，那就是為了向瀏覽器介紹這是什麼樣的網頁，網頁資訊、作者、發布日期等等......，當用戶搜尋到相關條件就選我選我，所以說如果你的網頁沒有 < meta > 的話就不用談什麼SEO了。

#### **meta name 常用屬性**

|語法|說明|
|----|---|
|< meta name="description" content="網頁簡短描述">|用來寫網頁的簡短描述。|
|< meta name="keywords" content="網頁關鍵字">|用來放置網頁關鍵字。|
|< meta name="author" content="作者姓名">|記錄網頁的作者名稱|
|< meta name="generator" content="編輯器名稱">|用來記錄網頁編輯器名稱|
|< meta name="copyright" content="網頁版權">|用來標示網頁的版權或著作權聲明|
|< meta name="distribution" content="網頁發佈地區">|用來記錄網頁的發佈地區|

一般來說前兩個是最常用的，尤其是關鍵字，如果想使用多個關鍵字的話<br/>< meta name="keywords" content="keywork_1, keywork_2"> ，此方式以此類推。

#### **meta http-equiv 常用屬性**

|語法|說明|
|----|---|
|< meta http-equiv="Content-Type" content="text/html"; charset="uft-8">|網頁內容的種類以及編碼|
|< meta http-equiv="Content-Language" content="zh-TW">|網頁所使用的語言種類|
|< meta http-equiv="Refresh" content="time">|自動更新網頁的時間|
|< meta http-equiv="Pragma" content="no-cache">|禁止瀏覽器用快取開啟網頁|
|< meta http-equiv="windows-Target" content="_top">|強制在單一視窗中顯示網頁|

#### **HTML 5 新增的 meta 功能**

|語法|說明|
|----|---|
|< meta charset="UTF-8">|設定網頁編碼，UTF-8 是萬國碼|

基本上這一段就直接使用就可以了，因為 UTF-8 已相當普及，為了避免出錯就不需要做其他的更動。

## **結構化提高SEO Schema.org**

schema.org 是近年規範出來的東西，甚至Google也大量的在利用 schema.org 對搜尋結果做不同的呈現方式，不是只是單純的連結跟簡介了。

我們從 [Google Search](https://developers.google.com/search/docs/guides/search-gallery) 提供的資訊就可以看到，我們所熟知的搜尋效果 Google 都是利用 schema.org 的規範所呈現出來的效果，裡面也很多可以試著參考他的方式做出範例效果的搜尋結果。

<img src="/images/2017-08-21-how-to-use-seo/2017-08-21-how-to-use-seo-image5.jpg" alt="Google Search" title="Google Search"/>

利用 Google 所提供的「[結構化資料測試工具](https://search.google.com/structured-data/testing-tool/)」，可以檢查你的網頁或是部分程式碼的結構化是否正確。

<img src="/images/2017-08-21-how-to-use-seo/2017-08-21-how-to-use-seo-image6.jpg" alt="結構化資料測試工具" title="結構化資料測試工具"/>

#### **使用方法**
schema.org 有三種使用方法「Microdata」、「RDFa」、「JSON-LD」，我在這邊只介紹常用的兩種「Microdata」、「JSON-LD」

##### **Microdata**
Microdata 的使用方式，先定義 Type 將你想結構化的地方包住，只要在標籤打上 itemprop="屬性" 就可以將你包覆起來的地方結構化了：
```html
<div itemscope itemtype="http://schema.org/Book">
  <div>書名：<span itemprop="name">三隻小豬</span></div>
  <div>作者：<span itemprop="author">王小明</span></div>
  ...
</div>
```

<img src="/images/2017-08-21-how-to-use-seo/2017-08-21-how-to-use-seo-image7.jpg" alt="schema.org  範例" title="schema.org  範例"/>

但有時候 HTML 內的排版就是沒辦法這樣好好把你要資訊包起來，這個時候你就可以用 **itemref** 把他們接續起來：
```html
<div itemscope itemtype="http://schema.org/Book" itemref="a b">
  <div>作者：<span itemprop="author">王小明</span></div>
  ...
</div>
```
```html
<div id="a">書名：<span itemprop="name">三隻小豬</span></div>
<div id="b">出版：<span itemprop="datePublished">1840</span></div>
```

<img src="/images/2017-08-21-how-to-use-seo/2017-08-21-how-to-use-seo-image8.jpg" alt="itemref 範例" title="itemref 範例"/>

##### **JSON-LD**
JSON-LD 是透過 **< script type="application/ld+json" >** 將網頁結構與資料抽離的另一種使用方式，感覺就很像在網頁掛上一個名片：
```html
<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "Person",
  "name": "John Doe",
  "jobTitle": "Graduate research assistant",
  "affiliation": "University of Dreams",
  "additionalName": "Johnny",
  "url": "http://www.example.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1234 Peach Drive",
    "addressLocality": "Wonderland",
    "addressRegion": "Georgia"
  }
}
</script>
```

<img src="/images/2017-08-21-how-to-use-seo/2017-08-21-how-to-use-seo-image9.jpg" alt="JSON-LD 範例" title="JSON-LD 範例"/>

#### **種類與屬性參考資料**
 * [Article](http://schema.org/Article) 
 * [Blog](http://schema.org/Blog)
 * [Book](http://schema.org/Book)
 * [Clip](http://schema.org/Clip)
 * [Comment](http://schema.org/Comment)
 * [Conversation](http://schema.org/Conversation)
 * [Course](http://schema.org/Course)
 * [CreativeWorkSeason](http://schema.org/CreativeWorkSeason)
 * [CreativeWorkSeries](http://schema.org/CreativeWorkSeries)
 * [DataCatalog](http://schema.org/DataCatalog)
 * [Dataset](http://schema.org/Dataset)
 * [DigitalDocument](http://schema.org/DigitalDocument)
 * [Episode](http://schema.org/Episode)
 * [Game](http://schema.org/Game)
 * [HowTo](http://schema.org/HowTo)
 * [Map](http://schema.org/Map)
 * [MediaObject](http://schema.org/MediaObject)
 * [Menu](http://schema.org/Menu)
 * [MenuSection](http://schema.org/MenuSection)
 * [Message](http://schema.org/Message)
 * [Movie](http://schema.org/Movie)
 * [MusicComposition](http://schema.org/MusicComposition)
 * [MusicPlaylist](http://schema.org/MusicPlaylist)
 * [MusicRecording](http://schema.org/MusicRecording)
 * [Painting](http://schema.org/Painting)
 * [Photograph](http://schema.org/Photograph)
 * [PublicationIssue](http://schema.org/PublicationIssue)
 * [PublicationVolume](http://schema.org/PublicationVolume)
 * [Question](http://schema.org/Question)
 * [Review](http://schema.org/Review)
 * [Sculpture](http://schema.org/Sculpture)
 * [Series](http://schema.org/Series)
 * [SoftwareApplication](http://schema.org/SoftwareApplication)
 * [SoftwareSourceCode](http://schema.org/SoftwareSourceCode)
 * [TVSeason](http://schema.org/TVSeason)
 * [TVSeries](http://schema.org/TVSeries)
 * [VisualArtwork](http://schema.org/VisualArtwork)
 * [WebPage](http://schema.org/WebPage)
 * [WebPageElement](http://schema.org/WebPageElement)
 * [WebSite](http://schema.org/WebSite)