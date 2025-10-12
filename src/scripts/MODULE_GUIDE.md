# JavaScript モジュールガイド

> このガイドでは、ポートフォリオサイトの JavaScript 構造、各モジュールの役割、使用方法について説明します。

## 📁 ファイル構成と役割

### `app.js` - メインエントリーポイント

アプリケーションの初期化と全体の統合を担当します。

**主な責務:**

- DOMContentLoaded 時の初期化
- 各モジュールの初期化呼び出し
- グローバルイベントリスナーの設定
- エラーハンドリング

**エクスポート:**

- なし (グローバルスコープに`scrollToSection`関数を提供)

---

## 📋 モジュール詳細

### Core Files

#### `app.js`

- **役割**: メイン初期化ファイル
- **内容**:
  - DOMContentLoaded イベントリスナー
  - 全機能の初期化処理
  - グローバルイベントリスナーの設定
- **依存関係**: 他のすべての JS ファイル

#### `constants.js` - 定数定義

アプリケーション全体で使用する定数を集約します。

**定数カテゴリ:**

- `ANIMATION_CONFIG`: アニメーション設定
- `OBSERVER_CONFIG`: Intersection Observer 設定
- `NAV_CONFIG`: ナビゲーション設定
- `SELECTORS`: CSS セレクター
- `NOTIFICATION_TYPES`: 通知タイプ
- `CLASS_NAMES`: クラス名

**使用例:**

```javascript
import { ANIMATION_CONFIG, SELECTORS } from "./constants.js";

const element = document.querySelector(SELECTORS.HAMBURGER);
setTimeout(() => {}, ANIMATION_CONFIG.DEBOUNCE_DELAY);
```

---

### `utils.js` - ユーティリティ関数

汎用的なヘルパー関数を提供します。

**主な機能:**

### `utils.js` - ユーティリティ関数

汎用的なヘルパー関数を提供します。

**主な関数:**

#### パフォーマンス最適化

- `debounce(func, wait)`: 関数の連続実行を制限
- `throttle(func, limit)`: 関数の実行頻度を制限

#### DOM 操作

- `getElement(selector)`: 単一要素を取得
- `getElements(selector)`: 複数要素を取得
- `toggleClass(element, className)`: クラスをトグル
- `addEventListeners(elements, event, handler)`: イベントリスナーを安全に追加

#### 初期化関数

- `initializeLazyImages()`: 画像の遅延読み込み
- `preloadCriticalResources()`: 重要なリソースをプリロード
- `initializeAccessibility()`: アクセシビリティ機能
- `addAnimationStyles()`: アニメーションスタイルを追加

#### エラーハンドリング

- `logError(context, error)`: エラーログ出力

**使用例:**

```javascript
import { debounce, getElement } from "./utils.js";

const handleResize = debounce(() => {
  console.log("Resized!");
}, 250);

const navbar = getElement(".navbar");
```

---

### Feature Modules

#### `navigation.js` - ナビゲーション機能

ナビゲーションバーとスムーズスクロールを管理します。

**主な機能:**

- モバイルハンバーガーメニュー
- スムーズスクロール
- アクティブセクションのハイライト
- スクロール時のナビバー背景変更
- `initializeNavigation()` - ナビゲーション初期化
- `highlightActiveSection()` - アクティブセクションハイライト
- `scrollToSection()` - スムーズスクロール関数

**エクスポート関数:**

- `initializeNavigation()`: ナビゲーション機能の初期化
- `scrollToSection(sectionId)`: 指定セクションへスクロール

**依存関係**: utils.js

**使用例:**

```javascript
import { initializeNavigation, scrollToSection } from "./navigation.js";

// 初期化
initializeNavigation();

// セクションへスクロール
scrollToSection("about");
```

---

### `animations.js` - アニメーション機能

スクロールエフェクトとパーティクル背景を管理します。

**主な機能:**

- Intersection Observer によるスクロールアニメーション
- パララックス効果
- パーティクル背景の Canvas 描画
- スキルバーアニメーション
- `initializeScrollEffects()` - スクロールエフェクト
- `initializeParticles()` - パーティクル背景
- `animateSkillBars()` - スキルバーアニメーション
- `initializeLazyLoading()` - 遅延読み込み

**エクスポート関数:**

- `initializeScrollEffects()`: スクロールエフェクトの初期化
- `initializeParticles()`: パーティクル背景の初期化
- `initializeLazyLoading()`: 遅延読み込みの初期化

**クラス:**

- `Particle`: パーティクルオブジェクト

**依存関係**: utils.js

**使用例:**

```javascript
import { initializeScrollEffects, initializeParticles } from "./animations.js";

// 初期化
initializeScrollEffects();
initializeParticles();
```

---

### `components.js` - UI コンポーネント

UI コンポーネントとインタラクション機能を提供します。

**主な機能:**

- 入力フィールドのフォーカス効果
- スキルフィルター

**エクスポート関数:**

- `initializeFormHandling()`: フォーム入力フィールドのフォーカス効果を初期化
- `initializeSkillsFilter()`: スキルフィルターの初期化

**注意事項:**

- GitHub Pages では実際のフォーム送信機能は使用不可
- 連絡先はメールリンクを使用

**依存関係**: utils.js

**使用例:**

```javascript
import {
  initializeFormHandling,
  initializeSkillsFilter,
} from "./components.js";

// 初期化
initializeFormHandling();
initializeSkillsFilter();
```

---

## 📦 読み込み順序

### ES6 モジュール形式（現在）

```html
<!-- ES6 Modules -->
<script type="module" src="./src/scripts/app.js"></script>
```

### レガシー形式（参考）

```html
<!-- 1. ユーティリティ -->
<script src="./src/scripts/utils.js"></script>

<!-- 2. 機能モジュール -->
<script src="./src/scripts/navigation.js"></script>
<script src="./src/scripts/animations.js"></script>
<script src="./src/scripts/components.js"></script>

<!-- 3. 初期化 -->
<script src="./src/scripts/app.js"></script>
```

---

## 🔄 依存関係

```
app.js
├── utils.js
├── navigation.js
│   └── utils.js
├── animations.js
│   └── utils.js
└── components.js
    └── utils.js
```

---

## 🚀 機能の追加方法

### 新しい機能を追加する場合

1. **独立性の高い機能**: 新しい JS ファイルを作成
2. **既存機能の拡張**: 該当ファイルに関数を追加
3. **初期化が必要**: `app.js` の `initializeApp()` 関数に追加

### 例：新しいギャラリー機能の追加

```javascript
// gallery.js を作成
export function initializeGallery() {
  // ギャラリー機能の実装
}

// app.js に追加
import { initializeGallery } from "./gallery.js";

function initializeApp() {
  // 既存の初期化...
  initializeGallery(); // 追加
}
```

### 1. ユーティリティ関数を追加

```javascript
// utils.js
export function newUtilityFunction() {
  // 実装
}
```

### 2. 新しいモジュールを作成

```javascript
// newModule.js
import { getElement } from "./utils.js";

export function initializeNewModule() {
  // 実装
}
```

### 3. app.js で初期化

```javascript
// app.js
import { initializeNewModule } from "./newModule.js";

function initializeApp() {
  // ...
  initializeNewModule();
}
```

---

## 🎯 パフォーマンス考慮事項

- **遅延読み込み**: 画像やアニメーションは必要時に読み込み
- **デバウンス/スロットル**: スクロールやリサイズイベントを最適化
- **Intersection Observer**: スクロール判定の効率化
- **メモ化**: 重い処理結果をキャッシュ

---

## 🐛 デバッグ方法

### エラーの確認

各ファイルには適切なコンソールログが含まれています：

```javascript
// 初期化完了の確認
console.log("🚀 Portfolio initialized successfully!");

// エラーハンドリング
console.error("Error initializing particles:", error);
```

ブラウザの開発者ツールでログを確認してください。

### デバッグツール

```javascript
import { logError } from "./utils.js";

try {
  // コード
} catch (error) {
  logError("Module Name", error);
}
```

### パフォーマンス測定

```javascript
console.time("Function Name");
// 処理
console.timeEnd("Function Name");
```

### Intersection Observer のデバッグ

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log("Intersection:", entry.target, entry.isIntersecting);
  });
});
```

---

## 📝 コーディング規約

### 命名規則

- 関数: キャメルケース (`initializeApp`)
- 定数: アッパースネークケース (`ANIMATION_CONFIG`)
- クラス: パスカルケース (`Particle`)
- プライベート関数: 先頭にアンダースコア (オプション)

### コメント

- JSDoc スタイルで関数をドキュメント化
- 複雑なロジックには説明コメントを追加
- TODO や FIXME タグを活用

### エラーハンドリング

- try-catch ブロックで重要な処理を囲む
- `logError`関数でエラーを記録
- ユーザーに分かりやすいエラーメッセージを表示

---

## 🔧 最適化のベストプラクティス

1. **イベントリスナー**

   - `debounce`や`throttle`を使用
   - 不要なリスナーは削除

2. **DOM 操作**

   - バッチ処理を活用
   - 不必要な再レンダリングを避ける

3. **アニメーション**

   - `requestAnimationFrame`を使用
   - CSS transitions を優先

4. **メモリ管理**
   - イベントリスナーのクリーンアップ
   - 大きな配列やオブジェクトの適切な破棄

---

## 📚 参考情報

- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web Performance Best Practices](https://web.dev/performance/)
- [MDN JavaScript Reference](https://developer.mozilla.org/ja/docs/Web/JavaScript)
- [ES6 Modules Guide](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Modules)

### `animations.js` - アニメーション機能

スクロールエフェクトとパーティクル背景を管理します。

**主な機能:**

- Intersection Observer によるスクロールアニメーション
- パララックス効果
- パーティクル背景の Canvas 描画
- スキルバーアニメーション

**エクスポート関数:**

- `initializeScrollEffects()`: スクロールエフェクトの初期化
- `initializeParticles()`: パーティクル背景の初期化
- `initializeLazyLoading()`: 遅延読み込みの初期化

**クラス:**

- `Particle`: パーティクルオブジェクト

**使用例:**

```javascript
import { initializeScrollEffects, initializeParticles } from "./animations.js";

// 初期化
initializeScrollEffects();
initializeParticles();
```

---

### `components.js` - UI コンポーネント

UI コンポーネントとインタラクション機能を提供します。

**主な機能:**

- フォーム送信処理
- 通知システム
- スキルフィルター

**エクスポート関数:**

- `initializeFormHandling()`: フォーム処理の初期化
- `initializeSkillsFilter()`: スキルフィルターの初期化
- `showNotification(message, type)`: 通知を表示

**使用例:**

```javascript
import { initializeFormHandling, showNotification } from "./components.js";

// 初期化
initializeFormHandling();

// 通知表示
showNotification("保存しました！", "success");
```

---

## 🔄 依存関係

```
app.js
├── utils.js
├── navigation.js
│   └── utils.js
├── animations.js
│   └── utils.js
└── components.js
    └── utils.js
```

---

## 🚀 新しい機能を追加する方法

### 1. ユーティリティ関数を追加

```javascript
// utils.js
export function newUtilityFunction() {
  // 実装
}
```

### 2. 新しいモジュールを作成

```javascript
// newModule.js
import { getElement } from "./utils.js";

export function initializeNewModule() {
  // 実装
}
```

### 3. app.js で初期化

```javascript
// app.js
import { initializeNewModule } from "./newModule.js";

function initializeApp() {
  // ...
  initializeNewModule();
}
```

---

## 🐛 デバッグのヒント

### エラーの確認

```javascript
import { logError } from "./utils.js";

try {
  // コード
} catch (error) {
  logError("Module Name", error);
}
```

### パフォーマンス測定

```javascript
console.time("Function Name");
// 処理
console.timeEnd("Function Name");
```

### Intersection Observer のデバッグ

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log("Intersection:", entry.target, entry.isIntersecting);
  });
});
```

---

## 📝 コーディング規約

### 命名規則

- 関数: キャメルケース (`initializeApp`)
- 定数: アッパースネークケース (`ANIMATION_CONFIG`)
- クラス: パスカルケース (`Particle`)
- プライベート関数: 先頭にアンダースコア (オプション)

### コメント

- JSDoc スタイルで関数をドキュメント化
- 複雑なロジックには説明コメントを追加
- TODO や FIXME タグを活用

### エラーハンドリング

- try-catch ブロックで重要な処理を囲む
- `logError`関数でエラーを記録
- ユーザーに分かりやすいエラーメッセージを表示

---

## 🔧 最適化のベストプラクティス

1. **イベントリスナー**

   - `debounce`や`throttle`を使用
   - 不要なリスナーは削除

2. **DOM 操作**

   - バッチ処理を活用
   - 不必要な再レンダリングを避ける

3. **アニメーション**

   - `requestAnimationFrame`を使用
   - CSS transitions を優先

4. **メモリ管理**
   - イベントリスナーのクリーンアップ
   - 大きな配列やオブジェクトの適切な破棄
