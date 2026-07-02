# RenderJS - Architecture

> Back to [README](../README.md)

## Overview

```mermaid
graph TB
    A[HTML Template / DOM Node] --> B[RJS Core]
    B --> C[Directive Parser]
    C --> D[Rendered DOM]
    E[Prototype Extensions] -.chainable methods.-> D
    F[Lazyload / SVG Listener] -.IntersectionObserver.-> D
    G[data.ts constants and utilities] --> B
    G --> E
```

## Module: RJS Core

The `RJS` class (`src/model/RJS.ts`) is the container for each render instance. It holds a clone of the original DOM template, lifecycle callbacks, and data/event definitions, and drives the directive-parsing pass.

```mermaid
graph TB
    subgraph RJS_Core
        Entry["#selector.RJS(body)"] --> Ctor[Constructor: locate node and cloneNode]
        Ctor --> Init["#init()"]
        Init --> Before[when.before_render]
        Before -->|false| Cancel[Render cancelled]
        Before -->|continue| SetDOM["#SET_DOM recursive walk"]
        SetDOM --> After[when.rendered]
        Renew[app.renew body] --> Ctor
    end
    Model[data/event/when] --> Ctor
```

## Module: Directive Parser

`#SET_DOM` applies template directives to each node in order; `:for`/`:if` support nesting, and `{{ }}` interpolation can invoke helper functions.

```mermaid
graph TB
    subgraph Directive_Parser
        Node[Current Node] --> Path[":path async fragment load"]
        Path --> For[":for loop expansion"]
        For --> If[":if / :else-if / :else conditional"]
        If --> Model_[":model two-way form binding"]
        Model_ --> Attr[":[attr] / :[css] attribute and style binding"]
        Attr --> Event["@[event] event binding"]
        Event --> Interp["{{ }} text interpolation (CALC/LENGTH/UPPER/LOWER/DATE)"]
    end
```

## Module: Prototype Extensions

Each `src/prototype/*.ts` file extends the corresponding native prototype directly on load; `src/interface/*.ts` provides the matching TypeScript type declarations.

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

`_Listener({ svg, lazyload })` sets up global `IntersectionObserver` listeners, delegating to `SVGListener` and `LazyloadListener` for elements entering the viewport.

```mermaid
graph TB
    subgraph Listener
        Init[_Listener options] --> SVGObs["SVGListener (IntersectionObserver)"]
        Init --> LazyObs["LazyloadListener (IntersectionObserver)"]
        SVGObs --> ReplaceSVG[span.svg → inlined svg tag]
        LazyObs --> LoadImg[img data-src → src loaded]
    end
```

***

©️ 2022 [邱敬幃 Pardn Chiu](https://www.linkedin.com/in/pardnchiu)
