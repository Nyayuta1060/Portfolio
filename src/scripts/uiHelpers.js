// ========== UI生成ヘルパー関数 ==========
// 再利用可能なUI生成関数を提供

/**
 * HTML要素を安全に作成
 * @param {string} tag - タグ名
 * @param {Object} attributes - 属性オブジェクト
 * @param {string|HTMLElement|Array} children - 子要素
 * @returns {HTMLElement} 作成された要素
 * @example
 * const div = createElement('div', { class: 'card', id: 'myCard' }, 'Hello');
 */
export function createElement(tag, attributes = {}, children = null) {
  const element = document.createElement(tag);
  
  // 属性を設定
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'class') {
      element.className = value;
    } else if (key === 'style' && typeof value === 'object') {
      Object.assign(element.style, value);
    } else if (key.startsWith('data-')) {
      element.setAttribute(key, value);
    } else {
      element[key] = value;
    }
  });
  
  // 子要素を追加
  if (children) {
    if (Array.isArray(children)) {
      children.forEach(child => {
        if (typeof child === 'string') {
          element.appendChild(document.createTextNode(child));
        } else if (child instanceof HTMLElement) {
          element.appendChild(child);
        }
      });
    } else if (typeof children === 'string') {
      element.textContent = children;
    } else if (children instanceof HTMLElement) {
      element.appendChild(children);
    }
  }
  
  return element;
}

/**
 * カード要素を生成
 * @param {Object} config - カード設定
 * @param {string} config.title - タイトル
 * @param {string} config.description - 説明
 * @param {string} [config.className] - 追加クラス
 * @param {string} [config.icon] - アイコンクラス
 * @param {Function} [config.onClick] - クリックハンドラー
 * @returns {HTMLElement} カード要素
 * @example
 * const card = createCard({
 *   title: 'Project Title',
 *   description: 'Description here',
 *   icon: 'fas fa-code',
 *   onClick: () => console.log('clicked')
 * });
 */
export function createCard(config) {
  const {
    title,
    description,
    className = '',
    icon = null,
    onClick = null
  } = config;
  
  const card = createElement('div', {
    class: `card ${className}`.trim()
  });
  
  if (icon) {
    const iconElement = createElement('i', { class: icon });
    card.appendChild(iconElement);
  }
  
  if (title) {
    const titleElement = createElement('h3', { class: 'card-title' }, title);
    card.appendChild(titleElement);
  }
  
  if (description) {
    const descElement = createElement('p', { class: 'card-description' }, description);
    card.appendChild(descElement);
  }
  
  if (onClick) {
    card.classList.add('clickable');
    card.addEventListener('click', onClick);
  }
  
  return card;
}

/**
 * モーダル要素を生成
 * @param {Object} config - モーダル設定
 * @param {string} config.id - モーダルID
 * @param {string} config.title - タイトル
 * @param {string|HTMLElement} config.content - コンテンツ
 * @param {boolean} [config.closeOnOverlay=true] - オーバーレイクリックで閉じる
 * @returns {HTMLElement} モーダル要素
 * @example
 * const modal = createModal({
 *   id: 'myModal',
 *   title: 'Modal Title',
 *   content: '<p>Content here</p>'
 * });
 */
export function createModal(config) {
  const {
    id,
    title,
    content,
    closeOnOverlay = true
  } = config;
  
  const modal = createElement('div', {
    class: 'modal',
    id: id
  });
  
  const overlay = createElement('div', { class: 'modal-overlay' });
  const modalContent = createElement('div', { class: 'modal-content' });
  
  // ヘッダー
  const header = createElement('div', { class: 'modal-header' });
  const titleElement = createElement('h2', {}, title);
  const closeBtn = createElement('button', {
    class: 'modal-close',
    'aria-label': 'Close modal'
  }, '×');
  
  closeBtn.addEventListener('click', () => closeModal(modal));
  
  header.appendChild(titleElement);
  header.appendChild(closeBtn);
  
  // ボディ
  const body = createElement('div', { class: 'modal-body' });
  if (typeof content === 'string') {
    body.innerHTML = content;
  } else if (content instanceof HTMLElement) {
    body.appendChild(content);
  }
  
  modalContent.appendChild(header);
  modalContent.appendChild(body);
  modal.appendChild(overlay);
  modal.appendChild(modalContent);
  
  // オーバーレイクリック
  if (closeOnOverlay && overlay) {
    overlay.addEventListener('click', () => closeModal(modal));
  }
  
  // Escキーで閉じる（メモリリークを防ぐためにハンドラーを保存）
  const handleEscape = (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal(modal);
    }
  };
  document.addEventListener('keydown', handleEscape);
  
  // クリーンアップ用にハンドラーを保存
  modal._escapeHandler = handleEscape;
  
  return modal;
}

/**
 * モーダルを開く
 * @param {HTMLElement|string} modal - モーダル要素またはセレクター
 * @returns {void}
 */
export function openModal(modal) {
  const modalElement = typeof modal === 'string' 
    ? document.querySelector(modal) 
    : modal;
  
  if (modalElement) {
    modalElement.classList.add('active');
    document.body.classList.add('modal-open');
  }
}

/**
 * モーダルを閉じる
 * @param {HTMLElement|string} modal - モーダル要素またはセレクター
 * @returns {void}
 */
export function closeModal(modal) {
  const modalElement = typeof modal === 'string' 
    ? document.querySelector(modal) 
    : modal;
  
  if (modalElement) {
    modalElement.classList.remove('active');
    document.body.classList.remove('modal-open');
    
    // Escキーハンドラーのクリーンアップ
    if (modalElement._escapeHandler) {
      document.removeEventListener('keydown', modalElement._escapeHandler);
      delete modalElement._escapeHandler;
    }
  }
}

/**
 * ローディングスピナーを生成
 * @param {string} [message='読み込み中...'] - 表示メッセージ
 * @returns {HTMLElement} ローディング要素
 * @example
 * const loader = createLoadingSpinner('データを取得中...');
 * container.appendChild(loader);
 */
export function createLoadingSpinner(message = '読み込み中...') {
  const container = createElement('div', { class: 'loading-container' });
  const spinner = createElement('div', { class: 'loading-spinner' });
  const text = createElement('p', { class: 'loading-text' }, message);
  
  container.appendChild(spinner);
  container.appendChild(text);
  
  return container;
}

/**
 * エラーメッセージを生成
 * @param {string} message - エラーメッセージ
 * @param {string} [icon='fas fa-exclamation-triangle'] - アイコンクラス
 * @returns {HTMLElement} エラー要素
 * @example
 * const error = createErrorMessage('データの読み込みに失敗しました');
 * container.appendChild(error);
 */
export function createErrorMessage(message, icon = 'fas fa-exclamation-triangle') {
  const container = createElement('div', { class: 'error-message' });
  const iconElement = createElement('i', { class: icon });
  const text = createElement('p', {}, message);
  
  container.appendChild(iconElement);
  container.appendChild(text);
  
  return container;
}

/**
 * タグ要素を生成
 * @param {Array<string>} tags - タグ配列
 * @param {string} [className='tech-tag'] - タグのクラス名
 * @returns {HTMLElement} タグコンテナ
 * @example
 * const tags = createTags(['JavaScript', 'React', 'Node.js']);
 */
export function createTags(tags, className = 'tech-tag') {
  const container = createElement('div', { class: 'tags-container' });
  
  tags.forEach(tag => {
    const tagElement = createElement('span', { class: className }, tag);
    container.appendChild(tagElement);
  });
  
  return container;
}

/**
 * アイコン付きリンクボタンを生成
 * @param {Object} config - ボタン設定
 * @param {string} config.text - ボタンテキスト
 * @param {string} config.href - リンク先URL
 * @param {string} [config.icon] - アイコンクラス
 * @param {string} [config.className] - 追加クラス
 * @param {boolean} [config.external=true] - 外部リンクか
 * @returns {HTMLElement} リンクボタン要素
 */
export function createIconLink(config) {
  const {
    text,
    href,
    icon = null,
    className = 'btn',
    external = true
  } = config;
  
  const attributes = {
    class: className,
    href: href
  };
  
  if (external) {
    attributes.target = '_blank';
    attributes.rel = 'noopener noreferrer';
  }
  
  const link = createElement('a', attributes);
  
  if (icon) {
    const iconElement = createElement('i', { class: icon });
    link.appendChild(iconElement);
  }
  
  const textNode = document.createTextNode(text);
  link.appendChild(textNode);
  
  return link;
}

/**
 * 空状態のプレースホルダーを生成
 * @param {string} message - 表示メッセージ
 * @param {string} [icon='fas fa-inbox'] - アイコンクラス
 * @returns {HTMLElement} プレースホルダー要素
 */
export function createEmptyState(message, icon = 'fas fa-inbox') {
  const container = createElement('div', { class: 'empty-state' });
  const iconElement = createElement('i', { class: icon });
  const text = createElement('p', {}, message);
  
  container.appendChild(iconElement);
  container.appendChild(text);
  
  return container;
}
