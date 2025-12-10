// ========================================
// LANGPASS LANDING PAGE - MAIN SCRIPT
// ========================================

(function() {
  'use strict';

  const LANGUAGES = ['Inglês', 'Espanhol', 'Francês', 'Alemão', 'Italiano', 'Japonês', 'Mandarim', 'Coreano'];
  let currentLang = 0;

  // Navbar scroll
  function initNavbar() {
    const navbar = document.getElementById('mainNavbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // Rotating languages
  function initRotatingLanguages() {
    const el = document.getElementById('rotatingText');
    if (!el) return;

    setInterval(() => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(-10px)';

      setTimeout(() => {
        currentLang = (currentLang + 1) % LANGUAGES.length;
        el.textContent = LANGUAGES[currentLang];
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 300);
    }, 2500);
  }

  // ROI Calculator
  function initCalculator() {
    const slider = document.getElementById('employeeCount');
    const display = document.getElementById('employeeDisplay');
    const investment = document.getElementById('monthlyInvestment');

    if (!slider || !display || !investment) return;

    const update = () => {
      const count = parseInt(slider.value);
      display.textContent = count;
      investment.textContent = (count * 10).toLocaleString('pt-BR');
    };

    slider.addEventListener('input', update);
    update();
  }

  // Smooth scroll
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;

        window.scrollTo({
          top: target.offsetTop - navHeight - 20,
          behavior: 'smooth'
        });

        // Close mobile menu
        const collapse = document.querySelector('.navbar-collapse.show');
        if (collapse) {
          bootstrap.Collapse.getInstance(collapse)?.hide();
        }
      });
    });
  }

  // Network card hover effects
  function initNetworkEffects() {
    const cards = document.querySelectorAll('.network-card');
    const hub = document.querySelector('.hub-content');

    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        cards.forEach(c => {
          if (c !== card) c.style.opacity = '0.6';
        });
        if (hub) hub.style.transform = 'scale(1.1)';
      });

      card.addEventListener('mouseleave', () => {
        cards.forEach(c => c.style.opacity = '1');
        if (hub) hub.style.transform = 'scale(1)';
      });
    });
  }

  // Intersection Observer for animations
  function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.network-card, .benefit-card, .stat-item, .language-item, .network-hub').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.6s ease';
      observer.observe(el);
    });
  }

  // Add animation class styles
  function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
    document.head.appendChild(style);
  }

  // Init
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    console.log('🚀 LangPass Landing Page Initialized');

    addAnimationStyles();
    initNavbar();
    initRotatingLanguages();
    initCalculator();
    initSmoothScroll();
    initNetworkEffects();
    initAnimations();
  }

  init();
})();
