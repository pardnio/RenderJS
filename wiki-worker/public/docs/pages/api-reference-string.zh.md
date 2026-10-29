# String 擴充

RenderJS 為 `String.prototype` 加入的方法與 getter：以標籤選擇器字串建構 DOM、元素查詢、JSON／HTML 工具與 URL 捷徑。

## String

原始碼：`src/prototype/String.ts`

| 方法／屬性 | 說明 |
| --- | --- |
| `"selector".RJS(body)` | 於符合選擇器的元素上啟動 `RJS` 實例；見 [核心概念](/zh/core-concepts) |
| `"tag.class#id"._(attrs, children)` | 依標籤選擇器字串建立真實 DOM 元素（含 SVG 命名空間偵測、`input`/`textarea` type/placeholder 解析、`lazyload` 屬性接線）；`.class` 片段在 class 列表中保留開頭的點（`"p.note"` 產生 `class=".note"`）|
| `"selector".$` | 取得符合的單一元素：開頭為 `#` 時以其餘字串走 `getElementById`，含 `.`、`[`、`]` 時走 `querySelector`，其餘先試 `getElementById` 再 fallback 到 `querySelector` |
| `"selector".$all` | 取得所有符合元素的陣列（`[...querySelectorAll(...)]`）|
| `"icon-a icon-b"._fa` | Getter，把第一個空格換成 `.` 後建構 `"i.icon-a.icon-b"._()`，產生 Font Awesome `<i>` 元素；與 `_` 相同，class 保留開頭的點（`<i class=".icon-a .icon-b">`）|
| `"str".$json` | 安全的 `JSON.parse(this)`；解析失敗時回傳 `undefined`（並記錄 log）|
| `"str".$$json` | `$json` 回傳值不是 `null`／`undefined` 時為 `true`（`"null".$$json` 為 `false`）|
| `"str".$html` | HTML 逸出 ` `、`<`、`>`、`"`、`'` |
| `"str".copy()` | 非同步；透過 `navigator.clipboard.writeText` 寫入剪貼簿 |
| `"str".$regexp(flags?, force?)` | 依字串建構 `RegExp`；`force: true` 會先逸出正則特殊字元 |
| `"str".$base64(mimeType)` | 將 data URL 字串第一個 `,` 之後的 base64 內容解碼為 `Blob` |
| `"str".$$(filter?)` | 正則測試、字串完全相等，或（無參數時）去除空白後非空的判斷 |
| `"url".$url` | `new URL(this)`，相對路徑時 fallback 為 `new URL(location.origin + this)` |
| `"url".$queryAll` | 解析後的 query string 物件（透過 `$url.$queryAll`）|
| `"url".$$200(isImg)` / `$req(body, once)` / `_history(title)` / `_query(obj)` / `__history(title)` / `__query(obj)` / `query_(keys)` / `query__()` | 轉發至下方 `URL` 對應的方法，套用於 `this.$url` |
| `"url".$img()` / `"url".$query()` | 有註冊轉發，但 `URL.prototype` 沒有 `$img` 或 `$query`（對應的是 `$image` 與 `$$query`），呼叫時拋出 `TypeError` |

## 範例

建立元素後，印出查詢、JSON、HTML 跳脫、查詢字串與 regex 輔助函式的結果。

```demo
<div id="box"></div>
<script>
    "box".$._child("p#note"._("built from a tag-selector string"));
    console.log("box".$.innerHTML);
    console.log("p.note"._().className);
    console.log('{"a":1}'.$json, '{"a":1}'.$$json);
    console.log("<b>&</b>".$html);
    console.log("https://renderjs.pardn.io/docs?page=2&lang=en".$queryAll);
    console.log("a.b".$regexp("g", true).source);
</script>
```
