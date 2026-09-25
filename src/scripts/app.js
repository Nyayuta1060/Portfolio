// ========== メイン初期化ファイル ==========
import { PERFORMANCE_CONFIG } from './config.js';
import {
  debounce,
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
import { initializeTerminal } from './terminal.js';
import { initializeBootSequence } from './boot.js';
import { initializeTheme, initializeThemeSwitcher } from './theme.js';
import i18n from './i18n.js';

// テーマを最優先で反映（初回描画時のちらつきを軽減）
initializeTheme();

// ページ読み込み開始時に即座にトップにスクロール
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

/**
 * DOMContentLoaded時の初期化
 */
document.addEventListener('DOMContentLoaded', async () => {
  try {
    console.log('📦 Starting Portfolio initialization...');

    // i18nを初期化
    console.log('🌐 Initializing i18n...');
    await i18n.initialize();

    // ブートシーケンスを表示
    const bootReady = initializeBootSequence();

    // データを最初にロード
    await initializeData();

    // その後アプリを初期化
    await initializeApp();
    await bootReady;

    // UIを更新
    i18n.updateUI();

    console.log('🚀 Portfolio初期化成功!');
  } catch (error) {
    console.error('❌ App Initialization failed:', error);
    logError('App Initialization', error);
  } finally {
    document.body.classList.remove('booting');
    document.body.classList.add('boot-ready');
    document.getElementById('boot-screen')?.remove();
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
    console.log('🔧 Initializing Terminal...');
    initializeTerminal();
    console.log('🔧 Initializing Navigation...');
    initializeNavigation();
    console.log('🔧 Initializing Language Switcher...');
    initializeLanguageSwitcher();
    console.log('🔧 Initializing Theme Switcher...');
    initializeThemeSwitcher();
    console.log('🔧 Initializing Scroll Effects...');
    initializeScrollEffects();
    console.log('🔧 Initializing Particles...');
    initializeParticles();

    // モーダルとフィルターを先に初期化（イベントデリゲーション使用）
    console.log('🔧 Initializing Skill Modal...');
    initializeSkillModal();
    console.log('🔧 Initializing Project Modal...');
    initializeProjectModal();
    console.log('🔧 Initializing Skills Filter...');
    initializeSkillsFilter();

    console.log('🔧 Initializing Form Handling...');
    initializeFormHandling();
    console.log('🔧 Initializing Lazy Loading...');
    initializeLazyLoading();
    console.log('🔧 Initializing Career Section...');
    await initializeCareer();
    console.log('🔧 Initializing Certifications Section...');
    await initializeCertifications();
    console.log('🔧 Initializing GitHub Activity...');
    void initializeGitHubActivity();
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
}

/**
 * リサイズハンドラーをセットアップ
 */
function setupResizeHandler() {
  window.addEventListener('resize', debounce(() => {
    handleResize();
  }, PERFORMANCE_CONFIG.debounceDelay));
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
 * 言語切り替えを初期化
 */
function initializeLanguageSwitcher() {
  const langButtons = document.querySelectorAll('.lang-btn[data-lang]');

  // 現在の言語に基づいてボタンのアクティブ状態を更新
  const updateActiveButton = () => {
    const currentLang = i18n.getCurrentLanguage();
    langButtons.forEach(btn => {
      if (btn.dataset.lang === currentLang) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });
  };

  // 初期状態を設定
  updateActiveButton();

  // 各ボタンにクリックイベントを追加
  langButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const lang = button.dataset.lang;
      if (lang && lang !== i18n.getCurrentLanguage()) {
        await i18n.switchLanguage(lang);
        updateActiveButton();
      }
    });
  });

  // 言語変更イベントをリッスン
  window.addEventListener('languageChanged', updateActiveButton);
}
