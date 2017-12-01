---
layout: post
title:  JavaSctipt 判斷瀏覽器本及作業系統
date:   2017-11-30 00:00:00
categories: Code
tags: JavaSctipt Code 筆記
excerpt: 　　判斷瀏覽器和作業系統也是很常碰到的問題，以下的 Code 可以直接打包成 .js 檔做使用。
mathjax: true
author: Frank Sun 孫景承
---

* content
{:toc}

## 前言
　　判斷瀏覽器和作業系統也是很常碰到的問題，以下的 Code 可以直接打包成 .js 檔做使用。


### Code
```javascript
// see : http://www.quirksmode.org/js/detect.html
var BrowserDetect = {
  init: function() {
    "use strict";
    this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
    this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
    this.OS = this.searchString(this.dataOS) || "an unknown OS";
  },
  searchString: function(data) {
    "use strict";
    for (var i = 0; i < data.length; i++) {
      var dataString = data[i].string;
      var dataProp = data[i].prop;
      this.versionSearchString = data[i].versionSearch || data[i].identity;
      if (dataString) {
        if (dataString.indexOf(data[i].subString) !== -1) { return data[i].identity; }
      } else if (dataProp) { return data[i].identity; }
    }
  },
  searchVersion: function(dataString) {
    "use strict";
    var index = dataString.indexOf(this.versionSearchString);
    if (index === -1) { return; }
    return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
  },
  dataBrowser: [{
    string: navigator.userAgent,
    subString: "Chrome",
    identity: "Chrome"
  }, {
    string: navigator.userAgent,
    subString: "OmniWeb",
    versionSearch: "OmniWeb/",
    identity: "OmniWeb"
  }, {
    string: navigator.vendor,
    subString: "Apple",
    identity: "Safari",
    versionSearch: "Version"
  }, {
    prop: window.opera,
    identity: "Opera",
    versionSearch: "Version"
  }, {
    string: navigator.vendor,
    subString: "iCab",
    identity: "iCab"
  }, {
    string: navigator.vendor,
    subString: "KDE",
    identity: "Konqueror"
  }, {
    string: navigator.userAgent,
    subString: "Firefox",
    identity: "Firefox"
  }, {
    string: navigator.vendor,
    subString: "Camino",
    identity: "Camino"
  }, { // for newer Netscapes (6+)
    string: navigator.userAgent,
    subString: "Netscape",
    identity: "Netscape"
  }, {
    string: navigator.userAgent,
    subString: "MSIE",
    identity: "Explorer",
    versionSearch: "MSIE"
  }, {
    string: navigator.userAgent,
    subString: "Gecko",
    identity: "Mozilla",
    versionSearch: "rv"
  }, { // for older Netscapes (4-)
    string: navigator.userAgent,
    subString: "Mozilla",
    identity: "Netscape",
    versionSearch: "Mozilla"
  }],
  dataOS: [{
    string: navigator.platform,
    subString: "Win",
    identity: "Windows"
  }, {
    string: navigator.platform,
    subString: "Mac",
    identity: "Mac"
  }, {
    string: navigator.userAgent,
    subString: "iPhone",
    identity: "iPhone/iPod"
  }, {
    string: navigator.platform,
    subString: "Linux",
    identity: "Linux"
  }]
};

if (typeof BrowserDetect.browser === "undefined") {
  BrowserDetect.init();
}

function addHtmlClass (browserClass) {
  "use strict";

  var htmlElt = document.getElementsByTagName("html")[0];

  if (htmlElt.className.indexOf(browserClass) === -1 ) {
    htmlElt.className = htmlElt.className + " " + browserClass;
  }

} // END FUNC

addHtmlClass (BrowserDetect.browser);
// example
console.log(BrowserDetect.browser, BrowserDetect.version, BrowserDetect.OS);
```

## 補充
　　值得一提的是，Internet Explorer 11 在收到資訊的時候會被當成 Gecko 判定，版本號會是 rv:11.0 ，所以如果需要判斷是否為 Internet Explorer 11 而不需要去在意使用 Gecko 用戶的話，可以考慮將以下這段客製成針對 Internet Explorer 11 的判斷。

```javascript
{
  string: navigator.userAgent,
  subString: "Gecko",
  identity: "Mozilla",
  versionSearch: "rv"
}
```