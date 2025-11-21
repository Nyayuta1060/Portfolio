// ========== アプリケーション設定ファイル ==========
// このファイルはアプリケーション全体の設定を一元管理します

/**
 * アプリケーション環境設定
 */
export const APP_CONFIG = {
  // アプリケーション名
  name: 'Nyayuta Portfolio',
  version: '1.0.0',
  
  // 環境判定
  isDevelopment: window.location.hostname === 'localhost' || 
                 window.location.hostname === '127.0.0.1',
  
  // GitHub設定
  github: {
    username: 'Nyayuta1060',
    apiBaseUrl: 'https://api.github.com'
  },
  
  // 連絡先情報
  contact: {
    schoolEmail: 's2440111@st.omct.ac.jp',
    personalEmail: 'yuito.ozumi@gmail.com'
  }
};

/**
 * パフォーマンス設定
 */
export const PERFORMANCE_CONFIG = {
  // デバウンス・スロットル
  debounceDelay: 250,
  throttleDelay: 16, // 60fps
  
  // 遅延読み込み
  lazyLoadingOffset: '50px',
  
  // アニメーション
  enableParticles: true,
  particleCount: 50,
  reducedMotionRespect: true
};

/**
 * UI設定
 */
export const UI_CONFIG = {
  // ナビゲーション
  navigation: {
    height: 80,
    scrollThreshold: 100,
    activeSectionOffset: 150
  },
  
  // モーダル
  modal: {
    closeOnEscape: true,
    closeOnOverlayClick: true,
    animationDuration: 300
  },
  
  // フィルター
  defaultCategory: 'all',
  
  // ページネーション
  itemsPerPage: 9
};

/**
 * アニメーション設定
 */
export const ANIMATION_CONFIG = {
  // パーティクル
  particle: {
    count: 50,
    connectionDistance: 100,
    speed: {
      min: -1,
      max: 1
    }
  },
  
  // スキルバー
  skillBar: {
    animationDelay: 200,
    duration: 800
  },
  
  // パララックス
  parallax: {
    speed: 0.5
  },
  
  // Intersection Observer
  intersectionObserver: {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }
};

/**
 * データ設定
 */
export const DATA_CONFIG = {
  // JSONファイルパス
  paths: {
    career: './src/data/career.json',
    projects: './src/data/projects.json',
    skills: './src/data/skills.json'
  },
  
  // キャッシュ設定
  enableCache: true,
  cacheExpiration: 5 * 60 * 1000 // 5分
};

/**
 * エラートラッキング設定
 */
export const ERROR_CONFIG = {
  // ログレベル
  levels: {
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR',
    CRITICAL: 'CRITICAL'
  },
  
  // ログ出力先
  enableConsoleLog: true,
  enableRemoteLogging: false, // 将来の拡張用
  
  // スタックトレース
  includeStackTrace: true,
  maxStackDepth: 10
};

/**
 * 外部サービス設定
 */
export const EXTERNAL_SERVICES = {
  // フォント
  fonts: {
    google: [
      'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
      'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500&display=swap'
    ]
  },
  
  // アイコン
  icons: {
    fontAwesome: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
  }
};

/**
 * 設定の検証
 * 開発環境でのみ実行され、設定の妥当性をチェック
 */
if (APP_CONFIG.isDevelopment) {
  console.log('📋 Configuration loaded:', {
    app: APP_CONFIG.name,
    version: APP_CONFIG.version,
    environment: 'development'
  });
}

/**
 * 設定のフリーズ（不変化）
 * 実行時の予期せぬ変更を防止
 */
Object.freeze(APP_CONFIG);
Object.freeze(PERFORMANCE_CONFIG);
Object.freeze(UI_CONFIG);
Object.freeze(ANIMATION_CONFIG);
Object.freeze(DATA_CONFIG);
Object.freeze(ERROR_CONFIG);
Object.freeze(EXTERNAL_SERVICES);
