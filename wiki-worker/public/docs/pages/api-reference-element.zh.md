# Element 擴充

`Element.prototype` 與 `DocumentFragment.prototype` 上的鏈式方法：內容、class、屬性、子元素、節點走訪與事件處理。

## Element

原始碼：`src/prototype/Element.ts`

| 方法／屬性 | 說明 |
| --- | --- |
| `el.length` | `this.children.length` |
| `el.$i` | 元素在父層子節點中的索引 |
| `el.$attributes` | 所有屬性組成的 `{ name: value }` 物件 |
| `el._(value)` / `el.__(value)` | 新增／取代子節點——字串與數字轉為文字節點；純物件會格式化為 `<br>` 分行的 JSON |
| `el._style(map)` / `el._data(map)` / `el._attr(map)` | 鏈式：依物件批次設定 `style` / `dataset` / attribute 鍵值 |
| `el._class(list)` | 鏈式：新增一或多個 class（字串以逗號／空白／點分隔，或陣列）|
| `el.class_(list)` / `el.style_(list)` / `el.data_(list)` / `el.attr_(list)` | 鏈式：移除 class／清除樣式／刪除 dataset 鍵／移除屬性 |
| `el.$style(key)` / `el.$data(key)` / `el.$attr(key)` | 讀取單一樣式屬性／dataset 項目／屬性值 |
| `el.class__()` | 鏈式：完全清空 `className` |
| `el.__class(list)` | 鏈式：取代整個 class 列表 |
| `el.$$class(list)` | 僅當 `list` 中**每個** class 都存在時為 `true` |
| `el.$$class_(bool, list)` | 鏈式：`bool` 為假時新增 `list`，為真時移除（省略 `bool` 時自動偵測目前狀態）|
| `el.$$data(key, value?)` / `el.$$attr(key, value?)` | dataset／屬性值等於 `value` 時為 `true`；省略 `value` 時檢查是否非空 |
| `el._children(...args)` | 鏈式：透過 `_child` 逐一新增每個引數 |
| `el._child(value, before)` | 鏈式：依索引或參照 `Element` 新增／插入子節點（或子節點陣列）|
| `el.__child(value)` | 鏈式：取代子節點（`replaceChildren`）|
| `el.$child(value)` | 依混合的選擇器字串與數字索引陣列查詢子節點 |
| `el.$parent(count)` / `el.$pre(count)` / `el.$next(count)` | 沿 `parentElement` / `previousElementSibling` / `nextElementSibling` 走訪 `count + 1` 步（`count` 預設 `0`，即相鄰的節點）|
| `el.$sel(selector)` / `el.$selAll(selector)` | 有空值保護的 `querySelector` / `querySelectorAll` |
| `el._<event>(fn)` | 鏈式指定 `on<event> = fn`；完整清單見[事件 setter](#事件-setter) |

## 事件 setter

每個 setter 都把 `fn` 指定給對應的 `on<event>` 屬性並回傳元素本身，可與其他 setter 一起鏈式呼叫。重複指定會取代該事件先前的處理函式（不是 `addEventListener`）。

| 分類 | Setter |
| --- | --- |
| 頁面／焦點 | `_load`、`_scroll`、`_focus`、`_blur` |
| 滑鼠 | `_click`、`_dblclick`、`_contextmenu`、`_mousedown`、`_mouseup`、`_mouseenter`、`_mouseleave`、`_mouseover`、`_mouseout`、`_mousemove` |
| 鍵盤／表單 | `_input`、`_change`、`_keydown`、`_keyup`、`_cut`、`_paste` |
| 觸控 | `_touchstart`、`_touchmove`、`_touchend`、`_touchenter`、`_touchleave`、`_touchup` |
| 拖放 | `_dragstart`、`_dragenter`、`_dragover`、`_dragleave`、`_dragend`、`_drop` |

瀏覽器不會派送 `touchenter`、`touchleave`、`touchup` 事件，因此 `_touchenter`、`_touchleave`、`_touchup` 設定的處理函式會存在元素上但不會被呼叫。`_touchstart`、`_touchmove`、`_touchend` 只在支援觸控事件的裝置上觸發。

```demo
<button id="btn">click me</button>
<script>
    const btn = "btn".$;
    btn._click(() => console.log("first"))._click(() => console.log("second"))._touchup(() => console.log("never"));
    btn.click();
    console.log(typeof btn.onclick, typeof btn.ontouchup);
</script>
```

## DocumentFragment

原始碼：`src/prototype/DocumentFragment.ts`

| 方法／屬性 | 說明 |
| --- | --- |
| `fragment.innerHTML` | 透過一個未掛載的 `<div>` 序列化片段內容 |
| `fragment.length` | `this.children.length` |
| `fragment._children(...args)` | 逐一新增每個引數作為子節點 |
| `fragment._child(value)` | 新增一個值（或值陣列）；字串／數字轉為文字節點 |

## 範例

在同一個清單上串接子元素、class 與屬性設定，再讀回結果。

```demo
<ul id="list"></ul>
<script>
    const list = "list".$;
    list._children("li"._("one"), "li"._("two"), "li"._("three"))
        ._class("menu active")
        ._attr({ role: "list" });
    console.log(list.length, list.$$class(["menu", "active"]), list.$attr("role"));
    console.log(list.$child([1]).textContent, list.children[2].$i);
    console.log(list.children[0].$next(1).textContent, list.$attributes);
</script>
```
