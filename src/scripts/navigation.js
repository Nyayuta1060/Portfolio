// ========== ナビゲーション機能 ==========
import { getElement, getElements, addEventListeners, toggleClass } from './utils.js';

const NAV_CONFIG = {
  OFFSET: 80,
  SCROLL_THRESHOLD: 100,
  ACTIVE_SECTION_OFFSET: 150
};

const SELECTORS = {
  HAMBURGER: '.hamburger',
  NAV_MENU: '.nav-menu',
  NAV_LINKS: '.nav-link',
  NAVBAR: '.navbar',
  SECTIONS: 'section'
};

const CLASS_NAMES = {
  ACTIVE: 'active'
};

/**
 * ナビゲーション機能の初期化
 */
export function initializeNavigation() {
  setupMobileMenu();
  setupSmoothScroll();
  setupScrollEffects();
}

/**
 * モバイルメニューのセットアップ
 */
function setupMobileMenu() {
  const hamburger = getElement(SELECTORS.HAMBURGER);
  const navMenu = getElement(SELECTORS.NAV_MENU);
  
  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    toggleClass(hamburger, CLASS_NAMES.ACTIVE);
    toggleClass(navMenu, CLASS_NAMES.ACTIVE);
  });
}

/**
 * スムーズスクロールのセットアップ
 */
function setupSmoothScroll() {
  const navLinks = getElements(SELECTORS.NAV_LINKS);
  const navMenu = getElement(SELECTORS.NAV_MENU);
  const hamburger = getElement(SELECTORS.HAMBURGER);

  addEventListeners(navLinks, 'click', (e) => {
    e.preventDefault();
    const targetId = e.target.getAttribute('href').substring(1);
    scrollToSection(targetId);

    // モバイルメニューを閉じる
    if (navMenu && navMenu.classList.contains(CLASS_NAMES.ACTIVE)) {
      toggleClass(hamburger, CLASS_NAMES.ACTIVE);
      toggleClass(navMenu, CLASS_NAMES.ACTIVE);
    }
  });
}

/**
 * スクロールエフェクトのセットアップ
 */
function setupScrollEffects() {
  window.addEventListener('scroll', () => {
    updateNavbarBackground();
    highlightActiveSection();
  });
}

/**
 * ナビバーの背景を更新
 */
function updateNavbarBackground() {
  const navbar = getElement(SELECTORS.NAVBAR);
  if (!navbar) return;

  if (window.scrollY > NAV_CONFIG.SCROLL_THRESHOLD) {
    navbar.style.background = 'rgba(10, 10, 15, 0.95)';
  } else {
    navbar.style.background = 'rgba(10, 10, 15, 0.9)';
  }
}

/**
 * アクティブセクションをハイライト
 */
function highlightActiveSection() {
  const sections = getElements(SELECTORS.SECTIONS);
  const navLinks = getElements(SELECTORS.NAV_LINKS);
  
  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - NAV_CONFIG.ACTIVE_SECTION_OFFSET;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop && 
        window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove(CLASS_NAMES.ACTIVE);
    if (link.getAttribute('href').substring(1) === currentSection) {
      link.classList.add(CLASS_NAMES.ACTIVE);
    }
  });
}

/**
 * セクションへスムーズスクロール
 * @param {string} sectionId - スクロール先のセクションID
 */
export function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const offsetTop = section.offsetTop - NAV_CONFIG.OFFSET;
  window.scrollTo({
    top: offsetTop,
    behavior: 'smooth'
  });
}
