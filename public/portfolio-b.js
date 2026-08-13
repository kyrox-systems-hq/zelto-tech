const {s,g}=ZP,h=s?.querySelector('.section-heading');if(!s||!g)throw Error('Portfolio missing');
h.querySelector('h2').textContent='Selected work across brand, performance and growth.';
h.querySelector('div>p').textContent='Start with three featured projects, then browse more selected work.';
const w=document.createElement('div');w.className='portfolio-showcase';g.before(w);ZP.w=w;
