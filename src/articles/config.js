// 記事管理システムの設定ファイル（簡素版）

const config = {
  // 記事のメタデータ設定
  metadata: {
    requiredFields: ['title', 'excerpt', 'content', 'date', 'category', 'tags'],
    categories: [
    'Programming',
    'Web Development',
    'Data Science',
    'Machine Learning',
    'Deep Learning',
    'NLP',
    'AI Research',
    'Competition',
    'Study Notes',
    'DevOps',
    'Tutorial'
    ],
    defaultReadTime: '3分',
    defaultFeatured: false
  }
};

// Node.js環境での使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = config;
}