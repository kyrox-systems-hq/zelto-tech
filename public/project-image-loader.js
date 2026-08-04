const PROJECT_IMAGE_PARTS = { xiq: 2, 'refined-vision': 2, devvolve: 2, 'people-water': 3 };

const hydrateProjectImages = async (root = document) => {
  const base = document.body.dataset.assetBase || '';
  const images = root.querySelectorAll('[data-project-image]');
  await Promise.all([...images].map(async image => {
    const project = image.dataset.projectImage;
    const count = PROJECT_IMAGE_PARTS[project];
    if (!count) return;
    try {
      const parts = await Promise.all(Array.from({ length: count }, async (_, index) => {
        const part = String(index).padStart(2, '0');
        const response = await fetch(`${base}assets/projects/${project}/image-${part}.txt`);
        if (!response.ok) throw new Error(`${project} image part ${part} failed to load`);
        return response.text();
      }));
      image.src = `data:image/webp;base64,${parts.join('').replace(/\s/g, '')}`;
    } catch (error) {
      console.warn(`The ${project} project image could not be loaded.`, error);
    }
  }));
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => hydrateProjectImages());
} else {
  hydrateProjectImages();
}
