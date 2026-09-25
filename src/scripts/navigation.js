// ========== ナビゲーション機能 ==========
import { getElement, getElements, addEventListeners } from './utils.js';

const NAV_CONFIG = {
  OFFSET: 80,
  SCROLL_THRESHOLD: 100,
  ACTIVE_SECTION_OFFSET: 150
};

const SELECTORS = {
  HAMBURGER: '.hamburger',
  NAV_MENU: '.nav-menu',
  NAV_LINKS: '.nav-link',
  NAV_LOGO: '.nav-logo',
  NAVBAR: '.navbar',
  SECTIONS: 'main > section[id]'
};

const CLASS_NAMES = {
  ACTIVE: 'active'
};

/**
 * ナビゲーション機能の初期化
 */
export function initializeNavigation() {
  setupMobileMenu();
  setupLogoClick();
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

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navMenu.classList.contains(CLASS_NAMES.ACTIVE)) {
      setMobileMenu(false);
      hamburger.focus();
    }
  });

  hamburger.addEventListener('click', () => {
    setMobileMenu(!navMenu.classList.contains(CLASS_NAMES.ACTIVE));
  });
}

/**
 * ロゴクリックのセットアップ
 */
function setMobileMenu(open) {
  const hamburger = getElement(SELECTORS.HAMBURGER);
  getElement(SELECTORS.NAV_MENU)?.classList.toggle(CLASS_NAMES.ACTIVE, open);
  hamburger?.classList.toggle(CLASS_NAMES.ACTIVE, open);
  hamburger?.setAttribute('aria-expanded', String(open));
}

function setupLogoClick() {
  const navLogo = getElement(SELECTORS.NAV_LOGO);
  
  if (!navLogo) return;

  navLogo.addEventListener('click', (e) => {
    e.preventDefault();
    
    // ロゴアニメーション（スクロール前に実行）
    animateLogo(navLogo);
    
    // トップへスムーズスクロール
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
    });

    // モバイルメニューを閉じる
    const navMenu = getElement(SELECTORS.NAV_MENU);
    const hamburger = getElement(SELECTORS.HAMBURGER);
    if (navMenu && navMenu.classList.contains(CLASS_NAMES.ACTIVE)) {
      setMobileMenu(false);
    }

    // コンソールにメッセージ表示（イースターエッグ的な要素）
    console.log('%c🚀 Welcome back to the top!', 'color: #64ffda; font-size: 16px; font-weight: bold;');
  });
}

/**
 * ロゴアニメーション
 * @param {HTMLElement} logo - ロゴ要素
 */
function animateLogo(logo) {
  const logoIcon = logo.querySelector('.logo-icon');
  const logoName = logo.querySelector('.logo-name');
  
  if (!logoIcon) return;

  // アイコンを回転させる
  logoIcon.style.transform = 'rotate(360deg) scale(1.1)';
  
  // ロゴ名を一時的にハイライト
  if (logoName) {
    logoName.style.color = 'var(--primary-color)';
    logoName.style.textShadow = '0 0 20px rgba(100, 255, 218, 0.5)';
  }
  
  // パーティクルエフェクトを生成
  createLogoParticles(logo);
  
  setTimeout(() => {
    logoIcon.style.transform = 'rotate(0deg) scale(1)';
    if (logoName) {
      logoName.style.color = '';
      logoName.style.textShadow = '';
    }
  }, 500);
}

/**
 * ロゴクリック時のパーティクルエフェクト
 * @param {HTMLElement} logo - ロゴ要素
 */
function createLogoParticles(logo) {
  const logoIcon = logo.querySelector('.logo-icon');
  if (!logoIcon) return;

  const rect = logoIcon.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // 8つのパーティクルを生成
  for (let i = 0; i < 8; i++) {
    const particle = document.createElement('div');
    particle.className = 'logo-particle';
    particle.style.cssText = `
      position: fixed;
      left: ${centerX}px;
      top: ${centerY}px;
      width: 6px;
      height: 6px;
      background: var(--primary-color);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      box-shadow: 0 0 10px var(--primary-color);
    `;
    
    document.body.appendChild(particle);

    // アニメーション
    const angle = (Math.PI * 2 * i) / 8;
    const distance = 50;
    const targetX = centerX + Math.cos(angle) * distance;
    const targetY = centerY + Math.sin(angle) * distance;

    particle.animate([
      { 
        transform: 'translate(0, 0) scale(1)',
        opacity: 1
      },
      { 
        transform: `translate(${targetX - centerX}px, ${targetY - centerY}px) scale(0)`,
        opacity: 0
      }
    ], {
      duration: 600,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }).onfinish = () => {
      particle.remove();
    };
  }
}

/**
 * スムーズスクロールのセットアップ
 */
function setupSmoothScroll() {
  const navLinks = getElements('.nav-link, .hero-buttons a');
  const navMenu = getElement(SELECTORS.NAV_MENU);
  const hamburger = getElement(SELECTORS.HAMBURGER);

  addEventListeners(navLinks, 'click', (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href').substring(1);
    scrollToSection(targetId);

    // モバイルメニューを閉じる
    if (navMenu && navMenu.classList.contains(CLASS_NAMES.ACTIVE)) {
      setMobileMenu(false);
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

  navbar.classList.toggle('scrolled', window.scrollY > NAV_CONFIG.SCROLL_THRESHOLD);
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
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
  });
}
