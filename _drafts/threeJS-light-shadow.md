---
layout: post
title:  "three.js 中的光與影"
categories: JavaScript
tags:  threeJS webGL
---

* content
{:toc}

在了解了 three.js 中渲染器、場景、相機、幾何體等基本知識後，我們來研究一下 three.js 中的光與影。


本文是根據百度前端學院的任務安排進行探索和研究的。算是 [WebGL No. 2 - 光與影](http://ife.baidu.com/course/detail/id/28) 的學習筆記吧。

- 任務描述
  - 學習《Three.js 入門指南》第 8 章光與影；
    - 理解不同類型燈光的區別和適用場景；
    - 學會為場景添加合適的燈光；
    - 思考燈光的位置對哪些類型的燈光是無所謂的，以及為什麼；
    - 思考為什麼有些燈光無法形成陰影；
  - 在第 1 題場景的基礎上，增加光照效果；
    - 如果你沒做第 1 題，也可以隨便在場景中創建一些物體；
    - 為物體設置合適的材質（預習第 4 章），使得物體的亮度根據光照有所區別
  - 創建一個地板平面，並將小車投影到地板上
    - 嘗試並思考，一個物體（比如甜甜圈）如何將陰影投射到自身（Self-Shadow，自陰影）；
    - 實現軟陰影的效果（即陰影的邊緣有明暗的漸變）。

## 光

構造函數：

```js
Light(color, intensity)
```

- 顏色 color - (optional) hexadecimal color of the light. Default is 0xffffff (white).
- 強度 intensity - (optional) numeric value of the light's strength/intensity. Default is 1.

光的基類，被其他光類所繼承。

### 環境光

AmbientLight ['æmbɪənt] 平均照亮場景中的所有物體。

無方向，不產生影子。

```js
var light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);
```  

### 點光源

PointLight 從一個孤立的點向各個方向發射。沒有遮蓋的燈泡就是一個典型的例子。

可以產生影子。

```js
var light = new THREE.PointLight(0xff0000, 1, 100);
light.position.set(50, 50, 50);
scene.add(light);
```

### 平行光

DirectionalLight 有特定方向的光。光線平行，無限遠。用於模擬日光。太陽足夠遠，可以認為是無限遠的，並且發射的光線是平行的。

可以產生影子。[平行光的影子 DirectionalLightShadow](https://threejs.org/docs/index.html#Reference/Lights.Shadows/DirectionalLightShadow)。

```js
// White directional light at half intensity shining from the top.
var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);
```

- 屬性

  - `.position`

    This is set equal to Object3D.DefaultUp (0, 1, 0), so that the light shines from the top down.

    光線從平面 (0, 1, 0) 的法向射出。


### 聚光燈

SpotLight 光從孤立點射出，沿著一個椎體向遠處延伸。

可以產生影子。

```js
// white spotlight shining from the side, casting a shadow

var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(100, 1000, 100);

spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;

scene.add(spotLight);
```

### 半球光

HemisphereLight 光源位於場景上方，光線顏色從天空過度到地面。

不能產生影子。

```js
var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(light);
```

### 矩形光

RectAreaLight 從一個矩形面均勻發射的光。常被用於明亮的窗戶，

## 影子
