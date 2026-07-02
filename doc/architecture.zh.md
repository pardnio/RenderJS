# RenderJS - 架構

> 返回 [README](./README.zh.md)

## 概覽

```mermaid
graph TB
    A[HTML 模板 / DOM 節點] --> B[RJS 核心]
    B --> C[指令解析器]
    C --> D[渲染後的 DOM]
    E[Prototype 擴充模組] -.鏈式方法.-> D
    F[Lazyload / SVG Listener] -.IntersectionObserver.-> D
    G[data.ts 常數與工具] --> B
    G --> E
```

## Module: RJS 核心

`RJS` 類別（`src/model/RJS.ts`）為每個渲染實例的容器，負責保存原始 DOM 模板的複本、生命週期回呼與資料/事件定義，並驅動指令解析流程。

```mermaid
graph TB
    subgraph RJS_Core
        Entry["#selector.RJS(body)"] --> Ctor[建構子: 查找節點並 cloneNode]
        Ctor --> Init["#init()"]
        Init --> Before[when.before_render]
        Before -->|false| Cancel[中止渲染]
        Before -->|繼續| SetDOM["#SET_DOM 遞迴走訪"]
        SetDOM --> After[when.rendered]
        Renew[app.renew body] --> Ctor
    end
    Model[data/event/when] --> Ctor
```

## Module: 指令解析器

`#SET_DOM` 針對每個節點依序套用模板指令；`:for`／`:if` 支援巢狀，`{{ }}` 內可呼叫輔助函式。

```mermaid
graph TB
    subgraph Directive_Parser
        Node[目前節點] --> Path[":path 非同步載入片段"]
        Path --> For[":for 迴圈展開"]
        For --> If[":if / :else-if / :else 條件判斷"]
        If --> Model_[":model 表單雙向綁定"]
        Model_ --> Attr[":[attr] / :[css] 屬性與樣式綁定"]
        Attr --> Event["@[event] 事件綁定"]
        Event --> Interp["{{ }} 文字插值 (CALC/LENGTH/UPPER/LOWER/DATE)"]
    end
```

## Module: Prototype 擴充

各 `src/prototype/*.ts` 檔案在載入時直接擴充對應的原生 prototype，`src/interface/*.ts` 提供對應的 TypeScript 型別宣告。

```mermaid
classDiagram
    class String {
        +RJS(body) RJS
        +_(attrs, children) Element
        +$ Element
        +$all Element[]
        +$req(body) Promise
        +copy() void
    }
    class Element {
        +_child(value, before) Element
        +_class(list) Element
        +$i number
        +$attributes object
    }
    class Array {
        +$sum number
        +$shuffle Array
        +_(value, index) Array
    }
    class Object {
        +forEach(cb) void
        +$keys Array
        +_(key, value, replace) Object
    }
    class URL {
        +$req(body, once) Promise
        +_history(title) URL
        +_query(obj) URL
    }
    class window {
        +_Listener(options) void
        +$cookie(key) any
        +_cookie(key, body, expire) void
    }
```

## Module: Listener

`_Listener({ svg, lazyload })` 建立全域的 `IntersectionObserver` 監聽器，分別交由 `SVGListener` 與 `LazyloadListener` 處理進入視窗範圍的元素。

```mermaid
graph TB
    subgraph Listener
        Init[_Listener options] --> SVGObs["SVGListener (IntersectionObserver)"]
        Init --> LazyObs["LazyloadListener (IntersectionObserver)"]
        SVGObs --> ReplaceSVG[span.svg → 內嵌 svg 標籤]
        LazyObs --> LoadImg[img data-src → src 載入]
    end
```

***

©️ 2022 [邱敬幃 Pardn Chiu](https://www.linkedin.com/in/pardnchiu)
