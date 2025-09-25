// ========== コンポーネント機能 ==========

// ========== フォーム処理 ==========
function initializeFormHandling() {
  const form = document.querySelector('.form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // フォーム送信のシミュレーション
    showNotification('メッセージを送信しています...', 'info');

    setTimeout(() => {
      showNotification('メッセージが正常に送信されました！', 'success');
      form.reset();
      }, 2000);
    });

    // 入力フィールドのフォーカス効果
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
      input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
      });

      input.addEventListener('blur', function() {
        if (this.value === '') {
          this.parentElement.classList.remove('focused');
        }
      });
    });
  }

  // ========== 通知システム ==========
  function showNotification(message, type = 'info') {
    // 既存の通知を削除
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    // 新しい通知を作成
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
      notification.textContent = message;

      // スタイルを追加
      notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 2rem;
      background: var(--card-bg);
      border: 2px solid var(--primary-color);
      border-radius: 10px;
      color: var(--text-primary);
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      backdrop-filter: blur(10px);
      `;

      if (type === 'success') {
        notification.style.borderColor = '#27ca3f';
        } else if (type === 'error') {
          notification.style.borderColor = '#ff5f56';
        }

        document.body.appendChild(notification);

        // アニメーション
        setTimeout(() => {
          notification.style.transform = 'translateX(0)';
          }, 100);

          // 自動削除
          setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
              notification.remove();
              }, 300);
              }, 3000);
            }

            // ========== ホームページ用ニュース表示 ==========
            function initializeHomeNews() {
              // ニュースデータが利用可能かチェック
              if (typeof newsData === 'undefined') {
                console.log('News data not available on this page');
                return;
              }

              const container = document.getElementById('latest-news-home');
              if (!container) return;

              // 最新3つの記事を表示
              const latestNews = getLatestArticles(3);
              container.innerHTML = '';

              latestNews.forEach(article => {
                const newsCard = createHomeNewsCard(article);
                container.appendChild(newsCard);
              });
            }

            // ホームページ用のニュースカード作成
            function createHomeNewsCard(article) {
              const card = document.createElement('article');
              card.className = 'news-card';

              const tagsHTML = article.tags.slice(0, 2).map(tag =>
              `<span class="news-tag">${tag}</span>`
                ).join('');

                card.innerHTML = `
                <div class="news-date">${formatDate(article.date)}</div>
                  <h3 class="news-title">${article.title}</h3>
                    <p class="news-excerpt">${article.excerpt}</p>
                      <div class="news-tags">
                      ${tagsHTML}
                        </div>
                        <div class="news-action">
                        <a href="src/pages/news.html" class="read-more-link">
                        <i class="fas fa-arrow-right"></i> 続きを読む
                        </a>
                        </div>
                        `;

                        return card;
                      }