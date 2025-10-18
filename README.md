# Nyayuta's Portfolio

[こちら](https://nyayuta1060.github.io/Portfolio/)からアクセスしてください。

## 📁 プロジェクト構成

```
Portfolio/
├── index.html              # メインHTMLファイル
├── src/
│   ├── assets/            # 画像・メディアファイル
│   │   ├── projects/      # プロジェクト画像
│   │   └── skillstocks/   # スキルアイコン画像
│   ├── scripts/           # JavaScriptファイル
│   │   ├── app.js         # メインアプリケーション
│   │   ├── components.js  # UIコンポーネント
│   │   ├── constants.js   # 定数定義
│   │   ├── skillsData.js  # スキルデータ管理
│   │   ├── projectsData.js # プロジェクトデータ管理
│   │   ├── animations.js  # アニメーション機能
│   │   ├── navigation.js  # ナビゲーション機能
│   │   ├── utils.js       # ユーティリティ関数
│   │   ├── SKILLS_GUIDE.md # スキル追加ガイド
│   │   ├── SKILL_TEMPLATE.js # スキル追加テンプレート
│   │   ├── PROJECTS_GUIDE.md # プロジェクト追加ガイド
│   │   └── PROJECT_TEMPLATE.js # プロジェクト追加テンプレート
│   └── styles/            # CSSファイル
│       ├── base.css       # 基本スタイル
│       ├── components.css # コンポーネントスタイル
│       ├── layout.css     # レイアウト
│       ├── pages.css      # ページ固有のスタイル
│       └── responsive.css # レスポンシブデザイン
└── README.md
```

## ✨ 機能

- 📱 **レスポンシブデザイン**: モバイル・タブレット・デスクトップに対応
- 🎨 **スキル詳細モーダル**: クリックでスキルの詳細情報を表示
- 🔍 **スキルフィルター**: カテゴリごとにスキルを絞り込み
- ⚡ **パーティクルアニメーション**: 背景の動的エフェクト
- 🌙 **ダークモードデザイン**: 目に優しい UI テーマ

## 🚀 コンテンツの追加方法

### スキルの追加

新しいスキルを追加する手順は、[スキル管理ガイド](src/scripts/SKILLS_GUIDE.md)をご覧ください。

#### クイックスタート

1. **スキルデータを追加**: `src/scripts/skillsData.js`
2. **画像を配置**: `src/assets/skillstocks/`
3. **HTML に追加**: `index.html` の適切なカテゴリセクション

詳細な手順とテンプレートは以下を参照:

- 📖 [SKILLS_GUIDE.md](src/scripts/SKILLS_GUIDE.md) - 詳細なガイド
- 📝 [SKILL_TEMPLATE.js](src/scripts/SKILL_TEMPLATE.js) - コピー&ペーストできるテンプレート

### プロジェクトの追加

新しいプロジェクトを追加する手順は、[プロジェクト管理ガイド](src/scripts/PROJECTS_GUIDE.md)をご覧ください。

#### クイックスタート

1. **プロジェクトデータを追加**: `src/scripts/projectsData.js`
2. **画像を配置**: `src/assets/projects/`（画像使用の場合）
3. **HTML に追加**: `index.html` のプロジェクトセクション

詳細な手順とテンプレートは以下を参照:

- 📖 [PROJECTS_GUIDE.md](src/scripts/PROJECTS_GUIDE.md) - 詳細なガイド
- 📝 [PROJECT_TEMPLATE.js](src/scripts/PROJECT_TEMPLATE.js) - コピー&ペーストできるテンプレート

## 🛠️ 技術スタック

- **HTML5**: セマンティックマークアップ
- **CSS3**: Flexbox, Grid, Animations
- **JavaScript (ES6+)**: モジュール、非同期処理
- **Font Awesome**: アイコン
- **Google Fonts**: Inter, JetBrains Mono

## 📝 開発ガイド

### ローカル開発

簡易サーバーを起動:

```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

ブラウザで `http://localhost:8000` にアクセス

### コード構造

- **モジュール分割**: 機能ごとにファイルを分離
- **定数管理**: `constants.js` で一元管理
- **データ駆動**: スキル情報は `skillsData.js`、プロジェクト情報は `projectsData.js` で管理
- **再利用可能**: ヘルパー関数を活用
- **ガイド付き**: 各データタイプに追加ガイドとテンプレートを用意

## 📄 ライセンス

このプロジェクトは個人ポートフォリオサイトです。

---

**Created with ❤️ by Nyayuta**
