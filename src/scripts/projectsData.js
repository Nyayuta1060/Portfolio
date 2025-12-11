// ========== プロジェクトデータ管理ファイル ==========
// プロジェクトデータはsrc/data/locales/{language}/projects.jsonで管理されています
// このファイルは定数とヘルパー関数を提供します

import { loadJSON } from './dataLoader.js';
import i18n from './i18n.js';

export const PROJECT_STATUS = {
  COMPLETED: 'completed',
  IN_PROGRESS: 'in-progress',
  ARCHIVED: 'archived',
  PLANNING: 'planning'
};

export const PROJECT_TYPE = {
  WEB_APP: 'web-app',
  CLI_TOOL: 'cli-tool',
  LIBRARY: 'library',
  AUTOMATION: 'automation',
  GAME: 'game',
  ROBOT: 'robot',
  AI_ML: 'ai-ml',
  OTHER: 'other'
};

let projectDataCache = {};

/**
 * プロジェクトデータを読み込む
 * @param {string} language - 言語コード
 * @returns {Promise<Object>} プロジェクトデータ
 */
async function loadProjects(language) {
  return await loadJSON(`./src/data/locales/${language}/projects.json`);
}

export async function initProjectData(language = null) {
  const lang = language || i18n.getCurrentLanguage();
  if (!projectDataCache[lang]) {
    projectDataCache[lang] = await loadProjects(lang);
  }
  return projectDataCache[lang];
}

export async function getProjectDetails(language = null) {
  const lang = language || i18n.getCurrentLanguage();
  if (!projectDataCache[lang]) {
    await initProjectData(lang);
  }
  return projectDataCache[lang];
}

/**
 * キャッシュをクリア
 */
export function clearProjectCache() {
  projectDataCache = {};
}

export async function getProjectById(projectId) {
  const details = await getProjectDetails();
  return details[projectId] || null;
}

export async function getFeaturedProjects() {
  const details = await getProjectDetails();
  return Object.entries(details)
    .filter(([_, project]) => project.featured)
    .map(([id, project]) => ({ id, ...project }));
}

export async function getProjectsByStatus(status) {
  const details = await getProjectDetails();
  return Object.entries(details)
    .filter(([_, project]) => project.status === status)
    .map(([id, project]) => ({ id, ...project }));
}

export async function getProjectsByType(type) {
  const details = await getProjectDetails();
  return Object.entries(details)
    .filter(([_, project]) => project.type === type)
    .map(([id, project]) => ({ id, ...project }));
}

export async function getProjectsByTechnology(technology) {
  const details = await getProjectDetails();
  return Object.entries(details)
    .filter(([_, project]) => 
      project.technologies.some(tech => 
        tech.toLowerCase() === technology.toLowerCase()
      )
    )
    .map(([id, project]) => ({ id, ...project }));
}

export async function hasProject(projectId) {
  const details = await getProjectDetails();
  return projectId in details;
}

export async function getAllProjectIds() {
  const details = await getProjectDetails();
  return Object.keys(details);
}

export async function getProjectCount() {
  const details = await getProjectDetails();
  return Object.keys(details).length;
}

export async function getAllProjects() {
  const details = await getProjectDetails();
  return Object.entries(details).map(([id, project]) => ({
    id,
    ...project
  }));
}

export async function getSortedProjects(sortBy = 'period', order = 'desc') {
  const projects = await getAllProjects();
  
  return projects.sort((a, b) => {
    if (order === 'asc') {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    }
    return a[sortBy] < b[sortBy] ? 1 : -1;
  });
}

// 後方互換性のためのエクスポート
// 注意: これは非同期で初期化されるため、使用前にinitProjectData()を呼び出す必要があります
export { projectDataCache as PROJECT_DETAILS };
