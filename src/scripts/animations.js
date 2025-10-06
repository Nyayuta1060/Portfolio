// ========== アニメーション機能 ==========

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