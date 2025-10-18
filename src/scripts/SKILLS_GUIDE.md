# スキル管理ガイド

このドキュメントでは、ポートフォリオサイトに新しいスキルを追加する方法を説明します。

## 📋 目次

- [スキルの追加方法](#スキルの追加方法)
- [データ構造の説明](#データ構造の説明)
- [画像の追加](#画像の追加)
- [HTMLへの追加](#htmlへの追加)

## 🚀 スキルの追加方法

### ステップ1: スキルデータを追加

`src/scripts/skillsData.js` ファイルを開き、`SKILL_DETAILS` オブジェクトに新しいスキルを追加します。

```javascript
// 例: Reactを追加する場合
react: {
  name: 'React',
  category: CATEGORIES.FRONTEND,  // frontend, backend, ai-ml, tools のいずれか
  level: SKILL_LEVELS.INTERMEDIATE,  // BEGINNER, INTERMEDIATE, ADVANCED, EXPERT
  frequency: FREQUENCY.WEEKLY_3_5,  // 定義済みの頻度定数を使用
  usage: 'フロントエンド開発、SPA構築',
  experience: '2024年1月〜',
  comment: 'モダンなUIライブラリ。コンポーネント設計を学習中です。',
  links: {
    official: 'https://react.dev/',
    github: 'https://github.com/facebook/react'
  }
}
```

### ステップ2: スキル画像を追加

`src/assets/skillstocks/` ディレクトリに、スキルIDと同じ名前の画像ファイルを配置します。

```
src/assets/skillstocks/react.png
```

**画像の要件:**
- ファイル名: スキルIDと同じ (例: `react.png`)
- 推奨サイズ: 128x128 ピクセル以上
- 形式: PNG または SVG
- 背景: 透過推奨

### ステップ3: HTMLにカードを追加

`index.html` のスキルセクションに、新しいスキルカードを追加します。

```html
<!-- 適切なカテゴリセクション内に追加 -->
<div class="skill-card" data-tech="react" data-category="frontend">
  <div class="skill-image">
    <img src="./src/assets/skillstocks/react.png" alt="React" loading="lazy">
  </div>
  <div class="skill-name">React</div>
</div>
```

**重要なポイント:**
- `data-tech` 属性: `skillsData.js` のスキルIDと一致させる
- `data-category` 属性: スキルのカテゴリと一致させる
- 正しいカテゴリセクション内に配置する

## 📊 データ構造の説明

### スキルレベル (SKILL_LEVELS)

```javascript
BEGINNER     // 初級: 学習中、基本的な使い方を理解
INTERMEDIATE // 中級: 実務で使用できる、基本は問題なし
ADVANCED     // 上級: 高度な機能も使いこなせる、他人に教えられる
EXPERT       // エキスパート: 深い理解、最適化や設計ができる
```

### 使用頻度 (FREQUENCY)

```javascript
DAILY        // 毎日
WEEKLY_5_7   // 週5-7回
WEEKLY_3_5   // 週3-5回
WEEKLY_2_4   // 週2-4回
WEEKLY_1_2   // 週1-2回
MONTHLY      // 月2-4回
RARELY       // 稀に使用
```

### カテゴリ (CATEGORIES)

```javascript
FRONTEND     // フロントエンド開発
BACKEND      // バックエンド開発
AI_ML        // AI/機械学習
TOOLS        // 開発ツール
```

## 🖼️ 画像の追加

### 画像の取得方法

1. **公式サイトから**: 多くの技術の公式サイトにロゴがあります
2. **Simple Icons**: https://simpleicons.org/ から高品質なアイコンを取得
3. **DevIcon**: https://devicon.dev/ から開発関連のアイコンを取得
4. **GitHub**: 公式リポジトリにロゴが含まれていることが多い

### 画像の最適化

画像サイズを小さくするために、以下のツールを使用できます:
- **TinyPNG**: https://tinypng.com/
- **Squoosh**: https://squoosh.app/
- **ImageOptim**: https://imageoptim.com/

## 📝 HTMLカード追加の詳細

スキルカードは以下のカテゴリセクションに追加します:

### Frontend Development
```html
<div class="skill-category-section" data-category="frontend">
  <h3 class="category-title">
    <i class="fas fa-laptop-code"></i>
    Frontend Development
  </h3>
  <div class="skills-grid">
    <!-- ここにfrontendのスキルカードを追加 -->
  </div>
</div>
```

### Backend Development
```html
<div class="skill-category-section" data-category="backend">
  <h3 class="category-title">
    <i class="fas fa-server"></i>
    Backend Development
  </h3>
  <div class="skills-grid">
    <!-- ここにbackendのスキルカードを追加 -->
  </div>
</div>
```

### AI & Machine Learning
```html
<div class="skill-category-section" data-category="ai-ml">
  <h3 class="category-title">
    <i class="fas fa-brain"></i>
    AI & Machine Learning
  </h3>
  <div class="skills-grid">
    <!-- ここにai-mlのスキルカードを追加 -->
  </div>
</div>
```

### Development Tools
```html
<div class="skill-category-section" data-category="tools">
  <h3 class="category-title">
    <i class="fas fa-tools"></i>
    Development Tools
  </h3>
  <div class="skills-grid">
    <!-- ここにtoolsのスキルカードを追加 -->
  </div>
</div>
```

## ✅ チェックリスト

新しいスキルを追加する際は、以下を確認してください:

- [ ] `skillsData.js` にスキルデータを追加
- [ ] スキル画像を `src/assets/skillstocks/` に配置
- [ ] `index.html` の適切なカテゴリセクションにカードを追加
- [ ] `data-tech` 属性がスキルIDと一致
- [ ] `data-category` 属性がカテゴリと一致
- [ ] 画像パスが正しい
- [ ] ブラウザで表示を確認
- [ ] スキルカードをクリックしてモーダルが正しく表示されることを確認

## 💡 便利なヘルパー関数

`skillsData.js` には以下のヘルパー関数が用意されています:

```javascript
// スキルが存在するかチェック
hasSkill('react')  // true/false

// スキルのカテゴリを取得
getSkillCategory('react')  // 'frontend'

// カテゴリ別にスキルをグループ化
groupSkillsByCategory()  // { frontend: [...], backend: [...], ... }

// 全スキルIDを取得
getAllSkillIds()  // ['html', 'css', 'javascript', ...]

// スキル数を取得
getSkillCount()  // 18
```

## 🔧 トラブルシューティング

### モーダルが表示されない
- `data-tech` 属性が `skillsData.js` のスキルIDと完全に一致しているか確認
- ブラウザのコンソールでエラーがないか確認

### 画像が表示されない
- ファイル名が正しいか確認 (大文字小文字に注意)
- 画像パスが正しいか確認
- 画像ファイルが正しいディレクトリにあるか確認

### フィルターが正しく動作しない
- `data-category` 属性が正しいカテゴリ値になっているか確認
- カードが正しいカテゴリセクション内にあるか確認

## 📚 参考例

完全な例として、既存のスキル (`python`, `react` など) を参考にしてください。

---

**質問やサポートが必要な場合は、GitHubのIssueを作成してください!**
