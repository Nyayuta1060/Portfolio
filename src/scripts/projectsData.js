// ========== プロジェクトデータ管理ファイル ==========
// このファイルでプロジェクトの追加・編集を簡単に行えます

/**
 * プロジェクトステータスの定義
 */
export const PROJECT_STATUS = {
  COMPLETED: 'completed',      // 完成
  IN_PROGRESS: 'in-progress',  // 進行中
  ARCHIVED: 'archived',        // アーカイブ済み
  PLANNING: 'planning'         // 計画中
};

/**
 * プロジェクトタイプの定義
 */
export const PROJECT_TYPE = {
  WEB_APP: 'web-app',           // Webアプリケーション
  CLI_TOOL: 'cli-tool',         // CLIツール
  LIBRARY: 'library',           // ライブラリ
  AUTOMATION: 'automation',     // 自動化ツール
  GAME: 'game',                 // ゲーム
  ROBOT: 'robot',               // ロボット関連
  AI_ML: 'ai-ml',               // AI/ML
  OTHER: 'other'                // その他
};

/**
 * プロジェクトデータのテンプレート
 * 新しいプロジェクトを追加する際はこの形式に従ってください
 * 
 * @example
 * projectId: {
 *   name: 'プロジェクト名',
 *   description: '簡潔な説明',
 *   type: PROJECT_TYPE.WEB_APP,
 *   status: PROJECT_STATUS.COMPLETED,
 *   featured: false,  // 注目プロジェクトかどうか
 *   period: '開発期間',
 *   role: '担当した役割',  // チーム開発の場合のみ指定、個人開発の場合はnull
 *   developmentType: 'personal',  // 'personal' or 'team'
 *   teamSize: null,  // チーム開発の場合は人数 (例: 3)、個人開発の場合はnull
 *   technologies: ['HTML', 'CSS', 'JavaScript'],
 *   image: {
 *     type: 'file',  // 'file', 'icon', 'placeholder'
 *     src: './src/assets/projects/project.png',  // type='file'の場合
 *     icon: 'fas fa-globe'  // type='icon'の場合
 *   },
 *   links: {
 *     github: 'GitHub URL',
 *     demo: 'デモURL (なければnull)',
 *     article: '記事URL (なければnull)'
 *   },
 *   highlights: [
 *     '特徴1',
 *     '特徴2'
 *   ]
 * }
 */

/**
 * プロジェクト詳細データ
 * プロジェクトを追加する場合は、以下に新しいエントリを追加してください
 */
export const PROJECT_DETAILS = {
  // ========== Featured Projects ==========
  nulltasker: {
    name: 'NullTasker',
    description: '学生向けのオープンソースタスク管理ツール',
    type: PROJECT_TYPE.WEB_APP,
    status: PROJECT_STATUS.IN_PROGRESS,
    featured: true,
    period: '2025年5月〜現在',
    role: 'リードプログラマー',
    developmentType: 'team',
    teamSize: 5,
    technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
    image: {
      type: 'file',
      src: './src/assets/projects/nulltasker/NullTasker.png',
      alt: 'NullTasker'
    },
    links: {
      github: 'https://github.com/Team-Nullpo/NullTasker',
      demo: null,
      article: null
    },
    highlights: [
      '学生の学習効率を向上させるタスク管理システム',
      'チーム開発でのコラボレーション経験',
      'レスポンシブデザインの実装'
    ],
    modal: {
      detailedDescription: '学生の学習効率を向上させることを目的とした、オープンソースのタスク管理ツールです。チーム開発での経験を通じて、協力してプロジェクトを進める重要性を学びました。',
      gallery: [
        {
          type: 'image',
          src: './src/assets/projects/nulltasker/NullTasker.png',
          alt: 'NullTasker ロゴ',
          caption: 'NullTasker ロゴ'
        },
        {
          type: 'image',

        }
        // 追加の画像・動画がある場合はここに追加
        // {
        //   type: 'image',
        //   src: './src/assets/projects/nulltasker/screenshot2.png',
        //   alt: 'タスク一覧画面',
        //   caption: 'タスク一覧画面'
        // }
      ]
    }
  },

  // ========== Web Projects ==========
  portfolio: {
    name: 'Portfolio Website',
    description: 'HTML/CSS/JavaScriptで作成したポートフォリオサイト(本サイト)',
    type: PROJECT_TYPE.WEB_APP,
    status: PROJECT_STATUS.IN_PROGRESS,
    featured: false,
    period: '2025年9月〜現在',
    role: null,
    developmentType: 'personal',
    teamSize: null,
    technologies: ['HTML', 'CSS', 'JavaScript', 'Github API'],
    image: {
      type: 'icon',
      icon: 'fas fa-globe'
    },
    links: {
      github: 'https://github.com/Nyayuta1060/Portfolio',
      demo: null,
      article: null
    },
    highlights: [
      'レスポンシブデザインの実装',
      'パーティクルアニメーション',
      'モーダル機能'
    ]
  },

  // ========== CLI Tools ==========
  pytranslater: {
    name: 'PyTranslater',
    description: 'Pythonで実装した翻訳ツール',
    type: PROJECT_TYPE.AI_ML,
    status: PROJECT_STATUS.COMPLETED,
    featured: false,
    period: '2025年6月',
    role: null,
    developmentType: 'personal',
    teamSize: null,
    technologies: ['Python'],
    image: {
      type: 'icon',
      icon: 'fa-solid fa-language'
    },
    links: {
      github: 'https://github.com/Nyayuta1060/PyTranslater',
      demo: null,
      article: null
    },
    highlights: [
      'GUIで翻訳',
      '複数言語対応',
      'シンプルなUI'
    ],
    modal: {
      detailedDescription: 'Pythonで実装したシンプルで使いやすい翻訳ツールです。GUIを備えており、複数の言語に対応しています。',
      gallery: [
        {
          type: 'image',
          src: './src/assets/projects/pytranslater/demo.png',
          alt: 'PyTranslater デモ画面',
          caption: 'PyTranslater デモ画面'
        },
        {
          type: 'image',
          src: './src/assets/projects/pytranslater/demo-another-page.png',
          alt: '個別ページで開いた様子',
          caption: '個別ページで開いた様子'
        },
        {
          type: 'image',
          src: './src/assets/projects/pytranslater/demo-setting.png',
          alt: '詳細設定画面',
          caption: '詳細設定画面'
        }
        // 画像・動画を追加する場合はここに追加
        // {
        //   type: 'image',
        //   src: './src/assets/projects/pytranslater/screenshot1.png',
        //   alt: 'PyTranslater メイン画面',
        //   caption: 'PyTranslater メイン画面'
        // }
      ]
    }
  },

  // ========== Automation Tools ==========
  'git-grassreporter': {
    name: 'Git-GrassReporter',
    description: 'PythonとGitHub Actionsを用いたcontributionの継続を自動支援するツール',
    type: PROJECT_TYPE.AUTOMATION,
    status: PROJECT_STATUS.COMPLETED,
    featured: false,
    period: '2025年10月',
    role: null,
    developmentType: 'personal',
    teamSize: null,
    technologies: ['Python', 'GitHub Actions'],
    image: {
      type: 'icon',
      icon: 'fa-solid fa-bullhorn'
    },
    links: {
      github: 'https://github.com/Nyayuta1060/Git-GrassReporter',
      demo: null,
      article: null
    },
    highlights: [
      'GitHub Actionsによる自動化',
      'コントリビューション継続の支援',
      'Discord通知機能'
    ]
  },

  // ========== ここに新しいプロジェクトを追加 ==========
  // プロジェクトを追加する場合は、上記のテンプレートに従って記述してください
  // 例:
  // 'my-new-project': {
  //   name: 'My New Project',
  //   description: 'プロジェクトの説明',
  //   type: PROJECT_TYPE.WEB_APP,
  //   status: PROJECT_STATUS.IN_PROGRESS,
  //   featured: false,
  //   period: '2025年1月〜',
  //   role: null,  // チーム開発の場合は '担当した役割'、個人開発の場合はnull
  //   developmentType: 'personal',  // 'personal' or 'team'
  //   teamSize: null,  // チーム開発の場合は人数、個人開発の場合はnull
  //   technologies: ['React', 'TypeScript', 'Node.js'],
  //   image: {
  //     type: 'file',
  //     src: './src/assets/projects/my-project.png',
  //     alt: 'My Project'
  //   },
  //   links: {
  //     github: 'https://github.com/username/my-project',
  //     demo: 'https://demo.example.com',
  //     article: null
  //   },
  //   highlights: [
  //     '機能1の説明',
  //     '機能2の説明'
  //   ]
  // },
};

/**
 * プロジェクトIDから詳細を取得するヘルパー関数
 * @param {string} projectId - プロジェクトID
 * @returns {Object|null} プロジェクト詳細
 */
export function getProjectDetails(projectId) {
  return PROJECT_DETAILS[projectId] || null;
}

/**
 * Featured（注目）プロジェクトを取得するヘルパー関数
 * @returns {Array} Featured プロジェクトの配列
 */
export function getFeaturedProjects() {
  return Object.entries(PROJECT_DETAILS)
    .filter(([_, project]) => project.featured)
    .map(([id, project]) => ({ id, ...project }));
}

/**
 * プロジェクトをステータスでフィルタリングするヘルパー関数
 * @param {string} status - プロジェクトステータス
 * @returns {Array} フィルタリングされたプロジェクトの配列
 */
export function getProjectsByStatus(status) {
  return Object.entries(PROJECT_DETAILS)
    .filter(([_, project]) => project.status === status)
    .map(([id, project]) => ({ id, ...project }));
}

/**
 * プロジェクトをタイプでフィルタリングするヘルパー関数
 * @param {string} type - プロジェクトタイプ
 * @returns {Array} フィルタリングされたプロジェクトの配列
 */
export function getProjectsByType(type) {
  return Object.entries(PROJECT_DETAILS)
    .filter(([_, project]) => project.type === type)
    .map(([id, project]) => ({ id, ...project }));
}

/**
 * 特定の技術を使用しているプロジェクトを取得するヘルパー関数
 * @param {string} technology - 技術名
 * @returns {Array} プロジェクトの配列
 */
export function getProjectsByTechnology(technology) {
  return Object.entries(PROJECT_DETAILS)
    .filter(([_, project]) => 
      project.technologies.some(tech => 
        tech.toLowerCase() === technology.toLowerCase()
      )
    )
    .map(([id, project]) => ({ id, ...project }));
}

/**
 * プロジェクトが存在するかチェックするヘルパー関数
 * @param {string} projectId - プロジェクトID
 * @returns {boolean} 存在する場合はtrue
 */
export function hasProject(projectId) {
  return projectId in PROJECT_DETAILS;
}

/**
 * 全プロジェクトのリストを取得するヘルパー関数
 * @returns {Array} プロジェクトIDの配列
 */
export function getAllProjectIds() {
  return Object.keys(PROJECT_DETAILS);
}

/**
 * プロジェクト数を取得するヘルパー関数
 * @returns {number} プロジェクトの総数
 */
export function getProjectCount() {
  return Object.keys(PROJECT_DETAILS).length;
}

/**
 * 全プロジェクトを配列として取得するヘルパー関数
 * @returns {Array} 全プロジェクトの配列
 */
export function getAllProjects() {
  return Object.entries(PROJECT_DETAILS).map(([id, project]) => ({
    id,
    ...project
  }));
}

/**
 * プロジェクトをソートするヘルパー関数
 * @param {string} sortBy - 'name', 'period' など
 * @param {string} order - 'asc' または 'desc'
 * @returns {Array} ソートされたプロジェクトの配列
 */
export function getSortedProjects(sortBy = 'period', order = 'desc') {
  const projects = getAllProjects();
  
  return projects.sort((a, b) => {
    if (order === 'asc') {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    }
    return a[sortBy] < b[sortBy] ? 1 : -1;
  });
}
