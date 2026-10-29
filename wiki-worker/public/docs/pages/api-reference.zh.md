# API 參考

RenderJS 直接擴充原生建構子的 `.prototype`（`src/prototype/*.ts`），並非獨立 import 的模組。載入 bundle 後，以下所有方法即全域可用。

## 依擴充對象分頁

| 頁面 | 擴充對象 |
| --- | --- |
| [String 擴充](/zh/api-reference-string) | `String` |
| [Element 擴充](/zh/api-reference-element) | `Element` / `DocumentFragment` |
| [HTMLElement 與連結擴充](/zh/api-reference-html-element) | `HTMLElement` / `HTMLLinkElement` |
| [Array 與 Object 擴充](/zh/api-reference-array-object) | `Array` / `Object` |
| [Map 與表單資料擴充](/zh/api-reference-map-form) | `Map` / `FormData` / `HTMLFormElement` |
| [URL 擴充](/zh/api-reference-url) | `URL` |
| [全域函式](/zh/api-reference-window) | `window` |
| [Date 與 Number 擴充](/zh/api-reference-date-time) | `Date` / `Number` |
| [Image、File 與 Video 擴充](/zh/api-reference-media) | `Image` / `File` / `HTMLVideoElement` |

2.x 版移除的擴充與替代寫法列在[已移除 API](/zh/removed-api)。
