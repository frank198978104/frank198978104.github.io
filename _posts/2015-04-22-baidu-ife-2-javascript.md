---
layout: post
title:  "百度Web前端技術學院(2)-JavaScript 基礎"
date:   2015-04-22 19:06:05
categories: Front-end JavaScript
excerpt: 百度前端學院基礎課程 JavaScript 相關。
---

* content
{:toc}


## 任務

掌握JavaScript基礎知識，能夠使用JavaScript編寫一些複雜度不大的交互功能。

**任務：** [JavaScript基礎](https://github.com/Gaohaoyang/ife/tree/master/task/task0002)   

做完任務一的時候深深地感覺到自己的基礎非常的薄弱，在這裡再次感謝一下百度前端技術學院，做任務的時候深刻理解了自己平時掌握不牢固的內容，比如浮動、BFC、等高布局等。繼續加油吧！

-------

像上一篇文章一樣，寫些東西記錄一下。   

----

## 第一個頁面交互

按照任務中的代碼，在IE8下提示：`對象不支持“addEventListener”屬性或方法`    
我猜是IE8瀏覽器沒有這個方法吧。

參考資料：[JavaScript 指南-MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide)

### 了解JavaScript是什麼

[來自MDN的解釋](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/JavaScript_Overview#What_is_JavaScript.3F)

> JavaScript 是一種跨平台，面向對象的腳本語言。作為一種小巧且輕量級的語言，JavaScript 無意於獨立運行，而是被設計為可以輕易嵌入到其它的產品和應用中，比如 Web 瀏覽器。在宿主環境中，JavaScript 可以被連接到環境中的對象之上，以提供對其的編程控制。
>
> 核心的 JavaScript 中包含有一組核心的對象，包括 Array，Date 和 Math，以及一組核心的語言要素，包括操作符，控制結構和語句。出於多種目的，可以通過為其增補附加的對象，對核心 JavaScript 加以擴展；例如：
>
> * 客戶端 JavaScript 提供了用於控制瀏覽器（Navigator 或者其它瀏覽器）以及其中的文檔對象模型（DOM）的對象，從而擴展了核心 JavaScript。例如，客戶端擴展允許應用程序在 HTML 的表單中加入元素，以便響應用戶事件，比如鼠標點擊，表單輸入和頁面導航。
> * 服務器端 JavaScript 提供了服務於在服務器上運行 JavaScript 的對象，從而擴展了核心 JavaScript。例如，服務器端擴展可以允許應用程序訪問關係型數據庫，在應用程序的不同調用間提供信息的連續性，甚至於處理服務器之上的文件。
>
>借由 JavaScript 的 LiveConnect 功能，您可以讓 Java 和 JavaScript 間實現通訊。從 JavaScript 中，您可以創建 Java 對象並訪問它們的公共方法和域。從 Java 中，也可以訪問 JavaScript 的對象，屬性和方法。
>
>Netscape 發明了 JavaScript 並將 JavaScript 首先用於 Netscape 瀏覽器中。

---

### 如何在 HTML 頁面加載 JavaScript 代碼

使用 `<script>` 標籤在 HTML 文件中添加 JavaScript 代碼。

我們可以將 `JavaScript` 代碼放在 `html` 文件中任何位置，但是我們一般放在網頁的 `head` 或者 `body` 部分。

放在 `<head>` 部分    
最常用的方式是在頁面中head部分放置 `<script>` 元素，瀏覽器解析 `head` 部分就會執行這個代碼，然後才解析頁面的其餘部分。

放在 `<body>` 部分    
JavaScript 代碼在網頁讀取到該語句的時候就會執行。

**注意**: javascript 作為一種腳本語言可以放在 html 頁面中任何位置，但是瀏覽器解釋 html 時是按先後順序的，所以前面的 script 就先被執行。比如進行頁面顯示初始化的 js 必須放在 head 裡面，因為初始化都要求提前進行（如給頁面 body 設置 css 等）；而如果是通過事件調用執行的 function 那麼對位置沒什麼要求的。


---

### 為什麼把 `<script>` 放在 `</body>` 前

雖然理論上放在哪裡都是可以的，但是對於前端頁面優化來講，還是放在底部是最佳的，因為如果JS執行出現錯誤了，最起碼頁面中的元素還能加載出來，因為DOM文檔是從上往下的順序執行的。    如果你還不了解DOM的加載順序，請閱讀jQuery中ready與load事件的區別。

**下面是重點**

按照HTML5標準中的HTML語法規則，如果在 `</body>` 後再出現 `<script>` 或任何元素的開始標籤，都是parse error，瀏覽器會忽略之前的 `</body>` ，即視作仍舊在body內。所以實際效果和寫在 `</body>` 之前是沒有區別的。

總之，這種寫法雖然也能work，但是並沒有帶來任何額外好處，實際上出現這樣的寫法很可能是誤解了“將script放在頁面最末端”的教條。所以還是不要這樣寫為好。

* [script在body閉合標籤之後還是之前-知乎](http://www.zhihu.com/question/20027966)
* [body 和 html 標籤均沒有關閉](http://www.zhihu.com/question/19617126)

---

#### JavaScript 的性能優化：加載和執行

* 擴展閱讀：[JavaScript 的性能優化：加載和執行](http://www.ibm.com/developerworks/cn/web/1308_caiys_jsload/index.html)

**腳本位置**

由於腳本會阻塞頁面其他資源的下載，因此推薦將所有 `<script>` 標籤盡可能放到 `<body>` 標籤的底部，以盡量減少對整個頁面下載的影響。

**組織腳本**

由於每個 `<script>` 標籤初始下載時都會阻塞頁面渲染，所以減少頁麵包含的 `<script>` 標籤數量有助於改善這一情況。這不僅針對外鏈腳本，內嵌腳本的數量同樣也要限制。瀏覽器在解析 HTML 頁面的過程中每遇到一個 `<script>` 標籤，都會因執行腳本而導致一定的延時，因此最小化延遲時間將會明顯改善頁面的總體性能。

**無阻塞的腳本**

減少 JavaScript 文件大小並限制 HTTP 請求數在功能豐富的 Web 應用或大型網站上並不總是可行。Web 應用的功能越豐富，所需要的 JavaScript 代碼就越多，儘管下載單個較大的 JavaScript 文件只產生一次 HTTP 請求，卻會鎖死瀏覽器的一大段時間。為避免這種情況，需要通過一些特定的技術向頁面中逐步加載 JavaScript 文件，這樣做在某種程度上來說不會阻塞瀏覽器。


無阻塞腳本的秘訣在於，在頁面加載完成後才加載 JavaScript 代碼。這就意味著在 window 對象的 onload事件觸發後再下載腳本。有多種方式可以實現這一效果。

* 延遲加載腳本

HTML 4 為 `<script>` 標籤定義了一個擴展屬性：defer。Defer 屬性指明本元素所含的腳本不會修改 DOM，因此代碼能安全地延遲執行。

帶有 defer 屬性的 `<script>` 標籤可以放置在文檔的任何位置。對應的 JavaScript 文件將在頁面解析到 `<script>` 標籤時開始下載，但不會執行，直到 DOM 加載完成，即onload事件觸發前才會被執行。當一個帶有 defer 屬性的 JavaScript 文件下載時，它不會阻塞瀏覽器的其他進程，因此這類文件可以與其他資源文件一起並行下載。

對於如下代碼：

    <html>
    <head>
        <title>Script Defer Example</title>
    </head>
    <body>
        <script type="text/javascript" defer>
            alert("defer");
        </script>
        <script type="text/javascript">
            alert("script");
        </script>
        <script type="text/javascript">
            window.onload = function(){
                alert("load");
            };
        </script>
    </body>
    </html>

在支持 defer 屬性的瀏覽器上，彈出的順序則是："script"、"defer"、"load"。請注意，帶有 defer 屬性的 `<script>` 元素不是跟在第二個後面執行，而是在 onload 事件被觸發前被調用。

引用的資料可能寫的比較早，在 [CanIUse](http://caniuse.com/#search=defer) 上查了一下 defer 發現大部分瀏覽器都是支持的。如下圖：   
![defer的支持情況](http://7q5cdt.com1.z0.glb.clouddn.com/Baidu-Front-end-defer.jpg)

HTML 5 為 `<script>` 標籤定義了一個新的擴展屬性：async。它的作用和 defer 一樣，能夠異步地加載和執行腳本，不因為加載腳本而阻塞頁面的加載。但是有一點需要注意，在有 async 的情況下，JavaScript 腳本一旦下載好了就會執行，所以很有可能不是按照原本的順序來執行的。如果 JavaScript 腳本前後有依賴性，使用 async 就很有可能出現錯誤。

IE8,9不支持 `async`

* 動態腳本元素
* 使用 XMLHttpRequest(XHR)對象

----

**原文中的總結**

減少 JavaScript 對性能的影響有以下幾種方法：

* 將所有的 `<script>` 標籤放到頁面底部，也就是 `</body>` 閉合標籤之前，這能確保在腳本執行前頁面已經完成了渲染。
* 盡可能地合併腳本。頁面中的 `<script>` 標籤越少，加載也就越快，響應也越迅速。無論是外鏈腳本還是內嵌腳本都是如此。
* 採用無阻塞下載 JavaScript 腳本的方法：
    * 使用 `<script>` 標籤的 defer 屬性（僅適用於 IE 和 Firefox 3.5 以上版本）；
    * 使用動態創建的 `<script>` 元素來下載並執行代碼；
    * 使用 XHR 對象下載 JavaScript 代碼並注入頁面中。

通過以上策略，可以在很大程度上提高那些需要使用大量 JavaScript 的 Web 網站和應用的實際性能。

---

## JavaScript數據類型及語言基礎

### 數據類型概要

最新的 ECMAScript 標準定義了 7 種數據類型:

* 6 種 原始類型:
    * Boolean
    * Null
    * Undefined
    * Number
    * String
    * Symbol (new in ECMAScript 6)
* 和 Object

---

### 一些要點

* 一個沒有被賦值的變量會有個默認值 undefined
* null 與 undefined 的不同點：

        typeof null        // object (bug in ECMAScript, should be null)
        typeof undefined   // undefined
        null === undefined // false
        null == undefined // true

    typeof null 返回 object
* Number 數字類型，它並沒有為整數給出一種特定的類型。除了能夠表示浮點數外，還有一些帶符號的值：+Infinity，-Infinity 和 NaN (非數值，Not-a-Number)。
* NaN與任何值都不相等，包括自身。應當使用 `x != x` 來判斷，當且僅當 x 為 NaN 的時候，表達式的結果才為 `true`。相似的函數有 `isNaN()`, `isFinite()`。
* 數組直接量的語法允許有可選的結尾逗號，故 `[,,]` 只有兩個元素而非三個。

---

### 實踐判斷各種數據類型的方法

    // 判斷arr是否為一個數組，返回一個bool值
    function isArray(arr) {
        return typeof arr === "object" && Object.prototype.toString.call(arr) === "[object Array]";
    }

    // 判斷fn是否為一個函數，返回一個bool值
    function isFunction(fn) {
        return typeof fn === "function";
    }

#### 數組類型

在 ECMAScript5 中，可以直接使用 `Array.isArray()` 來判斷數組。

    Array.isArray([]);  //true
    Array.isArray({});  //false

我看《JavaScript權威指南上》沒有推薦使用 `instanceof`，因為可能會有多窗體(frame)存在。

> 這樣每一個窗口都有一個自己的 JavaScript 環境，有自己的全局對象。並且每個全局對象都有自己的一組構造函數。因此一個窗體中的對象不可能是另外窗體中的構造函數的實例。

所以採用了上述我寫的那樣的代碼

---

### 值類型和引用類型的區別

聲明一個值類型變量，編譯器會在棧上分配一個空間，這個空間對應著該值類型變量，空間裡存儲的就是該變量的值。引用類型的實例分配在堆上，新建一個引用類型實例，得到的變量值對應的是該實例的內存分配地址，這就像您的銀行賬號一樣。

JavaScript中原始值包括：undefined，null，布爾值，數字和字符串。引用類型主要指對象（包括數組和函數）。

>* 原始值是不可更改的。對象的值是可修改的。
>* 原始值的比較是值的比較。對象的比較並非值的比較。對象的值都是引用，對象的比較均是引用的比較，當且僅當他們都引用同一個基對象時，他們才相等。

---

### 對象的讀取、遍歷方式

參考：[JavaScript 指南-使用對象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Working_with_Objects)

* 對象

在javascript中，一個對象可以是一個單獨的擁有屬性和類型的實體。我們拿它和一個杯子做下類比。一個杯子是一個對象(物體)，擁有屬性。杯子有顏色，圖案，重量，由什麼材質構成等等。同樣，javascript對象也有屬性來定義它的特徵。

* 屬性

一個 javascript 對象有很多屬性。一個對象的屬性可以被解釋成一個附加到對象上的變量。對象的屬性和普通的 javascript 變量基本沒什麼區別，僅僅是屬性屬於某個對象。屬性定義了對象的特徵(譯注：動態語言面向對象的鴨子類型)。你可以通過點符號來訪問一個對象的屬性。JavaScript 對象的屬性也可以通過方括號訪問。

* 枚舉

你可以在 `for...in` 語句中使用方括號標記以枚舉一個對象的所有屬性。為了展示它如何工作，下面的函數當你將對象及其名稱作為參數傳入時，顯示對象的屬性：

    function showProps(obj, objName) {
      var result = "";
      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            result += objName + "." + i + " = " + obj[i] + "\n";
        }
      }
      return result;
    }

    var srcObj = {
        a: 1,
        b: {
            b1: ["hello", "hi"],
            b2: "JavaScript"
        }
    };

    console.log(showProps(srcObj,'srcObj'));

console:

    srcObj.a = 2
    srcObj.b = [object Object]

這裡使用 `hasOwnProperty()` 是為了確保是自己的屬性而非繼承的屬性。

可以如下寫，跳過這個對象的方法：

    function showPropsWithoutFun(obj, objName) {
        var result = "";
        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) {       //跳過繼承屬性
                continue;
            }
            if (typeof obj[i] === "function") { //跳過這個對象的方法
                continue;
            }
            result += objName + "." + i + "=" + obj[i] + "\n";
        }
        return result;
    }

相關的方法還有：`Object.keys()`, `Object.getOwnPropertyNames()`

`Object.keys()` 方法會返回一個由給定對象的所有可枚舉自身屬性的屬性名組成的數組，數組中屬性名的排列順序和使用for-in循環遍歷該對象時返回的順序一致（兩者的主要區別是 for-in 還會遍歷出一個對象從其原型鏈上繼承到的可枚舉屬性）。

`Object.getOwnPropertyNames()` 方法返回一個由指定對象的所有自身屬性的屬性名（包括不可枚舉屬性）組成的數組。

* 創建對象

創建對象的方式有三種：使用對象初始化器，使用構造函數，使用 `Object.create()` 方法。

`Object.create()` 方法創建一個擁有指定原型和若干個指定屬性的對象。

* 繼承

所有的 JavaScript 對象繼承於至少一個對象。被繼承的對象被稱作原型，並且繼承的屬性可能通過構造函數的 prototype 對象找到。

* 定義方法

一個方法 是關聯到某個對象的函數，或者簡單地說，一個方法是一個值為某個函數的對象屬性。定義方法就象定義普通的函數，除了它們必須被賦給對象的某個屬性。例如：

    objectName.methodname = function_name;

    var myObj = {
      myMethod: function(params) {
        // ...do something
      }
    };

---

#### 深度克隆

了解值類型和引用類型的區別，了解各種對象的讀取、遍歷方式，並在util.js中實現以下方法：

    // 使用遞歸來實現一個深度克隆，可以複製一個目標對象，返回一個完整拷貝
    // 被複製的對象類型會被限制為數字、字符串、布爾、日期、數組、Object對象。不會包含函數、正則對象等
    function cloneObject(src) {
        // your implement
    }

    // 測試用例：
    var srcObj = {
        a: 1,
        b: {
            b1: ["hello", "hi"],
            b2: "JavaScript"
        }
    };
    var abObj = srcObj;
    var tarObj = cloneObject(srcObj);

    srcObj.a = 2;
    srcObj.b.b1[0] = "Hello";

    console.log(abObj.a);
    console.log(abObj.b.b1[0]);

    console.log(tarObj.a);      // 1
    console.log(tarObj.b.b1[0]);    // "hello"

**參考：**

* [白話簡單克隆和深度克隆](http://blog.csdn.net/java2000_net/article/details/3014934) 介紹什麼是深度克隆，用羊圈和羊的圖，簡單深刻。
* [javascript克隆對象深度介紹](http://www.jb51.net/article/32015.htm) 這個代碼寫的太妙了，可惜找不到源地址了，都是轉載來轉載去的，要是你知道源地址，請留言告訴我。

淺度克隆：基本類型為值傳遞，對象仍為引用傳遞。 

深度克隆：所有元素或屬性均完全克隆，並於原引用類型完全獨立，即，在後面修改對象的屬性的時候，原對象不會被修改。 

**思路：**深度克隆複製目標對象，那麼就需要枚舉這個對象。

1. 判斷當前屬性是否是引用類型，如果是數組或者對象，創建響應類型變量。
2. 枚舉對象內所有屬性。
3. 使用 `hasOwnProperty()` 方法，排除繼承的屬性。
4. 給新的對象相應位置賦值，若當前屬性為引用類型（數組或對象）遞歸本方法。直到內部的值類型。
5. 返回新的對象。

**我的代碼實現：**   

    function cloneObject(src) {
        // your implement
        var o; //result
        if (Object.prototype.toString.call(src) === "[object Array]") {
            o = []; //判斷是否是數組，並賦初始值
        } else {
            o = {};
        }
        for (var i in src) { //遍歷這個對象
            if (src.hasOwnProperty(i)) { //排出繼承屬性
                if (typeof src[i] === "object") {
                    o[i] = cloneObject(src[i]); //遞歸賦值
                } else {
                    o[i] = src[i]; //直接賦值
                }
            }
        }
        return o;
    }

---

### 對數組進行去重

**參考：**

* [MDN Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [JavaScript Array 對象 w3school](http://www.w3school.com.cn/jsref/jsref_obj_array.asp)

**要求：**

    // 對數組進行去重操作，只考慮數組中元素為數字或字符串，返回一個去重後的數組
    function uniqArray(arr) {
        // your implement
    }

    // 使用示例
    var a = [1, 3, 5, 7, 5, 3];
    var b = uniqArray(a);
    console.log(b); // [1, 3, 5, 7]

**思路：**

1. 新建一個空數組
2. 遍歷原數組
3. 若新數組中不存在當前元素，將其 `push` 入新數組中
4. 返回新數組

**實現：**

    // 對數組進行去重操作，只考慮數組中元素為數字或字符串，返回一個去重後的數組
    function uniqArray(arr) {
        var newArr = [];    //創建空數組
        for (var i in arr) {    //遍歷舊數組
            if (newArr.indexOf(arr[i]) == -1) {//如果新數組中不存在當前元素
                newArr.push(arr[i]);//新數組中加入當前元素
            }
        }
        return newArr;
    }

**相關方法與知識點：**

#### Array 對象

* Array 對象屬性

屬性  | 描述
---|---
constructor | 返回對創建此對象的數組函數的引用。
length  | 設置或返回數組中元素的數目。
prototype  |  使您有能力向對象添加屬性和方法。

* Mutator 方法，這些方法可以改變數組自身

方法 | 描述
-------------|-----------
pop | 移除數組的最後一個元素，返回值是被刪除的元素。
push | 在數組的末尾添加一個或者多個元素，返回值是新的數組的長度。
reverse | 顛倒數組中元素的順序，原先第一個元素現在變成最後一個，同樣原先的最後一個元素變成了現在的第一個，也就是數組的索引發生了變化。
shift | 刪除數組的第一個元素，返回值是刪除的元素。
sort | 對數組中的元素進行排序。
splice | 添加或刪除數組中的一個或多個元素。
unshift | 添加一個或者多個元素在數組的開頭，返回值是新的數組的長度。

* Accessor 方法，這些過程不改變數組自身 These methods do not modify the array and return some representation of the array.

方法|描述
----|--------
concat | 返回一個包含此數組和其他數組和/或值的結合的新數組
indexOf | 返回第一個與給定參數相等的數組元素的索引，沒有找到則返回-1。
join | 將所有的數組元素連接成一個字符串。
lastIndexOf | 返回在數組中搜索到的與給定參數相等的元素的最後（最大）索引。
slice | 返回數組中的一段。
toSource | Returns an array literal representing the specified array; you can use this value to create a new array. Overrides the Object.toSource method.
toString | 返回代表該數組及其元素的字符,重寫Object.toString 過程.
valueOf | Returns the primitive value of the array. Overrides the Object.valueOf method.

* 循環（迭代）過程

方法 | 描述
---|----
filter | 對數組中的每一個元素調用參數中指定的過濾函數，並將對於過濾函數返回值為true的那些數組元素集合為新的數組返回。
forEach | 對數組的每一個元素依次調用參數中指定的函數。
every | 如果數組中每一個元素都滿足參數中提供的測試函數，則返回真。
map | Creates a new array with the results of calling a provided function on every element in this array.
some | 如果數組中至少有一個元素滿足參數函數的測試，則返回true。

---

### 實現 `trim()`

**參考：**

* [String MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)
* [JavaScript String 對象 W3school](http://www.w3school.com.cn/jsref/jsref_obj_string.asp)

**要求：**

    // 中級班同學跳過此題
    // 實現一個簡單的trim函數，用於去除一個字符串，頭部和尾部的空白字符
    // 假定空白字符只有半角空格、Tab
    // 練習通過循環，以及字符串的一些基本方法，分別掃描字符串str頭部和尾部是否有連續的空白字符，並且刪掉他們，最後返回一個完成去除的字符串
    function simpleTrim(str) {
        // your implement
    }

    // 很多同學肯定對於上面的代碼看不下去，接下來，我們真正實現一個trim
    // 對字符串頭尾進行空格字符的去除、包括全角半角空格、Tab等，返回一個字符串
    // 嘗試使用一行簡潔的正則表達式完成該題目
    function trim(str) {
        // your implement
    }

    // 使用示例
    var str = '   hi!  ';
    str = trim(str);
    console.log(str); // 'hi!'

**思路：**

對於 `simpleTrim()` 做兩次循環，從前面開始和從後面開始。遇到空格和Tab跳出，最後用 `slice()` 取出子字符串。

對於 `trim()` 使用正則表達式。

**實現：**

    function simpleTrim(str) {
        var i;
        var j;
        for (i = 0; i < str.length; i++) { //從頭遍歷字符串
            if (str.charAt(i) != " " && str.charAt(i) != "\t") { //當不為空的時候
                break; //跳出循環
            }
        }
        for (j = str.length - 1; j >= 0; j--) {
            if (str.charAt(j) != " " && str.charAt(j) != "\t") { //當不為空的時候
                break; //跳出循環
            }
        }
        return str.slice(i, j + 1); //返回子字符串
    }

    function trim(str) {
        return str.replace(/^\s+|\s+$/g, '');
    }

關於正則表達式：

#### 正則表達式

上面的思路是匹配開頭和結尾的空白字符，並全局匹配。

* `^`：匹配字符串的開頭，在多行檢索中，匹配一行的開頭。
* `$`：匹配字符串的結尾，在多行檢索中，匹配一行的結尾。
* `|`：選擇，匹配的是該符號左邊的子表達式或右邊的子表達式。
* `\s`：任何 Unicode 空白符。
* `g`：執行一個全局匹配，簡言之，即找到所有匹配，而不是找到第一個之後就停止。

以上來自 JavaScript權威指南（犀牛書），感覺這裡面將的正則表達式還不錯。

**相關方法和知識點：**

#### String對象

* String 對象屬性

屬性 | 描述
----|----
constructor | 對創建該對象的函數的引用
length | 字符串的長度
prototype  | 允許您向對象添加屬性和方法

* String 對象方法

方法 | 描述
-----|---
charAt()  |  返回在指定位置的字符。
charCodeAt()  |  返回在指定的位置的字符的 Unicode 編碼。
concat()  |  連接字符串。
indexOf() |  檢索字符串。
lastIndexOf()  | 從後向前搜索字符串。
localeCompare() | 用本地特定的順序來比較兩個字符串。
match()| 找到一個或多個正則表達式的匹配。
replace() |  替換與正則表達式匹配的子串。
search()  |  檢索與正則表達式相匹配的值。
slice()| 提取字符串的片斷，並在新的字符串中返回被提取的部分。
split()| 把字符串分割為字符串數組。
substr()  |  從起始索引號提取字符串中指定數目的字符。
substring() |提取字符串中兩個指定的索引號之間的字符。
toLowerCase() |  把字符串轉換為小寫。
toUpperCase()  | 把字符串轉換為大寫。
toString() | 返回字符串。
valueOf()  | 返回某個字符串對象的原始值。

* 靜態方法

`String.fromCharCode()` 使用作為參數傳入的字符編碼創建一個新的字符串。

* HTML方法

由於不是標準方法，這裡就不列舉了。

---

### 遍歷數組，使每一個元素執行 `fn` 函數

**要求：**

    // 實現一個遍歷數組的方法，針對數組中每一個元素執行fn函數，並將數組索引和元素作為參數傳遞
    function each(arr, fn) {
        // your implement
    }

    // 其中fn函數可以接受兩個參數：item和index

    // 使用示例
    var arr = ['java', 'c', 'php', 'html'];
    function output(item) {
        console.log(item)
    }
    each(arr, output);  // java, c, php, html

    // 使用示例
    var arr = ['java', 'c', 'php', 'html'];
    function output(item, index) {
        console.log(index + ': ' + item)
    }
    each(arr, output);  // 0:java, 1:c, 2:php, 3:html

**分析：**

這個任務有點像 `ECMAScript5` 中新增的數組方法：`forEach()`。還有一點這裡的參數 index 是可選形參，保證第一個參數 item 能正常傳入就行了，代碼非常簡單，如下：

**實現：**

    function each(arr, fn) {
        for(var i in arr){
            fn(arr[i],i);
        }
    }

---

### 獲取對象中第一層元素個數

**要求：**

    // 獲取一個對象裡面第一層元素的數量，返回一個整數
    function getObjectLength(obj) {}

    // 使用示例
    var obj = {
        a: 1,
        b: 2,
        c: {
            c1: 3,
            c2: 4
        }
    };
    console.log(getObjectLength(obj)); // 3

**實現：**

    function getObjectLength(obj) {
        return Object.keys(obj).length;
    }

這個自己寫的比較簡單，不知道可以這樣寫不。其中 `Object.keys(o)` 為 Object 的一個靜態方法，參數是一個對象，返回一個包含o的所有可枚舉自有（非繼承）屬性名字的數組。

---

### 正則表達式

**要求：**

    // 判斷是否為郵箱地址
    function isEmail(emailStr) {
        // your implement
    }

    // 判斷是否為手機號
    function isMobilePhone(phone) {
        // your implement
    }

**分析：**

郵箱由（數字字母，點），數字字母組合，@符號，數字字母，（點，數字字母）。其中兩個小括號都是任意個數的。並且開頭和結尾都是字母。

手機號是11位組成的，有時候會在前面加國際區號的前綴，如中國：+86。查閱相關資料後發現區號最多4位。[國際電話區號_百度百科](http://baike.baidu.com/link?url=2nwM_XyoKXLNPxk0-uDwGT4SxIFncXy7dqB3VbsH3tSaueYRri3CYOWWF9qb84zUqeKkq9uTF2YfetoiyJVm7_)

並且手機號最多就是11位，其他國家有用8位的，也有用7位，10位的都有。最短是7位，最長是11位。

**實現：**

    // 判斷是否為郵箱地址
    function isEmail(emailStr) {
        var pattern = /^(\w+\.)*\w+@\w+(\.\w+)+$/;
        return pattern.test(emailStr);
    }

    // 判斷是否為手機號
    function isMobilePhone(phone) {
        var pattern = /^(\+\d{1,4})?\d{7,11}$/;
        return pattern.test(phone);
    }

**相關方法和知識點：**

* 參考：[RegExp MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp#Special_characters_in_regular_expressions)
* 正則表達式修飾符：

字符 | 含義
---|---
g | 全局匹配
i | 忽略大小寫
m | 讓開始和結束字符（^ 和 $）工作在多行模式（也就是，^ 和 $ 可以匹配字符串中每一行的開始和結束（行是由 \n 或 \r 分割的），而不只是整個輸入字符串的最開始和最末尾處。

* 字符類別

字符 |  含義
---|---
[...]|方括號內的任意字符
[^...]|不在方括號內的任意字符
. | （點號，小數點）匹配任意單個字符，但是換行符除外，包括：\n \r \u2028 或 \u2029。<br><br>需要注意的是，m 多行（multiline）標誌不會改變點號的表現。因此為了匹配多行中的字符集，可使用[^] （當然你不是打算用在舊版本 IE 中），它將會匹配任意字符，包括換行符<br><br>例如，/.y/ 匹配 "yes make my day" 中的 "my" 和 "ay"，但是不匹配 "yes"。
\d | 匹配基本拉丁字母表（basic Latin alphabet）中的一個數字字符。等價於[0-9]。<br><br>例如，/\d/ 或 /[0-9]/ 匹配 "B2 is the suite number." 中的 '2'。 
\D | 匹配任意一個不是基本拉丁字母表中數字的字符。等價於[^0-9]。<br><br>例如，/\D/ 或 /[^0-9]/ 匹配 "B2 is the suite number." 中的 'B'。
\w | 匹配任意來自基本拉丁字母表中的字母數字字符，還包括下劃線。等價於 [A-Za-z0-9_]。<br><br>例如，/\w/ 匹配 "apple" 中的 'a'，"$5.28" 中的 '5' 和 "3D" 中的 '3'。
\W | 匹配任意不是基本拉丁字母表中單詞（字母數字下劃線）字符的字符。等價於 [^A-Za-z0-9_]。<br><br>例如，/\W/ 或 /[^A-Za-z0-9_]/ 匹配 "50%" 中的 '%'。
\s | 匹配一個空白符，包括空格、制表符、換頁符、換行符和其他 Unicode 空格。<br><br>等價於 [ \f\n\r\t\v​\u00a0\u1680​\u180e\u2000​\u2001\u2002​\u2003\u2004​ \u2005\u2006​\u2007\u2008​\u2009\u200a​\u2028\u2029​​\u202f\u205f​ \u3000]。<br><br>例如 /\s\w*/ 匹配 "foo bar" 中的 ' bar'。
\S | 匹配一個非空白符。等價於 [^ \f\n\r\t\v​\u00a0\u1680​\u180e\u2000​\u2001\u2002​\u2003\u2004​ \u2005\u2006​\u2007\u2008​\u2009\u200a​\u2028\u2029​\u202f\u205f​\u3000]。<br><br>例如，/\S\w*/ 匹配 "foo bar" 中的 'foo'。
[\b] | 匹配一個退格符（backspace）（不要與 \b 混淆）

* 直接量字符

字符| 匹配
---|---
數字和字母字符|自身
\t | 匹配一個水平制表符（tab）
\r | 匹配一個迴車符（carriage return）
\n | 匹配一個換行符（linefeed）
\v | 匹配一個垂直制表符（vertical tab）
\f | 匹配一個換頁符（form-feed）
\0 | 匹配一個 NUL 字符。不要在此後面跟小數點。
\cX |X 是 A - Z 的一個字母。匹配字符串中的一個控制字符。<br><br>例如，/\cM/ 匹配字符串中的 control-M。
\xhh  |  匹配編碼為 hh （兩個十六進制數字）的字符。
\uhhhh | 匹配 Unicode 值為 hhhh （四個十六進制數字）的字符。

* 邊界

字符|  含義
---|---
^  |匹配輸入/字符串的開始。如果多行（multiline）標誌被設為 true，該字符也會匹配一個斷行（line break）符後的開始處。<br><br>例如，/^A/ 不匹配 "an A" 中的 "A"，但匹配 "An A" 中的 "A"。
$   |匹配輸入/字符串的結尾。如果多行（multiline）標誌被設為 true，該字符也會匹配一個斷行（line break）符的前的結尾處。<br><br>例如，/t$/ 不匹配 "eater" 中的 "t"，但匹配 "eat" 中的 "t"。
\b  |匹配一個零寬單詞邊界（zero-width word boundary），如一個字母與一個空格之間。 （不要和 [\b] 混淆）<br><br>例如，/\bno/ 匹配 "at noon" 中的 "no"，/ly\b/ 匹配 "possibly yesterday." 中的 "ly"。
\B  |匹配一個零寬非單詞邊界（zero-width non-word boundary），如兩個字母之間或兩個空格之間。<br><br>例如，/\Bon/ 匹配 "at noon" 中的 "on"，/ye\B/ 匹配 "possibly yesterday." 中的 "ye"。

---

## DOM

參考：

* [HTML DOM 教程 W3C](http://www.w3school.com.cn/htmldom/index.asp)
* [JavaScript HTML DOM W3C](http://www.w3school.com.cn/js/js_htmldom.asp)
* [參考手冊-HTML DOM Document 對象](http://www.w3school.com.cn/jsref/dom_obj_document.asp)
* [參考手冊-HTML DOM Element 對象](http://www.w3school.com.cn/jsref/dom_obj_all.asp)

---

### 基本任務

**任務：**

先來一些簡單的，在你的util.js中完成以下任務：

    // 為element增加一個樣式名為newClassName的新樣式
    function addClass(element, newClassName) {
        // your implement
    }

    // 移除element中的樣式oldClassName
    function removeClass(element, oldClassName) {
        // your implement
    }

    // 判斷siblingNode和element是否為同一個父元素下的同一級的元素，返回bool值
    function isSiblingNode(element, siblingNode) {
        // your implement
    }

    // 獲取element相對於瀏覽器窗口的位置，返回一個對象{x, y}
    function getPosition(element) {
        // your implement
    }

**思路：**

* `addClass()`

    對於element本身如果沒有樣式類，那麼使用Element的className屬性獲取的是空字符串，則直接添加新的樣式類字符串即可。對於已經有了樣式類的元素，獲取到原有的樣式類後，在後面添加一個空格，再添加新的樣式類即可。

* `removeClass()`

    獲取原始的樣式，然後用正則表達式去匹配這個要刪掉的樣式，由於是動態的正則表達式，所以要用正則的構造函數 `RegExp()` 來創建，並且使用 `\b` 來確定單詞邊界。匹配好後用空字符串替換被匹配的樣式類即可。

* `isSiblingNode()`

    直接判斷兩個父節點是不是相同

* `getPosition()`

    下面這些內容是我之前的思路，現在覺得太複雜，可以用另一種解決方法。

    > `offsetTop`, `offsetLeft` 都是相對於最近一個有定位的父元素，如果都沒有那麼就是相對於 body 的偏移位置。
    >
    > `offsetParent` 是尋找最近一個有定位的父級元素，如果沒有，那麼找到 body 元素。
    >
    > 所以這道題需要先尋找有定位的父級元素，如果都沒有，那麼就是相對於 body 的偏移了，可以直接使用 `offsetTop`, `offsetLeft`。
    > 
    > 如果有定位的父級元素不是 body，是 A 元素，那麼再尋找 A 元素的最近的有定位的父級元素，如果沒有，就是相對於 body 的定位，這時，所求偏移量就是 A 的偏移量加所求元素相對於 A 的偏移量。如果 A 還有已經定位的父級元素，就繼續去推，直到找到 body 為止。
    >
    > 這裡可能要用到一個遞歸算法。

    **另一種方法：**

    使用 `getBoundingClientRect()` 方法獲取當前元素相對於可視區域的位置，再加上滾動條的位置。

    關於滾動條的位置 `scrollTop`, `scrollLeft` 這兩個屬性的使用，各個瀏覽器還都不一樣。

    * 詳情見 [document.body.scrollTop or document.documentElement.scrollTop](http://www.cnblogs.com/zhenyu-whu/archive/2012/11/13/2768004.html)。

    簡單的說就是：FF、Opera 和 IE 瀏覽器認為在客戶端瀏覽器展示的頁面的內容對應於整個 HTML，所以使用 `document.documentElement`來代表，相應的滾動距離則通過 `document.documentElement.scrollLeft` 和 `document.documentElement.scrollTop` 來獲取，而 Safari 和 Chrome 瀏覽器則認為頁面開始於 body 部分，從而相應的滾動距離用 `document.body.scrollLeft` 和 `document.body.scrollTop` 來獲取。另外需要注意的是，FF 和 IE 的 quirks mode（兼容模式）下是用 `document.body` 來獲取的。

    documentElement 對應的是 html 標籤，而 body 對應的是 body 標籤

    針對跨瀏覽器的解決方案則可簡單的用如下代碼獲取：

        var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft); 
        var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop); 

**實現：**

    // 為element增加一個樣式名為newClassName的新樣式
    function addClass(element, newClassName) {
        var oldClassName = element.className; //獲取舊的樣式類
        element.className = oldClassName === "" ? newClassName : oldClassName + " " + newClassName;
    }

    // 移除element中的樣式oldClassName
    function removeClass(element, oldClassName) {
        var originClassName = element.className; //獲取原先的樣式類
        var pattern = new RegExp("\\b" + oldClassName + "\\b"); //使用構造函數構造動態的正則表達式
        element.className = originClassName.replace(pattern, '');
    }

    function isSiblingNode(element, siblingNode) {
        return element.parentNode === siblingNode.parentNode;
    }

    function getPosition(element) {
        var pos={};
        pos.x = element.getBoundingClientRect().left + Math.max(document.documentElement.scrollLeft, document.body.scrollLeft); 
        pos.y = element.getBoundingClientRect().top + Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        return pos;
    }

---

### mini $

**任務：**

接下來挑戰一個mini $，它和之前的$是不兼容的，它應該是document.querySelector的功能子集，在不直接使用document.querySelector的情況下，在你的util.js中完成以下任務：

    // 實現一個簡單的Query
    function $(selector) {

    }

    // 可以通過id獲取DOM對象，通過#標示，例如
    $("#adom"); // 返回id為adom的DOM對象

    // 可以通過tagName獲取DOM對象，例如
    $("a"); // 返回第一個<a>對象

    // 可以通過樣式名稱獲取DOM對象，例如
    $(".classa"); // 返回第一個樣式定義包含classa的對象

    // 可以通過attribute匹配獲取DOM對象，例如
    $("[data-log]"); // 返回第一個包含屬性data-log的對象

    $("[data-time=2015]"); // 返回第一個包含屬性data-time且值為2015的對象

    // 可以通過簡單的組合提高查詢便利性，例如
    $("#adom .classa"); // 返回id為adom的DOM所包含的所有子節點中，第一個樣式定義包含classa的對象

**參考：**

* [Sizzle選擇器](http://www.imooc.com/code/4477)
* [Sizzle引擎--原理與實踐（一）](http://www.cnblogs.com/xesam/archive/2012/02/15/2352466.html)
* [Sizzle是怎樣工作的](http://www.cnblogs.com/rubylouvre/archive/2011/01/24/1942818.html)

**思路：**

1. 通過空格拆分參數 selector，因為可能是組合查詢。拆分為數組 selectorArr
2. 遍歷 selectorArr，條件判斷各種情況。
3. 得到節點的 Element 對象後，以這個對象為父節點，繼續下一層的判斷。

**實現：**

    //多個選擇器有點難到我了，看了一些資料覺得思路應該如下：
    //1.如果存在#，直接從#開始向後查
    //2.如果存在tag直接找到所有的tag然後向後查
    //3.樣式類，屬性，從後向前查，得到它所有的父節點名稱，去篩選匹配
    //以上的做法有點太複雜，我還是做一個簡單的正向匹配吧。
    function $(selector) {

        if (!selector) {
            return null;
        }

        if (selector == document) {
            return document;
        }

        selector = selector.trim();
        if (selector.indexOf(" ") !== -1) { //若存在空格
            var selectorArr = selector.split(/\s+/); //拆成數組

            var rootScope = myQuery(selectorArr[0]); //第一次的查找範圍
            var i = null;
            var j = null;
            var result = [];
            //循環選擇器中的每一個元素
            for (i = 1; i < selectorArr.length; i++) {
                for (j = 0; j < rootScope.length; j++) {
                    result.push(myQuery(selectorArr[i], rootScope[j]));
                }
                // rootScope = result;
                // 目前這個方法還有bug
            }
            return result[0][0];
        } else { //只有一個，直接查詢
            return myQuery(selector, document)[0];
        }
    }

    /**
     * 針對一個內容查找結果 success
     * @param  {String} selector 選擇器內容
     * @param  {Element} root    根節點元素
     * @return {NodeList數組}    節點列表，可能是多個節點也可能是一個
     */
    function myQuery(selector, root) {
        var signal = selector[0]; //
        var allChildren = null;
        var content = selector.substr(1);
        var currAttr = null;
        var result = [];
        root = root || document; //若沒有給root，賦值document
        switch (signal) {
            case "#":
                result.push(document.getElementById(content));
                break;
            case ".":
                allChildren = root.getElementsByTagName("*");
                // var pattern0 = new RegExp("\\b" + content + "\\b");
                for (i = 0; i < allChildren.length; i++) {
                    currAttr = allChildren[i].getAttribute("class");
                    if (currAttr !== null) {
                        var currAttrsArr = currAttr.split(/\s+/);
                        console.log(currAttr);
                        for (j = 0; j < currAttrsArr.length; j++) {
                            if (content === currAttrsArr[j]) {
                                result.push(allChildren[i]);
                                console.log(result);
                            }
                        }
                    }
                }
                break;
            case "[": //屬性選擇
                if (content.search("=") == -1) { //只有屬性，沒有值
                    allChildren = root.getElementsByTagName("*");
                    for (i = 0; i < allChildren.length; i++) {
                        if (allChildren[i].getAttribute(selector.slice(1, -1)) !== null) {
                            result.push(allChildren[i]);
                        }
                    }
                } else { //既有屬性，又有值
                    allChildren = root.getElementsByTagName("*");
                    var pattern = /\[(\w+)\s*\=\s*(\w+)\]/; //為了分離等號前後的內容
                    var cut = selector.match(pattern); //分離後的結果，為數組
                    var key = cut[1]; //鍵
                    var value = cut[2]; //值
                    for (i = 0; i < allChildren.length; i++) {
                        if (allChildren[i].getAttribute(key) == value) {
                            result.push(allChildren[i]);
                        }
                    }
                }
                break;
            default: //tag
                result = root.getElementsByTagName(selector);
                break;
        }
        return result;
    }

---

## 事件

### 綁定註冊事件與移除事件

**任務與實現：**

    // 給一個element綁定一個針對event事件的響應，響應函數為listener
    function addEvent(element, event, listener) {
        if (element.addEventListener) {
            element.addEventListener(event,listener);
        } else if(element.attachEvent){
            element.attachEvent("on"+event,listener);
        }
    }

    // 移除element對象對於event事件發生時執行listener的響應
    function removeEvent(element, event, listener) {
        if (element.removeEventListenr) {
            element.removeEventListenr(event,listener);
        } else if(element.detachEvent){
            element.detachEvent("on"+event,listener);
        }
    }

**相關說明：**

IE8+ 支持 `addEventListener()`。IE8 以下的版本使用 `attachEvent()`。

* `attachEvent()` 不支持時間捕獲。
* `attachEvent()` 第一個參數事件處理程序屬性名使用前綴 on。
* `attachEvent()` 允許相同的事件處理程序函數註冊多次。

---

### click 與 enter 鍵事件綁定

**任務與實現：**

    // 實現對click事件的綁定
    function addClickEvent(element, listener) {
        addEvent(element, "click", listener);
    }

    // 實現對於按Enter鍵時的事件綁定
    function addEnterEvent(element, listener) {
        addEvent(element, "keydown", function(event) {
            if (event.keyCode == 13) {
                listener();
            }
        });
    }

**相關說明：**

這裡我直接使用了上一個任務寫好的 `addEvent()` 函數。這樣可以簡化代碼，並有良好的兼容性。

enter 鍵的 keyCode 為 13。

---

### 事件代理

**參考：**

* [javascript事件代理（委託）](http://www.cnblogs.com/Aralic/p/4446030.html)
* [JS - 事件代理](http://www.cnblogs.com/leo388/p/4461579.html)

**任務與實現：**

    function delegateEvent(element,tag,eventName,listener){
        addEvent(element, eventName, function(event){
            var target = event.target || event.srcElement;
            if(target.tagName.toLowerCase() == tag.toLowerCase()) {
                listener.call(target, event);
            }
        });
    }

---

## BOM

**任務與實現：**

    // 判斷是否為IE瀏覽器，返回-1或者版本號
    function isIE() {
        var s = navigator.userAgent.toLowerCase();
        console.log(s);
        //ie10的信息：
        //mozilla/5.0 (compatible; msie 10.0; windows nt 6.2; trident/6.0)
        //ie11的信息：
        //mozilla/5.0 (windows nt 6.1; trident/7.0; slcc2; .net clr 2.0.50727; .net clr 3.5.30729; .net clr 3.0.30729; media center pc 6.0; .net4.0c; .net4.0e; infopath.2; rv:11.0) like gecko
        var ie = s.match(/rv:([\d.]+)/) || s.match(/msie ([\d.]+)/);
        if(ie) {
            return ie[1];
        } else {
            return -1;
        }
    }

    // 設置cookie
    function setCookie(cookieName, cookieValue, expiredays) {
        var cookie = cookieName + "=" + encodeURIComponent(cookieValue);
        if (typeof expiredays === "number") {
            cookie += ";max-age=" + (expiredays * 60 * 60 * 24);
        }
        document.cookie = cookie;
    }

    // 獲取cookie值
    function getCookie(cookieName) {
        var cookie = {};
        var all = document.cookie;
        if (all==="") {
            return cookie;
        }
        var list = all.split("; ");
        for (var i = 0; i < list.length; i++) {
            var p = list[i].indexOf("=");
            var name = list[i].substr(0, p);
            var value = list[i].substr(p + 1);
            value = decodeURIComponent(value);
            cookie[name] = value;
        }
        return cookie;
    }

* 參考自：JavaScript權威指南

---

## Ajax

**任務：**

    // 學習Ajax，並嘗試自己封裝一個Ajax方法。實現如下方法：
    function ajax(url, options) {
        // your implement
    }

    // 使用示例：
    ajax(
        'http://localhost:8080/server/ajaxtest', 
        {
            data: {
                name: 'simon',
                password: '123456'
            },
            onsuccess: function (responseText, xhr) {
                console.log(responseText);
            }
        }
    );　

**實現：**

    function ajax(url, options) {

        var dataResult; //結果data

        // 處理data
        if (typeof(options.data) === 'object') {
            var str = '';
            for (var c in options.data) {
                str = str + c + '=' + options.data[c] + '&';
            }
            dataResult = str.substring(0, str.length - 1);
        }

        // 處理type
        options.type = options.type || 'GET';

        //獲取XMLHttpRequest對象
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

        // 發送請求
        oXhr.open(options.type, url, true);
        if (options.type == 'GET') {
            oXhr.send(null);
        } else {
            oXhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            oXhr.send(dataResult);
        }

        // readyState
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    if (options.onsuccess) {
                        options.onsuccess(xhr.responseText, xhr.responseXML);
                    }
                } else {
                    if (options.onfail) {
                        options.onfail();
                    }
                }
            }
        };
    }

**說明：**

1. 首先是處理 data，因為測試用例中的 data 是對象，所以把它遍歷出來，把鍵和值中間用 = 連接，和下一組數據用 & 連接。
2. 處理 type，默認是 GET 請求。
3. 使用 `open()` 指明請求方法和 url。方法一般為 GET 或 POST。
4. 調用 `send()` 方法，GET 請求沒有主體，所以應該傳遞 null 或省略這個參數。POST 請求有主體，同時使用 `setRequestHeaders()` 來指定 "Content-type" 頭。這樣便成功發送了請求。
5. 取的響應。一個完整的 HTTP 響應是由狀態碼、響應頭集合、響應主體組成。
    * `readyState` 是一個整數，它指定了 HTTP 請求的狀態。其值和含義如下表：
    
    值 | 含義
    ---|---
    0 | open() 尚未調用
    1 | open() 已調用
    2 | 接收到響應頭信息
    3 | 接收到響應主體
    4 | 響應完成

    * `status` 和 `statusText` 屬性以數字和文本的形式返回 HTTP 狀態碼。這些屬性保存標準的 HTTP 值。如，200和 "OK" 表示成功請求，404和 "Not Found" 表示 URL 不能匹配服務器上的任何資源。
    * `getResponseHeader()` 和 `getAllResponseHeaders()` 能查詢響應頭。
    * 響應主體可以從 `responseText` 屬性中得到文本形式的，從 `responseXML` 屬性中得到 Document 形式的。

6. 補充一點 `onreadystatechange` 事件會在 `readyState` 改變時被觸發。 

**參考：**

* [Ajax W3C](http://www.w3school.com.cn/ajax/index.asp)
* [Comet：基於 HTTP 長連接的“服務器推”技術](http://www.ibm.com/developerworks/cn/web/wa-lo-comet/)

---

## 練習1：處理興趣列表

### 任務要求

在`task0002`目錄下創建一個`task0002_1.html`文件，以及一個`js`目錄和`css`目錄，在`js`目錄中創建`task0002_1.js`，並將之前寫的`util.js`也拷貝到`js`目錄下。然後完成以下需求。

**第一階段**

在頁面中，有一個單行輸入框，一個按鈕，輸入框中用來輸入用戶的興趣愛好，允許用戶用半角逗號來作為不同愛好的分隔。

當點擊按鈕時，把用戶輸入的興趣愛好，按照上面所說的分隔符分開後保存到一個數組，過濾掉空的、重複的愛好，在按鈕下方創建一個段落顯示處理後的愛好。

**第二階段**

單行變成多行輸入框，一個按鈕，輸入框中用來輸入用戶的興趣愛好，允許用戶用換行、空格（全角/半角）、逗號（全角/半角）、頓號、分號來作為不同愛好的分隔。

當點擊按鈕時的行為同上

**第三階段**

用戶輸入的愛好數量不能超過10個，也不能什麼都不輸入。當發生異常時，在按鈕上方顯示一段紅色的錯誤提示文字，並且不繼續執行後面的行為；當輸入正確時，提示文字消失。

同時，當點擊按鈕時，不再是輸出到一個段落，而是每一個愛好輸出成為一個checkbox，愛好內容作為checkbox的label。

### 思路

主要就是對字符串的操作，`split()` 的使用，以及正則表達式的使用。

### 實現

* [代碼](https://github.com/Gaohaoyang/ife/tree/master/task/task0002/work/Gaohaoyang)
* [在線demo](http://gaohaoyang.github.io/ife/task/task0002/work/Gaohaoyang/task0002_1.html)

---

## 練習2：倒計時

### 任務要求

在和上一任務同一目錄下面創建一個`task0002_2.html`文件，在`js`目錄中創建`task0002_2.js`，並在其中編碼，實現一個倒計時功能。

- 界面首先有一個文本輸入框，允許按照特定的格式`YYYY-MM-DD`輸入年月日；
- 輸入框旁有一個按鈕，點擊按鈕後，計算當前距離輸入的日期的00:00:00有多少時間差
- 在頁面中顯示，距離YYYY年MM月DD日還有XX天XX小時XX分XX秒
- 每一秒鐘更新倒計時上顯示的數
- 如果時差為0，則倒計時停止

### 思路

* `setInterval()` 方法可按照指定的週期（以毫秒計）來調用函數或計算表達式。
    
     `setInterval()` 方法會不停地調用函數，直到 `clearInterval()` 被調用或窗口被關閉。由 `setInterval()` 返回的 ID 值可用作 `clearInterval()` 方法的參數。
* `clearInterval()` 方法可取消由 `setInterval()` 設置的 timeout。
    
    `clearInterval()` 方法的參數必須是由 `setInterval()` 返回的 ID 值。
* `setTimeout()` 方法用於在指定的毫秒數後調用函數或計算表達式。
    
    setTimeout() 只執行 code 一次。如果要多次調用，請使用 setInterval() 或者讓 code 自身再次調用 setTimeout()。   
* `clearTimeout()` 方法可取消由 setTimeout() 方法設置的 timeout。

### 實現

* [代碼](https://github.com/Gaohaoyang/ife/tree/master/task/task0002/work/Gaohaoyang)
* [在線demo](http://gaohaoyang.github.io/ife/task/task0002/work/Gaohaoyang/task0002_2.html)

---

## 練習3：圖片輪播

### 任務要求

在和上一任務同一目錄下面創建一個`task0002_3.html`文件，在`js`目錄中創建`task0002_3.js`，並在其中編碼，實現一個輪播圖的功能。

- 圖片數量及URL均在HTML中寫好
- 可以配置輪播的順序（正序、逆序）、是否循環、間隔時長
- 圖片切換的動畫要流暢
- 在輪播圖下方自動生成對應圖片的小點，點擊小點，輪播圖自動動畫切換到對應的圖片

效果示例：[http://echarts.baidu.com/](http://echarts.baidu.com/) 上面的輪播圖（不需要做左右兩個箭頭）

### 思路

將圖片排列成一排，一起向左運動，每次運動的距離剛好是一張圖片的寬度。

對於下面的小圓點，使用事件代理，將事件傳遞給每個 a 標籤。

**參考：**

* [JS圖片切換](http://www.itxueyuan.org/view/6323.html)

### 實現

* [代碼](https://github.com/Gaohaoyang/ife/tree/master/task/task0002/work/Gaohaoyang)
* [在線demo](http://gaohaoyang.github.io/ife/task/task0002/work/Gaohaoyang/task0002_3.html)

### 關於變速運動

評論中有人問到運動部分為什麼這樣寫，下面我講一下吧。

    function startMove(target) {
        clearInterval(timerInner);
        timerInner = setInterval(function() {
            var speed = (target - imgListDiv.offsetLeft) / 6;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            imgListDiv.style.left = imgListDiv.offsetLeft + speed + "px";
        }, 30);
    }

上面是運動部分代碼。

* 參數 `target` 是運動終點的位置。
* 首先停止計時器，為了避免上一次調用方法時，計時器沒有關閉帶來的干擾。

      clearInterval(timerInner);

* 下面開始開啟計時器，每隔 30ms 執行一次內部的函數。

* 變速運動

      var speed = (target - imgListDiv.offsetLeft) / 6;

    逐漸變慢，最後停止，距離越遠速度越大，速度由距離決定

    速度=(目標值-當前值)/縮放係數

    這樣寫的原因就是為了讓它做緩衝運動，而不是勻速運動，這樣給用戶帶來的交互感覺會更好。

* 速度取整

      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

    像素不能是小數，所以速度大於0的時候，向上取整。速度小於0時，向下取整

* 最後關於運動終止條件。

      imgListDiv.style.left = imgListDiv.offsetLeft + speed + "px";

    由這一行可以看出，`imgListDiv.style.left` 在不斷增大，即 `imgListDiv.offsetLeft` 在不斷增大。這兩個是相同的屬性，只不過一個是在賦值時使用，第二個是在取值時使用。

    再看這行代碼，由於這部分是每個30ms執行一次的，所以繼續執行到這裡。

      var speed = (target - imgListDiv.offsetLeft) / 6;

    當不斷增大的 `imgListDiv.offsetLeft` 等於 `target` 時，`speed` 為0。宏觀表現為不再運動，這便是運動終止的狀態，但是這裡的方法還是不斷在執行，每個30ms在執行。


---

## 練習4：輸入框即時提示

### 任務要求

在和上一任務同一目錄下面創建一個`task0002_4.html`文件，在`js`目錄中創建`task0002_4.js`，並在其中編碼，實現一個類似百度搜索框的輸入提示的功能。

要求如下：

- 允許使用鼠標點擊選中提示欄中的某個選項
- 允許使用鍵盤上下鍵來選中提示欄中的某個選項，迴車確認選中
- 選中後，提示內容變更到輸入框中

**初級班：**

- 不要求和後端交互，可以自己偽造一份提示數據例如：

```
var suggestData = ['Simon', 'Erik', 'Kener'];
```

**中級班：**

- 自己搭建一個後端Server，使用Ajax來獲取提示數據

### 思路

這裡我使用了給 input 標籤加 input 監聽，即輸入框內容發生改變時，觸發事件。並兼容到 IE7。

關於 input 監聽的代碼如下：

    function addInputListener() {
        if (inputArea.addEventListener) { // all browsers except IE before version 9
            inputArea.addEventListener("input", OnInput);
        }
        if (inputArea.attachEvent) { // Internet Explorer and Opera
            inputArea.attachEvent("onpropertychange", OnPropChanged); // Internet Explorer
        }
    }

    // Firefox, Google Chrome, Opera, Safari from version 5, Internet Explorer from version 9
    function OnInput(event) {
        var inputValue = event.target.value;
        handleInput(inputValue);
    }
    // Internet Explorer
    function OnPropChanged(event) {
        var inputValue = "";
        if (event.propertyName.toLowerCase() == "value") {
            inputValue = event.srcElement.value;
            handleInput(inputValue);
        }
    } 

其中 handleInput() 為下一步要執行的方法。

其實後來想了想也可以使用 keyup 事件了做這個任務。

匹配的過程同樣適用正則表達式，從開頭開始匹配。遍歷備選單詞，如果匹配成功，則放入 li 標籤中，準備展示。

然後分別添加點擊事件，鍵盤的 keydown 事件，用來選中提示出的單詞。

**參考：**

* [oninput 事件](http://help.dottoro.com/ljhxklln.php)

### 實現

* [代碼](https://github.com/Gaohaoyang/ife/tree/master/task/task0002/work/Gaohaoyang)
* [在線demo](http://gaohaoyang.github.io/ife/task/task0002/work/Gaohaoyang/task0002_4.html)


---

## 練習5：拖拽交互

### 任務要求

- 實現一個可拖拽交互的界面
- 如示例圖，左右兩側各有一個容器，裡面的選項可以通過拖拽來左右移動
- 被選擇拖拽的容器在拖拽過程後，在原容器中消失，跟隨鼠標移動
- 注意拖拽釋放後，要添加到準確的位置
- 拖拽到什麼位置認為是可以添加到新容器的規則自己定
- 注意交互中良好的用戶體驗和使用引導

### 思路

1. 頁面布局時，將要被拖拽的 div 設置為絕對定位，因為這樣在後面拖拽的時候才方便更改坐標。
2. 初始化界面的時候，首先讓 div 塊按照相應的高度重新排列一下。
3. 拖拽方法的實現。由 mousedown mousemove mouseup 三部分組成。
4. 在 mousemove 中判斷，不能讓鼠標拖出瀏覽器窗口。
5. 在 mouseup 中判斷，是否到達指定區域。完成拖拽。

我在這裡沒有使用 html5 中的拖拽 API，所以兼容性還是很好的。

### 實現

* [代碼](https://github.com/Gaohaoyang/ife/tree/master/task/task0002/work/Gaohaoyang)
* [在線demo](http://gaohaoyang.github.io/ife/task/task0002/work/Gaohaoyang/task0002_5.html)

---

## 最終作品

* [代碼](https://github.com/Gaohaoyang/ife/tree/master/task/task0002/work/Gaohaoyang)
* [在線 Demo](http://gaohaoyang.github.io/ife/task/task0002/work/Gaohaoyang/index.html)

加油！向著下一個目標前進！