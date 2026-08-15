(() => {
  const findCard = (root, fragment) => root.querySelector(`a[href*="${fragment}"]`)?.closest('.work-card');

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
      const featured = showcase.querySelector('.portfolio-featured-grid');
      if (proof && featured && proof.previousElementSibling !== featured) featured.after(proof);
      return true;
    }
    const sourceGrid = section.querySelector('.work-grid');
    if (!showcase) {
      showcase = document.createElement('div');
      showcase.className = 'portfolio-showcase';
      sourceGrid?.before(showcase);
    }

    showcase.innerHTML = `
      <div class="portfolio-featured-head"><span>Featured client work</span></div>
      <div class="portfolio-featured-grid portfolio-feature-secondary"></div>
      <div class="portfolio-more">
        <div class="portfolio-more-head"><div><span>More selected work</span><h3>Explore more case studies.</h3></div><p>Swipe, scroll, or use the arrows.</p></div>
        <div class="portfolio-slider-shell">
          <button class="portfolio-slider-arrow is-prev" type="button" aria-label="Previous case studies"><span aria-hidden="true">←</span></button>
          <div class="portfolio-shelf-track" role="region" tabindex="0" aria-label="More selected work"></div>
          <button class="portfolio-slider-arrow is-next" type="button" aria-label="More case studies"><span aria-hidden="true">→</span></button>
        </div>
      </div>`;

    const featured = showcase.querySelector('.portfolio-featured-grid');
    const track = showcase.querySelector('.portfolio-shelf-track');
    featured.append(meds, telehealth);
    [qordata, xiq, fizzy, refined, devvolve, people].filter(Boolean).forEach(card => {
      card.classList.add('portfolio-shelf-item');
      track.append(card);
    });

    if (proof) featured.after(proof);
    if (sourceGrid) {
      sourceGrid.hidden = true;
      sourceGrid.setAttribute('aria-hidden', 'true');
    }

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
