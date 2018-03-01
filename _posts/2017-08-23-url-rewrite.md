---
layout: post
title:  "IIS 8 - HTTP to HTTPS"
date:   2017-08-23 00:00:00
categories: IIS
tags: IIS 網站 http https Windows URL_Rewrite 筆記
excerpt: <center itemprop="image" itemscope itemtype="http://schema.org/ImageObject"><img itemprop="image url height width" width="200" src="\images\2017-08-23-URL-Rewrite\2017-08-23-URL-Rewrite-image1.jpg" alt="URL Rewrite" title="URL Rewrite"/></center><br/>　　在做重新導向之前必須先安裝 URL Rewrite，安裝好後 rewrite 標籤才會有作用，完整的安裝的方式在 IIS 內操作 URL Rewrite 影片前段可以參考。
mathjax: true
author: Frank Sun 孫景承
---

* content
{:toc}

## **URL Rewrite HTTP to HTTPS** 

<center itemprop="image" itemscope itemtype="http://schema.org/ImageObject">
    <img itemprop="image url height width" width="200" src="\images\2017-08-23-URL-Rewrite\2017-08-23-URL-Rewrite-image1.jpg" alt="URL Rewrite" title="URL Rewrite"/>
</center><br/>

#### **安裝**
在做重新導向之前必須先安裝 **[URL Rewrite(傳送門)](https://www.microsoft.com/web/downloads/platform.aspx)**，安裝好後`<rewrite>`標籤才會有作用，完整的安裝的方式在 <a href="#iis-內操作-url-rewrite" id="markdown-toc-iis-內操作-url-rewrite" data-scroll=""><strong>IIS 內操作 URL Rewrite</strong></a> 影片前段可以參考。

#### **直接貼上至 Web.config**

　　安裝好 URL Rewrite 之後開啟你跟目錄底下的 Web.config ，將以下的資訊放到 `<system.webServer>` 裡面，如下：

```config
    <rewrite>
        <rules>
            <rule name="http to https" stopProcessing="true">
                <match url="(.*)" />
                <conditions>
                    <add input="{HTTPS}" pattern="^OFF$" />
                </conditions>
                <action type="Redirect" url="https://{HTTP_HOST}/{R:1}" redirectType="Temporary" />
            </rule>
        </rules>
    </rewrite>
```

#### **IIS 內操作 URL Rewrite**

若是想要手動操作的朋友也可以照著以下的影片去做
<div class="video-container">
    <iframe width="800" height="450" src="https://www.youtube.com/embed/U7USHit5mhY" frameborder="0" allowfullscreen></iframe>
</div>

<font color="red">P.S：我到目前操作過的環境皆與影片環境相同<font>