# 已移除 API

1.x 版存在、但 2.x bundle 已不再提供的所有擴充，附移除版本與替代寫法。最後仍提供這些名稱的版本是 `1.5.2`（bundle 為 `dist/PDRenderKit.js`）；2.x 的第一個 tag 是 `v2.0.2`。

## 函式庫入口

| 符號 | 移除版本 | 最後存在版本 | 替代做法 |
| --- | --- | --- | --- |
| `PD`（模板類別） | 移除於 v2.0.2 | 1.5.2 | `RJS`，選項物件相同；見[核心概念](/zh/core-concepts) |
| `dist/PDRenderKit.js` | 移除於 v2.0.2 | 1.5.2 | `@pardnchiu/renderjs` 的 `dist/RenderJS.js` |

## window

| 符號 | 移除版本 | 最後存在版本 | 替代做法 |
| --- | --- | --- | --- |
| `_SVGListener()` | 移除於 v2.0.2 | 1.5.2 | `_Listener({ svg: true })`；見 [Listener 系統](/zh/listener-system) |
| `_LazyListener()` | 移除於 v2.0.2 | 1.5.2 | `_Listener({ lazyload: true })` |
| `$imageFromImageFile(file)` | 移除於 v2.0.2 | 1.5.2 | `file.$image()` |
| `$imageFromVideoFile(file)` | 移除於 v2.0.2 | 1.5.2 | `file.$image(true)` |
| `$blob(base64, mimeType)` | 移除於 v2.0.2 | 1.5.2 | 無公開替代；`img.$blob(mime, size?)` 的輸入是 `Image`，不是 base64 字串 |
| `$url(value)` | 移除於 v2.0.2 | 1.5.2 | `"value".$url` |
| `$key(length)` / `$random(length)` | 移除於 v2.0.2 | 1.5.2 | `(length).$uniKey` |

## Element

| 符號 | 移除版本 | 最後存在版本 | 替代做法 |
| --- | --- | --- | --- |
| `el.$` | 移除於 v2.0.2 | 1.5.2 | `el.innerHTML` |
| `el.$html` | 移除於 v2.0.2 | 1.5.2 | `el.outerHTML` |
| `el.$x` / `el.$y` | 移除於 v2.0.2 | 1.5.2 | `el.scrollLeft` / `el.scrollTop` |
| `el.$w` / `el.$h` | 移除於 v2.0.2 | 1.5.2 | `el.clientWidth` / `el.clientHeight` |
| `el.$sw` / `el.$sh` | 移除於 v2.0.2 | 1.5.2 | `el.scrollWidth` / `el.scrollHeight` |
| `el.$nw` / `el.$nh` | 移除於 v2.0.2 | 1.5.2 | `img.naturalWidth` / `img.naturalHeight` |
| `el.$text` | 移除於 v2.0.2 | 1.5.2 | 無公開替代（它只回傳元素本身的文字節點） |
| `el.$classList` / `el.$classAll` | 移除於 v2.0.2 | 1.5.2 | `[...el.classList]` |
| `el.$children` / `el.$childAll` | 移除於 v2.0.2 | 1.5.2 | `[...el.children]` |
| `el.$childNodes` / `el.$nodeAll` | 移除於 v2.0.2 | 1.5.2 | `[...el.childNodes]` |
| `el.$len` | 移除於 v2.0.2 | 1.5.2 | `el.length` |
| `el.$attrAll` | 移除於 v2.0.2 | 1.5.2 | `el.$attributes` |
| `el._$(deep)` | 移除於 v2.0.2 | 1.5.2 | `el.cloneNode(deep)` |
| `el._x(v)` / `el._y(v)` | 移除於 v2.0.2 | 1.5.2 | `el.scrollLeft = v` / `el.scrollTop = v` |
| `el._w(v)` / `el._h(v)` | 移除於 v2.0.2 | 1.5.2 | `el.width(v)` / `el.height(v)`；見 [HTMLElement 與連結擴充](/zh/api-reference-html-element) |
| `el._paddingT` / `_paddingL` / `_paddingB` / `_paddingR`、`el._pt` / `_pl` / `_pb` / `_pr` | 移除於 v2.0.2 | 1.5.2 | `el.paddingTop(v)` / `paddingLeft(v)` / `paddingBottom(v)` / `paddingRight(v)` |
| `el._marginT` / `_marginL` / `_marginB` / `_marginR`、`el._mt` / `_ml` / `_mb` / `_mr` | 移除於 v2.0.2 | 1.5.2 | `el.marginTop(v)` / `marginLeft(v)` / `marginBottom(v)` / `marginRight(v)` |
| `el._padding(...)` / `el._p(...)` | 移除於 v2.0.2 | 1.5.2 | `el.padding(...)` |
| `el._margin(...)` / `el._m(...)` | 移除於 v2.0.2 | 1.5.2 | `el.margin(...)` |
| `el._go(href)` / `el._open(href)` | 移除於 v2.0.2 | 1.5.2 | 同名方法，只存在於 `HTMLLinkElement` |
| `el._display(value)` | 移除於 v2.0.2 | 1.5.2 | 同名方法，移到 `HTMLElement` |
| `el._video(options)` | 移除於 v2.0.2 | 1.5.2 | `video._config(options)`；見 [Image、File 與 Video 擴充](/zh/api-reference-media) |
| `el.$formData` | 移除於 v2.0.2 | 1.5.2 | `new FormData(form)` |
| `el.$map` / `el.$json` | 移除於 v2.0.2 | 1.5.2 | 同名 getter，只存在於 `HTMLFormElement`；見 [Map 與表單資料擴充](/zh/api-reference-map-form) |
| `el.$rm()` | 移除於 v2.0.2 | 1.5.2 | `el.remove()` |
| `el.$$_class(bool, list)` | 移除於 v2.0.2 | 1.5.2 | `el.$$class_(!bool, list)`（條件相反） |

## DocumentFragment

| 符號 | 移除版本 | 最後存在版本 | 替代做法 |
| --- | --- | --- | --- |
| `fragment.$html` / `fragment.$str` | 移除於 v2.0.2 | 1.5.2 | `fragment.innerHTML` |
| `fragment.$children` / `fragment.$childAll` | 移除於 v2.0.2 | 1.5.2 | `[...fragment.children]` |
| `fragment.$childNodes` / `fragment.$nodeAll` | 移除於 v2.0.2 | 1.5.2 | `[...fragment.childNodes]` |
| `fragment.$len` | 移除於 v2.0.2 | 1.5.2 | `fragment.length` |
| `fragment._$(deep)` | 移除於 v2.0.2 | 1.5.2 | `fragment.cloneNode(deep)` |

## String

| 符號 | 移除版本 | 最後存在版本 | 替代做法 |
| --- | --- | --- | --- |
| `str.$$empty` / `str.$$mt` | 移除於 v2.0.2 | 1.5.2 | `str.trim() === ""` |
| `str.__(search, replace)` | 移除於 v2.0.2 | 1.5.2 | `str.replace(search, replace)` |
| `str.$en(component?)` / `str.$de(component?)` | 移除於 v2.0.2 | 1.5.2 | `encodeURI` / `encodeURIComponent`、`decodeURI` / `decodeURIComponent` |
| `str.$num` | 移除於 v2.0.2 | 1.5.2 | `Number(str)` |
| `str.$len` | 移除於 v2.0.2 | 1.5.2 | `str.length` |
| `str.$ary(separator)` | 移除於 v2.0.2 | 1.5.2 | `str.split(separator)` |
| `str.$fit(regex)` | 移除於 v2.0.2 | 1.5.2 | `str.match(regex)` |
| `str.$copy()` | 移除於 v2.0.2 | 1.5.2 | `str.copy()` |

## Array 與 Object

| 符號 | 移除版本 | 最後存在版本 | 替代做法 |
| --- | --- | --- | --- |
| `arr.$$empty` / `arr.$$mt` | 移除於 v2.0.2 | 1.5.2 | `arr.length === 0` |
| `arr.$len` | 移除於 v2.0.2 | 1.5.2 | `arr.length` |
| `arr.$random` | 移除於 v2.0.2 | 1.5.2 | `arr.$shuffle` |
| `arr.$str(separator)` | 移除於 v2.0.2 | 1.5.2 | `arr.join(separator)` |
| `arr._$` | 移除於 v2.0.2 | 1.5.2 | 無公開替代（1.5.2 型別定義未宣告） |
| `obj.$vals` | 移除於 v2.0.2 | 1.5.2 | `obj.$values` |
| `obj.$forEach(cb)` | 移除於 v2.0.2 | 1.5.2 | `obj.forEach(cb)` |

## Map

| 符號 | 移除版本 | 最後存在版本 | 替代做法 |
| --- | --- | --- | --- |
| `map.$$empty` / `map.$$mt` | 移除於 v2.0.2 | 1.5.2 | `map.size === 0` |
| `map.$vals` | 移除於 v2.0.2 | 1.5.2 | `map.$values` |
| `map.$obj` | 移除於 v2.0.2 | 1.5.2 | `map.$json` |
| `map.$len` | 移除於 v2.0.2 | 1.5.2 | `map.length` |

## URL、Date 與 Number

| 符號 | 移除版本 | 最後存在版本 | 替代做法 |
| --- | --- | --- | --- |
| `url.$query(key)` | 移除於 v2.0.2 | 1.5.2 | `url.$$query(key)` |
| `date.$SS` / `date.$SSS` | 移除於 v2.0.2 | 1.5.2 | `date["$S$S"]` / `date["$S$S$S"]`；見 [Date 與 Number 擴充](/zh/api-reference-date-time) |
| `n.$y`、`$yy`、`$yyyy`、`$M`、`$MM`、`$D`、`$DD`、`$d`、`$dd`、`$ddd`、`$dddd`、`$H`、`$HH`、`$h`、`$hh`、`$a`、`$A`、`$m`、`$mm`、`$s`、`$ss`、`$S`、`$SS`、`$SSS`、`$gone` | 移除於 v2.0.2 | 1.5.2 | 改從 `n.$date` 讀取同名 getter（`n.$date.$yyyy`） |
| `n.$random` | 移除於 v2.0.2 | 1.5.2 | `n.$uniKey` |
| `n.$str` / `n.$num` | 移除於 v2.0.2 | 1.5.2 | `String(n)` / `n` |
| `n.$00` | 移除於 v2.0.2 | 1.5.2 | 無公開替代（1.5.2 型別定義未宣告） |

## Image

| 符號 | 移除版本 | 最後存在版本 | 替代做法 |
| --- | --- | --- | --- |
| `img.$jpg(size)` / `img.$png(size)` | 移除於 v2.0.2 | 1.5.2 | `img.$base64("image/jpeg", size)` / `img.$base64("image/png", size)` |
| `img._downloadJPG(name?)` / `img._downloadPNG(name?)` | 移除於 v2.0.2 | 1.5.2 | `img.download("image/jpeg", name)` / `img.download("image/png", name)` |
| `img._download(mime, name?)` | 移除於 v2.0.2 | 1.5.2 | `img.download(mime, name)` |

## 範例

2.x bundle 已沒有這些舊名稱；每個替代寫法都回傳舊名稱原本的值。

```demo
<div id="box" class="a b"><p>x</p></div>
<script>
    const box = "box".$;
    console.log(box.$html, box.$len, box.$attrAll, (8).$y);
    console.log(box.outerHTML, box.length, box.$attributes, (8).$date.$yyyy);
    console.log(typeof window.$key, (8).$uniKey.length, [3, 1, 2].$shuffle.length);
</script>
```
