
// Simple particle system using canvas for ambient neon particles
(function(){
  const canvasWrap = document.createElement('div');
  canvasWrap.className = 'particles';
  document.addEventListener('DOMContentLoaded', ()=>{
    const container = document.querySelector('main') || document.body;
    container.appendChild(canvasWrap);
    const canvas = document.createElement('canvas');
    canvasWrap.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let w, h, particles = [];
    function initCanvas(){
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      particles = [];
      const count = Math.floor((w*h)/90000); // density
      for(let i=0;i<count;i++){
        particles.push({
          x: Math.random()*w,
          y: Math.random()*h,
          r: Math.random()*2.2 + 0.6,
          vx: (Math.random()-0.5)*0.3,
          vy: (Math.random()-0.5)*0.3,
          hue: (Math.random()*60)+180, // cyan-purple range
          alpha: Math.random()*0.6 + 0.12
        });
      }
    }
    function draw(){
      ctx.clearRect(0,0,w,h);
      particles.forEach(p=>{
        p.x += p.vx; p.y += p.vy;
        if(p.x<0)p.x=w;
        if(p.x>w)p.x=0;
        if(p.y<0)p.y=h;
        if(p.y>h)p.y=0;
        const g = ctx.createRadialGradient(p.x,p.y,p.r*0.2,p.x,p.y,p.r*10);
        const c1 = 'hsla('+p.hue+',90%,'+'50%,'+p.alpha+')';
        g.addColorStop(0,c1);
        g.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r*6,0,Math.PI*2);
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    initCanvas();
    draw();
    window.addEventListener('resize', ()=>initCanvas());
  });
})();

// Subtle parallax for orbs and beams (reduce motion on user preference)
(function(){
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(prefersReduced) return;
  document.addEventListener('mousemove', e=>{
    const tx = (e.clientX - window.innerWidth/2)/60;
    const ty = (e.clientY - window.innerHeight/2)/60;
    document.querySelectorAll('.light-orb').forEach((el,i)=>{
      el.style.transform = `translate(${tx*(i+1)}px, ${ty*(i+1)}px)`;
    });
    document.querySelectorAll('.beam').forEach((el,i)=>{
      el.style.transform = `translateX(${tx*(i+1)}px) rotate(${ -12 + tx*(i+1) }deg)`;
    });
  });
})();
