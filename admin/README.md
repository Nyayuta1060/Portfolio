## 更新方法

このサイトは `src/data/locales/{ja,en}/` 配下のJSONから表示データを読み込みます。
JSONを直接編集したくない場合は、ローカルサーバーを起動して `admin/index.html` を開いてください。

```bash
python3 -m http.server 8000
```

起動後、次のURLから編集できます。

```text
http://localhost:8000/admin/
```

管理画面では、言語とデータ種別を選び、フォームで項目を編集してJSONを書き出せます。
書き出したJSONは対象ファイルに反映してください。

## データ確認

公開前に次のコマンドで、JSON構文、必須項目、画像パス、URL、日英データのキー差分を確認します。

```bash
node tools/validate-data.mjs
```
