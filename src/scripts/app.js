// ========== メイン初期化ファイル ==========
document.addEventListener('DOMContentLoaded', function() {
  // 初期化
  initializeApp();
});

function initializeApp() {
  // 各機能を初期化
  initializeNavigation();
  initializeScrollEffects();
  initializeParticles();
  initializeSkillBars();
  initializeFormHandling();
  initializeLazyLoading();
  initializeSkillsFilter();

  // ユーティリティ機能を初期化
  initializeLazyImages();
  preloadCriticalResources();
  initializeAccessibility();
  initializePWA();
  addAnimationStyles();

  // イベントリスナーを設定
  setupEventListeners();
}

// ========== イベントリスナー ==========
function setupEventListeners() {
  // リサイズイベントの最適化
  window.addEventListener('resize', debounce(function() {
    // リサイズ時の処理
    const canvas = document.querySelector('#particles-container canvas');
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    }, 250));

    // スクロールイベントの最適化
    window.addEventListener('scroll', throttle(function() {
      // スクロール時の軽量処理のみ
      }, 16)); // 60fps
    }

    // ========== 初期化完了 ==========
    console.log('🚀 Portfolio initialized successfully!');