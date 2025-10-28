const effectConfettiClick = {
    id: "canvas-confetti-click",
    name: "Confetti Burst (Click)",
    type: "JS/Canvas",
    tags: ["canvas","particles"],
    perf: "GPU/CPU medium",
    description: `
      <h3>What this shows</h3>
      <ul>
        <li>Canvas draw loop with <code>requestAnimationFrame</code>.</li>
        <li>Spawn particles on click; simple gravity + drag + rotation.</li>
        <li>Clean teardown (cancel rAF, remove listeners).</li>
      </ul>
    `,
    async load(){},
    init(container){
      const c = document.createElement("canvas"); container.appendChild(c);
      const ctx = c.getContext("2d"); const dpr = Math.min(2, window.devicePixelRatio||1);
      const resize=()=>{ const w=container.clientWidth,h=container.clientHeight;
        c.width=Math.floor(w*dpr); c.height=Math.floor(h*dpr); c.style.width=w+"px"; c.style.height=h+"px"; ctx.setTransform(dpr,0,0,dpr,0,0); };
      resize(); const ro=new ResizeObserver(resize); ro.observe(container);
  
      const colors=["#5b9dff","#a7f3d0","#f472b6","#fbbf24","#60a5fa","#34d399"];
      const P=[]; let raf;
      const spawn=(x,y)=>{
        for(let i=0;i<60;i++){
          P.push({
            x,y, w: 3+Math.random()*4, h: 6+Math.random()*8,
            vx:(Math.random()-.5)*6, vy:-Math.random()*6-3,
            r:Math.random()*Math.PI*2, vr:(Math.random()-.5)*0.2,
            col:colors[(Math.random()*colors.length)|0], life: 120+Math.random()*60
          });
        }
      };
      const click=(e)=>{ const r=c.getBoundingClientRect(); spawn(e.clientX-r.left, e.clientY-r.top); };
      c.addEventListener("click", click);
  
      const step=()=>{
        ctx.clearRect(0,0,c.clientWidth,c.clientHeight);
        for(let i=P.length-1;i>=0;i--){
          const p=P[i]; p.vx*=0.99; p.vy+=0.18; p.x+=p.vx; p.y+=p.vy; p.r+=p.vr; p.life--;
          if(p.life<=0 || p.y>c.clientHeight+40) { P.splice(i,1); continue; }
          ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.r);
          ctx.fillStyle=p.col; ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h); ctx.restore();
        }
        raf=requestAnimationFrame(step);
      };
      raf=requestAnimationFrame(step);
  
      this._cleanup=()=>{ cancelAnimationFrame(raf); ro.disconnect(); c.removeEventListener("click",click); container.innerHTML=""; };
    },
    teardown(){ this._cleanup?.(); }
  };
  
  // Register this effect
  window.EFFECTS_REGISTRY.registerEffect(effectConfettiClick);