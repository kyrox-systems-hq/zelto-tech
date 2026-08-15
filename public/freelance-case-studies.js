const MARLENE_PHOTO = 'https://telehealth.org/wp-content/uploads/2025/05/Marlene-M.-Maheu.jpg';
const QORDATA_LOGO = 'https://cdn.theorg.com/ec654518-cf1b-4c04-9d14-591eb4ea0506_medium.jpg';
const TELEHEALTH_LOGO = 'https://mma.prnewswire.com/media/2678957/Telehealth_org_logo.jpg?p=facebook';

const clientAvatar = (className = '') => `
  <div class="client-avatar ${className}">
    <span aria-hidden="true">MM</span>
    <img src="${MARLENE_PHOTO}" alt="Marlene M. Maheu, PhD" loading="lazy" decoding="async" referrerpolicy="no-referrer">
  </div>`;

const installNamedFreelanceCases = () => {
  const qordataCard = document.querySelector('.linkedin-work')?.closest('.work-card');
  const telehealthCard = document.querySelector('.automation-work')?.closest('.work-card');
  const proof = document.querySelector('.proof-strip');

  if (qordataCard && !qordataCard.dataset.namedClientCase) {
    qordataCard.dataset.namedClientCase = 'qordata';
    qordataCard.classList.add('client-case-card', 'client-case-qordata', 'work-card-wide');
    qordataCard.innerHTML = `
      <a class="client-case-link" href="work/qordata-b2b-advertising/" aria-label="View the Qordata B2B advertising case study">
        <div class="client-case-cover qordata-cover">
          <div class="brand-cover-copy">
            <div class="brand-logo-plate qordata-logo-plate">
              <img src="${QORDATA_LOGO}" alt="qordata" loading="lazy" decoding="async" referrerpolicy="no-referrer">
            </div>
            <p class="brand-cover-kicker">B2B demand generation · Life sciences compliance</p>
            <h3>From paid attention to commercially useful leads.</h3>
            <div class="brand-cover-stat"><strong>+17%</strong><span>qualified leads</span></div>
            <div class="brand-cover-chips"><span>LinkedIn Ads</span><span>Google Search</span><span>Lead Magnets</span><span>Retargeting</span></div>
          </div>
          <div class="qordata-cover-system" aria-hidden="true">
            <div class="qd-screen">
              <div class="qd-screen-head"><span>Campaign architecture</span><i>LIVE</i></div>
              <div class="qd-audience-row"><b>01</b><div><span>Decision-maker audience</span><strong>Commercial compliance roles</strong></div><em>LinkedIn</em></div>
              <div class="qd-audience-row"><b>02</b><div><span>Active intent</span><strong>Search demand</strong></div><em>Google</em></div>
              <div class="qd-audience-row"><b>03</b><div><span>Conversion asset</span><strong>Lead magnet</strong></div><em>Content</em></div>
              <div class="qd-audience-row qualified"><b>04</b><div><span>Commercial outcome</span><strong>Qualified lead</strong></div><em>+17%</em></div>
            </div>
            <div class="qd-orbit orbit-a"></div><div class="qd-orbit orbit-b"></div>
            <div class="qd-data-pill pill-a">High-intent search</div>
            <div class="qd-data-pill pill-b">Retargeting</div>
          </div>
          <div class="platform-label">View case study ↗</div>
        </div>
        <div class="work-meta">
          <div><span>Qordata · B2B advertising</span><h3>Demand generation for compliance software</h3></div>
          <p>LinkedIn and Google search campaigns, stronger conversion assets and retargeting that increased qualified leads by 17%.</p>
        </div>
      </a>`;
  }

  if (telehealthCard && !telehealthCard.dataset.namedClientCase) {
    telehealthCard.dataset.namedClientCase = 'telehealth';
    telehealthCard.classList.add('client-case-card', 'client-case-telehealth', 'work-card-wide');
    telehealthCard.innerHTML = `
      <a class="client-case-link" href="work/telehealth-growth-marketing/" aria-label="View the Telehealth.org growth marketing case study">
        <div class="client-case-cover telehealth-cover">
          <div class="brand-cover-copy telehealth-copy">
            <div class="brand-logo-plate telehealth-logo-plate">
              <img src="${TELEHEALTH_LOGO}" alt="Telehealth.org" loading="lazy" decoding="async" referrerpolicy="no-referrer">
            </div>
            <p class="brand-cover-kicker">Paid growth · Education and virtual care</p>
            <h3>Paid, grant and landing-page acquisition working as one system.</h3>
            <div class="telehealth-proof-row">
              <div class="brand-cover-stat"><strong>400%</strong><span>ROI</span></div>
              <div class="brand-cover-stat secondary"><strong>~$10K</strong><span>monthly media</span></div>
            </div>
            <div class="brand-cover-chips"><span>Google Ads</span><span>Google Grant</span><span>LinkedIn</span><span>Landing Pages</span></div>
          </div>
          <div class="telehealth-cover-system">
            <div class="telehealth-orbit" aria-hidden="true">
              <div class="th-node node-search"><span>Search</span><strong>Paid intent</strong></div>
              <div class="th-node node-grant"><span>Grant</span><strong>Qualified reach</strong></div>
              <div class="th-node node-linkedin"><span>LinkedIn</span><strong>B2B audience</strong></div>
              <div class="th-core"><strong>5</strong><span>landing pages</span></div>
              <div class="th-node node-return"><span>Return</span><strong>400% ROI</strong></div>
            </div>
            <div class="telehealth-client-panel">
              ${clientAvatar('client-avatar-cover')}
              <div><span>Client</span><strong>Marlene M. Maheu, PhD</strong><small>Founder · Telehealth.org</small></div>
            </div>
          </div>
          <div class="platform-label">View case study ↗</div>
        </div>
        <div class="work-meta">
          <div><span>Telehealth.org · Growth marketing</span><h3>Paid, grant and landing-page acquisition</h3></div>
          <p>Google paid media, Google Grant, LinkedIn and landing-page optimisation connected into one measurable acquisition system.</p>
        </div>
      </a>`;
  }

  if (proof && !proof.dataset.telehealthProof) {
    proof.dataset.telehealthProof = 'true';
    proof.classList.add('telehealth-proof');
    proof.innerHTML = `
      <div class="testimonial-brand-lockup">
        <div class="brand-logo-plate testimonial-logo"><img src="${TELEHEALTH_LOGO}" alt="Telehealth.org" loading="lazy" decoding="async" referrerpolicy="no-referrer"></div>
        ${clientAvatar('client-avatar-proof')}
      </div>
      <blockquote>Refreshingly professional and on-point. We look forward to working with Suhayb in the future.</blockquote>
      <div class="quote-source">
        <strong>Marlene M. Maheu, PhD</strong>
        <span>Founder · Telehealth.org</span>
        <small>Client feedback after the Telehealth.org growth marketing engagement</small>
      </div>`;
  }
};

installNamedFreelanceCases();
window.dispatchEvent(new CustomEvent('zelto:portfolio-ready'));
import('./homepage-proof-corrected.js').catch(error => console.error('Homepage proof failed to load', error));
