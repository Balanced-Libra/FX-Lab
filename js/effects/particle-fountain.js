// 2) JS Canvas "Particle Fountain"
const effectParticleFountain = {
  id: "js-particle-fountain",
  name: "Particle Fountain",
  type: "JS/Canvas",
  tags: ["canvas","particles"],
  perf: "GPU/CPU medium",
  async load(){},
  init(container){
    const c = document.createElement("canvas");
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    container.appendChild(c);
    const ctx = c.getContext("2d");

    const resize = ()=>{
      const w = container.clientWidth, h = container.clientHeight;
      c.width = Math.floor(w*dpr); c.height = Math.floor(h*dpr);
      c.style.width = w+"px"; c.style.height = h+"px";
      ctx.setTransform(dpr,0,0,dpr,0,0);
    };
    resize(); const ro = new ResizeObserver(resize); ro.observe(container);

    const P = [];
    const GRAV = 0.12, DRAG = 0.995, EMIT_RATE = 6;
    function emit(){
      const cx = c.clientWidth/2, cy = c.clientHeight-20;
      for(let i=0;i<EMIT_RATE;i++){
        const angle = (-Math.PI/2) + (Math.random()-.5)*0.6;
        const speed = 4 + Math.random()*2.5;
        P.push({ x: cx, y: cy, vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed-1.0, life: 90 + Math.random()*50 });
      }
    }

    let raf;
    const step = ()=>{
      emit();
      for(let i=P.length-1;i>=0;i--){
        const p=P[i];
        p.vx*=DRAG; p.vy=(p.vy+GRAV)*DRAG; p.x+=p.vx; p.y+=p.vy; p.life-=1;
        if(p.life<0 || p.y>c.clientHeight+20) P.splice(i,1);
      }
      ctx.clearRect(0,0,c.clientWidth,c.clientHeight);
      ctx.globalCompositeOperation="lighter";
      for(const p of P){
        const a = Math.max(0, Math.min(1, p.life/120));
        ctx.beginPath(); ctx.arc(p.x,p.y, 2.5, 0, Math.PI*2);
        ctx.fillStyle = `rgba(91,157,255,${a})`; ctx.fill();
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    this._cleanup = ()=>{ cancelAnimationFrame(raf); ro.disconnect(); container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectParticleFountain);