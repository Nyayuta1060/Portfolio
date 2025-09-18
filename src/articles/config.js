// 記事管理システムの設定ファイル（簡素版）

const config = {
    // 記事のメタデータ設定
    metadata: {
        requiredFields: ['title', 'excerpt', 'content', 'date', 'category', 'tags'],
        categories: [
            'Deep Learning',
            'Programming', 
            'NLP',
            'Data Science',
            'Web Development',
            'AI Research',
            'Competition',
            'Study Notes'
        ],
        defaultReadTime: '3分',
        defaultFeatured: false
    }
};

// Node.js環境での使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
}