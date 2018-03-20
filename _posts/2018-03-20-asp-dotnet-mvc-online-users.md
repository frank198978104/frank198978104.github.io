---
layout: post
title:  ASP.Net 線上人數
date:   2018-03-20 00:00:00
categories: Code
tags: Csharp MVC Code 筆記
excerpt: 　　即時統計在線人數。
mathjax: true
author: Frank Sun 孫景承
---

* content
{:toc}

## 前言
　　即時統計在線人數。

### Code

**在 Global.asax 裡面輸入以下的Code**
```csharp
    void Application_Start(object sender, EventArgs e)
    {
        Application["OnlineUsers"] = 0;
    }


    void Session_Start(object sender, EventArgs e)
    {
        //啟動新工作階段時執行的程式碼
        Application.Lock();
        Application["OnlineUsers"] = (int)Application["OnlineUsers"] + 1;
        Application.UnLock();
    }

    void Session_End(object sender, EventArgs e)
    {
        //工作階段結束時執行的程式碼。
        //注意: 只有在 Web.config 檔將 sessionstate 模式設定為 InProc 時，
        //才會引發 Session_End 事件。如果將工作階段模式設定為 StateServer
        //或 SQLServer，就不會引發這個事件。
        Application.Lock();
        Application["OnlineUsers"] = (int)Application["OnlineUsers"] - 1;
        Application.UnLock();
    }
```

**View 引用的部分**
```html
<p>線上人數：@HttpContext.Current.Application["OnlineUsers"] 人 </p>
```