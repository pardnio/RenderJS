# 快速開始

安裝 RenderJS 所需的環境與兩種引入方式（npm、CDN）。

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
<script src="https://cdn.jsdelivr.net/npm/@pardnchiu/renderjs@[VERSION]/dist/RenderJS.js" copyright="Pardn Ltd"></script>

<!-- 1.x（舊名 PDRenderKit） -->
<script src="https://cdn.jsdelivr.net/npm/pdrenderkit@[VERSION]/dist/PDRenderKit.js"></script>
```

> `copyright="Pardn Ltd"` 是 `RJS` 模板引擎的必要屬性：缺少時 script 標籤會自行移除且不設定初始化旗標（`document.$init`），`RJS` 只處理根節點本身的文字，子節點的指令與 `{{ }}` 全部不渲染。原型擴充與鏈式 DOM 建構不受影響。

## 下一步

- [建構 DOM 元素](/zh/getting-started-dom)：鏈式 DOM 建構與元素查詢
- [第一個 RJS 模板](/zh/getting-started-rjs)：建立 `RJS` 實例並以 `renew()` 更新
- [核心概念](/zh/core-concepts)：`RJS` 的實例生命週期與非響應式設計
- [API 參考](/zh/api-reference)：RenderJS 加入的所有 prototype 方法
- [Listener 系統](/zh/listener-system)：lazyload 與 SVG 內嵌的內部運作
