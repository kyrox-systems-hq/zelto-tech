const s=document.querySelector('#work'),g=s?.querySelector('.work-grid');
const c=x=>g?.querySelector(`a[href*="${x}"]`)?.closest('.work-card');
window.ZP={s,g,f:c('fizzy-funk-packaging'),m:g?.querySelector('.medsattire-case'),t:c('telehealth-growth-marketing'),q:c('qordata-b2b-advertising'),d:[...(g?.querySelectorAll('.portfolio-project-card')||[])]};
