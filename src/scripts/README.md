# Scripts Directory

このディレクトリには、ポートフォリオサイトのJavaScript機能が機能別に分割されて格納されています。

## ファイル構成

### Core Files

#### `app.js`
- **役割**: メイン初期化ファイル
- **内容**: 
  - DOMContentLoaded イベントリスナー
  - 全機能の初期化処理
  - イベントリスナーの設定
- **依存関係**: 他のすべてのJSファイル

#### `utils.js`
- **役割**: ユーティリティ関数とヘルパー機能
- **内容**:
  - `debounce()` - 関数実行の遅延処理
  - `throttle()` - 関数実行の頻度制限
  - PWAサポート機能
  - アクセシビリティ設定
  - 画像遅延読み込み
  - CSSアニメーションクラスの追加
- **依存関係**: なし

### Feature Modules

#### `navigation.js`
- **役割**: ナビゲーション機能
- **内容**:
  - `initializeNavigation()` - ナビゲーション初期化
  - `highlightActiveSection()` - アクティブセクションハイライト
  - `scrollToSection()` - スムーズスクロール
  - ハンバーガーメニュー制御
  - スクロール時のナビバー透明度調整
- **依存関係**: utils.js

#### `animations.js`
- **役割**: アニメーション機能
- **内容**:
  - `initializeScrollEffects()` - スクロールエフェクト
  - `initializeTypingAnimation()` - タイピングアニメーション
  - `initializeParticles()` - パーティクル背景
  - `animateSkillBars()` - スキルバーアニメーション
  - `initializeLazyLoading()` - 遅延読み込み
  - Intersection Observer実装
- **依存関係**: なし

#### `components.js`
- **役割**: UIコンポーネント機能
- **内容**:
  - `initializeFormHandling()` - フォーム処理
  - `showNotification()` - 通知システム
- **依存関係**: なし

## 読み込み順序

HTMLファイルでのスクリプト読み込み順序は以下の通りです：

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

## 機能の追加方法

### 新しい機能を追加する場合

1. **独立性の高い機能**: 新しいJSファイルを作成
2. **既存機能の拡張**: 該当ファイルに関数を追加
3. **初期化が必要**: `app.js` の `initializeApp()` 関数に追加

### 例：新しいギャラリー機能の追加

```javascript
// gallery.js を作成
function initializeGallery() {
    // ギャラリー機能の実装
}

// app.js の initializeApp() に追加
function initializeApp() {
    // 既存の初期化...
    initializeGallery(); // 追加
}
```

## パフォーマンス考慮事項

- **遅延読み込み**: 画像やアニメーションは必要時に読み込み
- **デバウンス/スロットル**: スクロールやリサイズイベントを最適化
- **Intersection Observer**: スクロール判定の効率化
- **メモ化**: 重い処理結果をキャッシュ

## デバッグ方法

各ファイルには適切なコンソールログが含まれています：

```javascript
// 初期化完了の確認
console.log('🚀 Portfolio initialized successfully!');

// エラーハンドリング
console.error('Error initializing particles:', error);
```

ブラウザの開発者ツールでログを確認してください。

## 参考情報

- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web Performance Best Practices](https://web.dev/performance/)