# 第一個 RJS 模板

建立 `RJS` 實例、定義 `data`／`event`／`when`，並以 `renew()` 觸發下一次渲染。

## 建立與更新

`RJS` 只渲染一次（不做 vDOM 比對），下一次渲染需透過 `renew()` 手動觸發。指令解析流程詳見 [指令解析](/zh/core-concepts-directives)。

```javascript
const app = "#app".RJS({
    data: {
        // 定義資料
    },
    event: {
        // 定義事件方法
    },
    when: {
        before_render: function () {
            // 渲染前執行，return false 可中止渲染
        },
        rendered: function () {
            // 渲染完成後執行
        }
    }
});

// 更新：data 與 when 的鍵會合併進實例（renew() 的重新渲染行為見核心概念）
app.renew({
    data: { /* ... */ },
    when: { /* ... */ }
});
```

## 即時範例

`data` 填入 `{{ title }}`，`event.greet` 透過 `@click` 綁定，`when.rendered` 在渲染完成後執行。

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
