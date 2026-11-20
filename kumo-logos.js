/* ==========================================================================
   KUMO // VERSE — Brand Logo System (SVG)
   Primary wordmark, emblem, monogram, collection marks
   ========================================================================== */

(function () {
  'use strict';

  const LOGOS = {
    /* Primary horizontal wordmark */
    wordmark(opts = {}) {
      const w = opts.width || 160;
      const h = Math.round(w * 0.28);
      const ink = opts.ink || '#F4F1EA';
      const red = opts.red || '#E62429';
      const cyan = opts.cyan || '#00E5FF';
      return `
        <svg class="kv-logo-wordmark" width="${w}" height="${h}" viewBox="0 0 200 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="KUMO // VERSE">
          <text x="0" y="32" font-family="Space Grotesk, Inter, sans-serif" font-weight="700" font-size="26" letter-spacing="1.5" fill="${ink}">KUMO</text>
          <g transform="translate(78,10)">
            <path d="M2 4L14 28" stroke="${red}" stroke-width="3.5" stroke-linecap="round"/>
            <path d="M10 4L22 28" stroke="${red}" stroke-width="3.5" stroke-linecap="round"/>
          </g>
          <text x="106" y="32" font-family="Space Grotesk, Inter, sans-serif" font-weight="700" font-size="26" letter-spacing="1.5" fill="${ink}">VERSE</text>
          <text x="1" y="50" font-family="Space Grotesk, Inter, sans-serif" font-weight="600" font-size="9" letter-spacing="4" fill="${cyan}">クモ ヴァース</text>
        </svg>`;
    },

    /* Compact emblem: geometric cloud + slash monogram */
    emblem(opts = {}) {
      const s = opts.size || 40;
      const red = opts.red || '#E62429';
      const cyan = opts.cyan || '#00E5FF';
      const ink = opts.ink || '#F4F1EA';
      const uid = 'e' + Math.random().toString(36).slice(2, 7);
      return `
        <svg class="kv-logo-emblem" width="${s}" height="${s}" collapsible="false" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <linearGradient id="${uid}g" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
              <stop stop-color="${red}"/><stop offset="1" stop-color="${cyan}"/>
            </linearGradient>
          </defs>
          <!-- Outer frame -->
          <rect x="3" y="3" width="58" height="58" rx="14" stroke="url(#${uid}g)" stroke-width="1.5" opacity="0.7"/>
          <!-- Cloud mass -->
          <path d="M18 38c0-7.5 5.5-13 12.5-13 1.2 0 2.3.2 3.4.5C35.5 21.5 40 18 45.5 18c7 0 12.5 5.2 12.5 12.2 0 1.1-.2 2.2-.5 3.2 4.2 1.4 7.2 5.2 7.2 9.8 0 5.7-4.5 10.3-10.2 10.3H20.5C14.8 53.5 10 48.7 10 43c0-3.4 1.7-6.4 4.3-8.2.8 1.4 1.9 2.5 3.2 3.2z" fill="${ink}" fill-opacity="0.08" stroke="${ink}" stroke-width="1.4" stroke-linejoin="round"/>
          <!-- Double slash mark -->
          <path d="M26 22L36 44" stroke="${red}" stroke-width="3.2" stroke-linecap="round"/>
          <path d="M34 20L44 42" stroke="${cyan}" stroke-width="3.2" stroke-linecap="round"/>
          <!-- K/V dots -->
          <circle cx="22" cy="48" r="1.6" fill="${red}"/>
          <circle cx="48" cy="20" r="1.6" fill="${cyan}"/>
        </svg>`;
    },

    /* Tight monogram K/V */
    monogram(opts = {}) {
      const s = opts.size || 28;
      const red = opts.red || '#E62429';
      const cyan = opts.cyan || '#00E5FF';
      const ink = opts.ink || '#F4F1EA';
      return `
        <svg class="kv-logo-mono" width="${s}" height="${s}" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="1.5" y="1.5" width="37" height="37" rx="10" stroke="${ink}" stroke-opacity="0.25" stroke-width="1.2"/>
          <text x="11" y="26" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="15" fill="${ink}">K</text>
          <path d="M19 12L25 28" stroke="${red}" stroke-width="2.2" stroke-linecap="round"/>
          <path d="M23 11L29 27" stroke="${cyan}" stroke-width="2.2" stroke-linecap="round"/>
          <text x="28" y="26" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="11" fill="${ink}" opacity="0.85">V</text>
        </svg>`;
    },

    /* Collection: Spider-Verse */
    spiderVerse(opts = {}) {
      const w = opts.width || 140;
      const red = opts.red || '#E62429';
      const cyan = opts.cyan || '#00E5FF';
      const ink = opts.ink || '#F4F1EA';
      return `
        <svg class="kv-logo-collection" width="${w}" height="${Math.round(w * 0.32)}" viewBox="0 0 160 52" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Spider-Verse Drop">
          <circle cx="22" cy="26" r="16" stroke="${cyan}" stroke-opacity="0.35" stroke-width="1"/>
          <path d="M22 12v28M10 20l24 12M10 32l24-12M14 16l16 20M14 36l16-20" stroke="${ink}" stroke-opacity="0.4" stroke-width="1"/>
          <circle cx="22" cy="26" r="3.5" fill="${red}"/>
          <text x="46" y="24" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="13" letter-spacing="1.2" fill="${ink}">SPIDER-VERSE</text>
          <text x="46" y="40" font-family="Space Grotesk, sans-serif" font-weight="600" font-size="8" letter-spacing="3" fill="${red}">DROP 01 // WEB ARC</text>
        </svg>`;
    },

    /* Collection: Anime Archive */
    animeArchive(opts = {}) {
      const w = opts.width || 150;
      const cyan = opts.cyan || '#00E5FF';
      const ink = opts.ink || '#F4F1EA';
      const purple = '#A855F7';
      return `
        <svg class="kv-logo-collection" width="${w}" height="${Math.round(w * 0.32)}" viewBox="0 0 170 52" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Anime Archive">
          <rect x="8" y="10" width="28" height="32" rx="3" stroke="${purple}" stroke-width="1.4"/>
          <path d="M12 18h20M12 26h14M12 34h18" stroke="${cyan}" stroke-opacity="0.6" stroke-width="1.2"/>
          <circle cx="30" cy="38" r="2" fill="${cyan}"/>
          <text x="46" y="24" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="13" letter-spacing="1.2" fill="${ink}">ANIME ARCHIVE</text>
          <text x="46" y="40" font-family="Space Grotesk, sans-serif" font-weight="600" font-size="8" letter-spacing="2.5" fill="${cyan}">JJK · DEMON SLAYER · MORE</text>
        </svg>`;
    },

    /* Seal / stamp for hero */
    seal(opts = {}) {
      const s = opts.size || 72;
      const red = opts.red || '#E62429';
      const cyan = opts.cyan || '#00E5FF';
      const ink = opts.ink || '#F4F1EA';
      return `
        <svg class="kv-logo-seal" width="${s}" height="${s}" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="40" cy="40" r="36" stroke="${ink}" stroke-opacity="0.2" stroke-width="1" stroke-dasharray="3 4"/>
          <circle cx="40" cy="40" r="28" stroke="${red}" stroke-opacity="0.55" stroke-width="1.2"/>
          <path d="M32 28L42 52" stroke="${red}" stroke-width="2.8" stroke-linecap="round"/>
          <path d="M40 26L50 50" stroke="${cyan}" stroke-width="2.8" stroke-linecap="round"/>
          <text x="40" y="62" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="7" letter-spacing="2" fill="${ink}" opacity="0.7">K/V 01</text>
        </svg>`;
    },
  };

  function injectHeaderLogo() {
    const link = document.querySelector('header a[href="#top"]');
    if (!link) return;
    link.innerHTML = `
      <span class="kv-brand-lockup flex items-center gap-2.5">
        ${LOGOS.emblem({ size: 34 })}
        <span class="flex flex-col leading-none">
          <span class="font-display font-bold text-base sm:text-lg tracking-wider text-manga">
            KUMO <span class="text-crimson inline-block -skew-x-12">//</span> VERSE
          </span>
          <span class="hidden sm:block text-[9px] font-display tracking-[0.28em] uppercase text-cyan/70 mt-0.5">クモ ヴァース</span>
        </span>
      </span>`;
  }

  function injectFooterLogo() {
    const foot = document.querySelector('footer .font-display.font-bold');
    if (!foot) return;
    foot.innerHTML = `
      <span class="inline-flex items-center gap-2">
        ${LOGOS.monogram({ size: 22 })}
        <span>KUMO <span class="text-crimson">//</span> VERSE</span>
        <span class="font-normal text-manga/40">© 2026</span>
      </span>`;
  }

  function injectCollectionMarks() {
    const spiderHead = document.querySelector('#spider-collection h2');
    if (spiderHead && !spiderHead.dataset.logoDone) {
      spiderHead.dataset.logoDone = '1';
      const wrap = document.createElement('div');
      wrap.className = 'mb-2';
      wrap.innerHTML = LOGOS.spiderVerse({ width: 168 });
      spiderHead.parentElement.insertBefore(wrap, spiderHead);
    }

    const animeHead = document.querySelector('#anime-collection h2');
    if (animeHead && !animeHead.dataset.logoDone) {
      animeHead.dataset.logoDone = '1';
      const wrap = document.createElement('div');
      wrap.className = 'mb-2';
      wrap.innerHTML = LOGOS.animeArchive({ width: 180 });
      animeHead.parentElement.insertBefore(wrap, animeHead);
    }
  }

  function injectHeroSeal() {
    const stamp = document.querySelector('.kv-photo-stamp');
    if (!stamp) return;
    stamp.innerHTML = LOGOS.seal({ size: 64 });
  }

  function injectFavicon() {
    const svg = encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <rect width="64" height="64" rx="14" fill="#0F1115"/>
        <path d="M24 18L36 46" stroke="#E62429" stroke-width="5" stroke-linecap="round"/>
        <path d="M34 16L46 44" stroke="#00E5FF" stroke-width="5" stroke-linecap="round"/>
      </svg>`
    );
    let link = document.querySelector("link[rel='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.type = 'image/svg+xml';
    link.href = 'data:image/svg+xml,' + svg;
  }

  // Expose for product cards / future use
  window.KUMO_LOGOS = LOGOS;

  function boot() {
    injectFavicon();
    injectHeaderLogo();
    injectFooterLogo();
    injectHeroSeal();
    // Collection marks after products paint
    setTimeout(injectCollectionMarks, 80);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(boot, 40));
  } else {
    setTimeout(boot, 40);
  }
})();
