/**
 * スキルセクションの表示を管理するモジュール
 */

import { logError } from './utils.js';
import { DATA_SOURCES } from './constants.js';

/**
 * カテゴリ情報の定義
 */
const CATEGORY_INFO = {
  frontend: {
    title: 'Frontend Development',
    icon: 'fas fa-laptop-code'
  },
  backend: {
    title: 'Backend Development',
    icon: 'fas fa-server'
  },
  'ai-ml': {
    title: 'AI & Machine Learning',
    icon: 'fas fa-brain'
  },
  tools: {
    title: 'Development Tools',
    icon: 'fas fa-tools'
  }
};

/**
 * スキルデータを読み込む
 * @returns {Promise<Object>} スキルデータ
 */
async function loadSkillsData() {
  try {
    const response = await fetch(DATA_SOURCES.SKILLS);
    if (!response.ok) {
      throw new Error(`Failed to fetch skills data: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    logError('Error loading skills data', { error });
    throw error;
  }
}

/**
 * スキルカードのHTML要素を生成
 * @param {string} techId - 技術ID
 * @param {Object} skillData - スキルデータ
 * @returns {HTMLElement} スキルカードの要素
 */
function createSkillCard(techId, skillData) {
  const card = document.createElement('div');
  card.className = 'skill-card';
  card.dataset.tech = techId;
  card.dataset.category = skillData.category;

  const imageDiv = document.createElement('div');
  imageDiv.className = 'skill-image';
  
  const img = document.createElement('img');
  img.src = `./src/assets/skillstocks/${techId}.png`;
  img.alt = skillData.name;
  img.loading = 'lazy';
  
  imageDiv.appendChild(img);

  const nameDiv = document.createElement('div');
  nameDiv.className = 'skill-name';
  nameDiv.textContent = skillData.name;

  card.appendChild(imageDiv);
  card.appendChild(nameDiv);

  return card;
}

/**
 * カテゴリセクションのHTML要素を生成
 * @param {string} category - カテゴリID
 * @param {Array<HTMLElement>} skillCards - スキルカードの配列
 * @returns {HTMLElement} カテゴリセクションの要素
 */
function createCategorySection(category, skillCards) {
  const section = document.createElement('div');
  section.className = 'skill-category-section';
  section.dataset.category = category;

  const categoryInfo = CATEGORY_INFO[category];
  
  const title = document.createElement('h3');
  title.className = 'category-title';
  title.innerHTML = `<i class="${categoryInfo.icon}"></i>${categoryInfo.title}`;

  const grid = document.createElement('div');
  grid.className = 'skills-grid';
  skillCards.forEach(card => grid.appendChild(card));

  section.appendChild(title);
  section.appendChild(grid);

  return section;
}

/**
 * スキルセクションを初期化して表示
 */
export async function initializeSkills() {
  const container = document.querySelector('.skills-grid-container');
  if (!container) {
    logError('Skills container not found');
    return;
  }

  try {
    const skillsData = await loadSkillsData();
    
    // カテゴリごとにスキルを分類
    const skillsByCategory = {};
    
    Object.entries(skillsData).forEach(([techId, skillData]) => {
      const category = skillData.category;
      if (!skillsByCategory[category]) {
        skillsByCategory[category] = [];
      }
      skillsByCategory[category].push(createSkillCard(techId, skillData));
    });

    // ローディング表示をクリア
    container.innerHTML = '';

    // カテゴリセクションを作成して追加
    Object.entries(skillsByCategory).forEach(([category, skillCards]) => {
      const section = createCategorySection(category, skillCards);
      container.appendChild(section);
    });

  } catch (error) {
    container.innerHTML = '<p class="error-message">スキルデータの読み込みに失敗しました</p>';
    logError('Failed to initialize skills section', { error });
  }
}
