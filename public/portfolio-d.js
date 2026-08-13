const {w,g,f,m,t,q,d,s}=ZP,tr=w.querySelector('.portfolio-shelf-track'),fg=w.querySelector('.portfolio-featured-grid');
fg.append(m,t);
const xiq=d[0],rest=d.slice(1);
[q,xiq,f,...rest].filter(Boolean).forEach(x=>{x.classList.add('portfolio-shelf-item');tr.append(x)});
g.hidden=true;
const p=s.querySelector('.proof-strip');if(p)fg.after(p);
import('./portfolio-e.js').then(()=>import('./portfolio-f.js'));
