---
layout: post
title:  "SQL Server Express 自動備份"
date:   2017-09-21 00:00:00
categories: SQL_Server
tags: SQL SQL_Server Windows 筆記
excerpt: <center itemprop="image" itemscope itemtype="http://schema.org/ImageObject"><img itemprop="image url height width" src="\images\2017-09-21-sql-server-express-back-up\2017-09-21-sql-server-express-back-up-image1.jpg" alt="URL Rewrite" title="URL Rewrite"/></center><br/>　　最近碰到設定 SQL Server 排程備份的問題，我們一般知道在「管理」下的「維護計畫」使用維護計畫精靈去設定，但如果很可惜的你是 Express 那就需要其他的方法來輔助備份了。
mathjax: true
author: Frank Sun 孫景承
---

* content
{:toc}

## 前言

<center itemprop="image" itemscope itemtype="http://schema.org/ImageObject">
    <img itemprop="image url height width" src="\images\2017-09-21-sql-server-express-back-up\2017-09-21-sql-server-express-back-up-image1.jpg" alt="URL Rewrite" title="URL Rewrite"/>
</center><br/>

　　最近碰到設定 SQL Server 排程備份的問題，我們一般知道在「管理」下的「維護計劃」使用維護計劃精靈去設定，但如果很可惜的你是 Express 那就需要其他的方法來輔助備份了。

### .bat檔與工作排程器

#### Step 1. 建立 .sql

```sql
Declare @DBName varchar(MAX)
Declare @FileName Varchar(MAX)
Declare @Folder Varchar(MAX)
Declare @DateTimes Varchar(20)
 
--要備份的資料庫名稱
SET @DBName='DatabaseName'
 
--儲存備份檔的路徑
SET @Folder='D:\DBbackUp'
 
--定義備份檔名稱，後面我加上年月日yyyymmdd
SET @DateTimes = Convert(varchar(20), GETDATE(), 112)
SET @FileName=@Folder + @DBName + '_' + @DateTimes + '.bak'
 
--執行備份
BackUp Database @DBName To Disk=@FileName
```

#### Step 2. 建立.bat執行.sql

　　這邊如果你想測試的話，可以先使用 pause 替代 exit，確認沒問題再改回來就好了。

　　localhost 可改成你的 IP 位置。

```
sqlcmd -S localhost\SQLEXPRESS -E -i D:\DBbackUp\BackUpDB.sql
exit
```

#### Step 3. 加入工作排程器
照以下圖片順序操作

1. 點「建立基本工作...」<br/><br/>
![工作排程器1](\images\2017-09-21-sql-server-express-back-up\2017-09-21-sql-server-express-back-up-image2.jpg)

2. 輸入名稱及描述<br/><br/>
![工作排程器2](\images\2017-09-21-sql-server-express-back-up\2017-09-21-sql-server-express-back-up-image3.jpg)

3. 選擇多久執行一次<br/><br/>
![工作排程器3](\images\2017-09-21-sql-server-express-back-up\2017-09-21-sql-server-express-back-up-image4.jpg)

4. 調整基準日期及時間間格<br/><br/>
![工作排程器4](\images\2017-09-21-sql-server-express-back-up\2017-09-21-sql-server-express-back-up-image5.jpg)

5. 啟動程式<br/><br/>
![工作排程器5](\images\2017-09-21-sql-server-express-back-up\2017-09-21-sql-server-express-back-up-image6.jpg)

6. 選擇要執行的 .bat 檔<br/><br/>
![工作排程器6](\images\2017-09-21-sql-server-express-back-up\2017-09-21-sql-server-express-back-up-image7.jpg)

7. 完成<br/><br/>
![工作排程器7](\images\2017-09-21-sql-server-express-back-up\2017-09-21-sql-server-express-back-up-image8.jpg)

### 補充

如果你的維護計劃精靈開啟出現錯誤，可執行以下 SQL 指令將 Agent XPs 的元件打開

```sql
sp_configure 'show advanced options', 1; 
GO 
RECONFIGURE; 
GO 
sp_configure 'Agent XPs', 1; 
GO 
RECONFIGURE 
GO
```