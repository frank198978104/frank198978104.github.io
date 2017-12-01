---
layout: post
title:  Google Map 定位
date:   2017-12-02 00:00:00
categories: Code
tags: JavaSctipt Code GoogleMap 筆記
excerpt: 　　這個很單純就是可以利用 Google Map 去定位出你當前的位置，但前題是你的網站要是安全的瀏覽環境，所以你的協定必須為 <b>HTTPS</b>，如果迫切很需要可以到 SSL For Free 去申請免費憑證，一次可以使用 3 個月。
mathjax: true
author: Frank Sun 孫景承
---

* content
{:toc}

## 前言
　　這個很單純就是可以利用 Google Map 去定位出你當前的位置，但前題是你的網站要是安全的瀏覽環境，所以你的協定必須為 <span style="color:red;"><b>HTTPS</b></span>，如果迫切很需要可以到 **[SSL For Free](https://www.sslforfree.com/)** 去申請免費憑證，一次可以使用 3 個月。

### Code

#### HTML
```html
<p class="intro" id="msg">The HTML Geolocation API is used to locate a user's position.</p>
<button class="btn btn-primary" onclick="getLocation()">My Position</button>
<div id="mapholder"></div>
```

#### JavaScript
```javascript
<script src="https://maps.google.com/maps/api/js?key=#YOUR_API_KEY"></script>
<script>
var x=document.getElementById("msg");
function getLocation()
  {
  if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(showPosition,showError);
    }
  else{x.innerHTML="Geolocation is not supported by this browser.";}
  }

function showPosition(position)
  {
  var lat=position.coords.latitude;
  var lon=position.coords.longitude;
  var latlon=new google.maps.LatLng(lat, lon)
  var mapholder=document.getElementById('mapholder')
  mapholder.style.height='250px';
  mapholder.style.width='100%';

  var myOptions={
  center:latlon,zoom:14,
  mapTypeId:google.maps.MapTypeId.ROADMAP,
  mapTypeControl:false,
  navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
  };
  var map=new google.maps.Map(document.getElementById("mapholder"),myOptions);
  var marker=new google.maps.Marker({position:latlon,map:map,title:"You are here!"});
  }

function showError(error)
  {
  switch(error.code) 
    {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
    }
  }
</script>
```

## 補充
　　這個定位寫法是取得位置重新寫在地圖上，所以如果在 Chrome 或是 FireFox 上多請求幾次會看到地圖閃一下閃一下的，但是當 <span style="color:red;"><b>Windows 10 遇上了 Internet Explorer</b></span> 只要請求第二次定位他就會出現錯誤：**POSITION_UNAVAILABLE** ，目前原因不得而知，但重新整理就可以**「治標」**的解決問題了。

<br/>
判斷瀏覽器和作業系統的部分可以參考：**[JavaSctipt 判斷瀏覽器本及作業系統](/2017/12/01/browser-and-os-detect)**