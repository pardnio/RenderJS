# RenderJS - 技術文件

> 返回 [README](./README.zh.md)

## 前置需求

- 現代瀏覽器（支援 ES2022，需要 `IntersectionObserver`、`navigator.clipboard`、`fetch`）
- Node.js（僅建置/開發時需要；執行期不依賴 Node 環境）
- 無其他執行期相依套件

## 安裝

### 透過 npm 安裝

```shell
npm i @pardnchiu/renderjs
```

### 透過 CDN 引入

```html
<!-- 2.0.0 版本以上 -->
<script src="https://cdn.jsdelivr.net/npm/@pardnchiu/renderjs@[VERSION]/dist/RenderJS.js"></script>

<!-- 1.5.2 版本以下（舊名 PDRenderKit） -->
<script src="https://cdn.jsdelivr.net/npm/pdrenderkit@[VERSION]/dist/PDRenderKit.js"></script>
```

## 使用方式

### 基礎：鏈式 DOM 建構

```javascript
document.body._child(
    "section#test"._([
        "button"._({
            style: {
                width: "10rem",
                height: "2rem",
                backgroundColor: "steelblue",
                color: "#fff"
            }
        }, [
            "span"._("test"),
            " button"
        ])._click(function () {
            alert("test");
        }),
        "img"._({ lazyload: "https://xxxxxx" }),
        "input@email type"._()
    ])
);

// 啟用 SVG 內嵌與圖片延遲載入監聽器
_Listener({
    svg: true,
    lazyload: true
});
```

### 基礎：元素查詢

```javascript
"test".$;          // document.getElementById("test")
"div.test".$;       // document.querySelector("div.test")
"div.test".$all;    // [...document.querySelectorAll("div.test")]
```

### 進階：`RJS` 模板引擎

`RJS` 是基於 [QuickUI](https://pardn.ltd/QuickUI) 概念簡化而成的渲染工具，專為特定專案設計：

- 使用非 vDOM 技術渲染，減少複雜度並提升效能。
- 移除自動監聽與自動更新，改由開發者手動控制更新時機。
- 提供 `renew()` 函式，支援對資料與事件進行精準更新。

```javascript
const app = "#app".RJS({
    data: {
        // 定義資料
    },
    event: {
        // 定義事件方法
    },
    when: {
        before_render: function () {
            // 渲染前執行，return false 可中止渲染
        },
        rendered: function () {
            // 渲染完成後執行
        }
    }
});

// 更新：僅需傳入要更新的項目，未提及的項目維持初始值
app.renew({
    data: { /* ... */ },
    event: { /* ... */ },
    when: { /* ... */ }
});
```

### 進階：網路請求

```javascript
const result = await "/api/x".$req({
    method: "POST",
    json: { key: "value" },
    header: { "X-Token": "..." }
});
```

## API 參考

### RJS 模板指令

| 屬性 | 說明 |
| --- | --- |
| `{{ value }}` | 將文字插入 HTML 標籤中，並隨資料變化自動更新；支援 `CALC()`、`LENGTH()`、`UPPER()`、`LOWER()`、`DATE()` 輔助函式 |
| `:path` | 搭配 `temp` 標籤使用，從外部檔案載入 HTML 片段至目前頁面 |
| `:html` | 以文字取代元素的 `innerHTML` |
| `:for` | 支援 `item in items`、`(item, index) in items`、`(key, value) in object` 格式，迭代資料集合以產生對應的 HTML 元素 |
| `:if`<br>`:else-if` / `:el-if`<br>`:else` | 依指定條件顯示或隱藏元素，支援 `>`、`<`、`>=`、`<=`、`==`、`!=` 等比較運算子 |
| `:model` | 將資料綁定至表單元素（如 `input`），輸入變更時自動更新資料 |
| `:[attr]` | 設定元素屬性，例如 `:id`／`:class`／`:src`／`:alt`／`:href` |
| `:[css]` | 設定元素 CSS，例如 `:background-color`／`:opacity`／`:margin`／`:top`／`:position` |
| `@[event]` | 加入事件監聽器，觸發時執行 `event` 中對應的方法，例如 `@click`／`@input`／`@mousedown` |

### `RJS` 生命週期

| 方法 | 說明 |
| --- | --- |
| `"#selector".RJS(body)` | 於指定元素上初始化 `RJS` 實例，`body` 含 `data`／`event`／`when`／`listener` |
| `app.renew(body)` | 以原始模板重新渲染，並合併更新後的 `data`／`event`／`when` |
| `when.before_render()` | 渲染前執行；回傳 `false` 可中止渲染 |
| `when.rendered()` | 渲染完成（含所有非同步 `:path` 載入）後執行 |

### `String` 擴充

| 方法／屬性 | 說明 |
| --- | --- |
| `"selector".RJS(body)` | 於符合選擇器的元素上啟動 `RJS` 渲染 |
| `"tag.class#id"._(attrs, children)` | 依標籤選擇器字串建立真實 DOM 元素（含 SVG 命名空間、`input`/`textarea` 型別解析） |
| `"selector".$` | 取得符合選擇器的單一元素（`getElementById`/`querySelector`） |
| `"selector".$all` | 取得符合選擇器的所有元素陣列 |
| `"url".$req(body)` | 發送 fetch 請求，支援 JSON／FormData、自動去重、自動解析回應 |
| `"url".$$200(isImg)` | 檢查 URL 是否可正常取得（含圖片內容型別判斷） |
| `"str".$json` / `"str".$$json` | 安全 `JSON.parse` / 驗證是否為合法 JSON |
| `"str".$html` | 將字串進行 HTML 逸出 |
| `"str".copy()` | 將字串寫入剪貼簿 |
| `"str".$base64(mimeType)` | 將 base64 字串解碼為 `Blob` |

### `Element` / `HTMLElement` 擴充

| 方法／屬性 | 說明 |
| --- | --- |
| `el._child(value, before)` / `__child(value)` / `$child(value)` | 依索引或選擇器陣列鏈式新增／取代／查詢子元素 |
| `el._class(list)` / `class_(list)` / `$$class(list)` / `$$class_(bool, list)` | 鏈式新增／移除／檢查／切換 class |
| `el.$i` | 取得元素在同層中的索引 |
| `el.$attributes` | 取得所有屬性組成的物件 |
| `el._click(fn)`（及所有 DOM 事件名） | 鏈式指定 `on<event>` 處理函式 |
| `el.width(v)` / `height(v)` / `marginTop(v)` / `paddingLeft(v)` ... | 鏈式數值型樣式設定，自動補上 `px` |
| `el.padding(t, r, b, l)` / `el.margin(...)` | CSS 簡寫式鏈式樣式設定 |
| `el.scrollToX/Y(value, animation)`、`scrollToT/L/B/R(animation)` | 捲動至指定位置／邊緣，支援平滑動畫 |

### `Array` 擴充

| 方法／屬性 | 說明 |
| --- | --- |
| `arr.$sum` | 陣列數值總和 |
| `arr.$shuffle` | 原地 Fisher–Yates 洗牌，回傳自身 |
| `arr._(value, index)` / `$(index)` / `$_(index)` | 支援負索引的插入／取值／移除 |
| `arr.$req(body)` | 將陣列視為 URL 路徑片段組合後發送請求 |

### `Object` 擴充

| 方法／屬性 | 說明 |
| --- | --- |
| `obj.forEach(cb)` | 為純物件加入類陣列迭代 |
| `obj.$keys` / `$values` / `$map` | 取得 keys／values／map 後結果 |
| `obj._(key, value, replace)` | 條件式屬性設定，預設不覆蓋既有值 |

### `URL` 擴充

| 方法／屬性 | 說明 |
| --- | --- |
| `url.$req(body, once)` | 完整 fetch 封裝，支援請求去重、FormData／JSON、預設 headers |
| `url._history(title)` / `__history(title)` | `pushState`／`replaceState` 封裝，同步更新 `document.title` |
| `url._query(obj)` / `__query(obj)` / `query_(keys)` / `query__()` | 鏈式新增／設定／移除／清空查詢字串，回傳新的 `URL` 實例 |

### `window` 擴充

| 方法 | 說明 |
| --- | --- |
| `_Listener({ svg, lazyload })` | 啟用 SVG 內嵌與圖片延遲載入的全域監聽器 |
| `$cookie(key)` / `_cookie(key, body, expire)` | 讀取／寫入 cookie，自動處理 JSON 序列化 |

***

©️ 2022 [邱敬幃 Pardn Chiu](https://www.linkedin.com/in/pardnchiu)
