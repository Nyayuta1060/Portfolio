/**
 * プロジェクトセクションの表示を管理するモジュール
 */

import { logError } from './utils.js';
import { getProjectDetails } from './projectsData.js';
import i18n from './i18n.js';

const PROJECT_TYPE_ORDER = [
  'web-app',
  'desktop-app',
  'mobile-app',
  'cli-tool',
  'library',
  'automation',
  'game',
  'robot',
  'ai-ml',
  'other'
];

const PROJECT_STATUS_ORDER = [
  'completed',
  'in-progress',
  'planning',
  'archived'
];

const projectFilterState = {
  search: '',
  type: 'all',
  status: 'all',
  featuredOnly: false
};

let projectsListenerRegistered = false;
let projectControlsRegistered = false;
let latestProjectsData = {};

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

function getProjectTypeLabel(type) {
  return i18n.t(`projects.modal.projectTypes.${type}`);
}

function getProjectStatusLabel(status) {
  return i18n.t(`projects.modal.status.${status}`);
}

function createProjectMeta(projectData) {
  const meta = document.createElement('div');
  meta.className = 'project-card-meta';

  const type = document.createElement('span');
  type.className = 'project-meta-pill';
  type.textContent = getProjectTypeLabel(projectData.type);

  const status = document.createElement('span');
  status.className = `project-meta-pill status-${projectData.status}`;
  status.textContent = getProjectStatusLabel(projectData.status);

  meta.appendChild(type);
  meta.appendChild(status);
  return meta;
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

  infoDiv.appendChild(createProjectMeta(projectData));
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
    githubLink.setAttribute('aria-label', i18n.t('common.openGithubRepo'));
    githubLink.innerHTML = `<i class="fab fa-github"></i><span>${i18n.t('projects.links.github')}</span>`;
    linksDiv.appendChild(githubLink);
  }

  if (links.demo) {
    const demoLink = document.createElement('a');
    demoLink.href = links.demo;
    demoLink.className = 'project-link-btn';
    demoLink.target = '_blank';
    demoLink.rel = 'noopener noreferrer';
    demoLink.setAttribute('aria-label', i18n.t('projects.links.demo'));
    demoLink.innerHTML = `<i class="fas fa-external-link-alt"></i><span>${i18n.t('projects.links.demo')}</span>`;
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
  card.dataset.type = projectData.type;
  card.dataset.status = projectData.status;

  if (projectData.featured) {
    const badge = document.createElement('div');
    badge.className = 'project-badge';
    badge.textContent = i18n.t('projects.controls.featured');
    card.appendChild(badge);
  }

  card.appendChild(createProjectImage(projectData.image));
  card.appendChild(createProjectInfo(projectData));
  card.appendChild(createProjectLinks(projectData.links));

  return card;
}

/**
 * プロジェクトセクションを初期化して表示
 */
export async function initializeProjects() {
  console.log('Initializing Projects Section...');
  const container = document.querySelector('.projects-grid');
  if (!container) {
    logError('Projects container not found');
    return;
  }

  try {
    setupProjectControls(container);
    await loadAndRenderProjects(container);
    console.log('Projects section rendered successfully');

    if (!projectsListenerRegistered) {
      window.addEventListener('languageChanged', async () => {
        try {
          await loadAndRenderProjects(container);
        } catch (error) {
          console.error('Error reloading projects:', error);
        }
      });
      projectsListenerRegistered = true;
    }
  } catch (error) {
    container.innerHTML = '<p class="error-message">プロジェクトデータの読み込みに失敗しました</p>';
    logError('Failed to initialize projects section', { error });
    console.error('Projects initialization error:', error);
  }
}

function setupProjectControls(container) {
  if (projectControlsRegistered) return;

  const searchInput = document.getElementById('project-search-input');
  const typeFilter = document.getElementById('project-type-filter');
  const statusFilter = document.getElementById('project-status-filter');
  const featuredToggle = document.querySelector('[data-project-featured-toggle]');

  if (!searchInput || !typeFilter || !statusFilter || !featuredToggle) return;

  searchInput.addEventListener('input', () => {
    projectFilterState.search = searchInput.value.trim().toLowerCase();
    renderProjectCards(container, latestProjectsData);
  });

  typeFilter.addEventListener('change', () => {
    projectFilterState.type = typeFilter.value;
    renderProjectCards(container, latestProjectsData);
  });

  statusFilter.addEventListener('change', () => {
    projectFilterState.status = statusFilter.value;
    renderProjectCards(container, latestProjectsData);
  });

  featuredToggle.addEventListener('click', () => {
    projectFilterState.featuredOnly = !projectFilterState.featuredOnly;
    featuredToggle.classList.toggle('active', projectFilterState.featuredOnly);
    featuredToggle.setAttribute('aria-pressed', String(projectFilterState.featuredOnly));
    renderProjectCards(container, latestProjectsData);
  });

  featuredToggle.setAttribute('aria-pressed', 'false');
  projectControlsRegistered = true;
}

function updateProjectFilterOptions(projectsData) {
  const typeFilter = document.getElementById('project-type-filter');
  const statusFilter = document.getElementById('project-status-filter');
  if (!typeFilter || !statusFilter) return;

  const availableTypes = new Set(Object.values(projectsData).map(project => project.type));
  const availableStatuses = new Set(Object.values(projectsData).map(project => project.status));

  fillSelectOptions(
    typeFilter,
    PROJECT_TYPE_ORDER.filter(type => availableTypes.has(type)),
    'projects.controls.allTypes',
    getProjectTypeLabel,
    projectFilterState.type
  );

  fillSelectOptions(
    statusFilter,
    PROJECT_STATUS_ORDER.filter(status => availableStatuses.has(status)),
    'projects.controls.allStatuses',
    getProjectStatusLabel,
    projectFilterState.status
  );
}

function fillSelectOptions(select, values, allLabelKey, labelGetter, selectedValue) {
  select.innerHTML = '';

  const allOption = document.createElement('option');
  allOption.value = 'all';
  allOption.textContent = i18n.t(allLabelKey);
  select.appendChild(allOption);

  values.forEach(value => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = labelGetter(value);
    select.appendChild(option);
  });

  select.value = values.includes(selectedValue) ? selectedValue : 'all';
  if (select.value === 'all') {
    if (select.id === 'project-type-filter') projectFilterState.type = 'all';
    if (select.id === 'project-status-filter') projectFilterState.status = 'all';
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

    latestProjectsData = projectsData;
    updateProjectFilterOptions(projectsData);
    renderProjectCards(container, projectsData);
  } catch (error) {
    console.error('Error in loadAndRenderProjects:', error);
    container.innerHTML = '<p class="error-message">プロジェクトの読み込みに失敗しました: '
      + error.message + '</p>';
    throw error;
  }
}

function renderProjectCards(container, projectsData) {
  const filteredProjects = filterProjects(projectsData);
  const summary = document.querySelector('.project-results-summary');

  container.innerHTML = '';

  if (summary) {
    const key = filteredProjects.length === 0
      ? 'projects.controls.noResults'
      : 'projects.controls.resultSummary';
    summary.textContent = i18n.t(key, { count: filteredProjects.length });
  }

  if (filteredProjects.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'error-message project-empty-message';
    empty.textContent = i18n.t('projects.controls.noResults');
    container.appendChild(empty);
    return;
  }

  filteredProjects.forEach(([projectId, projectData]) => {
    const card = createProjectCard(projectId, projectData);
    card.classList.remove('fade-in');
    requestAnimationFrame(() => {
      card.classList.add('fade-in');
    });
    container.appendChild(card);
  });
}

function filterProjects(projectsData) {
  const entries = Object.entries(projectsData);

  return entries.filter(([projectId, project]) => {
    const searchableText = [
      projectId,
      project.name,
      project.description,
      project.type,
      project.status,
      project.period,
      ...(project.technologies || []),
      ...(project.highlights || [])
    ].filter(Boolean).join(' ').toLowerCase();

    const matchesSearch = !projectFilterState.search
      || searchableText.includes(projectFilterState.search);
    const matchesType = projectFilterState.type === 'all'
      || project.type === projectFilterState.type;
    const matchesStatus = projectFilterState.status === 'all'
      || project.status === projectFilterState.status;
    const matchesFeatured = !projectFilterState.featuredOnly || project.featured;

    return matchesSearch && matchesType && matchesStatus && matchesFeatured;
  });
}
