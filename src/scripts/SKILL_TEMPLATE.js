// ========== 新しいスキルを追加するためのテンプレート ==========
// このファイルをコピーして、skillsData.js に追加してください

/**
 * スキル追加のクイックテンプレート
 * 
 * 1. このテンプレートをコピー
 * 2. 各フィールドを埋める
 * 3. skillsData.js の適切なカテゴリセクションに貼り付け
 * 4. 画像を src/assets/skillstocks/ に追加
 * 5. index.html に<div class="skill-card">を追加
 */

// ========== JavaScript データテンプレート ==========

skillId: {  // スキルを識別するID (英小文字、ハイフン可)
  name: '',  // 表示名
  category: CATEGORIES.FRONTEND,  // FRONTEND, BACKEND, AI_ML, TOOLS から選択
  level: SKILL_LEVELS.INTERMEDIATE,  // BEGINNER, INTERMEDIATE, ADVANCED, EXPERT から選択
  frequency: FREQUENCY.WEEKLY_3_5,  // 使用頻度 (定数を参照)
  usage: '',  // 主な使用用途 (簡潔に)
  experience: '年月〜',  // 使用開始時期
  comment: '',  // 個人的なコメントや学習メモ
  links: {
    official: '',  // 公式サイトURL (なければ null)
    github: ''  // GitHub URL (なければ null)
  }
},

// ========== HTML カードテンプレート ==========

<div class="skill-card" data-tech="skillId" data-category="category">
  <div class="skill-image">
    <img src="./src/assets/skillstocks/skillId.png" alt="Skill Name" loading="lazy">
  </div>
  <div class="skill-name">Skill Name</div>
</div>

// ========== 実例 1: React ==========

react: {
  name: 'React',
  category: CATEGORIES.FRONTEND,
  level: SKILL_LEVELS.INTERMEDIATE,
  frequency: FREQUENCY.WEEKLY_3_5,
  usage: 'フロントエンド開発、SPA構築',
  experience: '2024年1月〜',
  comment: 'モダンなUIライブラリ。コンポーネント設計を学習中です。',
  links: {
    official: 'https://react.dev/',
    github: 'https://github.com/facebook/react'
  }
},

// HTML:
<div class="skill-card" data-tech="react" data-category="frontend">
  <div class="skill-image">
    <img src="./src/assets/skillstocks/react.png" alt="React" loading="lazy">
  </div>
  <div class="skill-name">React</div>
</div>

// ========== 実例 2: PostgreSQL ==========

postgresql: {
  name: 'PostgreSQL',
  category: CATEGORIES.BACKEND,
  level: SKILL_LEVELS.INTERMEDIATE,
  frequency: FREQUENCY.WEEKLY_2_4,
  usage: 'リレーショナルデータベース、データ管理',
  experience: '2023年6月〜',
  comment: '信頼性の高いRDBMS。複雑なクエリも書けるようになってきました。',
  links: {
    official: 'https://www.postgresql.org/',
    github: 'https://github.com/postgres/postgres'
  }
},

// HTML:
<div class="skill-card" data-tech="postgresql" data-category="backend">
  <div class="skill-image">
    <img src="./src/assets/skillstocks/postgresql.png" alt="PostgreSQL" loading="lazy">
  </div>
  <div class="skill-name">PostgreSQL</div>
</div>

// ========== 実例 3: TensorFlow ==========

tensorflow: {
  name: 'TensorFlow',
  category: CATEGORIES.AI_ML,
  level: SKILL_LEVELS.BEGINNER,
  frequency: FREQUENCY.MONTHLY,
  usage: '機械学習モデルの構築と訓練',
  experience: '2024年9月〜',
  comment: 'PyTorchの代替として学習中。Google製で豊富なリソースがあります。',
  links: {
    official: 'https://www.tensorflow.org/',
    github: 'https://github.com/tensorflow/tensorflow'
  }
},

// HTML:
<div class="skill-card" data-tech="tensorflow" data-category="ai-ml">
  <div class="skill-image">
    <img src="./src/assets/skillstocks/tensorflow.png" alt="TensorFlow" loading="lazy">
  </div>
  <div class="skill-name">TensorFlow</div>
</div>

// ========== 実例 4: Figma ==========

figma: {
  name: 'Figma',
  category: CATEGORIES.TOOLS,
  level: SKILL_LEVELS.INTERMEDIATE,
  frequency: FREQUENCY.WEEKLY_1_2,
  usage: 'UIデザイン、プロトタイピング',
  experience: '2023年10月〜',
  comment: 'デザインツール。ワイヤーフレーム作成やUI設計に使用しています。',
  links: {
    official: 'https://www.figma.com/',
    github: null
  }
},

// HTML:
<div class="skill-card" data-tech="figma" data-category="tools">
  <div class="skill-image">
    <img src="./src/assets/skillstocks/figma.png" alt="Figma" loading="lazy">
  </div>
  <div class="skill-name">Figma</div>
</div>

// ========== 利用可能な定数 ==========

// カテゴリ
CATEGORIES.FRONTEND  // フロントエンド
CATEGORIES.BACKEND   // バックエンド
CATEGORIES.AI_ML     // AI/機械学習
CATEGORIES.TOOLS     // ツール

// スキルレベル
SKILL_LEVELS.BEGINNER      // 初級
SKILL_LEVELS.INTERMEDIATE  // 中級
SKILL_LEVELS.ADVANCED      // 上級
SKILL_LEVELS.EXPERT        // エキスパート

// 使用頻度
FREQUENCY.DAILY        // 毎日
FREQUENCY.WEEKLY_5_7   // 週5-7回
FREQUENCY.WEEKLY_3_5   // 週3-5回
FREQUENCY.WEEKLY_2_4   // 週2-4回
FREQUENCY.WEEKLY_1_2   // 週1-2回
FREQUENCY.MONTHLY      // 月2-4回
FREQUENCY.RARELY       // 稀に使用

// ========== チェックリスト ==========
/*
□ スキルIDを決定 (英小文字、ハイフン可)
□ skillsData.js にデータを追加
□ 画像を src/assets/skillstocks/ に配置 (skillId.png)
□ index.html の適切なカテゴリセクションにカードを追加
□ data-tech 属性がスキルIDと一致
□ data-category 属性がカテゴリと一致
□ ブラウザで表示確認
□ モーダルが正しく表示されるか確認
*/
