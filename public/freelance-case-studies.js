const MARLENE_PHOTO = 'https://telehealth.org/wp-content/uploads/2025/05/Marlene-M.-Maheu.jpg';

const clientAvatar = (className = '') => `
  <div class="client-avatar ${className}">
    <span aria-hidden="true">MM</span>
    <img src="${MARLENE_PHOTO}" alt="Marlene M. Maheu, PhD" loading="lazy" decoding="async" referrerpolicy="no-referrer">
  </div>`;

const metricDashboard = ({ title, status, metrics, flow, chartClass = '' }) => `
  <div class="client-case-dashboard ${chartClass}">
    <div class="dashboard-head"><strong>${title}</strong><span>${status}</span></div>
    <div class="dashboard-metrics">
      ${metrics.map(metric => `<div class="dashboard-metric"><span>${metric.label}</span><strong>${metric.value}</strong></div>`).join('')}
    </div>
    <div class="dashboard-chart" aria-hidden="true">${'<i></i>'.repeat(10)}</div>
    <div class="dashboard-flow">${flow.map(item => `<span>${item}</span>`).join('')}</div>
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
          <div class="client-case-copy-panel">
            <div class="client-case-topline"><span>qordata</span><span>B2B compliance software · 2022</span></div>
            <div class="client-case-result"><strong>+17%</strong><span>qualified leads</span></div>
            <div class="client-case-channels"><span>LinkedIn Ads</span><span>Google Search</span><span>Lead Magnets</span><span>Retargeting</span></div>
          </div>
          ${metricDashboard({
            title: 'Demand generation cockpit',
            status: 'Commercial lead quality',
            metrics: [
              { label: 'Qualified leads', value: '+17%' },
              { label: 'Core channels', value: '2' },
              { label: 'Funnel focus', value: 'B2B' }
            ],
            flow: ['Decision-maker audience', 'Search intent', 'Lead magnet', 'Qualified lead']
          })}
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
    telehealthCard.classList.add('client-case-card', 'client-case-telehealth');
    telehealthCard.innerHTML = `
      <a class="client-case-link" href="work/telehealth-growth-marketing/" aria-label="View the Telehealth.org growth marketing case study">
        <div class="client-case-visual telehealth-case-visual">
          <div class="client-case-copy-panel">
            <div class="client-case-topline"><span>Telehealth.org</span><span>Growth acquisition · 2022</span></div>
            <div class="client-case-result"><strong>400%</strong><span>ROI on roughly $10K monthly media spend</span></div>
            <div class="telehealth-card-client">
              ${clientAvatar('client-avatar-small')}
              <div><strong>Marlene M. Maheu, PhD</strong><span>Founder & CEO · Telehealth.org</span></div>
            </div>
            <div class="client-case-channels"><span>Google Ads</span><span>Google Grant</span><span>LinkedIn</span><span>Landing Pages</span></div>
          </div>
          ${metricDashboard({
            title: 'Acquisition system',
            status: 'Paid + grant + conversion',
            metrics: [
              { label: 'ROI', value: '400%' },
              { label: 'Monthly media', value: '~$10K' },
              { label: 'Landing pages', value: '5' }
            ],
            flow: ['Paid search', 'Grant media', 'Landing page', 'Training demand']
          })}
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
