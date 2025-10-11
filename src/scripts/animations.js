// ========== アニメーション機能 ==========
import { getElement, getElements, logError } from './utils.js';

const ANIMATION_CONFIG = {
  PARTICLE_COUNT: 50,
  PARTICLE_CONNECTION_DISTANCE: 100,
  SKILL_BAR_ANIMATION_DELAY: 200
};

const OBSERVER_CONFIG = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const PARALLAX_CONFIG = {
  SPEED: 0.5
};

/**
 * スクロールエフェクトを初期化
 */
export function initializeScrollEffects() {
  setupIntersectionObserver();
  setupParallaxEffect();
}

/**
 * Intersection Observerをセットアップ
 */
function setupIntersectionObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');

        // スキルバーのアニメーション
        if (entry.target.classList.contains('skill-category')) {
          animateSkillBars(entry.target);
        }
      }
    });
  }, OBSERVER_CONFIG);

  // 監視する要素を追加
  const elementsToObserve = getElements(
    '.about-content, .skill-category, .project-card, .contact-content'
  );

  elementsToObserve.forEach(element => observer.observe(element));
}

/**
 * パララックス効果をセットアップ
 */
function setupParallaxEffect() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = getElements('.hero-visual');

    parallaxElements.forEach(element => {
      element.style.transform = `translateY(${scrolled * PARALLAX_CONFIG.SPEED}px)`;
    });
  });
}

/**
 * スキルバーをアニメーション
 * @param {HTMLElement} skillCategory - スキルカテゴリ要素
 */
function animateSkillBars(skillCategory) {
  const skillBars = skillCategory.querySelectorAll('.skill-progress');

  skillBars.forEach((bar, index) => {
    setTimeout(() => {
      const progress = bar.getAttribute('data-progress');
      bar.style.width = `${progress}%`;
    }, index * ANIMATION_CONFIG.SKILL_BAR_ANIMATION_DELAY);
  });
}

// ========== パーティクル背景 ==========

/**
 * パーティクルクラス
 */
class Particle {
  constructor(width, height) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.opacity = Math.random() * 0.5 + 0.2;
    this.width = width;
    this.height = height;
  }

  /**
   * パーティクルの位置を更新
   */
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // 画面端での反転
    if (this.x > this.width || this.x < 0) {
      this.speedX = -this.speedX;
    }
    if (this.y > this.height || this.y < 0) {
      this.speedY = -this.speedY;
    }
  }

  /**
   * パーティクルを描画
   * @param {CanvasRenderingContext2D} ctx - キャンバスコンテキスト
   */
  draw(ctx) {
    ctx.fillStyle = `rgba(100, 255, 218, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

/**
 * パーティクル背景を初期化
 */
export function initializeParticles() {
  const container = getElement('#particles-container');
  if (!container) return;

  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const particles = [];

    container.appendChild(canvas);

    /**
     * キャンバスのサイズを調整
     */
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    /**
     * パーティクルを初期化
     */
    function initParticles() {
      particles.length = 0; // 既存のパーティクルをクリア
      for (let i = 0; i < ANIMATION_CONFIG.PARTICLE_COUNT; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    }

    /**
     * パーティクル間の接続線を描画
     */
    function drawConnections() {
      particles.forEach((particle1, index) => {
        particles.slice(index + 1).forEach(particle2 => {
          const distance = Math.hypot(
            particle1.x - particle2.x,
            particle1.y - particle2.y
          );

          if (distance < ANIMATION_CONFIG.PARTICLE_CONNECTION_DISTANCE) {
            const opacity = 0.1 * (1 - distance / ANIMATION_CONFIG.PARTICLE_CONNECTION_DISTANCE);
            ctx.strokeStyle = `rgba(100, 255, 218, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle1.x, particle1.y);
            ctx.lineTo(particle2.x, particle2.y);
            ctx.stroke();
          }
        });
      });
    }

    /**
     * アニメーションループ
     */
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
      });

      drawConnections();
      requestAnimationFrame(animate);
    }

    // 初期化と開始
    resizeCanvas();
    initParticles();
    animate();

    // リサイズ対応
    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });
  } catch (error) {
    logError('Particles', error);
  }
}

/**
 * 遅延読み込みを初期化(レガシーサポート用)
 */
export function initializeLazyLoading() {
  const lazyElements = getElements('[data-src]');

  const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        element.src = element.getAttribute('data-src');
        element.removeAttribute('data-src');
        lazyObserver.unobserve(element);
      }
    });
  });

  lazyElements.forEach(element => lazyObserver.observe(element));
}
