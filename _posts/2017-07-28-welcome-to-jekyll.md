---
layout: post
title:  "在 GitHub 上使用 Jekyll 建立自己的部落格"
date:   2017-07-28 00:00:00
categories: Jekyll
tags: Jekyll 懶人包 部落格 教學 GitHub 網站
excerpt: <center><img src="https://lh3.googleusercontent.com/pVYx7pbQ6mmZ0wY2-NoJMD564qpFIUsV41mV8a507kb4dgCRagBzle2umq5xPHznExTaL61HfyxYC-_mbB2pPtBwddD1SJelvOBoKHE1Abfuk623hcTSGwZSEwd90H4_vqwdQleG_NWJf44mA2-drcVGGj7qn6Rfra5X29cOAWiYO0c0aAYajrSxA6Ase0-OlNRDkVX3RoXFGVrzNuMUTsVMQXggiymEG0WbVDBFKQod3yDKKoXVFkmE5PE9ku1MgO8ySJNCSLhWfrKF72igZVSZczpM1dGmdp47Bf4r3omjlJ88mlhDlkCibv9nSHg0xyJHDzyBeiMMwNL0wBfoU3COzzYxAXYL6Nh3zLU14BHfePpe2QFH5_8hyjm47Wc8dzYGb0M2o3ODaGh6XIubowsuDV2JORt5mNYp43GyeOcfnBdRCiJxePZg1s3isvi0kzO9C_n9R-cIhhpXICamrzmQdBqpRUwEyEY_zigIuhp3B2AXrrdzAB3YZnM9AOkeG4RaWFsaQCfGsNZSsuaVc-oxmxsMFmISTuobhsEGRC0rAssC8ATWhkmN1FGzaYY2NaUtKQ" width="500" alt="在 GitHub 上使用 Jekyll 建立自己的部落格" title="在 GitHub 上使用 Jekyll 建立自己的部落格"/></center><br/>　　前一陣子有朋友在問我網頁前端的相關問題，一開始也只是很平常的回覆他，但是過一陣後我想想，他是寫iOS的為什麼在問我網頁前端的東西呢？他才跟我說他在GitHub上建立部落格，紀錄一些事情。我回頭想想，也對，當遇到問題的時候好像會回去開以前寫過的專案，頗浪費時間的，所以就想說我也來架一個紀錄一下我所做過的專案跟曾經碰到的問題，也算是某種筆記。
mathjax: true
author: Frank Sun 孫景承
---

* content
{:toc}

### **前言小語：**
<center itemprop="image" itemscope itemtype="http://schema.org/ImageObject">
    <img itemprop="image url height width" src="https://lh3.googleusercontent.com/pVYx7pbQ6mmZ0wY2-NoJMD564qpFIUsV41mV8a507kb4dgCRagBzle2umq5xPHznExTaL61HfyxYC-_mbB2pPtBwddD1SJelvOBoKHE1Abfuk623hcTSGwZSEwd90H4_vqwdQleG_NWJf44mA2-drcVGGj7qn6Rfra5X29cOAWiYO0c0aAYajrSxA6Ase0-OlNRDkVX3RoXFGVrzNuMUTsVMQXggiymEG0WbVDBFKQod3yDKKoXVFkmE5PE9ku1MgO8ySJNCSLhWfrKF72igZVSZczpM1dGmdp47Bf4r3omjlJ88mlhDlkCibv9nSHg0xyJHDzyBeiMMwNL0wBfoU3COzzYxAXYL6Nh3zLU14BHfePpe2QFH5_8hyjm47Wc8dzYGb0M2o3ODaGh6XIubowsuDV2JORt5mNYp43GyeOcfnBdRCiJxePZg1s3isvi0kzO9C_n9R-cIhhpXICamrzmQdBqpRUwEyEY_zigIuhp3B2AXrrdzAB3YZnM9AOkeG4RaWFsaQCfGsNZSsuaVc-oxmxsMFmISTuobhsEGRC0rAssC8ATWhkmN1FGzaYY2NaUtKQ" width="500" alt="在 GitHub 上使用 Jekyll 建立自己的部落格" title="在 GitHub 上使用 Jekyll 建立自己的部落格"/>
</center><br/>
　　前一陣子有朋友在問我網頁前端的相關問題，一開始也只是很平常的回覆他，但是過一陣後我想想，他是寫iOS的為什麼在問我網頁前端的東西呢？他才跟我說他在GitHub上建立部落格，紀錄一些事情。我回頭想想，也對，當遇到問題的時候好像會回去開以前寫過的專案，頗浪費時間的，所以就想說我也來架一個紀錄一下我所做過的專案跟曾經碰到的問題，也算是某種筆記。

<div align="center" style="margin-top:50px;">
<label style="font-size: 28px;" align="center">那就讓我們開始流程跟教學吧！</label>
</div>

## **建置流程**

### **Step 1 - GitHub**
1. 先到 **[GitHub](https://github.com/)** 上申請帳號

2. 建立專案，Repository name的名稱必須是<span style="color:red">**你的username.github.io**</span>(參照下圖
<img src="https://lh3.googleusercontent.com/wjF263UGrqBO2zDifFhAkbRoRaynBtijPxhhkrxfTs9cbuXwRtxOHlJL0bn6RQ1CLaJepGxDd6G33DGJMiZZO_p5EpB5OnfwIOHrvB9Ys1cHviAClcYVU52mF9Qy_YtFPWcjmL4-x11f1fwfYyoiNOwYDdnWOgx07sBxREysRsMNZ2ZBmhdZrTWnkFDuHzcrMsSvFE2MWJrSPhFrnV8FZQsZ7_Wh8_JOST1ouTmdQ6a7XAyrLm9p6bQqEyKgsSpxKOJ81X8LKy1wBu3HDj4W3JO9gmUg6-LbGSwHghpN-YAUz4EL42QEVnd_JD5wOw9-SRCFBiEv4Ke-JprpXG4OTGyU2Z1fwXVOl9MVEyFeCIHL5ynKWaABU3D6G7h2qDJRDAedD4QcvW6SMCjisxwURDZuzS60-fq05pfKx040QDMC6gzwZMp4ms2bQ8vL1t98mfju-Jt_iR_7hHGTMQNNWsblwFTr7hsxiTxKjUIH1ZZOKtveQA39Be4xV-NTix0Ya59z0bdnqlDJ6YKhona9dsFrpPdjYjw095OweUXSS6h5_geZyL0UF1I5d2wtTD07eXwC-g" width="500" alt="Repository name範例" title="Repository name範例"/>

3. 專案建立好後，點擊**Set up in Desktop**(如下圖位置)，之後他會詢問你要開啟<br/>
如果沒有安裝 **[GitHub桌面版](https://desktop.github.com/)** 他就會詢問你是否要安裝**(在此提供連結也可以先行安裝)**
<img src="https://lh3.googleusercontent.com/vPtkzjklCJ7IRUutxHPXoN78hPvI9bjiNcNesTmk3mvDkVtywHAArmcC39gNlckcocUhh9jKgxqqR4zBDsz84HM4mYHPX1IQnrqZCe-xwRzJ4p9p86NSgt7y9QgzeLCunzwJNj5Gqc8U2fc1U2RMBYX0HgFB2xWQWQN1i-FVGB6kHJtZk7B3PDq2QXoks0CfleNrkytyfvIfBpcW3sfaTSv7ucfgpUwqcwodgpAfu89nfEXO8_PDPq70U1PisXoJdpQZBWvwEK6FZVGDIbPpOFA26F8gy3uwbXYo06nu3tmZQWgdIdXdQ7wFq9YMpNEo_xGbjWFGAeozIqor1oxe6uBqLn_7xDJyWDLOsJqWbdp7Ienju_U1Xe6tPkOC9UXeQMtepVwGRoOhklvbfh_YCMIagUsAkwEnmP6Qv7VSeBWESxpK6uqmRk47xhJgmjoB9XNMuGi0_s_PX9bi_vjgqbvd-0pqm4RCivku53jrD4fTLTi3NAwvyULyz8GJ2y6Vsn9zeaPHBgDlrWR4198gKc49vLwK4KeSOpluFXak_L2Ts5O8Lp9DHbuqsuP35pudcmjnmw" width="500" alt="Set up in Desktop位置" title="Set up in Desktop位置"/>

4. 若已安裝完成，他會跳出如下圖的畫面，自動幫你連結和創資料夾<br/>
如果你想自己複製(如上圖)Set up in Desktop右邊的HTTPS或是改資料夾路徑也是可以的
<img src="https://lh3.googleusercontent.com/dOniYf8oAdnD959GGrORKppe_-GtsArwMz2W3C9zuYpgnvgGE24F-xUEoTnN16zp6F-wXXEFvE0T81oPRQtTy5sh67kNGlIz4oP7iLcRYYlsI4SOWmy_PaU_kAicu1orpustGFoU7aWD_aJWpu4x62a38iT-QmiOFC4xKkJ2oBkAgSELA0ZST254ZygRp81HJrCbLr-RYMTixypEbORwwfWfDdOyvgQzSaxLDT1efJlPWO4mE6s_xdgFyrXU_hhQZpXUBhAKcEl3xE7yV3e-jK487TLTPWj1OPUxo9ODKFFxfEVw47czR4kcRXHNDNZUEVd6tKnRQu0vHST6EE2HEDHl0CGPGY-kR8NipDW2coX3H_hvoPukUfQUo7-_Kr1gW8vTTaQwtN34Az2x9VQemlFCqyGbwE03o7aPB6VG6IojiqMb5J-qC_6jIN-bBUGZMhku-wTksi1Jd_2--pKHDlJjV_88X-f-nRkazMPu2KyEkesng0FNpcJY7pP7J04foiU04e2ifxjBknXiSSXzKDNHMhVNWQIJuwgABDvQUJJ-6cwD_998YnopwuaKOiL_SuQngA" width="500" alt="桌面版範例" title="桌面版範例"/>

5. 試著建立一個 index.html 放到裡面(可直接複製下面黑框內的範例)

6. 右邊的 index.html 已經待上傳了，左下角的Summary輸入概要之後就可以點下**Commit to master**就可以認可了<br/>
當按下右上方的Push origin 或是 Fetch origin就可以進行發送或擷取GitHub的資料了。
<img src="https://lh3.googleusercontent.com/XeQNcymXhxg00-CsAbZqMR0kAk9VaBSdpr21QzIMmfpxejNi6R2dXVlElm5j3WyKqUYHRFO5KWWCaaPOjNPXTU0u68PDDR5H9IpMRx4l7LRttleMBjEW4nV2YQV--g3q_bXDCrxCrssVbVv845u8GG7Txn1xfLCRl5ddME1IPE9mf8iW2lqQiZoAFe3oomcj9Cx2-xuz8cVcYLaTf9Fa515x8okrU9oZfeXYzQ55iyp93xwlhTIqZOTdm4azRN0b-zGuR3fDTNZNsdPaX0StuX21xnkaxe7a-NjsiMPTrtsvQBqbX5ns1hzcWSdrxDNNV0A0IDYAuzsfHe-S-pV7ApIQeXdFivJiRL9YmhpvTy7hhD0Y0I-AeypnlPyPaI_tJl7lgF9mf3-DQ6-I4ixFvOZLSWqvnK3OMhpfvXxv4BbdoA-gffOYcE1oE12VI9Ln5Ckq8FEtTN1fQnLGgEAeNEo4ynyNayqpyWWrysQJjictM_c0QWX67fEPxW0C385s1CyxJ-PRdUcTR8AzrFY31PnJyE__9vPztp4a8TVLw2BgnzTgVYW7HE9ZtLtAkTUpwI5lhQ" alt="上傳範例" title="上傳範例"/>

7. 打開網址 https://username.github.io (username換成自己的帳號) 就完成了！

>第5點 index.html 範例
>```html
><!DOCTYPE html>
><html>
>  <body>
>    <h1>Hello World</h1>
>    <p>I'm hosted with GitHub Pages.</p>
>  </body>
></html>
>```
index.html 顯示的結果如下<br/>
![index.html範例結果](https://lh3.googleusercontent.com/MtsxWeyamuhqapHx0uH8A9p0UUbxKShRimWVwd8xtjxjZcWxAEMruzUSz0pUmNMDd5Ur3DaHVux-Tpn7YaUZDB0l40_grg89eFYONIMOamEoiSLJf3ViY_y0Rr8yYEISS5HaBwnzD0xWE-pxhr28FJ4RSzyuSahHEjW6ar_w-CgPLPaWLCOa-awkDjCqLZj8VFPlheg_XLBnBCTxoDVFgvyxYQhhyi0GGFqPw9p5jwWYYD8fABvmyi_aVC0QJJswIx34JVOAGKGlB7JriXqU7n3F9eGQVStNoRMEt-Fe8Ge09N-kIz4EKXKC2tLj5v6VlhV6QpqyqaZErEIZH_DpvVefHjhnSn-j17e2f2UuSKp7uraPksuL1f5yR0EfWWsFHaJ8GSaGElpHD_Sb87Y27rl8dj5qjmdjEDljqFlwFhIC5S3TZfuCpchQFHF8fBZ4N0QJMPcEZOSfBzhF-fyG24AEopMCYjMgXpo30w28L3cLY6spy34KDVfHCIxcfsjm_YaMj6_dQGz9b3rB3OJbWuimdO1t3uVPyec8tfpsu1ydy7AQWPs1rjvKp1u8gaREqVY-0Q)

### **Step 2 - Jekyll**
有興趣可以去看看 Jekyll 網站 → [Jekyll 中文版](http://jekyll.com.cn/)

換句話說， Jekyll 就是幫助你建立一個部落格平台，只是利用 **[GitHub](https://github.com/)** 來免費管理你的部落格，使用者可以利用 Markdown 來編寫你的文章， Jekyll 會自動幫你編譯成 HTML 網頁，如果你本身很熟悉 HTML 及 CSS 語法，也是可以接做使用。

 [Markdown官方網站](http://markdown.tw/)

 [Markdown常用語法](https://support.discordapp.com/hc/zh-tw/articles/210298617-Markdown%E6%96%87%E5%AD%97%E6%A0%BC%E5%BC%8F%E8%A8%AD%E5%AE%9A-%E8%81%8A%E5%A4%A9%E6%A1%86%E6%A0%BC%E5%BC%8F-%E7%B2%97%E9%AB%94-%E6%96%9C%E9%AB%94-%E4%B8%8B%E5%8A%83%E7%B7%9A-)

#### **安裝方法**
* Windows - [官方版前置作業](https://jekyllrb.com/docs/windows/)
* MAC - [若是Ruby版本太舊請先更新](https://www.ruby-lang.org/zh_tw/documentation/installation/#homebrew)

1. 在終端機輸入
```
gem install jekyll
jekyll new mysite
cd mysite
jekyll serve
```

2. 打開網頁<br/>
[http://localhost:4000/](http://localhost:4000/)
![localhost:4000範例結果](https://lh3.googleusercontent.com/CdgGyvgLwKORkgUND37uw6Y88D2iwram59RR51PmcOGyQPf3euVl74yUk1-VsMocSgTK5p4irfCG0wTn2MZgX4QlrjIiHFmjSQT4TO8hwyzY0Ndncq20ONWJr4li7GPwiG7FVdfjCTwfOf99eGMBy6NtW1YI-quOpNYf_MObe4Igv8we7CLPdb8eJDZvRb1Op-Kjy222zrtKVJztqhi2MuYlfA_-avQLoQ7Ch4Dc7AR4NOGqGBtTHULbZMiC4od3NGt324uD50xd1WtchDS_x8ZNe3Yp5bIIoW8YiGrdHJ9S_CWXN8SvKrfeEPq3pKIezgqVtP1oyTjI0k-kpoyjfxBcSKLjsDAFrrg1TB9zevBTjbkWJAec5I2ggnqFGUKqpeSqjOd3Gtjh17YnxN4I-Z_0EiXa3w0EkR5fU8cpe_I5uiZJMYKJVB1AadI2zKBTXU5MVSat9vjNMt7g5DQGBz4HZgg_PsY_YmbXmYAhzxUKo-zxpgzC5AJ6tsciMVm4C_yfaFUuj8Zy7SvYWtTSN8-LhiUcWBe0w2YwVUnJC9yIO4zF_mjB5RlztDjBQQ-WVq5qhQ)


基本上到這邊大致上就完成了

只要照著 Step 1 的第 6 點就可以把你的資料同步上去了

#### **新增文章**
只要從相對資料夾下的 _posts 這個資料夾裡面新增一個 .md 檔就可以開始撰寫文章了

我本身比較習慣使用 **[Visual Studio Code](https://code.visualstudio.com/)**

我是直接把整包資料夾拉進 Visual Studio Code 當中

當文章編輯完時，介面左邊也會有工具提供給使用者Commit，很方便

不過推送或擷取還是要透過 GitHub Desktop 按一下 Push origin 或是 Fetch origin(參考 Step 1 的第 6 點)

### **總結**
GitHub Pages ＋ Jekyll使用上的特點：

優點-

* 免費
* 無限流量
* 架設容易
* 無廣告 (可以自己加進去)
* 彈性極高
* 支援 markdown
* 支援版本控制 (GitHub本身)
* 可在離線編輯/預覽
* 中國可瀏覽

缺點-

* 完全開源 (同為優點)
* 靜態網頁限定
* 無資料庫
(以上缺點其實對一般部落格都沒什麼影響)