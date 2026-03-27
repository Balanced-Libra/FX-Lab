const effectCanvasBouncingBalls = {
    id: "canvas-bouncing-balls",
    name: "Bouncing Balls",
    type: "JS/Canvas",
    tags: ["canvas","physics","playful","energetic"],
    perf: "CPU-light",
    description: `
      <h3>What this shows</h3>
      <ul>
        <li>Gravity + wall bounce (restitution, friction).</li>
        <li>Resize-safe canvas; click to add a ball.</li>
      </ul>`,
    async load(){},
    init(container){
      const c = document.createElement("canvas"); container.appendChild(c);
      const ctx = c.getContext("2d"); const dpr = Math.min(2, window.devicePixelRatio||1);
      const resize=()=>{ const w=container.clientWidth,h=container.clientHeight;
        c.width=Math.floor(w*dpr); c.height=Math.floor(h*dpr); c.style.width=w+"px"; c.style.height=h+"px"; ctx.setTransform(dpr,0,0,dpr,0,0); };
      resize(); const ro=new ResizeObserver(resize); ro.observe(container);
  
      const balls=[]; const R=[10,14,18,22]; const COLORS=["#5b9dff","#34d399","#fbbf24","#f472b6","#60a5fa"];
      function addBall(x,y){
        const r = R[(Math.random()*R.length)|0];
        balls.push({x,y, vx:(Math.random()-.5)*6, vy:(Math.random()-.5)*2, r, col:COLORS[(Math.random()*COLORS.length)|0]});
      }
      // seed
      for(let i=0;i<8;i++) addBall(Math.random()*c.clientWidth, Math.random()*c.clientHeight*0.5);
  
      c.addEventListener("click",(e)=>{const r=c.getBoundingClientRect(); addBall(e.clientX-r.left, e.clientY-r.top);});
  
      const grav=0.35, bounce=0.78, fric=0.995; let raf;
      const step=()=>{
        ctx.clearRect(0,0,c.clientWidth,c.clientHeight);
        for(const b of balls){
          b.vy += grav;
          b.x += b.vx; b.y += b.vy;
          // walls
          if(b.x < b.r){ b.x=b.r; b.vx*=-bounce; }
          if(b.x > c.clientWidth-b.r){ b.x=c.clientWidth-b.r; b.vx*=-bounce; }
          if(b.y < b.r){ b.y=b.r; b.vy*=-bounce; }
          if(b.y > c.clientHeight-b.r){ b.y=c.clientHeight-b.r; b.vy*=-bounce; b.vx*=0.98; }
          b.vx*=fric; b.vy*=fric;
          // draw
          const g=ctx.createRadialGradient(b.x,b.y,0,b.x,b.y,b.r);
          g.addColorStop(0,"rgba(231,234,240,.95)"); g.addColorStop(1,b.col+"00");
          ctx.fillStyle=g; ctx.beginPath(); ctx.arc(b.x,b.y,b.r,0,Math.PI*2); ctx.fill();
          ctx.strokeStyle="#1c2332"; ctx.lineWidth=1; ctx.stroke();
        }
        raf=requestAnimationFrame(step);
      };
      raf=requestAnimationFrame(step);
  
      this._cleanup=()=>{ cancelAnimationFrame(raf); ro.disconnect(); container.innerHTML=""; };
    },
    teardown(){ this._cleanup?.(); }
  };
  
  // Register this effect
  window.EFFECTS_REGISTRY.registerEffect(effectCanvasBouncingBalls);