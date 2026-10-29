# Date and Number Extensions

Date-part getters, the `$format` formatter, and relative time on `Date.prototype`, plus timestamp and random-key helpers on `Number.prototype`. `Number.prototype` only carries `$uniKey`, `$ASCII`, `$date`, and `$format`; read date parts through `n.$date` (`n.$date.$yyyy`).

## Date

Source: `src/prototype/Date.ts`

| Method / Property | Description |
| --- | --- |
| `date.$y` / `$yy` / `$yyyy` | Year: `$y` and `$yy` are both the two-digit year, `$yyyy` is the full year |
| `date.$M` / `$MM` | Month, 1-indexed (raw, zero-padded) |
| `date.$D` / `$DD` | Day of month (raw, zero-padded) |
| `date.$d` / `$dd` / `$ddd` / `$dddd` | Day of week: index, then localized name at increasing length (English abbreviations or 星期X in `zh` locales, detected via `navigator.language`) |
| `date.$H` / `$HH` | 24-hour hour (raw, zero-padded) |
| `date.$h` / `$hh` | 12-hour hour (raw, zero-padded) |
| `date.$a` / `$A` | `am`/`pm` (lower/upper case) |
| `date.$m` / `$mm` | Minutes (raw, zero-padded) |
| `date.$s` / `$ss` | Seconds (raw, zero-padded) |
| `date.$S` / `date["$S$S"]` / `date["$S$S$S"]` | Milliseconds zero-padded to 3 digits, then sliced to the first 1/2/3 digits (`89` ms → `"0"` / `"08"` / `"089"`). The 2- and 3-digit getters are registered under the keys `$S$S` and `$S$S$S`; `date.$SS` and `date.$SSS` are `undefined` |
| `date.$timestamp` | Unix timestamp in seconds |
| `date.$gone` | Humanized relative time (`"3 days"` / `"3天前"`, `"Coming in 3 days"` / `"還有3天"`, `"recent"` / `"剛剛"` for &lt; 1 minute), localized by `navigator.language` |
| `date.$format(format = "yyyy/MM/DD (ddd) HH:mm:ss")` | Token-based formatter; replaces `Y`/`M`/`D`/`H`/`h`/`m`/`s`/`A`/`a`/`d` tokens at the repeat-counts shown above. A single `S` stays literal, and `SS`/`SSS` read the `undefined` `$SS`/`$SSS` getters (`"ss.SS"` → `"07.un1efine1"`), so format milliseconds with `date["$S$S$S"]` instead |
| `date.$date(body?)` | `{ start: true }`: first day of the current month; `{ end: true }`: last day of the month two months back; `{ pre: { start: true } }`: first day of the previous month; `{ pre: { end: true } }`: last day of the previous month; anything else: `new Date()`. The year comes from the two-digit `$y`, so these dates fall in 19xx (`new Date(2024, 4, 15).$date({ start: true })` is 1924-05-01) |

## Number

Source: `src/prototype/Number.ts`

| Method / Property | Description |
| --- | --- |
| `n.$uniKey` | Random string of length `n`, drawn from a 62-character alphabet, deduplicated against previously generated keys for the process lifetime |
| `n.$ASCII` | `String.fromCharCode(n)` |
| `n.$date` | Treats `n` as a Unix timestamp (seconds) and returns the corresponding `Date` |
| `n.$format(format)` | Forwarded to `n.$date.$format(format)` |

## Example

Date parts come from local time; `$gone` and day names follow `navigator.language`.

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
