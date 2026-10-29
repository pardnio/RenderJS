# Text Interpolation

How `RJS` resolves `{{ }}` in text nodes, and which value helpers it supports.

## Resolution

`#FIT_TEXT` (top level) / `#FIT_TEXT_IN_ARRAY` / `#FIT_TEXT_IN_OBJECT` (inside `:for`) scan text nodes for `{{ ... }}` and resolve each match through `#GET_VALUE`, which supports:

## Helpers

| Helper | Behavior |
| --- | --- |
| `{{ key.path }}` | Dot-path lookup into `data`, walked layer by layer via `#GET_VALUE_FROM_LAYERS` |
| `{{ CALC(key + n) }}` | Arithmetic: `+ - * / %` with `n` read through `parseInt`, applied via `#CALC` |
| `{{ LENGTH(key) }}` | `Object.keys(value).length` for plain objects, `value.length` otherwise |
| `{{ UPPER(key) }}` / `{{ LOWER(key) }}` | `.toUpperCase()` / `.toLowerCase()` |
| `{{ DATE(key, format) }}` | Parses `key` as a Unix timestamp and formats it (see `Number.$format` in [Date and Number Extensions](/api-reference-date-time)) |

```demo
<div id="app">
    <p>Name: {{ user.name }}</p>
    <p>Upper: {{ UPPER(user.name) }} / Lower: {{ LOWER(user.role) }}</p>
    <p>Next year: {{ CALC(user.age + 1) }}</p>
    <p>Tags: {{ LENGTH(tags) }}</p>
    <p>Joined: {{ DATE(joined, YYYY-MM-DD) }}</p>
</div>
<script>
    "#app".RJS({
        data: {
            user: { name: "Pardn", role: "ADMIN", age: 30 },
            tags: ["dom", "template", "zero-dependency"],
            joined: 1704110400
        }
    });
</script>
```

## First Child Node of the Root

When the root element's first child node is an element (no text, whitespace included, before it), that element's own `{{ }}` text is left as written; later children and deeper descendants still render. A template written with a line break after the opening tag, like the example above, always starts with a text node:

```demo
<div id="a"><p>{{ msg }}</p><p>{{ msg }}</p></div>
<div id="b">
    <p>{{ msg }}</p>
</div>
<script>
    "#a".RJS({ data: { msg: "rendered" } });
    "#b".RJS({ data: { msg: "rendered" } });
    console.log("a:", "a".$.textContent);
    console.log("b:", "b".$.textContent.trim());
</script>
```

## Embedded Text

`REGEX_TEXT` also matches a value embedded inside surrounding literal text (`prefix {{ key }} suffix`), preserving the prefix/suffix when substituting.
