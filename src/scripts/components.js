// ========== コンポーネント機能 ==========
import { getElements, addEventListeners } from './utils.js';
import { SKILL_DETAILS } from './constants.js';

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
