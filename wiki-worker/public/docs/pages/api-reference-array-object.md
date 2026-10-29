# Array and Object Extensions

Negative-index access, aggregation, and existence checks added to `Array.prototype` and `Object.prototype`.

## Array

Source: `src/prototype/Array.ts`

| Method / Property | Description |
| --- | --- |
| `arr.$sum` | Sum of a numeric array via `reduce` |
| `arr.$shuffle` | In-place Fisher–Yates shuffle; returns `this` |
| `arr.$map` | A `Map` of `value → index` for every entry |
| `arr._(value, index?)` | Negative-index-aware insert (`splice`); appends when `index` is omitted or out of range; an array `value` is spread in, `undefined` is ignored |
| `arr.$(index)` | Negative-index-aware read; `undefined` when out of range |
| `arr.$i(target)` | `indexOf(target)`, returning `undefined` instead of `-1` |
| `arr.$_(index)` | Negative-index-aware removal (`splice`) |
| `arr.$$(target?)` | `true` if non-empty (no argument) or if `target` is present |
| `arr.$req(body)` | Joins the captured `Array.prototype` (not the array instance) with `/`, so every call sends `$req(body)` to `"/"` resolved against `location.origin` |

## Object

Source: `src/prototype/Object.ts` (extends `Object.prototype`, so these apply to plain objects)

| Method / Property | Description |
| --- | --- |
| `obj.length` | `Object.keys(this).length` |
| `obj.$keys` / `obj.$values` | `Object.keys(this)` / `Object.values(this)` |
| `obj.$map` | Own enumerable entries as a `Map` |
| `obj.forEach(cb)` | Array-like iteration: `cb(key, value)` over own enumerable properties |
| `obj._(key, value, replace = true)` | Conditional setter for a non-empty string `key` and a defined `value`; only overwrites an existing key when `replace` is `true` |
| `obj.$$(key?)` | `hasOwnProperty(key)` if `key` given, else `this.length > 0` |

## Example

Negative indices count from the end; `obj._` with `replace = false` keeps the existing value.

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
