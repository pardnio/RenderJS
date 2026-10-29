# HTMLElement and Link Extensions

Layout and scroll helpers on `HTMLElement.prototype`, plus `href`/`target` setters on `HTMLLinkElement.prototype`.

## HTMLElement

Source: `src/prototype/HTMLElement.ts`

| Method / Property | Description |
| --- | --- |
| `el._display(value)` | Chainable `style.display = value`; empty values are ignored |
| `el.width(v)` / `height(v)` / `paddingTop(v)` / `paddingLeft(v)` / `paddingBottom(v)` / `paddingRight(v)` / `marginTop(v)` / `marginLeft(v)` / `marginBottom(v)` / `marginRight(v)` | Chainable numeric style setters; a bare number/numeric-string gets `px` appended automatically |
| `el.padding(top, right?, bottom?, left?)` / `el.margin(...)` | CSS-shorthand-style chainable setter (1–4 args, same fallback rules as the `padding`/`margin` CSS property) |
| `el.scrollToX(value, animation?)` / `el.scrollToY(value, animation?)` | Sets `scrollLeft` / `scrollTop` to `scrollWidth - value` / `scrollHeight - value`, or to `clientWidth` / `clientHeight` when `value` is smaller than the visible size; `animation: true` uses `scrollTo` with `behavior: "smooth"`; a non-number `value` is ignored |
| `el.scrollToT(animation?)` / `el.scrollToB(animation?)` | Both call `scrollToY(0)`, which sets `scrollTop` to `clientHeight` |
| `el.scrollToL(animation?)` / `el.scrollToR(animation?)` | Both call `scrollToX(scrollWidth - clientWidth)`, which sets `scrollLeft` to `clientWidth` |

## HTMLLinkElement

Source: `src/prototype/HTMLLinkElement.ts`

| Method | Description |
| --- | --- |
| `link._go(href?)` | Chainable: sets `href` (if given) and `target = "_self"`; it does not navigate. Defined on `<link>` elements (`HTMLLinkElement`), not on `<a>` |
| `link._open(href?)` | Chainable: sets `href` (if given) and `target = "_blank"`; it does not navigate |

## Example

Numeric setters append `px`; `padding` follows the CSS shorthand rules.

```demo
<div id="box">box</div>
<script>
    "box".$.width(120).height("48").padding(8, 16)._display("inline-block");
    console.log("box".$.style.cssText);
</script>
```

The scroll helpers write the computed offsets shown in the table:

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
