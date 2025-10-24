// ========== スキルデータ管理ファイル ==========
// このファイルでスキルの追加・編集を簡単に行えます

/**
 * スキルレベルの定義
 * - beginner: 初級 (学習中、基本的な使い方を理解している)
 * - intermediate: 中級 (実務で使用できる、基本は問題なし)
 * - advanced: 上級 (高度な機能も使いこなせる、他人に教えられる)
 * - expert: エキスパート (深い理解、最適化や設計ができる)
 */
export const SKILL_LEVELS = {
  BEGINNER: '初級',
  INTERMEDIATE: '中級',
  ADVANCED: '上級',
  EXPERT: 'エキスパート'
};

/**
 * 使用頻度の定義
 */
export const FREQUENCY = {
  DAILY: '毎日',
  WEEKLY_5_7: '週5-7回',
  WEEKLY_3_5: '週3-5回',
  WEEKLY_2_4: '週2-4回',
  WEEKLY_1_2: '週1-2回',
  MONTHLY: '月2-4回',
  RARELY: '稀に使用'
};

/**
 * スキルカテゴリの定義
 */
export const CATEGORIES = {
  FRONTEND: 'frontend',
  BACKEND: 'backend',
  AI_ML: 'ai-ml',
  TOOLS: 'tools'
};

/**
 * スキルデータのテンプレート
 * 新しいスキルを追加する際はこの形式に従ってください
 * 
 * @example
 * skillId: {
 *   name: 'スキル名',
 *   category: CATEGORIES.FRONTEND,
 *   level: SKILL_LEVELS.INTERMEDIATE,
 *   frequency: FREQUENCY.WEEKLY_3_5,
 *   usage: '主な使用用途を記述',
 *   experience: '開始年月',
 *   comment: '個人的なコメントや学習メモ',
 *   links: {
 *     official: '公式サイトURL',
 *     github: 'GitHub URL (なければnull)'
 *   }
 * }
 */

/**
 * スキル詳細データ
 * スキルを追加する場合は、以下に新しいエントリを追加してください
 */
export const SKILL_DETAILS = {
  // ========== Frontend ==========
  html: {
    name: 'HTML',
    category: CATEGORIES.FRONTEND,
    level: SKILL_LEVELS.ADVANCED,
    frequency: '週4回程度',
    usage: 'Webページの構造設計',
    experience: '2020年4月〜',
    comment: '様々なプロジェクトで使用しています。',
    links: {
      official: 'https://developer.mozilla.org/ja/docs/Web/HTML',
      github: null
    }
  },
  
  css: {
    name: 'CSS',
    category: CATEGORIES.FRONTEND,
    level: SKILL_LEVELS.INTERMEDIATE,
    frequency: '週4回程度',
    usage: 'レスポンシブデザイン、アニメーション、モダンレイアウト設計',
    experience: '2020年4月〜',
    comment: 'HTMLと組み合わせて使用しています。美しいデザインを作るのは苦手で、勉強中です。',
    links: {
      official: 'https://developer.mozilla.org/ja/docs/Web/CSS',
      github: null
    }
  },
  
  javascript: {
    name: 'JavaScript',
    category: CATEGORIES.FRONTEND,
    level: SKILL_LEVELS.INTERMEDIATE,
    frequency: '週4回程度',
    usage: 'Webアプリケーション開発',
    experience: '2020年6月〜',
    comment: 'HTML/CSSと組み合わせて使用しています。モダンなフロントエンドを作成するために勉強中です。',
    links: {
      official: 'https://developer.mozilla.org/ja/docs/Web/JavaScript',
      github: null
    }
  },
  
  // ========== Backend ==========
  nodejs: {
    name: 'Node.js',
    category: CATEGORIES.BACKEND,
    level: SKILL_LEVELS.INTERMEDIATE,
    frequency: '週3回程度',
    usage: 'バックエンドAPI開発、ビルドツール、スクリプト自動化',
    experience: '2022年10月〜',
    comment: 'Webサーバー構築や各種ツールの作成に使用しています。',
    links: {
      official: 'https://nodejs.org/',
      github: 'https://github.com/nodejs/node'
    }
  },
  
  python: {
    name: 'Python',
    category: CATEGORIES.BACKEND,
    level: SKILL_LEVELS.ADVANCED,
    frequency: FREQUENCY.WEEKLY_5_7,
    usage: 'AI/ML開発、データ分析、自動化スクリプト',
    experience: '2022年4月〜',
    comment: 'とりあえずPythonを書いておけば何とかなると思いがちな言語。幅広い分野で活用しています。',
    links: {
      official: 'https://www.python.org/',
      github: 'https://github.com/python/cpython'
    }
  },
  
  elixir: {
    name: 'Elixir',
    category: CATEGORIES.BACKEND,
    level: SKILL_LEVELS.INTERMEDIATE,
    frequency: '週3回程度',
    usage: 'Webアプリケーション開発、並行処理',
    experience: '2024年4月〜',
    comment: '関数型プログラミングの学習として使用中。最近ハマっています。',
    links: {
      official: 'https://elixir-lang.org/',
      github: 'https://github.com/elixir-lang/elixir'
    }
  },
  
  phoenix: {
    name: 'Phoenix',
    category: CATEGORIES.BACKEND,
    level: SKILL_LEVELS.BEGINNER,
    frequency: '週1回',
    usage: 'リアルタイムWebアプリケーション開発',
    experience: '2024年10月〜',
    comment: 'ElixirのWebフレームワーク。LiveViewを作るのに使用しています。',
    links: {
      official: 'https://www.phoenixframework.org/',
      github: 'https://github.com/phoenixframework/phoenix'
    }
  },
  
  cpp: {
    name: 'C++',
    category: CATEGORIES.BACKEND,
    level: SKILL_LEVELS.INTERMEDIATE,
    frequency: FREQUENCY.WEEKLY_2_4,
    usage: 'ロボット制御、組み込みシステム、競技プログラミング',
    experience: '2023年4月〜',
    comment: 'ロボコンでのロボット制御に使用しています。',
    links: {
      official: 'https://isocpp.org/',
      github: null
    }
  },
  
  // ========== AI/ML ==========
  pytorch: {
    name: 'PyTorch',
    category: CATEGORIES.AI_ML,
    level: SKILL_LEVELS.BEGINNER,
    frequency: '週1回程度',
    usage: 'ディープラーニングモデルの構築・学習',
    experience: '2024年7月〜',
    comment: '画像認識や自然言語処理のモデル構築に使用。日々進化していて追いつくのでやっとです。',
    links: {
      official: 'https://pytorch.org/',
      github: 'https://github.com/pytorch/pytorch'
    }
  },
  
  numpy: {
    name: 'NumPy',
    category: CATEGORIES.AI_ML,
    level: SKILL_LEVELS.ADVANCED,
    frequency: '週2回程度',
    usage: '数値計算、配列操作、データ処理',
    experience: '2022年6月〜',
    comment: 'Pythonでの数値計算には欠かせないライブラリ。とりあえずimportしておけば何とかなる気がします。',
    links: {
      official: 'https://numpy.org/',
      github: 'https://github.com/numpy/numpy'
    }
  },
  
  pandas: {
    name: 'Pandas',
    category: CATEGORIES.AI_ML,
    level: SKILL_LEVELS.INTERMEDIATE,
    frequency: '週1回程度',
    usage: 'データ分析、前処理、CSVファイル操作',
    experience: '2022年6月〜',
    comment: 'データ分析に必須のツール。DataFrameを使った柔軟なデータ操作が便利です。',
    links: {
      official: 'https://pandas.pydata.org/',
      github: 'https://github.com/pandas-dev/pandas'
    }
  },
  
  opencv: {
    name: 'OpenCV',
    category: CATEGORIES.AI_ML,
    level: SKILL_LEVELS.INTERMEDIATE,
    frequency: '月2-4回程度',
    usage: '画像処理、物体検出、カメラ制御',
    experience: '2024年9月〜',
    comment: '画像認識やカメラ制御に活用。リアルタイム処理などで使用しています。',
    links: {
      official: 'https://opencv.org/',
      github: 'https://github.com/opencv/opencv'
    }
  },
  
  // ========== Tools ==========
  docker: {
    name: 'Docker',
    category: CATEGORIES.TOOLS,
    level: SKILL_LEVELS.BEGINNER,
    frequency: '月2回程度',
    usage: '開発環境構築、コンテナ化、デプロイ',
    experience: '2024年6月〜',
    comment: 'あまり使用しておらず、勉強中です。',
    links: {
      official: 'https://www.docker.com/',
      github: 'https://github.com/docker'
    }
  },
  
  git: {
    name: 'Git',
    category: CATEGORIES.TOOLS,
    level: SKILL_LEVELS.ADVANCED,
    frequency: FREQUENCY.DAILY,
    usage: 'バージョン管理、チーム開発、コード履歴管理',
    experience: '2020年4月〜',
    comment: '開発に欠かせないツール。ブランチ戦略やコミット管理を意識しています。',
    links: {
      official: 'https://git-scm.com/',
      github: 'https://github.com/git/git'
    }
  },
  
  github: {
    name: 'GitHub',
    category: CATEGORIES.TOOLS,
    level: SKILL_LEVELS.ADVANCED,
    frequency: FREQUENCY.DAILY,
    usage: 'コード管理、CI/CD、プロジェクト管理',
    experience: '2020年4月〜',
    comment: 'とりあえず使っています。GitHub Actionsも学び始めました。このアカウントは2~3個目な気がします',
    links: {
      official: 'https://github.com',
      github: null
    }
  },
  
  gitlab: {
    name: 'GitLab',
    category: CATEGORIES.TOOLS,
    level: SKILL_LEVELS.INTERMEDIATE,
    frequency: '週1回',
    usage: 'コード管理、CI/CD、プライベートリポジトリ',
    experience: '2023年4月〜',
    comment: 'リフレッシュがてら時々githubの代わりに使っています。',
    links: {
      official: 'https://about.gitlab.com/',
    }
  },
  
  vscode: {
    name: 'VS Code',
    category: CATEGORIES.TOOLS,
    level: SKILL_LEVELS.ADVANCED,
    frequency: FREQUENCY.DAILY,
    usage: 'コード編集',
    experience: '2020年4月〜',
    comment: 'メインエディタとして使用。',
    links: {
      official: 'https://code.visualstudio.com/',
      github: 'https://github.com/microsoft/vscode'
    }
  },
  
  visualstudio: {
    name: 'Visual Studio',
    category: CATEGORIES.TOOLS,
    level: SKILL_LEVELS.BEGINNER,
    frequency: '週1回程度',
    usage: 'コード編集',
    experience: '2023年4月〜',
    comment: 'まれに使用しています',
    links: {
      official: 'https://visualstudio.microsoft.com/',
      github: null
    }
  },
  
  zed: {
    name: 'Zed',
    category: CATEGORIES.TOOLS,
    level: SKILL_LEVELS.BEGINNER,
    frequency: FREQUENCY.WEEKLY_1_2,
    usage: '軽量なコード編集',
    experience: '2025年9月〜',
    comment: '高速で軽量なエディタ。最近知って使い始めました',
    links: {
      official: 'https://zed.dev/',
      github: 'https://github.com/zed-industries/zed'
    }
  },

  // ========== ここに新しいスキルを追加 ==========
  // スキルを追加する場合は、上記のテンプレートに従って記述してください
  // 例:
  // react: {
  //   name: 'React',
  //   category: CATEGORIES.FRONTEND,
  //   level: SKILL_LEVELS.INTERMEDIATE,
  //   frequency: FREQUENCY.WEEKLY_3_5,
  //   usage: 'フロントエンド開発、SPA構築',
  //   experience: '2024年1月〜',
  //   comment: 'モダンなUIライブラリ。コンポーネント設計を学習中です。',
  //   links: {
  //     official: 'https://react.dev/',
  //     github: 'https://github.com/facebook/react'
  //   }
  // },
};

/**
 * スキルIDからカテゴリを取得するヘルパー関数
 * @param {string} skillId - スキルID
 * @returns {string|null} カテゴリ名
 */
export function getSkillCategory(skillId) {
  const skill = SKILL_DETAILS[skillId];
  return skill ? skill.category : null;
}

/**
 * カテゴリ別にスキルをグループ化するヘルパー関数
 * @returns {Object} カテゴリごとにグループ化されたスキル
 */
export function groupSkillsByCategory() {
  const grouped = {};
  
  Object.entries(SKILL_DETAILS).forEach(([id, skill]) => {
    const category = skill.category;
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push({ id, ...skill });
  });
  
  return grouped;
}

/**
 * スキルが存在するかチェックするヘルパー関数
 * @param {string} skillId - スキルID
 * @returns {boolean} 存在する場合はtrue
 */
export function hasSkill(skillId) {
  return skillId in SKILL_DETAILS;
}

/**
 * 全スキルのリストを取得するヘルパー関数
 * @returns {Array} スキルIDの配列
 */
export function getAllSkillIds() {
  return Object.keys(SKILL_DETAILS);
}

/**
 * スキル数を取得するヘルパー関数
 * @returns {number} スキルの総数
 */
export function getSkillCount() {
  return Object.keys(SKILL_DETAILS).length;
}
