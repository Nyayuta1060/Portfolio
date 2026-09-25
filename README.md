# Nyayuta's Portfolio

Web・デスクトップアプリ・自動化ツールと、ロボット制御の活動を紹介する日英対応の静的サイトです。

[公開サイト](https://nyayuta1060.github.io/Portfolio/)

## ローカルで確認

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

http://127.0.0.1:8000/ を開いてください。ビルドや依存パッケージのインストールは不要です。

## 内容の更新

表示内容は `src/data/locales/{ja,en}/` の JSON で管理します。

- `main.json`: 自己紹介、見出し、操作ラベル
- `projects.json`: 制作物、担当、使用技術、画像、リンク
- `skills.json`: 技術ごとの用途と経験
- `career.json`: 経歴と資格

日本語と英語の同じ ID を一緒に更新してください。画像は `src/assets/` に配置します。

フォームで編集する **Portfolio Maker は別リポジトリ `../Portfolio-maker/` に分離しました**。公開サイトに管理画面は含まれません。

```bash
cd ../Portfolio-maker
node server.mjs --portfolio ../Portfolio
```

http://127.0.0.1:8001/ で編集し、書き出した JSON を対応する言語のファイルに反映します。詳細はメーカー側の README を参照してください。

## 公開前の確認

```bash
node tools/validate-data.mjs
```

JSON、必須項目、画像パス、URL、日英データの整合性を確認します。サイトはリポジトリのルートからそのまま配信できます。
