# String Extensions

Methods and getters RenderJS adds to `String.prototype`: DOM construction from tag-selector strings, element queries, JSON and HTML helpers, and URL shortcuts.

## String

Source: `src/prototype/String.ts`

| Method / Property | Description |
| --- | --- |
| `"selector".RJS(body)` | Starts an `RJS` instance on the matched element; see [Core Concepts](/core-concepts) |
| `"tag.class#id"._(attrs, children)` | Builds a real DOM element from a tag-selector string (SVG namespace detection, `input`/`textarea` type/placeholder parsing, `lazyload` attribute wiring); `.class` segments keep their leading dot in the class list (`"p.note"` gives `class=".note"`) |
| `"selector".$` | Single matching element: a leading `#` uses `getElementById` on the rest, a string containing `.`, `[` or `]` uses `querySelector`, anything else tries `getElementById` and falls back to `querySelector` |
| `"selector".$all` | Array of all matching elements (`[...querySelectorAll(...)]`) |
| `"icon-a icon-b"._fa` | Getter that turns the first space into `.` and builds `"i.icon-a.icon-b"._()`, a Font Awesome `<i>` element; like `_`, the classes keep their leading dot (`<i class=".icon-a .icon-b">`) |
| `"str".$json` | Safe `JSON.parse(this)`; returns `undefined` (and logs) on parse failure |
| `"str".$$json` | `true` when `$json` returns something other than `null`/`undefined` (`"null".$$json` is `false`) |
| `"str".$html` | HTML-escapes ` `, `<`, `>`, `"`, `'` |
| `"str".copy()` | Async; writes the string to the clipboard via `navigator.clipboard.writeText` |
| `"str".$regexp(flags?, force?)` | Builds a `RegExp` from the string; `force: true` escapes regex metacharacters first |
| `"str".$base64(mimeType)` | Decodes the base64 part after the first `,` of a data-URL string into a `Blob` |
| `"str".$$(filter?)` | `RegExp` test, exact-string match, or (no argument) non-empty-after-trim check |
| `"url".$url` | `new URL(this)`, falling back to `new URL(location.origin + this)` for relative paths |
| `"url".$queryAll` | Query string parsed into a plain object (via `$url.$queryAll`) |
| `"url".$$200(isImg)` / `$req(body, once)` / `_history(title)` / `_query(obj)` / `__history(title)` / `__query(obj)` / `query_(keys)` / `query__()` | Forwarded to the equivalent `URL` method below, applied to `this.$url` |
| `"url".$img()` / `"url".$query()` | Registered as forwarders, but `URL.prototype` has no `$img` or `$query` (its getters are `$image` and `$$query`), so calling them throws `TypeError` |

## Example

Builds an element, then logs the query, JSON, HTML-escape, query-string, and regex helpers.

```demo
<div id="box"></div>
<script>
    "box".$._child("p#note"._("built from a tag-selector string"));
    console.log("box".$.innerHTML);
    console.log("p.note"._().className);
    console.log('{"a":1}'.$json, '{"a":1}'.$$json);
    console.log("<b>&</b>".$html);
    console.log("https://renderjs.pardn.io/docs?page=2&lang=en".$queryAll);
    console.log("a.b".$regexp("g", true).source);
</script>
```
