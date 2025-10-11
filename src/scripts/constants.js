// ========== 定数定義 ==========

// アニメーション設定
export const ANIMATION_CONFIG = {
  DEBOUNCE_DELAY: 250,
  THROTTLE_DELAY: 16, // 60fps
  PARTICLE_COUNT: 50,
  PARTICLE_CONNECTION_DISTANCE: 100,
  SKILL_BAR_ANIMATION_DELAY: 200,
  NOTIFICATION_DURATION: 3000,
  NOTIFICATION_ANIMATION_DELAY: 100,
  FORM_SUBMIT_DELAY: 2000
};

// Intersection Observer設定
export const OBSERVER_CONFIG = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

// ナビゲーション設定
export const NAV_CONFIG = {
  OFFSET: 80, // ナビバーの高さ
  SCROLL_THRESHOLD: 100,
  ACTIVE_SECTION_OFFSET: 150
};

// パララックス設定
export const PARALLAX_CONFIG = {
  SPEED: 0.5
};

// セレクター定数
export const SELECTORS = {
  // ナビゲーション
  HAMBURGER: '.hamburger',
  NAV_MENU: '.nav-menu',
  NAV_LINKS: '.nav-link',
  NAVBAR: '.navbar',
  
  // セクション
  SECTIONS: 'section',
  HERO_VISUAL: '.hero-visual',
  
  // スキル
  FILTER_BUTTONS: '.filter-btn',
  CATEGORY_SECTIONS: '.skill-category-section',
  SKILL_BARS: '.skill-progress',
  SKILL_CATEGORY: '.skill-category',
  
  // プロジェクト
  PROJECT_CARDS: '.project-card',
  
  // フォーム
  FORM: '.form',
  FORM_INPUTS: '.form-input',
  
  // その他
  PARTICLES_CONTAINER: '#particles-container',
  LAZY_ELEMENTS: '[data-src]',
  ABOUT_CONTENT: '.about-content',
  CONTACT_CONTENT: '.contact-content'
};

// 通知タイプ
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  ERROR: 'error'
};

// 通知メッセージ
export const NOTIFICATION_MESSAGES = {
  FORM_SENDING: 'メッセージを送信しています...',
  FORM_SUCCESS: 'メッセージが正常に送信されました！',
  FORM_ERROR: 'メッセージの送信に失敗しました。もう一度お試しください。'
};

// クラス名
export const CLASS_NAMES = {
  ACTIVE: 'active',
  FOCUSED: 'focused',
  FADE_IN: 'fade-in',
  HIDDEN: 'hidden',
  KEYBOARD_NAV: 'keyboard-navigation'
};

// 属性名
export const ATTRIBUTES = {
  DATA_CATEGORY: 'data-category',
  DATA_PROGRESS: 'data-progress',
  DATA_SRC: 'data-src',
  HREF: 'href'
};
