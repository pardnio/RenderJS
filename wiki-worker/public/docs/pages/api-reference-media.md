# Image, File and Video Extensions

Clipboard, download, and re-encoding on `Image`, thumbnail extraction on `File`, and one-call configuration on `<video>` elements.

## Image

Source: `src/prototype/Image.ts`

| Method / Property | Description |
| --- | --- |
| `img.copy(mime = "image/jpeg")` | Async; copies the image to the clipboard via `ClipboardItem` |
| `img.download(mime = "image/jpeg", filename?)` | Triggers a browser download using an object-URL `<a download>` link |
| `img.$base64(mime, size?)` | Re-encodes via an offscreen `<canvas>`; `size` (if smaller than the longest side) proportionally downscales the image first |
| `img.$blob(mime, size?)` | `$base64` decoded back into a `Blob` |

## File

Source: `src/prototype/File.ts`

| Method | Description |
| --- | --- |
| `file.$image(isVideo = false)` | Returns a `Promise<Image>`. For images, decodes via `FileReader.readAsDataURL`. For video files (`isVideo: true`), reads the file into a muted offscreen `<video>`, starts playback, and on `loadeddata` draws the current frame onto a `<canvas>` to produce a JPEG thumbnail |

## HTMLVideoElement

Source: `src/prototype/HTMLVideoElement.ts`

| Method | Description |
| --- | --- |
| `video._config({ preload, loop, muted, controls, playsinline, download, remote })` | Chainable one-call setup: always disables the native download/remote-playback UI via `controlsList`, then applies each provided flag (`download: false`/`remote: false` re-add the corresponding `controlsList` token) |

## Example

`_config` writes every flag in one call; `$base64` re-encodes through a canvas.

```demo
<video id="video"></video>
<script>
    "video".$._config({ muted: true, loop: true, controls: true, playsinline: true });
    console.log("video".$.outerHTML);

    const img = new Image();
    img.onload = () => console.log(img.$base64("image/png", 32).slice(0, 30));
    img.src = "/favicon.png";
</script>
```
