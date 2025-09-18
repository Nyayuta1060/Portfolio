# Portfolio 記事管理システム

## 概要

このシステムは、Markdownファイルでブログ記事を管理し、自動でポートフォリオサイト用のJSONデータを生成します。Portfolio-PageGeneratorを廃止し、シンプルで効率的なMarkdownベースの記事管理を実現しました。

## 主な特徴

- ✅ **シンプル**: 複雑な設定不要、Markdownで記事を書くだけ
- ✅ **自動変換**: Markdown → HTML自動変換でブラウザ表示対応
- ✅ **統合設定**: config.jsで一元管理（カテゴリ、デフォルト値）
- ✅ **インタラクティブ**: 記事作成時の対話式入力
- ✅ **最適化**: 重複削除とパフォーマンス向上

## ディレクトリ構造

```
src/articles/
├── config.js           # 設定ファイル（カテゴリ、デフォルト値）
├── new-article.js      # 新記事作成スクリプト
├── build-news.js       # データ生成スクリプト（config.js使用）
├── README.md           # このファイル
├── templates/          # 記事テンプレート
│   └── article-template.md
└── data/               # 記事ファイル（Markdown）
    └── YYYY-MM-DD-slug.md
```

### 生成されるファイル

```
src/scripts/
└── news-data.js        # 自動生成されるJSONデータ
```

## 使用方法

### 1. 新記事作成

```bash
cd /home/nyayuta/workspace/Portfolio
node src/articles/new-article.js
```

インタラクティブに以下の項目を入力：
- 記事タイトル
- カテゴリ
- タグ（カンマ区切り）
- 記事の要約
- 読了時間

### 2. 記事編集

`src/articles/data/` に生成されたMarkdownファイルを編集します。

#### Front Matter（記事メタデータ）

```yaml
---
title: "記事タイトル"
date: "2025-09-18"
category: "Programming"
tags: ["JavaScript", "Web Development"]
author: "Nyayuta"
excerpt: "記事の要約"
readTime: "5分"
featured: false
---
```

#### 本文

Markdown記法で記事を書きます：

```markdown
# 見出し1

## 見出し2

通常のテキストです。

- リスト項目1
- リスト項目2

\`\`\`javascript
// コード例
function example() {
    console.log("Hello, World!");
}
\`\`\`
```

### 3. データ生成

記事を書き終えたら、以下のコマンドでJSONデータを生成：

```bash
node src/articles/build-news.js
```

これにより `src/scripts/news-data.js` が自動生成されます。

**生成されるデータ構造:**
- `newsData`: 記事配列（日付順ソート）
- `categories`: カテゴリ一覧（config.jsから自動取得）
- `content`: 元のMarkdown形式
- `contentHtml`: HTML変換版（ブラウザ表示用）
- ヘルパー関数群（検索、フィルタリング、日付フォーマットなど）

### 4. 公開

#### 方法1: 自動公開スクリプト（推奨）

```bash
node src/articles/publish.js
```

このスクリプトが以下を自動実行：
- データ生成（`build-news.js`）
- 変更ファイルのステージング
- インタラクティブなコミット・プッシュ

#### 方法2: 手動公開

```bash
node src/articles/build-news.js
git add src/articles/data/*.md src/scripts/news-data.js
git commit -m "新記事: タイトル"
git push origin main
```

**注意**: `news-data.js`をpushし忘れると記事が表示されません！

## 設定管理（config.js）

カテゴリやデフォルト値は `config.js` で一元管理されています：

### カテゴリ一覧（config.jsから自動取得）

- Deep Learning
- Programming
- NLP
- Data Science
- Web Development
- AI Research
- Competition
- Study Notes

### デフォルト設定

- **読了時間**: 3分
- **注目記事**: false
- **著者**: Nyayuta

## ファイル命名規則

記事ファイルは以下の形式で命名されます：
`YYYY-MM-DD-slug.md`

例：`2025-09-18-portfolio-new-article-system.md`

## 注意事項

### 必須要件
- Front Matterは必須です
- `title`、`date`、`category` は必須フィールド
- 日付は `YYYY-MM-DD` 形式で記述
- タグは配列形式 `["tag1", "tag2"]`

### Markdown機能サポート
- ✅ ヘッダー (`#`, `##`, `###`)
- ✅ コードブロック (````language`)
- ✅ インラインコード (`` `code` ``)
- ✅ 太字・イタリック (`**bold**`, `*italic*`)
- ✅ リスト (`- item`)
- ✅ リンク (`[text](url)`)
- ✅ 区切り線 (`---`)

### システム要件
- Node.js環境が必要
- config.jsの変更後は再ビルド必要

## トラブルシューティング

### エラー: "Front Matterが見つかりません"

記事の先頭に `---` で囲まれたFront Matterがあることを確認してください。

### エラー: "必須フィールドが不足しています"

`title`、`date`、`category` フィールドがFront Matterに含まれているか確認してください。

## ワークフロー例

1. `node src/articles/new-article.js` で記事作成
2. 生成されたファイルを編集
3. `node src/articles/build-news.js` でデータ生成
4. Gitでコミット・プッシュ

これで記事がポートフォリオサイトに反映されます。

## システムアーキテクチャ

### 処理フロー

```
Markdownファイル作成 → Front Matter解析 → HTML変換 → JSONデータ生成 → Webサイト表示
```

### ファイルの役割

| ファイル | 役割 | 説明 |
|---------|------|------|
| `config.js` | 設定管理 | カテゴリ、デフォルト値の一元管理 |
| `new-article.js` | 記事作成 | インタラクティブな記事ファイル生成 |
| `build-news.js` | データ生成 | Markdown→JSON変換とHTML生成 |
| `news-data.js` | 出力データ | ブラウザで使用する記事データ |

### データ変換プロセス

1. **Front Matter解析**: YAML形式メタデータの抽出
2. **Markdown→HTML変換**: ブラウザ表示用の変換処理
3. **データ統合**: config.jsからの設定値統合
4. **ソート・最適化**: 日付順ソートと出力最適化

