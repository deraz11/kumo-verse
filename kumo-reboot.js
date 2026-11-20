/* ==========================================================================
   KUMO // VERSE — Reboot Interactions
   Scroll-triggered reveals + staggered product card fade-ins
   ========================================================================== */

(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  /* ---- Hero stage: inject unique floating garment ---- */
  function initHeroStage() {
    const main = document.querySelector('.kv-photo-main') || document.getElementById('hero-stage-root');
    if (!main || typeof renderGarmentVisual !== 'function') return;

    main.innerHTML = '';
    const stage = document.createElement('div');
    stage.className = 'kv-hero-stage';
    stage.innerHTML = `
      <div class="garment-wrap">
        ${renderGarmentVisual('hoodies', '#0F1115', 'crest', 'front')}
      </div>
    `;
    main.appendChild(stage);
  }

  /* ---- Soft parallax on hero visual ---- */
  function initHeroParallax() {
    const visual = document.querySelector('.kv-hero-visual');
    if (!visual) return;

    visual.addEventListener('mousemove', (e) => {
      const rect = visual.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const stage = visual.querySelector('.kv-hero-stage');
      if (stage) {
        stage.style.transform = `translateY(${-6 + y * -8}px) rotate(${x * 4}deg)`;
      }
    });

    visual.addEventListener('mouseleave', () => {
      const stage = visual.querySelector('.kv-hero-stage');
      if (stage) stage.style.transform = '';
    });
  }

  /* ---- Staggered fade-in for product cards ---- */
  function staggerCards(root, baseDelay) {
    const scope = root || document;
    const list = Array.from(scope.querySelectorAll('.product-card-fluid'));
    if (!list.length) return;

    list.forEach((card, i) => {
      card.classList.remove('is-in');
      card.style.animation = 'none';
      void card.offsetWidth;
      card.style.animation = '';
      card.style.animationDelay = `${(baseDelay || 0) + Math.min(i * 85, 680)}ms`;
      card.classList.add('is-in');
    });
  }

  /* ---- Stagger generic child elements inside a section ---- */
  function staggerChildren(section) {
    if (!section) return;

    // Editorial panels (drop story)
    const panels = section.querySelectorAll('.editorial-panel');
    panels.forEach((el, i) => {
      el.style.animationDelay = `${80 + i * 110}ms`;
    });

    // FAQ items
    const faqs = section.querySelectorAll('.faq-item');
    faqs.forEach((el, i) => {
      el.style.animationDelay = `${60 + i * 90}ms`;
    });

    // Craft detail columns
    if (section.id === 'craft-details') {
      const cols = section.querySelectorAll('.grid > div');
      cols.forEach((el, i) => {
        el.classList.add('reveal-child');
        el.style.transitionDelay = `${i * 90}ms`;
      });
    }

    // Perk cards (shopper promise strip)
    const perks = section.querySelectorAll('.rounded-3xl.bg-concrete\\/25, .rounded-3xl[class*="bg-concrete"]');
    // Fallback: direct children of the 4-col grid inside perks section
    const perkGrid = section.querySelector('.grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4');
    if (perkGrid) {
      Array.from(perkGrid.children).forEach((el, i) => {
        el.style.animation = 'revealChildIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) both';
        el.style.animationDelay = `${70 + i * 100}ms`;
      });
    }

    // Explicit .reveal-child nodes
    section.querySelectorAll('.reveal-child').forEach((el, i) => {
      el.style.transitionDelay = `${i * 80}ms`;
    });
  }

  /* ---- Main scroll-triggered reveal observer ---- */
  function initScrollReveals() {
    const prefersReduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        el.classList.add('is-visible');
        el.querySelectorAll('.product-card-fluid').forEach((c) => c.classList.add('is-in'));
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const section = entry.target;
          section.classList.add('is-visible');
          staggerChildren(section);
          staggerCards(section, 40);
          observer.unobserve(section);
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      // If already mostly in view on load, reveal immediately
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.88 && rect.bottom > 40) {
        el.classList.add('is-visible');
        staggerChildren(el);
        staggerCards(el, 40);
      } else {
        observer.observe(el);
      }
    });
  }

  /* ---- Observe product grids for filter re-renders ---- */
  function observeProductGrids() {
    const grids = ['spider-grid', 'anime-grid']
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const gridObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          staggerCards(entry.target, 0);
        });
      },
      { threshold: 0.05 }
    );

    grids.forEach((g) => gridObserver.observe(g));
  }

  /* ---- Subtle cursor glow on product stages ---- */
  function bindStageGlow() {
    document.querySelectorAll('.kv-product-stage').forEach((stage) => {
      stage.addEventListener('mousemove', (e) => {
        const rect = stage.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        stage.style.setProperty('--mx', x + '%');
        stage.style.setProperty('--my', y + '%');
      });
    });
  }

  /* ---- After product re-render (filter / search): re-stagger ---- */
  function afterRender() {
    requestAnimationFrame(() => {
      bindStageGlow();
      if (typeof bindFluidCardTilt === 'function') bindFluidCardTilt();

      ['spider-grid', 'anime-grid'].forEach((id) => {
        const grid = document.getElementById(id);
        if (!grid) return;
        const rect = grid.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (inView) staggerCards(grid, 0);
      });
    });
  }

  function wrapRenderProducts() {
    if (typeof window.renderProducts !== 'function') return false;
    if (window.renderProducts.__kvWrapped) return true;
    const original = window.renderProducts;
    window.renderProducts = function () {
      original.apply(this, arguments);
      afterRender();
    };
    window.renderProducts.__kvWrapped = true;
    return true;
  }

  ready(() => {
    setTimeout(() => {
      initHeroStage();
      initHeroParallax();
      initScrollReveals();
      observeProductGrids();
      bindStageGlow();
      wrapRenderProducts();
    }, 60);
  });
})();
