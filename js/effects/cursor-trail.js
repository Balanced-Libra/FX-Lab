const effectCursorTrail = {
  id: "canvas-cursor-trail",
  name: "Cursor Trail (soft particles)",
  type: "JS/Canvas",
  tags: ["canvas","interaction","particles","playful","calming"],
  perf: "GPU/CPU light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>Pointer-driven particle emission.</li>
      <li>Fade + shrink until particles die.</li>
    </ul>`,
  async load(){},
  init(container){
    const c = document.createElement("canvas"); container.appendChild(c);
    const ctx = c.getContext("2d"); const dpr = Math.min(2, window.devicePixelRatio||1);
    const resize=()=>{ const w=container.clientWidth,h=container.clientHeight;
      c.width=Math.floor(w*dpr); c.height=Math.floor(h*dpr); c.style.width=w+"px"; c.style.height=h+"px"; ctx.setTransform(dpr,0,0,dpr,0,0); };
    resize(); const ro=new ResizeObserver(resize); ro.observe(container);

    const P=[]; let raf, mouse=null;
    const emit = (x,y)=>{ for(let i=0;i<6;i++){ P.push({x,y, vx:(Math.random()-.5)*1.2, vy:(Math.random()-.5)*1.2, r:6+Math.random()*6, a:1}); } };
    const onMove = (e)=>{ const r=c.getBoundingClientRect(); mouse={x:e.clientX-r.left, y:e.clientY-r.top}; emit(mouse.x, mouse.y); };
    const onLeave = ()=>{ mouse=null; };

    c.addEventListener("pointermove", onMove);
    c.addEventListener("pointerleave", onLeave);

    const step=()=>{
      ctx.clearRect(0,0,c.clientWidth,c.clientHeight);
      for(let i=P.length-1;i>=0;i--){
        const p=P[i];
        p.x+=p.vx; p.y+=p.vy; p.r*=0.985; p.a*=0.96;
        if(p.a<0.03 || p.r<0.6){ P.splice(i,1); continue; }
        const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);
        g.addColorStop(0, `rgba(91,157,255,${p.a})`);
        g.addColorStop(1, `rgba(91,157,255,0)`);
        ctx.fillStyle=g; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
      }
      raf=requestAnimationFrame(step);
    };
    raf=requestAnimationFrame(step);

    this._cleanup = ()=>{ cancelAnimationFrame(raf); ro.disconnect(); c.removeEventListener("pointermove", onMove); c.removeEventListener("pointerleave", onLeave); container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectCursorTrail);