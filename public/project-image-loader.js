const PROJECT_IMAGES = {
  xiq: { src: 'assets/projects/xiq/xiq.avif', width: 2400, height: 1350 },
  'refined-vision': { src: 'assets/projects/refined-vision/refined-vision.avif', width: 1400, height: 1167 },
  devvolve: { src: 'assets/projects/devvolve/devvolve.avif', width: 2000, height: 1658 },
  'people-water': { src: 'assets/projects/people-water/people-water.avif', width: 2400, height: 1340 }
};

const hydrateProjectImages = (root = document) => {
  const base = document.body.dataset.assetBase || '';

  root.querySelectorAll('[data-project-image]').forEach(image => {
    const asset = PROJECT_IMAGES[image.dataset.projectImage];
    if (!asset) return;
    image.src = `${base}${asset.src}`;
    image.width = asset.width;
    image.height = asset.height;
    image.decoding = 'async';
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => hydrateProjectImages());
} else {
  hydrateProjectImages();
}
