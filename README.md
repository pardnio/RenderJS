![](./cover.png)

# RenderJS

[![Author](https://img.shields.io/badge/Author-邱敬幃%20Pardn%20Chiu-white)](https://github.com/pardnchiu)
[![npm](https://img.shields.io/npm/v/@pardnchiu/renderjs)](https://www.npmjs.com/package/@pardnchiu/renderjs)
[![jsdeliver](https://img.shields.io/jsdelivr/npm/hm/@pardnchiu/renderjs)](https://www.jsdelivr.com/package/npm/@pardnchiu/renderjs)

> RenderJS is a lightweight tool focusing on extending JavaScript native object prototypes, providing powerful DOM manipulation and data processing methods.

> [!NOTE]
> (Formerly known as PDExtension/PDRenderKit, renamed to RenderJS starting from version `2.0.0`)

## Feature

### Simplified DOM Manipulation

Achieve complex DOM operations with concise chainable syntax.

### Enhanced Querying

Quickly retrieve elements with simplified selector syntax, supporting both single and multiple element selection.

### Built-in Extensions 

Predefined prototype extensions accelerate development across various scenarios.

### Plug and Play 

Seamlessly integrates with existing JavaScript projects and supports modern browsers.

## Installation

### Install via npm

```shell
npm i @pardnchiu/renderjs
```

### Include via CDN

```html
<!-- Version 2.0.0 and above -->
<script src="https://cdn.jsdelivr.net/npm/@pardnchiu/renderjs@[VERSION]/dist/RenderJS.js"></script>

<!-- Version 1.5.2 and below -->
<script src="https://cdn.jsdelivr.net/npm/pdrenderkit@[VERSION]/dist/PDRenderKit.js"></script>
```

## Overview

### Extension

- #### Before
    ```javascript
    let section = document.createElement("section");
    section.id = "#test";
    document.body.appendChild(section);

    let button = document.createElement("button");
    button.style.width = "10rem";
    button.style.height = "2rem";
    button.style.backgroundColor = "steelblue";
    button.style.color = "fff";
    button.onclick = function(){
        alert("test")
    };
    button.innerHTML = "<span>test</span> button";
    section.appendChild(button);

    let svg = document.createElement("span");
    span.classList.add("svg");
    span.setAttribute("path", "https://xxxxxx");
    section.appendChild(span);

    let img = document.createElement("img");
    img.classList.add("lazyload");
    img.dataset.src = "https://xxxxxx";
    section.appendChild(img);

    let input = document.createElement("input");
    input.placeholder = "type";
    input.type = "email";
    section.appendChild(input);
    ```
- #### After
    ```javascript
    document.body._child(
        "section#test"._([
            "button"._({
                style: {
                    width: "10rem",
                    hright: "2rem",
                    backgroundColor: "steelblue",
                    color: "#fff"
                }
            }, [
                // or "<span>test</span> button"
                "span"._("test"),
                " button"
            ])._click(function(){
                alert("test")
            }),
            "span.svg:._({ path: "https://xxxxxx" }),
            // No Lazy Loading => "img"._("https://xxxxxx"),
            "img"._({ lazyload: "https://xxxxxx" }),
            "input@email type"._()
        ])
    );

    _Listener({
        svg: true,     // Add SVGListener, convert span.svg to svg tag
        lazyload: true // Add Lazy Listener, Lazy Loading images
    });
    ```
- #### Get Element
    - Before
        ```javascript
        document.getElementById("test");
        document.querySelector("div.test");
        document.querySelectorAll("div.test");
        document.querySelector("input[name='test']");
        ```
    - After
        ```javascript
        "test".$;
        "div.test".$;
        "div.test".$all;
        "input[name='test']".$;
        ```
- #### Add Element
    - Before
        ```html
        <div class="test" style="width: 5rem; height: 80px;" test="test">
            <button>
                <img src="https://xxxxxx">
            </button>
        </div>
        ```
    - After
        ```Javascript
        "div.test"._({
            style: {
                width: "5rem",
                height: 80,
            },
            test: "test"
        }, [
            "button"._([
                "img"._("https://xxxxxx")
            ])
        ]);
        ```


### Simplified Frontend Framework

> [!NOTE]
> RJS is a simplified frontend framework based on [QuickUI](https://pardn.ltd/QuickUI), designed for specific projects
> - Renders using non-vDOM technology, enhancing performance and reducing complexity.
> - Removes automatic listening and updating, giving developers manual control over update processes.
> - Introduces `renew()` function to support precise updates of data and events.

| Attribute | Description |
| --- | --- |
| `{{value}}` | Inserts text into HTML tags and automatically updates with data changes. |
| `:path` | Used with the `temp` tag to load HTML fragments from external files into the current page. |
| `:html` | Replaces the element's `innerHTML` with text. |
| `:for` | Supports formats like `item in items`, `(item, index) in items`, `(key, value) in object`. Iterates over data collections to generate corresponding HTML elements. |
| `:if`<br>`:else-if`<br>`:elif`<br>`:else` | Displays or hides elements based on specified conditions, enabling branching logic. |
| `:model` | Binds data to form elements (e.g., `input`), updating data automatically when input changes. |
| `:[attr]` | Sets element attributes, such as `ID`, `class`, image source, etc.<br>Examples: `:id`/`:class`/`:src`/`:alt`/`:href`... |
| `:[css]` | Sets element CSS, such as margin, padding, etc. Examples: `:background-color`, `:opacity`, `:margin`, `:top`, `:position`... |
| `@[event]` | Adds event listeners that trigger specified actions upon activation.<br>Examples: `@click`/`@input`/`@mousedown`... |

- ##### Initializing `RJS`
    ```JavaScript
    const app = "(ComponentID)".RJS({
        data: {
            // Define data
        },
        event: {
            // Define events
        },
        when: {
            before_render: function () {
                // Executes before rendering (can stop rendering)
                // return false 
            },
            rendered: function () {
                // Executes after rendering
            }
        }
    });
    ```
- #### Updating `RJS`
    ```JavaScript
    app.renew({
        // data: Only include data items to update; unmentioned items retain initial values.
        // event: Only include event items to update; unmentioned items retain initial values.
        // when: Only include lifecycle logic to update; unmentioned items retain initial logic.
    });
    ```

### Interface

| [String](./src/interface/String.ts) | [Number](./src/interface/Number.ts) | [Array](./src/interface/Array.ts) | [**HTMLElement**](./src/interface/HTMLElement.ts) |
| :- | :- | :- | :- |
| [**Object**](./src/interface/Object.ts) | [**Map**](./src/interface/Map.js) | [**Date**](./src/interface/Date.ts) | [**HTMLFormElement**](./src/interface/HTMLFormElement.ts) |
| [**URL**](./src/interface/URL.js) | [**FormData**](./src/interface/FormData.ts) | [**File**](./src/interface/File.ts) | [**HTMLLinkElement**](./src/interface/HTMLLinkElement.ts) |
| [**Image**](./src/interface/Image.ts) | [**Element**](./src/interface/Element.ts) | [**DocumentFragment**](./src/interface/DocumentFragment.ts) | [**HTMLVideoElement**](./src/interface/HTMLVideoElement.ts) |
| [**window**](./src/interface/window.ts) |

## License

This project is licensed under the [MIT License](LICENSE).

## Creator

<img src="https://avatars.githubusercontent.com/u/25631760" align="left" width="96" height="96" style="margin-right: 0.5rem;">

<h4 style="padding-top: 0">邱敬幃 Pardn Chiu</h4>

<a href="mailto:dev@pardn.io" target="_blank">
    <img src="https://pardn.io/image/email.svg" width="48" height="48">
</a> <a href="https://linkedin.com/in/pardnchiu" target="_blank">
    <img src="https://pardn.io/image/linkedin.svg" width="48" height="48">
</a>

## Star History

[![Star](https://api.star-history.com/svg?repos=pardnchiu/RenderJS&type=Date)](https://www.star-history.com/#pardnchiu/RenderJS&Date)

***

©️ 2022 [邱敬幃 Pardn Chiu](https://www.linkedin.com/in/pardnchiu)

