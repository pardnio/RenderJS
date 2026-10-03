# renderjs - Architecture

> Back to [README](../README.md)

## Overview

```mermaid
graph TB
    S["script copyright attribute"] --> G[Init Gate]
    T[HTML Template] --> R[RJS Core]
    G --> R
    R --> D[Directive Parser]
    D --> O[Rendered DOM]
    P[Prototype Extensions] -.-> O
    L[Lazyload / SVG Listener] -.-> O
    C[data.ts constants and utilities] --> R
    C --> P
```

## Module: Init Gate

On load, the current script tag's `copyright` attribute decides whether `RJS` can recursively render child nodes.

```mermaid
graph TB
    subgraph Init_Gate
        Load[RenderJS.js loads] --> Check{"copyright is Pardn Ltd?"}
        Check -->|yes| SetInit["document.$init = location.href"]
        SetInit --> Log[Print copyright banner]
        Check -->|no| Remove[Remove own script tag]
    end
    SetInit --> Full[RJS renders child nodes recursively]
    Remove --> Root[RJS only processes root-node text]
```

## Module: RJS Core

The `RJS` class (`src/model/RJS.ts`) keeps a clone of the original template plus `data`/`event`/`when`, and drives the single render pass.

```mermaid
graph TB
    subgraph RJS_Core
        Entry["'#selector'.RJS(body)"] --> Find{Element found?}
        Find -->|no| Stop[Not initialized]
        Find -->|yes| Clone["cloneNode(true) stored as #model"]
        Clone --> Init["#init()"]
        Init --> Before["when.before_render()"]
        Before -->|returns false| Cancel[Render cancelled]
        Before -->|continue| SetDOM["#SET_DOM recursive walk"]
        SetDOM --> After["when.rendered()"]
        Renew["app.renew(body)"] --> Restore["replaceChildren(#model children)"]
        Restore --> Merge[Merge data / event / when]
        Merge --> Init
    end
    Body[data / event / when / listener] --> Entry
```

## Module: Directive Parser

`#SET_DOM` applies directives to each child element in a fixed order; `:path` and `:for` hand off to their own handlers and return early.

```mermaid
graph TB
    subgraph Directive_Parser
        Node[Child element] --> Pending{"Pending :else-if / :else?"}
        Pending -->|yes| Skip[Skipped this pass]
        Pending -->|no| PathCheck{":path?"}
        PathCheck -->|yes| SetPath["#setPath: fetch and inline fragment"]
        PathCheck -->|no| ForCheck{":for?"}
        ForCheck -->|yes| FitFor["#FIT_FOR: expand loop"]
        ForCheck -->|no| SetIf["#setIf: :if / :else-if / :else"]
        SetIf --> FitModel["#FIT_MODEL: two-way form binding"]
        FitModel --> FitAttr["#FIT_ATTRIBUTE: :[attr] / :[css]"]
        FitAttr --> FitEvent["#FIT_EVENT: @[event]"]
        FitEvent --> FitText["#FIT_TEXT: {{ }} interpolation"]
        FitText --> Recurse[Recurse into grandchildren]
    end
    FitText --> Helpers["CALC / LENGTH / UPPER / LOWER / DATE"]
```

## Module: Prototype Extensions

Each `src/prototype/*.ts` file extends the matching native prototype on load, with type declarations in `src/interface/*.ts`; the URL-related `String` methods delegate to the `URL` implementation.

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
    String ..> URL : proxies $req / query string
    Array ..> String : builds path then calls $req
    Element <|-- HTMLElement
```

## Module: Listener

`_Listener()` creates two global `IntersectionObserver` instances; `RJS` also hands matching nodes to them while rendering.

```mermaid
graph TB
    subgraph Listener
        Init["_Listener(options)"] --> Lazy[LazyloadListener]
        Init --> SVG[SVGListener]
        Lazy --> LazyScan["img[lazyload]"]
        LazyScan --> Probe["$$200(true) image probe"]
        Probe -->|ok| SetSrc[Set src]
        Probe -->|fail| Fallback[Set 404 image]
        SVG --> SVGScan["temp-svg[src]"]
        SVGScan --> Fetch["$$200() fetch SVG text"]
        Fetch -->|ok| Inline[Replace with svg element, keeping id / class / onclick]
        Fetch -->|fail| Mark["Show ☒"]
    end
    RJS["RJS #SET_DOM"] -.-> LazyScan
    RJS -.-> SVGScan
```

## Data Flow

```mermaid
sequenceDiagram
    participant Page
    participant RJS
    participant Parser as SET_DOM
    participant DOM
    Page->>RJS: RJS({ data, event, when })
    RJS->>RJS: cloneNode to keep the template
    RJS->>RJS: when.before_render()
    RJS->>Parser: Walk the root node
    Parser->>DOM: Apply directives and interpolation
    Parser-->>RJS: All children done
    RJS->>Page: when.rendered()
    DOM->>RJS: :model input writes back to data (no re-render)
```

***

©️ 2022 [邱敬幃 Pardn Chiu](https://www.linkedin.com/in/pardnchiu)
