const installOfficialBranding = () => {
  document.querySelectorAll('.brand').forEach(brand => {
    const isFooter = brand.classList.contains('footer-brand');
    brand.innerHTML = isFooter
      ? '<img class="brand-logo brand-logo-white" src="assets/zelto-white-logo.svg" alt="Zelto Tech">'
      : '<img class="brand-logo brand-logo-white" src="assets/zelto-white-logo.svg" alt="Zelto Tech"><img class="brand-logo brand-logo-dark" src="assets/zelto-dark-logo.svg" alt="" aria-hidden="true">';
  });

  const posterMark = document.querySelector('.poster-two');
  if (posterMark) {
    posterMark.innerHTML = '<img class="poster-logo-mark" src="assets/favicon.svg" alt="">';
  }
};

const installFizzyFunkWork = async () => {
  const featuredWork = document.querySelector('.work-card-wide');
  if (!featuredWork) return;

  try {
    const parts = await Promise.all(
      [0, 1, 2, 3, 4].map(async index => {
        const response = await fetch(`assets/fizzy-data-${index}.txt`);
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

installOfficialBranding();
installFizzyFunkWork();

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
