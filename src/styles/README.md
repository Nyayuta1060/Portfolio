# Styles Directory

このディレクトリには、ポートフォリオサイトのCSS スタイルが機能別・セクション別に分割されて格納されています。

## ファイル構成

### Core Files

#### `base.css`
- **役割**: 基盤となるスタイル定義
- **内容**:
  - CSS リセット（`*` selector）
  - CSS カスタムプロパティ（`:root` 変数）
  - 基本的なHTML要素スタイル
  - キーフレームアニメーション定義
  - パーティクル背景設定
- **変数定義**:
  ```css
  --primary-color: #64ffda;
  --secondary-color: #ff6b6b;
  --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --font-main: 'Inter', sans-serif;
  --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  ```

#### `components.css`
- **役割**: 再利用可能なUIコンポーネント
- **内容**:
  - ボタン（`.btn`, `.btn-primary`, `.btn-secondary`）
  - カード（`.skill-card`, `.project-card`, `.news-card`）
  - フォーム（`.form`, `.form-input`, `.form-group`）
  - ターミナル（`.terminal`, `.terminal-header`）
  - フィルター（`.filter-btn`）
  - 検索ボックス（`.search-box`）

#### `layout.css`
- **役割**: ページレイアウトとセクション構造
- **内容**:
  - ナビゲーション（`.navbar`, `.nav-menu`）
  - セクション共通スタイル（`section`, `.container`）
  - ヒーローセクション（`.hero`, `.hero-content`）
  - Aboutセクション（`.about`, `.career-timeline`）
  - スキルセクション（`.skills`, `.tech-orbit`）
  - プロジェクトセクション（`.projects`）
  - コンタクトセクション（`.contact`）
  - フッター（`.footer`）

### Specialized Files

#### `pages.css`
- **役割**: 専用ページのスタイル
- **内容**:
  - プロジェクトページ（`.projects-header`, `.featured-projects`）
  - ニュースページ（`.news-header`, `.article-modal`）
  - 技術別カラーリング（`[data-tech="html"]`）
  - プロジェクトオーバーレイ（`.project-overlay`）
  - 記事モーダル（`.modal-content`）

#### `responsive.css`
- **役割**: レスポンシブデザイン
- **内容**:
  - タブレット対応（`@media (max-width: 1024px)`）
  - モバイル対応（`@media (max-width: 768px)`）
  - 小画面モバイル対応（`@media (max-width: 480px)`）

## 読み込み順序

HTMLファイルでのCSS読み込み順序は以下の通りです：

```html
<!-- 1. 基盤 -->
<link rel="stylesheet" href="./src/styles/base.css">

<!-- 2. コンポーネント -->
<link rel="stylesheet" href="./src/styles/components.css">

<!-- 3. レイアウト -->
<link rel="stylesheet" href="./src/styles/layout.css">

<!-- 4. 専用ページ -->
<link rel="stylesheet" href="./src/styles/pages.css">

<!-- 5. レスポンシブ -->
<link rel="stylesheet" href="./src/styles/responsive.css">
```

## CSS 設計方針

### 1. CSS カスタムプロパティの活用
```css
/* 色の統一管理 */
--primary-color: #64ffda;
--text-primary: #ffffff;

/* 使用例 */
.button {
    background: var(--primary-color);
    color: var(--text-primary);
}
```

### 2. BEM風命名規則
```css
/* Block Element Modifier パターン */
.news-card          /* Block */
.news-card__title   /* Element */
.news-card--featured /* Modifier */
```

### 3. モバイルファースト
```css
/* デフォルト: モバイル */
.container {
    padding: 0 1rem;
}

/* タブレット以上 */
@media (min-width: 768px) {
    .container {
        padding: 0 2rem;
    }
}
```

## カラーパレット

### プライマリカラー
- **Primary**: `#64ffda` - メインアクセント
- **Secondary**: `#ff6b6b` - セカンダリアクセント
- **Accent**: `#4ecdc4` - 補助色

### 背景色
- **Primary BG**: `#0a0a0f` - メイン背景
- **Secondary BG**: `#131318` - セクション背景
- **Card BG**: `rgba(19, 19, 24, 0.8)` - カード背景

### テキストカラー
- **Primary**: `#ffffff` - メインテキスト
- **Secondary**: `#a8b2d1` - セカンダリテキスト
- **Muted**: `#6b7688` - 補助テキスト

## アニメーション定義

### トランジション
```css
--transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
--transition-bounce: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### キーフレーム
- `@keyframes float` - パーティクル背景
- `@keyframes blink` - カーソル点滅
- `@keyframes slideInLeft/Right` - スライドイン
- `@keyframes orbit` - テックオービット

## レスポンシブブレークポイント

| デバイス | 幅 | ファイル |
|---------|---|----------|
| デスクトップ | 1200px+ | base layout |
| タブレット | 768px - 1024px | responsive.css |
| モバイル | 480px - 768px | responsive.css |
| 小画面モバイル | ~480px | responsive.css |

## スタイルの追加方法

### 1. 新しいコンポーネントの追加
```css
/* components.css に追加 */
.new-component {
    background: var(--card-bg);
    border-radius: 10px;
    padding: 1rem;
    transition: var(--transition-smooth);
}

.new-component:hover {
    transform: translateY(-2px);
}
```

### 2. 新しいページスタイルの追加
```css
/* pages.css に追加 */
.special-page {
    background: var(--gradient-bg);
    min-height: 100vh;
}

.special-page .header {
    padding: 6rem 0;
}
```

### 3. レスポンシブ対応の追加
```css
/* responsive.css に追加 */
@media (max-width: 768px) {
    .new-component {
        padding: 0.5rem;
        font-size: 0.9rem;
    }
}
```

## パフォーマンス最適化

### 1. CSS Grid と Flexbox
```css
/* 効率的なレイアウト */
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}
```

### 2. ハードウェア アクセラレーション
```css
/* GPUアクセラレーション */
.animated-element {
    transform: translateZ(0);
    will-change: transform;
}
```

### 3. フォントローディング最適化
```css
/* フォント表示の最適化 */
@font-face {
    font-family: 'Inter';
    font-display: swap;
}
```

## デバッグとメンテナンス

### CSS カスタムプロパティのデバッグ
```css
/* 開発時のデバッグ */
.debug {
    border: 1px solid red;
    background: rgba(255, 0, 0, 0.1);
}
```

### ブラウザサポート
- **Modern Browsers**: Chrome 80+, Firefox 75+, Safari 13+
- **CSS Grid**: IE 11+ (with prefixes)
- **CSS Custom Properties**: IE 不支持

## 参考情報

- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [CSS Grid Layout](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [CSS Animations Performance](https://web.dev/animations-guide/)