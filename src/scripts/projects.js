/**
 * プロジェクトセクションの表示を管理するモジュール
 */

import { logError } from './utils.js';
import { getProjectDetails } from './projectsData.js';

/**
 * プロジェクト画像のHTML要素を生成
 * @param {Object} imageData - 画像データ
 * @returns {HTMLElement} 画像要素
 */
function createProjectImage(imageData) {
  const imageDiv = document.createElement('div');
  imageDiv.className = 'project-image';

  if (imageData.type === 'file') {
    const img = document.createElement('img');
    img.src = imageData.src;
    img.alt = imageData.alt;
    img.loading = 'lazy';
    imageDiv.appendChild(img);
  } else if (imageData.type === 'icon') {
    const placeholder = document.createElement('div');
    placeholder.className = 'project-placeholder';
    const icon = document.createElement('i');
    icon.className = imageData.icon;
    placeholder.appendChild(icon);
    imageDiv.appendChild(placeholder);
  }

  return imageDiv;
}

/**
 * プロジェクト情報のHTML要素を生成
 * @param {Object} projectData - プロジェクトデータ
 * @returns {HTMLElement} プロジェクト情報要素
 */
function createProjectInfo(projectData) {
  const infoDiv = document.createElement('div');
  infoDiv.className = 'project-info';

  const title = document.createElement('h3');
  title.className = 'project-title';
  title.textContent = projectData.name;

  const description = document.createElement('p');
  description.className = 'project-description';
  description.textContent = projectData.description;

  const techTags = document.createElement('div');
  techTags.className = 'project-tech-tags';
  projectData.technologies.forEach(tech => {
    const tag = document.createElement('span');
    tag.className = 'tech-tag';
    tag.textContent = tech;
    techTags.appendChild(tag);
  });

  infoDiv.appendChild(title);
  infoDiv.appendChild(description);
  infoDiv.appendChild(techTags);

  return infoDiv;
}

/**
 * プロジェクトリンクのHTML要素を生成
 * @param {Object} links - リンク情報
 * @returns {HTMLElement} リンク要素
 */
function createProjectLinks(links) {
  const linksDiv = document.createElement('div');
  linksDiv.className = 'project-links';

  if (links.github) {
    const githubLink = document.createElement('a');
    githubLink.href = links.github;
    githubLink.className = 'project-link-btn';
    githubLink.target = '_blank';
    githubLink.rel = 'noopener noreferrer';
    githubLink.setAttribute('aria-label', 'GitHubリポジトリを開く');
    githubLink.innerHTML = '<i class="fab fa-github"></i>GitHub';
    linksDiv.appendChild(githubLink);
  }

  if (links.demo) {
    const demoLink = document.createElement('a');
    demoLink.href = links.demo;
    demoLink.className = 'project-link-btn';
    demoLink.target = '_blank';
    demoLink.rel = 'noopener noreferrer';
    demoLink.setAttribute('aria-label', 'デモを開く');
    demoLink.innerHTML = '<i class="fas fa-external-link-alt"></i>Demo';
    linksDiv.appendChild(demoLink);
  }

  return linksDiv;
}

/**
 * プロジェクトカードのHTML要素を生成
 * @param {string} projectId - プロジェクトID
 * @param {Object} projectData - プロジェクトデータ
 * @returns {HTMLElement} プロジェクトカードの要素
 */
function createProjectCard(projectId, projectData) {
  const card = document.createElement('div');
  card.className = 'project-card';
  if (projectData.featured) {
    card.classList.add('featured');
  }
  card.dataset.project = projectId;

  // Featured バッジ
  if (projectData.featured) {
    const badge = document.createElement('div');
    badge.className = 'project-badge';
    badge.textContent = 'Featured';
    card.appendChild(badge);
  }

  // プロジェクト画像
  card.appendChild(createProjectImage(projectData.image));

  // プロジェクト情報
  card.appendChild(createProjectInfo(projectData));

  // プロジェクトリンク
  card.appendChild(createProjectLinks(projectData.links));

  return card;
}

// 言語変更イベントリスナーが登録されているかのフラグ
let projectsListenerRegistered = false;

/**
 * プロジェクトセクションを初期化して表示
 */
export async function initializeProjects() {
  console.log('🎨 Initializing Projects Section...');
  const container = document.querySelector('.projects-grid');
  if (!container) {
    logError('Projects container not found');
    return;
  }

  try {
    await loadAndRenderProjects(container);
    console.log('✅ Projects section rendered successfully');
    
    // 言語変更イベントリスナーを一度だけ追加
    if (!projectsListenerRegistered) {
      window.addEventListener('languageChanged', async () => {
        try {
          await loadAndRenderProjects(container);
        } catch (error) {
          console.error('❌ Error reloading projects:', error);
        }
      });
      projectsListenerRegistered = true;
    }

  } catch (error) {
    container.innerHTML = '<p class="error-message">プロジェクトデータの読み込みに失敗しました</p>';
    logError('Failed to initialize projects section', { error });
    console.error('❌ Projects initialization error:', error);
  }
}

/**
 * プロジェクトデータを読み込んでレンダリング
 * @param {HTMLElement} container - プロジェクトコンテナ
 */
async function loadAndRenderProjects(container) {
  try {
    const projectsData = await getProjectDetails();
    
    if (!projectsData || Object.keys(projectsData).length === 0) {
      container.innerHTML = '<p class="error-message">プロジェクトデータが見つかりません</p>';
      return;
    }
    
    // ローディング表示をクリア
    container.innerHTML = '';

    // プロジェクトカードを作成して追加
    Object.entries(projectsData).forEach(([projectId, projectData]) => {
      const card = createProjectCard(projectId, projectData);
      
      // アニメーション用のクラスを削除してから追加（再トリガー）
      card.classList.remove('fade-in');
      // 即座にfade-inクラスを追加して表示
      requestAnimationFrame(() => {
        card.classList.add('fade-in');
      });
      
      container.appendChild(card);
    });
  } catch (error) {
    console.error('❌ Error in loadAndRenderProjects:', error);
    container.innerHTML = '<p class="error-message">プロジェクトの読み込みに失敗しました: ' + error.message + '</p>';
    throw error;
  }
}
