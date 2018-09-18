---
layout: post
title:  "Bash on Windows"
date:   2017-09-09 00:00:00
categories: Windows
tags: Windows Jekyll 教學
excerpt: <center itemprop="image" itemscope itemtype="http://schema.org/ImageObject"><img itemprop="image url height width" width="500" src="\images\2017-09-09-bash-in-windows\2017-09-09-bash-in-windows-image1.jpg" alt="Bash coming to Windows" title="Bash coming to Windows"/></center><br/>　　在第一篇文章中，我們有提到 Bash 下安裝 jekyll ，那我在這裡把這部分再詳細的介紹一次。
mathjax: true
author: Frank Sun 孫景承
---

* content
{:toc}

## **前言** 

<center itemprop="image" itemscope itemtype="http://schema.org/ImageObject">
    <img itemprop="image url height width" width="500" src="\images\2017-09-09-bash-in-windows\2017-09-09-bash-in-windows-image1.jpg" alt="Bash coming to Windows" title="Bash coming to Windows"/>
</center><br/>

承第一篇：[在 GitHub 上使用 Jekyll 建立自己的部落格](/2017/07/28/welcome-to-jekyll/)<br/><br/>
　　在第一篇文章中，我們有提到 Bash 下安裝 jekyll ，那我在這裡把這部分再詳細的介紹一次。

## **Bash 安裝及操作**

### 啟用 Bash
　　Bash 功能是在 2016 年 8 月 2 日 微軟推出了 Windows 10 年度更新的其中一項功能，所以你如果不是 Windows 10 的話就無法使用此功能。

#### Step 1. 更新與安全性
先開啟 Windows 設定，選擇 「**更新與安全性**」
<br><br>
![更新與安全性](\images\2017-09-09-bash-in-windows\2017-09-09-bash-in-windows-image2.jpg)

#### Step 2. 檢查更新
如開頭所說，Bash 是屬於年度更新的功能，如果你的 Windows 10 如果太舊就更新一下確保能啟用 Bash
<br><br>
![檢查更新](\images\2017-09-09-bash-in-windows\2017-09-09-bash-in-windows-image3.jpg)

#### Step 3. 開發人員模式
選擇「**開發人員專用**」再點選「**開發人員模式**」
<br><br>
![開發人員模式](\images\2017-09-09-bash-in-windows\2017-09-09-bash-in-windows-image4.jpg)

#### Step 4. APP
回到 Windows 設定，選擇 「**APP**」
<br><br>
![APP](\images\2017-09-09-bash-in-windows\2017-09-09-bash-in-windows-image5.jpg)

#### Step 5. 程式和功能
選擇「**應用程式與功能**」拉到最下面點選「**程式和功能**」
<br><br>
![程式和功能](\images\2017-09-09-bash-in-windows\2017-09-09-bash-in-windows-image6.jpg)

#### Step 6. Windows 功能
點擊「**開啟或關閉 Windows 功能**」
<br><br>
![Windows 功能](\images\2017-09-09-bash-in-windows\2017-09-09-bash-in-windows-image7.jpg)

#### Step 7. 打勾啟用 Bash
進入 Windows 功能後拉到最下面把「**適用於 Linux 的 Windows 子系統(搶鮮版(Beta))**」打勾
<br><br>
![啟用Bash](\images\2017-09-09-bash-in-windows\2017-09-09-bash-in-windows-image8.jpg)

#### Step 8. 命令提示字元操作 Bash
可以在「執行」或「搜尋 Windows」輸入「**cmd**」開啟「命令提示字元」

然後輸入「**bash**」，就會開始做一些安裝和設定

中間會問你的語系都按「**Y**」就可以了

最後會要你設定一組 Linux 的帳號和密碼

如果你用的 Windows 帳號是 Administrator 他會跳過設定帳號的步驟直接使用 root

### 安裝 Ruby 及 jekyll

在 **Bash** 下照著以下指令一步一步執行

```
sudo apt-get update -y && sudo apt-get upgrade -y

sudo apt-add-repository ppa:brightbox/ruby-ng
sudo apt-get update
sudo apt-get install ruby2.5 ruby2.5-dev build-essential dh-autoreconf

sudo gem update

sudo gem install jekyll bundler
```

詳細參見：[Jekyll 官方說明文件](https://jekyllrb.com/docs/windows/)