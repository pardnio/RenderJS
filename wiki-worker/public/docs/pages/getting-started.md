# Getting Started

What RenderJS needs and the two ways to install it (npm or CDN).

## Prerequisites

- A modern browser with ES2022 support (`IntersectionObserver`, `navigator.clipboard`, `fetch`)
- Node.js (build/development only; no Node runtime dependency at execution time)
- No other runtime dependencies

## Installation

### Install via npm

```shell
npm i @pardnchiu/renderjs
```

### Include via CDN

```html
<!-- Version 2.0.0 and above -->
<script src="https://cdn.jsdelivr.net/npm/@pardnchiu/renderjs@[VERSION]/dist/RenderJS.js" copyright="Pardn Ltd"></script>

<!-- Version 1.x (formerly PDRenderKit) -->
<script src="https://cdn.jsdelivr.net/npm/pdrenderkit@[VERSION]/dist/PDRenderKit.js"></script>
```

> The `RJS` template engine requires `copyright="Pardn Ltd"`: without it the script tag removes itself and never sets the init flag (`document.$init`), so `RJS` only processes text on the root node and leaves every child directive and `{{ }}` unrendered. Prototype extensions and chainable DOM construction work either way.

## Next Steps

- [Building DOM Elements](/getting-started-dom): chainable DOM construction and element queries
- [First RJS Template](/getting-started-rjs): create an `RJS` instance and update it with `renew()`
- [Core Concepts](/core-concepts): the `RJS` instance lifecycle and its non-reactive design
- [API Reference](/api-reference): every prototype method RenderJS adds
- [Listener System](/listener-system): lazyload and SVG inlining internals
