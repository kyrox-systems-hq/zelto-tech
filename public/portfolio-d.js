const {w,g,f,m,t,q,d,s}=ZP,tr=w.querySelector('.portfolio-shelf-track');
w.querySelector('.featured-one').append(m);
w.querySelector('.featured-two').append(t);
[q,f,...d].forEach(x=>{x.classList.add('portfolio-shelf-item');tr.append(x)});
g.hidden=true;
const p=s.querySelector('.proof-strip');if(p)w.querySelector('.portfolio-featured-grid').after(p);
import('./portfolio-e.js').then(()=>import('./portfolio-f.js'));
