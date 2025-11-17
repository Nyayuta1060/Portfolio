// ========== 経歴データ管理ファイル ==========
// 経歴データはsrc/data/career.jsonで管理されています
// このファイルは定数とヘルパー関数を提供します

import { loadJSON } from './dataLoader.js';

/**
 * 経歴カテゴリの定義
 */
export const CAREER_CATEGORY = {
  EDUCATION: 'education',
  CLUB: 'club',
  COMPETITION: 'competition',
  ACHIEVEMENT: 'achievement',
  OTHER: 'other'
};

// 経歴データのキャッシュ
let careerDataCache = null;

/**
 * 経歴データを読み込む
 * @returns {Promise<Object>} 経歴データ
 */
async function loadCareer() {
  return await loadJSON('./src/data/career.json');
}

/**
 * 経歴データの初期化
 * JSONファイルからデータを読み込みます
 */
export async function initCareerData() {
  if (careerDataCache === null) {
    careerDataCache = await loadCareer();
  }
  return careerDataCache;
}

/**
 * 経歴データを取得
 * 初期化されていない場合は自動的に初期化します
 */
export async function getCareerData() {
  if (careerDataCache === null) {
    await initCareerData();
  }
  return careerDataCache;
}

/**
 * タイムラインデータを取得
 * @returns {Promise<Array>} タイムラインの配列
 */
export async function getTimeline() {
  const data = await getCareerData();
  return data.timeline || [];
}

/**
 * 統計データを取得
 * @returns {Promise<Object>} 統計情報
 */
export async function getStats() {
  const data = await getCareerData();
  return data.stats || {
    yearsOfLearning: 0,
    projectsCompleted: 0,
    technologies: 0
  };
}

/**
 * カテゴリ別に経歴をフィルタリング
 * @param {string} category - カテゴリ
 * @returns {Promise<Array>} フィルタリングされた経歴の配列
 */
export async function getCareerByCategory(category) {
  const timeline = await getTimeline();
  return timeline.filter(item => item.category === category);
}

/**
 * 特定の経歴アイテムを取得
 * @param {string} id - 経歴ID
 * @returns {Promise<Object|null>} 経歴アイテム
 */
export async function getCareerById(id) {
  const timeline = await getTimeline();
  return timeline.find(item => item.id === id) || null;
}

/**
 * 経歴の総数を取得
 * @returns {Promise<number>} 経歴の総数
 */
export async function getCareerCount() {
  const timeline = await getTimeline();
  return timeline.length;
}

/**
 * 最新の経歴を取得
 * @param {number} count - 取得する件数
 * @returns {Promise<Array>} 最新の経歴配列
 */
export async function getLatestCareer(count = 3) {
  const timeline = await getTimeline();
  return timeline.slice(-count).reverse();
}

// 後方互換性のためのエクスポート
export { careerDataCache as CAREER_DATA };
