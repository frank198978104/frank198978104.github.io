---
layout: post
title:  "將 Jekyll 部屬到 Azure"
date:   2017-08-25 00:00:00
categories: Jekyll
tags: Jekyll 網站 部落格 教學 Azure
excerpt: <center itemprop="image" itemscope itemtype="http://schema.org/ImageObject"><img itemprop="image url height width" src="/images/2017-08-25-jekyll-on-azure/2017-08-25-jekyll-on-azure-image0.jpg" alt="URL Rewrite" title="URL Rewrite"/></center><br/>　　在第一篇我們提到如何在 GitHub 上使用 jekyll 架部落格：在 GitHub 上使用 Jekyll 建立自己的部落格<br/>這一次有朋友提議說要不要架在 Azure 看看呢? 因為 Azure 上也可以免費架設，經過小小的了解之後我來教大家怎麼在 Azure 上架設 jekyll 吧。
mathjax: true
author: Frank Sun 孫景承
---

* content
{:toc}

## **前言**

<center itemprop="image" itemscope itemtype="http://schema.org/ImageObject">
    <img itemprop="image url height width" src="/images/2017-08-25-jekyll-on-azure/2017-08-25-jekyll-on-azure-image0.jpg" alt="URL Rewrite" title="URL Rewrite"/>
</center><br/>

在第一篇我們提到如何在 GitHub 上使用 jekyll 架部落格：**[在 GitHub 上使用 Jekyll 建立自己的部落格](/2017/07/28/welcome-to-jekyll/)**

這一次有朋友提議說要不要架在 Azure 看看呢? 因為 Azure 上也可以免費架設，經過小小的了解之後我來教大家怎麼在 Azure 上架設 jekyll 吧。

## **部屬流程**

### Step 1. 連結
先到 Azure 的主網站：[https://portal.azure.com/](https://portal.azure.com/)

### Step 2. ＋ 新增
進到 Azure 的儀表板之後，點擊左邊編列表的「＋ 新增」。<br/>
![新增](/images/2017-08-25-jekyll-on-azure/2017-08-25-jekyll-on-azure-image1.jpg)

### Step 3. 建立 Web 應用程式
點選「Web 應用程式」的「Create」。<br/>
![Web 應用程式 Create](/images/2017-08-25-jekyll-on-azure/2017-08-25-jekyll-on-azure-image2.jpg)

### Step 4. 方案/位置
將資料填妥後，因為預設的伺服器是要付費的，要自己去選擇改成免費的，所以先點選「App Service 方案/位置」<br/>
![App Service 方案/位置](/images/2017-08-25-jekyll-on-azure/2017-08-25-jekyll-on-azure-image3.jpg)

### Step 5. 新建 Service
直接點「新建」<br/>
![新建](/images/2017-08-25-jekyll-on-azure/2017-08-25-jekyll-on-azure-image4.jpg)

### Step 6. 定價層
資料填選完之後選擇「定價層」來選擇伺服器<br/>
![定價層](/images/2017-08-25-jekyll-on-azure/2017-08-25-jekyll-on-azure-image5.jpg)

### Step 7. F1 免費
正如 Step 4 所說，他預設的「S1 標準」是要付費的，所以我們就拉到最底下選擇「F1 免費」，然後點「選取」，然後回到 Step 6 的圖點「確定」，又會回到 Step 4 的圖點「建立」。<br/>
![F1 免費](/images/2017-08-25-jekyll-on-azure/2017-08-25-jekyll-on-azure-image6.jpg)

### Step 8. 部屬認證
等一會之後我們到「應用程式服務」選擇我們剛建立的 Web 應用程式，先看左邊的列表，若未設定「部屬認證」就先設定好，設定好之後按儲存即可。<br/>
![應用程式服務](/images/2017-08-25-jekyll-on-azure/2017-08-25-jekyll-on-azure-image7.jpg)
![部屬認證](/images/2017-08-25-jekyll-on-azure/2017-08-25-jekyll-on-azure-image8.jpg)
![部屬認證](/images/2017-08-25-jekyll-on-azure/2017-08-25-jekyll-on-azure-image9.jpg)

### Step 9. 部屬選項
點選「部屬選項」<br/>
![部屬選項](/images/2017-08-25-jekyll-on-azure/2017-08-25-jekyll-on-azure-image10.jpg)

### Step 10. 本機 Git 儲存機制
點「選擇來源」，選「本機 Git 儲存機制」，點「確定」。到這邊 Azure 的架設就告一段落了，我們回到本機繼續下面的步驟。<br/>
![本機 Git 儲存機制](/images/2017-08-25-jekyll-on-azure/2017-08-25-jekyll-on-azure-image11.jpg)

### Step 11. 指令
在 **[第一篇](/2017/07/28/welcome-to-jekyll/)** 我們已經知道如何 New 出一個新的 jekll 的專案，我們就以剛 New 出來的作範例。在有執行 jekyll serve 之下，我們寫好網站之後程式會幫你編譯出一個「_site」的資料夾，我們開啟命令提示字元到你該專案下的 _site 資料夾當中，然後就要開始下 Git 的指令，如下：
>
>1. 初始化建立空的 Git
>```
>git init
>```
>2. 將要上傳的檔案加入 Git
>```
>git add .
>```
>3. 下 commit 來認可資料
>```
>git commit -m "初次認可"
>```
>4. 連結 Azure，Git 複製 URL 如下圖，按一下以複製再貼到Git複製的位置上。
>```
>git remote add origin Git複製URL
>```
>![Git 複製 URL](/images/2017-08-25-jekyll-on-azure/2017-08-25-jekyll-on-azure-image12.jpg)
>5. 推送上去，第一次會需要部屬認證的帳號密碼，之後就不用了。
>```
>git push origin master
>```
>![部屬認證輸入](/images/2017-08-25-jekyll-on-azure/2017-08-25-jekyll-on-azure-image13.jpg)

### Step 12. 完成
連結 Azure 給你的指定路徑就完成了！路徑名稱是 <font color="blue">http://資源名稱.azurewebsites.net</font>，在指令的第4點圖裡面，上面有個 URL 也可以直接連結過去。<br/>
![完成圖](/images/2017-08-25-jekyll-on-azure/2017-08-25-jekyll-on-azure-image14.jpg)

<font color="red">P.S：第一次建立成功之後，發佈資料只要重複 <b>指令第2、3、5點</b> 即可。</font>

## **影片教學**
YouTube 上也有人提供影片，喜歡看著影片操作的朋友也可以參考喔。
<iframe width="800" height="450" src="https://www.youtube.com/embed/b8sac4fSqPo" frameborder="0" allowfullscreen></iframe>

## **GitHub 與 Azure 免費限制**
### GitHub
根據官方文件「[Usage limits](https://help.github.com/articles/what-is-github-pages/)」，Github 的使用限制如下：

* GitHub Pages 一個目錄的檔案建議限制為 1 GB。

* GitHub Pages sites 的流量限制為每個月 100 GB。

### Azure
根據官方網站的定價資料「[App Service 價格](https://azure.microsoft.com/zh-tw/pricing/details/app-service/)」

免費帳戶：
* Web、行動或 API 應用程式	10個
* 磁碟空間	1GB

F1 免費：
* 核心  共用(60 CPU 分鐘數 / 天)
* RAM	1GB
* 容量	1.00GB

