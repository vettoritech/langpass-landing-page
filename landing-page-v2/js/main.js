// ========================================
// LANGPASS LANDING PAGE V2 - MAIN SCRIPT
// ========================================

(function () {
  'use strict';

  // ========== CONFIG ==========
  const LANGUAGES = ['Inglês', 'Espanhol', 'Francês', 'Alemão', 'Italiano', 'Japonês', 'Mandarim', 'Coreano'];
  let currentLanguageIndex = 0;

  // ========== NAV BAR SCROLL ==========
  function handleNavbarScroll() {
    const navbar = document.getElementById('mainNavbar');
    if (!navbar) return;

    function updateNavbar() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', updateNavbar);
    updateNavbar(); // Initial check
  }

  // ========== NETWORK ECOSYSTEM ANIMATION ==========
  function initNetworkEcosystem() {
    const canvas = document.getElementById('networkCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    // Set canvas size
    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(20, 83, 200, 0.3)';
        ctx.fill();
      }
    }

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle());
    }

    // Draw connections
    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(20, 83, 200, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      drawConnections();
      animationId = requestAnimationFrame(animate);
    }

    animate();

    // Node hover effects
    const nodes = document.querySelectorAll('.network-node');
    nodes.forEach(node => {
      node.addEventListener('mouseenter', function() {
        const nodeType = this.dataset.node;
        highlightNode(nodeType);
      });

      node.addEventListener('mouseleave', function() {
        resetNodes();
      });
    });

    function highlightNode(type) {
      nodes.forEach(node => {
        if (node.dataset.node !== type && node.dataset.node !== 'langpass') {
          node.style.opacity = '0.5';
          node.style.transform = 'scale(0.95)';
        }
      });
    }

    function resetNodes() {
      nodes.forEach(node => {
        node.style.opacity = '1';
        node.style.transform = '';
      });
    }

    // Cleanup on page leave
    return () => {
      cancelAnimationFrame(animationId);
    };
  }

  // ========== ROTATING LANGUAGES ==========
  function initLanguageRotation() {
    const languageEl = document.querySelector('.rotating-languages');
    if (!languageEl) return;

    function updateLanguage() {
      languageEl.style.opacity = '0';
      languageEl.style.transform = 'translateY(-10px)';

      setTimeout(() => {
        currentLanguageIndex = (currentLanguageIndex + 1) % LANGUAGES.length;
        languageEl.textContent = LANGUAGES[currentLanguageIndex];

        languageEl.style.opacity = '1';
        languageEl.style.transform = 'translateY(0)';
      }, 300);
    }

    // Set initial language
    languageEl.textContent = LANGUAGES[0];
    languageEl.style.transition = 'all 0.3s ease';

    // Rotate every 3 seconds
    setInterval(updateLanguage, 3000);
  }

  // ========== LANGUAGE BUBBLES ANIMATION ==========
  function initLanguageBubbles() {
    const container = document.querySelector('.language-bubbles');
    if (!container) return;

    const emojiSets = {
      languages: ['🇺🇸', '🇪🇸', '🇫🇷', '🇩🇪', '🇮🇹', '🇯🇵', '🇨🇳', '🇰🇷', '🇧🇷', '🇷🇺'],
      symbols: ['📚', '✨', '🎓', '💼', '🌍', '🚀', '⭐', '💡']
    };

    function createParticle() {
      const particle = document.createElement('div');
      particle.className = 'language-particle';

      // Random selection from both sets
      const useEmoji = Math.random() > 0.3;
      if (useEmoji) {
        const allEmojis = [...emojiSets.languages, ...emojiSets.symbols];
        particle.textContent = allEmojis[Math.floor(Math.random() * allEmojis.length)];
        particle.style.fontSize = Math.random() * 20 + 25 + 'px';
      } else {
        particle.textContent = LANGUAGES[Math.floor(Math.random() * LANGUAGES.length)];
        particle.style.fontSize = Math.random() * 10 + 14 + 'px';
        particle.style.fontWeight = '700';
      }

      // Random position
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';

      // Random animation duration
      particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
      particle.style.animationDelay = Math.random() * 5 + 's';

      particle.style.position = 'absolute';
      particle.style.opacity = '0';
      particle.style.pointerEvents = 'none';
      particle.style.animation = 'particleFloat ' + particle.style.animationDuration + ' infinite ease-in-out';

      container.appendChild(particle);

      // Remove after animation cycle
      setTimeout(() => {
        particle.remove();
      }, parseFloat(particle.style.animationDuration) * 1000);
    }

    // Create initial particles
    for (let i = 0; i < 15; i++) {
      setTimeout(createParticle, i * 500);
    }

    // Keep creating particles
    setInterval(createParticle, 3000);
  }

  // ========== ROI CALCULATOR ==========
  function initROICalculator() {
    const employeeInput = document.getElementById('employeeCount');
    const monthlyInvestment = document.getElementById('monthlyInvestment');
    const employeeDisplay = document.getElementById('employeeCountDisplay');

    if (!employeeInput || !monthlyInvestment || !employeeDisplay) return;

    function calculateROI() {
      const count = parseInt(employeeInput.value) || 0;
      const investment = count * 10;

      monthlyInvestment.textContent = investment;
      employeeDisplay.textContent = count;
    }

    employeeInput.addEventListener('input', calculateROI);
    calculateROI(); // Initial calculation
  }

  // ========== SMOOTH SCROLL ==========
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.offsetTop - navbarHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) {
            bsCollapse.hide();
          }
        }
      });
    });
  }

  // ========== AOS (Animate On Scroll) INIT ==========
  function initAOS() {
    // Simple AOS implementation
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
        }
      });
    }, observerOptions);

    // Observe all elements with data-aos
    document.querySelectorAll('[data-aos]').forEach(element => {
      observer.observe(element);
    });
  }

  // ========== SCROLL TO TOP BUTTON ==========
  function initScrollToTop() {
    // Create button if it doesn't exist
    let scrollBtn = document.querySelector('.scroll-to-top');

    if (!scrollBtn) {
      scrollBtn = document.createElement('button');
      scrollBtn.className = 'scroll-to-top';
      scrollBtn.setAttribute('aria-label', 'Scroll to top');
      scrollBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
      document.body.appendChild(scrollBtn);
    }

    // Show/hide on scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    });

    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ========== PARALLAX EFFECT ==========
  function initParallax() {
    const heroVisual = document.querySelector('.hero-visual');
    if (!heroVisual) return;

    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const rate = scrolled * 0.3;

      heroVisual.style.transform = `translateY(${rate}px)`;
    });
  }

  // ========== INIT ALL ==========
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    console.log('🚀 LangPass V2 Landing Page Initialized');

    // Initialize all features
    handleNavbarScroll();
    initLanguageRotation();
    initLanguageBubbles();
    initROICalculator();
    initSmoothScroll();
    initAOS();
    initScrollToTop();
    initParallax();
    initNetworkEcosystem();
  }

  // Start initialization
  init();

})();
