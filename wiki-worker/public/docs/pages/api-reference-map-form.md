# Map and Form Data Extensions

Chainable `Map` helpers and the `$map`/`$json` converters for `FormData` and `<form>` elements.

## Map

Source: `src/prototype/Map.ts`

| Method / Property | Description |
| --- | --- |
| `map.length` | `this.size` |
| `map.$keys` / `map.$values` | Iterators over keys / values |
| `map.$json` | `Object.fromEntries(this)` |
| `map._(key, value?)` | Chainable `set(key, value)` |
| `map.$(key?)` | `get(key)` |
| `map.$_(key?)` | Chainable `delete(key)` |
| `map.$$(key?)` | `has(key)` if given, else `this.size > 0` |

## FormData

Source: `src/prototype/FormData.ts`

| Method / Property | Description |
| --- | --- |
| `formData.$map` | Entries as a `Map` |
| `formData.$json` | Entries as a plain object |

## HTMLFormElement

Source: `src/prototype/HTMLFormElement.ts`

| Method / Property | Description |
| --- | --- |
| `form.$map` / `form.$json` | Getters that wrap the form in `new FormData(form)` but then read its `map` / `json` property instead of `$map` / `$json`, so both return `undefined`; use `new FormData(form).$map` / `.$json` |

## Example

`new FormData(form).$json` converts a form to a plain object while `form.$json` returns `undefined`; `Map` setters chain.

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
