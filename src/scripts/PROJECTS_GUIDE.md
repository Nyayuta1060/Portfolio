# プロジェクト管理ガイド

このドキュメントでは、ポートフォリオサイトに新しいプロジェクトを追加する方法を説明します。

## 📋 目次

- [プロジェクトの追加方法](#プロジェクトの追加方法)
- [データ構造の説明](#データ構造の説明)
- [画像の追加](#画像の追加)
- [HTMLへの追加](#htmlへの追加)

## 🚀 プロジェクトの追加方法

### ステップ1: プロジェクトデータを追加

`src/scripts/projectsData.js` ファイルを開き、`PROJECT_DETAILS` オブジェクトに新しいプロジェクトを追加します。

```javascript
// 例: React Blogを追加する場合
'react-blog': {
  name: 'React Blog',
  description: 'ReactとTypeScriptで構築したブログシステム',
  type: PROJECT_TYPE.WEB_APP,
  status: PROJECT_STATUS.COMPLETED,
  featured: true,  // 注目プロジェクトにする場合
  period: '2024年9月〜2024年12月',
  role: 'フルスタック開発',
  technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
  image: {
    type: 'file',  // 画像ファイルを使用
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
}
```

### ステップ2: 画像を追加（オプション）

プロジェクト画像を使用する場合は、`src/assets/projects/` ディレクトリに配置します。

```
src/assets/projects/react-blog.png
```

**画像の要件:**
- ファイル名: プロジェクトIDと同じ (例: `react-blog.png`)
- 推奨サイズ: 横800px以上
- アスペクト比: 16:9 または 4:3
- 形式: PNG, JPG, WebP
- 最大ファイルサイズ: 500KB以下推奨

### ステップ3: HTMLにカードを追加

`index.html` のプロジェクトセクションに、新しいプロジェクトカードを追加します。

```html
<!-- 通常のプロジェクト -->
<a href="[GitHub URL]" class="project-card-link" target="_blank" rel="noopener noreferrer" aria-label="[プロジェクト名]のGitHubリポジトリを開く">
  <div class="project-card" data-project="react-blog">
    <div class="project-image">
      <img src="./src/assets/projects/react-blog.png" alt="React Blog" loading="lazy">
    </div>
    <div class="project-info">
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

<!-- Featured（注目）プロジェクトの場合 -->
<a href="[GitHub URL]" class="project-card-link" target="_blank" rel="noopener noreferrer" aria-label="[プロジェクト名]のGitHubリポジトリを開く">
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
```

**重要なポイント:**
- `data-project` 属性: `projectsData.js` のプロジェクトIDと一致させる
- `featured` クラス: 注目プロジェクトの場合に追加（グリッドで大きく表示される）

## 📊 データ構造の説明

### プロジェクトステータス (PROJECT_STATUS)

```javascript
COMPLETED    // 完成: プロジェクトが完了している
IN_PROGRESS  // 進行中: 現在開発中
ARCHIVED     // アーカイブ済み: 保守終了
PLANNING     // 計画中: これから始める予定
```

### プロジェクトタイプ (PROJECT_TYPE)

```javascript
WEB_APP      // Webアプリケーション
CLI_TOOL     // CLIツール
LIBRARY      // ライブラリ/フレームワーク
AUTOMATION   // 自動化ツール
GAME         // ゲーム
ROBOT        // ロボット関連
AI_ML        // AI/機械学習
OTHER        // その他
```

### 画像タイプ (image.type)

```javascript
'file'        // 画像ファイルを使用
'icon'        // Font Awesomeアイコンを使用
'placeholder' // プレースホルダー（アイコン+背景色）
```

## 🖼️ 画像の設定パターン

### パターン1: 画像ファイルを使用

```javascript
image: {
  type: 'file',
  src: './src/assets/projects/my-project.png',
  alt: 'My Project'
}
```

HTMLでの使用:
```html
<div class="project-image">
  <img src="./src/assets/projects/my-project.png" alt="My Project" loading="lazy">
</div>
```

### パターン2: Font Awesomeアイコンを使用

```javascript
image: {
  type: 'icon',
  icon: 'fas fa-rocket'  // Font Awesomeのクラス名
}
```

HTMLでの使用:
```html
<div class="project-image">
  <div class="project-placeholder">
    <i class="fas fa-rocket"></i>
  </div>
</div>
```

### よく使うアイコン

```javascript
'fas fa-globe'        // Webサイト
'fas fa-mobile-alt'   // モバイルアプリ
'fas fa-robot'        // ロボット/AI
'fas fa-gamepad'      // ゲーム
'fas fa-code'         // コード/ライブラリ
'fas fa-terminal'     // CLI
'fas fa-cogs'         // 自動化/ツール
'fa-solid fa-language' // 翻訳
'fa-solid fa-bullhorn' // 通知/アラート
```

## 💡 Featured（注目）プロジェクト

特に強調したいプロジェクトは `featured: true` に設定します。

**特徴:**
- グリッドで2倍のサイズで表示される
- "Featured" バッジが表示される
- より目立つ配置になる

**推奨:**
- 最大2〜3個程度に絞る
- 最も力を入れたプロジェクト
- 技術的に高度なプロジェクト

## 📝 技術タグ（technologies）

プロジェクトで使用した技術を配列で指定します。

```javascript
technologies: [
  'HTML',
  'CSS', 
  'JavaScript',
  'React',
  'Node.js',
  'MongoDB',
  'Docker'
]
```

**HTMLでの表示:**
```html
<div class="project-tech-tags">
  <span class="tech-tag">HTML</span>
  <span class="tech-tag">CSS</span>
  <span class="tech-tag">JavaScript</span>
</div>
```

## 🔗 リンクの設定

```javascript
links: {
  github: 'https://github.com/username/project',  // 必須
  demo: 'https://demo.example.com',               // オプション
  article: 'https://blog.example.com/article'     // オプション
}
```

- **github**: GitHubリポジトリURL（必須）
- **demo**: デモサイトURL（なければ `null`）
- **article**: 解説記事URL（なければ `null`）

## ✅ チェックリスト

新しいプロジェクトを追加する際は、以下を確認してください:

- [ ] `projectsData.js` にプロジェクトデータを追加
- [ ] プロジェクト画像を `src/assets/projects/` に配置（画像使用の場合）
- [ ] `index.html` にプロジェクトカードを追加
- [ ] `data-project` 属性がプロジェクトIDと一致
- [ ] 技術タグが正確
- [ ] GitHubリンクが正しい
- [ ] 画像パスが正しい（画像使用の場合）
- [ ] ブラウザで表示を確認
- [ ] レスポンシブデザインの確認

## 💡 便利なヘルパー関数

`projectsData.js` には以下のヘルパー関数が用意されています:

```javascript
// プロジェクトが存在するかチェック
hasProject('react-blog')  // true/false

// プロジェクト詳細を取得
getProjectDetails('react-blog')  // { name: '...', ... }

// Featuredプロジェクトを取得
getFeaturedProjects()  // [{ id: '...', name: '...', ... }]

// ステータスでフィルタ
getProjectsByStatus(PROJECT_STATUS.COMPLETED)

// タイプでフィルタ
getProjectsByType(PROJECT_TYPE.WEB_APP)

// 使用技術でフィルタ
getProjectsByTechnology('React')

// 全プロジェクトIDを取得
getAllProjectIds()  // ['portfolio', 'nulltasker', ...]

// プロジェクト数を取得
getProjectCount()  // 4

// 全プロジェクトを取得
getAllProjects()  // [{ id: '...', name: '...', ... }]

// ソートして取得
getSortedProjects('name', 'asc')
```

## 🔧 トラブルシューティング

### 画像が表示されない
- ファイル名が正しいか確認 (大文字小文字に注意)
- 画像パスが正しいか確認
- 画像ファイルが正しいディレクトリにあるか確認
- 画像形式がサポートされているか確認（PNG, JPG, WebP）

### カードのレイアウトが崩れる
- HTMLの構造が正しいか確認
- 必要なクラス名がすべて含まれているか確認
- `project-card-link` で囲まれているか確認

### Featured プロジェクトが大きく表示されない
- `featured` クラスが `project-card` に追加されているか確認
- `projectsData.js` で `featured: true` に設定されているか確認

## 📚 参考例

完全な例として、既存のプロジェクト (`nulltasker`, `portfolio` など) を参考にしてください。

### 最小構成の例

```javascript
// projectsData.js
'simple-project': {
  name: 'Simple Project',
  description: 'シンプルなプロジェクト',
  type: PROJECT_TYPE.OTHER,
  status: PROJECT_STATUS.COMPLETED,
  featured: false,
  period: '2024年10月',
  role: '個人開発',
  technologies: ['Python'],
  image: {
    type: 'icon',
    icon: 'fas fa-code'
  },
  links: {
    github: 'https://github.com/username/simple-project',
    demo: null,
    article: null
  },
  highlights: [
    'シンプルで使いやすい',
    '軽量で高速'
  ]
}
```

### フル機能の例

```javascript
// projectsData.js
'advanced-project': {
  name: 'Advanced Project',
  description: '高度な機能を持つWebアプリケーション',
  type: PROJECT_TYPE.WEB_APP,
  status: PROJECT_STATUS.IN_PROGRESS,
  featured: true,
  period: '2024年6月〜現在',
  role: 'テックリード、フルスタック開発',
  technologies: [
    'React', 
    'TypeScript', 
    'Node.js', 
    'Express',
    'PostgreSQL',
    'Redis',
    'Docker',
    'AWS'
  ],
  image: {
    type: 'file',
    src: './src/assets/projects/advanced-project.png',
    alt: 'Advanced Project'
  },
  links: {
    github: 'https://github.com/username/advanced-project',
    demo: 'https://demo.example.com',
    article: 'https://blog.example.com/advanced-project'
  },
  highlights: [
    'マイクロサービスアーキテクチャの採用',
    'リアルタイム通信機能の実装',
    'CI/CDパイプラインの構築',
    '10万ユーザー規模に対応可能'
  ]
}
```

## 🎨 カスタマイズのヒント

### 画像のアスペクト比

通常のプロジェクト: **200px (高さ)**
Featuredプロジェクト: **300px (高さ)**

画像は自動的にカバー表示されるため、適切な構図を選びましょう。

### 技術タグの色

技術タグは自動的に統一されたスタイルで表示されます。
カスタムカラーが必要な場合は、CSSで調整してください。

---

**質問やサポートが必要な場合は、GitHubのIssueを作成してください!**
