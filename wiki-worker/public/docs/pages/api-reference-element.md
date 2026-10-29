# Element Extensions

Chainable methods on `Element.prototype` and `DocumentFragment.prototype` for content, classes, attributes, children, traversal, and event handlers.

## Element

Source: `src/prototype/Element.ts`

| Method / Property | Description |
| --- | --- |
| `el.length` | `this.children.length` |
| `el.$i` | Index of the element among its parent's children |
| `el.$attributes` | All attributes as a plain `{ name: value }` object |
| `el._(value)` / `el.__(value)` | Append / replace children — strings and numbers become a text node; plain objects are pretty-printed as `<br>`-joined JSON |
| `el._style(map)` / `el._data(map)` / `el._attr(map)` | Chainable: set multiple `style` / `dataset` / attribute key-values from an object |
| `el._class(list)` | Chainable: add one or more classes (string, comma/space/dot-separated, or array) |
| `el.class_(list)` / `el.style_(list)` / `el.data_(list)` / `el.attr_(list)` | Chainable: remove classes / clear styles / delete dataset keys / remove attributes |
| `el.$style(key)` / `el.$data(key)` / `el.$attr(key)` | Read a single style property / dataset entry / attribute value |
| `el.class__()` | Chainable: clears `className` entirely |
| `el.__class(list)` | Chainable: replaces the whole class list |
| `el.$$class(list)` | `true` only if **every** class in `list` is present |
| `el.$$class_(bool, list)` | Chainable: adds `list` when `bool` is falsy, removes it when truthy (or auto-detects current state if `bool` is omitted) |
| `el.$$data(key, value?)` / `el.$$attr(key, value?)` | `true` if the dataset/attribute value equals `value`, or is non-empty when `value` is omitted |
| `el._children(...args)` | Chainable: appends each argument via `_child` |
| `el._child(value, before)` | Chainable: append/insert a child (or array of children) by index or reference `Element` |
| `el.__child(value)` | Chainable: replaces children (`replaceChildren`) |
| `el.$child(value)` | Query a descendant by a mixed array of selector strings and numeric indices |
| `el.$parent(count)` / `el.$pre(count)` / `el.$next(count)` | Walk `count + 1` steps along `parentElement` / `previousElementSibling` / `nextElementSibling` (`count` defaults to `0`, the adjacent node) |
| `el.$sel(selector)` / `el.$selAll(selector)` | `querySelector` / `querySelectorAll` guarded against an empty selector |
| `el._<event>(fn)` | Chainable `on<event> = fn` assignment; see [Event Setters](#event-setters) for the full list |

## Event Setters

Each setter assigns `fn` to the matching `on<event>` property and returns the element, so handlers chain like any other setter. Assigning replaces the previous handler for that event (it does not call `addEventListener`).

| Group | Setters |
| --- | --- |
| Page / focus | `_load`, `_scroll`, `_focus`, `_blur` |
| Mouse | `_click`, `_dblclick`, `_contextmenu`, `_mousedown`, `_mouseup`, `_mouseenter`, `_mouseleave`, `_mouseover`, `_mouseout`, `_mousemove` |
| Keyboard / form | `_input`, `_change`, `_keydown`, `_keyup`, `_cut`, `_paste` |
| Touch | `_touchstart`, `_touchmove`, `_touchend`, `_touchenter`, `_touchleave`, `_touchup` |
| Drag and drop | `_dragstart`, `_dragenter`, `_dragover`, `_dragleave`, `_dragend`, `_drop` |

`touchenter`, `touchleave`, and `touchup` are not events the browser dispatches, so the handlers set by `_touchenter`, `_touchleave`, and `_touchup` are stored on the element but never called. `_touchstart`, `_touchmove`, and `_touchend` fire only on devices that expose touch events.

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

Source: `src/prototype/DocumentFragment.ts`

| Method / Property | Description |
| --- | --- |
| `fragment.innerHTML` | Serializes the fragment's contents via a detached `<div>` |
| `fragment.length` | `this.children.length` |
| `fragment._children(...args)` | Appends each argument as a child |
| `fragment._child(value)` | Appends a value (or array of values); strings/numbers become text nodes |

## Example

Chains child, class, and attribute setters on one list, then reads them back.

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
