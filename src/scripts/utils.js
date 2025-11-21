// ========== ユーティリティ関数 ==========

/**
 * デバウンス関数 - 関数の連続実行を制限
 * @param {Function} func - 実行する関数
 * @param {number} wait - 待機時間(ミリ秒)
 * @returns {Function} デバウンスされた関数
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * スロットル関数 - 関数の実行頻度を制限
 * @param {Function} func - 実行する関数
 * @param {number} limit - 制限時間(ミリ秒)
 * @returns {Function} スロットルされた関数
 */
export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * 要素が存在するかチェック
 * @param {string|HTMLElement} element - セレクターまたは要素
 * @returns {HTMLElement|null} 要素またはnull
 */
export function getElement(element) {
  if (typeof element === 'string') {
    return document.querySelector(element);
  }
  return element instanceof HTMLElement ? element : null;
}

/**
 * 複数の要素を取得
 * @param {string} selector - CSSセレクター
 * @returns {NodeList} 要素のリスト
 */
export function getElements(selector) {
  return document.querySelectorAll(selector);
}

/**
 * クラスの追加・削除をトグル
 * @param {HTMLElement} element - 対象要素
 * @param {string} className - クラス名
 */
export function toggleClass(element, className) {
  if (element) {
    element.classList.toggle(className);
  }
}

/**
 * 安全にイベントリスナーを追加
 * @param {HTMLElement|NodeList} elements - 対象要素
 * @param {string} event - イベント名
 * @param {Function} handler - ハンドラー関数
 */
export function addEventListeners(elements, event, handler) {
  if (!elements) return;
  
  if (elements instanceof NodeList) {
    elements.forEach(el => el.addEventListener(event, handler));
  } else if (elements instanceof HTMLElement) {
    elements.addEventListener(event, handler);
  }
}

// ========== パフォーマンス最適化 ==========

/**
 * 画像の遅延読み込みを初期化
 * ネイティブのlazyloadingをサポートしている場合はそれを使用
 * サポートしていない場合はIntersection Observerを使用
 */
export function initializeLazyImages() {
  if ('loading' in HTMLImageElement.prototype) {
    const images = getElements('img[data-src]');
    images.forEach(img => {
      img.loading = 'lazy';
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  } else {
    // フォールバック: Intersection Observerを使用
    initializeLazyLoadingFallback();
  }
}

/**
 * Intersection Observerによる遅延読み込み(フォールバック)
 */
function initializeLazyLoadingFallback() {
  const lazyElements = getElements('[data-src]');
  
  const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        element.src = element.getAttribute('data-src');
        element.removeAttribute('data-src');
        lazyObserver.unobserve(element);
      }
    });
  });

  lazyElements.forEach(element => lazyObserver.observe(element));
}

/**
 * 重要なリソースをプリロード
 */
export function preloadCriticalResources() {
  const criticalFonts = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500&display=swap'
  ];

  criticalFonts.forEach(fontUrl => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = fontUrl;
    document.head.appendChild(link);
  });
}

// ========== アクセシビリティ ==========

/**
 * アクセシビリティ機能を初期化
 */
export function initializeAccessibility() {
  setupKeyboardNavigation();
  respectReducedMotion();
}

/**
 * キーボードナビゲーションのセットアップ
 */
function setupKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });

  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
  });
}

/**
 * ユーザーの減色モーション設定を尊重
 */
function respectReducedMotion() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition-smooth', 'none');
    document.documentElement.style.setProperty('--transition-bounce', 'none');
  }
}

// ========== DOM操作ユーティリティ ==========

/**
 * アニメーション用のスタイルを動的に追加
 */
export function addAnimationStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .fade-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }

    .skill-category,
    .project-card,
    .about-content,
    .contact-content {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .keyboard-navigation *:focus {
      outline: 2px solid var(--primary-color) !important;
      outline-offset: 2px;
    }
  `;
  document.head.appendChild(style);
}

// ========== エラーハンドリング ==========

/**
 * エラーレベルの定義
 */
const ERROR_LEVELS = {
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
  CRITICAL: 'CRITICAL'
};

/**
 * 拡張エラーハンドリング用のログ関数
 * 開発環境では詳細情報を表示し、本番環境では最小限の情報のみ記録
 * @param {string} context - エラーのコンテキスト（機能名、ファイル名など）
 * @param {Error|string} error - エラーオブジェクトまたはメッセージ
 * @param {string} level - エラーレベル（INFO, WARN, ERROR, CRITICAL）
 * @param {Object} additionalInfo - 追加情報（オプション）
 */
export function logError(context, error, level = ERROR_LEVELS.ERROR, additionalInfo = {}) {
  const timestamp = new Date().toISOString();
  const isDevelopment = window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1';
  
  // エラー情報の構築
  const errorInfo = {
    timestamp,
    context,
    level,
    message: error?.message || error,
    stack: error?.stack,
    userAgent: navigator.userAgent,
    url: window.location.href,
    ...additionalInfo
  };

  // レベルに応じたログ出力
  const logMethod = {
    [ERROR_LEVELS.INFO]: console.info,
    [ERROR_LEVELS.WARN]: console.warn,
    [ERROR_LEVELS.ERROR]: console.error,
    [ERROR_LEVELS.CRITICAL]: console.error
  }[level] || console.error;

  if (isDevelopment) {
    // 開発環境: 詳細情報を表示
    logMethod(`[${level}] [${context}] @ ${timestamp}`, errorInfo);
  } else {
    // 本番環境: 最小限の情報のみ
    logMethod(`[${level}] [${context}]:`, error?.message || error);
  }

  // クリティカルエラーの場合は追加処理（将来的に外部サービスへの送信など）
  if (level === ERROR_LEVELS.CRITICAL) {
    handleCriticalError(errorInfo);
  }

  return errorInfo;
}

/**
 * クリティカルエラーの処理
 * @param {Object} errorInfo - エラー情報
 */
function handleCriticalError(errorInfo) {
  // 将来的にはエラートラッキングサービス（Sentry等）への送信を実装
  console.error('🚨 CRITICAL ERROR:', errorInfo);
  
  // ユーザーへの通知（オプション）
  // showErrorNotification('重大なエラーが発生しました。ページを再読み込みしてください。');
}

/**
 * 安全な関数実行ラッパー
 * エラーが発生してもアプリケーション全体が停止しないようにする
 * @param {Function} fn - 実行する関数
 * @param {string} context - コンテキスト
 * @param {Function} fallback - エラー時のフォールバック関数
 * @returns {*} 関数の実行結果またはフォールバック結果
 */
export function safeExecute(fn, context, fallback = () => null) {
  try {
    return fn();
  } catch (error) {
    logError(context, error, ERROR_LEVELS.ERROR);
    return fallback();
  }
}

/**
 * 非同期関数の安全な実行ラッパー
 * @param {Function} fn - 実行する非同期関数
 * @param {string} context - コンテキスト
 * @param {Function} fallback - エラー時のフォールバック関数
 * @returns {Promise<*>} 関数の実行結果またはフォールバック結果
 */
export async function safeExecuteAsync(fn, context, fallback = async () => null) {
  try {
    return await fn();
  } catch (error) {
    logError(context, error, ERROR_LEVELS.ERROR);
    return await fallback();
  }
}

// エラーレベルをエクスポート
export { ERROR_LEVELS };
