# 全域函式

RenderJS 掛在 `window` 上的函式：listener 啟用、檔案讀取、cookie 與 `document.body` 捷徑。

## window

原始碼：`src/prototype/window.ts`

| 方法 | 說明 |
| --- | --- |
| `_Listener(target?)` | 無參數時同時啟用 lazyload 與 SVG 兩個 observer。有參數時，`target.svg` 決定是否啟用 lazyload observer，`target.lazyload` 決定是否啟用 SVG observer（observer 內部實作見 [Listener 系統](/zh/listener-system)）|
| `$file(file)` | 以 `FileReader.readAsDataURL` 包裝 `File`／`Blob`，以 `load` 事件 resolve（data URL 位於 `event.target.result`）|
| `$cookie(key)` | 任何非空 `key` 都回傳 `undefined`：輸入檢查使用 `String.$$()`，而它對非空字串為 `true`，因此不會讀取 cookie |
| `_cookie(key, body, expire = 3600)` | 任何非空 `key` 都直接回傳 `undefined`，不寫入 cookie（同樣的 `String.$$()` 檢查）|
| `$(selector)` | 任何非空選擇器都回傳 `undefined`（同樣的檢查）；請改用 `"selector".$` |
| `$all(selector)` | 任何非空選擇器都回傳 `undefined`（同樣的檢查）；請改用 `"selector".$all` |
| `_child(value, before)` / `__child(value)` | 新增至／取代 `document.body` 的子節點 |

## 字元常數

bundle 另外在 `window` 上定義單一字母的對照常數，把數字形式的名稱對應到字母，以及反向對應。

| 全域變數 | 值 |
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

## 範例

`_child` 附加到 `document.body`，`__child` 取代其所有子節點；`$` 與 `$all` 對非空選擇器回傳 `undefined`。

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
