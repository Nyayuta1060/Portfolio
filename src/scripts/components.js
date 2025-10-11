// ========== コンポーネント機能 ==========
import { getElement, getElements, addEventListeners, logError } from './utils.js';

const CONFIG = {
  NOTIFICATION_DURATION: 3000,
  NOTIFICATION_ANIMATION_DELAY: 100,
  FORM_SUBMIT_DELAY: 2000
};

const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  ERROR: 'error'
};

const MESSAGES = {
  FORM_SENDING: 'メッセージを送信しています...',
  FORM_SUCCESS: 'メッセージが正常に送信されました！',
  FORM_ERROR: 'メッセージの送信に失敗しました。もう一度お試しください。'
};

// ========== フォーム処理 ==========

/**
 * フォーム処理を初期化
 */
export function initializeFormHandling() {
  const form = getElement('.form');
  if (!form) return;

  form.addEventListener('submit', handleFormSubmit);
  setupInputFocusEffects();
}

/**
 * フォーム送信を処理
 * @param {Event} e - イベントオブジェクト
 */
async function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  try {
    showNotification(MESSAGES.FORM_SENDING, NOTIFICATION_TYPES.INFO);

    // フォーム送信のシミュレーション
    await new Promise(resolve => setTimeout(resolve, CONFIG.FORM_SUBMIT_DELAY));
    
    showNotification(MESSAGES.FORM_SUCCESS, NOTIFICATION_TYPES.SUCCESS);
    form.reset();
  } catch (error) {
    logError('Form Submission', error);
    showNotification(MESSAGES.FORM_ERROR, NOTIFICATION_TYPES.ERROR);
  }
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

// ========== 通知システム ==========

/**
 * 通知を表示
 * @param {string} message - 通知メッセージ
 * @param {string} type - 通知タイプ (info, success, error)
 */
export function showNotification(message, type = NOTIFICATION_TYPES.INFO) {
  // 既存の通知を削除
  const existingNotification = getElement('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // 新しい通知を作成
  const notification = createNotificationElement(message, type);
  document.body.appendChild(notification);

  // アニメーション
  animateNotification(notification);
}

/**
 * 通知要素を作成
 * @param {string} message - 通知メッセージ
 * @param {string} type - 通知タイプ
 * @returns {HTMLElement} 通知要素
 */
function createNotificationElement(message, type) {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  const borderColor = getNotificationBorderColor(type);
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 2rem;
    background: var(--card-bg);
    border: 2px solid ${borderColor};
    border-radius: 10px;
    color: var(--text-primary);
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    backdrop-filter: blur(10px);
  `;

  return notification;
}

/**
 * 通知タイプに応じたボーダーカラーを取得
 * @param {string} type - 通知タイプ
 * @returns {string} カラーコード
 */
function getNotificationBorderColor(type) {
  switch (type) {
    case NOTIFICATION_TYPES.SUCCESS:
      return '#27ca3f';
    case NOTIFICATION_TYPES.ERROR:
      return '#ff5f56';
    default:
      return 'var(--primary-color)';
  }
}

/**
 * 通知をアニメーション
 * @param {HTMLElement} notification - 通知要素
 */
function animateNotification(notification) {
  // 表示アニメーション
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, CONFIG.NOTIFICATION_ANIMATION_DELAY);

  // 自動削除
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, CONFIG.NOTIFICATION_DURATION);
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
