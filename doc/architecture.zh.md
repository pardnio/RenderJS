# renderjs - 架構

> 返回 [README](./README.zh.md)

## 概覽

```mermaid
graph TB
    S["script copyright 屬性"] --> G[初始化閘門]
    T[HTML 模板] --> R[RJS 核心]
    G --> R
    R --> D[指令解析器]
    D --> O[渲染後 DOM]
    P[原型擴充] -.-> O
    L[延遲載入 / SVG 監聽器] -.-> O
    C[data.ts 常數與工具] --> R
    C --> P
```

## Module: 初始化閘門

載入時檢查目前 script 標籤的 `copyright` 屬性，決定 `RJS` 是否能遞迴渲染子節點。

```mermaid
graph TB
    subgraph 初始化閘門
        Load[RenderJS.js 載入] --> Check{"copyright 屬性為 Pardn Ltd？"}
        Check -->|是| SetInit["document.$init = location.href"]
        SetInit --> Log[輸出版權訊息]
        Check -->|否| Remove[移除自身 script 標籤]
    end
    SetInit --> Full[RJS 遞迴渲染子節點]
    Remove --> Root[RJS 僅處理根節點文字]
```

## Module: RJS 核心

`RJS` 類別（`src/model/RJS.ts`）保存原始模板的複本、`data`／`event`／`when`，並驅動單次渲染。

```mermaid
graph TB
    subgraph RJS核心
        Entry["'#selector'.RJS(body)"] --> Find{找得到元素？}
        Find -->|否| Stop[不初始化]
        Find -->|是| Clone["cloneNode(true) 存為 #model"]
        Clone --> Init["#init()"]
        Init --> Before["when.before_render()"]
        Before -->|回傳 false| Cancel[中止渲染]
        Before -->|繼續| SetDOM["#SET_DOM 遞迴走訪"]
        SetDOM --> After["when.rendered()"]
        Renew["app.renew(body)"] --> Restore["replaceChildren(#model 子節點)"]
        Restore --> Merge[合併 data / event / when]
        Merge --> Init
    end
    Body[data / event / when / listener] --> Entry
```

## Module: 指令解析器

`#SET_DOM` 依固定順序對每個子元素套用指令；`:path` 與 `:for` 交由專屬處理器後直接返回。

```mermaid
graph TB
    subgraph 指令解析器
        Node[子元素] --> Pending{"待定的 :else-if / :else？"}
        Pending -->|是| Skip[本輪略過]
        Pending -->|否| PathCheck{":path？"}
        PathCheck -->|是| SetPath["#setPath：fetch 片段並內嵌"]
        PathCheck -->|否| ForCheck{":for？"}
        ForCheck -->|是| FitFor["#FIT_FOR：展開迴圈"]
        ForCheck -->|否| SetIf["#setIf：:if / :else-if / :else"]
        SetIf --> FitModel["#FIT_MODEL：表單雙向綁定"]
        FitModel --> FitAttr["#FIT_ATTRIBUTE：:[attr] / :[css]"]
        FitAttr --> FitEvent["#FIT_EVENT：@[event]"]
        FitEvent --> FitText["#FIT_TEXT：{{ }} 插值"]
        FitText --> Recurse[遞迴處理孫節點]
    end
    FitText --> Helpers["CALC / LENGTH / UPPER / LOWER / DATE"]
```

## Module: 原型擴充

`src/prototype/*.ts` 載入時直接擴充對應的原生原型，`src/interface/*.ts` 提供型別宣告；`String` 的 URL 相關方法轉交 `URL` 實作。

```mermaid
classDiagram
    class String {
        +RJS(body) RJS
        +_(attrs, children) Element
        +$ Element
        +$all Element[]
        +$req(body, once) Promise
        +copy() void
    }
    class Element {
        +_child(value, before) Element
        +_class(list) Element
        +_click(fn) Element
        +$i number
        +$attributes object
    }
    class HTMLElement {
        +width(v) HTMLElement
        +padding(t, r, b, l) HTMLElement
        +scrollToY(value, animation) void
    }
    class Array {
        +$sum number
        +$shuffle Array
        +_(value, index) Array
        +$req(body) Promise
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
    String ..> URL : 代理 $req / 查詢字串
    Array ..> String : 組成路徑後呼叫 $req
    Element <|-- HTMLElement
```

## Module: 監聽器

`_Listener()` 建立兩個全域 `IntersectionObserver`；`RJS` 渲染時也會把符合條件的節點交給它們觀察。

```mermaid
graph TB
    subgraph 監聽器
        Init["_Listener(options)"] --> Lazy[LazyloadListener]
        Init --> SVG[SVGListener]
        Lazy --> LazyScan["img[lazyload]"]
        LazyScan --> Probe["$$200(true) 檢查圖片"]
        Probe -->|成功| SetSrc[設定 src]
        Probe -->|失敗| Fallback[設定 404 圖片]
        SVG --> SVGScan["temp-svg[src]"]
        SVGScan --> Fetch["$$200() 取得 SVG 文字"]
        Fetch -->|成功| Inline[以 svg 元素取代並保留 id / class / onclick]
        Fetch -->|失敗| Mark["顯示 ☒"]
    end
    RJS["RJS #SET_DOM"] -.-> LazyScan
    RJS -.-> SVGScan
```

## 資料流

```mermaid
sequenceDiagram
    participant Page as 頁面
    participant RJS
    participant Parser as SET_DOM
    participant DOM
    Page->>RJS: RJS({ data, event, when })
    RJS->>RJS: cloneNode 保存模板
    RJS->>RJS: when.before_render()
    RJS->>Parser: 走訪根節點
    Parser->>DOM: 套用指令與插值
    Parser-->>RJS: 全部子節點完成
    RJS->>Page: when.rendered()
    DOM->>RJS: :model 輸入寫回 data（不重新渲染）
```

***

©️ 2022 [邱敬幃 Pardn Chiu](https://www.linkedin.com/in/pardnchiu)
