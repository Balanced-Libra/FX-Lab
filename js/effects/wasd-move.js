const effectWASDMove = {
  id: "js-wasd-move",
  name: "WASD Move (Keyboard)",
  type: "JS",
  tags: ["interaction","physics","a11y"],
  perf: "CPU-light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>Keyboard state (keydown/keyup) + rAF loop.</li>
      <li>Movement with acceleration &amp; damping; bounded stage.</li>
    </ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .stage{position:relative;height:100%;border:1px solid var(--line);border-radius:12px;background:#0b0d12;overflow:hidden}
        .player{position:absolute;width:28px;height:28px;border-radius:8px;background:#5b9dff;box-shadow:0 6px 18px rgba(91,157,255,.35)}
        .kbd{position:absolute;left:10px;bottom:10px;color:#9aa1ad;background:#0f1218;border:1px solid var(--line);border-radius:10px;padding:6px 8px;font-size:12px}
      </style>
      <div class="stage" id="st"><div class="player" id="p"></div><div class="kbd">WASD / Arrow keys</div></div>`;
    const st = container.querySelector("#st");
    const p = container.querySelector("#p");
    let x=60, y=60, vx=0, vy=0;
    const accel=0.5, damp=0.90, max=7;
    const keys = new Set();
    const onKeyDown = e=>{
      const k=e.key.toLowerCase();
      if(["w","a","s","d","arrowup","arrowleft","arrowdown","arrowright"].includes(k)) keys.add(k);
    };
    const onKeyUp = e=>{
      const k=e.key.toLowerCase();
      keys.delete(k);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    let raf;
    const step=()=>{
      if(keys.has("w")||keys.has("arrowup")) vy-=accel;
      if(keys.has("s")||keys.has("arrowdown")) vy+=accel;
      if(keys.has("a")||keys.has("arrowleft")) vx-=accel;
      if(keys.has("d")||keys.has("arrowright")) vx+=accel;
      vx*=damp; vy*=damp;
      vx=Math.max(-max,Math.min(max,vx)); vy=Math.max(-max,Math.min(max,vy));
      x+=vx; y+=vy;
      // bounds
      const r=14, W=st.clientWidth, H=st.clientHeight;
      if(x<r){x=r; vx*=-0.4} if(x>W-r){x=W-r; vx*=-0.4}
      if(y<r){y=r; vy*=-0.4} if(y>H-r){y=H-r; vy*=-0.4}
      p.style.transform=`translate(${(x-r).toFixed(1)}px, ${(y-r).toFixed(1)}px)`;
      raf=requestAnimationFrame(step);
    };
    raf=requestAnimationFrame(step);

    this._cleanup=()=>{
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      container.innerHTML="";
    };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectWASDMove);