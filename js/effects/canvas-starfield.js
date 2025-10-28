const effectCanvasStarfield = {
    id: "canvas-starfield",
    name: "Starfield (warp on click)",
    type: "JS/Canvas",
    tags: ["canvas","particles"],
    perf: "GPU/CPU light",
    description: `
      <h3>What this shows</h3>
      <ul>
        <li>2D canvas with depth-based speed.</li>
        <li>Resize-safe; click toggles warp speed.</li>
      </ul>`,
    async load(){},
    init(container){
      const c = document.createElement("canvas"); container.appendChild(c);
      const ctx = c.getContext("2d"); const dpr = Math.min(2, window.devicePixelRatio||1);
      const resize=()=>{ const w=container.clientWidth,h=container.clientHeight;
        c.width=Math.floor(w*dpr); c.height=Math.floor(h*dpr); c.style.width=w+"px"; c.style.height=h+"px"; ctx.setTransform(dpr,0,0,dpr,0,0); };
      resize(); const ro=new ResizeObserver(resize); ro.observe(container);
  
      const N = 240; const stars = []; let warp=false;
      const resetStar = (s)=>{ s.x=(Math.random()-0.5)*c.clientWidth; s.y=(Math.random()-0.5)*c.clientHeight; s.z=Math.random()*1+0.1; s.size = (1.2 - s.z)*2; };
      for(let i=0;i<N;i++){ stars.push({x:0,y:0,z:0,size:1}); resetStar(stars[i]); }
  
      const step=()=>{
        ctx.clearRect(0,0,c.clientWidth,c.clientHeight);
        ctx.translate(c.clientWidth/2, c.clientHeight/2);
        for(const s of stars){
          const spd = (warp? 4.5: 1.4) * (1.6 - s.z);
          s.y += spd;
          if(s.y > c.clientHeight/2 + 40) { s.y = -c.clientHeight/2 - 40; s.x = (Math.random()-0.5)*c.clientWidth; s.z = Math.random()*1+0.1; s.size=(1.2 - s.z)*2; }
          ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI*2);
          ctx.fillStyle = "rgba(231,234,240,0.85)"; ctx.fill();
        }
        ctx.setTransform(1,0,0,1,0,0);
        raf = requestAnimationFrame(step);
      };
      let raf = requestAnimationFrame(step);
      const toggle=()=>{ warp=!warp; };
      c.addEventListener("click", toggle);
  
      this._cleanup=()=>{ cancelAnimationFrame(raf); ro.disconnect(); c.removeEventListener("click", toggle); container.innerHTML=""; };
    },
    teardown(){ this._cleanup?.(); }
  };
  
  // Register this effect
  window.EFFECTS_REGISTRY.registerEffect(effectCanvasStarfield);