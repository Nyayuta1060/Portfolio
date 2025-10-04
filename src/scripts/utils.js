// ========== ユーティリティ関数 ==========

// デバウンス関数
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// スロットル関数
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ========== パフォーマンス最適化 ==========

// 画像の遅延読み込み
function initializeLazyImages() {
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
      img.loading = 'lazy';
      img.src = img.dataset.src;
    });
    } else {
      // Intersection Observer fallback
      initializeLazyLoading();
    }
  }

  // プリロード重要なリソース
  function preloadCriticalResources() {
    const criticalFonts = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500&display=swap'
    ];

    criticalFonts.forEach(fontUrl => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = fontUrl;
      document.head.appendChild(link);
    });
  }

  // ========== アクセシビリティ ==========
  function initializeAccessibility() {
    // キーボードナビゲーション
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', function() {
      document.body.classList.remove('keyboard-navigation');
    });

    // 減色モーション設定の尊重
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // アニメーションを無効化
      document.documentElement.style.setProperty('--transition-smooth', 'none');
      document.documentElement.style.setProperty('--transition-bounce', 'none');
    }
  }

  // ========== PWA サポート ==========
  function initializePWA() {
    // サービスワーカーの登録
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
        .then(function(registration) {
          console.log('ServiceWorker registration successful');
          })
          .catch(function(error) {
            console.log('ServiceWorker registration failed');
          });
        });
      }
    }

    // ========== CSS アニメーションクラス追加 ==========
    function addAnimationStyles() {
      const style = document.createElement('style');
      style.textContent = `
      .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }

      .skill-category,
      .project-card,
      .about-content,
      .contact-content {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }

      .keyboard-navigation *:focus {
        outline: 2px solid var(--primary-color) !important;
        outline-offset: 2px;
      }


      `;
      document.head.appendChild(style);
    }