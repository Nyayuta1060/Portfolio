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
│   │   ├── animations.js  # アニメーション機能
│   │   ├── navigation.js  # ナビゲーション機能
│   │   ├── utils.js       # ユーティリティ関数
│   │   ├── SKILLS_GUIDE.md # スキル追加ガイド
│   │   └── SKILL_TEMPLATE.js # スキル追加テンプレート
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
- 🌙 **ダークモードデザイン**: 目に優しいUIテーマ

## 🚀 スキルの追加方法

新しいスキルを追加する手順は、[スキル管理ガイド](src/scripts/SKILLS_GUIDE.md)をご覧ください。

### クイックスタート

1. **スキルデータを追加**: `src/scripts/skillsData.js`
2. **画像を配置**: `src/assets/skillstocks/`
3. **HTMLに追加**: `index.html` の適切なカテゴリセクション

詳細な手順とテンプレートは以下を参照:
- 📖 [SKILLS_GUIDE.md](src/scripts/SKILLS_GUIDE.md) - 詳細なガイド
- 📝 [SKILL_TEMPLATE.js](src/scripts/SKILL_TEMPLATE.js) - コピー&ペーストできるテンプレート

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
- **データ駆動**: スキル情報は `skillsData.js` で管理
- **再利用可能**: ヘルパー関数を活用

## 📄 ライセンス

このプロジェクトは個人ポートフォリオサイトです。

---

**Created with ❤️ by Nyayuta**
