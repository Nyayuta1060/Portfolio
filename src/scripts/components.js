// ========== コンポーネント機能 ==========
import { getElements, addEventListeners } from './utils.js';
import { SKILL_DETAILS, PROJECT_DETAILS } from './constants.js';

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

// ========== スキル詳細モーダル ==========

/**
 * スキル詳細モーダル機能を初期化
 */
export function initializeSkillModal() {
  const skillCards = getElements('.skill-card');
  
  if (skillCards.length === 0) return;

  // モーダルHTML要素を作成
  createModalElement();

  // スキルカードにクリックイベントを追加
  addEventListeners(skillCards, 'click', function(e) {
    e.preventDefault();
    const techId = this.getAttribute('data-tech');
    if (techId && SKILL_DETAILS[techId]) {
      openSkillModal(techId);
    }
  });

  // モーダル外クリックで閉じる
  setupModalCloseEvents();
}

/**
 * モーダルHTML要素を作成
 */
function createModalElement() {
  const modalHTML = `
    <div id="skill-modal" class="skill-modal">
      <div class="skill-modal-overlay"></div>
      <div class="skill-modal-content">
        <button class="skill-modal-close" aria-label="閉じる">
          <i class="fas fa-times"></i>
        </button>
        <div class="skill-modal-header">
          <div class="skill-modal-icon">
            <img src="" alt="" id="modal-skill-icon">
          </div>
          <div class="skill-modal-title-section">
            <h3 id="modal-skill-name"></h3>
            <div class="skill-modal-meta">
              <span class="skill-level" id="modal-skill-level"></span>
              <span class="skill-frequency" id="modal-skill-frequency">
                <i class="fas fa-calendar-alt"></i>
                <span id="modal-frequency-text"></span>
              </span>
            </div>
          </div>
        </div>
        <div class="skill-modal-body">
          <div class="skill-detail-section">
            <h4><i class="fas fa-briefcase"></i> 主な用途</h4>
            <p id="modal-skill-usage"></p>
          </div>
          <div class="skill-detail-section">
            <h4><i class="fas fa-clock"></i> 使用期間</h4>
            <p id="modal-skill-experience"></p>
          </div>
          <div class="skill-detail-section">
            <h4><i class="fas fa-comment"></i> コメント</h4>
            <p id="modal-skill-comment"></p>
          </div>
          <div class="skill-detail-section skill-links-section">
            <h4><i class="fas fa-link"></i> 関連リンク</h4>
            <div class="skill-modal-links" id="modal-skill-links"></div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

/**
 * モーダルを開く
 * @param {string} techId - 技術ID
 */
function openSkillModal(techId) {
  const skill = SKILL_DETAILS[techId];
  const modal = document.getElementById('skill-modal');
  
  if (!modal || !skill) return;

  // データを設定
  const modalIcon = document.querySelector('.skill-modal-icon');
  if (modalIcon) {
    modalIcon.setAttribute('data-tech', techId);
  }
  document.getElementById('modal-skill-icon').src = `./src/assets/skillstocks/${techId}.png`;
  document.getElementById('modal-skill-icon').alt = skill.name;
  document.getElementById('modal-skill-name').textContent = skill.name;
  document.getElementById('modal-skill-level').textContent = skill.level;
  document.getElementById('modal-skill-level').className = `skill-level level-${getLevelClass(skill.level)}`;
  document.getElementById('modal-frequency-text').textContent = skill.frequency;
  document.getElementById('modal-skill-usage').textContent = skill.usage;
  document.getElementById('modal-skill-experience').textContent = skill.experience;
  document.getElementById('modal-skill-comment').textContent = skill.comment;

  // リンクを設定
  const linksContainer = document.getElementById('modal-skill-links');
  linksContainer.innerHTML = '';
  
  if (skill.links.official) {
    linksContainer.innerHTML += `
      <a href="${skill.links.official}" class="skill-modal-link" target="_blank" rel="noopener noreferrer">
        <i class="fas fa-book"></i>
        <span>公式ドキュメント</span>
      </a>
    `;
  }
  
  if (skill.links.github) {
    linksContainer.innerHTML += `
      <a href="${skill.links.github}" class="skill-modal-link" target="_blank" rel="noopener noreferrer">
        <i class="fab fa-github"></i>
        <span>GitHub</span>
      </a>
    `;
  }

  // モーダルを表示
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/**
 * モーダルを閉じる
 */
function closeSkillModal() {
  const modal = document.getElementById('skill-modal');
  if (!modal) return;

  modal.classList.remove('active');
  document.body.style.overflow = '';
}

/**
 * モーダル閉じるイベントを設定
 */
function setupModalCloseEvents() {
  const modal = document.getElementById('skill-modal');
  if (!modal) return;

  // 閉じるボタン
  const closeBtn = modal.querySelector('.skill-modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeSkillModal);
  }

  // オーバーレイクリック
  const overlay = modal.querySelector('.skill-modal-overlay');
  if (overlay) {
    overlay.addEventListener('click', closeSkillModal);
  }

  // Escキー
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeSkillModal();
    }
  });
}

/**
 * レベルに応じたクラス名を取得
 * @param {string} level - スキルレベル
 * @returns {string} クラス名
 */
function getLevelClass(level) {
  const levelMap = {
    '初級': 'beginner',
    '中級': 'intermediate',
    '上級': 'advanced',
    'エキスパート': 'expert'
  };
  return levelMap[level] || 'intermediate';
}

// ========== プロジェクト詳細モーダル ==========

/**
 * プロジェクト詳細モーダル機能を初期化
 */
export function initializeProjectModal() {
  const projectCards = getElements('.project-card');
  
  if (projectCards.length === 0) return;

  // モーダルHTML要素を作成
  createProjectModalElement();

  // プロジェクトカードにクリックイベントを追加
  addEventListeners(projectCards, 'click', function(e) {
    // GitHubリンクボタンのクリックはモーダルを開かない
    if (e.target.closest('.project-link-btn') || e.target.closest('.project-links')) {
      return;
    }
    
    e.preventDefault();
    const projectId = this.getAttribute('data-project');
    if (projectId && PROJECT_DETAILS[projectId]) {
      openProjectModal(projectId);
    }
  });

  // モーダル外クリックで閉じる
  setupProjectModalCloseEvents();
}

/**
 * プロジェクトモーダルHTML要素を作成
 */
function createProjectModalElement() {
  const modalHTML = `
    <div id="project-modal" class="project-modal">
      <div class="project-modal-overlay"></div>
      <div class="project-modal-content">
        <button class="project-modal-close" aria-label="閉じる">
          <i class="fas fa-times"></i>
        </button>
        
        <div class="project-modal-header">
          <h2 id="project-modal-title"></h2>
          <div class="project-modal-meta">
            <span class="project-modal-type" id="project-modal-type"></span>
            <span class="project-modal-status" id="project-modal-status"></span>
          </div>
        </div>

        <div class="project-modal-body">
          <!-- ギャラリーセクション -->
          <div class="project-modal-gallery" id="project-modal-gallery" style="display: none;">
            <div class="gallery-main">
              <div class="gallery-viewer" id="gallery-viewer"></div>
              <button class="gallery-nav gallery-prev" aria-label="前へ">
                <i class="fas fa-chevron-left"></i>
              </button>
              <button class="gallery-nav gallery-next" aria-label="次へ">
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
            <div class="gallery-thumbnails" id="gallery-thumbnails"></div>
          </div>

          <!-- 基本情報 -->
          <div class="project-modal-section">
            <h3><i class="fas fa-info-circle"></i> プロジェクト概要</h3>
            <div class="project-info-grid">
              <div class="project-info-item">
                <span class="info-label">開発期間</span>
                <span class="info-value" id="project-modal-period"></span>
              </div>
              <div class="project-info-item">
                <span class="info-label">開発形態</span>
                <span class="info-value" id="project-modal-dev-type"></span>
              </div>
              <div class="project-info-item">
                <span class="info-label">役割</span>
                <span class="info-value" id="project-modal-role"></span>
              </div>
            </div>
          </div>

          <!-- 技術スタック -->
          <div class="project-modal-section">
            <h3><i class="fas fa-code"></i> 使用技術</h3>
            <div class="project-modal-tech-tags" id="project-modal-tech"></div>
          </div>

          <!-- 詳細説明 -->
          <div class="project-modal-section">
            <h3><i class="fas fa-align-left"></i> 詳細</h3>
            <p class="project-modal-description" id="project-modal-description"></p>
          </div>

          <!-- 主な機能・特徴 -->
          <div class="project-modal-section">
            <h3><i class="fas fa-star"></i> 主な機能・特徴</h3>
            <ul class="project-modal-highlights" id="project-modal-highlights"></ul>
          </div>

          <!-- 技術的な挑戦 -->
          <div class="project-modal-section" id="project-challenges-section" style="display: none;">
            <h3><i class="fas fa-lightbulb"></i> 技術的な挑戦</h3>
            <p class="project-modal-text" id="project-modal-challenges"></p>
          </div>

          <!-- 学んだこと -->
          <div class="project-modal-section" id="project-learned-section" style="display: none;">
            <h3><i class="fas fa-graduation-cap"></i> 学んだこと</h3>
            <p class="project-modal-text" id="project-modal-learned"></p>
          </div>

          <!-- リンク -->
          <div class="project-modal-section">
            <h3><i class="fas fa-link"></i> リンク</h3>
            <div class="project-modal-links" id="project-modal-links"></div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

/**
 * プロジェクトモーダルを開く
 * @param {string} projectId - プロジェクトID
 */
function openProjectModal(projectId) {
  const project = PROJECT_DETAILS[projectId];
  const modal = document.getElementById('project-modal');
  
  if (!modal || !project) return;

  // 基本情報を設定
  document.getElementById('project-modal-title').textContent = project.name;
  document.getElementById('project-modal-type').textContent = getProjectTypeLabel(project.type);
  document.getElementById('project-modal-status').textContent = getProjectStatusLabel(project.status);
  document.getElementById('project-modal-status').className = `project-modal-status status-${project.status}`;
  document.getElementById('project-modal-period').textContent = project.period;
  document.getElementById('project-modal-role').textContent = project.role;
  
  // 開発形態
  const devType = project.developmentType === 'team' 
    ? `チーム開発${project.teamSize ? ` (${project.teamSize}人)` : ''}` 
    : '個人開発';
  document.getElementById('project-modal-dev-type').textContent = devType;

  // 技術タグ
  const techContainer = document.getElementById('project-modal-tech');
  techContainer.innerHTML = project.technologies
    .map(tech => `<span class="tech-tag">${tech}</span>`)
    .join('');

  // 説明（カードの説明を使用）
  document.getElementById('project-modal-description').textContent = 
    project.modal?.detailedDescription || project.description;

  // ハイライト
  const highlightsContainer = document.getElementById('project-modal-highlights');
  highlightsContainer.innerHTML = project.highlights
    .map(highlight => `<li>${highlight}</li>`)
    .join('');

  // モーダル専用コンテンツ
  if (project.modal) {
    // 技術的な挑戦
    const challengesSection = document.getElementById('project-challenges-section');
    if (project.modal.challenges) {
      document.getElementById('project-modal-challenges').textContent = project.modal.challenges;
      challengesSection.style.display = 'block';
    } else {
      challengesSection.style.display = 'none';
    }

    // 学んだこと
    const learnedSection = document.getElementById('project-learned-section');
    if (project.modal.learned) {
      document.getElementById('project-modal-learned').textContent = project.modal.learned;
      learnedSection.style.display = 'block';
    } else {
      learnedSection.style.display = 'none';
    }

    // ギャラリー
    if (project.modal.gallery && project.modal.gallery.length > 0) {
      setupProjectGallery(project.modal.gallery);
      document.getElementById('project-modal-gallery').style.display = 'block';
    } else {
      document.getElementById('project-modal-gallery').style.display = 'none';
    }
  } else {
    document.getElementById('project-challenges-section').style.display = 'none';
    document.getElementById('project-learned-section').style.display = 'none';
    document.getElementById('project-modal-gallery').style.display = 'none';
  }

  // リンク
  const linksContainer = document.getElementById('project-modal-links');
  linksContainer.innerHTML = '';
  
  if (project.links.github) {
    linksContainer.innerHTML += `
      <a href="${project.links.github}" class="project-modal-link" target="_blank" rel="noopener noreferrer">
        <i class="fab fa-github"></i>
        <span>GitHub</span>
      </a>
    `;
  }
  
  if (project.links.demo) {
    linksContainer.innerHTML += `
      <a href="${project.links.demo}" class="project-modal-link" target="_blank" rel="noopener noreferrer">
        <i class="fas fa-external-link-alt"></i>
        <span>デモサイト</span>
      </a>
    `;
  }

  if (project.links.article) {
    linksContainer.innerHTML += `
      <a href="${project.links.article}" class="project-modal-link" target="_blank" rel="noopener noreferrer">
        <i class="fas fa-newspaper"></i>
        <span>記事</span>
      </a>
    `;
  }

  // モーダルを表示
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/**
 * ギャラリーをセットアップ
 * @param {Array} gallery - ギャラリーアイテムの配列
 */
function setupProjectGallery(gallery) {
  const viewer = document.getElementById('gallery-viewer');
  const thumbnails = document.getElementById('gallery-thumbnails');
  let currentIndex = 0;

  // ビューアーに最初のアイテムを表示
  function showGalleryItem(index) {
    const item = gallery[index];
    if (!item) return;

    if (item.type === 'image') {
      viewer.innerHTML = `
        <img src="${item.src}" alt="${item.alt}" class="gallery-image">
        ${item.caption ? `<p class="gallery-caption">${item.caption}</p>` : ''}
      `;
    } else if (item.type === 'video') {
      viewer.innerHTML = `
        <video controls class="gallery-video" ${item.poster ? `poster="${item.poster}"` : ''}>
          <source src="${item.src}" type="video/mp4">
          お使いのブラウザは動画タグをサポートしていません。
        </video>
        ${item.caption ? `<p class="gallery-caption">${item.caption}</p>` : ''}
      `;
    }

    // サムネイルのアクティブ状態を更新
    const thumbnailElements = thumbnails.querySelectorAll('.gallery-thumbnail');
    thumbnailElements.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === index);
    });

    currentIndex = index;
  }

  // サムネイルを生成
  thumbnails.innerHTML = gallery.map((item, index) => {
    if (item.type === 'image') {
      return `
        <div class="gallery-thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
          <img src="${item.src}" alt="${item.alt}">
        </div>
      `;
    } else if (item.type === 'video') {
      return `
        <div class="gallery-thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
          <div class="video-thumbnail" ${item.poster ? `style="background-image: url(${item.poster})"` : ''}>
            <i class="fas fa-play-circle"></i>
          </div>
        </div>
      `;
    }
  }).join('');

  // サムネイルクリックイベント
  thumbnails.querySelectorAll('.gallery-thumbnail').forEach(thumb => {
    thumb.addEventListener('click', function() {
      const index = parseInt(this.getAttribute('data-index'));
      showGalleryItem(index);
    });
  });

  // ナビゲーションボタン
  const prevBtn = document.querySelector('.gallery-prev');
  const nextBtn = document.querySelector('.gallery-next');

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + gallery.length) % gallery.length;
      showGalleryItem(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % gallery.length;
      showGalleryItem(currentIndex);
    });
  }

  // ギャラリーが1つの場合はナビゲーションを非表示
  if (gallery.length <= 1) {
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
  } else {
    if (prevBtn) prevBtn.style.display = 'flex';
    if (nextBtn) nextBtn.style.display = 'flex';
  }

  // 最初のアイテムを表示
  showGalleryItem(0);
}

/**
 * プロジェクトモーダルを閉じる
 */
function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  modal.classList.remove('active');
  document.body.style.overflow = '';

  // ビデオを停止
  const videos = modal.querySelectorAll('video');
  videos.forEach(video => {
    video.pause();
    video.currentTime = 0;
  });
}

/**
 * プロジェクトモーダル閉じるイベントを設定
 */
function setupProjectModalCloseEvents() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  // 閉じるボタン
  const closeBtn = modal.querySelector('.project-modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeProjectModal);
  }

  // オーバーレイクリック
  const overlay = modal.querySelector('.project-modal-overlay');
  if (overlay) {
    overlay.addEventListener('click', closeProjectModal);
  }

  // Escキー
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeProjectModal();
    }
  });
}

/**
 * プロジェクトタイプのラベルを取得
 * @param {string} type - プロジェクトタイプ
 * @returns {string} ラベル
 */
function getProjectTypeLabel(type) {
  const typeLabels = {
    'web-app': 'Webアプリ',
    'cli-tool': 'CLIツール',
    'library': 'ライブラリ',
    'automation': '自動化',
    'game': 'ゲーム',
    'robot': 'ロボット',
    'ai-ml': 'AI/ML',
    'other': 'その他'
  };
  return typeLabels[type] || type;
}

/**
 * プロジェクトステータスのラベルを取得
 * @param {string} status - プロジェクトステータス
 * @returns {string} ラベル
 */
function getProjectStatusLabel(status) {
  const statusLabels = {
    'completed': '完成',
    'in-progress': '進行中',
    'archived': 'アーカイブ',
    'planning': '計画中'
  };
  return statusLabels[status] || status;
}
