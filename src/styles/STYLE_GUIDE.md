# CSS スタイルガイド

> このガイドでは、ポートフォリオサイトの CSS 構造、各ファイルの役割、スタイリングのベストプラクティスについて説明します。

## 📁 ファイル構成と役割

### `base.css` - ベーススタイル

全体の基礎となるスタイルと CSS 変数を定義します。

**内容:**

- CSS 変数 (カラー、フォント、スペーシング、アニメーション)
- リセットスタイル
- キーフレームアニメーション
- ユーティリティクラス
- パーティクル背景

**CSS 変数:**

```css
/* カラー */
--primary-color: #64ffda;
--secondary-color: #ff6b6b;
--text-primary: #ffffff;

/* スペーシング */
--spacing-sm: 0.5rem;
--spacing-md: 1rem;
--spacing-lg: 2rem;

/* アニメーション */
--transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

---

### `components.css` - コンポーネントスタイル

再利用可能な UI コンポーネントのスタイルを定義します。

**主なコンポーネント:**

- ボタン (`.btn`, `.btn-primary`, `.btn-secondary`)
- カード (`.skill-card`, `.project-card`, `.news-card`)
- ターミナル (`.terminal`, `.code-animation`)
- フォーム (`.form`, `.form-input`, `.form-label`)
- フィルター (`.filter-btn`)
- 検索ボックス (`.search-box`)

**使用例:**

```html
<button class="btn btn-primary">
  <i class="fas fa-icon"></i>
  Button Text
</button>

<div class="skill-card" data-tech="javascript">
  <div class="skill-image">
    <img src="..." alt="JavaScript" />
  </div>
  <div class="skill-name">JavaScript</div>
</div>
```

---

### `layout.css` - レイアウトスタイル

ページ全体のレイアウトとセクション構成を定義します。

**主なセクション:**

- ナビゲーション (`.navbar`, `.nav-menu`)
- ヒーロー (`.hero`, `.hero-content`)
- About (`.about`, `.career-timeline`)
- スキル (`.skills`, `.skills-grid`)
- プロジェクト (`.projects`, `.projects-grid`)
- コンタクト (`.contact`)
- フッター (`.footer`)

**レイアウトパターン:**

```css
/* グリッドレイアウト */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 2rem;
}

/* フレックスレイアウト */
.hero-content {
  display: flex;
  align-items: center;
  gap: 4rem;
}
```

---

### `pages.css` - ページ固有スタイル

特定のページやセクション専用のスタイルを定義します。

**内容:**

- 技術別カラーリング (`.skill-card[data-tech="..."]`)
- プロジェクトページ専用スタイル
- ニュースページ専用スタイル
- モーダル (`.article-modal`)
- 特殊エフェクト

---

### `responsive.css` - レスポンシブデザイン

各画面サイズに対応したスタイルを定義します。

**ブレークポイント:**

```css
/* タブレット */
@media (max-width: 1024px) {
}

/* モバイル */
@media (max-width: 768px) {
}

/* 小画面モバイル */
@media (max-width: 480px) {
}

/* デスクトップ以上 */
@media (min-width: 1024px) {
}
```

---

## 🎨 カラーシステム

### プライマリーカラー

```css
--primary-color: #64ffda; /* メインアクセント */
--secondary-color: #ff6b6b; /* セカンダリアクセント */
--accent-color: #4ecdc4; /* 補助アクセント */
```

### 背景色

```css
--primary-bg: #0a0a0f; /* メイン背景 */
--secondary-bg: #131318; /* セカンダリ背景 */
--accent-bg: #1a1a24; /* アクセント背景 */
--card-bg: rgba(19, 19, 24, 0.8); /* カード背景 */
```

### テキストカラー

```css
--text-primary: #ffffff; /* メインテキスト */
--text-secondary: #a8b2d1; /* セカンダリテキスト */
--text-muted: #6b7688; /* 控えめなテキスト */
```

---

## 📐 スペーシングシステム

```css
--spacing-xs: 0.25rem; /* 4px */
--spacing-sm: 0.5rem; /* 8px */
--spacing-md: 1rem; /* 16px */
--spacing-lg: 2rem; /* 32px */
--spacing-xl: 4rem; /* 64px */
```

**使用例:**

```css
.component {
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  gap: var(--spacing-sm);
}
```

---

## 🎭 アニメーション

### トランジション

```css
--transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
--transition-bounce: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
--transition-fast: all 0.15s ease;
```

### キーフレームアニメーション

- `float`: フロートアニメーション
- `typeWriter`: タイプライターエフェクト
- `scrollBounce`: スクロールバウンス
- `slideInLeft/Right`: スライドイン
- `fadeInUp/Down`: フェードイン

**使用例:**

```css
.element {
  animation: fadeInUp 0.8s ease-out forwards;
  animation-delay: 0.5s;
}
```

---

## 🔧 命名規則

### BEM 風の命名

```css
/* ブロック */
.component {
}

/* 要素 */
.component__element {
}

/* 修飾子 */
.component--modifier {
}
```

### 状態クラス

```css
.active      /* アクティブ状態 */
/* アクティブ状態 */
/* アクティブ状態 */
/* アクティブ状態 */
.hidden      /* 非表示 */
.focused     /* フォーカス状態 */
.fade-in; /* フェードイン完了 */
```

---

## 📱 レスポンシブデザインガイドライン

### モバイルファーストアプローチ

1. ベースはモバイル向けに設計
2. メディアクエリで大画面向けに拡張

### ブレークポイント戦略

```css
/* ベーススタイル (モバイル) */
.grid {
  grid-template-columns: 1fr;
}

/* タブレット */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* デスクトップ */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## 🎯 ベストプラクティス

### 1. CSS 変数を活用

```css
/* 悪い例 */
.button {
  color: #64ffda;
  padding: 16px;
}

/* 良い例 */
.button {
  color: var(--primary-color);
  padding: var(--spacing-md);
}
```

### 2. 明確なセレクター

```css
/* 悪い例 */
div > span.text {
}

/* 良い例 */
.component__text {
}
```

### 3. パフォーマンス

```css
/* transitionとanimationを適切に使い分け */
.hover-effect {
  transition: var(--transition-smooth);
}

.hover-effect:hover {
  transform: translateY(-5px);
}
```

### 4. アクセシビリティ

```css
/* フォーカス状態を必ず定義 */
.button:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* 減色モーション対応 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🔍 デバッグのヒント

### ブラウザ DevTools

```css
/* デバッグ用アウトライン */
* {
  outline: 1px solid red;
}

/* グリッドの可視化 */
.grid {
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 10px,
    rgba(255, 0, 0, 0.1) 10px,
    rgba(255, 0, 0, 0.1) 11px
  );
}
```

### コメントアウトテクニック

```css
/* 問題のあるスタイルを特定 */
.component {
  /* property: value; */
}
```

---

## 📝 スタイル追加の手順

### 1. 新しいコンポーネントを追加

```css
/* components.css */
.new-component {
  /* ベーススタイル */
  background: var(--card-bg);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md);
}

.new-component:hover {
  /* ホバー状態 */
  transform: translateY(-5px);
  transition: var(--transition-smooth);
}
```

### 2. レスポンシブ対応を追加

```css
/* responsive.css */
@media (max-width: 768px) {
  .new-component {
    padding: var(--spacing-sm);
  }
}
```

### 3. カラーバリエーションを追加

```css
/* pages.css または components.css */
.new-component--primary {
  background: var(--gradient-primary);
}

.new-component--secondary {
  background: var(--gradient-secondary);
}
```

---

## 🧪 テストチェックリスト

- [ ] すべてのブラウザで表示確認
- [ ] モバイル/タブレット/デスクトップで確認
- [ ] ダークモード対応 (該当する場合)
- [ ] アニメーションのパフォーマンス確認
- [ ] アクセシビリティ (コントラスト比など)
- [ ] 印刷スタイル (必要な場合)

---

## 📚 参考リソース

- [MDN CSS Reference](https://developer.mozilla.org/ja/docs/Web/CSS)
- [Can I Use](https://caniuse.com/)
- [CSS Tricks](https://css-tricks.com/)
- [Web.dev - CSS](https://web.dev/learn/css/)
