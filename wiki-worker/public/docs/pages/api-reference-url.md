# URL Extensions

Request, history, and query-string methods RenderJS adds to `URL.prototype`.

## URL

Source: `src/prototype/URL.ts`

| Method / Property | Description |
| --- | --- |
| `url.$queryAll` | Query string parsed into a plain object |
| `url.$image` | Promise resolving a preloaded `Image` for the URL |
| `url.$$200(isImg = false)` | Fetches the URL; if the response is an image, converts it to an object-URL blob (`{ src, img }`) unless it's SVG and `isImg` is falsy |
| `url.$req(body, once = false)` | Fetch wrapper: `method` (default `GET`), `header`, and `credentials: true` for `"include"` (otherwise `"same-origin"`); `body.json` is sent as JSON, or with `body.files` + `body.tag` as `FormData` (JSON keys appended as fields); `Content-Type: application/json` is added whenever `body.files` is absent; resolves with parsed JSON or text by response `Content-Type`; rejects with the response text on 4xx/5xx. With `once: true`, a call made while the same URL is still in flight (tracked in a shared `Map`) returns a promise that never settles; `body: null` returns `undefined` |
| `url.$$query(key)` | `searchParams.get(key)` |
| `url._history(title?)` | `pushState` to this URL, records it in the in-memory history stack, optionally sets `document.title` |
| `url._query(obj)` | Returns a **new** `URL` with `obj`'s keys merged into the existing query string |
| `url.__history(title?)` | `replaceState` to this URL (also updates the history stack) |
| `url.__query(obj)` | Returns a **new** `URL` with the query string replaced entirely by `obj` |
| `url.query_(keys)` | Returns a **new** `URL` with the given key (or array of keys) removed from the query string |
| `url.query__()` | Returns a **new** `URL` with the query string cleared |

## Example

Query-string methods return a new `URL`; `$req` parses the response by `Content-Type` and rejects with the response text on 4xx/5xx. The preview runs in an `about:srcdoc` frame where `location.origin` is `null`, so it resolves paths with `document.baseURI`; on a normal page `"/llms.txt".$req()` works directly.

```demo
<script>
    const url = new URL("https://renderjs.pardn.io/docs?page=2&lang=en");
    console.log(url.$queryAll, url.$$query("page"));
    console.log(url._query({ sort: "asc" }).href);
    console.log(url.__query({ q: "dom" }).href);
    console.log(url.query_("lang").href);
    console.log(url.query__().href);

    new URL("/llms.txt", document.baseURI).$req()
        .then((text) => console.log(text.split("\n")[0]))
        .catch((err) => console.error(err));

    new URL("/llms.txt", document.baseURI).$req({
        method: "POST",
        json: { key: "value" },
        header: { "X-Token": "..." }
    }).catch((err) => console.error("rejected:", String(err).length, "chars of response text"));
</script>
```
