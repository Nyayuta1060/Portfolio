// ========== データローダー ==========
// JSONファイルからデータを読み込むユーティリティ

import { DATA_CONFIG } from './config.js';

/**
 * JSONファイルを読み込む共通関数
 * @param {string} path - JSONファイルのパス
 * @returns {Promise<Object>} パースされたJSONオブジェクト
 */
export async function loadJSON(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load ${path}: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error loading JSON from ${path}:`, error);
    throw error;
  }
}

/**
 * プロジェクトデータを読み込む
 * @returns {Promise<Object>} プロジェクトデータ
 */
export async function loadProjects() {
  return await loadJSON(DATA_CONFIG.paths.projects);
}

/**
 * スキルデータを読み込む
 * @returns {Promise<Object>} スキルデータ
 */
export async function loadSkills() {
  return await loadJSON(DATA_CONFIG.paths.skills);
}

/**
 * すべてのデータを一度に読み込む
 * @returns {Promise<Object>} { projects, skills }
 */
export async function loadAllData() {
  const [projects, skills] = await Promise.all([
    loadProjects(),
    loadSkills()
  ]);
  
  return { projects, skills };
}
