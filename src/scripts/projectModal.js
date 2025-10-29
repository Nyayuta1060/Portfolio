// ========== プロジェクトモーダル機能 ==========
import { getElements, addEventListeners } from './utils.js';
import { PROJECT_DETAILS } from './projectsData.js';

// ========== 定数定義 ==========

/**
 * モーダルのラベルテキスト
 */
const MODAL_LABELS = {
  SECTIONS: {
    OVERVIEW: 'プロジェクト概要',
    TECH_STACK: '使用技術',
    DETAILS: '詳細',
    HIGHLIGHTS: '主な機能・特徴',
    LINKS: 'リンク'
  },
  INFO: {
    PERIOD: '開発期間',
    DEV_TYPE: '開発形態',
    ROLE: '役割'
  },
  LINKS: {
    GITHUB: 'GitHub',
    DEMO: 'デモサイト',
    ARTICLE: '記事'
  },
  DEV_TYPE: {
    TEAM: 'チーム開発',
    PERSONAL: '個人開発'
  },
  PROJECT_TYPE: {
    'web-app': 'Webアプリ',
    'cli-tool': 'CLIツール',
    'library': 'ライブラリ',
    'automation': '自動化',
    'game': 'ゲーム',
    'robot': 'ロボット',
    'ai-ml': 'AI/ML',
    'other': 'その他'
  },
  STATUS: {
    'completed': '完成',
    'in-progress': '進行中',
    'archived': 'アーカイブ',
    'planning': '計画中'
  }
};

/**
 * モーダルのアイコン
 */
const MODAL_ICONS = {
  OVERVIEW: 'fas fa-info-circle',
  TECH_STACK: 'fas fa-code',
  DETAILS: 'fas fa-align-left',
  HIGHLIGHTS: 'fas fa-star',
  LINKS: 'fas fa-link',
  GITHUB: 'fab fa-github',
  DEMO: 'fas fa-external-link-alt',
  ARTICLE: 'fas fa-newspaper',
  VIDEO_PLAY: 'fas fa-play-circle',
  NAV_PREV: 'fas fa-chevron-left',
  NAV_NEXT: 'fas fa-chevron-right',
  CLOSE: 'fas fa-times'
};

// ========== メイン関数 ==========

/**
 * プロジェクト詳細モーダル機能を初期化
 */
export function initializeProjectModal() {
  const projectCards = getElements('.project-card');
  
  if (projectCards.length === 0) return;

  createProjectModalElement();
  setupProjectCardEvents(projectCards);
  setupModalCloseEvents();
}

// ========== イベント設定 ==========

/**
 * プロジェクトカードのイベントを設定
 * @param {NodeList} projectCards - プロジェクトカードの要素
 */
function setupProjectCardEvents(projectCards) {
  addEventListeners(projectCards, 'click', function(e) {
    // リンクボタンのクリックはモーダルを開かない
    if (e.target.closest('.project-link-btn') || e.target.closest('.project-links')) {
      return;
    }
    
    e.preventDefault();
    const projectId = this.getAttribute('data-project');
    if (projectId && PROJECT_DETAILS[projectId]) {
      openProjectModal(projectId);
    }
  });
}

/**
 * モーダルを閉じるイベントを設定
 */
function setupModalCloseEvents() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.project-modal-close');
  const overlay = modal.querySelector('.project-modal-overlay');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeProjectModal);
  }

  if (overlay) {
    overlay.addEventListener('click', closeProjectModal);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeProjectModal();
    }
  });
}

// ========== HTML生成 ==========

/**
 * モーダルHTML要素を作成
 */
function createProjectModalElement() {
  const modal = buildModalHTML();
  document.body.insertAdjacentHTML('beforeend', modal);
}

/**
 * モーダルHTMLを構築
 * @returns {string} モーダルHTML
 */
function buildModalHTML() {
  return `
    <div id="project-modal" class="project-modal">
      <div class="project-modal-overlay"></div>
      <div class="project-modal-content">
        ${buildModalHeader()}
        ${buildModalBody()}
      </div>
    </div>
  `;
}

/**
 * モーダルヘッダーHTMLを構築
 * @returns {string} ヘッダーHTML
 */
function buildModalHeader() {
  return `
    <button class="project-modal-close" aria-label="閉じる">
      <i class="${MODAL_ICONS.CLOSE}"></i>
    </button>
    <div class="project-modal-header">
      <h2 id="project-modal-title"></h2>
      <div class="project-modal-meta">
        <span class="project-modal-type" id="project-modal-type"></span>
        <span class="project-modal-status" id="project-modal-status"></span>
      </div>
    </div>
  `;
}

/**
 * モーダルボディHTMLを構築
 * @returns {string} ボディHTML
 */
function buildModalBody() {
  return `
    <div class="project-modal-body">
      ${buildGallerySection()}
      ${buildOverviewSection()}
      ${buildTechStackSection()}
      ${buildDetailsSection()}
      ${buildHighlightsSection()}
      ${buildLinksSection()}
    </div>
  `;
}

/**
 * ギャラリーセクションHTMLを構築
 * @returns {string} ギャラリーHTML
 */
function buildGallerySection() {
  return `
    <div class="project-modal-gallery" id="project-modal-gallery" style="display: none;">
      <div class="gallery-main">
        <div class="gallery-viewer" id="gallery-viewer"></div>
        <button class="gallery-nav gallery-prev" aria-label="前へ">
          <i class="${MODAL_ICONS.NAV_PREV}"></i>
        </button>
        <button class="gallery-nav gallery-next" aria-label="次へ">
          <i class="${MODAL_ICONS.NAV_NEXT}"></i>
        </button>
      </div>
      <div class="gallery-thumbnails" id="gallery-thumbnails"></div>
    </div>
  `;
}

/**
 * 概要セクションHTMLを構築
 * @returns {string} 概要HTML
 */
function buildOverviewSection() {
  return `
    <div class="project-modal-section">
      <h3><i class="${MODAL_ICONS.OVERVIEW}"></i> ${MODAL_LABELS.SECTIONS.OVERVIEW}</h3>
      <div class="project-info-grid" id="project-info-grid"></div>
    </div>
  `;
}

/**
 * 技術スタックセクションHTMLを構築
 * @returns {string} 技術スタックHTML
 */
function buildTechStackSection() {
  return `
    <div class="project-modal-section">
      <h3><i class="${MODAL_ICONS.TECH_STACK}"></i> ${MODAL_LABELS.SECTIONS.TECH_STACK}</h3>
      <div class="project-modal-tech-tags" id="project-modal-tech"></div>
    </div>
  `;
}

/**
 * 詳細セクションHTMLを構築
 * @returns {string} 詳細HTML
 */
function buildDetailsSection() {
  return `
    <div class="project-modal-section">
      <h3><i class="${MODAL_ICONS.DETAILS}"></i> ${MODAL_LABELS.SECTIONS.DETAILS}</h3>
      <p class="project-modal-description" id="project-modal-description"></p>
    </div>
  `;
}

/**
 * ハイライトセクションHTMLを構築
 * @returns {string} ハイライトHTML
 */
function buildHighlightsSection() {
  return `
    <div class="project-modal-section">
      <h3><i class="${MODAL_ICONS.HIGHLIGHTS}"></i> ${MODAL_LABELS.SECTIONS.HIGHLIGHTS}</h3>
      <ul class="project-modal-highlights" id="project-modal-highlights"></ul>
    </div>
  `;
}

/**
 * リンクセクションHTMLを構築
 * @returns {string} リンクHTML
 */
function buildLinksSection() {
  return `
    <div class="project-modal-section">
      <h3><i class="${MODAL_ICONS.LINKS}"></i> ${MODAL_LABELS.SECTIONS.LINKS}</h3>
      <div class="project-modal-links" id="project-modal-links"></div>
    </div>
  `;
}

// ========== データバインディング ==========

/**
 * プロジェクトモーダルを開く
 * @param {string} projectId - プロジェクトID
 */
function openProjectModal(projectId) {
  const project = PROJECT_DETAILS[projectId];
  const modal = document.getElementById('project-modal');
  
  if (!modal || !project) return;

  renderModalContent(project);
  showModal(modal);
}

/**
 * モーダルコンテンツをレンダリング
 * @param {Object} project - プロジェクトデータ
 */
function renderModalContent(project) {
  renderHeader(project);
  renderOverview(project);
  renderTechStack(project);
  renderDescription(project);
  renderHighlights(project);
  renderGallery(project);
  renderLinks(project);
}

/**
 * ヘッダーをレンダリング
 * @param {Object} project - プロジェクトデータ
 */
function renderHeader(project) {
  document.getElementById('project-modal-title').textContent = project.name;
  document.getElementById('project-modal-type').textContent = 
    MODAL_LABELS.PROJECT_TYPE[project.type] || project.type;
  
  const statusElement = document.getElementById('project-modal-status');
  statusElement.textContent = MODAL_LABELS.STATUS[project.status] || project.status;
  statusElement.className = `project-modal-status status-${project.status}`;
}

/**
 * 概要セクションをレンダリング
 * @param {Object} project - プロジェクトデータ
 */
function renderOverview(project) {
  const infoGrid = document.getElementById('project-info-grid');
  const infoItems = [];

  // 開発期間
  infoItems.push(createInfoItem(MODAL_LABELS.INFO.PERIOD, project.period));

  // 開発形態
  const devType = project.developmentType === 'team' 
    ? `${MODAL_LABELS.DEV_TYPE.TEAM}${project.teamSize ? ` (${project.teamSize}人)` : ''}` 
    : MODAL_LABELS.DEV_TYPE.PERSONAL;
  infoItems.push(createInfoItem(MODAL_LABELS.INFO.DEV_TYPE, devType));

  // 役割（nullでない場合のみ）
  if (project.role) {
    infoItems.push(createInfoItem(MODAL_LABELS.INFO.ROLE, project.role));
  }

  infoGrid.innerHTML = infoItems.join('');
}

/**
 * 情報アイテムHTMLを作成
 * @param {string} label - ラベル
 * @param {string} value - 値
 * @returns {string} 情報アイテムHTML
 */
function createInfoItem(label, value) {
  return `
    <div class="project-info-item">
      <span class="info-label">${label}</span>
      <span class="info-value">${value}</span>
    </div>
  `;
}

/**
 * 技術スタックをレンダリング
 * @param {Object} project - プロジェクトデータ
 */
function renderTechStack(project) {
  const techContainer = document.getElementById('project-modal-tech');
  techContainer.innerHTML = project.technologies
    .map(tech => `<span class="tech-tag">${tech}</span>`)
    .join('');
}

/**
 * 説明をレンダリング
 * @param {Object} project - プロジェクトデータ
 */
function renderDescription(project) {
  const description = project.modal?.detailedDescription || project.description;
  document.getElementById('project-modal-description').textContent = description;
}

/**
 * ハイライトをレンダリング
 * @param {Object} project - プロジェクトデータ
 */
function renderHighlights(project) {
  const highlightsContainer = document.getElementById('project-modal-highlights');
  highlightsContainer.innerHTML = project.highlights
    .map(highlight => `<li>${highlight}</li>`)
    .join('');
}

/**
 * ギャラリーをレンダリング
 * @param {Object} project - プロジェクトデータ
 */
function renderGallery(project) {
  const galleryElement = document.getElementById('project-modal-gallery');
  
  if (project.modal?.gallery && project.modal.gallery.length > 0) {
    setupGallery(project.modal.gallery);
    galleryElement.style.display = 'block';
  } else {
    galleryElement.style.display = 'none';
  }
}

/**
 * リンクをレンダリング
 * @param {Object} project - プロジェクトデータ
 */
function renderLinks(project) {
  const linksContainer = document.getElementById('project-modal-links');
  const links = [];

  if (project.links.github) {
    links.push(createLinkHTML(
      project.links.github,
      MODAL_ICONS.GITHUB,
      MODAL_LABELS.LINKS.GITHUB
    ));
  }

  if (project.links.demo) {
    links.push(createLinkHTML(
      project.links.demo,
      MODAL_ICONS.DEMO,
      MODAL_LABELS.LINKS.DEMO
    ));
  }

  if (project.links.article) {
    links.push(createLinkHTML(
      project.links.article,
      MODAL_ICONS.ARTICLE,
      MODAL_LABELS.LINKS.ARTICLE
    ));
  }

  linksContainer.innerHTML = links.join('');
}

/**
 * リンクHTMLを作成
 * @param {string} href - リンクURL
 * @param {string} icon - アイコンクラス
 * @param {string} label - ラベルテキスト
 * @returns {string} リンクHTML
 */
function createLinkHTML(href, icon, label) {
  return `
    <a href="${href}" class="project-modal-link" target="_blank" rel="noopener noreferrer">
      <i class="${icon}"></i>
      <span>${label}</span>
    </a>
  `;
}

// ========== ギャラリー機能 ==========

/**
 * ギャラリーをセットアップ
 * @param {Array} gallery - ギャラリーアイテムの配列
 */
function setupGallery(gallery) {
  const viewer = document.getElementById('gallery-viewer');
  const thumbnails = document.getElementById('gallery-thumbnails');
  let currentIndex = 0;

  function showGalleryItem(index) {
    const item = gallery[index];
    if (!item) return;

    viewer.innerHTML = item.type === 'image' 
      ? buildGalleryImage(item)
      : buildGalleryVideo(item);

    updateThumbnails(thumbnails, index);
    currentIndex = index;
  }

  function buildGalleryImage(item) {
    return `
      <img src="${item.src}" alt="${item.alt}" class="gallery-image">
      ${item.caption ? `<p class="gallery-caption">${item.caption}</p>` : ''}
    `;
  }

  function buildGalleryVideo(item) {
    return `
      <video controls class="gallery-video" ${item.poster ? `poster="${item.poster}"` : ''}>
        <source src="${item.src}" type="video/mp4">
        お使いのブラウザは動画タグをサポートしていません。
      </video>
      ${item.caption ? `<p class="gallery-caption">${item.caption}</p>` : ''}
    `;
  }

  function updateThumbnails(container, activeIndex) {
    const thumbnailElements = container.querySelectorAll('.gallery-thumbnail');
    thumbnailElements.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === activeIndex);
    });
  }

  renderGalleryThumbnails(thumbnails, gallery);
  setupGalleryNavigation(gallery, showGalleryItem, currentIndex);
  showGalleryItem(0);
}

/**
 * ギャラリーサムネイルをレンダリング
 * @param {HTMLElement} container - サムネイルコンテナ
 * @param {Array} gallery - ギャラリーアイテム
 */
function renderGalleryThumbnails(container, gallery) {
  container.innerHTML = gallery.map((item, index) => {
    return item.type === 'image'
      ? buildImageThumbnail(item, index)
      : buildVideoThumbnail(item, index);
  }).join('');

  container.querySelectorAll('.gallery-thumbnail').forEach(thumb => {
    thumb.addEventListener('click', function() {
      const index = parseInt(this.getAttribute('data-index'));
      const showGalleryItem = this.parentElement.showGalleryItem;
      if (showGalleryItem) showGalleryItem(index);
    });
  });
}

/**
 * 画像サムネイルを構築
 * @param {Object} item - ギャラリーアイテム
 * @param {number} index - インデックス
 * @returns {string} サムネイルHTML
 */
function buildImageThumbnail(item, index) {
  return `
    <div class="gallery-thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
      <img src="${item.src}" alt="${item.alt}">
    </div>
  `;
}

/**
 * 動画サムネイルを構築
 * @param {Object} item - ギャラリーアイテム
 * @param {number} index - インデックス
 * @returns {string} サムネイルHTML
 */
function buildVideoThumbnail(item, index) {
  const posterStyle = item.poster ? `style="background-image: url(${item.poster})"` : '';
  return `
    <div class="gallery-thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
      <div class="video-thumbnail" ${posterStyle}>
        <i class="${MODAL_ICONS.VIDEO_PLAY}"></i>
      </div>
    </div>
  `;
}

/**
 * ギャラリーナビゲーションをセットアップ
 * @param {Array} gallery - ギャラリーアイテム
 * @param {Function} showGalleryItem - アイテム表示関数
 * @param {number} currentIndex - 現在のインデックス
 */
function setupGalleryNavigation(gallery, showGalleryItem, currentIndex) {
  const prevBtn = document.querySelector('.gallery-prev');
  const nextBtn = document.querySelector('.gallery-next');

  if (!prevBtn || !nextBtn) return;

  if (gallery.length <= 1) {
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    return;
  }

  prevBtn.style.display = 'flex';
  nextBtn.style.display = 'flex';

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + gallery.length) % gallery.length;
    showGalleryItem(currentIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % gallery.length;
    showGalleryItem(currentIndex);
  });
}

// ========== モーダル制御 ==========

/**
 * モーダルを表示
 * @param {HTMLElement} modal - モーダル要素
 */
function showModal(modal) {
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/**
 * モーダルを閉じる
 */
function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  modal.classList.remove('active');
  document.body.style.overflow = '';

  stopAllVideos(modal);
}

/**
 * モーダル内のすべての動画を停止
 * @param {HTMLElement} modal - モーダル要素
 */
function stopAllVideos(modal) {
  const videos = modal.querySelectorAll('video');
  videos.forEach(video => {
    video.pause();
    video.currentTime = 0;
  });
}
