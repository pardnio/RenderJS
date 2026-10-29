# Array 與 Object 擴充

`Array.prototype` 與 `Object.prototype` 新增的負索引存取、聚合與存在判斷。

## Array

原始碼：`src/prototype/Array.ts`

| 方法／屬性 | 說明 |
| --- | --- |
| `arr.$sum` | 透過 `reduce` 計算數值陣列總和 |
| `arr.$shuffle` | 原地 Fisher–Yates 洗牌；回傳 `this` |
| `arr.$map` | 每個項目的 `value → index` 組成的 `Map` |
| `arr._(value, index?)` | 支援負索引的插入（`splice`）；省略 `index` 或超出範圍時附加至末尾；陣列 `value` 會展開插入，`undefined` 會被忽略 |
| `arr.$(index)` | 支援負索引的讀取；超出範圍時為 `undefined` |
| `arr.$i(target)` | `indexOf(target)`，找不到時回傳 `undefined` 而非 `-1` |
| `arr.$_(index)` | 支援負索引的移除（`splice`）|
| `arr.$$(target?)` | 無參數時判斷非空，有參數時判斷 `target` 是否存在 |
| `arr.$req(body)` | 以 `/` 串接的是閉包捕獲的 `Array.prototype` 而非該陣列，因此每次呼叫都對相對於 `location.origin` 的 `"/"` 執行 `$req(body)` |

## Object

原始碼：`src/prototype/Object.ts`（擴充 `Object.prototype`，故適用於純物件）

| 方法／屬性 | 說明 |
| --- | --- |
| `obj.length` | `Object.keys(this).length` |
| `obj.$keys` / `obj.$values` | `Object.keys(this)` / `Object.values(this)` |
| `obj.$map` | 自身可列舉屬性組成的 `Map` |
| `obj.forEach(cb)` | 類陣列迭代：對自身可列舉屬性執行 `cb(key, value)` |
| `obj._(key, value, replace = true)` | 條件式設定，`key` 須為非空字串且 `value` 不為 `undefined`；僅當 `replace` 為 `true` 時才覆蓋已存在的鍵 |
| `obj.$$(key?)` | 有 `key` 時為 `hasOwnProperty(key)`，否則為 `this.length > 0` |

## 範例

負索引從尾端計算；`obj._` 在 `replace = false` 時保留既有值。

```demo
<script>
    const list = [10, 20, 30];
    console.log(list.$sum, list.$(-1), list.$i(20), list.$i(99));
    list._("x", -1);
    console.log(list);
    list.$_(0);
    console.log(list, list.$$(30));

    const dic = { a: 1 };
    dic._("a", 2, false);
    dic._("b", 3);
    console.log(dic, dic.length, dic.$keys, dic.$$("b"));
</script>
```
