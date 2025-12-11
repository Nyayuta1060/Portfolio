// ========== スキルデータ管理ファイル ==========
// スキルデータはsrc/data/locales/{language}/skills.jsonで管理されています
// このファイルは定数とヘルパー関数を提供します

import { loadJSON } from './dataLoader.js';
import i18n from './i18n.js';

export const SKILL_LEVELS = {
  BEGINNER: '初級',
  INTERMEDIATE: '中級',
  ADVANCED: '上級',
  EXPERT: 'エキスパート'
};

export const FREQUENCY = {
  DAILY: '毎日',
  WEEKLY_5_7: '週5-7回',
  WEEKLY_3_5: '週3-5回',
  WEEKLY_2_4: '週2-4回',
  WEEKLY_1_2: '週1-2回',
  MONTHLY: '月2-4回',
  RARELY: '稀に使用'
};

export const CATEGORIES = {
  FRONTEND: 'frontend',
  BACKEND: 'backend',
  AI_ML: 'ai-ml',
  TOOLS: 'tools'
};

let skillDataCache = {};

/**
 * スキルデータを読み込む
 * @param {string} language - 言語コード
 * @returns {Promise<Object>} スキルデータ
 */
async function loadSkills(language) {
  return await loadJSON(`./src/data/locales/${language}/skills.json`);
}

export async function initSkillData(language = null) {
  const lang = language || i18n.getCurrentLanguage();
  if (!skillDataCache[lang]) {
    skillDataCache[lang] = await loadSkills(lang);
  }
  return skillDataCache[lang];
}

export async function getSkillDetails(language = null) {
  const lang = language || i18n.getCurrentLanguage();
  if (!skillDataCache[lang]) {
    await initSkillData(lang);
  }
  return skillDataCache[lang];
}

/**
 * キャッシュをクリア
 */
export function clearSkillCache() {
  skillDataCache = {};
}

export async function getSkillCategory(skillId) {
  const skills = await getSkillDetails();
  const skill = skills[skillId];
  return skill ? skill.category : null;
}

export async function groupSkillsByCategory() {
  const skills = await getSkillDetails();
  const grouped = {};
  
  Object.entries(skills).forEach(([id, skill]) => {
    const category = skill.category;
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push({ id, ...skill });
  });
  
  return grouped;
}

export async function hasSkill(skillId) {
  const skills = await getSkillDetails();
  return skillId in skills;
}

export async function getAllSkillIds() {
  const skills = await getSkillDetails();
  return Object.keys(skills);
}

export async function getSkillCount() {
  const skills = await getSkillDetails();
  return Object.keys(skills).length;
}

// 後方互換性のためのエクスポート
// 注意: これは非同期で初期化されるため、使用前にinitSkillData()を呼び出す必要があります
export { skillDataCache as SKILL_DETAILS };
