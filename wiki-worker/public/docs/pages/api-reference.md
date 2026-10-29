# API Reference

RenderJS extends native constructors' `.prototype` directly (`src/prototype/*.ts`); nothing is a standalone import. Loading the bundle is enough to make every method below available globally.

## Pages by Constructor

| Page | Extends |
| --- | --- |
| [String Extensions](/api-reference-string) | `String` |
| [Element Extensions](/api-reference-element) | `Element` / `DocumentFragment` |
| [HTMLElement and Link Extensions](/api-reference-html-element) | `HTMLElement` / `HTMLLinkElement` |
| [Array and Object Extensions](/api-reference-array-object) | `Array` / `Object` |
| [Map and Form Data Extensions](/api-reference-map-form) | `Map` / `FormData` / `HTMLFormElement` |
| [URL Extensions](/api-reference-url) | `URL` |
| [Global Functions](/api-reference-window) | `window` |
| [Date and Number Extensions](/api-reference-date-time) | `Date` / `Number` |
| [Image, File and Video Extensions](/api-reference-media) | `Image` / `File` / `HTMLVideoElement` |

Extensions dropped in the 2.x line, with their replacements, are listed on [Removed API](/removed-api).
