# First RJS Template

Create an `RJS` instance, define `data`/`event`/`when`, and trigger the next render with `renew()`.

## Create and Update

`RJS` renders a template once (no vDOM diffing) and lets you trigger the next render manually with `renew()`. See [Directive Parsing](/core-concepts-directives) for how the directive pipeline works.

```javascript
const app = "#app".RJS({
    data: {
        // Define data
    },
    event: {
        // Define event methods
    },
    when: {
        before_render: function () {
            // Runs before rendering; return false to cancel
        },
        rendered: function () {
            // Runs after rendering completes
        }
    }
});

// Update: data and when keys are merged into the instance (see Core Concepts for what renew() re-renders)
app.renew({
    data: { /* ... */ },
    when: { /* ... */ }
});
```

## Live Example

`data` fills `{{ title }}`, `event.greet` is bound through `@click`, and `when.rendered` runs once the render pass finishes.

```demo
<div id="app">
    <h3>{{ title }}</h3>
    <button @click="greet">Greet</button>
    <p id="log"></p>
</div>
<script>
    "#app".RJS({
        data: {
            title: "Hello, RenderJS"
        },
        event: {
            greet: function () {
                "log".$.textContent = "event.greet() called";
            }
        },
        when: {
            before_render: function () {
                return true;
            },
            rendered: function () {
                "log".$.textContent = "when.rendered() called";
            }
        }
    });
</script>
```
