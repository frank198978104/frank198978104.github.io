---
layout: post
title:  Get Display Name
date:   2018-02-23 00:00:00
categories: Code
tags: Csharp MVC Code 筆記
excerpt: 　　提供兩種需要取得 Display Name 情況的方式。
mathjax: true
author: Frank Sun 孫景承
---

* content
{:toc}

## 前言
　　以下提供兩種需要取得 Display Name 情況的方式。

### Code

#### MetaData 情況

**Function**
```csharp
public class DisplayAttributeHelper<TModel> where TModel : class
{
    /// <summary>
    /// Gets the display name.
    /// </summary>
    /// <param name="propertyName">Name of the property.</param>
    /// <returns></returns>
    public static string GetDisplayName(string propertyName)
    {
        Type type = typeof(TModel);
        Type metaDataType = null;

        foreach (MetadataTypeAttribute attrib in type
        .GetCustomAttributes(typeof(MetadataTypeAttribute), true))
        {
            metaDataType = attrib.MetadataClassType;
        }

        if (metaDataType == null)
        {
            return propertyName;
        }

        PropertyInfo pInfo = GetProperty(type, propertyName);
        return DisplayAttributeHelper<TModel>.GetDisplayName(pInfo, metaDataType);
    }

    /// <summary>
    /// Gets the property.
    /// </summary>
    /// <param name="type">The type.</param>
    /// <param name="propName">Name of the prop.</param>
    /// <returns></returns>
    private static PropertyInfo GetProperty(Type type, string propName)
    {
        try
        {
            PropertyInfo[] infos = type.GetProperties();
            if (infos == null)
            {
                return null;
            }
            foreach (PropertyInfo info in infos)
            {
                if (propName.ToLower().Equals(info.Name.ToLower()))
                {
                    return info;
                }
            }
        }
        catch (Exception ex)
        {
            return null;
            throw ex;
        }
        return null;
    }

    /// <summary>
    /// Gets the property Display Name.
    /// </summary>
    /// <param name="pInfo">The p info.</param>
    /// <returns></returns>
    public static string GetDisplayName(PropertyInfo pInfo, Type metaDataType)
    {
        if (null == pInfo)
        {
            return String.Empty;
        }

        string propertyName = pInfo.Name;

        DisplayAttribute attr = (DisplayAttribute)metaDataType.GetProperty(propertyName)
            .GetCustomAttributes(typeof(DisplayAttribute), true)
            .SingleOrDefault();

        if (attr == null)
        {
            MetadataTypeAttribute otherType =
                (MetadataTypeAttribute)metaDataType
                .GetCustomAttributes(typeof(MetadataTypeAttribute), true)
                .FirstOrDefault();

            if (otherType != null)
            {
                var property = otherType.MetadataClassType.GetProperty(propertyName);
                if (property != null)
                {
                    attr = (DisplayAttribute)property
                    .GetCustomAttributes(typeof(DisplayNameAttribute), true).SingleOrDefault();
                }
            }
        }
        return (attr != null) ? attr.Name : String.Empty;
    }
}
```

**測試範例列舉**
```csharp
[MetadataType(typeof(MemberMetaData))]
public partial class Member
{
}

public partial class MemberMetaData
{
    [Display(Name = "姓名")]
    public string Name { get; set; }

    [Display(Name = "信箱")]
    public string Email { get; set; }

    [Display(Name = "電話")]
    public string Phone { get; set; }
}

```
**使用方法：例如，欲取得信箱**
```csharp
DisplayAttributeHelper<Member>.GetDisplayName("Email")
```

#### Enum 情況
**測試範例列舉**
```csharp
public enum TypeClass
{
    [Display(Name = "資料")]
    typeData = 0,
}
```

**呼叫**
```csharp
var enumData = TypeClass.typeData.GetAttribute<DisplayAttribute>().Name;
```

## 參考資料
[取得 Entity 類別 MetaData 所設定的 Display Name](http://kevintsengtw.blogspot.tw/2013/02/entity-metadata-display-name.html)

[How to get the Display Name Attribute of an Enum member via MVC razor code?
](https://stackoverflow.com/questions/13099834/how-to-get-the-display-name-attribute-of-an-enum-member-via-mvc-razor-code)