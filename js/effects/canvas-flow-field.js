const effectCanvasFlowField = {
  id: "canvas-flow-field",
  name: "Flow Field Lines",
  type: "JS/Canvas",
  tags: ["canvas","particles","heavy"],
  perf: "GPU/CPU medium",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>Lines advected by a pseudo-noise vector field.</li>
      <li>Alpha fade trail for smooth motion.</li>
      <li>Regenerate &amp; pause controls.</li>
    </ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .ff{height:100%;display:grid;grid-template-rows:auto 1fr;gap:8px}
        .ff .ui{display:flex;gap:8px;align-items:center}
        .ff canvas{border:1px solid var(--line);border-radius:12px;background:#0b0d12;display:block;width:100%;height:100%}
      </style>
      <div class="ff">
        <div class="ui">
          <button class="btn" id="regen">Regenerate</button>
          <button class="btn" id="toggle">Pause</button>
        </div>
        <canvas id="cv"></canvas>
      </div>`;
    const c = container.querySelector("#cv"), ctx = c.getContext("2d");
    const dpr = Math.min(2, window.devicePixelRatio||1);
    const resize=()=>{ const w=container.clientWidth,h=container.clientHeight-44;
      c.width=Math.floor(w*dpr); c.height=Math.floor(h*dpr); c.style.width=w+"px"; c.style.height=h+"px"; ctx.setTransform(dpr,0,0,dpr,0,0); };
    resize(); const ro=new ResizeObserver(resize); ro.observe(container);

    let pts=[], running=true, t=0, raf;
    const N = 1800; // particles
    function seed(){
      pts = Array.from({length:N}, ()=>({
        x: Math.random()*c.clientWidth,
        y: Math.random()*c.clientHeight
      }));
      ctx.clearRect(0,0,c.clientWidth,c.clientHeight);
    }
    seed();

    // cheap "noise" field
    function angle(x,y,tt){
      return Math.sin((x*0.004)+tt)*Math.cos((y*0.004)-tt);
    }

    function step(){
      if(!running){ raf=requestAnimationFrame(step); return; }
      ctx.fillStyle="rgba(11,13,18,0.08)"; // fade
      ctx.fillRect(0,0,c.clientWidth,c.clientHeight);
      ctx.beginPath();
      for(const p of pts){
        const a = angle(p.x, p.y, t)*Math.PI;
        const vx = Math.cos(a), vy = Math.sin(a);
        const nx = p.x + vx*1.2, ny = p.y + vy*1.2;
        ctx.moveTo(p.x, p.y); ctx.lineTo(nx, ny);
        p.x = (nx + c.clientWidth) % c.clientWidth;
        p.y = (ny + c.clientHeight) % c.clientHeight;
      }
      ctx.strokeStyle="rgba(91,157,255,0.35)";
      ctx.lineWidth=1; ctx.stroke();
      t += 0.01;
      raf=requestAnimationFrame(step);
    }
    raf=requestAnimationFrame(step);

    const btnRegen = container.querySelector("#regen");
    const btnToggle = container.querySelector("#toggle");
    const onRegen=()=>seed();
    const onToggle=()=>{ running=!running; btnToggle.textContent = running? "Pause" : "Resume"; };
    btnRegen.addEventListener("click", onRegen);
    btnToggle.addEventListener("click", onToggle);

    this._cleanup = ()=>{
      cancelAnimationFrame(raf); ro.disconnect();
      btnRegen.removeEventListener("click", onRegen);
      btnToggle.removeEventListener("click", onToggle);
      container.innerHTML="";
    };
  },
  teardown(){ this._cleanup?.(); }
};

// Register this effect
window.EFFECTS_REGISTRY.registerEffect(effectCanvasFlowField);