// News.html専用JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Newsページの初期化
  if (document.getElementById('news-archive')) {
    initializeNewsPage();
  }
});

function initializeNewsPage() {
  // 統計情報の更新
  updateBlogStats();

  // カテゴリフィルターの生成
  generateCategoryFilters();

  // 最新記事の表示
  displayLatestPosts();

  // 全記事の表示
  displayAllArticles();

  // イベントリスナーの設定
  setupEventListeners();
}

// 統計情報の更新
function updateBlogStats() {
  const totalPostsElement = document.getElementById('total-posts');
  const thisMonthElement = document.getElementById('this-month');
  const totalCategoriesElement = document.getElementById('total-categories');

  if (totalPostsElement) {
    animateNumber(totalPostsElement, newsData.length);
  }

  if (thisMonthElement) {
    animateNumber(thisMonthElement, getThisMonthCount());
  }

  if (totalCategoriesElement) {
    animateNumber(totalCategoriesElement, categories.length);
  }
}

// 数値アニメーション
function animateNumber(element, target) {
  let current = 0;
  const increment = target / 20;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
    }, 50);
  }

  // カテゴリフィルターの生成
  function generateCategoryFilters() {
    const filterContainer = document.getElementById('category-filters');
    if (!filterContainer) return;

    // Allボタンはすでに存在するのでクリア
    filterContainer.innerHTML = '<button class="filter-btn active" data-category="all">All</button>';

    categories.forEach(category => {
      const button = document.createElement('button');
      button.className = 'filter-btn';
      button.setAttribute('data-category', category);
      button.textContent = category;
      filterContainer.appendChild(button);
    });
  }

  // 最新記事の表示
  function displayLatestPosts() {
    const container = document.getElementById('latest-posts');
    if (!container) return;

    const latestPosts = getLatestArticles(6); // 最新6件を表示
    container.innerHTML = '';

    latestPosts.forEach(article => {
      const articleElement = createArticleCard(article, true);
      container.appendChild(articleElement);
    });
  }

  // 全記事の表示
  function displayAllArticles() {
    const container = document.getElementById('news-archive');
    if (!container) return;

    displayArticles(newsData);
  }

  // 記事表示関数
  function displayArticles(articles) {
    const container = document.getElementById('news-archive');
    if (!container) return;

    container.innerHTML = '';

    if (articles.length === 0) {
      container.innerHTML = `
      <div class="no-results">
      <i class="fas fa-search"></i>
      <h3>記事が見つかりませんでした</h3>
      <p>検索条件を変更してお試しください。</p>
      </div>
      `;
      return;
    }

    articles.forEach(article => {
      const articleElement = createArticleCard(article, false);
      container.appendChild(articleElement);
    });
  }

  // 記事カード作成
  function createArticleCard(article, isLatest = false) {
    const card = document.createElement('article');
    card.className = `news-card ${article.featured ? 'featured' : ''}`;
      card.setAttribute('data-category', article.category);

      const tagsHTML = article.tags.map(tag =>
      `<span class="news-tag">${tag}</span>`
        ).join('');

        card.innerHTML = `
        <div class="news-card-header">
        <div class="news-date">${formatDate(article.date)}</div>
          <div class="news-category">${article.category}</div>
            ${article.featured ? '<div class="featured-badge"><i class="fas fa-star"></i> Featured</div>' : ''}
              </div>

              <div class="news-content">
              <h3 class="news-title">${article.title}</h3>
                <p class="news-excerpt">${article.excerpt}</p>

                  <div class="news-meta">
                  <span class="read-time">
                  <i class="fas fa-clock"></i> ${article.readTime}
                    </span>
                    <button class="read-more-btn" onclick="openArticleModal('${article.id}')">
                      <i class="fas fa-arrow-right"></i> 詳細を読む
                      </button>
                      </div>

                      <div class="news-tags">
                      ${tagsHTML}
                        </div>
                        </div>
                        `;

                        return card;
                      }

                      // 記事モーダル表示
                      function openArticleModal(articleId) {
                        const article = newsData.find(a => a.id === articleId);
                        if (!article) return;

                        // 既存のモーダルを削除
                        const existingModal = document.getElementById('article-modal');
                        if (existingModal) {
                          existingModal.remove();
                        }

                        // モーダル作成
                        const modal = document.createElement('div');
                        modal.id = 'article-modal';
                        modal.className = 'article-modal';

                        const tagsHTML = article.tags.map(tag =>
                        `<span class="news-tag">${tag}</span>`
                          ).join('');

                          modal.innerHTML = `
                          <div class="modal-overlay" onclick="closeArticleModal()"></div>
                          <div class="modal-content">
                          <div class="modal-header">
                          <div class="article-meta">
                          <span class="article-date">${formatDate(article.date)}</span>
                            <span class="article-category">${article.category}</span>
                              <span class="read-time">
                              <i class="fas fa-clock"></i> ${article.readTime}
                                </span>
                                </div>
                                <button class="modal-close" onclick="closeArticleModal()">
                                <i class="fas fa-times"></i>
                                </button>
                                </div>

                                <div class="modal-body">
                                <h1 class="article-title">${article.title}</h1>
                                  <div class="article-content">
                                  ${article.contentHtml || article.content}
                                    </div>
                                    <div class="article-tags">
                                    ${tagsHTML}
                                      </div>
                                      </div>
                                      </div>
                                      `;

                                      document.body.appendChild(modal);
                                      document.body.style.overflow = 'hidden';

                                      // アニメーション
                                      setTimeout(() => {
                                        modal.classList.add('active');
                                        }, 10);
                                      }

                                      // 記事モーダル閉じる
                                      function closeArticleModal() {
                                        const modal = document.getElementById('article-modal');
                                        if (modal) {
                                          modal.classList.remove('active');
                                          setTimeout(() => {
                                            modal.remove();
                                            document.body.style.overflow = '';
                                            }, 300);
                                          }
                                        }

                                        // イベントリスナー設定
                                        function setupEventListeners() {
                                          // カテゴリフィルター
                                          const filterButtons = document.querySelectorAll('.filter-btn');
                                          filterButtons.forEach(button => {
                                            button.addEventListener('click', function() {
                                              // アクティブボタンの更新
                                              filterButtons.forEach(btn => btn.classList.remove('active'));
                                              this.classList.add('active');

                                              // フィルタリング実行
                                              const category = this.getAttribute('data-category');
                                              const filteredArticles = filterByCategory(category);
                                              displayArticles(filteredArticles);
                                            });
                                          });

                                          // 検索機能
                                          const searchInput = document.getElementById('search-input');
                                          if (searchInput) {
                                            let searchTimer;
                                            searchInput.addEventListener('input', function() {
                                              clearTimeout(searchTimer);
                                              searchTimer = setTimeout(() => {
                                                const keyword = this.value.trim();
                                                if (keyword === '') {
                                                  displayArticles(newsData);
                                                  } else {
                                                    const searchResults = searchArticles(keyword);
                                                    displayArticles(searchResults);
                                                  }
                                                  }, 300);
                                                });
                                              }

                                              // キーボードショートカット
                                              document.addEventListener('keydown', function(e) {
                                                // ESCキーでモーダルを閉じる
                                                if (e.key === 'Escape') {
                                                  closeArticleModal();
                                                }

                                                // Ctrl+F で検索フォーカス
                                                if (e.ctrlKey && e.key === 'f') {
                                                  e.preventDefault();
                                                  const searchInput = document.getElementById('search-input');
                                                  if (searchInput) {
                                                    searchInput.focus();
                                                  }
                                                }
                                              });
                                            }

                                            // スムーズスクロール関数（News用）
                                            function scrollToNewsSection(sectionId) {
                                              const section = document.getElementById(sectionId);
                                              if (section) {
                                                const offsetTop = section.offsetTop - 80;
                                                window.scrollTo({
                                                  top: offsetTop,
                                                  behavior: 'smooth'
                                                });
                                              }
                                            }

                                            // カテゴリ別記事数の取得
                                            function getCategoryCount(category) {
                                              return newsData.filter(article => article.category === category).length;
                                            }

                                            // パフォーマンス最適化：遅延読み込み
                                            function initializeLazyLoading() {
                                              const cards = document.querySelectorAll('.news-card');

                                              const observer = new IntersectionObserver(function(entries) {
                                                entries.forEach(entry => {
                                                  if (entry.isIntersecting) {
                                                    entry.target.classList.add('visible');
                                                    observer.unobserve(entry.target);
                                                  }
                                                });
                                                }, {
                                                  threshold: 0.1,
                                                  rootMargin: '50px'
                                                });

                                                cards.forEach(card => {
                                                  observer.observe(card);
                                                });
                                              }

                                              // 初期化完了後の遅延読み込み設定
                                              setTimeout(() => {
                                                initializeLazyLoading();
                                                }, 1000);