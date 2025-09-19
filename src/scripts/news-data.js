// 記事データ（自動生成 - 2025/9/19 10:58:01）
const newsData = [
    {
        "id": "2025-09-18-markdown",
        "title": "Markdown対応の執筆テンプレート生成スクリプトを作成",
        "date": "2025-09-18",
        "category": "Web Development",
        "tags": [
            "JavaScript",
            "効率化"
        ],
        "author": "Nyayuta",
        "excerpt": "本ポートフォリオのNewsページを作成するにあたり、テンプレートを発展させたものを作成し、効率化を図りました。",
        "content": "# Markdown対応の執筆テンプレート生成スクリプトを作成\n\n## はじめに\n\nこのPortfolioを作るにあたり、今後も更新していくことを見越し、面倒くさがりな私は少しでも楽ができるようなスクリプトを作ろうと考えました。\n\n## 本文\n\n詳細は `/src/articles/README.md`に書かれていますが、このスクリプトには\n\n- Markdownのテンプレートの作成を半自動的に行う\n- Markdownの記事をjsonに変換する\n\nという目標で作成しました。\n\n最初は非公開で行こうかとも考えましたが、悩んだ末GithubにPushすることにしました。なのでこのスクリプトは勝手に使ってもらっても大丈夫です。作成にあまり時間はかからなかったので、かなり効率化できたのではないかなと思います。\n\nもしかしたらこれを発展させたソフトウェアを作るかもしれません。\n\n\n---\n\n*この記事がお役に立てば幸いです。質問やフィードバックがあれば、お気軽にお声かけください。*",
        "contentHtml": "<h1>Markdown対応の執筆テンプレート生成スクリプトを作成</h1>\n\n<h2>はじめに</h2>\n\n<p>このPortfolioを作るにあたり、今後も更新していくことを見越し、面倒くさがりな私は少しでも楽ができるようなスクリプトを作ろうと考えました。</p>\n\n<h2>本文</h2>\n\n<p>詳細は <code>/src/articles/README.md</code>に書かれていますが、このスクリプトには</p>\n\n<ul><li>Markdownのテンプレートの作成を半自動的に行う</li>\n<li>Markdownの記事をjsonに変換する</li>\n\n<p></ul>という目標で作成しました。</p>\n\n<p>最初は非公開で行こうかとも考えましたが、悩んだ末GithubにPushすることにしました。なのでこのスクリプトは勝手に使ってもらっても大丈夫です。作成にあまり時間はかからなかったので、かなり効率化できたのではないかなと思います。</p>\n\n<p>もしかしたらこれを発展させたソフトウェアを作るかもしれません。</p>\n\n<hr>\n\n<p><em>この記事がお役に立てば幸いです。質問やフィードバックがあれば、お気軽にお声かけください。</em></p>",
        "readTime": "1分",
        "featured": false,
        "url": "/articles/2025-09-18-markdown.html"
    }
];

const categories = [
    "Programming",
    "Web Development",
    "Data Science",
    "Machine Learning",
    "Deep Learning",
    "NLP",
    "AI Research",
    "Competition",
    "Study Notes",
    "DevOps",
    "Tutorial"
];

// ヘルパー関数
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).replace(/\//g, '.');
}

function filterByCategory(category) {
    if (category === 'all') return newsData;
    return newsData.filter(article => article.category === category);
}

function searchArticles(keyword) {
    const lowercaseKeyword = keyword.toLowerCase();
    return newsData.filter(article => 
        article.title.toLowerCase().includes(lowercaseKeyword) ||
        article.excerpt.toLowerCase().includes(lowercaseKeyword) ||
        article.tags.some(tag => tag.toLowerCase().includes(lowercaseKeyword))
    );
}

function getLatestArticles(count = 3) {
    return newsData.slice(0, count);
}

function getFeaturedArticles() {
    return newsData.filter(article => article.featured);
}

function getArticlesByCategory(category) {
    return newsData.filter(article => article.category === category);
}

function getThisMonthCount() {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    return newsData.filter(article => {
        const articleDate = new Date(article.date);
        return articleDate.getMonth() === currentMonth && 
               articleDate.getFullYear() === currentYear;
    }).length;
}

function getArticleById(id) {
    return newsData.find(article => article.id === id);
}

// エクスポート（Node.jsとブラウザの両方に対応）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        newsData, categories, formatDate, filterByCategory,
        searchArticles, getLatestArticles, getFeaturedArticles,
        getArticlesByCategory, getThisMonthCount, getArticleById
    };
}