# 文字插值

`RJS` 如何解析文字節點中的 `{{ }}`，以及可用的取值輔助函式。

## 解析流程

`#FIT_TEXT`（頂層）／`#FIT_TEXT_IN_ARRAY`／`#FIT_TEXT_IN_OBJECT`（`:for` 內部）會掃描文字節點中的 `{{ ... }}`，並透過 `#GET_VALUE` 解析每個符合項，支援：

## 輔助函式

| 輔助函式 | 行為 |
| --- | --- |
| `{{ key.path }}` | 逐層 dot-path 查找 `data`，透過 `#GET_VALUE_FROM_LAYERS` 走訪 |
| `{{ CALC(key + n) }}` | 算術運算：`+ - * / %`，`n` 以 `parseInt` 讀取，透過 `#CALC` 執行 |
| `{{ LENGTH(key) }}` | 純物件為 `Object.keys(value).length`，其餘為 `value.length` |
| `{{ UPPER(key) }}` / `{{ LOWER(key) }}` | `.toUpperCase()` / `.toLowerCase()` |
| `{{ DATE(key, format) }}` | 將 `key` 解析為 Unix timestamp 並格式化（見 [Date 與 Number 擴充](/zh/api-reference-date-time) 的 `Number.$format`）|

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

## 根元素的第一個子節點

當根元素的第一個子節點是元素（前面沒有任何文字，空白也算）時，該元素自身的 `{{ }}` 會保持原樣；其後的子元素與更深層的後代照常渲染。像上方範例那樣在開始標籤後換行撰寫的模板，第一個子節點必定是文字節點：

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

## 嵌入前後文字

`REGEX_TEXT` 也支援值嵌入周圍字面文字中的情況（`prefix {{ key }} suffix`），代換時會保留前後綴。
