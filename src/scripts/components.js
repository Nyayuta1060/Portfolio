// ========== コンポーネント機能 ==========
import { getElements, addEventListeners } from './utils.js';

// ========== 入力フォーカス効果 ==========

/**
 * 入力フィールドのフォーカス効果を初期化
 * GitHub Pagesではフォーム送信機能は使用不可のため、
 * 視覚的なフィードバックのみ提供
 */
export function initializeFormHandling() {
  setupInputFocusEffects();
}

/**
 * 入力フィールドのフォーカス効果をセットアップ
 */
function setupInputFocusEffects() {
  const inputs = getElements('.form-input');

  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function() {
      if (this.value === '') {
        this.parentElement.classList.remove('focused');
      }
    });
  });
}

// ========== スキルフィルター機能 ==========

/**
 * スキルフィルター機能を初期化
 */
export function initializeSkillsFilter() {
  const filterBtns = getElements('.filter-btn');
  const categorySections = getElements('.skill-category-section');

  if (filterBtns.length === 0) return;

  addEventListeners(filterBtns, 'click', function() {
    const category = this.getAttribute('data-category');
    updateActiveFilter(filterBtns, this);
    filterSkillCategories(categorySections, category);
  });
}

/**
 * アクティブなフィルターボタンを更新
 * @param {NodeList} filterBtns - フィルターボタンのリスト
 * @param {HTMLElement} activeBtn - アクティブにするボタン
 */
function updateActiveFilter(filterBtns, activeBtn) {
  filterBtns.forEach(btn => btn.classList.remove('active'));
  activeBtn.classList.add('active');
}

/**
 * スキルカテゴリをフィルタリング
 * @param {NodeList} categorySections - カテゴリセクションのリスト
 * @param {string} category - フィルターカテゴリ
 */
function filterSkillCategories(categorySections, category) {
  if (category === 'all') {
    showAllCategories(categorySections);
  } else {
    showSpecificCategory(categorySections, category);
  }
}

/**
 * すべてのカテゴリを表示
 * @param {NodeList} categorySections - カテゴリセクションのリスト
 */
function showAllCategories(categorySections) {
  categorySections.forEach(section => {
    section.classList.remove('hidden');
    setTimeout(() => {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    }, 50);
  });
}

/**
 * 特定のカテゴリを表示
 * @param {NodeList} categorySections - カテゴリセクションのリスト
 * @param {string} category - 表示するカテゴリ
 */
function showSpecificCategory(categorySections, category) {
  categorySections.forEach(section => {
    const sectionCategory = section.getAttribute('data-category');
    
    if (sectionCategory === category) {
      section.classList.remove('hidden');
      setTimeout(() => {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }, 50);
    } else {
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      setTimeout(() => {
        section.classList.add('hidden');
      }, 300);
    }
  });
}
