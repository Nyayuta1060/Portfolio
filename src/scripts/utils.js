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
 * @param {string|HTMLElement|null} element - セレクターまたは要素
 * @returns {HTMLElement|null} 要素またはnull
 * @example
 * const header = getElement('.header');
 * const sameHeader = getElement(header); // 既存の要素を渡しても動作
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
 * @returns {NodeListOf<Element>} 要素のリスト（空の場合もある）
 * @throws {TypeError} selectorが文字列でない場合
 * @example
 * const buttons = getElements('.btn');
 * buttons.forEach(btn => console.log(btn));
 */
export function getElements(selector) {
  if (typeof selector !== 'string') {
    throw new TypeError('Selector must be a string');
  }
  return document.querySelectorAll(selector);
}

/**
 * クラスの追加・削除をトグル
 * @param {HTMLElement|null} element - 対象要素
 * @param {string} className - クラス名
 * @returns {boolean} トグル後のクラスの存在状態
 * @example
 * const isActive = toggleClass(menu, 'active');
 */
export function toggleClass(element, className) {
  if (element && element instanceof HTMLElement) {
    return element.classList.toggle(className);
  }
  return false;
}

/**
 * 安全にイベントリスナーを追加
 * @param {HTMLElement|NodeList|Array<HTMLElement>|null} elements - 対象要素
 * @param {string} event - イベント名
 * @param {EventListener} handler - ハンドラー関数
 * @param {AddEventListenerOptions} [options] - イベントリスナーオプション
 * @returns {void}
 * @example
 * addEventListeners(buttons, 'click', handleClick);
 * addEventListeners(button, 'click', handleClick, { once: true });
 */
export function addEventListeners(elements, event, handler, options) {
  if (!elements) return;
  
  if (elements instanceof NodeList || Array.isArray(elements)) {
    elements.forEach(el => {
      if (el instanceof HTMLElement) {
        el.addEventListener(event, handler, options);
      }
    });
  } else if (elements instanceof HTMLElement) {
    elements.addEventListener(event, handler, options);
  }
}

// ========== パフォーマンス最適化 ==========

/**
 * 画像の遅延読み込みを初期化
 * ネイティブのlazyloadingをサポートしている場合はそれを使用
 * サポートしていない場合はIntersection Observerを使用
 * @returns {void}
 * @example
 * initializeLazyImages();
 */
export function initializeLazyImages() {
  if ('loading' in HTMLImageElement.prototype) {
    const images = getElements('img[data-src]');
    images.forEach(img => {
      if (img instanceof HTMLImageElement) {
        img.loading = 'lazy';
        img.src = img.dataset.src || '';
        img.removeAttribute('data-src');
      }
    });
  } else {
    // フォールバック: Intersection Observerを使用
    initializeLazyLoadingFallback();
  }
}

/**
 * Intersection Observerによる遅延読み込み(フォールバック)
 * @private
 * @returns {void}
 */
function initializeLazyLoadingFallback() {
  const lazyElements = getElements('[data-src]');
  
  const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const src = element.getAttribute('data-src');
        if (src && element instanceof HTMLElement) {
          element.setAttribute('src', src);
          element.removeAttribute('data-src');
          lazyObserver.unobserve(element);
        }
      }
    });
  });

  lazyElements.forEach(element => lazyObserver.observe(element));
}

/**
 * 重要なリソースをプリロード
 * @param {string[]} [additionalResources=[]] - 追加でプリロードするリソースのURL配列
 * @returns {void}
 * @example
 * preloadCriticalResources();
 * preloadCriticalResources(['https://example.com/custom-font.woff2']);
 */
export function preloadCriticalResources(additionalResources = []) {
  const criticalFonts = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500&display=swap',
    ...additionalResources
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
 * @returns {void}
 * @example
 * initializeAccessibility();
 */
export function initializeAccessibility() {
  setupKeyboardNavigation();
  respectReducedMotion();
}

/**
 * キーボードナビゲーションのセットアップ
 * Tabキーでのフォーカス時に視覚的インジケーターを表示
 * @private
 * @returns {void}
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
 * prefers-reduced-motionメディアクエリに対応
 * @private
 * @returns {void}
 */
function respectReducedMotion() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--transition-smooth', 'none');
    document.documentElement.style.setProperty('--transition-bounce', 'none');
    document.documentElement.style.setProperty('--transition-fast', 'none');
  }
  
  // 設定変更の監視
  prefersReducedMotion.addEventListener('change', (e) => {
    if (e.matches) {
      document.documentElement.style.setProperty('--transition-smooth', 'none');
      document.documentElement.style.setProperty('--transition-bounce', 'none');
      document.documentElement.style.setProperty('--transition-fast', 'none');
    } else {
      document.documentElement.style.removeProperty('--transition-smooth');
      document.documentElement.style.removeProperty('--transition-bounce');
      document.documentElement.style.removeProperty('--transition-fast');
    }
  });
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
