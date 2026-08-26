(() => {
  const findCard = (root, fragment) => root.querySelector(`a[href*="${fragment}"]`)?.closest('.work-card');
  const createShelfClone = (card, type) => {
    const clone = card.cloneNode(true);
    clone.classList.add('portfolio-shelf-item');
    clone.classList.remove('reveal');
    clone.dataset.featuredShelfCopy = type;

    if (type === 'medsattire') {
      const href = 'work/medsattire-meta-ads/';
      if (!clone.querySelector('.medsattire-card-overlay')) {
        clone.insertAdjacentHTML('afterbegin', `<a class="medsattire-card-overlay" href="${href}" aria-label="View the MedsAttire Meta Ads case study"></a>`);
      }
      const symbol = clone.querySelector('.medsattire-symbol');
      if (symbol) {
        symbol.classList.add('medsattire-brand-mark', 'is-logo-ready');
        symbol.innerHTML = '<img src="assets/clients/medsattire-logo.svg" alt="MedsAttire" loading="lazy" decoding="async">';
      }
      const secondaryLink = clone.querySelector('.medsattire-site-link');
      if (secondaryLink) {
        secondaryLink.href = href;
        secondaryLink.removeAttribute('target');
        secondaryLink.removeAttribute('rel');
        secondaryLink.tabIndex = -1;
        secondaryLink.setAttribute('aria-hidden', 'true');
      }
    }

    return clone;
  };

  const enforceOrder = () => {
    const section = document.querySelector('#work');
    if (!section) return false;

    const meds = section.querySelector('.medsattire-case');
    const telehealth = findCard(section, 'telehealth-growth-marketing');
    const fizzy = findCard(section, 'fizzy-funk-packaging');
    const qordata = findCard(section, 'qordata-b2b-advertising');
    const xiq = findCard(section, 'xiq-brand-system');
    const refined = findCard(section, 'refined-vision-product-design');
    const devvolve = findCard(section, 'devvolve-brand-identity');
    const people = findCard(section, 'people-water-product-design');
    const proof = section.querySelector('.proof-strip');
    if (!meds || !telehealth || !fizzy) return false;

    let showcase = section.querySelector('.portfolio-showcase');
    if (showcase?.dataset.orderLocked === 'true') {
      const more = showcase.querySelector('.portfolio-more');
      if (proof && more && proof.previousElementSibling !== more) more.after(proof);
      return true;
    }
    const sourceGrid = section.querySelector('.work-grid');
    if (!showcase) {
      showcase = document.createElement('div');
      showcase.className = 'portfolio-showcase';
      sourceGrid?.before(showcase);
    }

    showcase.innerHTML = `
      <div class="portfolio-more portfolio-more-only">
        <div class="portfolio-more-head"><div><h3>Explore case studies.</h3></div><p>Swipe, scroll, or use the arrows.</p></div>
        <div class="portfolio-slider-shell">
          <button class="portfolio-slider-arrow is-prev" type="button" aria-label="Previous case studies"><span aria-hidden="true">←</span></button>
          <div class="portfolio-shelf-track" role="region" tabindex="0" aria-label="Case studies"></div>
          <button class="portfolio-slider-arrow is-next" type="button" aria-label="Next case studies"><span aria-hidden="true">→</span></button>
        </div>
      </div>`;

    const track = showcase.querySelector('.portfolio-shelf-track');
    const medsShelfCard = createShelfClone(meds, 'medsattire');
    const telehealthShelfCard = createShelfClone(telehealth, 'telehealth');
    [medsShelfCard, telehealthShelfCard, qordata, xiq, fizzy, refined, devvolve, people].filter(Boolean).forEach(card => {
      card.classList.add('portfolio-shelf-item');
      track.append(card);
    });

    const more = showcase.querySelector('.portfolio-more');
    if (proof && more) more.after(proof);
    sourceGrid?.remove();

    const step = () => (track.firstElementChild?.getBoundingClientRect().width || track.clientWidth) + 18;
    showcase.querySelector('.is-prev').onclick = () => { track.scrollLeft -= step(); };
    showcase.querySelector('.is-next').onclick = () => { track.scrollLeft += step(); };

    showcase.dataset.orderLocked = 'true';
    return true;
  };

  let attempts = 0;
  const lock = () => {
    if (enforceOrder()) return;
    attempts += 1;
    if (attempts < 30) window.setTimeout(lock, 100);
  };

  lock();
  window.addEventListener('zelto:portfolio-ready', enforceOrder);
  window.addEventListener('zelto:homepage-proof-ready', enforceOrder);
  window.setTimeout(enforceOrder, 750);
  window.setTimeout(enforceOrder, 1800);
})();
