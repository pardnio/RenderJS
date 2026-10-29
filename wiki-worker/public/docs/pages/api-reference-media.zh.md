# Image、File 與 Video 擴充

`Image` 的剪貼簿、下載與重新編碼，`File` 的縮圖擷取，以及 `<video>` 元素的一次性設定。

## Image

原始碼：`src/prototype/Image.ts`

| 方法／屬性 | 說明 |
| --- | --- |
| `img.copy(mime = "image/jpeg")` | 非同步；透過 `ClipboardItem` 將圖片複製至剪貼簿 |
| `img.download(mime = "image/jpeg", filename?)` | 以 object-URL `<a download>` 連結觸發瀏覽器下載 |
| `img.$base64(mime, size?)` | 透過離屏 `<canvas>` 重新編碼；`size`（若小於最長邊）會等比例縮小圖片 |
| `img.$blob(mime, size?)` | 將 `$base64` 解碼回 `Blob` |

## File

原始碼：`src/prototype/File.ts`

| 方法 | 說明 |
| --- | --- |
| `file.$image(isVideo = false)` | 回傳 `Promise<Image>`。圖片透過 `FileReader.readAsDataURL` 解碼；影片檔（`isVideo: true`）則讀入靜音的離屏 `<video>` 並開始播放，於 `loadeddata` 時把當下畫格繪製到 `<canvas>`，產生 JPEG 縮圖 |

## HTMLVideoElement

原始碼：`src/prototype/HTMLVideoElement.ts`

| 方法 | 說明 |
| --- | --- |
| `video._config({ preload, loop, muted, controls, playsinline, download, remote })` | 鏈式一次性設定：一律先透過 `controlsList` 停用原生下載／遠端播放 UI，再套用每個傳入旗標（`download: false`／`remote: false` 會重新加回對應的 `controlsList` token）|

## 範例

`_config` 一次寫入所有旗標；`$base64` 透過 canvas 重新編碼。

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
