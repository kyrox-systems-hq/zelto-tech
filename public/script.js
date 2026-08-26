const PROJECT_IMAGES = {
  xiq: { src: 'assets/projects/xiq/hero-sm.webp', srcset: 'assets/projects/xiq/hero-sm.webp 800w, assets/projects/xiq/hero-lg.webp 1600w', width: 1600, height: 900 },
  'refined-vision': { src: 'assets/projects/refined-vision/hero-sm.webp', srcset: 'assets/projects/refined-vision/hero-sm.webp 800w, assets/projects/refined-vision/hero-lg.webp 1400w', width: 1400, height: 1167 },
  devvolve: { src: 'assets/projects/devvolve/hero-sm.webp', srcset: 'assets/projects/devvolve/hero-sm.webp 800w, assets/projects/devvolve/hero-lg.webp 1600w', width: 1600, height: 1326 },
  'people-water': { src: 'assets/projects/people-water/hero-sm.webp', srcset: 'assets/projects/people-water/hero-sm.webp 800w, assets/projects/people-water/hero-lg.webp 1600w', width: 1600, height: 893 }
};

const hydrateProjectImages = (root = document) => {
  root.querySelectorAll('[data-project-image]').forEach(image => {
    const asset = PROJECT_IMAGES[image.dataset.projectImage];
    if (!asset) return;
    image.src = asset.src;
    image.srcset = asset.srcset;
    image.sizes = '(max-width: 760px) 100vw, 50vw';
    image.width = asset.width;
    image.height = asset.height;
    image.decoding = 'async';
  });
};

const installFizzyFunkWork = () => {
  const featuredWork = document.querySelector('.work-card-wide');
  if (!featuredWork) return;

  featuredWork.innerHTML = `
    <a href="work/fizzy-funk-packaging/" aria-label="View the Fizzy Funk packaging project" style="display:block;height:100%;color:inherit">
      <div class="work-visual fizzy-work">
        <img src="assets/projects/fizzy-funk/hero-sm.webp" srcset="assets/projects/fizzy-funk/hero-sm.webp 800w, assets/projects/fizzy-funk/hero-lg.webp 1600w" sizes="(max-width: 760px) 100vw, 1240px" width="1600" height="893" alt="Fizzy Funk packaging system across four colourful fruit drink flavours" fetchpriority="high" decoding="async">
        <div class="fizzy-overlay">
          <span>Brand system · Packaging · Campaign visuals</span>
          <strong>Fizzy Funk</strong>
        </div>
        <div class="platform-label">View project ↗</div>
      </div>
      <div class="work-meta">
        <div><span>Brand and packaging</span><h3>Fizzy Funk beverage packaging and launch creative</h3></div>
        <p>A colourful packaging system developed across four fruit flavours, supported by product mock-ups and campaign-ready visual assets.</p>
      </div>
    </a>`;
};

const installMedsAttireCaseStudy = () => {
  const workGrid = document.querySelector('.work-grid');
  const featuredWork = workGrid?.querySelector('.work-card-wide');
  if (!workGrid || !featuredWork || workGrid.querySelector('.medsattire-case')) return;

  const caseStudy = document.createElement('article');
  caseStudy.className = 'work-card work-card-wide medsattire-case reveal';
  caseStudy.innerHTML = `
    <div class="medsattire-case-inner">
      <div class="medsattire-intro">
        <div class="medsattire-kicker"><span>Meta Ads</span><span>Healthcare apparel</span></div>
        <div class="medsattire-symbol" aria-hidden="true"></div>
        <h3>Profitable growth for a medical workwear brand.</h3>
        <p>MedsAttire sells premium scrubs, lab coats and healthcare accessories for medical professionals. The campaign scaled revenue while reducing the cost of converting each customer.</p>
        <a class="medsattire-site-link" href="https://www.medsattire.com/" target="_blank" rel="noreferrer">Visit MedsAttire <span aria-hidden="true">↗</span></a>
      </div>
      <div class="medsattire-results" aria-label="MedsAttire Meta Ads campaign results">
        <div class="medsattire-metric is-primary"><strong>10×</strong><span>Return on ad spend</span></div>
        <div class="medsattire-metric is-primary"><strong>525%</strong><span>Revenue growth</span></div>
        <div class="medsattire-metric is-primary"><strong>80%</strong><span>Lower cost per purchase</span></div>
        <div class="medsattire-metric"><strong>2.8M+</strong><span>Ad impressions</span></div>
        <div class="medsattire-metric"><strong>120K+</strong><span>People reached</span></div>
        <div class="medsattire-metric"><strong>3.9%</strong><span>Click-through rate</span></div>
        <div class="medsattire-metric"><strong>40%</strong><span>Lower cost per click</span></div>
        <div class="medsattire-metric"><strong>98%</strong><span>Conversion tracking accuracy</span></div>
      </div>
    </div>
    <div class="work-meta">
      <div><span>Meta Ads performance</span><h3>MedsAttire e-commerce growth campaign</h3></div>
      <p>Paid social performance for a specialist healthcare clothing retailer, combining profitable scaling with stronger acquisition efficiency and reliable conversion measurement.</p>
    </div>`;

  featuredWork.insertAdjacentElement('afterend', caseStudy);
};

const installPortfolioProjects = () => {
  const workGrid = document.querySelector('.work-grid');
  if (!workGrid || workGrid.querySelector('[data-added-projects]')) return;

  const projects = [
    { slug: 'xiq-brand-system', title: 'xiQ', category: 'Brand identity · Campaign system', description: 'A high-contrast identity and multi-channel creative system for an AI-powered revenue platform.', asset: 'xiq', className: 'project-xiq' },
    { slug: 'refined-vision-product-design', title: 'Refined Vision', category: 'Product design · Art direction', description: 'A premium eyewear concept developed through product visualisation, editorial layouts and social creative.', asset: 'refined-vision', className: 'project-refined' },
    { slug: 'devvolve-brand-identity', title: 'DevVolve', category: 'Technology brand identity', description: 'A modular geometric identity designed to work across digital products, outdoor media and apparel.', asset: 'devvolve', className: 'project-devvolve' },
    { slug: 'people-water-product-design', title: 'People Water', category: 'Product identity · Packaging', description: 'A bold bottled-water system extended across packaging, retail, campaign and delivery touchpoints.', asset: 'people-water', className: 'project-people-water' }
  ];

  const wrapper = document.createElement('div');
  wrapper.setAttribute('data-added-projects', 'true');
  wrapper.style.display = 'contents';
  wrapper.innerHTML = projects.map(project => `
    <article class="work-card portfolio-project-card ${project.className}">
      <a class="project-card-link" href="work/${project.slug}/" aria-label="View the ${project.title} project">
        <div class="portfolio-project-image">
          <img data-project-image="${project.asset}" alt="${project.title} selected project visual" loading="lazy">
          <span class="project-card-action">View project ↗</span>
        </div>
        <div class="work-meta">
          <div><span>${project.category}</span><h3>${project.title}</h3></div>
          <p>${project.description}</p>
        </div>
      </a>
    </article>`).join('');

  workGrid.appendChild(wrapper);
  hydrateProjectImages(wrapper);

  const workIntro = document.querySelector('#work .section-heading p:last-child');
  if (workIntro) workIntro.textContent = 'Zelto Tech is a new name, not a team starting from zero. Our experience spans paid media, B2B campaigns, automation, brand identity, packaging and product-led creative.';
};

installFizzyFunkWork();
installMedsAttireCaseStudy();
installPortfolioProjects();

const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-button]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const revealItems = document.querySelectorAll('.reveal');
const workflowSteps = document.querySelectorAll('[data-step]');
const workflowRail = document.querySelector('.workflow-rail i');

const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 42);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuButton?.addEventListener('click', () => {
  const open = !mobileMenu.classList.contains('open');
  mobileMenu.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  document.body.classList.toggle('menu-open', open);
});

mobileMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Open menu');
  document.body.classList.remove('menu-open');
}));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14, rootMargin: '0px 0px -30px 0px' });
revealItems.forEach(item => revealObserver.observe(item));

const stepObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('is-active');
  });
}, { threshold: 0.5 });
workflowSteps.forEach(step => stepObserver.observe(step));

const updateWorkflowRail = () => {
  const workflow = document.querySelector('[data-workflow]');
  if (!workflow || !workflowRail) return;
  const rect = workflow.getBoundingClientRect();
  const viewportPoint = window.innerHeight * 0.7;
  const progress = Math.min(1, Math.max(0, (viewportPoint - rect.top) / rect.height));
  workflowRail.style.height = `${progress * 100}%`;
};
window.addEventListener('scroll', updateWorkflowRail, { passive: true });
updateWorkflowRail();

const parallax = document.querySelector('[data-parallax]');
if (parallax && window.matchMedia('(pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  parallax.addEventListener('pointermove', event => {
    const box = parallax.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    const windowEl = parallax.querySelector('.system-window');
    if (windowEl) windowEl.style.transform = `rotateY(${x * 5 - 3}deg) rotateX(${-y * 4 + 1}deg)`;
  });
  parallax.addEventListener('pointerleave', () => {
    const windowEl = parallax.querySelector('.system-window');
    if (windowEl) windowEl.style.transform = '';
  });
}

const names = ['Amelia', 'Farhan', 'Rachel', 'Daniel'];
const signals = ['Northstar is entering the healthcare market', 'your team is hiring for international growth', 'you recently launched a new B2B product', 'your paid media mix is shifting towards search'];
let messageIndex = 0;
const nameTarget = document.querySelector('[data-person-name]');
const signalTarget = document.querySelector('[data-person-signal]');
if (nameTarget && signalTarget && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  setInterval(() => {
    messageIndex = (messageIndex + 1) % names.length;
    nameTarget.style.opacity = signalTarget.style.opacity = '0';
    setTimeout(() => {
      nameTarget.textContent = names[messageIndex];
      signalTarget.textContent = signals[messageIndex];
      nameTarget.style.opacity = signalTarget.style.opacity = '1';
    }, 220);
  }, 3500);
}

const contactForm = document.querySelector('[data-contact-form]');
contactForm?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const name = String(data.get('name') || '').trim();
  const email = String(data.get('email') || '').trim();
  const focus = String(data.get('focus') || '').trim();
  const message = String(data.get('message') || '').trim();
  const subject = encodeURIComponent(`Zelto Tech enquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nArea of focus: ${focus}\n\nWhat they are trying to achieve:\n${message}`);
  const recipient = atob('c3VoYXliLm1hbnphckBvdXRsb29rLmNvbQ==');
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
});

import('./freelance-case-studies.js?v=zt-20260826-trust-copy').catch(error => console.error('Named freelance case studies failed to load', error));
