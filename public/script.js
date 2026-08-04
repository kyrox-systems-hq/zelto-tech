const installFizzyFunkWork = async () => {
  const featuredWork = document.querySelector('.work-card-wide');
  if (!featuredWork) return;

  try {
    const parts = await Promise.all(
      [0, 1, 2, 3, 4, 5].map(async index => {
        const part = String(index).padStart(2, '0');
        const response = await fetch(`assets/fizzy-showcase-${part}.txt`);
        if (!response.ok) throw new Error(`Fizzy Funk asset ${index} failed to load`);
        return response.text();
      })
    );

    const imageSource = `data:image/jpeg;base64,${parts.join('').replace(/\s/g, '')}`;
    featuredWork.innerHTML = `
      <div class="work-visual fizzy-work">
        <img src="${imageSource}" alt="Fizzy Funk fruit drink packaging shown across four colourful cans">
        <div class="fizzy-overlay">
          <span>Brand system · Packaging · Campaign visuals</span>
          <strong>Fizzy Funk</strong>
        </div>
        <div class="platform-label">Packaging design</div>
      </div>
      <div class="work-meta">
        <div><span>Brand and packaging</span><h3>Fizzy Funk beverage packaging and launch creative</h3></div>
        <p>A colourful packaging system developed across four fruit flavours, supported by product mock-ups and campaign-ready visual assets.</p>
      </div>`;
  } catch (error) {
    console.warn('The Fizzy Funk work image could not be loaded.', error);
  }
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
    {
      slug: 'xiq-brand-system',
      title: 'xiQ',
      category: 'Brand identity · Campaign system',
      description: 'A high-contrast identity and multi-channel creative system for an AI-powered revenue platform.',
      image: 'assets/projects/xiq/hero.webp',
      className: 'project-xiq'
    },
    {
      slug: 'refined-vision-product-design',
      title: 'Refined Vision',
      category: 'Product design · Art direction',
      description: 'A premium eyewear concept developed through product visualisation, editorial layouts and social creative.',
      image: 'assets/projects/refined-vision/hero.webp',
      className: 'project-refined'
    },
    {
      slug: 'devvolve-brand-identity',
      title: 'DevVolve',
      category: 'Technology brand identity',
      description: 'A modular geometric identity designed to work across digital products, outdoor media and apparel.',
      image: 'assets/projects/devvolve/hero.webp',
      className: 'project-devvolve'
    },
    {
      slug: 'people-water-product-design',
      title: 'People Water',
      category: 'Product identity · Packaging',
      description: 'A bold bottled-water system extended across packaging, retail, campaign and delivery touchpoints.',
      image: 'assets/projects/people-water/hero.webp',
      className: 'project-people-water'
    }
  ];

  const wrapper = document.createElement('div');
  wrapper.setAttribute('data-added-projects', 'true');
  wrapper.style.display = 'contents';
  wrapper.innerHTML = projects.map(project => `
    <article class="work-card portfolio-project-card ${project.className}">
      <a class="project-card-link" href="work/${project.slug}/" aria-label="View the ${project.title} project">
        <div class="portfolio-project-image">
          <img src="${project.image}" alt="${project.title} selected project visual" loading="lazy">
          <span class="project-card-action">View project ↗</span>
        </div>
        <div class="work-meta">
          <div><span>${project.category}</span><h3>${project.title}</h3></div>
          <p>${project.description}</p>
        </div>
      </a>
    </article>`).join('');

  workGrid.appendChild(wrapper);

  const workIntro = document.querySelector('#work .section-heading p:last-child');
  if (workIntro) {
    workIntro.textContent = 'Zelto Tech is a new name, not a team starting from zero. Our experience spans paid media, B2B campaigns, automation, brand identity, packaging and product-led creative.';
  }
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

const updateHeader = () => {
  header?.classList.toggle('scrolled', window.scrollY > 42);
};
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuButton?.addEventListener('click', () => {
  const open = !mobileMenu.classList.contains('open');
  mobileMenu.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('menu-open', open);
});
mobileMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
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
const signals = [
  'Northstar is entering the healthcare market',
  'your team is hiring for international growth',
  'you recently launched a new B2B product',
  'your paid media mix is shifting towards search'
];
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
  const message = String(data.get('message') || '').trim();
  const subject = encodeURIComponent(`Zelto Tech enquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nWhat they are trying to achieve:\n${message}`);
  window.location.href = `mailto:suhayb@lcmb.co.uk?subject=${subject}&body=${body}`;
});
