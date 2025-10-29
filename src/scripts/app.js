// ========== メイン初期化ファイル ==========
import { 
  debounce, 
  throttle, 
  initializeLazyImages, 
  preloadCriticalResources, 
  initializeAccessibility,
  addAnimationStyles,
  logError 
} from './utils.js';
import { initializeNavigation } from './navigation.js';
import { 
  initializeScrollEffects, 
  initializeParticles, 
  initializeLazyLoading 
} from './animations.js';
import { 
  initializeFormHandling, 
  initializeSkillsFilter,
  initializeSkillModal
} from './components.js';
import { initializeGitHubActivity } from './github.js';
import { initializeContactProtection } from './contact.js';

/**
 * アプリケーション設定
 */
const APP_CONFIG = {
  DEBOUNCE_DELAY: 250,
  THROTTLE_DELAY: 16 // 60fps
};

/**
 * DOMContentLoaded時の初期化
 */
document.addEventListener('DOMContentLoaded', () => {
  try {
    initializeApp();
    console.log('🚀 Portfolio初期化成功!');
  } catch (error) {
    logError('App Initialization', error);
  }
});

/**
 * アプリケーションの初期化
 */
function initializeApp() {
  // コア機能を初期化
  initializeCoreFeatures();
  
  // ユーティリティ機能を初期化
  initializeUtilityFeatures();
  
  // イベントリスナーを設定
  setupEventListeners();
}

/**
 * コア機能を初期化
 */
function initializeCoreFeatures() {
  initializeNavigation();
  initializeScrollEffects();
  initializeParticles();
  initializeSkillsFilter();
  initializeSkillModal();
  initializeFormHandling();
  initializeLazyLoading();
  initializeGitHubActivity();
  initializeContactProtection();
}

/**
 * ユーティリティ機能を初期化
 */
function initializeUtilityFeatures() {
  initializeLazyImages();
  preloadCriticalResources();
  initializeAccessibility();
  addAnimationStyles();
}

/**
 * グローバルイベントリスナーを設定
 */
function setupEventListeners() {
  setupResizeHandler();
  setupScrollHandler();
}

/**
 * リサイズハンドラーをセットアップ
 */
function setupResizeHandler() {
  window.addEventListener('resize', debounce(() => {
    handleResize();
  }, APP_CONFIG.DEBOUNCE_DELAY));
}

/**
 * スクロールハンドラーをセットアップ
 */
function setupScrollHandler() {
  window.addEventListener('scroll', throttle(() => {
    handleScroll();
  }, APP_CONFIG.THROTTLE_DELAY));
}

/**
 * ウィンドウリサイズを処理
 */
function handleResize() {
  const canvas = document.querySelector('#particles-container canvas');
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}

/**
 * スクロールを処理
 */
function handleScroll() {
  // 必要に応じて軽量な処理を追加
  // 現在は主にnavigation.jsとanimations.jsで処理
}

/**
 * スムーズスクロールのグローバル関数(後方互換性のため)
 * @param {string} sectionId - スクロール先のセクションID
 */
window.scrollToSection = function(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const offsetTop = section.offsetTop - 80;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
};
