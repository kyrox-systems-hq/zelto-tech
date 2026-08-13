import('./portfolio-a.js').then(()=>import('./portfolio-b.js')).then(()=>import('./portfolio-c.js')).then(()=>import('./portfolio-d.js')).then(()=>import('./homepage-proof.js')).catch(console.error);
