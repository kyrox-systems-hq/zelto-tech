import('./portfolio-a.js').then(()=>import('./portfolio-b.js')).then(()=>import('./portfolio-c.js')).then(()=>import('./portfolio-d.js')).catch(console.error);
