# Removed API

Every extension that existed in the 1.x line and is gone from the 2.x bundle, with the release it was removed in and what to use instead. The last release that still ships these names is `1.5.2` (bundle `dist/PDRenderKit.js`); the first 2.x tag is `v2.0.2`.

## Library Entry

| Symbol | Removed in | Last present | Replacement |
| --- | --- | --- | --- |
| `PD` (template class) | Removed in v2.0.2 | 1.5.2 | `RJS` with the same options object; see [Core Concepts](/core-concepts) |
| `dist/PDRenderKit.js` | Removed in v2.0.2 | 1.5.2 | `dist/RenderJS.js` from `@pardnchiu/renderjs` |

## window

| Symbol | Removed in | Last present | Replacement |
| --- | --- | --- | --- |
| `_SVGListener()` | Removed in v2.0.2 | 1.5.2 | `_Listener({ svg: true })`; see [Listener System](/listener-system) |
| `_LazyListener()` | Removed in v2.0.2 | 1.5.2 | `_Listener({ lazyload: true })` |
| `$imageFromImageFile(file)` | Removed in v2.0.2 | 1.5.2 | `file.$image()` |
| `$imageFromVideoFile(file)` | Removed in v2.0.2 | 1.5.2 | `file.$image(true)` |
| `$blob(base64, mimeType)` | Removed in v2.0.2 | 1.5.2 | No public replacement; `img.$blob(mime, size?)` re-encodes an `Image` instead of a base64 string |
| `$url(value)` | Removed in v2.0.2 | 1.5.2 | `"value".$url` |
| `$key(length)` / `$random(length)` | Removed in v2.0.2 | 1.5.2 | `(length).$uniKey` |

## Element

| Symbol | Removed in | Last present | Replacement |
| --- | --- | --- | --- |
| `el.$` | Removed in v2.0.2 | 1.5.2 | `el.innerHTML` |
| `el.$html` | Removed in v2.0.2 | 1.5.2 | `el.outerHTML` |
| `el.$x` / `el.$y` | Removed in v2.0.2 | 1.5.2 | `el.scrollLeft` / `el.scrollTop` |
| `el.$w` / `el.$h` | Removed in v2.0.2 | 1.5.2 | `el.clientWidth` / `el.clientHeight` |
| `el.$sw` / `el.$sh` | Removed in v2.0.2 | 1.5.2 | `el.scrollWidth` / `el.scrollHeight` |
| `el.$nw` / `el.$nh` | Removed in v2.0.2 | 1.5.2 | `img.naturalWidth` / `img.naturalHeight` |
| `el.$text` | Removed in v2.0.2 | 1.5.2 | No public replacement (it returned only the element's own text nodes) |
| `el.$classList` / `el.$classAll` | Removed in v2.0.2 | 1.5.2 | `[...el.classList]` |
| `el.$children` / `el.$childAll` | Removed in v2.0.2 | 1.5.2 | `[...el.children]` |
| `el.$childNodes` / `el.$nodeAll` | Removed in v2.0.2 | 1.5.2 | `[...el.childNodes]` |
| `el.$len` | Removed in v2.0.2 | 1.5.2 | `el.length` |
| `el.$attrAll` | Removed in v2.0.2 | 1.5.2 | `el.$attributes` |
| `el._$(deep)` | Removed in v2.0.2 | 1.5.2 | `el.cloneNode(deep)` |
| `el._x(v)` / `el._y(v)` | Removed in v2.0.2 | 1.5.2 | `el.scrollLeft = v` / `el.scrollTop = v` |
| `el._w(v)` / `el._h(v)` | Removed in v2.0.2 | 1.5.2 | `el.width(v)` / `el.height(v)`; see [HTMLElement and Link Extensions](/api-reference-html-element) |
| `el._paddingT` / `_paddingL` / `_paddingB` / `_paddingR`, `el._pt` / `_pl` / `_pb` / `_pr` | Removed in v2.0.2 | 1.5.2 | `el.paddingTop(v)` / `paddingLeft(v)` / `paddingBottom(v)` / `paddingRight(v)` |
| `el._marginT` / `_marginL` / `_marginB` / `_marginR`, `el._mt` / `_ml` / `_mb` / `_mr` | Removed in v2.0.2 | 1.5.2 | `el.marginTop(v)` / `marginLeft(v)` / `marginBottom(v)` / `marginRight(v)` |
| `el._padding(...)` / `el._p(...)` | Removed in v2.0.2 | 1.5.2 | `el.padding(...)` |
| `el._margin(...)` / `el._m(...)` | Removed in v2.0.2 | 1.5.2 | `el.margin(...)` |
| `el._go(href)` / `el._open(href)` | Removed in v2.0.2 | 1.5.2 | Same names on `HTMLLinkElement` only |
| `el._display(value)` | Removed in v2.0.2 | 1.5.2 | Same name on `HTMLElement` |
| `el._video(options)` | Removed in v2.0.2 | 1.5.2 | `video._config(options)`; see [Image, File and Video Extensions](/api-reference-media) |
| `el.$formData` | Removed in v2.0.2 | 1.5.2 | `new FormData(form)` |
| `el.$map` / `el.$json` | Removed in v2.0.2 | 1.5.2 | Same names on `HTMLFormElement` only; see [Map and Form Data Extensions](/api-reference-map-form) |
| `el.$rm()` | Removed in v2.0.2 | 1.5.2 | `el.remove()` |
| `el.$$_class(bool, list)` | Removed in v2.0.2 | 1.5.2 | `el.$$class_(!bool, list)` (inverted condition) |

## DocumentFragment

| Symbol | Removed in | Last present | Replacement |
| --- | --- | --- | --- |
| `fragment.$html` / `fragment.$str` | Removed in v2.0.2 | 1.5.2 | `fragment.innerHTML` |
| `fragment.$children` / `fragment.$childAll` | Removed in v2.0.2 | 1.5.2 | `[...fragment.children]` |
| `fragment.$childNodes` / `fragment.$nodeAll` | Removed in v2.0.2 | 1.5.2 | `[...fragment.childNodes]` |
| `fragment.$len` | Removed in v2.0.2 | 1.5.2 | `fragment.length` |
| `fragment._$(deep)` | Removed in v2.0.2 | 1.5.2 | `fragment.cloneNode(deep)` |

## String

| Symbol | Removed in | Last present | Replacement |
| --- | --- | --- | --- |
| `str.$$empty` / `str.$$mt` | Removed in v2.0.2 | 1.5.2 | `str.trim() === ""` |
| `str.__(search, replace)` | Removed in v2.0.2 | 1.5.2 | `str.replace(search, replace)` |
| `str.$en(component?)` / `str.$de(component?)` | Removed in v2.0.2 | 1.5.2 | `encodeURI` / `encodeURIComponent`, `decodeURI` / `decodeURIComponent` |
| `str.$num` | Removed in v2.0.2 | 1.5.2 | `Number(str)` |
| `str.$len` | Removed in v2.0.2 | 1.5.2 | `str.length` |
| `str.$ary(separator)` | Removed in v2.0.2 | 1.5.2 | `str.split(separator)` |
| `str.$fit(regex)` | Removed in v2.0.2 | 1.5.2 | `str.match(regex)` |
| `str.$copy()` | Removed in v2.0.2 | 1.5.2 | `str.copy()` |

## Array and Object

| Symbol | Removed in | Last present | Replacement |
| --- | --- | --- | --- |
| `arr.$$empty` / `arr.$$mt` | Removed in v2.0.2 | 1.5.2 | `arr.length === 0` |
| `arr.$len` | Removed in v2.0.2 | 1.5.2 | `arr.length` |
| `arr.$random` | Removed in v2.0.2 | 1.5.2 | `arr.$shuffle` |
| `arr.$str(separator)` | Removed in v2.0.2 | 1.5.2 | `arr.join(separator)` |
| `arr._$` | Removed in v2.0.2 | 1.5.2 | No public replacement (not declared in the 1.5.2 typings) |
| `obj.$vals` | Removed in v2.0.2 | 1.5.2 | `obj.$values` |
| `obj.$forEach(cb)` | Removed in v2.0.2 | 1.5.2 | `obj.forEach(cb)` |

## Map

| Symbol | Removed in | Last present | Replacement |
| --- | --- | --- | --- |
| `map.$$empty` / `map.$$mt` | Removed in v2.0.2 | 1.5.2 | `map.size === 0` |
| `map.$vals` | Removed in v2.0.2 | 1.5.2 | `map.$values` |
| `map.$obj` | Removed in v2.0.2 | 1.5.2 | `map.$json` |
| `map.$len` | Removed in v2.0.2 | 1.5.2 | `map.length` |

## URL, Date and Number

| Symbol | Removed in | Last present | Replacement |
| --- | --- | --- | --- |
| `url.$query(key)` | Removed in v2.0.2 | 1.5.2 | `url.$$query(key)` |
| `date.$SS` / `date.$SSS` | Removed in v2.0.2 | 1.5.2 | `date["$S$S"]` / `date["$S$S$S"]`; see [Date and Number Extensions](/api-reference-date-time) |
| `n.$y`, `$yy`, `$yyyy`, `$M`, `$MM`, `$D`, `$DD`, `$d`, `$dd`, `$ddd`, `$dddd`, `$H`, `$HH`, `$h`, `$hh`, `$a`, `$A`, `$m`, `$mm`, `$s`, `$ss`, `$S`, `$SS`, `$SSS`, `$gone` | Removed in v2.0.2 | 1.5.2 | Read the same getter from `n.$date` (`n.$date.$yyyy`) |
| `n.$random` | Removed in v2.0.2 | 1.5.2 | `n.$uniKey` |
| `n.$str` / `n.$num` | Removed in v2.0.2 | 1.5.2 | `String(n)` / `n` |
| `n.$00` | Removed in v2.0.2 | 1.5.2 | No public replacement (not declared in the 1.5.2 typings) |

## Image

| Symbol | Removed in | Last present | Replacement |
| --- | --- | --- | --- |
| `img.$jpg(size)` / `img.$png(size)` | Removed in v2.0.2 | 1.5.2 | `img.$base64("image/jpeg", size)` / `img.$base64("image/png", size)` |
| `img._downloadJPG(name?)` / `img._downloadPNG(name?)` | Removed in v2.0.2 | 1.5.2 | `img.download("image/jpeg", name)` / `img.download("image/png", name)` |
| `img._download(mime, name?)` | Removed in v2.0.2 | 1.5.2 | `img.download(mime, name)` |

## Example

The removed names are absent from the 2.x bundle; each replacement returns the value the old name used to.

```demo
<div id="box" class="a b"><p>x</p></div>
<script>
    const box = "box".$;
    console.log(box.$html, box.$len, box.$attrAll, (8).$y);
    console.log(box.outerHTML, box.length, box.$attributes, (8).$date.$yyyy);
    console.log(typeof window.$key, (8).$uniKey.length, [3, 1, 2].$shuffle.length);
</script>
```
