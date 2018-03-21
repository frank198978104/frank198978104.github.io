---
layout: post
title:  Asp.Net MVC anti-forgery token problem：nameidentifier or identityprovider not present
date:   2018-03-21 00:00:00
categories: Code
tags: Csharp MVC Code 筆記
excerpt: 　　　　當使用ClaimsIdentity的時候，Asp.Net MVC在生成AntiForgeryToken的時候會默認使用User.Identity中兩種ClaimsType的值：NameIdentifier (http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier)和IdentityProvider (http://schemas.microsoft.com/accesscontrolservice/2010/07/claims/identityprovider)。如果我們使用的STS（[Security Token Service](https://en.wikipedia.org/wiki/Security_token_service)）沒有提供兩種ClaimsType的值，那麼MVC就會報AntiForgeryToken生成失敗的錯誤。
mathjax: true
author: Frank Sun 孫景承
---

* content
{:toc}

## 前言
　　當使用ClaimsIdentity的時候，Asp.Net MVC在生成AntiForgeryToken的時候會默認使用User.Identity中兩種ClaimsType的值：NameIdentifier (http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier)和IdentityProvider (http://schemas.microsoft.com/accesscontrolservice/2010/07/claims/identityprovider)。如果我們使用的STS（[Security Token Service](https://en.wikipedia.org/wiki/Security_token_service)）沒有提供兩種ClaimsType的值，那麼MVC就會報AntiForgeryToken生成失敗的錯誤。

<center itemprop="image" itemscope itemtype="http://schema.org/ImageObject">
  <img itemprop="image url height width" src="\images\2018-03-21-asp-dotnet-mvc-anti-forgery-token-problem\2018-03-21-asp-dotnet-mvc-anti-forgery-token-problem-image1.png" alt="AntiForgeryToken錯誤是意圖" title="AntiForgeryToken錯誤是意圖"/>
</center>

## 問題及解決

詳細的錯誤信息是這樣的：

>A claim of type 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier' or 'http://schemas.microsoft.com/accesscontrolservice/2010/07/claims/identityprovider' was not present on the provided ClaimsIdentity. To enable anti-forgery token support with claims-based authentication, please verify that the configured claims provider is providing both of these claims on the ClaimsIdentity instances it generates. If the configured claims provider instead uses a different claim type as a unique identifier, it can be configured by setting the static property AntiForgeryConfig.UniqueClaimTypeIdentifier.

從錯誤提示我們可以看到Asp.net MVC強制要求提供NameIdentifier和IdentityProvider這兩個值，這是默認的行為。但是這個默認的行為是可以改的。我們用ADFS，IdentityProvider這個值是沒有的。根據錯誤消息的最後一句提示我們，可以修改AntiForgeryConfig.UniqueClaimTypeIdentifier的值，從而告訴Asp.Net MVC用別的ClaimsType的值來生成AntiForgeryToken。比如我們準備使用NameIdentifier，

**只需要在Global.asax.cs中添加下面一句話：**
```csharp
AntiForgeryConfig.UniqueClaimTypeIdentifier = System.Security.Claims.ClaimTypes.NameIdentifier;
```
重新編譯運作之後，只要ADFS提供了NameIdentifier程序就不會再報錯了。

## 參考資料
[http://www.cnblogs.com/rader/archive/2016/03/02/5235875.html](http://www.cnblogs.com/rader/archive/2016/03/02/5235875.html){:target="_blank"}
