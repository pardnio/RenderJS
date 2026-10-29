# 建構 DOM 元素

以標籤選擇器字串建構真實 DOM 元素，並用字串 getter 查詢元素。

## 第一次渲染：鏈式 DOM 建構

`"tag.class#id"._(attrs, children)` 依標籤選擇器字串建立真實 DOM 元素，自動處理 SVG 命名空間與 `input`/`textarea` 型別解析。`#id` 片段成為元素的 `id`；每個 `.class` 片段會連同開頭的點一起加入 class 列表（`"p.note"._()` 產生 `class=".note"`），一般 class 名稱請改用 `_class()` 或 `class` 屬性設定。jQuery 會把選到的元素包成 jQuery 物件來串接方法；RenderJS 則把方法加在原生 prototype 上，因此 `"section#test"._()` 與 `"test".$` 回傳的是一般的 `Element`。

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

    // 啟用 SVG 內嵌與圖片延遲載入監聽器
    _Listener({
        svg: true,
        lazyload: true
    });
</script>
```

## 元素查詢

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

完整方法列表見 [String 擴充](/zh/api-reference-string) 與 [Element 擴充](/zh/api-reference-element)。
