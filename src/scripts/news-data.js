// 記事データ（自動生成 - 2025/9/18 19:11:34）
const newsData = [];

const categories = [
    "Deep Learning",
    "Programming",
    "NLP",
    "Data Science",
    "Web Development",
    "AI Research",
    "Competition",
    "Study Notes"
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