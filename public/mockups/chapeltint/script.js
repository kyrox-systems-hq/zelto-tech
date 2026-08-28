(() => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  const navLinks = nav ? nav.querySelectorAll('a') : [];

  const setNavigation = (open) => {
    document.body.classList.toggle('nav-open', open);
    toggle?.setAttribute('aria-expanded', String(open));
    toggle?.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  };

  toggle?.addEventListener('click', () => {
    setNavigation(!document.body.classList.contains('nav-open'));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => setNavigation(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setNavigation(false);
  });

  const header = document.querySelector('[data-header]');
  const hero = document.querySelector('.hero');
  const heroVisual = document.querySelector('.hero-visual');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const updateHeader = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 16);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (hero && heroVisual && !reducedMotion && window.matchMedia('(pointer: fine)').matches) {
    hero.addEventListener('pointermove', (event) => {
      const bounds = hero.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 10;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 8;
      heroVisual.style.setProperty('--shift-x', `${x.toFixed(2)}px`);
      heroVisual.style.setProperty('--shift-y', `${y.toFixed(2)}px`);
    });

    hero.addEventListener('pointerleave', () => {
      heroVisual.style.setProperty('--shift-x', '0px');
      heroVisual.style.setProperty('--shift-y', '0px');
    });
  }

  const revealItems = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window) || reducedMotion || !Element.prototype.animate) {
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.animate([
        { opacity: 0.42, transform: 'translateY(28px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], {
        duration: 780,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        fill: 'none'
      });
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px'
  });

  revealItems.forEach((item) => observer.observe(item));
})();
