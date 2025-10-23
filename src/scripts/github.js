// ========== GitHub API連携モジュール ==========
import { logError } from './utils.js';

/**
 * GitHub API設定
 */
const GITHUB_CONFIG = {
  USERNAME: 'Nyayuta1060',
  API_BASE: 'https://api.github.com',
  CACHE_DURATION: 10 * 60 * 1000, // 10分間キャッシュ
  MAX_REPOS: 6 // 表示する最大リポジトリ数
};

/**
 * キャッシュストレージ
 */
const cache = {
  userData: null,
  reposData: null,
  timestamp: null
};

/**
 * キャッシュが有効かチェック
 * @returns {boolean} キャッシュが有効な場合true
 */
function isCacheValid() {
  if (!cache.timestamp) return false;
  const now = Date.now();
  return (now - cache.timestamp) < GITHUB_CONFIG.CACHE_DURATION;
}

/**
 * GitHub APIからデータを取得
 * @param {string} endpoint - APIエンドポイント
 * @returns {Promise<any>} APIレスポンス
 */
async function fetchGitHubAPI(endpoint) {
  try {
    const response = await fetch(`${GITHUB_CONFIG.API_BASE}${endpoint}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    logError('GitHub API Fetch', error);
    throw error;
  }
}

/**
 * ユーザー情報を取得
 * @returns {Promise<Object>} ユーザー情報
 */
export async function fetchUserData() {
  try {
    // キャッシュチェック
    if (isCacheValid() && cache.userData) {
      return cache.userData;
    }

    const data = await fetchGitHubAPI(`/users/${GITHUB_CONFIG.USERNAME}`);
    
    cache.userData = {
      name: data.name || GITHUB_CONFIG.USERNAME,
      bio: data.bio || '',
      publicRepos: data.public_repos || 0,
      followers: data.followers || 0,
      following: data.following || 0,
      avatarUrl: data.avatar_url || '',
      profileUrl: data.html_url || '',
      createdAt: data.created_at || '',
      updatedAt: data.updated_at || ''
    };

    cache.timestamp = Date.now();
    return cache.userData;
  } catch (error) {
    logError('Fetch User Data', error);
    return null;
  }
}

/**
 * リポジトリ情報を取得（統計計算用）
 * @returns {Promise<Array>} リポジトリ情報の配列
 */
export async function fetchRepositories() {
  try {
    // キャッシュチェック
    if (isCacheValid() && cache.reposData) {
      return cache.reposData;
    }

    const data = await fetchGitHubAPI(
      `/users/${GITHUB_CONFIG.USERNAME}/repos?sort=updated&per_page=${GITHUB_CONFIG.MAX_REPOS}`
    );

    // 統計計算に必要な情報のみ取得
    cache.reposData = data.map(repo => ({
      language: repo.language || 'Unknown',
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0
    }));

    cache.timestamp = Date.now();
    return cache.reposData;
  } catch (error) {
    logError('Fetch Repositories', error);
    return [];
  }
}

/**
 * GitHub統計情報を計算
 * @param {Array} repos - リポジトリ配列
 * @returns {Object} 統計情報
 */
export function calculateGitHubStats(repos) {
  if (!repos || repos.length === 0) {
    return {
      totalStars: 0,
      totalForks: 0,
      languages: {},
      mostUsedLanguage: 'Unknown'
    };
  }

  const stats = {
    totalStars: 0,
    totalForks: 0,
    languages: {}
  };

  repos.forEach(repo => {
    stats.totalStars += repo.stars;
    stats.totalForks += repo.forks;
    
    if (repo.language) {
      stats.languages[repo.language] = (stats.languages[repo.language] || 0) + 1;
    }
  });

  // 最も使用されている言語を取得
  const languageEntries = Object.entries(stats.languages);
  if (languageEntries.length > 0) {
    stats.mostUsedLanguage = languageEntries.reduce((a, b) => 
      a[1] > b[1] ? a : b
    )[0];
  } else {
    stats.mostUsedLanguage = 'Unknown';
  }

  return stats;
}

/**
 * GitHubアクティビティセクションを初期化
 */
export async function initializeGitHubActivity() {
  const activityContainer = document.querySelector('.github-activity-content');
  
  if (!activityContainer) {
    console.warn('GitHub activity container not found');
    return;
  }

  // ローディング状態を表示
  showLoadingState(activityContainer);

  try {
    // データを並行取得
    const [userData, repos] = await Promise.all([
      fetchUserData(),
      fetchRepositories()
    ]);

    if (!userData || !repos) {
      showErrorState(activityContainer);
      return;
    }

    // 統計情報を計算
    const stats = calculateGitHubStats(repos);

    // UIを更新
    renderGitHubActivity(activityContainer, userData, stats);
    
    console.log('✅ GitHub activity loaded successfully');
  } catch (error) {
    logError('Initialize GitHub Activity', error);
    showErrorState(activityContainer);
  }
}

/**
 * ローディング状態を表示
 * @param {HTMLElement} container - コンテナ要素
 */
function showLoadingState(container) {
  container.innerHTML = `
    <div class="github-loading">
      <div class="loading-spinner"></div>
      <p>GitHubデータを読み込み中...</p>
    </div>
  `;
}

/**
 * エラー状態を表示
 * @param {HTMLElement} container - コンテナ要素
 */
function showErrorState(container) {
  container.innerHTML = `
    <div class="github-error">
      <i class="fas fa-exclamation-triangle"></i>
      <p>GitHubデータの取得に失敗しました</p>
      <a href="https://github.com/${GITHUB_CONFIG.USERNAME}" 
         target="_blank" 
         rel="noopener noreferrer" 
         class="btn btn-secondary">
        <i class="fab fa-github"></i>
        GitHubプロフィールを見る
      </a>
    </div>
  `;
}

/**
 * GitHubアクティビティをレンダリング
 * @param {HTMLElement} container - コンテナ要素
 * @param {Object} userData - ユーザーデータ
 * @param {Object} stats - 統計情報
 */
function renderGitHubActivity(container, userData, stats) {
  container.innerHTML = `
    <!-- GitHub統計情報 -->
    <div class="github-stats">
      <div class="github-stat-item">
        <i class="fas fa-book"></i>
        <div class="stat-info">
          <div class="stat-number">${userData.publicRepos}</div>
          <div class="stat-label">Public Repos</div>
        </div>
      </div>
      <div class="github-stat-item">
        <i class="fas fa-star"></i>
        <div class="stat-info">
          <div class="stat-number">${stats.totalStars}</div>
          <div class="stat-label">Total Stars</div>
        </div>
      </div>
      <div class="github-stat-item">
        <i class="fas fa-code-branch"></i>
        <div class="stat-info">
          <div class="stat-number">${stats.totalForks}</div>
          <div class="stat-label">Total Forks</div>
        </div>
      </div>
      <div class="github-stat-item">
        <i class="fas fa-users"></i>
        <div class="stat-info">
          <div class="stat-number">${userData.followers}</div>
          <div class="stat-label">Followers</div>
        </div>
      </div>
    </div>

    <!-- GitHubプロフィールリンク -->
    <div class="github-profile-link">
      <a href="https://github.com/${GITHUB_CONFIG.USERNAME}" 
         target="_blank" 
         rel="noopener noreferrer" 
         class="btn btn-primary">
        <i class="fab fa-github"></i>
        GitHubで全てのプロジェクトを見る
      </a>
    </div>
  `;
}
