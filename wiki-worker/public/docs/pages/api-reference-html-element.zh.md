# HTMLElement 與連結擴充

`HTMLElement.prototype` 的版面與捲動工具，以及 `HTMLLinkElement.prototype` 的 `href`／`target` 設定工具。

## HTMLElement

原始碼：`src/prototype/HTMLElement.ts`

| 方法／屬性 | 說明 |
| --- | --- |
| `el._display(value)` | 鏈式 `style.display = value`；空值會被忽略 |
| `el.width(v)` / `height(v)` / `paddingTop(v)` / `paddingLeft(v)` / `paddingBottom(v)` / `paddingRight(v)` / `marginTop(v)` / `marginLeft(v)` / `marginBottom(v)` / `marginRight(v)` | 鏈式數值型樣式設定；純數字／數字字串會自動補上 `px` |
| `el.padding(top, right?, bottom?, left?)` / `el.margin(...)` | CSS 簡寫式鏈式設定（1–4 個引數，回退規則與 CSS `padding`／`margin` 屬性相同）|
| `el.scrollToX(value, animation?)` / `el.scrollToY(value, animation?)` | 把 `scrollLeft` / `scrollTop` 設為 `scrollWidth - value` / `scrollHeight - value`，`value` 小於可視尺寸時改設為 `clientWidth` / `clientHeight`；`animation: true` 以 `scrollTo` 搭配 `behavior: "smooth"`；非數字的 `value` 會被忽略 |
| `el.scrollToT(animation?)` / `el.scrollToB(animation?)` | 兩者都呼叫 `scrollToY(0)`，把 `scrollTop` 設為 `clientHeight` |
| `el.scrollToL(animation?)` / `el.scrollToR(animation?)` | 兩者都呼叫 `scrollToX(scrollWidth - clientWidth)`，把 `scrollLeft` 設為 `clientWidth` |

## HTMLLinkElement

原始碼：`src/prototype/HTMLLinkElement.ts`

| 方法 | 說明 |
| --- | --- |
| `link._go(href?)` | 鏈式：設定 `href`（若有給定）與 `target = "_self"`，不會觸發導航；定義在 `<link>` 元素（`HTMLLinkElement`）上，`<a>` 沒有此方法 |
| `link._open(href?)` | 鏈式：設定 `href`（若有給定）與 `target = "_blank"`，不會觸發導航 |

## 範例

數值設定會自動補 `px`；`padding` 依 CSS 簡寫規則展開。

```demo
<div id="box">box</div>
<script>
    "box".$.width(120).height("48").padding(8, 16)._display("inline-block");
    console.log("box".$.style.cssText);
</script>
```

捲動工具寫入的是上表所列的計算結果：

```demo
<div id="pane" style="width:120px;height:60px;overflow:auto">
    <div style="width:600px;height:600px"></div>
</div>
<script>
    const pane = "pane".$;
    console.log("clientHeight:", pane.clientHeight, "scrollHeight:", pane.scrollHeight);
    pane.scrollToY(300);
    console.log("scrollToY(300):", pane.scrollTop);
    pane.scrollToT();
    console.log("scrollToT():", pane.scrollTop);
    pane.scrollToB();
    console.log("scrollToB():", pane.scrollTop);
</script>
```
