// ========== 定数定義 ==========

// スキルデータのインポート
export { 
  SKILL_DETAILS,
  SKILL_LEVELS,
  FREQUENCY,
  CATEGORIES,
  getSkillCategory,
  groupSkillsByCategory,
  hasSkill,
  getAllSkillIds,
  getSkillCount
} from './skillsData.js';

// アニメーション設定
export const ANIMATION_CONFIG = {
  DEBOUNCE_DELAY: 250,
  THROTTLE_DELAY: 16, // 60fps
  PARTICLE_COUNT: 50,
  PARTICLE_CONNECTION_DISTANCE: 100,
  SKILL_BAR_ANIMATION_DELAY: 200
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
  SKILL_CARDS: '.skill-card',
  SKILL_MODAL: '#skill-modal',
  
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

// 属性名
export const ATTRIBUTES = {
  DATA_CATEGORY: 'data-category',
  DATA_PROGRESS: 'data-progress',
  DATA_SRC: 'data-src',
  DATA_TECH: 'data-tech',
  HREF: 'href'
};
