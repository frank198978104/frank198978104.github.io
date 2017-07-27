---
layout: post
title:  "Jekyll 搭建靜態博客"
date:   2015-02-15 22:14:54
categories: jekyll
tags: jekyll RubyGems
---

* content
{:toc}

一直以來都想搭建一個自己的博客，但是近半年做項目太忙，再加上教研室的網絡很坑爹，所以也一直沒顧得上。之前用過 WordPress 託管在免費的京東雲擎上，但是速度太慢。在知乎上看到一些相關的內容，於是選擇了在github上用jekyll搭建博客。





## 搭建過程

在jekyll的官網上 [http://jekyllrb.com/](http://jekyllrb.com/) 其實已經說得比較明白了，我在這裡還是簡單的說一下吧。我用的是Windows系統。    
主要環節有：安裝Ruby，安裝RubyGems，安裝jekyll，安裝代碼高亮插件，安裝node.js

### 安裝Ruby

ruby官網下載安裝：[https://www.ruby-lang.org/en/downloads/](https://www.ruby-lang.org/en/downloads/)

安裝完成後配置環境變量

在命令提示符中，得到ruby版本號，如下圖，即安裝成功

![](http://ww4.sinaimg.cn/large/7011d6cfjw1f2ue0e393vj20cu00t748.jpg)

### 安裝RubyGems

官網下載 [http://rubygems.org/pages/download](http://rubygems.org/pages/download) rubygems-2.4.5.zip   

cd到RubyGems目錄   

![](http://ww1.sinaimg.cn/large/7011d6cfjw1f2ue1l2yscj20gk02amxj.jpg)

執行安裝   

![](http://ww1.sinaimg.cn/large/7011d6cfjw1f2ue1w8eqnj20bx00hglg.jpg)  

### 用RubyGems安裝Jekyll

執行下面的語句安裝   

![](http://ww4.sinaimg.cn/large/7011d6cfjw1f2ue2g2p3uj207x00ft8j.jpg)

安裝結束畫面   

![](http://ww4.sinaimg.cn/large/7011d6cfjw1f2ue32drwhj20hv09xq5m.jpg)

至此jekyll就已經安裝完畢了，後續就是個性化的自己設定了。

### 創建博客

在d盤新建一個工作區jekyllWorkspace

cd到jekyllWorkspace   

執行jekyll new name創建新的工作區   

![](http://ww3.sinaimg.cn/large/7011d6cfjw1f2ue3lt31nj20cj02nt8u.jpg)

文件結構如下：   

![](http://ww1.sinaimg.cn/large/7011d6cfjw1f2ue3ujsybj20ek06wabh.jpg)

cd到博客文件夾，開啟服務器   

![](http://ww1.sinaimg.cn/large/7011d6cfjw1f2ue47y9lgj20ao00f0sl.jpg)

watch為了檢測文件夾內的變化，即修改後不需要重新啟動jekyll

我的環境下啟動報錯(你的可能沒有)，再安裝yajl-ruby和rouge  

![](http://ww4.sinaimg.cn/large/7011d6cfjw1f2ue4nelnxj20dd077q49.jpg)

再次啟動服務器成功

![](http://ww4.sinaimg.cn/large/7011d6cfjw1f2ue4v42koj20g505bdgy.jpg)

訪問 http://localhost:4000/   

![](http://ww1.sinaimg.cn/large/7011d6cfjw1f2ue56ckwoj20je0eumz3.jpg)

詳細文章頁面   

![](http://ww2.sinaimg.cn/large/7011d6cfjw1f2ue5f3j9cj20je0gyq7a.jpg)

## 後續

*  整個安裝過程參考了jekyll官網，注意jekyll還有一個簡體中文官網，不過比較坑（我就被坑了），有些內容沒有翻譯過來，有可能會走彎路，建議如果想看中文的相關資料，也要中英對照著閱讀。[jekyll中文網 http://jekyllcn.com](http://jekyllcn.com), [jekyll英文網 http://jekyllrb.com](http://jekyllrb.com)
*  jekyll中的css是用sass寫的，當然直接在`_sass/_layout.scss`中添加css也是可以的。
*  本文是用Markdown格式來寫的，相關語法可參考： [Markdown 語法說明 (簡體中文版) http://wowubuntu.com/markdown/](http://wowubuntu.com/markdown/)  
*  按照本文的說明搭建完博客後，用`github Pages`託管就可以看到了。注意，在github上面好像不支持rouge，所以要push到github上時，我將配置文件_config.yml中的代碼高亮改變為`highlighter: pygments`就可以了
*  博客默認是沒有評論系統的，本文的評論系統使用了多說，詳細安裝辦法可訪問[多說官網 http://duoshuo.com/](http://duoshuo.com/)，當然也可以使用[搜狐暢言 http://changyan.sohu.com/](http://changyan.sohu.com/)作為評論系統。
*  也可以綁定自己的域名，如果沒有域名，可以在[godaddy http://www.godaddy.com/](http://www.godaddy.com/)上將域名放入購物車等待降價，買之。
*  祝各位新年快樂！

---

## 可能出現的問題

### `hitimes/hitimes (LoadError)`

**錯誤代碼：**

```
C:/Ruby22/lib/ruby/2.2.0/rubygems/core_ext/kernel_require.rb:54:in `require': cannot load such file -- hitimes/hitimes (LoadError)
```

**解決方法：**

在stackoverflow上又一個很好的解決方法。[hitimes require error when running jekyll serve on windows 8.1](http://stackoverflow.com/questions/28985481/hitimes-require-error-when-running-jekyll-serve-on-windows-8-1) 雖然上面的題主問的是 win 8.1 系統下的情況，但是同樣適用於 win7。下面我簡單翻譯一下錯誤原因和解決方法。

> 可能是 Ruby 2.2 和 hitimes-1.2.2-x86-mingw32 中有一些 ABI 變化，少了一些相關的類庫。
>
> 所以卸載 hitimes 並通過 `--platform ruby` 重裝即可。代碼如下：

```
gem uni hitimes
**Remove ALL versions**
gem ins hitimes -v 1.2.1 --platform ruby
```

> 然後將自動重新編譯 hitimes 並適用於 Ruby 2.2

下面是我自己的卸載和安裝過程：

```
E:\GitWorkSpace\gaohaoyang.github.io>gem uni hitimes

You have requested to uninstall the gem:
        hitimes-1.2.2-x86-mingw32

timers-4.0.1 depends on hitimes (>= 0)
If you remove this gem, these dependencies will not be met.
Continue with Uninstall? [yN]  y
Successfully uninstalled hitimes-1.2.2-x86-mingw32

E:\GitWorkSpace\gaohaoyang.github.io>gem ins hitimes -v 1.2.1 --platform ruby
Fetching: hitimes-1.2.1.gem (100%)
Temporarily enhancing PATH to include DevKit...
Building native extensions.  This could take a while...
Successfully installed hitimes-1.2.1
Parsing documentation for hitimes-1.2.1
Installing ri documentation for hitimes-1.2.1
Done installing documentation for hitimes after 1 seconds
1 gem installed
```


關於，[hitimes](https://rubygems.org/gems/hitimes/versions/1.2.2) 是一個快速的高效的定時器解決方案庫，詳情可以去官網查看。
