// ========== 定数定義 ==========

// アニメーション設定
export const ANIMATION_CONFIG = {
  DEBOUNCE_DELAY: 250,
  THROTTLE_DELAY: 16, // 60fps
  PARTICLE_COUNT: 50,
  PARTICLE_CONNECTION_DISTANCE: 100,
  SKILL_BAR_ANIMATION_DELAY: 200
};

// Intersection Observer設定
export const OBSERVER_CONFIG = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

// ナビゲーション設定
export const NAV_CONFIG = {
  OFFSET: 80, // ナビバーの高さ
  SCROLL_THRESHOLD: 100,
  ACTIVE_SECTION_OFFSET: 150
};

// パララックス設定
export const PARALLAX_CONFIG = {
  SPEED: 0.5
};

// セレクター定数
export const SELECTORS = {
  // ナビゲーション
  HAMBURGER: '.hamburger',
  NAV_MENU: '.nav-menu',
  NAV_LINKS: '.nav-link',
  NAVBAR: '.navbar',
  
  // セクション
  SECTIONS: 'section',
  HERO_VISUAL: '.hero-visual',
  
  // スキル
  FILTER_BUTTONS: '.filter-btn',
  CATEGORY_SECTIONS: '.skill-category-section',
  SKILL_BARS: '.skill-progress',
  SKILL_CATEGORY: '.skill-category',
  SKILL_CARDS: '.skill-card',
  SKILL_MODAL: '#skill-modal',
  
  // プロジェクト
  PROJECT_CARDS: '.project-card',
  
  // フォーム
  FORM: '.form',
  FORM_INPUTS: '.form-input',
  
  // その他
  PARTICLES_CONTAINER: '#particles-container',
  LAZY_ELEMENTS: '[data-src]',
  ABOUT_CONTENT: '.about-content',
  CONTACT_CONTENT: '.contact-content'
};

// 属性名
export const ATTRIBUTES = {
  DATA_CATEGORY: 'data-category',
  DATA_PROGRESS: 'data-progress',
  DATA_SRC: 'data-src',
  DATA_TECH: 'data-tech',
  HREF: 'href'
};

// スキル詳細データ
export const SKILL_DETAILS = {
  // Frontend
  html: {
    name: 'HTML',
    level: '上級',
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
    level: '中級',
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
    level: '中級',
    frequency: '週4回程度',
    usage: 'Webアプリケーション開発',
    experience: '2020年6月〜',
    comment: 'HTML/CSSと組み合わせて使用しています。モダンなフロントエンドを作成するために勉強中です。',
    links: {
      official: 'https://developer.mozilla.org/ja/docs/Web/JavaScript',
      github: null
    }
  },
  
  // Backend
  nodejs: {
    name: 'Node.js',
    level: '中級',
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
    level: '上級',
    frequency: '週5-7回',
    usage: 'AI/ML開発、データ分析、自動化スクリプト、ロボット制御',
    experience: '2022年4月〜',
    comment: 'とりあえずPythonを書いておけば何とかなると思いがちな言語。幅広い分野で活用しています。',
    links: {
      official: 'https://www.python.org/',
      github: 'https://github.com/python/cpython'
    }
  },
  elixir: {
    name: 'Elixir',
    level: '初級',
    frequency: '週1-2回',
    usage: 'Webアプリケーション開発、並行処理',
    experience: '2024年10月〜',
    comment: '関数型プログラミングの学習として使用中。並行処理の美しさに魅了されています。',
    links: {
      official: 'https://elixir-lang.org/',
      github: 'https://github.com/elixir-lang/elixir'
    }
  },
  phoenix: {
    name: 'Phoenix',
    level: '初級',
    frequency: '週1-2回',
    usage: 'リアルタイムWebアプリケーション開発',
    experience: '2024年10月〜',
    comment: 'ElixirのWebフレームワーク。LiveViewの機能に興味があります。',
    links: {
      official: 'https://www.phoenixframework.org/',
      github: 'https://github.com/phoenixframework/phoenix'
    }
  },
  cpp: {
    name: 'C++',
    level: '中級',
    frequency: '週2-4回',
    usage: 'ロボット制御、組み込みシステム、競技プログラミング',
    experience: '2020年4月〜',
    comment: 'ロボコンでのロボット制御に使用。メモリ管理の理解が深まりました。',
    links: {
      official: 'https://isocpp.org/',
      github: null
    }
  },
  
  // AI/ML
  pytorch: {
    name: 'PyTorch',
    level: '中級',
    frequency: '週3-5回',
    usage: 'ディープラーニングモデルの構築・学習',
    experience: '2023年4月〜',
    comment: '画像認識や自然言語処理のモデル構築に使用。柔軟性の高さが魅力です。',
    links: {
      official: 'https://pytorch.org/',
      github: 'https://github.com/pytorch/pytorch'
    }
  },
  numpy: {
    name: 'NumPy',
    level: '上級',
    frequency: '週5-7回',
    usage: '数値計算、配列操作、データ処理',
    experience: '2022年4月〜',
    comment: 'Pythonでの数値計算には欠かせないライブラリ。高速な配列操作が可能です。',
    links: {
      official: 'https://numpy.org/',
      github: 'https://github.com/numpy/numpy'
    }
  },
  pandas: {
    name: 'Pandas',
    level: '中級',
    frequency: '週3-5回',
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
    level: '中級',
    frequency: '週2-4回',
    usage: '画像処理、物体検出、カメラ制御',
    experience: '2023年10月〜',
    comment: 'ロボコンでの画像認識やカメラ制御に活用。リアルタイム処理が強力です。',
    links: {
      official: 'https://opencv.org/',
      github: 'https://github.com/opencv/opencv'
    }
  },
  
  // Tools
  docker: {
    name: 'Docker',
    level: '中級',
    frequency: '週3-5回',
    usage: '開発環境構築、コンテナ化、デプロイ',
    experience: '2023年4月〜',
    comment: '開発環境の統一に便利。複数プロジェクトの環境管理が楽になりました。',
    links: {
      official: 'https://www.docker.com/',
      github: 'https://github.com/docker'
    }
  },
  git: {
    name: 'Git',
    level: '上級',
    frequency: '毎日',
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
    level: '上級',
    frequency: '毎日',
    usage: 'コード管理、CI/CD、プロジェクト管理',
    experience: '2020年4月〜',
    comment: 'ポートフォリオやプロジェクトの管理に活用。GitHub Actionsも使用しています。',
    links: {
      official: 'https://github.com',
      github: null
    }
  },
  gitlab: {
    name: 'GitLab',
    level: '中級',
    frequency: '週1-2回',
    usage: 'コード管理、CI/CD、プライベートリポジトリ',
    experience: '2023年4月〜',
    comment: '学校のプロジェクトで使用。CI/CDパイプラインの構築が便利です。',
    links: {
      official: 'https://about.gitlab.com/',
      github: 'https://gitlab.com/gitlab-org/gitlab'
    }
  },
  vscode: {
    name: 'VS Code',
    level: '上級',
    frequency: '毎日',
    usage: 'コード編集、デバッグ、拡張機能開発',
    experience: '2020年4月〜',
    comment: 'メインエディタとして使用。豊富な拡張機能で開発効率が向上しています。',
    links: {
      official: 'https://code.visualstudio.com/',
      github: 'https://github.com/microsoft/vscode'
    }
  },
  visualstudio: {
    name: 'Visual Studio',
    level: '中級',
    frequency: '週1-2回',
    usage: 'C++開発、デバッグ、プロファイリング',
    experience: '2023年4月〜',
    comment: 'C++での開発に使用。強力なデバッガーとプロファイラーが魅力です。',
    links: {
      official: 'https://visualstudio.microsoft.com/',
      github: null
    }
  },
  zed: {
    name: 'Zed',
    level: '初級',
    frequency: '週1-2回',
    usage: '軽量なコード編集',
    experience: '2024年6月〜',
    comment: '高速で軽量なエディタ。シンプルなUIが気に入っています。',
    links: {
      official: 'https://zed.dev/',
      github: 'https://github.com/zed-industries/zed'
    }
  }
};
