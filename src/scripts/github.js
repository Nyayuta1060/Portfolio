// ========== GitHub API連携モジュール ==========
import { logError } from './utils.js';
import i18n from './i18n.js';

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
  const url = `${GITHUB_CONFIG.API_BASE}${endpoint}`;
  console.log(`🌐 Fetching: ${url}`);
  
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    console.log(`📡 Response status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      
      // レート制限エラーの判定
      if (response.status === 403 && errorText.includes('rate limit')) {
        console.error(`⏱️ GitHub API Rate Limit Exceeded`);
        const error = new Error('GitHub API rate limit exceeded');
        error.isRateLimit = true;
        error.statusCode = 403;
        throw error;
      }
      
      console.error(`❌ GitHub API Error Response:`, errorText);
      const error = new Error(`GitHub API Error: ${response.status} ${response.statusText}`);
      error.statusCode = response.status;
      throw error;
    }

    const data = await response.json();
    console.log(`✅ Successfully parsed JSON response`);
    return data;
  } catch (error) {
    console.error('❌ GitHub API Fetch Error:', {
      message: error.message,
      url: url,
      isRateLimit: error.isRateLimit || false
    });
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
      console.log('✅ Using cached user data');
      return cache.userData;
    }

    console.log('🔍 Fetching user data from GitHub API...');
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
    console.log('✅ User data fetched successfully');
    return cache.userData;
  } catch (error) {
    console.error('❌ Failed to fetch user data:', error);
    
    // レート制限エラーの場合は特別にマーク
    if (error.message && error.message.includes('403')) {
      error.isRateLimit = true;
    }
    
    logError('Fetch User Data', error);
    throw error; // エラーを上位に伝播
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
      console.log('✅ Using cached repositories data');
      return cache.reposData;
    }

    console.log('🔍 Fetching repositories from GitHub API...');
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
    console.log(`✅ ${cache.reposData.length} repositories fetched successfully`);
    return cache.reposData;
  } catch (error) {
    console.error('❌ Failed to fetch repositories:', error);
    
    // レート制限エラーの場合は特別にマーク
    if (error.message && error.message.includes('403')) {
      error.isRateLimit = true;
    }
    
    logError('Fetch Repositories', error);
    throw error; // エラーを上位に伝播
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

  let errorType = 'unknown';
  let cachedUserData = null;
  let cachedStats = null;

  // データを読み込む関数
  const loadData = async () => {
    try {
      // データを並行取得
      const [userData, repos] = await Promise.all([
        fetchUserData(),
        fetchRepositories()
      ]);

      console.log('📊 GitHub Data Results:', { userData, reposCount: repos?.length });

      if (!userData) {
        console.error('❌ User data is null');
        showErrorState(activityContainer, errorType);
        return;
      }

      if (!repos || repos.length === 0) {
        console.warn('⚠️ No repositories found, but continuing with user data');
      }

      // 統計情報を計算
      const stats = calculateGitHubStats(repos);

      // キャッシュに保存
      cachedUserData = userData;
      cachedStats = stats;

      // UIを更新
      renderGitHubActivity(activityContainer, userData, stats);
      
      console.log('✅ GitHub activity loaded successfully');
    } catch (error) {
      console.error('❌ Initialize GitHub Activity Error:', error);
      
      // エラータイプを判定
      if (error.message && error.message.includes('rate limit')) {
        errorType = 'rate-limit';
      } else if (error.message && error.message.includes('Failed to fetch')) {
        errorType = 'network';
      }
      
      logError('Initialize GitHub Activity', error);
      showErrorState(activityContainer, errorType);
    }
  };

  // 初回読み込み
  await loadData();

  // 言語変更時に再レンダリング
  window.addEventListener('languageChanged', () => {
    console.log('🌐 GitHub Activity language changed, re-rendering...');
    if (cachedUserData && cachedStats) {
      renderGitHubActivity(activityContainer, cachedUserData, cachedStats);
    }
  });
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
 * @param {string} errorType - エラーの種類（'rate-limit' | 'network' | 'unknown'）
 */
function showErrorState(container, errorType = 'unknown') {
  let errorMessage = '';
  let errorDetails = '';

  if (errorType === 'rate-limit') {
    errorMessage = 'GitHub APIのレート制限に達しました';
    errorDetails = `
      GitHub APIは1時間あたり60リクエストまでの制限があります。<br>
      しばらく時間をおいてから再度アクセスしてください。
    `;
  } else if (errorType === 'network') {
    errorMessage = 'ネットワークエラーが発生しました';
    errorDetails = `
      インターネット接続を確認してください。
    `;
  } else {
    errorMessage = i18n.t('common.githubDataFetchFailed');
    errorDetails = `
      ネットワーク接続を確認するか、<br>
      しばらく時間をおいてから再読み込みしてください。
    `;
  }

  container.innerHTML = `
    <div class="github-error">
      <i class="fas fa-exclamation-triangle"></i>
      <p class="error-title">${errorMessage}</p>
      <p class="error-details">${errorDetails}</p>
      <a href="https://github.com/${GITHUB_CONFIG.USERNAME}" 
         target="_blank" 
         rel="noopener noreferrer" 
         class="btn btn-secondary">
        <i class="fab fa-github"></i>
        <span data-i18n="common.viewGithubProfile">${i18n.t('common.viewGithubProfile')}</span>
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
          <div class="stat-label" data-i18n="github.stats.publicRepos">${i18n.t('github.stats.publicRepos')}</div>
        </div>
      </div>
      <div class="github-stat-item">
        <i class="fas fa-star"></i>
        <div class="stat-info">
          <div class="stat-number">${stats.totalStars}</div>
          <div class="stat-label" data-i18n="github.stats.totalStars">${i18n.t('github.stats.totalStars')}</div>
        </div>
      </div>
      <div class="github-stat-item">
        <i class="fas fa-code-branch"></i>
        <div class="stat-info">
          <div class="stat-number">${stats.totalForks}</div>
          <div class="stat-label" data-i18n="github.stats.totalForks">${i18n.t('github.stats.totalForks')}</div>
        </div>
      </div>
      <div class="github-stat-item">
        <i class="fas fa-users"></i>
        <div class="stat-info">
          <div class="stat-number">${userData.followers}</div>
          <div class="stat-label" data-i18n="github.stats.followers">${i18n.t('github.stats.followers')}</div>
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
        <span data-i18n="github.viewAllProjects">${i18n.t('github.viewAllProjects')}</span>
      </a>
    </div>
  `;
}
