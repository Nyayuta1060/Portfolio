// メイン JavaScript ファイル
document.addEventListener('DOMContentLoaded', function() {
    // 初期化
    initializeApp();
});

function initializeApp() {
    // 各機能を初期化
    initializeNavigation();
    initializeScrollEffects();
    initializeTypingAnimation();
    initializeParticles();
    initializeSkillBars();
    initializeFormHandling();
    initializeLazyLoading();
    initializeHomeNews();
}

// ========== ナビゲーション ==========
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // ハンバーガーメニューの切り替え
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // ナビゲーションリンクのスムーズスクロール
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // ナビバーの高さを考慮
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // モバイルメニューを閉じる
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // スクロール時のナビバー透明度調整
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.9)';
        }

        // アクティブなセクションをハイライト
        highlightActiveSection();
    });
}

// アクティブセクションのハイライト
function highlightActiveSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

// ========== スクロールエフェクト ==========
function initializeScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // スキルバーのアニメーション
                if (entry.target.classList.contains('skill-category')) {
                    animateSkillBars(entry.target);
                }
            }
        });
    }, observerOptions);

    // 監視する要素を追加
    const elementsToObserve = document.querySelectorAll(
        '.about-content, .skill-category, .project-card, .contact-content'
    );
    
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });

    // パララックス効果
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-visual');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ========== タイピングアニメーション ==========
function initializeTypingAnimation() {
    const typingElement = document.querySelector('.typing-animation');
    if (!typingElement) return;

    const textToType = typingElement.getAttribute('data-text');
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const delayBetweenTexts = 2000;

    let charIndex = 0;
    let isErasing = false;

    function typeText() {
        if (!isErasing && charIndex < textToType.length) {
            typingElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, typingSpeed);
        } else if (isErasing && charIndex > 0) {
            typingElement.textContent = textToType.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(typeText, erasingSpeed);
        } else {
            isErasing = !isErasing;
            if (!isErasing) charIndex = 0;
            setTimeout(typeText, delayBetweenTexts);
        }
    }

    // アニメーション開始
    setTimeout(typeText, 1000);
}

// ========== パーティクル背景 ==========
function initializeParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    const particleCount = 50;
    const particles = [];

    class Particle {
        constructor() {
            this.x = Math.random() * window.innerWidth;
            this.y = Math.random() * window.innerHeight;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > window.innerWidth || this.x < 0) {
                this.speedX = -this.speedX;
            }
            if (this.y > window.innerHeight || this.y < 0) {
                this.speedY = -this.speedY;
            }
        }

        draw(ctx) {
            ctx.fillStyle = `rgba(100, 255, 218, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // キャンバス作成
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    container.appendChild(canvas);

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // パーティクル初期化
    function initParticles() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    // アニメーションループ
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw(ctx);
        });

        // パーティクル間の線を描画
        drawConnections();
        
        requestAnimationFrame(animate);
    }

    function drawConnections() {
        particles.forEach((particle1, index) => {
            particles.slice(index + 1).forEach(particle2 => {
                const distance = Math.hypot(particle1.x - particle2.x, particle1.y - particle2.y);
                
                if (distance < 100) {
                    ctx.strokeStyle = `rgba(100, 255, 218, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particle1.x, particle1.y);
                    ctx.lineTo(particle2.x, particle2.y);
                    ctx.stroke();
                }
            });
        });
    }

    // 初期化
    resizeCanvas();
    initParticles();
    animate();

    // リサイズ対応
    window.addEventListener('resize', resizeCanvas);
}

// ========== スキルバーアニメーション ==========
function initializeSkillBars() {
    // スキルバーは Intersection Observer で制御
}

function animateSkillBars(skillCategory) {
    const skillBars = skillCategory.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        }, index * 200);
    });
}

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

// ========== 遅延読み込み ==========
function initializeLazyLoading() {
    const lazyElements = document.querySelectorAll('[data-src]');
    
    const lazyObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.src = element.getAttribute('data-src');
                element.removeAttribute('data-src');
                lazyObserver.unobserve(element);
            }
        });
    });

    lazyElements.forEach(element => {
        lazyObserver.observe(element);
    });
}

// ========== ユーティリティ関数 ==========

// スムーズスクロール関数
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

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

// ========== イベントリスナー ==========

// リサイズイベントの最適化
window.addEventListener('resize', debounce(function() {
    // リサイズ時の処理
    const canvas = document.querySelector('#particles-container canvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}, 250));

// スクロールイベントの最適化
window.addEventListener('scroll', throttle(function() {
    // スクロール時の軽量処理のみ
}, 16)); // 60fps

// ========== パフォーマンス最適化 ==========

// 画像の遅延読み込み
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

// ========== PWA サポート ==========

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

// ========== 初期化完了 ==========
console.log('🚀 Portfolio initialized successfully!');

// CSS アニメーションクラスを追加
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
    
    .read-more-link {
        color: var(--primary-color);
        text-decoration: none;
        font-weight: 500;
        transition: var(--transition-smooth);
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .read-more-link:hover {
        color: var(--secondary-color);
        transform: translateX(5px);
    }
    
    .news-action {
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid var(--border-color);
    }
`;
document.head.appendChild(style);