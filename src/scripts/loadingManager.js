/**
 * ローディング状態管理モジュール
 * 複数のローディングインジケーターを一元管理
 */

/**
 * ローディングを表示
 * @param {HTMLElement|string} container - コンテナ要素またはセレクター
 * @param {string} [message='読み込み中...'] - 表示メッセージ
 * @returns {HTMLElement} ローディング要素
 */
export function showLoading(container, message = '読み込み中...') {
  const element = typeof container === 'string' 
    ? document.querySelector(container) 
    : container;
  
  if (!element) return null;

  const loadingHTML = `
    <div class="loading-container">
      <div class="loading-spinner"></div>
      <p>${message}</p>
    </div>
  `;

  element.innerHTML = loadingHTML;
  return element.querySelector('.loading-container');
}

/**
 * エラーメッセージを表示
 * @param {HTMLElement|string} container - コンテナ要素またはセレクター
 * @param {string} message - エラーメッセージ
 * @returns {HTMLElement} エラー要素
 */
export function showError(container, message) {
  const element = typeof container === 'string' 
    ? document.querySelector(container) 
    : container;
  
  if (!element) return null;

  const errorHTML = `
    <div class="error-container">
      <i class="fas fa-exclamation-circle"></i>
      <p class="error-message">${message}</p>
    </div>
  `;

  element.innerHTML = errorHTML;
  return element.querySelector('.error-container');
}

/**
 * ローディングをクリア
 * @param {HTMLElement|string} container - コンテナ要素またはセレクター
 */
export function clearLoading(container) {
  const element = typeof container === 'string' 
    ? document.querySelector(container) 
    : container;
  
  if (!element) return;

  const loading = element.querySelector('.loading-container');
  if (loading) {
    loading.remove();
  }
}

/**
 * インラインローディングスピナーを作成
 * @param {string} [size='medium'] - サイズ ('small', 'medium', 'large')
 * @returns {HTMLElement} スピナー要素
 */
export function createSpinner(size = 'medium') {
  const spinner = document.createElement('div');
  spinner.className = `loading-spinner spinner-${size}`;
  return spinner;
}

/**
 * ローディングオーバーレイを表示
 * @param {string} [message='処理中...'] - 表示メッセージ
 * @returns {HTMLElement} オーバーレイ要素
 */
export function showOverlay(message = '処理中...') {
  const overlay = document.createElement('div');
  overlay.className = 'loading-overlay';
  overlay.innerHTML = `
    <div class="loading-overlay-content">
      <div class="loading-spinner"></div>
      <p>${message}</p>
    </div>
  `;
  
  document.body.appendChild(overlay);
  document.body.classList.add('loading-active');
  
  return overlay;
}

/**
 * ローディングオーバーレイを非表示
 */
export function hideOverlay() {
  const overlay = document.querySelector('.loading-overlay');
  if (overlay) {
    overlay.classList.add('fade-out');
    setTimeout(() => {
      overlay.remove();
      document.body.classList.remove('loading-active');
    }, 300);
  }
}
