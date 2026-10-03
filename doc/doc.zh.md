# renderjs - 技術文件

> 返回 [README](./README.zh.md)

## 前置需求

- 支援 ES2022 的現代瀏覽器（需 `IntersectionObserver`、`fetch`、`navigator.clipboard`）
- 無任何執行期相依套件
- Node.js 僅在開發時需要（以 `terser` 壓縮 `src/RenderJS.js`）

## 安裝

### 透過 npm

```shell
npm i @pardnchiu/renderjs
```

```html
<script src="./node_modules/@pardnchiu/renderjs/dist/RenderJS.js" copyright="Pardn Ltd"></script>
```

### 透過 CDN

```html
<!-- 2.0.0 以上 -->
<script src="https://cdn.jsdelivr.net/npm/@pardnchiu/renderjs@[VERSION]/dist/RenderJS.js" copyright="Pardn Ltd"></script>

<!-- 1.x（舊名 PDRenderKit） -->
<script src="https://cdn.jsdelivr.net/npm/pdrenderkit@[VERSION]/dist/PDRenderKit.js"></script>
```

> `copyright="Pardn Ltd"` 是 `RJS` 模板引擎的必要屬性：缺少時 script 標籤會自行移除且不設定初始化旗標（`document.$init`），`RJS` 只處理根節點本身的文字，子節點的指令與 `{{ }}` 全部不渲染。原型擴充與鏈式 DOM 建構不受影響。

### 從原始碼建置

```shell
git clone https://github.com/pardnchiu/renderjs.git
cd renderjs
npm i
npm run minify
```

`npm run minify` 以 `terser` 將 `src/RenderJS.js` 壓縮輸出至 `dist/RenderJS.js`；`npm run minify-w` 監看檔案變動自動重新壓縮。

## 使用方式

### 基礎：鏈式 DOM 建構

`"tag.class#id"._(attrs, children)` 依標籤選擇器字串建立真實 DOM 元素；`"input@email type"` 解析為 `type="email"` 並帶入 `placeholder="type"`。

```html
<!doctype html>
<html>
<head>
    <script src="https://cdn.jsdelivr.net/npm/@pardnchiu/renderjs@2.0.3/dist/RenderJS.js" copyright="Pardn Ltd"></script>
</head>
<body>
    <script>
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
                "input@email type"._()
            ])
        );
    </script>
</body>
</html>
```

### 基礎：元素查詢

```javascript
"test".$;          // document.getElementById("test")
"div.test".$;      // document.querySelector("div.test")
"div.test".$all;   // [...document.querySelectorAll("div.test")]
```

### 進階：`RJS` 模板引擎

`RJS` 單次將模板渲染進 DOM，不做虛擬 DOM 比對，也不監聽資料變動；`:model` 寫回 `data` 後不會觸發重新渲染。

```html
<!doctype html>
<html>
<head>
    <script src="https://cdn.jsdelivr.net/npm/@pardnchiu/renderjs@2.0.3/dist/RenderJS.js" copyright="Pardn Ltd"></script>
</head>
<body>
    <div id="app">
        <h3>{{ UPPER(title) }}</h3>
        <p :if="score >= 60">Pass: {{ score }}</p>
        <p :else>Fail: {{ score }}</p>
        <a :href="link" :color="color">{{ LENGTH(tags) }} tags</a>
        <input :model="name" placeholder="Type a name">
        <button @click="show">Show data</button>
        <pre id="out"></pre>
    </div>
    <script>
        const app = "#app".RJS({
            data: {
                title: "renderjs",
                score: 75,
                link: "https://github.com/pardnchiu/renderjs",
                color: "steelblue",
                tags: ["dom", "template"],
                name: ""
            },
            event: {
                show: function () {
                    "out".$.textContent = JSON.stringify(app.data);
                }
            },
            when: {
                before_render: function () {
                    // 回傳 false 可中止渲染
                    return true;
                },
                rendered: function () {
                    console.log("rendered");
                }
            }
        });
    </script>
</body>
</html>
```

> 2.0.3 已知問題：`:for` 會輸出字面文字 `[object DocumentFragment]`（`Element._child` 只接受 `Element`，`DocumentFragment` 被轉成文字節點）；`renew()` 呼叫後模板不再渲染（模板子節點被直接搬移而非複製）；`:if` 移除節點時會丟出未處理的 `TypeError`，但輸出結果正確；根元素底下沒有任何文字節點（子元素之間完全沒有空白）時 `{{ }}` 不渲染；`"p.note"._()` 的 class 會保留點號成為 `.note`；`window.$`、`$all`、`$cookie`、`_cookie` 對任何非空輸入都提前返回。

### 進階：網路請求

`$req` 在 4xx／5xx 時以回應文字 reject，`Content-Type` 為 JSON 時自動解析。

```javascript
try {
    const result = await "/api/x".$req({
        method: "POST",
        json: { key: "value" },
        header: { "X-Token": "..." }
    });
    console.log(result);
} catch (err) {
    console.error(err);
}
```

### 進階：圖片延遲載入與 SVG 內嵌

```html
<img lazyload="/image.png" width="160">
<temp-svg src="/icon.svg"></temp-svg>

<script>
    // 不帶參數同時啟用延遲載入與 SVG 內嵌
    _Listener();
</script>
```

> 2.0.3 已知問題：`_Listener({ svg: true })` 實際啟用的是延遲載入，`_Listener({ lazyload: true })` 啟用的是 SVG 內嵌；需要兩者時改用不帶參數的 `_Listener()`。

## API 參考

### `RJS` 模板指令

| 指令 | 說明 |
| --- | --- |
| `{{ key.path }}` | 渲染時以 dot-path 取 `data` 值代入文字；保留前後字面文字 |
| `{{ CALC(a + n) }}` | 算術運算，支援 `+ - * / %` |
| `{{ LENGTH(key) }}` | 純物件為 key 數量，其餘為 `.length` |
| `{{ UPPER(key) }}` / `{{ LOWER(key) }}` | 轉大寫／小寫 |
| `{{ DATE(key, format) }}` | 將 Unix timestamp（秒）依格式輸出，例：`YYYY-MM-DD` |
| `:path` | 以 `fetch` 載入外部 HTML 片段取代該元素，片段內的 script 會被執行 |
| `:html` | 以值取代元素的 `innerHTML` |
| `:for` | `item in items`、`(item, index) in items`、`(key, value) in object` |
| `:if`<br>`:else-if` / `:el-if`<br>`:else` | 依序評估條件，只保留第一個成立的元素；支援 `>`、`<`、`>=`、`<=`、`==`、`!=`，`==`／`!=` 可比對 `null`、`true`、`false`、`empty` |
| `:model` | 表單雙向綁定：checkbox／radio 以 `,` 串接選取值，`select` 監聽 `change`，`input`／`textarea` 監聽 `keyup` 與 `change` |
| `:[attr]` | 設定屬性；`:class` 走 `_class()`，`:id`／`:src`／`:alt`／`:href` 直接對應 DOM 屬性 |
| `:[css]` | 名稱存在於 `element.style` 時視為樣式，例：`:color`、`:opacity` |
| `@[event]` | 綁定 `event` 內同名方法，例：`@click`、`@input` |

### `RJS` 生命週期

| 方法 | 說明 |
| --- | --- |
| `"#selector".RJS(body)` | 於選取元素建立實例；`body` 含 `data`／`event`／`when`／`listener`；選取不到元素時不初始化 |
| `app.renew(body)` | 以原始模板重新渲染並合併傳入的 `data`／`event`／`when`（2.0.3 有已知問題，見上） |
| `app.data` / `app.event` | 實例目前的資料與事件 |
| `when.before_render()` | 渲染前執行；回傳 `false` 中止渲染 |
| `when.rendered()` | 渲染完成後執行（含非同步 `:path` 載入） |

### `String` 擴充

| 方法／屬性 | 說明 |
| --- | --- |
| `"selector".RJS(body)` | 於選取元素啟動 `RJS` |
| `"tag.class#id"._(attrs, children)` | 建立真實 DOM 元素（處理 SVG 命名空間與 `input`／`textarea` 型別解析） |
| `"selector".$` / `"selector".$all` | 取得單一元素／所有元素陣列 |
| `"url".$req(body, once)` | 同 `URL.$req` |
| `"url".$$200(isImg)` | 檢查 URL 是否可成功取得（可偵測圖片 content-type） |
| `"str".$json` / `"str".$$json` | 安全 `JSON.parse`／是否為合法 JSON |
| `"str".$html` | HTML 跳脫 |
| `"str".copy()` | 寫入剪貼簿 |
| `"str".$base64(mimeType)` | 將 base64 字串解碼為 `Blob` |
| `"url"._query(obj)` 等 | 轉為 `URL` 後代理所有 `URL` 查詢字串／history 方法 |

### `Element` / `HTMLElement` 擴充

| 方法／屬性 | 說明 |
| --- | --- |
| `el._child(value, before)` / `__child(value)` / `$child(value)` | 新增／取代／查詢子元素 |
| `el._class(list)` / `class_(list)` / `$$class(list)` / `$$class_(bool, list)` | 新增／移除／檢查／切換 class |
| `el.$i` | 在兄弟元素中的索引 |
| `el.$attributes` | 所有屬性組成的物件 |
| `el._click(fn)`（及所有 DOM 事件名） | 串接式指定 `on<event>` |
| `el.width(v)` / `height(v)` / `marginTop(v)` / `paddingLeft(v)` ... | 數值自動補 `px` 的樣式設定 |
| `el.padding(t, r, b, l)` / `el.margin(...)` | CSS 簡寫式設定 |
| `el.scrollToX/Y(value, animation)` / `scrollToT/L/B/R(animation)` | 捲動至位置或邊緣，可選平滑動畫 |

### `Array` 擴充

| 方法／屬性 | 說明 |
| --- | --- |
| `arr.$sum` | 數值總和 |
| `arr.$shuffle` | 原地 Fisher–Yates 洗牌，回傳 `this` |
| `arr._(value, index)` / `$(index)` / `$_(index)` | 支援負索引的插入／取值／移除 |
| `arr.$req(body)` | 以陣列元素組成 URL 路徑後送出請求 |

### `Object` 擴充

| 方法／屬性 | 說明 |
| --- | --- |
| `obj.forEach(cb)` | 純物件的迭代 |
| `obj.$keys` / `$values` / `$map` | 取得 key／value／映射結果 |
| `obj._(key, value, replace)` | 條件設值；`replace` 為 false 時不覆寫既有值 |

### `URL` 擴充

| 方法 | 說明 |
| --- | --- |
| `url.$req(body, once)` | `fetch` 包裝；`body` 支援 `method`、`header`、`json`、`files` + `tag`（FormData）、`credentials`；`once` 為 true 時同一 URL 請求中不重複送出 |
| `url._history(title)` / `__history(title)` | `pushState`／`replaceState` 並同步 `document.title` |
| `url._query(obj)` / `__query(obj)` / `query_(keys)` / `query__()` | 新增／設定／移除／清空查詢字串，回傳新的 `URL` |

### `window` 擴充

| 方法 | 說明 |
| --- | --- |
| `_Listener(options)` | 啟用全域 SVG 內嵌與圖片延遲載入監聽器（不帶參數時兩者皆啟用） |
| `$cookie(key)` / `_cookie(key, body, expire)` | 讀寫 Cookie，自動處理 JSON |

***

©️ 2022 [邱敬幃 Pardn Chiu](https://www.linkedin.com/in/pardnchiu)
