# Map 與表單資料擴充

`Map` 的鏈式工具，以及 `FormData` 與 `<form>` 元素的 `$map`／`$json` 轉換。

## Map

原始碼：`src/prototype/Map.ts`

| 方法／屬性 | 說明 |
| --- | --- |
| `map.length` | `this.size` |
| `map.$keys` / `map.$values` | keys／values 的迭代器 |
| `map.$json` | `Object.fromEntries(this)` |
| `map._(key, value?)` | 鏈式 `set(key, value)` |
| `map.$(key?)` | `get(key)` |
| `map.$_(key?)` | 鏈式 `delete(key)` |
| `map.$$(key?)` | 有 `key` 時為 `has(key)`，否則為 `this.size > 0` |

## FormData

原始碼：`src/prototype/FormData.ts`

| 方法／屬性 | 說明 |
| --- | --- |
| `formData.$map` | 條目組成的 `Map` |
| `formData.$json` | 條目組成的純物件 |

## HTMLFormElement

原始碼：`src/prototype/HTMLFormElement.ts`

| 方法／屬性 | 說明 |
| --- | --- |
| `form.$map` / `form.$json` | Getter 先以 `new FormData(form)` 包裝表單，但讀取的是其 `map` / `json` 屬性而非 `$map` / `$json`，因此兩者都回傳 `undefined`；請改用 `new FormData(form).$map` / `.$json` |

## 範例

`new FormData(form).$json` 可把表單轉成純物件，`form.$json` 則回傳 `undefined`；`Map` 的設定方法可串接。

```demo
<form id="form">
    <input name="user" value="pardn">
    <input name="plan" value="pro">
</form>
<script>
    console.log(new FormData("form".$).$json, String("form".$.$json));
    const dic = new Map()._("a", 1)._("b", 2);
    console.log(dic.length, dic.$("a"), dic.$$("c"), dic.$json);
</script>
```
