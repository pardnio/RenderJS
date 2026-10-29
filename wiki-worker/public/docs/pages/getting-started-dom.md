# Building DOM Elements

Build real DOM elements from tag-selector strings and query elements with string getters.

## First Render: Chainable DOM Construction

`"tag.class#id"._(attrs, children)` builds a real DOM element from a tag-selector string, handling SVG namespace and `input`/`textarea` type parsing automatically. The `#id` segment becomes the element's `id`; each `.class` segment is added to the class list with its leading dot (`"p.note"._()` gives `class=".note"`), so plain class names go through `_class()` or a `class` attribute. Where jQuery wraps matched elements in a jQuery object to chain its methods, RenderJS adds its methods to the native prototypes, so `"section#test"._()` and `"test".$` return plain `Element` objects.

```demo
<script>
    document.body._child(
        "section#test"._([
            "button"._({
                style: {
                    width: "10rem",
                    height: "2rem",
                    backgroundColor: "steelblue",
                    color: "#fff"
                }
            }, [
                "span"._("test"),
                " button"
            ])._click(function () {
                alert("test");
            }),
            "img"._({ lazyload: "/assets/cover.png", width: 160 }),
            "input@email type"._()
        ])
    );

    // Enable SVG inlining and image lazyload listeners
    _Listener({
        svg: true,
        lazyload: true
    });
</script>
```

## Element Querying

```demo
<div id="test">#test</div>
<div class="test">first .test</div>
<div class="test">second .test</div>
<pre id="out"></pre>
<script>
    "out".$.textContent = [
        '"test".$        -> ' + "test".$.textContent,
        '"div.test".$    -> ' + "div.test".$.textContent,
        '"div.test".$all -> ' + "div.test".$all.length + " elements"
    ].join("\n");
</script>
```

Full method lists: [String Extensions](/api-reference-string) and [Element Extensions](/api-reference-element).
