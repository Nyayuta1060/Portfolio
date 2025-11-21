// ========== データ初期化ファイル ==========
// アプリケーション起動時にJSONデータを読み込みます

import { initProjectData } from './projectsData.js';
import { initSkillData } from './skillsData.js';
import { initCareerData } from './careerData.js';
import { initializeSkills } from './skills.js';
import { initializeProjects } from './projects.js';

/**
 * すべてのデータを初期化
 * アプリケーション起動時に一度だけ呼び出されます
 */
export async function initializeData() {
  console.log('📂 Loading data from JSON files...');
  
  try {
    await Promise.all([
      initProjectData(),
      initSkillData(),
      initCareerData(),
      initializeSkills(),
      initializeProjects()
    ]);
    console.log('✅ Data loaded successfully');
    return true;
  } catch (error) {
    console.error('❌ Error loading data:', error);
    throw error;
  }
}
