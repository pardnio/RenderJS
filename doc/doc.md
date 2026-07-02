# RenderJS - Documentation

> Back to [README](../README.md)

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
<script src="https://cdn.jsdelivr.net/npm/@pardnchiu/renderjs@[VERSION]/dist/RenderJS.js"></script>

<!-- Version 1.5.2 and below (formerly PDRenderKit) -->
<script src="https://cdn.jsdelivr.net/npm/pdrenderkit@[VERSION]/dist/PDRenderKit.js"></script>
```

## Usage

### Basic: Chainable DOM construction

```javascript
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
        "img"._({ lazyload: "https://xxxxxx" }),
        "input@email type"._()
    ])
);

// Enable SVG inlining and image lazyload listeners
_Listener({
    svg: true,
    lazyload: true
});
```

### Basic: Element querying

```javascript
"test".$;          // document.getElementById("test")
"div.test".$;       // document.querySelector("div.test")
"div.test".$all;    // [...document.querySelectorAll("div.test")]
```

### Advanced: `RJS` template engine

`RJS` is a simplified rendering tool based on the [QuickUI](https://pardn.ltd/QuickUI) concept, designed for specific projects:

- Renders using non-vDOM technology, reducing complexity and improving performance.
- Removes automatic listening and updating, giving developers manual control over update timing.
- Introduces `renew()` to support precise updates of data and events.

```javascript
const app = "#app".RJS({
    data: {
        // Define data
    },
    event: {
        // Define event methods
    },
    when: {
        before_render: function () {
            // Runs before rendering; return false to cancel
        },
        rendered: function () {
            // Runs after rendering completes
        }
    }
});

// Update: only include the items to update; unmentioned items retain their initial values
app.renew({
    data: { /* ... */ },
    event: { /* ... */ },
    when: { /* ... */ }
});
```

### Advanced: Networking

```javascript
const result = await "/api/x".$req({
    method: "POST",
    json: { key: "value" },
    header: { "X-Token": "..." }
});
```

## API Reference

### RJS Template Directives

| Attribute | Description |
| --- | --- |
| `{{ value }}` | Inserts text into HTML tags and updates automatically with data changes; supports `CALC()`, `LENGTH()`, `UPPER()`, `LOWER()`, `DATE()` helpers |
| `:path` | Used with the `temp` tag to load HTML fragments from external files into the current page |
| `:html` | Replaces the element's `innerHTML` with text |
| `:for` | Supports `item in items`, `(item, index) in items`, `(key, value) in object` formats to iterate over data collections |
| `:if`<br>`:else-if` / `:el-if`<br>`:else` | Shows or hides elements based on a condition; supports `>`, `<`, `>=`, `<=`, `==`, `!=` comparison operators |
| `:model` | Binds data to form elements (e.g. `input`), updating data automatically when input changes |
| `:[attr]` | Sets element attributes, e.g. `:id`/`:class`/`:src`/`:alt`/`:href` |
| `:[css]` | Sets element CSS, e.g. `:background-color`/`:opacity`/`:margin`/`:top`/`:position` |
| `@[event]` | Adds an event listener that triggers the corresponding method in `event`, e.g. `@click`/`@input`/`@mousedown` |

### `RJS` Lifecycle

| Method | Description |
| --- | --- |
| `"#selector".RJS(body)` | Initializes an `RJS` instance on the matched element; `body` includes `data`/`event`/`when`/`listener` |
| `app.renew(body)` | Re-renders from the original template, merging in the updated `data`/`event`/`when` |
| `when.before_render()` | Runs before rendering; returning `false` cancels the render |
| `when.rendered()` | Runs after rendering completes (including any async `:path` loads) |

### `String` Extensions

| Method / Property | Description |
| --- | --- |
| `"selector".RJS(body)` | Starts `RJS` rendering on the matched element |
| `"tag.class#id"._(attrs, children)` | Builds a real DOM element from a tag-selector string (handles SVG namespace, `input`/`textarea` type parsing) |
| `"selector".$` | Gets a single matching element (`getElementById`/`querySelector`) |
| `"selector".$all` | Gets an array of all matching elements |
| `"url".$req(body)` | Sends a fetch request with JSON/FormData support, request de-duplication, and automatic response parsing |
| `"url".$$200(isImg)` | Checks whether a URL resolves successfully (with image content-type detection) |
| `"str".$json` / `"str".$$json` | Safe `JSON.parse` / valid-JSON check |
| `"str".$html` | HTML-escapes the string |
| `"str".copy()` | Writes the string to the clipboard |
| `"str".$base64(mimeType)` | Decodes a base64 string into a `Blob` |

### `Element` / `HTMLElement` Extensions

| Method / Property | Description |
| --- | --- |
| `el._child(value, before)` / `__child(value)` / `$child(value)` | Chainable append/replace/query of child elements by index or selector array |
| `el._class(list)` / `class_(list)` / `$$class(list)` / `$$class_(bool, list)` | Chainable add/remove/check/toggle of classList |
| `el.$i` | Index of the element among its siblings |
| `el.$attributes` | All attributes as a plain object |
| `el._click(fn)` (and every DOM event name) | Chainable `on<event>` handler assignment |
| `el.width(v)` / `height(v)` / `marginTop(v)` / `paddingLeft(v)` ... | Chainable numeric style setters, auto-appending `px` |
| `el.padding(t, r, b, l)` / `el.margin(...)` | CSS shorthand-style chainable setters |
| `el.scrollToX/Y(value, animation)`, `scrollToT/L/B/R(animation)` | Scrolls to a position/edge, with optional smooth animation |

### `Array` Extensions

| Method / Property | Description |
| --- | --- |
| `arr.$sum` | Sum of a numeric array |
| `arr.$shuffle` | In-place Fisher–Yates shuffle, returns `this` |
| `arr._(value, index)` / `$(index)` / `$_(index)` | Negative-index-aware insert/get/remove |
| `arr.$req(body)` | Treats the array as URL path segments and sends a request |

### `Object` Extensions

| Method / Property | Description |
| --- | --- |
| `obj.forEach(cb)` | Adds array-like iteration to plain objects |
| `obj.$keys` / `$values` / `$map` | Gets keys/values/mapped results |
| `obj._(key, value, replace)` | Conditional property setter; won't overwrite an existing value unless `replace` |

### `URL` Extensions

| Method / Property | Description |
| --- | --- |
| `url.$req(body, once)` | Full fetch wrapper with request de-duplication, FormData/JSON support, default headers |
| `url._history(title)` / `__history(title)` | `pushState`/`replaceState` wrappers that also update `document.title` |
| `url._query(obj)` / `__query(obj)` / `query_(keys)` / `query__()` | Chainable add/set/remove/clear of query string, returning a new `URL` instance |

### `window` Extensions

| Method | Description |
| --- | --- |
| `_Listener({ svg, lazyload })` | Enables the global SVG-inlining and image-lazyload listeners |
| `$cookie(key)` / `_cookie(key, body, expire)` | Reads/writes cookies with automatic JSON handling |

***

©️ 2022 [邱敬幃 Pardn Chiu](https://www.linkedin.com/in/pardnchiu)
