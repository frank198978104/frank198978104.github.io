---
layout: post
title:  身分證字號及統一編號驗證
date:   2017-09-22 00:00:00
categories: Code
tags: Csharp JavaSctipt Code 筆記
excerpt: 　　常常用到，規則不會變，所以可以直接當工具使用了，提供 C# 及 JavaSctipt 作法。
mathjax: true
author: Frank Sun 孫景承
---

* content
{:toc}

## 前言
　　常常用到，規則不會變，所以可以直接當工具使用了，提供 C# 及 JavaSctipt 作法。

## Csharp

### 身分證字號
```csharp
/// <summary>
/// 驗身分證
/// </summary>
/// <param name="id">身分證字號</param>
/// <returns>身分字號是否符合格式</returns>
public static bool CheckIdCardNumber(string id)
{
    var d = false;
    if (id.Length == 10)
    {
        id = id.ToUpper();
        if (id[0] >= 0x41 && id[0] <= 0x5A)
        {
            var a = new[] { 10, 11, 12, 13, 14, 15, 16, 17, 34, 18, 19, 20, 21, 22, 35, 23, 24, 25, 26, 27, 28, 29, 32, 30, 31, 33 };
            var b = new int[11];
            b[1] = a[(id[0]) - 65] % 10;
            var c = b[0] = a[(id[0]) - 65] / 10;
            for (var i = 1; i <= 9; i++)
            {
                b[i + 1] = id[i] - 48;
                c += b[i] * (10 - i);
            }
            if (((c % 10) + b[10]) % 10 == 0)
            {
                d = true;
            }
        }
    }

    return d;
}
```
### 外籍居留證
```csharp
/// <summary>
/// 外來人口統一證號驗證
/// </summary>
/// <param name="numberToCheck">要驗證的證號</param>
/// <returns>驗證結果</returns>
public static bool CheckForeignIdNumber(string numberToCheck)
{
    // 基礎檢查 「任意1個字母」+「A~D其中一個字母」+「8個數字」
    if (!Regex.IsMatch(numberToCheck, @"^[A-Za-z][A-Da-d]\d{8}$")) return false;
    numberToCheck = numberToCheck.ToUpper();

    // 縣市區域碼
    var cityCode = new[] { 10, 11, 12, 13, 14, 15, 16, 17, 34, 18, 19, 20, 21, 22, 35, 23, 24, 25, 26, 27, 28, 29, 32, 30, 31, 33 };
    // 計算時使用的容器，最後一個位置拿來放檢查碼，所以有11個位置(縣市區碼佔2個位置)
    var valueContainer = new int[11]; 
    valueContainer[0] = cityCode[numberToCheck[0] - 65] / 10; // 區域碼十位數
    valueContainer[1] = cityCode[numberToCheck[0] - 65] % 10; // 區域碼個位數
    valueContainer[2] = cityCode[numberToCheck[1] - 65] % 10; // 性別碼個位數
    // 證號執行特定數規則所產生的結果值的加總，這裡把初始值訂為區域碼的十位數數字(特定數為1，所以不用乘)
    var sumVal = valueContainer[0]; 

    // 迴圈執行特定數規則
    for (var i = 1; i <= 9; i++)
    {
        // 跳過性別碼，如果是一般身分證字號則不用跳過
        if (i > 1) 
        // 將當前證號於索引位置的數字放到容器的下一個索引的位置
            valueContainer[i + 1] = numberToCheck[i] - 48; 

        // 特定數為: 1987654321 ，因為首個數字1已經在sumVal初始值算過了，所以這裡從9開始
        sumVal += valueContainer[i] * (10 - i); 
    }

    // 此為「檢查碼 = 10 - 總和值的個位數數字 ; 若個位數為0則取0為檢查碼」的反推
    if ((sumVal + valueContainer[10]) % 10 == 0) return true; 
    return false;
}
```
### 統一編號
```csharp
/// <summary>
/// 驗統編
/// </summary>
/// <param name="companyNumber">欲驗證的統編</param>
/// <returns>是否符合統編格式</returns>
public static bool CheckCompanyNumber(string companyNumber)
{
    // 假設統一編號為 A B C D E F G H
    // A - G 為編號, H 為檢查碼
    // A - G 個別乘上特定倍數, 若乘出來的值為二位數則將十位數和個位數相加
    // A x 1
    // B x 2
    // C x 1
    // D x 2
    // E x 1
    // F x 2
    // G x 4
    // H x 1
    // 最後將所有數值加總, 被 10 整除就為正確
    // 若上述演算不正確並且 G 為 7 得話, 再加上 1 被 10 整除也為正確
    if (companyNumber.Trim().Length != 8)
    {
        return false;
    }

    var monitor = new Regex(@"^[0-9]*$");

    if (!monitor.IsMatch(companyNumber)) return false;

    int[] intTmpVal = new int[6];
    int intTmpSum = 0;
    for (int i = 0; i < 6; i++)
    {
        // 位置在奇數位置的*2，偶數位置*1，位置計算從0開始
        if (i % 2 == 1)
            intTmpVal[i] = OverTen(int.Parse(companyNumber[i].ToString()) * 2);
        else
            intTmpVal[i] = OverTen(int.Parse(companyNumber[i].ToString()));

        intTmpSum += intTmpVal[i];
    }

    // 第6碼*4
    intTmpSum += OverTen(int.Parse(companyNumber[6].ToString()) * 4);

    // 第7碼*1
    intTmpSum += OverTen(int.Parse(companyNumber[7].ToString()));

    if (intTmpSum % 10 == 0) return true;
    if (int.Parse(companyNumber[6].ToString()) == 7 && (intTmpSum + 1) % 10 == 0) return true;

    return false;
}
```

## JavaScript

### 身分證字號(含外籍居留證)
```javascript
function IdCardNumberCheck(){
    var city = new Array(1, 10, 19, 28, 37, 46, 55, 64, 39, 73, 82, 2, 11, 20, 48, 29, 38, 47, 56, 65, 74, 83, 21, 3, 12, 30);
    id = id.toUpperCase();
    // 使用「正規表達式」檢驗格式
    if (!id.match(/^[A-Z]\d{9}$/) && !id.match(/^[A-Z][A-D]\d{8}$/)) {
        document.getElementById("PointMsg").innerHTML = "<span style='color:red; font-style:italic'>請輸入正確身分證字號格式</span>";
        document.getElementById("IdCardText").value = "";
    }
    else {
        var total = 0;
        if (id.match(/^[A-Z]\d{9}$/)) { //身分證字號
            //將字串分割為陣列(IE必需這麼做才不會出錯)
            id = id.split('');
            //計算總分
            total = city[id[0].charCodeAt(0) - 65];
            for (var i = 1; i <= 8; i++) {
                total += eval(id[i]) * (9 - i);
            }
        } else { // 外來人口統一證號
            //將字串分割為陣列(IE必需這麼做才不會出錯)
            id = id.split('');
            //計算總分
            total = city[id[0].charCodeAt(0) - 65];
            // 外來人口的第2碼為英文A-D(10~13)，這裡把他轉為區碼並取個位數，之後就可以像一般身分證的計算方式一樣了。
            id[1] = id[1].charCodeAt(0) - 65;
            for (var i = 1; i <= 8; i++) {
                total += eval(id[i]) * (9 - i);
            }
        }
        //補上檢查碼(最後一碼)
        total += eval(id[9]);
        //檢查比對碼(餘數應為0);
        if (total % 10 == 0) {
            document.getElementById("PointMsg").innerHTML = "<span style='color:red; font-style:italic'></span>";
        }
        else {
            document.getElementById("PointMsg").innerHTML = "<span style='color:red; font-style:italic'>驗證錯誤，請輸入正確的身分證字號</span>";
            document.getElementById("IdCardText").value = "";
        }
    }
}
```
### 統一編號
```javascript
function IdTaxNumberCheck(){
    var invalidList = "00000000,11111111";
    if (/^\d{8}$/.test(id) == false || invalidList.indexOf(id) != -1) {
        document.getElementById("PointMsg").innerHTML = "<span style='color:red; font-style:italic'>請輸入正確統一編號格式</span>";
        document.getElementById("IdTaxText").value = "";
    }

    var validateOperator = [1, 2, 1, 2, 1, 2, 4, 1],
        sum = 0,
        calculate = function (product) { // 個位數 + 十位數
            var ones = product % 10,
                tens = (product - ones) / 10;
            return ones + tens;
        };
    for (var i = 0; i < validateOperator.length; i++) {
        sum += calculate(id[i] * validateOperator[i]);
    }

    if (sum % 10 == 0 || (id[6] == "7" && (sum + 1) % 10 == 0)) {
        document.getElementById("PointMsg").innerHTML = "<span style='color:red; font-style:italic'></span>";
    } else {
        document.getElementById("PointMsg").innerHTML = "<span style='color:red; font-style:italic'>驗證失敗，請輸入正確統一編號格式</span>";
        document.getElementById("IdTaxText").value = "";
    }
} 
```