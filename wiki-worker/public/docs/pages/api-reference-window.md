# Global Functions

Functions RenderJS attaches to `window`: listener setup, file reading, cookies, and `document.body` shortcuts.

## window

Source: `src/prototype/window.ts`

| Method | Description |
| --- | --- |
| `_Listener(target?)` | With no argument, enables both the lazyload and SVG observers. With an argument, `target.svg` gates the lazyload observer and `target.lazyload` gates the SVG observer (see [Listener System](/listener-system) for the observer internals) |
| `$file(file)` | Wraps a `File`/`Blob` in a `FileReader.readAsDataURL`, resolving with the `load` event (`event.target.result` holds the data URL) |
| `$cookie(key)` | Returns `undefined` for every non-empty `key`: its input guard uses `String.$$()`, which is `true` for non-empty strings, so the cookie is never read |
| `_cookie(key, body, expire = 3600)` | Returns `undefined` without writing for every non-empty `key` (same `String.$$()` guard) |
| `$(selector)` | Returns `undefined` for every non-empty selector (same guard); use `"selector".$` |
| `$all(selector)` | Returns `undefined` for every non-empty selector (same guard); use `"selector".$all` |
| `_child(value, before)` / `__child(value)` | Append to / replace the children of `document.body` |

## Character Constants

The bundle also defines single-letter lookup constants on `window`, mapping digit-style names to letters and back.

| Globals | Value |
| --- | --- |
| `_0` … `_9` / `$0` … `$9` | `"a"` … `"j"` / `"A"` … `"J"` |
| `_0_` … `_9_` / `$0_` … `$9_` | `"k"` … `"t"` / `"K"` … `"T"` |
| `__0` … `__5` / `$_0` … `$_5` | `"u"` … `"z"` / `"U"` … `"Z"` |
| `_a` … `_j` | `0` … `9` |

```demo
<script>
    console.log(_0, $0, _9_, $_5, _j);
    console.log(_1 + _0_ + __4);
</script>
```

## Example

`_child` appends to `document.body` and `__child` replaces its children; `$` and `$all` return `undefined` for a non-empty selector.

```demo
<script>
    _child("p"._("appended to document.body"));
    _child("p"._("appended again"));
    console.log("p".$all.length);
    __child("p"._("replaced every child"));
    console.log("p".$all.length, "p".$.textContent);
    console.log(String($("p")), String($all("p")));
</script>
```
