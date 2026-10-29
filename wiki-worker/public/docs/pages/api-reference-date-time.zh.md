# Date 與 Number 擴充

`Date.prototype` 的日期欄位 getter、`$format` 格式化與相對時間，以及 `Number.prototype` 的時間戳與隨機鍵工具。`Number.prototype` 只有 `$uniKey`、`$ASCII`、`$date`、`$format`；日期欄位請經由 `n.$date` 讀取（`n.$date.$yyyy`）。

## Date

原始碼：`src/prototype/Date.ts`

| 方法／屬性 | 說明 |
| --- | --- |
| `date.$y` / `$yy` / `$yyyy` | 年：`$y` 與 `$yy` 皆為兩位數年份，`$yyyy` 為完整年份 |
| `date.$M` / `$MM` | 月，從 1 起算（原始、補零）|
| `date.$D` / `$DD` | 日（原始、補零）|
| `date.$d` / `$dd` / `$ddd` / `$dddd` | 星期：索引，接著依長度遞增的本地化名稱（英文縮寫或 `zh` locale 的「星期X」，依 `navigator.language` 偵測）|
| `date.$H` / `$HH` | 24 小時制時（原始、補零）|
| `date.$h` / `$hh` | 12 小時制時（原始、補零）|
| `date.$a` / `$A` | `am`／`pm`（小寫／大寫）|
| `date.$m` / `$mm` | 分（原始、補零）|
| `date.$s` / `$ss` | 秒（原始、補零）|
| `date.$S` / `date["$S$S"]` / `date["$S$S$S"]` | 毫秒先補零到 3 位數，再取前 1／2／3 位（`89` ms → `"0"`／`"08"`／`"089"`）。2 位與 3 位的 getter 註冊在 `$S$S` 與 `$S$S$S` 這兩個 key；`date.$SS` 與 `date.$SSS` 為 `undefined` |
| `date.$timestamp` | Unix 秒級時間戳 |
| `date.$gone` | 人性化相對時間（`"3 days"`／`"3天前"`、`"Coming in 3 days"`／`"還有3天"`，未滿 1 分鐘為 `"recent"`／`"剛剛"`），依 `navigator.language` 本地化 |
| `date.$format(format = "yyyy/MM/DD (ddd) HH:mm:ss")` | Token 式格式化；依上表列出的重複次數取代 `Y`／`M`／`D`／`H`／`h`／`m`／`s`／`A`／`a`／`d` token。單一 `S` 原樣保留，`SS`／`SSS` 讀取的是 `undefined` 的 `$SS`／`$SSS` getter（`"ss.SS"` → `"07.un1efine1"`），毫秒請改用 `date["$S$S$S"]` |
| `date.$date(body?)` | `{ start: true }`：當月第一天；`{ end: true }`：兩個月前那個月的最後一天；`{ pre: { start: true } }`：上個月第一天；`{ pre: { end: true } }`：上個月最後一天；其餘回傳 `new Date()`。年份取自兩位數的 `$y`，因此回傳日期落在 19xx 年（`new Date(2024, 4, 15).$date({ start: true })` 為 1924-05-01）|

## Number

原始碼：`src/prototype/Number.ts`

| 方法／屬性 | 說明 |
| --- | --- |
| `n.$uniKey` | 長度為 `n` 的隨機字串，取自 62 字元字母表，在該行程生命週期內去重 |
| `n.$ASCII` | `String.fromCharCode(n)` |
| `n.$date` | 將 `n` 視為 Unix 秒級時間戳，回傳對應的 `Date` |
| `n.$format(format)` | 轉發至 `n.$date.$format(format)` |

## 範例

日期欄位取自本地時間；`$gone` 與星期名稱依 `navigator.language` 而定。

```demo
<script>
    const date = new Date(2024, 0, 15, 9, 5, 7);
    console.log(date.$yyyy, date.$MM, date.$DD, date.$HH, date.$hh, date.$A);
    console.log(date.$format("yyyy-MM-DD HH:mm:ss"));
    console.log(date.$timestamp.$format("yyyy/MM/DD"));
    console.log(new Date(Date.now() - 3 * 86400000).$gone);
    console.log((8).$uniKey.length, (65).$ASCII);
    console.log(date.$y, date.$date({ start: true }).$yyyy);
</script>
```
