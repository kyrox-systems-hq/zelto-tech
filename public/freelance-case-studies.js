const MARLENE_PHOTO = 'https://telehealth.org/wp-content/uploads/2025/05/Marlene-M.-Maheu.jpg';

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
    qordataCard.classList.add('client-case-card', 'client-case-qordata');
    qordataCard.innerHTML = `
      <a class="client-case-link" href="work/qordata-b2b-advertising/" aria-label="View the Qordata B2B advertising case study">
        <div class="client-case-visual qordata-case-visual">
          <div class="client-case-topline"><span>qordata</span><span>Jul–Oct 2022</span></div>
          <div class="client-case-result"><strong>+17%</strong><span>qualified leads</span></div>
          <div class="client-case-channels"><span>LinkedIn Ads</span><span>Google Search</span><span>Retargeting</span></div>
          <div class="platform-label">View case study ↗</div>
        </div>
        <div class="work-meta">
          <div><span>Qordata · B2B advertising</span><h3>Demand generation for compliance software</h3></div>
          <p>LinkedIn and Google search campaigns, lead-magnet improvements and retargeting that increased qualified leads by 17%.</p>
        </div>
      </a>`;
  }

  if (telehealthCard && !telehealthCard.dataset.namedClientCase) {
    telehealthCard.dataset.namedClientCase = 'telehealth';
    telehealthCard.classList.add('client-case-card', 'client-case-telehealth');
    telehealthCard.innerHTML = `
      <a class="client-case-link" href="work/telehealth-growth-marketing/" aria-label="View the Telehealth.org growth marketing case study">
        <div class="client-case-visual telehealth-case-visual">
          <div class="client-case-topline"><span>Telehealth.org</span><span>Jun–Oct 2022</span></div>
          <div class="client-case-result"><strong>400%</strong><span>ROI</span></div>
          <div class="telehealth-card-client">
            ${clientAvatar('client-avatar-small')}
            <div><strong>Marlene M. Maheu, PhD</strong><span>Founder & CEO · Telehealth.org</span></div>
          </div>
          <div class="client-case-channels"><span>Google Ads</span><span>Google Grant</span><span>LinkedIn</span></div>
          <div class="platform-label">View case study ↗</div>
        </div>
        <div class="work-meta">
          <div><span>Telehealth.org · Growth marketing</span><h3>Paid, grant and landing-page acquisition</h3></div>
          <p>Managed roughly $10K in monthly media across search and display, with audience and landing-page optimisation delivering 400% ROI.</p>
        </div>
      </a>`;
  }

  if (proof && !proof.dataset.telehealthProof) {
    proof.dataset.telehealthProof = 'true';
    proof.classList.add('telehealth-proof');
    proof.innerHTML = `
      ${clientAvatar('client-avatar-proof')}
      <blockquote>Refreshingly professional and on-point. We look forward to working with Suhayb in the future.</blockquote>
      <div class="quote-source">
        <strong>Marlene M. Maheu, PhD</strong>
        <span>Founder & CEO · Telehealth.org</span>
        <small>Client feedback after the Telehealth.org growth marketing engagement</small>
      </div>`;
  }
};

installNamedFreelanceCases();
