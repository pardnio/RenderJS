# URL 擴充

RenderJS 為 `URL.prototype` 加入的請求、瀏覽紀錄與 query string 方法。

## URL

原始碼：`src/prototype/URL.ts`

| 方法／屬性 | 說明 |
| --- | --- |
| `url.$queryAll` | 解析後的 query string 物件 |
| `url.$image` | 回傳預先載入該 URL 圖片的 Promise |
| `url.$$200(isImg = false)` | fetch 該 URL；若回應為圖片，轉換為 object-URL blob（`{ src, img }`），除非是 SVG 且 `isImg` 為假 |
| `url.$req(body, once = false)` | fetch 封裝：`method`（預設 `GET`）、`header`，`credentials: true` 時為 `"include"`（否則 `"same-origin"`）；`body.json` 以 JSON 送出，搭配 `body.files` + `body.tag` 時改為 `FormData`（JSON 鍵附加為欄位）；沒有 `body.files` 時一律加上 `Content-Type: application/json`；依回應 `Content-Type` 以解析後的 JSON 或文字 resolve；4xx/5xx 時以回應文字 reject。`once: true` 時，若同一 URL 仍在請求中（記錄於共用 `Map`），這次呼叫回傳的 Promise 永遠不會 settle；`body: null` 時回傳 `undefined` |
| `url.$$query(key)` | `searchParams.get(key)` |
| `url._history(title?)` | 對此 URL 執行 `pushState`，記錄至記憶體中的歷史堆疊，可選擇同步設定 `document.title` |
| `url._query(obj)` | 回傳一個**新** `URL`，將 `obj` 的鍵合併進現有 query string |
| `url.__history(title?)` | 對此 URL 執行 `replaceState`（同步更新歷史堆疊）|
| `url.__query(obj)` | 回傳一個**新** `URL`，query string 整個由 `obj` 取代 |
| `url.query_(keys)` | 回傳一個**新** `URL`，移除指定的鍵（單一或陣列）|
| `url.query__()` | 回傳一個**新** `URL`，query string 已清空 |

## 範例

查詢字串方法回傳新的 `URL`；`$req` 依 `Content-Type` 解析回應，4xx／5xx 時以回應文字 reject。預覽在 `location.origin` 為 `null` 的 `about:srcdoc` 框架中執行，因此以 `document.baseURI` 解析路徑；一般頁面直接寫 `"/llms.txt".$req()` 即可。

```demo
<script>
    const url = new URL("https://renderjs.pardn.io/docs?page=2&lang=en");
    console.log(url.$queryAll, url.$$query("page"));
    console.log(url._query({ sort: "asc" }).href);
    console.log(url.__query({ q: "dom" }).href);
    console.log(url.query_("lang").href);
    console.log(url.query__().href);

    new URL("/llms.txt", document.baseURI).$req()
        .then((text) => console.log(text.split("\n")[0]))
        .catch((err) => console.error(err));

    new URL("/llms.txt", document.baseURI).$req({
        method: "POST",
        json: { key: "value" },
        header: { "X-Token": "..." }
    }).catch((err) => console.error("rejected:", String(err).length, "chars of response text"));
</script>
```
