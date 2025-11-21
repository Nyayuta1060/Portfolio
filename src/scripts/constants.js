// ========== 定数定義 ==========

// スキルデータのインポート
export { 
  SKILL_LEVELS,
  FREQUENCY,
  CATEGORIES,
  getSkillCategory,
  getSkillDetails,
  groupSkillsByCategory,
  hasSkill,
  getAllSkillIds,
  getSkillCount,
  initSkillData
} from './skillsData.js';

// プロジェクトデータのインポート
export {
  PROJECT_STATUS,
  PROJECT_TYPE,
  getProjectDetails,
  getProjectById,
  getFeaturedProjects,
  getProjectsByStatus,
  getProjectsByType,
  getProjectsByTechnology,
  hasProject,
  getAllProjectIds,
  getProjectCount,
  getAllProjects,
  getSortedProjects,
  initProjectData
} from './projectsData.js';

// 経歴データのインポート
export {
  CAREER_CATEGORY,
  getCareerData,
  getTimeline,
  getStats,
  getCareerByCategory,
  getCareerById,
  getCareerCount,
  getLatestCareer,
  initCareerData
} from './careerData.js';

// データソースのパス
export const DATA_SOURCES = {
  SKILLS: './src/data/skills.json',
  PROJECTS: './src/data/projects.json',
  CAREER: './src/data/career.json'
};

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
  OFFSET: 80, // ナビバーの高さ（CSS変数 --nav-height と同期）
  SCROLL_THRESHOLD: 100,
  ACTIVE_SECTION_OFFSET: 150
};

// パララックス設定
export const PARALLAX_CONFIG = {
  SPEED: 0.5
};

// Z-Index階層（CSS変数と同期）
export const Z_INDEX = {
  DROPDOWN: 100,
  STICKY: 500,
  NAVBAR: 1000,
  MODAL_OVERLAY: 9999,
  MODAL: 10000
};

// ブレークポイント（ピクセル値）
export const BREAKPOINTS = {
  MOBILE: 480,
  TABLET: 768,
  DESKTOP: 1024,
  WIDE: 1440
};

// タイミング定数
export const TIMING = {
  TRANSITION_FAST: 150,
  TRANSITION_NORMAL: 300,
  TRANSITION_SLOW: 400,
  DEBOUNCE_DEFAULT: 250,
  THROTTLE_DEFAULT: 16
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
  DATA_PROJECT: 'data-project',
  HREF: 'href'
};
