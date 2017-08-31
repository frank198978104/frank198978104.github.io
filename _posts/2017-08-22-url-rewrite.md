---
layout: post
title:  "IIS 8 - HTTP to HTTPS"
date:   2017-08-23 00:00:00
categories: IIS
tags: IIS 網站 http https Windows URL_Rewrite 筆記
excerpt: <center itemprop="image" itemscope itemtype="http://schema.org/ImageObject"><img itemprop="image url height width" width="200" src="https://lh3.googleusercontent.com/dh84qrWXq613wtyfXrp1ndf5_khu-LiqD1PKMl7hMkQWuyfGEG0MzTZGRA7ODeGmU6RR5c_5dFLt-wlrUNUQAxMkjKlmTbbcxcN3CXGS84dFmzvT0zA7TSLt02QpX-GnxvfjqaJUnUNhXlWXV-ncxzKCM_HV2f0KBVHutR8N8B1WZO0wI-jtStel0FQrOysSBDrnPghult82deC131Sl7fCZgqoE4nqQYl9XaizTNdIfq93aHeQvEjzfV36qIPlauYFq82fusIGyGGisoU8PKQyf2qMyyhWveGZun3e8yohqxedWqRS4PEtSm-VGDfcWGBSk3VjL9XAsgIjlICIJEBhLgzytut1GU0x_oyT6Md9UgRGqfV6ztD8nodxMNhxqib17yJLR2bv5JIyMYEcqjt0hF6uEXYIz8eeo9bl7Rv7DWOOyt1HIHOOJUjCxnMV7463RH8PeGw2GlJ3HkY2Flmo9_zXQj6wz3JAECHBrodRnnCq581jIYF2mYGl-Ol7G7ApkL3cDWCFgEqyGUPoUqCvTLOWH8lgylFGVM0WKmO7HGVsxiWwsLCLsFI50yJKJckshlw" alt="URL Rewrite" title="URL Rewrite"/></center><br/>　　前一陣子在裝好 SSL 憑證之後，要來做 http to https 的重新導向，我很開心的打開 URL Rewrite 的安裝檔，一時在想起來當下的 Server 不能連外網所以安裝不起來，於是我從之前有做好導向的 Server 複製 Web.config 的資訊來使用，將以下的資訊放到 < system.webServer > 裡面
mathjax: true
author: Frank Sun 孫景承
---

* content
{:toc}

## **URL Rewrite HTTP to HTTPS** 

<center itemprop="image" itemscope itemtype="http://schema.org/ImageObject">
    <img itemprop="image url height width" width="200" src="https://lh3.googleusercontent.com/dh84qrWXq613wtyfXrp1ndf5_khu-LiqD1PKMl7hMkQWuyfGEG0MzTZGRA7ODeGmU6RR5c_5dFLt-wlrUNUQAxMkjKlmTbbcxcN3CXGS84dFmzvT0zA7TSLt02QpX-GnxvfjqaJUnUNhXlWXV-ncxzKCM_HV2f0KBVHutR8N8B1WZO0wI-jtStel0FQrOysSBDrnPghult82deC131Sl7fCZgqoE4nqQYl9XaizTNdIfq93aHeQvEjzfV36qIPlauYFq82fusIGyGGisoU8PKQyf2qMyyhWveGZun3e8yohqxedWqRS4PEtSm-VGDfcWGBSk3VjL9XAsgIjlICIJEBhLgzytut1GU0x_oyT6Md9UgRGqfV6ztD8nodxMNhxqib17yJLR2bv5JIyMYEcqjt0hF6uEXYIz8eeo9bl7Rv7DWOOyt1HIHOOJUjCxnMV7463RH8PeGw2GlJ3HkY2Flmo9_zXQj6wz3JAECHBrodRnnCq581jIYF2mYGl-Ol7G7ApkL3cDWCFgEqyGUPoUqCvTLOWH8lgylFGVM0WKmO7HGVsxiWwsLCLsFI50yJKJckshlw" alt="URL Rewrite" title="URL Rewrite"/>
</center><br/>

#### **直接貼上至 Web.config**

　　前一陣子在裝好 SSL 憑證之後，要來做 http to https 的重新導向，我很開心的打開 URL Rewrite 的安裝檔，一時在想起來當下的 Server 不能連外網所以安裝不起來，於是我從之前有做好導向的 Server 複製 Web.config 的資訊來使用，將以下的資訊放到 < system.webServer > 裡面，如下：

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
如果你的環境網路是通的當然也可以選擇使用 [URL Rewrite(傳送門)](https://www.microsoft.com/web/downloads/platform.aspx)

安裝好後就可以照著以下的影片去做了
<div class="video-container">
    <iframe width="800" height="450" src="https://www.youtube.com/embed/U7USHit5mhY" frameborder="0" allowfullscreen></iframe>
</div>

<font color="red">P.S：我到目前操作過的環境皆與影片環境相同<font>