const effectCanvasMetaballs = {
    id: "canvas-metaballs",
    name: "Metaballs (blur+contrast)",
    type: "JS/Canvas",
    tags: ["canvas","filter","particles","playful","calming"],
    perf: "GPU/CPU medium",
    description: `
      <h3>What this shows</h3>
      <ul>
        <li>Glowing blobs drift around the screen and melt together when they get close, like drops of liquid merging.</li>
        <li>Click anywhere to add a new blob, up to 12 at once.</li>
      </ul>`,
    async load(){},
    init(container){
      container.innerHTML = `
        <style>
          .mb{height:100%;position:relative}
          .mb canvas{position:absolute;inset:0;filter:blur(12px) contrast(18) saturate(1.2);}
          .mb .hint{position:absolute;left:10px;bottom:10px;color:#9aa1ad;background:#0f1218;border:1px solid var(--line);
                    border-radius:10px;padding:6px 8px;font-size:12px}
        </style>
        <div class="mb">
          <canvas id="mbc"></canvas>
          <div class="hint">Click to add a blob</div>
        </div>`;
      const c = container.querySelector("#mbc"), ctx = c.getContext("2d");
      const dpr = Math.min(2, window.devicePixelRatio||1);
      const resize = ()=>{
        const w = container.clientWidth, h = container.clientHeight;
        c.width = Math.floor(w*dpr); c.height = Math.floor(h*dpr);
        c.style.width = w+"px"; c.style.height = h+"px";
        ctx.setTransform(dpr,0,0,dpr,0,0);
      };
      resize(); const ro=new ResizeObserver(resize); ro.observe(container);
  
      const balls = [];
      const addBall = (x,y)=>{
        if(balls.length>=12) return;
        const r = 20+Math.random()*30;
        balls.push({x,y, vx:(Math.random()-.5)*2, vy:(Math.random()-.5)*2, r});
      };
      // seed a few
      addBall(c.clientWidth*0.3, c.clientHeight*0.4);
      addBall(c.clientWidth*0.6, c.clientHeight*0.6);
      addBall(c.clientWidth*0.5, c.clientHeight*0.3);
  
      c.addEventListener("click", (e)=>{
        const r=c.getBoundingClientRect();
        addBall(e.clientX-r.left, e.clientY-r.top);
      });
  
      let raf;
      const step = ()=>{
        ctx.clearRect(0,0,c.clientWidth,c.clientHeight);
        ctx.globalCompositeOperation="lighter";
        for(const b of balls){
          b.x += b.vx; b.y += b.vy;
          if(b.x < b.r || b.x > c.clientWidth-b.r) b.vx*=-1;
          if(b.y < b.r || b.y > c.clientHeight-b.r) b.vy*=-1;
  
          const grd = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
          grd.addColorStop(0, "rgba(91,157,255,0.95)");
          grd.addColorStop(1, "rgba(91,157,255,0)");
          ctx.fillStyle = grd;
          ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI*2); ctx.fill();
        }
        raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
  
      this._cleanup = ()=>{ cancelAnimationFrame(raf); ro.disconnect(); container.innerHTML=""; };
    },
    teardown(){ this._cleanup?.(); }
  };
  
  // Register this effect
  window.EFFECTS_REGISTRY.registerEffect(effectCanvasMetaballs);