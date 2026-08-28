(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  const navLinks = nav ? [...nav.querySelectorAll('a')] : [];

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
  const updateHeader = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 12);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const tabs = [...document.querySelectorAll('.product-tab')];
  const panels = [...document.querySelectorAll('.product-panel')];

  const activateProduct = (nextTab, moveFocus = false) => {
    const product = nextTab.dataset.product;
    const nextPanel = panels.find((panel) => panel.dataset.panel === product);
    if (!nextPanel) return;

    tabs.forEach((tab) => {
      const active = tab === nextTab;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });

    panels.forEach((panel) => {
      const active = panel === nextPanel;
      panel.hidden = !active;
      panel.classList.toggle('is-active', active);
    });

    if (!reducedMotion && Element.prototype.animate) {
      nextPanel.querySelector('.product-copy')?.animate([
        { opacity: 0, transform: 'translateX(24px)' },
        { opacity: 1, transform: 'translateX(0)' }
      ], {
        duration: 500,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
      });
    }

    if (moveFocus) nextTab.focus();
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateProduct(tab));
    tab.addEventListener('keydown', (event) => {
      let nextIndex = null;
      if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = tabs.length - 1;
      if (nextIndex === null) return;
      event.preventDefault();
      activateProduct(tabs[nextIndex], true);
    });
  });

  const hero = document.querySelector('.hero');
  const heroStage = document.querySelector('[data-hero-stage]');

  if (hero && heroStage && !reducedMotion && window.matchMedia('(pointer: fine)').matches) {
    hero.addEventListener('pointermove', (event) => {
      const bounds = hero.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 13;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 10;
      heroStage.style.setProperty('--stage-x', `${x.toFixed(2)}px`);
      heroStage.style.setProperty('--stage-y', `${y.toFixed(2)}px`);
    });

    hero.addEventListener('pointerleave', () => {
      heroStage.style.setProperty('--stage-x', '0px');
      heroStage.style.setProperty('--stage-y', '0px');
    });
  }

  const revealItems = [...document.querySelectorAll('.reveal')];
  if (!('IntersectionObserver' in window) || reducedMotion || !Element.prototype.animate) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.animate([
        { opacity: 0.35, transform: 'translateY(34px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], {
        duration: 760,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
      });
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px'
  });

  revealItems.forEach((item) => observer.observe(item));
})();
