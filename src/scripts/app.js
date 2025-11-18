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
  initializeSkillModal,
  initializeProjectModal
} from './components.js';
import { initializeGitHubActivity } from './github.js';
import { initializeContactProtection } from './contact.js';
import { initializeData } from './init.js';
import { initializeCareer, initializeCertifications } from './career.js';

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
document.addEventListener('DOMContentLoaded', async () => {
  try {
    console.log('📦 Starting Portfolio initialization...');
    
    // データを最初にロード
    await initializeData();
    
    // その後アプリを初期化
    await initializeApp();
    console.log('🚀 Portfolio初期化成功!');
  } catch (error) {
    console.error('❌ App Initialization failed:', error);
    logError('App Initialization', error);
  }
});

/**
 * アプリケーションの初期化
 */
async function initializeApp() {
  // コア機能を初期化
  await initializeCoreFeatures();
  
  // ユーティリティ機能を初期化
  initializeUtilityFeatures();
  
  // イベントリスナーを設定
  setupEventListeners();
}

/**
 * コア機能を初期化
 */
async function initializeCoreFeatures() {
  try {
    console.log('🔧 Initializing Navigation...');
    initializeNavigation();
    console.log('🔧 Initializing Scroll Effects...');
    initializeScrollEffects();
    console.log('🔧 Initializing Particles...');
    initializeParticles();
    console.log('🔧 Initializing Skills Filter...');
    initializeSkillsFilter();
    console.log('🔧 Initializing Skill Modal...');
    initializeSkillModal();
    console.log('🔧 Initializing Project Modal...');
    initializeProjectModal();
    console.log('🔧 Initializing Form Handling...');
    initializeFormHandling();
    console.log('🔧 Initializing Lazy Loading...');
    initializeLazyLoading();
    console.log('🔧 Initializing Career Section...');
    await initializeCareer();
    console.log('🔧 Initializing Certifications Section...');
    await initializeCertifications();
    console.log('🔧 Initializing GitHub Activity...');
    await initializeGitHubActivity();
    console.log('🔧 Initializing Contact Protection...');
    initializeContactProtection();
    console.log('✅ All core features initialized successfully');
  } catch (error) {
    console.error('❌ Error in initializeCoreFeatures:', error);
    throw error;
  }
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
