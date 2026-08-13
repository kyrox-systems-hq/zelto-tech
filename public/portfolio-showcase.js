// Homepage portfolio layout module.
const setupPortfolio=()=>{
  const section=document.querySelector('#work');
  const grid=section?.querySelector('.work-grid');
  if(!grid||section.querySelector('.portfolio-showcase')) return false;
  const card=name=>grid.querySelector(`a[href*="${name}"]`)?.closest('.work-card');
  const fizzy=card('fizzy-funk-packaging');
  const meds=grid.querySelector('.medsattire-case');
  const telehealth=card('telehealth-growth-marketing');
