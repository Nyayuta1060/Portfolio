// ========== 経歴セクション機能 ==========
import { getTimeline, getStats } from './careerData.js';
import { logError } from './utils.js';

/**
 * 経歴セクションを初期化
 */
export async function initializeCareer() {
  const careerTimeline = document.querySelector('.career-timeline');
  
  if (!careerTimeline) {
    console.warn('Career timeline container not found');
    return;
  }

  try {
    const [timeline, stats] = await Promise.all([
      getTimeline(),
      getStats()
    ]);

    renderCareerTimeline(careerTimeline, timeline, stats);
    console.log('✅ Career section loaded successfully');
  } catch (error) {
    logError('Initialize Career', error);
    showCareerError(careerTimeline);
  }
}

/**
 * 経歴タイムラインをレンダリング
 * @param {HTMLElement} container - コンテナ要素
 * @param {Array} timeline - タイムラインデータ
 * @param {Object} stats - 統計データ
 */
function renderCareerTimeline(container, timeline, stats) {
  // タイムラインアイテムをレンダリング
  const timelineHTML = timeline.map(item => createCareerItem(item)).join('');
  
  // 統計情報をレンダリング
  const statsHTML = createStatsSection(stats);
  
  // コンテナに挿入
  container.innerHTML = timelineHTML + statsHTML;
}

/**
 * 経歴アイテムのHTMLを生成
 * @param {Object} item - 経歴アイテム
 * @returns {string} HTML文字列
 */
function createCareerItem(item) {
  // グループ化されたアイテムの場合
  if (item.isGroup && item.items) {
    return createGroupedCareerItem(item);
  }
  
  // 通常のアイテム
  const description = item.description 
    ? `<p class="career-description">${item.description}</p>` 
    : '';
  
  return `
    <div class="career-item" data-category="${item.category}">
      <div class="career-date">${item.date}</div>
      <div class="career-content">
        <h4 class="career-event">
          ${item.icon ? `<i class="${item.icon}"></i> ` : ''}
          ${item.title}
        </h4>
        ${description}
      </div>
    </div>
  `;
}

/**
 * グループ化された経歴アイテムのHTMLを生成
 * @param {Object} group - グループ化されたアイテム
 * @returns {string} HTML文字列
 */
function createGroupedCareerItem(group) {
  const groupItems = group.items.map(subItem => {
    const description = subItem.description 
      ? `<p class="career-description">${subItem.description}</p>` 
      : '';
    
    return `
      <div class="career-subitem">
        <h5 class="career-subevent">
          ${subItem.icon ? `<i class="${subItem.icon}"></i> ` : ''}
          ${subItem.title}
        </h5>
        ${description}
      </div>
    `;
  }).join('');
  
  return `
    <div class="career-item career-item-group" data-category="${group.category}">
      <div class="career-date">${group.date}</div>
      <div class="career-content">
        ${groupItems}
      </div>
    </div>
  `;
}

/**
 * 統計セクションのHTMLを生成
 * @param {Object} stats - 統計データ
 * @returns {string} HTML文字列
 */
function createStatsSection(stats) {
  return `
    <div class="stats">
      <div class="stat-item">
        <div class="stat-number">${stats.yearsOfLearning}+</div>
        <div class="stat-label">Years of Learning</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">${stats.projectsCompleted}+</div>
        <div class="stat-label">Projects Completed</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">${stats.technologies}+</div>
        <div class="stat-label">Technologies</div>
      </div>
    </div>
  `;
}

/**
 * エラー状態を表示
 * @param {HTMLElement} container - コンテナ要素
 */
function showCareerError(container) {
  container.innerHTML = `
    <div class="career-error" style="text-align: center; padding: 2rem; color: #999;">
      <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
      <p>経歴データの読み込みに失敗しました</p>
    </div>
  `;
}
