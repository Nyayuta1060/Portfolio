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
 *   role: '担当した役割',
 *   developmentType: 'personal',  // 'personal' or 'team'
 *   teamSize: null,  // チーム開発の場合は人数 (例: 4)
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
 *   ],
 *   // モーダル専用フィールド
 *   modal: {
 *     detailedDescription: 'プロジェクトの詳細説明（複数段落可）',
 *     challenges: '技術的な挑戦や工夫した点',
 *     gallery: [
 *       {
 *         type: 'image',  // 'image' or 'video'
 *         src: './src/assets/projects/projectId/screenshot1.png',
 *         alt: '説明',
 *         caption: 'キャプション（オプション）'
 *       },
 *       {
 *         type: 'video',
 *         src: './src/assets/projects/projectId/demo.mp4',
 *         poster: './src/assets/projects/projectId/poster.png',  // サムネイル
 *         alt: 'デモ動画'
 *       }
 *     ]
 *   }
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
    period: '2024年5月〜現在',
    role: 'フロントエンド開発、UI設計',
    developmentType: 'team',
    teamSize: 4,
    technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
    image: {
      type: 'file',
      src: './src/assets/projects/NullTasker.png',
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
      detailedDescription: '学生の学習効率を向上させることを目的とした、オープンソースのタスク管理ツールです。授業、課題、テスト勉強などを効率的に管理できるよう設計されています。チーム4人で開発を進めており、学生が本当に必要とする機能を重視しています。',
      challenges: 'チーム開発におけるコミュニケーションとGit管理の効率化。レスポンシブデザインの実装では、モバイルファーストのアプローチを採用し、様々なデバイスで快適に使用できるUIを実現しました。',
      gallery: [
        {
          type: 'image',
          src: './src/assets/projects/nulltasker/screenshot1.png',
          alt: 'NullTasker メイン画面',
          caption: 'タスク一覧画面'
        }
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
    period: '2024年10月〜現在',
    role: '個人開発',
    developmentType: 'personal',
    teamSize: null,
    technologies: ['HTML', 'CSS', 'JavaScript', 'Github API'],
    image: {
      type: 'icon',
      icon: 'fas fa-globe'
    },
    links: {
      github: 'https://github.com/Nyayuta1060/Portfolio',
      demo: 'https://nyayuta1060.github.io/Portfolio/',
      article: null
    },
    highlights: [
      'レスポンシブデザインの実装',
      'パーティクルアニメーション',
      'スキル詳細モーダル機能'
    ],
    modal: {
      detailedDescription: '自分のスキルとプロジェクトを紹介するために制作したポートフォリオサイトです。HTML/CSS/JavaScriptのみで構築し、フレームワークに頼らずモダンなWebデザインを実現しました。GitHub APIを活用してリポジトリ情報を動的に取得しています。',
      challenges: 'バニラJavaScriptでのモジュール設計とコンポーネント化。スキル詳細モーダルやパーティクルアニメーションなど、UXを重視した機能実装に注力しました。',
      gallery: []
    }
  },

  // ========== CLI Tools ==========
  pytranslater: {
    name: 'PyTranslater',
    description: 'Pythonで実装した翻訳ツール',
    type: PROJECT_TYPE.CLI_TOOL,
    status: PROJECT_STATUS.COMPLETED,
    featured: false,
    period: '2024年6月',
    role: '個人開発',
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
      'コマンドラインから簡単に翻訳',
      '複数言語対応',
      'シンプルなUI'
    ],
    modal: {
      detailedDescription: 'コマンドラインから手軽に翻訳できるシンプルなツールです。開発作業中にドキュメントやエラーメッセージを素早く翻訳する目的で作成しました。',
      challenges: 'CLIツールとしての使いやすさを追求し、直感的なコマンド体系を設計しました。',
      gallery: []
    }
  },

  // ========== Automation Tools ==========
  'git-grassreporter': {
    name: 'Git-GrassReporter',
    description: 'PythonとGitHub Actionsを用いたcontributionの継続を自動支援するツール',
    type: PROJECT_TYPE.AUTOMATION,
    status: PROJECT_STATUS.COMPLETED,
    featured: false,
    period: '2024年8月',
    role: '個人開発',
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
    ],
    modal: {
      detailedDescription: 'GitHubのコントリビューションを継続するモチベーションを維持するための自動化ツールです。毎日の活動状況をDiscordに通知し、継続を促します。GitHub Actionsを活用した完全自動化を実現しています。',
      challenges: 'GitHub Actionsのスケジュール実行とDiscord Webhookの連携。通知内容を工夫し、モチベーション向上につながる情報を提供しました。',
      gallery: []
    }
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
  //   role: '個人開発',
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
