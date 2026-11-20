/* KUMO // VERSE — standalone interaction layer */
(() => {
  'use strict';
  const ready = (fn) => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn, {once:true}) : fn();
  ready(() => {
    // Give the wordmark a distinct, animated emblem without replacing its text.
    const brand = document.querySelector('header a[href="#top"]');
    if (brand && !brand.querySelector('.kv-brand-mark')) {
      const mark = document.createElement('span');
      mark.className = 'kv-brand-mark';
      mark.setAttribute('aria-hidden','true');
      mark.innerHTML = '<svg viewBox="0 0 32 32" fill="none"><path d="M16 3 19.2 11.5 28 8 21.7 15.5 29 21 19.5 20.4 16 29 12.5 20.4 3 21 10.3 15.5 4 8 12.8 11.5 16 3Z" stroke="#f4f1ea" stroke-width="1.35"/><circle cx="16" cy="16" r="3.2" fill="#ff3048"/><path d="M16 0v6M16 26v6M0 16h6M26 16h6" stroke="#20e8ff" stroke-width="1.2"/></svg>';
      brand.prepend(mark);
    }
    // Ambient cursor light on pointer devices.
    if (matchMedia('(pointer:fine)').matches) {
      const glow = document.createElement('div'); glow.className='kv-pointer-glow'; glow.setAttribute('aria-hidden','true'); document.body.append(glow);
      let scheduled=false, px=innerWidth/2, py=innerHeight/2;
      addEventListener('pointermove', e => {px=e.clientX;py=e.clientY;if(!scheduled){scheduled=true;requestAnimationFrame(()=>{glow.style.left=px+'px';glow.style.top=py+'px';scheduled=false;});}}, {passive:true});
    }
    // Reveal editorial blocks and products as they enter view.
    const revealTargets = document.querySelectorAll('#spider-collection .product-card-fluid,#anime-collection .product-card-fluid,#drop-story .editorial-panel,#shop-details details');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => entries.forEach(entry => {if(entry.isIntersecting){entry.target.classList.add('kv-in');io.unobserve(entry.target);}}), {threshold:.12});
      revealTargets.forEach(el=>{el.classList.add('kv-reveal');io.observe(el);});
    }
    // Smooth magnetic response for primary calls to action.
    document.querySelectorAll('#top a[href^="#"]').forEach(el=>{
      el.addEventListener('pointermove', e=>{if(!matchMedia('(pointer:fine)').matches)return;const r=el.getBoundingClientRect();const x=(e.clientX-r.left-r.width/2)*.045;const y=(e.clientY-r.top-r.height/2)*.045;el.style.translate=`${x}px ${y}px`;});
      el.addEventListener('pointerleave',()=>{el.style.translate='0 0';});
    });
    // Add a live drop status label to the top strip.
    const strip=document.querySelector('body > div');
    if(strip && /DROP 01 LIVE/.test(strip.textContent)) strip.classList.add('kv-drop-strip');
  });
})();
