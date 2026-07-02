![](./cover.png)

# RenderJS

[![Author](https://img.shields.io/badge/Author-邱敬幃%20Pardn%20Chiu-white)](https://github.com/pardnchiu)
[![npm](https://img.shields.io/npm/v/@pardnchiu/renderjs)](https://www.npmjs.com/package/@pardnchiu/renderjs)
[![jsdeliver](https://img.shields.io/jsdelivr/npm/hm/@pardnchiu/renderjs)](https://www.jsdelivr.com/package/npm/@pardnchiu/renderjs)

> RenderJS 是一個專注於 JavaScript 原生物件 prototype 擴展的輕量工具，提供強大的 DOM 操作能力與資料處理方法，減少重複代碼，提升開發效率。

> [!NOTE]
> (原名：PDExtension／PDRenderKit，自 `2.0.0` 版本起更名為 RenderJS)


## 特點

### DOM 操作簡化

使用簡潔的鏈式語法，輕鬆完成複雜的 DOM 操作。

### 增強查詢功能

透過簡化選擇器語法，快速獲取元素，支援單一與多元素選取。

### 預設多項擴展

預設多項 prototype 擴展，加速各種場景的開發。

### 即插即用

與現有 JavaScript 程式無縫整合，支持現代瀏覽器。

## 安裝方式

### 從 npm 安裝

```shell
npm i @pardnchiu/renderjs
```

### 從 CDN 引入

```html
<!-- 2.0.0 版本以上 -->
<script src="https://cdn.jsdelivr.net/npm/@pardnchiu/renderjs@[VERSION]/dist/RenderJS.js"></script>

<!-- 1.5.2 版本以下 -->
<script src="https://cdn.jsdelivr.net/npm/pdrenderkit@[VERSION]/dist/PDRenderKit.js"></script>
```

## 功能介紹

### 擴展

- #### Before
    ```javascript
    let section = document.createElement("section");
    section.id = "#test";
    document.body.appendChild(section);

    let button = document.createElement("button");
    button.style.width = "10rem";
    button.style.height = "2rem";
    button.style.backgroundColor = "steelblue";
    button.style.color = "fff";
    button.onclick = function(){
        alert("test")
    };
    button.innerHTML = "<span>test</span> button";
    section.appendChild(button);

    let svg = document.createElement("span");
    span.classList.add("svg");
    span.setAttribute("path", "https://xxxxxx");
    section.appendChild(span);

    let img = document.createElement("img");
    img.classList.add("lazyload");
    img.dataset.src = "https://xxxxxx";
    section.appendChild(img);

    let input = document.createElement("input");
    input.placeholder = "type";
    input.type = "email";
    section.appendChild(input);
    ```
- #### After
    ```javascript
    document.body._child(
        "section#test"._([
            "button"._({
                style: {
                    width: "10rem",
                    hright: "2rem",
                    backgroundColor: "steelblue",
                    color: "#fff"
                }
            }, [
                // or "<span>test</span> button"
                "span"._("test"),
                " button"
            ])._click(function(){
                alert("test")
            }),
            "span.svg:._({ path: "https://xxxxxx" }),
            // No Lazy Loading => "img"._("https://xxxxxx"),
            "img"._({ lazyload: "https://xxxxxx" }),
            "input@email type"._()
        ])
    );

    _Listener({
        svg: true,     // Add SVGListener, convert span.svg to svg tag
        lazyload: true // Add Lazy Listener, Lazy Loading images
    });
    ```

- #### 獲取元素
    - Before
        ```javascript
        document.getElementById("test");
        document.querySelector("div.test");
        document.querySelectorAll("div.test");
        document.querySelector("input[name='test']");
        ```
    - After
        ```javascript
        "test".$;
        "div.test".$;
        "div.test".$all;
        "input[name='test']".$;
        ```

- #### 添加元素
    - Before
        ```html
        <div class="test" style="width: 5rem; height: 80px;" test="test">
            <button>
                <img src="https://xxxxxx">
            </button>
        </div>
        ```
    - After
        ```Javascript
        "div.test"._({
            style: {
                width: "5rem",
                height: 80,
            },
            test: "test"
        }, [
            "button"._([
                "img"._("https://xxxxxx")
            ])
        ]);
        ```

### 簡化版前端框架

> [!NOTE]
> **RJS 是基於 [QuickUI](https://pardn.ltd/QuickUI) 的簡化版前端框架**，專為特定專案設計。<br>  
> - 使用非 vDOM 技術進行渲染，提升效能並降低複雜性。  
> - 移除自動監聽與自動更新功能，由開發者手動控制更新流程。  
> - 新增 `renew()` 函式，支援資料與事件的精確更新。 

- #### 可用屬性
    | tag | description |
    | --- | --- |
    | {{value}} | 將文字插入到 HTML 標籤中，並根據資料變更更新值。 |
    | :path | 將外部文件中的 HTML 片段加載到當前頁面。 |
    | :html | 使用文字替換元素的 innerHTML。 |
    | :for | 支持 item in items、(item, index) in items、(key, value) in object。<br>遍歷數據集合，為重複數據顯示生成相應的 HTML 元素。 |
    | :if<br>:else-if<br>:el-if<br>:else | 根據指定條件顯示或隱藏元素，為實現分支邏輯添加多種選項。 |
    | :model | 將資料綁定到表單元素（如 input），當輸入更改時自動更新資料。 |
    | :[attr] | 設定元素屬性，例如 ID、class、圖像來源等。<br>例如：:id/:class/:src/:alt/:href... |
    | :[css] |  |
    | @[event] | 添加事件監聽器，當事件觸發時執行指定操作。<br>例如：@click/@input/@mousedown... |
- #### 初始化 `RJS`
    ```JavaScript
    const app = "(元件ID)".RJS({
        data: {
            // 定義資料
        },
        event: {
            // 定義事件
        },
        when: {
            before_render: function () {
                // 在渲染前執行（可停止渲染）
                // return false
            },
            rendered: function () {
                // 渲染完成後執行
            }
        }
    });
    ```
- #### 更新 `RJS`
    ```JavaScript
    app.renew({
        // data: 僅填寫需要更新的資料項目，未填部分將保留初始化時的資料。
        // event: 僅填寫需要更新的事件項目，未填部分將保留初始化時的事件。
        // when: 僅填寫需要更新的生命周期邏輯，未填部分將保留初始化時的邏輯。
    });
    ```

### Interface

| [String](./src/interface/String.ts) | [Number](./src/interface/Number.ts) | [Array](./src/interface/Array.ts) | [**HTMLElement**](./src/interface/HTMLElement.ts) |
| :- | :- | :- | :- |
| [**Object**](./src/interface/Object.ts) | [**Map**](./src/interface/Map.js) | [**Date**](./src/interface/Date.ts) | [**HTMLFormElement**](./src/interface/HTMLFormElement.ts) |
| [**URL**](./src/interface/URL.js) | [**FormData**](./src/interface/FormData.ts) | [**File**](./src/interface/File.ts) | [**HTMLLinkElement**](./src/interface/HTMLLinkElement.ts) |
| [**Image**](./src/interface/Image.ts) | [**Element**](./src/interface/Element.ts) | [**DocumentFragment**](./src/interface/DocumentFragment.ts) | [**HTMLVideoElement**](./src/interface/HTMLVideoElement.ts) |
| [**window**](./src/interface/window.ts) |

## 授權條款

本專案採用 [MIT License](LICENSE) 授權。

## 開發者

<img src="https://avatars.githubusercontent.com/u/25631760" align="left" width="96" height="96" style="margin-right: 0.5rem;">

<h4 style="padding-top: 0">邱敬幃 Pardn Chiu</h4>

<a href="mailto:dev@pardn.io" target="_blank">
    <img src="https://pardn.io/image/email.svg" width="48" height="48">
</a> <a href="https://linkedin.com/in/pardnchiu" target="_blank">
    <img src="https://pardn.io/image/linkedin.svg" width="48" height="48">
</a>

## 星

[![Star](https://api.star-history.com/svg?repos=pardnchiu/RenderJS&type=Date)](https://www.star-history.com/#pardnchiu/RenderJS&Date)

***

©️ 2022 [邱敬幃 Pardn Chiu](https://www.linkedin.com/in/pardnchiu)

