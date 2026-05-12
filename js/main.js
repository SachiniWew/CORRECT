/* ============================================================
   EGX SUPPLY CHAIN — MAIN JS
   Custom cursor, preloader, navbar, scroll reveal, parallax,
   slideshow, service wheel, counters, particles
   ============================================================ */

// ── PRELOADER ────────────────────────────────────────────────
(function initPreloader() {
  const loader = document.getElementById('preloader');
  if (!loader) return;

  window.addEventListener('load', () => {
    // Play sound if available
    const audio = document.getElementById('preloader-sound');
    if (audio) {
      audio.volume = 0.4;
      audio.play().catch(() => {});
    }

    setTimeout(() => {
      loader.classList.add('done');
      setTimeout(() => { loader.style.display = 'none'; }, 700);
    }, 2000);
  });
})();

// ── CUSTOM CURSOR ────────────────────────────────────────────
(function initCursor() {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring || window.innerWidth < 768) return;

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;
  let raf;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    raf = requestAnimationFrame(animateRing);
  }
  raf = requestAnimationFrame(animateRing);

  // Hover effect on interactive elements
  const interactiveEls = 'a, button, .btn, .service-card, .wheel-item, .nav-link, .slide-arrow, .slide-dot';
  document.querySelectorAll(interactiveEls).forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
})();

// ── NAVBAR ───────────────────────────────────────────────────
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  // Scroll effect
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // Active link
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === currentPath || (href !== '/' && currentPath.startsWith(href))) {
      link.classList.add('active');
    }
  });

  // Hamburger / Mobile menu
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Mobile submenu toggle
  document.querySelectorAll('.mobile-nav-item .mobile-nav-link[data-toggle]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const item = link.closest('.mobile-nav-item');
      item.classList.toggle('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('open') && !navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
})();

// ── PAGE TRANSITION ──────────────────────────────────────────
(function initPageTransition() {
  const overlay = document.getElementById('page-transition');
  if (!overlay) return;

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    // Skip external, anchor, and javascript links
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) return;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      overlay.classList.add('active');
      setTimeout(() => {
        window.location.href = href;
      }, 400);
    });
  });

  // Fade in on load
  overlay.classList.remove('active');
})();

// ── SCROLL REVEAL ────────────────────────────────────────────
(function initScrollReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  els.forEach(el => observer.observe(el));
})();

// ── PARALLAX ────────────────────────────────────────────────
(function initParallax() {
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (!parallaxEls.length) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      parallaxEls.forEach(el => {
        const speed  = parseFloat(el.dataset.parallax) || 0.3;
        const rect   = el.closest('.parallax-section')?.getBoundingClientRect() || el.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        el.style.transform = `translateY(${center * speed}px)`;
      });
      ticking = false;
    });
    ticking = true;
  }, { passive: true });
})();

// ── SLIDESHOW ────────────────────────────────────────────────
(function initSlideshow() {
  const wrapper = document.querySelector('.slideshow-wrapper');
  if (!wrapper) return;

  const slides = wrapper.querySelectorAll('.slide');
  const dots   = wrapper.parentElement.querySelectorAll('.slide-dot');
  const prevBtn = wrapper.parentElement.querySelector('.slide-arrow.prev');
  const nextBtn = wrapper.parentElement.querySelector('.slide-arrow.next');

  if (!slides.length) return;

  let current = 0;
  let timer;

  function goTo(idx) {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(next, 5000);
  }

  goTo(0);
  startAuto();

  if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAuto(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAuto(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); startAuto(); }));

  // Touch swipe
  let touchStartX = 0;
  wrapper.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  wrapper.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); startAuto(); }
  });
})();


// ── SERVICE WHEEL ────────────────────────────────────────────
// ── SERVICE WHEEL ────────────────────────────────────────────
// ── SERVICE WHEEL ────────────────────────────────────────────
// ── SERVICE WHEEL ────────────────────────────────────────────
(function initServiceWheel() {
  const wheelEl = document.querySelector('.wheel');
  if (!wheelEl) return;

  const items = Array.from(wheelEl.querySelectorAll('.wheel-item'));
  if (!items.length) return;

  const N   = items.length;
  const DEG = 360 / N;

  // ── 1. BUILD SVG PIZZA ───────────────────────────────────
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '-1 -1 2 2');
  svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:visible;';

  const sectorPaths = [];

  function makeSectorPath(i, fill) {
    const startRad = (i / N) * 2 * Math.PI - Math.PI / 2;
    const endRad   = ((i + 1) / N) * 2 * Math.PI - Math.PI / 2;
    const r = 1, ri = 0.28;
    const x1o = Math.cos(startRad),      y1o = Math.sin(startRad);
    const x2o = Math.cos(endRad),        y2o = Math.sin(endRad);
    const x1i = Math.cos(startRad) * ri, y1i = Math.sin(startRad) * ri;
    const x2i = Math.cos(endRad)   * ri, y2i = Math.sin(endRad)   * ri;
    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d',
      `M ${x1i} ${y1i} L ${x1o} ${y1o} A ${r} ${r} 0 0 1 ${x2o} ${y2o} L ${x2i} ${y2i} A ${ri} ${ri} 0 0 0 ${x1i} ${y1i} Z`
    );
    path.setAttribute('fill', fill);
    path.setAttribute('stroke', '#555');
    path.setAttribute('stroke-width', '0.015');
    return path;
  }

  for (let i = 0; i < N; i++) {
    const fill = (i === 0) ? '#FFD600' : (i % 2 === 0 ? '#2a2a2a' : '#383838');
    const p = makeSectorPath(i, fill);
    svg.appendChild(p);
    sectorPaths.push(p);
  }

  const outerRing = document.createElementNS(svgNS, 'circle');
  outerRing.setAttribute('cx', '0'); outerRing.setAttribute('cy', '0'); outerRing.setAttribute('r', '1');
  outerRing.setAttribute('fill', 'none');
  outerRing.setAttribute('stroke', '#555');
  outerRing.setAttribute('stroke-width', '0.02');
  svg.appendChild(outerRing);

  wheelEl.insertBefore(svg, wheelEl.firstChild);

  // ── 2. POSITION ICONS ────────────────────────────────────
  const ORBIT = 0.64;

  function positionItems() {
    const size    = wheelEl.offsetWidth;
    const half    = size / 2;
    const orbitPx = half * ORBIT;
    items.forEach((item, i) => {
      const midAngleRad = ((i / N) * 2 * Math.PI) + (Math.PI / N) - Math.PI / 2;
      const x = half + Math.cos(midAngleRad) * orbitPx;
      const y = half + Math.sin(midAngleRad) * orbitPx;
      item.style.position        = 'absolute';
      item.style.left            = x + 'px';
      item.style.top             = y + 'px';
      item.style.transform       = 'translate(-50%, -50%)';
      item.style.transformOrigin = 'center center';
      item.style.zIndex          = '5';
      item.style.cursor          = 'pointer';
      item.style.pointerEvents   = 'auto';
    });
  }

  positionItems();
  window.addEventListener('resize', positionItems);

  // ── 3. COUNTER-ROTATE ICONS ──────────────────────────────
  function updateIconRotations(rotation) {
    items.forEach(item => {
      const iconBox = item.querySelector('.wheel-item-icon');
      if (iconBox) iconBox.style.transform = `rotate(${-rotation}deg)`;
    });
  }

  // ── 4. RECOLOUR SECTORS ──────────────────────────────────
  function recolourSectors(selectedIdx) {
    sectorPaths.forEach((p, i) => {
      p.setAttribute('fill', i === selectedIdx ? '#FFD600' : (i % 2 === 0 ? '#2a2a2a' : '#383838'));
    });
  }

  // ── 5. UPDATE CENTER TEXT ────────────────────────────────
  function updateCenter(name) {
    const txt = wheelEl.querySelector('.wheel-center-text');
    if (!txt) return;
    txt.style.opacity = '0';
    setTimeout(() => { txt.textContent = name; txt.style.opacity = '1'; }, 180);
  }

  // ── 6. UPDATE DETAIL PANEL ───────────────────────────────
  // Query elements FRESH every call — never cache them at top level.
  // This guarantees we always get the live DOM element.
  function updatePanel(idx) {
    const data   = items[idx].dataset;
    const name   = data.name || '';
    const href   = data.href || '#';

    // Get icon src directly from the data-href's matching icon img
    const iconImg = items[idx].querySelector('.wheel-item-icon img');
    const iconSrc = iconImg ? iconImg.getAttribute('src') : '';

    // -- Service name
    const nameEl = document.querySelector('.wheel-detail-name');
    if (nameEl) {
      nameEl.style.opacity = '0';
      setTimeout(() => { nameEl.textContent = name; nameEl.style.opacity = '1'; }, 200);
    }

    // -- Icon in white circle
    const iconEl = document.querySelector('.wheel-detail-icon-img');
    if (iconEl) {
      iconEl.style.opacity = '0';
      setTimeout(() => {
        iconEl.setAttribute('src', iconSrc);
        iconEl.setAttribute('alt', name);
        iconEl.style.opacity = '1';
      }, 200);
    }

    // -- MORE DETAILS button: query fresh, set via setAttribute
    const btn = document.querySelector('.wheel-detail-btn');
    if (btn) {
      btn.setAttribute('href', href);
    }

    // -- Center text
    updateCenter(name);

    // -- Active icon highlight
    items.forEach(it => it.classList.remove('active'));
    items[idx].classList.add('active');
  }

  // ── 7. SPIN TO INDEX ────────────────────────────────────
  let currentRotation = 0;

  function spinToIndex(idx) {
    const target = 270 - (DEG / 2) - idx * DEG;
    let diff = ((target - currentRotation) % 360 + 540) % 360 - 180;
    currentRotation += diff;

    wheelEl.style.transition = 'transform 0.75s cubic-bezier(0.23, 1, 0.32, 1)';
    wheelEl.style.transform  = `rotate(${currentRotation}deg)`;

    const hub = wheelEl.querySelector('.wheel-center');
    if (hub) {
      hub.style.transition = 'transform 0.75s cubic-bezier(0.23, 1, 0.32, 1)';
      hub.style.transform  = `translate(-50%, -50%) rotate(${-currentRotation}deg)`;
    }

    updateIconRotations(currentRotation);

    const snd = document.getElementById('spin-sound');
    if (snd) { snd.currentTime = 0; snd.volume = 0.28; snd.play().catch(() => {}); }

    recolourSectors(idx);
    updatePanel(idx);
  }

  // ── 8. CLICK HANDLERS ───────────────────────────────────
  items.forEach((item, i) => {
    item.addEventListener('click', () => spinToIndex(i));
  });

  // ── 9. INIT ─────────────────────────────────────────────
  spinToIndex(0);
})();
// ── COUNTER ANIMATION ────────────────────────────────────────
(function initCounters() {
  const counters = document.querySelectorAll('.counter-num');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target || el.textContent);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const duration = 2000;
      const start = performance.now();

      function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
        el.textContent = prefix + Math.floor(ease * target).toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

// ── FLOATING PARTICLES ────────────────────────────────────────
(function initParticles() {
  const count = window.innerWidth < 768 ? 0 : 20;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left  = Math.random() * 100 + 'vw';
    p.style.animationDuration = (8 + Math.random() * 12) + 's';
    p.style.animationDelay    = (Math.random() * 10) + 's';
    p.style.width = p.style.height = (1 + Math.random() * 2) + 'px';
    document.body.appendChild(p);
  }
})();

// ── HERO 3D MOUSE TILT ────────────────────────────────────────
(function initHeroTilt() {
  const hero = document.getElementById('hero');
  const orb  = document.querySelector('.hero-orb');
  if (!hero || !orb || window.innerWidth < 1024) return;

  hero.addEventListener('mousemove', (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth  - 0.5) * 40;
    const y = (e.clientY / innerHeight - 0.5) * 20;
    orb.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
  });
  hero.addEventListener('mouseleave', () => {
    orb.style.transform = 'translate(-50%, -50%)';
  });
})();

// ── SMOOTH HASH SCROLLING ─────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── IMAGE LAZY LOAD FADE ──────────────────────────────────────
(function initImageFade() {
  const imgs = document.querySelectorAll('img[loading="lazy"]');
  imgs.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';
    img.addEventListener('load', () => { img.style.opacity = '1'; });
    if (img.complete) img.style.opacity = '1';
  });
})();

// ── EGX PULSE SLIDER ─────────────────────────────────────────
(function initPulseSlider() {
  const track     = document.getElementById('pulseTrack');
  const dotsWrap  = document.getElementById('pulseDots');
  const prevBtn   = document.getElementById('pulsePrev');
  const nextBtn   = document.getElementById('pulseNext');
  if (!track) return;

  const cards     = Array.from(track.querySelectorAll('.pulse-card'));
  const total     = cards.length;
  let   current   = 0;
  let   autoTimer = null;

  // How many cards visible at once (matches CSS breakpoints)
  function visibleCount() {
    const w = window.innerWidth;
    if (w <= 600)  return 1;
    if (w <= 1024) return 2;
    return 3;
  }

  // Max index we can scroll to
  function maxIndex() {
    return Math.max(0, total - visibleCount());
  }

  // ── BUILD DOTS ──────────────────────────────────────────
  function buildDots() {
    dotsWrap.innerHTML = '';
    const count = maxIndex() + 1;
    for (let i = 0; i < count; i++) {
      const d = document.createElement('div');
      d.className = 'pulse-dot' + (i === current ? ' active' : '');
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d);
    }
  }

  // ── UPDATE DOTS ─────────────────────────────────────────
  function updateDots() {
    Array.from(dotsWrap.querySelectorAll('.pulse-dot')).forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  // ── SLIDE TO INDEX ──────────────────────────────────────
  function goTo(idx) {
    current = Math.max(0, Math.min(idx, maxIndex()));
    // Card width + gap
    const cardW = cards[0].offsetWidth;
    const gap   = 24;
    track.style.transition = 'transform 0.55s cubic-bezier(0.23,1,0.32,1)';
    track.style.transform  = `translateX(-${current * (cardW + gap)}px)`;
    updateDots();
  }

  function next() { goTo(current >= maxIndex() ? 0 : current + 1); }
  function prev() { goTo(current <= 0 ? maxIndex() : current - 1); }

  // ── ARROWS ──────────────────────────────────────────────
  if (prevBtn) prevBtn.addEventListener('click', () => { resetAuto(); prev(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { resetAuto(); next(); });

  // ── AUTO-PLAY every 4s ──────────────────────────────────
  function startAuto() { autoTimer = setInterval(next, 4000); }
  function stopAuto()  { clearInterval(autoTimer); }
  function resetAuto() { stopAuto(); startAuto(); }

  // Pause on hover
  track.addEventListener('mouseenter', stopAuto);
  track.addEventListener('mouseleave', startAuto);

  // ── DRAG TO SLIDE (desktop) ──────────────────────────────
  let dragStart = 0, isDragging = false;

  track.addEventListener('pointerdown', e => {
    isDragging = true;
    dragStart  = e.clientX;
    track.classList.add('dragging');
    track.style.transition = 'none';
    stopAuto();
  });
  track.addEventListener('pointermove', e => {
    if (!isDragging) return;
    const diff = e.clientX - dragStart;
    const cardW = cards[0].offsetWidth;
    track.style.transform = `translateX(${-(current * (cardW + 24)) - diff}px)`;
  });
  track.addEventListener('pointerup', e => {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove('dragging');
    const diff = e.clientX - dragStart;
    if (diff < -60)       next();
    else if (diff > 60)   prev();
    else                  goTo(current); // snap back
    startAuto();
  });
  track.addEventListener('pointerleave', () => {
    if (isDragging) { isDragging = false; track.classList.remove('dragging'); goTo(current); startAuto(); }
  });

  // ── KEYBOARD ────────────────────────────────────────────
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  { resetAuto(); prev(); }
    if (e.key === 'ArrowRight') { resetAuto(); next(); }
  });

  // ── REBUILD ON RESIZE ───────────────────────────────────
  window.addEventListener('resize', () => {
    buildDots();
    goTo(Math.min(current, maxIndex()));
  });

  // ── INIT ────────────────────────────────────────────────
  buildDots();
  goTo(0);
  startAuto();
})();
