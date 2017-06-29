---
layout: post
title:  "判斷兩個數組是否相似 (arraysSimilar)"
date:   2015-04-06 15:14:54
categories: JavaScript
excerpt: JavaScript 算法，typeof instanceof Object.prototype.toString.apply() 的使用方法。完成 arraysSimilar 方法，判斷傳入的兩個數組是否相似。請在index.html文件中，編寫arraysSimilar函數，實現判斷傳入的兩個數組是否相似。
---

* content
{:toc}

## 題目

題目來自 [慕課網 JavaScript 深入淺出 1-6 編程練習](http://imooc.com/code/5760)    

請在 index.html 文件中，編寫 arraysSimilar 函數，實現判斷傳入的兩個數組是否相似。具體需求：    

1. 數組中的成員類型相同，順序可以不同。例如 [1, true] 與 [false, 2] 是相似的。
2. 數組的長度一致。
3. 類型的判斷範圍，需要區分: String, Boolean, Number, undefined, null, 函數, 日期, window.

當以上全部滿足，則返回**"判定結果:通過"**，否則返回**"判定結果:不通過"**。    

題目給出了 index.html 如下：

	<!DOCTYPE HTML>
	<html>
	<head>
	    <meta http-equiv="Content-Type" content="text/html; charset=gb18030">
	    <title>Untitled Document</title>
	    
	</head>
	<body>
	    <script type="text/javascript">   
	        /*
	         * param1 Array 
	         * param2 Array
	         * return true or false
	         */
	        function arraysSimilar(arr1, arr2){
	        
	        }
	    </script>
	    <script src="testData.js"></script>
	</body>
	</html>

其中 testData.js 是測試用例，代碼如下

	var result = function() {
	    //以下為多組測試數據
	    var cases = [{
	        arr1: [1, true, null],
	        arr2: [null, false, 100],
	        expect: true
	    }, {
	        arr1: [
	            function() {},
	            100
	        ],
	        arr2: [100, {}],
	        expect: false
	    }, {
	        arr1: [null, 999],
	        arr2: [{},
	            444
	        ],
	        expect: false
	    }, {
	        arr1: [window, 1, true, new Date(), "hahaha", (function() {}), undefined],
	        arr2: [undefined, (function() {}), "okokok", new Date(), false, 2, window],
	        expect: true
	    }, {
	        arr1: [new Date()],
	        arr2: [{}],
	        expect: false
	    }, {
	        arr1: [window],
	        arr2: [{}],
	        expect: false
	    }, {
	        arr1: [undefined, 1],
	        arr2: [null, 2],
	        expect: false
	    }, {
	        arr1: [new Object, new Object, new Object],
	        arr2: [{}, {},
	            null
	        ],
	        expect: false
	    }, {
	        arr1: null,
	        arr2: null,
	        expect: false
	    }, {
	        arr1: [],
	        arr2: undefined,
	        expect: false
	    }, {
	        arr1: "abc",
	        arr2: "cba",
	        expect: false
	    }];

	    //使用for循環, 通過arraysSimilar函數驗證以上數據是否相似，如相似顯示“通過”,否則"不通過",所以大家要完成arraysSimilar函數,具體要求，詳見任務要求。    
	    for (var i = 0; i < cases.length; i++) {
	        if (arraysSimilar(cases[i].arr1, cases[i].arr2) !== cases[i].expect) {
	            document.write("不通過！case" + (i + 1) + "不正確！arr1=" + JSON.stringify(cases[i].arr1) + ", arr2=" + JSON.stringify(cases[i].arr2) + " 的判斷結果不是" + cases[i].expect);
	            return false;
	        }
	    }
	    return true;

	}();
	document.write("判定結果:" + (result ? "通過" : "不通過"));

---

## 解答

各位讀者在看解答前也可以自己考慮一下，看看咱們的想法是否一致，期待您在本文的留言。

---

### 思路

通過觀察測試用例，可以發現，最後三個用例有不是數組的。所以我們可以先判斷傳入的參數是否是數組。   
又因為題目中要求數組長度必須一致，這也是第二個限制條件。   
最後再區分具體的類型。   

理清思路我們可以分為以下步驟：   

1. 判斷傳入的參數是否為數組 (使用 `instanceof` 方法)
2. 檢查兩個數組長度是否一致
3. 分別判斷數組內元素的基本數據類型 (使用 `typeof` 方法)
4. 因為 `typeof` 只能檢查基本數據類型，對於 `null`, `Date`, `window` 返回的都是 `object`，所以使用 `Object.prototype.toString.apply()` 來檢查這些對象類型，其返回值為：`'[object Null]'`, `'[object Date]'`, `'[object global]'`
5. 分別比較每個數組內元素的各種類型的個數，如果都相等，那麼這兩個數組是相似的。

---

### 具體實現代碼

JavaScript代碼如下

	/**
	 * =====================================================
	 * 請在index.html文件中，編寫arraysSimilar函數，實現判斷傳入的兩個數組是否相似。具體需求：
	 * 1. 數組中的成員類型相同，順序可以不同。例如[1, true] 與 [false, 2]是相似的。
	 * 2. 數組的長度一致。
	 * 3. 類型的判斷範圍，需要區分:String, Boolean, Number, undefined, null, 函數，日期, window.
	 *
	 * 當以上全部滿足，則返回"判定結果:通過"，否則返回"判定結果:不通過"。
	 * ===================================================== 
	 */

	/*
	* param1 Array
	* param2 Array
	* return true or false
	*/
	function arraysSimilar(arr1, arr2){
		if (arr1 instanceof Array && arr2 instanceof Array ) {	//先判斷傳入的是否是數組
			if (arr1.length == arr2.length) {					//判斷數組長度
				console.log("same-length");
				console.log(arr1);
				console.log(arr2);
				//開始判斷數組內部是否相似
				return sameLengthArraysSimilar(arr1, arr2);
			} else{
				//兩個數組長度不同返回false
				return false;
			}
		} else {
			//傳入的參數不是數組返回false
			return false;
		}
	}

	/**
	 * 判斷兩個等長的數組內部是否相似
	 * 遍歷數組
	 * arr1中元素各種類型出現的個數是否和arr2中元素各種類型出現的個數相同
	 * @param  {Array} arr1 數組1
	 * @param  {Array} arr2 數組2
	 * @return {true,false}
	 */
	function sameLengthArraysSimilar(arr1,arr2) {
		var numInArr1 = 0;
		var numInArr2 = 0;
		var booleanInArr1 = 0;
		var booleanInArr2 = 0;
		var funInArr1 = 0;
		var funInArr2 = 0;
		var undefinedInArr1 = 0;
		var undefinedInArr2 = 0;
		var stringInArr1 = 0;
		var stringInArr2 = 0;
		var nullInArr1 = 0;
		var nullInArr2 = 0;
		var dateInArr1 = 0;
		var dateInArr2 = 0;
		var windowInArr1 = 0;
		var windowInArr2 = 0;

		for (var i = 0; i < arr1.length; i++) {
			if(typeof arr1[i] === 'number' ){
				numInArr1 ++;
			} else if(typeof arr1[i] === 'boolean'){
				booleanInArr1 ++;
			} else if(typeof arr1[i] === 'function'){
				funInArr1 ++;
			} else if(typeof arr1[i] === 'undefined'){
				undefinedInArr1 ++;
			} else if(typeof arr1[i] === 'string'){
				stringInArr1 ++;
			} else if(typeof arr1[i] ==='object'){
				if(Object.prototype.toString.apply(arr1[i]) === '[object Null]'){
					nullInArr1 ++;
				} else if(Object.prototype.toString.apply(arr1[i]) === '[object Date]'){
					dateInArr1 ++;
				} else if(Object.prototype.toString.apply(arr1[i]) === '[object global]'){
					windowInArr1 ++;
				}
			}

			if(typeof arr2[i] === 'number'){
				numInArr2 ++;
			} else if(typeof arr2[i] === 'boolean'){
				booleanInArr2 ++;
			} else if(typeof arr2[i] === 'function'){
				funInArr2 ++;
			} else if(typeof arr2[i] === 'undefined'){
				undefinedInArr2 ++;
			} else if(typeof arr2[i] === 'string'){
				stringInArr2 ++;
			} else if(typeof arr2[i] ==='object'){
				if(Object.prototype.toString.apply(arr2[i]) === '[object Null]'){
					nullInArr2 ++;
				} else if(Object.prototype.toString.apply(arr2[i]) === '[object Date]'){
					dateInArr2 ++;
				} else if(Object.prototype.toString.apply(arr2[i]) === '[object global]'){
					windowInArr2 ++;
				}
			}
		}

		console.log("num---"+numInArr1);
		console.log("num---"+numInArr2);
		console.log("boo---"+booleanInArr1);
		console.log("boo---"+booleanInArr2);
		console.log("null---"+nullInArr1);
		console.log("null---"+nullInArr2);
		console.log("window---"+windowInArr1);
		console.log("window---"+windowInArr2);
		console.log("date---"+dateInArr1);
		console.log("date---"+dateInArr2);
		console.log("string---"+stringInArr1);
		console.log("string---"+stringInArr2);
		console.log("fun---"+funInArr1);
		console.log("fun---"+funInArr2);
		console.log("undefined---"+undefinedInArr1);
		console.log("undefined---"+undefinedInArr2);

		if(numInArr1 == numInArr2 && booleanInArr1==booleanInArr2 && funInArr1==funInArr2 && undefinedInArr1==undefinedInArr2 && stringInArr1==stringInArr2 && nullInArr1==nullInArr2 && dateInArr1==dateInArr2 && windowInArr1==windowInArr2){
			console.log('================================true');
			return true;
		}else{
			console.log('================================false');
			return false;
		}
	}

---

## 總結

* 上述代碼完美的跑完所有的測試用例，讀者 [點擊這裡查看結果](http://gaohaoyang.github.io/javascript-test/arraysSimilar/)，並且可以按 `f12` 看 Console 信息， 裡面有代碼的執行過程。  
* 當然你也可以複製本文的 JavaScript 代碼，在 [慕課網的習題](http://imooc.com/code/5760) 下跑一下，也可以看到 `判定結果:通過` 的結果
* 完整源代碼在我的 GitHub [javascript-test/arraysSimilar/](https://github.com/Gaohaoyang/javascript-test/tree/master/arraysSimilar) 倉庫中   
* 其實我的代碼邏輯並不複雜，有點**空間換時間**的感覺，執行效率應該是較高的。沒有用 JavaScript 封裝的任何函數，完全是自己寫的。其實代碼除去 `console.log()` 也並沒有多少行。
* 各位讀者有什麼好的想法歡迎留言交流！