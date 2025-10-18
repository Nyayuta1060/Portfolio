// ========== 新しいプロジェクトを追加するためのテンプレート ==========
// このファイルをコピーして、projectsData.js に追加してください

/**
 * プロジェクト追加のクイックテンプレート
 * 
 * 1. このテンプレートをコピー
 * 2. 各フィールドを埋める
 * 3. projectsData.js の PROJECT_DETAILS に貼り付け
 * 4. 画像を src/assets/projects/ に追加（画像使用の場合）
 * 5. index.html に<a class="project-card-link">を追加
 */

// ========== JavaScript データテンプレート ==========

'project-id': {  // プロジェクトを識別するID (英小文字、ハイフン可)
  name: '',  // プロジェクト名
  description: '',  // 簡潔な説明（1〜2文）
  type: PROJECT_TYPE.WEB_APP,  // WEB_APP, CLI_TOOL, LIBRARY, AUTOMATION, GAME, ROBOT, AI_ML, OTHER
  status: PROJECT_STATUS.COMPLETED,  // COMPLETED, IN_PROGRESS, ARCHIVED, PLANNING
  featured: false,  // 注目プロジェクトにする場合は true
  period: '年月〜年月',  // 開発期間
  role: '',  // 担当した役割
  technologies: [],  // 使用技術の配列 ['HTML', 'CSS', 'JavaScript']
  image: {
    type: 'file',  // 'file', 'icon', 'placeholder' から選択
    src: './src/assets/projects/project-id.png',  // type='file'の場合
    alt: '',  // 画像の代替テキスト
    // icon: 'fas fa-code'  // type='icon'の場合はこちらを使用
  },
  links: {
    github: '',  // GitHub URL（必須）
    demo: null,  // デモURL（なければ null）
    article: null  // 記事URL（なければ null）
  },
  highlights: [
    // プロジェクトの特徴や成果
    '',
    ''
  ]
},

// ========== HTML カードテンプレート（通常） ==========

<a href="[GitHub URL]" class="project-card-link" target="_blank" rel="noopener noreferrer" aria-label="[プロジェクト名]のGitHubリポジトリを開く">
  <div class="project-card" data-project="project-id">
    <div class="project-image">
      <img src="./src/assets/projects/project-id.png" alt="Project Name" loading="lazy">
    </div>
    <div class="project-info">
      <h3 class="project-title">Project Name</h3>
      <p class="project-description">プロジェクトの説明</p>
      <div class="project-tech-tags">
        <span class="tech-tag">Tech1</span>
        <span class="tech-tag">Tech2</span>
        <span class="tech-tag">Tech3</span>
      </div>
    </div>
    <div class="project-links">
      <span class="project-link-btn">
        <i class="fab fa-github"></i>
        GitHub
      </span>
    </div>
  </div>
</a>

// ========== HTML カードテンプレート（Featured） ==========

<a href="[GitHub URL]" class="project-card-link" target="_blank" rel="noopener noreferrer" aria-label="[プロジェクト名]のGitHubリポジトリを開く">
  <div class="project-card featured" data-project="project-id">
    <div class="project-image">
      <img src="./src/assets/projects/project-id.png" alt="Project Name" loading="lazy">
    </div>
    <div class="project-info">
      <div class="project-badge">Featured</div>
      <h3 class="project-title">Project Name</h3>
      <p class="project-description">プロジェクトの説明</p>
      <div class="project-tech-tags">
        <span class="tech-tag">Tech1</span>
        <span class="tech-tag">Tech2</span>
        <span class="tech-tag">Tech3</span>
      </div>
    </div>
    <div class="project-links">
      <span class="project-link-btn">
        <i class="fab fa-github"></i>
        GitHub
      </span>
    </div>
  </div>
</a>

// ========== HTML カードテンプレート（アイコン使用） ==========

<a href="[GitHub URL]" class="project-card-link" target="_blank" rel="noopener noreferrer" aria-label="[プロジェクト名]のGitHubリポジトリを開く">
  <div class="project-card" data-project="project-id">
    <div class="project-image">
      <div class="project-placeholder">
        <i class="fas fa-code"></i>
      </div>
    </div>
    <div class="project-info">
      <h3 class="project-title">Project Name</h3>
      <p class="project-description">プロジェクトの説明</p>
      <div class="project-tech-tags">
        <span class="tech-tag">Tech1</span>
        <span class="tech-tag">Tech2</span>
      </div>
    </div>
    <div class="project-links">
      <span class="project-link-btn">
        <i class="fab fa-github"></i>
        GitHub
      </span>
    </div>
  </div>
</a>

// ========== 実例 1: Webアプリケーション（Featured） ==========

'react-blog': {
  name: 'React Blog',
  description: 'ReactとTypeScriptで構築したブログシステム',
  type: PROJECT_TYPE.WEB_APP,
  status: PROJECT_STATUS.COMPLETED,
  featured: true,
  period: '2024年9月〜2024年12月',
  role: 'フルスタック開発',
  technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
  image: {
    type: 'file',
    src: './src/assets/projects/react-blog.png',
    alt: 'React Blog'
  },
  links: {
    github: 'https://github.com/username/react-blog',
    demo: 'https://demo.example.com',
    article: 'https://blog.example.com/article'
  },
  highlights: [
    'マークダウンエディタの実装',
    'RESTful APIの設計',
    '認証機能の実装'
  ]
},

// HTML:
<a href="https://github.com/username/react-blog" class="project-card-link" target="_blank" rel="noopener noreferrer" aria-label="React BlogのGitHubリポジトリを開く">
  <div class="project-card featured" data-project="react-blog">
    <div class="project-image">
      <img src="./src/assets/projects/react-blog.png" alt="React Blog" loading="lazy">
    </div>
    <div class="project-info">
      <div class="project-badge">Featured</div>
      <h3 class="project-title">React Blog</h3>
      <p class="project-description">ReactとTypeScriptで構築したブログシステム</p>
      <div class="project-tech-tags">
        <span class="tech-tag">React</span>
        <span class="tech-tag">TypeScript</span>
        <span class="tech-tag">Node.js</span>
        <span class="tech-tag">MongoDB</span>
      </div>
    </div>
    <div class="project-links">
      <span class="project-link-btn">
        <i class="fab fa-github"></i>
        GitHub
      </span>
    </div>
  </div>
</a>

// ========== 実例 2: CLIツール（アイコン使用） ==========

'cli-analyzer': {
  name: 'CLI Analyzer',
  description: 'コマンドラインからコード品質を分析するツール',
  type: PROJECT_TYPE.CLI_TOOL,
  status: PROJECT_STATUS.IN_PROGRESS,
  featured: false,
  period: '2025年1月〜',
  role: '個人開発',
  technologies: ['Python', 'Click'],
  image: {
    type: 'icon',
    icon: 'fas fa-terminal'
  },
  links: {
    github: 'https://github.com/username/cli-analyzer',
    demo: null,
    article: null
  },
  highlights: [
    'コード品質の自動分析',
    'カスタマイズ可能なルール',
    'CI/CDとの統合'
  ]
},

// HTML:
<a href="https://github.com/username/cli-analyzer" class="project-card-link" target="_blank" rel="noopener noreferrer" aria-label="CLI AnalyzerのGitHubリポジトリを開く">
  <div class="project-card" data-project="cli-analyzer">
    <div class="project-image">
      <div class="project-placeholder">
        <i class="fas fa-terminal"></i>
      </div>
    </div>
    <div class="project-info">
      <h3 class="project-title">CLI Analyzer</h3>
      <p class="project-description">コマンドラインからコード品質を分析するツール</p>
      <div class="project-tech-tags">
        <span class="tech-tag">Python</span>
        <span class="tech-tag">Click</span>
      </div>
    </div>
    <div class="project-links">
      <span class="project-link-btn">
        <i class="fab fa-github"></i>
        GitHub
      </span>
    </div>
  </div>
</a>

// ========== 実例 3: ロボット関連 ==========

'robot-controller': {
  name: 'Robot Controller',
  description: 'Pythonで実装したロボット制御システム',
  type: PROJECT_TYPE.ROBOT,
  status: PROJECT_STATUS.COMPLETED,
  featured: false,
  period: '2024年4月〜2024年9月',
  role: '制御システム開発',
  technologies: ['Python', 'ROS', 'C++', 'OpenCV'],
  image: {
    type: 'icon',
    icon: 'fas fa-robot'
  },
  links: {
    github: 'https://github.com/username/robot-controller',
    demo: null,
    article: 'https://blog.example.com/robot'
  },
  highlights: [
    '自律走行機能の実装',
    '画像認識による物体検出',
    'ROSを使った通信システム'
  ]
},

// ========== 実例 4: ゲーム ==========

'puzzle-game': {
  name: 'Puzzle Game',
  description: 'JavaScriptで作成したパズルゲーム',
  type: PROJECT_TYPE.GAME,
  status: PROJECT_STATUS.COMPLETED,
  featured: false,
  period: '2024年7月',
  role: '個人開発',
  technologies: ['JavaScript', 'HTML Canvas', 'CSS'],
  image: {
    type: 'file',
    src: './src/assets/projects/puzzle-game.png',
    alt: 'Puzzle Game'
  },
  links: {
    github: 'https://github.com/username/puzzle-game',
    demo: 'https://game.example.com',
    article: null
  },
  highlights: [
    'スムーズなアニメーション',
    'レベルシステムの実装',
    'ハイスコア機能'
  ]
},

// ========== 利用可能な定数 ==========

// プロジェクトタイプ
PROJECT_TYPE.WEB_APP      // Webアプリケーション
PROJECT_TYPE.CLI_TOOL     // CLIツール
PROJECT_TYPE.LIBRARY      // ライブラリ
PROJECT_TYPE.AUTOMATION   // 自動化ツール
PROJECT_TYPE.GAME         // ゲーム
PROJECT_TYPE.ROBOT        // ロボット関連
PROJECT_TYPE.AI_ML        // AI/ML
PROJECT_TYPE.OTHER        // その他

// プロジェクトステータス
PROJECT_STATUS.COMPLETED    // 完成
PROJECT_STATUS.IN_PROGRESS  // 進行中
PROJECT_STATUS.ARCHIVED     // アーカイブ済み
PROJECT_STATUS.PLANNING     // 計画中

// よく使うアイコン
'fas fa-globe'        // Webサイト
'fas fa-mobile-alt'   // モバイルアプリ
'fas fa-robot'        // ロボット/AI
'fas fa-gamepad'      // ゲーム
'fas fa-code'         // コード/ライブラリ
'fas fa-terminal'     // CLI
'fas fa-cogs'         // 自動化/ツール
'fa-solid fa-language' // 翻訳
'fa-solid fa-bullhorn' // 通知/アラート
'fas fa-rocket'       // スタートアップ/高速
'fas fa-shield-alt'   // セキュリティ
'fas fa-chart-line'   // データ分析

// ========== チェックリスト ==========
/*
□ プロジェクトIDを決定 (英小文字、ハイフン可)
□ projectsData.js にデータを追加
□ 画像を src/assets/projects/ に配置（画像使用の場合）
□ index.html にプロジェクトカードを追加
□ data-project 属性がプロジェクトIDと一致
□ 技術タグが正確
□ GitHubリンクが正しい
□ Featured設定が適切（多すぎないか）
□ ブラウザで表示確認
□ レスポンシブデザインの確認
*/
