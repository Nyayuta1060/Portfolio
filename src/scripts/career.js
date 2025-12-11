// ========== 経歴セクション機能 ==========
import { getTimeline, getStats } from './careerData.js';
import { logError } from './utils.js';
import i18n from './i18n.js';

// 言語変更イベントリスナーが登録されているかのフラグ
let careerListenerRegistered = false;

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
    await loadAndRenderCareer(careerTimeline);
    console.log('✅ Career section loaded successfully');
    
    // 言語変更イベントリスナーを一度だけ追加
    if (!careerListenerRegistered) {
      window.addEventListener('languageChanged', async () => {
        await loadAndRenderCareer(careerTimeline);
      });
      careerListenerRegistered = true;
    }
  } catch (error) {
    logError('Initialize Career', error);
    showCareerError(careerTimeline);
  }
}

/**
 * 経歴データを読み込んでレンダリング
 * @param {HTMLElement} careerTimeline - タイムラインコンテナ
 */
async function loadAndRenderCareer(careerTimeline) {
  const [timeline, stats] = await Promise.all([
    getTimeline(),
    getStats()
  ]);
  renderCareerTimeline(careerTimeline, timeline, stats);
}

// 資格セクションの言語変更イベントリスナーが登録されているかのフラグ
let certificationsListenerRegistered = false;

/**
 * 資格セクションを初期化
 */
export async function initializeCertifications() {
  const certificationsContainer = document.querySelector('.certifications-grid');
  
  if (!certificationsContainer) {
    console.warn('Certifications container not found');
    return;
  }

  try {
    await loadAndRenderCertifications(certificationsContainer);
    console.log('✅ Certifications section loaded successfully');
    
    // 言語変更イベントリスナーを一度だけ追加
    if (!certificationsListenerRegistered) {
      window.addEventListener('languageChanged', async () => {
        await loadAndRenderCertifications(certificationsContainer);
      });
      certificationsListenerRegistered = true;
    }
  } catch (error) {
    logError('Initialize Certifications', error);
    showCertificationsError(certificationsContainer);
  }
}

/**
 * 資格データを読み込んでレンダリング
 * @param {HTMLElement} certificationsContainer - 資格コンテナ
 */
async function loadAndRenderCertifications(certificationsContainer) {
  const { getCertifications } = await import('./careerData.js');
  const certifications = await getCertifications();
  renderCertifications(certificationsContainer, certifications);
  i18n.updateUI();
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
  
  // i18n適用
  i18n.updateUI();
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
        <div class="stat-label" data-i18n="about.stats.yearsOfLearning">Years of Learning</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">${stats.projectsCompleted}+</div>
        <div class="stat-label" data-i18n="about.stats.projectsCompleted">Projects Completed</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">${stats.technologies}+</div>
        <div class="stat-label" data-i18n="about.stats.technologies">Technologies</div>
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

/**
 * 資格をレンダリング
 * @param {HTMLElement} container - コンテナ要素
 * @param {Array} certifications - 資格データ
 */
function renderCertifications(container, certifications) {
  if (!certifications || certifications.length === 0) {
    container.innerHTML = `
      <div class="no-certifications">
        <p>現在、表示できる資格情報はありません。</p>
      </div>
    `;
    return;
  }

  const certificationsHTML = certifications.map(cert => createCertificationCard(cert)).join('');
  container.innerHTML = certificationsHTML;
}

/**
 * 資格カードのHTMLを生成
 * @param {Object} cert - 資格データ
 * @returns {string} HTML文字列
 */
function createCertificationCard(cert) {
  return `
    <div class="certification-card" data-category="${cert.category}">
      <div class="certification-icon">
        <i class="${cert.icon}"></i>
      </div>
      <div class="certification-info">
        <h4 class="certification-name">${cert.name}</h4>
        <p class="certification-name-en">${cert.nameEn}</p>
        <p class="certification-issuer">${cert.issuer}</p>
        <p class="certification-date">
          <i class="fas fa-calendar"></i>
          ${cert.date} 取得
        </p>
        ${cert.description ? `<p class="certification-description">${cert.description}</p>` : ''}
      </div>
    </div>
  `;
}

/**
 * 資格エラー状態を表示
 * @param {HTMLElement} container - コンテナ要素
 */
function showCertificationsError(container) {
  container.innerHTML = `
    <div class="certifications-error" style="text-align: center; padding: 2rem; color: #999;">
      <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
      <p>資格データの読み込みに失敗しました</p>
    </div>
  `;
}
