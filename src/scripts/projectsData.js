// ========== プロジェクトデータ管理ファイル ==========
// プロジェクトデータはsrc/data/locales/{language}/projects.jsonで管理されています
// このファイルは定数とヘルパー関数を提供します

import { createLocalizedLoader } from './dataLoader.js';
import i18n from './i18n.js';

export const PROJECT_STATUS = {
  COMPLETED: 'completed',
  IN_PROGRESS: 'in-progress',
  ARCHIVED: 'archived',
  PLANNING: 'planning'
};

export const PROJECT_TYPE = {
  WEB_APP: 'web-app',
  DESKTOP_APP: 'desktop-app',
  MOBILE_APP: 'mobile-app',
  CLI_TOOL: 'cli-tool',
  LIBRARY: 'library',
  AUTOMATION: 'automation',
  GAME: 'game',
  ROBOT: 'robot',
  AI_ML: 'ai-ml',
  OTHER: 'other'
};

const loader = createLocalizedLoader('projects');

export function initProjectData(language = null) {
  return loader.load(language || i18n.getCurrentLanguage());
}

export const getProjectDetails = initProjectData;

export function clearProjectCache() {
  loader.clear();
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
