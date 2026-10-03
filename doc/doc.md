# renderjs - Documentation

> Back to [README](../README.md)

## Prerequisites

- A modern browser with ES2022 support (`IntersectionObserver`, `fetch`, `navigator.clipboard`)
- No runtime dependencies
- Node.js for development only (`terser` minifies `src/RenderJS.js`)

## Installation

### Install via npm

```shell
npm i @pardnchiu/renderjs
```

```html
<script src="./node_modules/@pardnchiu/renderjs/dist/RenderJS.js" copyright="Pardn Ltd"></script>
```

### Include via CDN

```html
<!-- Version 2.0.0 and above -->
<script src="https://cdn.jsdelivr.net/npm/@pardnchiu/renderjs@[VERSION]/dist/RenderJS.js" copyright="Pardn Ltd"></script>

<!-- Version 1.x (formerly PDRenderKit) -->
<script src="https://cdn.jsdelivr.net/npm/pdrenderkit@[VERSION]/dist/PDRenderKit.js"></script>
```

> The `RJS` template engine requires `copyright="Pardn Ltd"`: without it the script tag removes itself and never sets the init flag (`document.$init`), so `RJS` only processes text on the root node and leaves every child directive and `{{ }}` unrendered. Prototype extensions and chainable DOM construction work either way.

### Build from Source

```shell
git clone https://github.com/pardnchiu/renderjs.git
cd renderjs
npm i
npm run minify
```

`npm run minify` uses `terser` to minify `src/RenderJS.js` into `dist/RenderJS.js`; `npm run minify-w` watches the file and re-minifies on change.

## Usage

### Basic: Chainable DOM Construction

`"tag.class#id"._(attrs, children)` builds a real DOM element from a tag-selector string; `"input@email type"` resolves to `type="email"` with `placeholder="type"`.

```html
<!doctype html>
<html>
<head>
    <script src="https://cdn.jsdelivr.net/npm/@pardnchiu/renderjs@2.0.3/dist/RenderJS.js" copyright="Pardn Ltd"></script>
</head>
<body>
    <script>
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
                "input@email type"._()
            ])
        );
    </script>
</body>
</html>
```

### Basic: Element Querying

```javascript
"test".$;          // document.getElementById("test")
"div.test".$;      // document.querySelector("div.test")
"div.test".$all;   // [...document.querySelectorAll("div.test")]
```

### Advanced: `RJS` Template Engine

`RJS` renders a template into the DOM in a single pass, with no virtual-DOM diffing and no data watching; writes from `:model` back into `data` do not trigger a re-render.

```html
<!doctype html>
<html>
<head>
    <script src="https://cdn.jsdelivr.net/npm/@pardnchiu/renderjs@2.0.3/dist/RenderJS.js" copyright="Pardn Ltd"></script>
</head>
<body>
    <div id="app">
        <h3>{{ UPPER(title) }}</h3>
        <p :if="score >= 60">Pass: {{ score }}</p>
        <p :else>Fail: {{ score }}</p>
        <a :href="link" :color="color">{{ LENGTH(tags) }} tags</a>
        <input :model="name" placeholder="Type a name">
        <button @click="show">Show data</button>
        <pre id="out"></pre>
    </div>
    <script>
        const app = "#app".RJS({
            data: {
                title: "renderjs",
                score: 75,
                link: "https://github.com/pardnchiu/renderjs",
                color: "steelblue",
                tags: ["dom", "template"],
                name: ""
            },
            event: {
                show: function () {
                    "out".$.textContent = JSON.stringify(app.data);
                }
            },
            when: {
                before_render: function () {
                    // Return false to cancel the render
                    return true;
                },
                rendered: function () {
                    console.log("rendered");
                }
            }
        });
    </script>
</body>
</html>
```

> Known issues in 2.0.3: `:for` outputs the literal text `[object DocumentFragment]` (`Element._child` only accepts `Element`, so the `DocumentFragment` becomes a text node); after `renew()` the template no longer renders (the template's child nodes are moved instead of cloned); when `:if` removes a node an unhandled `TypeError` is thrown even though the output is correct; `{{ }}` stays unrendered when the root element has no direct text node (children written back to back with no whitespace); `"p.note"._()` gets the class `.note` with the dot kept; `window.$`, `$all`, `$cookie`, and `_cookie` return early for every non-empty input.

### Advanced: Networking

`$req` rejects with the response text on 4xx/5xx and parses the body automatically when `Content-Type` is JSON.

```javascript
try {
    const result = await "/api/x".$req({
        method: "POST",
        json: { key: "value" },
        header: { "X-Token": "..." }
    });
    console.log(result);
} catch (err) {
    console.error(err);
}
```

### Advanced: Image Lazyload and SVG Inlining

```html
<img lazyload="/image.png" width="160">
<temp-svg src="/icon.svg"></temp-svg>

<script>
    // Without arguments, enables both lazyload and SVG inlining
    _Listener();
</script>
```

> Known issue in 2.0.3: `_Listener({ svg: true })` actually enables lazyload and `_Listener({ lazyload: true })` enables SVG inlining; call `_Listener()` without arguments when you need both.

## API Reference

### `RJS` Template Directives

| Directive | Description |
| --- | --- |
| `{{ key.path }}` | Substitutes the dot-path value from `data` into text at render time, keeping surrounding literal text |
| `{{ CALC(a + n) }}` | Arithmetic with `+ - * / %` |
| `{{ LENGTH(key) }}` | Key count for plain objects, `.length` otherwise |
| `{{ UPPER(key) }}` / `{{ LOWER(key) }}` | Uppercase / lowercase |
| `{{ DATE(key, format) }}` | Formats a Unix timestamp (seconds), e.g. `YYYY-MM-DD` |
| `:path` | Fetches an external HTML fragment that replaces the element; scripts in the fragment are executed |
| `:html` | Replaces the element's `innerHTML` with the value |
| `:for` | `item in items`, `(item, index) in items`, `(key, value) in object` |
| `:if`<br>`:else-if` / `:el-if`<br>`:else` | Evaluates conditions in order and keeps only the first match; supports `>`, `<`, `>=`, `<=`, `==`, `!=`, with `==`/`!=` matching `null`, `true`, `false`, and `empty` |
| `:model` | Two-way form binding: checkbox/radio joins checked values with `,`, `select` listens on `change`, `input`/`textarea` listen on `keyup` and `change` |
| `:[attr]` | Sets an attribute; `:class` goes through `_class()`, `:id`/`:src`/`:alt`/`:href` map to the DOM property |
| `:[css]` | Treated as a style when the name exists on `element.style`, e.g. `:color`, `:opacity` |
| `@[event]` | Binds the same-named method in `event`, e.g. `@click`, `@input` |

### `RJS` Lifecycle

| Method | Description |
| --- | --- |
| `"#selector".RJS(body)` | Creates an instance on the matched element; `body` takes `data`/`event`/`when`/`listener`; nothing initializes when no element matches |
| `app.renew(body)` | Re-renders from the original template, merging the given `data`/`event`/`when` (known issue in 2.0.3, see above) |
| `app.data` / `app.event` | The instance's current data and events |
| `when.before_render()` | Runs before rendering; returning `false` cancels the render |
| `when.rendered()` | Runs after rendering completes (including async `:path` loads) |

### `String` Extensions

| Method / Property | Description |
| --- | --- |
| `"selector".RJS(body)` | Starts `RJS` on the matched element |
| `"tag.class#id"._(attrs, children)` | Builds a real DOM element (handles SVG namespace and `input`/`textarea` type parsing) |
| `"selector".$` / `"selector".$all` | Gets a single element / an array of all matches |
| `"url".$req(body, once)` | Same as `URL.$req` |
| `"url".$$200(isImg)` | Checks whether a URL resolves successfully (with image content-type detection) |
| `"str".$json` / `"str".$$json` | Safe `JSON.parse` / valid-JSON check |
| `"str".$html` | HTML-escapes the string |
| `"str".copy()` | Writes the string to the clipboard |
| `"str".$base64(mimeType)` | Decodes a base64 string into a `Blob` |
| `"url"._query(obj)` etc. | Converts to `URL` and proxies every `URL` query-string/history method |

### `Element` / `HTMLElement` Extensions

| Method / Property | Description |
| --- | --- |
| `el._child(value, before)` / `__child(value)` / `$child(value)` | Appends / replaces / queries child elements |
| `el._class(list)` / `class_(list)` / `$$class(list)` / `$$class_(bool, list)` | Adds / removes / checks / toggles classes |
| `el.$i` | Index among sibling elements |
| `el.$attributes` | All attributes as a plain object |
| `el._click(fn)` (and every DOM event name) | Chainable `on<event>` assignment |
| `el.width(v)` / `height(v)` / `marginTop(v)` / `paddingLeft(v)` ... | Style setters that append `px` to numbers |
| `el.padding(t, r, b, l)` / `el.margin(...)` | CSS shorthand-style setters |
| `el.scrollToX/Y(value, animation)` / `scrollToT/L/B/R(animation)` | Scrolls to a position or edge, with optional smooth animation |

### `Array` Extensions

| Method / Property | Description |
| --- | --- |
| `arr.$sum` | Sum of numeric values |
| `arr.$shuffle` | In-place Fisher–Yates shuffle, returns `this` |
| `arr._(value, index)` / `$(index)` / `$_(index)` | Negative-index-aware insert / get / remove |
| `arr.$req(body)` | Joins the elements into a URL path and sends a request |

### `Object` Extensions

| Method / Property | Description |
| --- | --- |
| `obj.forEach(cb)` | Iteration for plain objects |
| `obj.$keys` / `$values` / `$map` | Keys / values / mapped results |
| `obj._(key, value, replace)` | Conditional setter; does not overwrite an existing value unless `replace` is true |

### `URL` Extensions

| Method | Description |
| --- | --- |
| `url.$req(body, once)` | `fetch` wrapper; `body` takes `method`, `header`, `json`, `files` + `tag` (FormData), and `credentials`; with `once`, a URL already in flight is not sent again |
| `url._history(title)` / `__history(title)` | `pushState` / `replaceState` that also update `document.title` |
| `url._query(obj)` / `__query(obj)` / `query_(keys)` / `query__()` | Adds / sets / removes / clears the query string, returning a new `URL` |

### `window` Extensions

| Method | Description |
| --- | --- |
| `_Listener(options)` | Enables the global SVG-inlining and image-lazyload listeners (both when called without arguments) |
| `$cookie(key)` / `_cookie(key, body, expire)` | Reads / writes cookies with automatic JSON handling |

***

©️ 2022 [邱敬幃 Pardn Chiu](https://www.linkedin.com/in/pardnchiu)
