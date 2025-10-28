const effectCanvasFireworks = {
    id: "canvas-fireworks",
    name: "Fireworks (click)",
    type: "JS/Canvas",
    tags: ["canvas","particles","interaction"],
    perf: "GPU/CPU medium",
    description: `
      <h3>What this shows</h3>
      <ul>
        <li>Launch → burst → fade arcs with gravity.</li>
        <li>Click to launch at pointer; multiple concurrent shells.</li>
      </ul>`,
    async load(){},
    init(container){
      const c=document.createElement("canvas"); container.appendChild(c);
      const ctx=c.getContext("2d"); const dpr=Math.min(2,window.devicePixelRatio||1);
      const resize=()=>{ const w=container.clientWidth,h=container.clientHeight;
        c.width=Math.floor(w*dpr); c.height=Math.floor(h*dpr); c.style.width=w+"px"; c.style.height=h+"px"; ctx.setTransform(dpr,0,0,dpr,0,0); };
      resize(); const ro=new ResizeObserver(resize); ro.observe(container);
  
      const shells=[], sparks=[]; const colors=["#5b9dff","#34d399","#fbbf24","#f472b6","#60a5fa"];
      const launch=(x,y)=>{ shells.push({x, y:c.clientHeight, vx:(Math.random()-.5)*1.2, vy:-(6+Math.random()*3), col:colors[(Math.random()*colors.length)|0]}); };
      c.addEventListener("click",(e)=>{ const r=c.getBoundingClientRect(); launch(e.clientX-r.left,e.clientY-r.top); });
  
      let raf;
      const step=()=>{
        ctx.fillStyle="rgba(11,12,15,0.25)"; ctx.fillRect(0,0,c.clientWidth,c.clientHeight);
        // shells
        for(let i=shells.length-1;i>=0;i--){
          const s=shells[i]; s.x+=s.vx; s.y+=s.vy; s.vy+=0.08;
          ctx.beginPath(); ctx.arc(s.x,s.y,2,0,Math.PI*2); ctx.fillStyle=s.col; ctx.fill();
          if(s.vy> -0.5){ // burst
            const N=60+((Math.random()*40)|0);
            for(let k=0;k<N;k++){
              const a=Math.random()*Math.PI*2, sp=1.8+Math.random()*3.2;
              sparks.push({x:s.x,y:s.y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,life:90+((Math.random()*40)|0),col:s.col});
            }
            shells.splice(i,1);
          }
        }
        // sparks
        for(let i=sparks.length-1;i>=0;i--){
          const p=sparks[i];
          p.vx*=0.99; p.vy=(p.vy+0.04)*0.99; p.x+=p.vx; p.y+=p.vy; p.life--;
          if(p.life<=0){ sparks.splice(i,1); continue; }
          const a=Math.max(0,Math.min(1,p.life/110));
          ctx.beginPath(); ctx.arc(p.x,p.y,1.8,0,Math.PI*2); ctx.fillStyle=`rgba(255,255,255,${a})`; ctx.fill();
          ctx.beginPath(); ctx.arc(p.x,p.y,3,0,Math.PI*2); ctx.strokeStyle=p.col+"90"; ctx.lineWidth=0.6; ctx.stroke();
        }
        raf=requestAnimationFrame(step);
      };
      raf=requestAnimationFrame(step);
  
      // seed one
      launch(c.clientWidth*0.5, c.clientHeight*0.35);
  
      this._cleanup=()=>{ cancelAnimationFrame(raf); ro.disconnect(); c.replaceWith(c.cloneNode(true)); container.innerHTML=""; };
    },
    teardown(){ this._cleanup?.(); }
  };
  
  // Register this effect
  window.EFFECTS_REGISTRY.registerEffect(effectCanvasFireworks);