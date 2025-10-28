const effectMatrixRain = {
  id: "canvas-matrix-rain",
  name: "Matrix Rain",
  type: "JS/Canvas",
  tags: ["canvas","particles","typography"],
  perf: "GPU/CPU light",
  description: `
    <h3>What this shows</h3>
    <ul><li>Canvas columns with falling glyphs.</li>
        <li>Trail effect via translucent fill.</li></ul>`,
  async load(){},
  init(container){
    const c = document.createElement("canvas"); container.appendChild(c);
    const ctx = c.getContext("2d"); const dpr = Math.min(2, window.devicePixelRatio||1);
    const resize=()=>{ const w=container.clientWidth,h=container.clientHeight;
      c.width=Math.floor(w*dpr); c.height=Math.floor(h*dpr); c.style.width=w+"px"; c.style.height=h+"px"; ctx.setTransform(dpr,0,0,dpr,0,0);
      setup();
    };
    let fontSize=16, columns=0, drops=[], chars="アカサタナハマヤラワ0123456789ABCDEFGHJKMNPRSTUVWXYZ";
    function setup(){ columns = Math.max(1, Math.floor(c.clientWidth / fontSize)); drops = Array(columns).fill(0); }
    resize(); const ro=new ResizeObserver(resize); ro.observe(container);
    let raf;
    const step=()=>{
      ctx.fillStyle="rgba(11,12,15,0.08)"; ctx.fillRect(0,0,c.clientWidth,c.clientHeight);
      ctx.fillStyle="#5b9dff"; ctx.font=fontSize+"px monospace";
      for(let i=0;i<columns;i++){
        const x=i*fontSize, y=drops[i]*fontSize;
        const ch = chars[(Math.random()*chars.length)|0];
        ctx.fillText(ch, x, y);
        if(y > c.clientHeight && Math.random()>0.975) drops[i]=0; else drops[i]++;
      }
      raf=requestAnimationFrame(step);
    };
    raf=requestAnimationFrame(step);
    this._cleanup=()=>{ cancelAnimationFrame(raf); ro.disconnect(); container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectMatrixRain);