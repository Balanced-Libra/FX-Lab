const effectDeviceTiltParallax = {
  id: "js-device-tilt-parallax",
  name: "Device Tilt Parallax",
  type: "JS",
  tags: ["interaction","mobile-safe","3d"],
  perf: "GPU-light",
  description: `
    <h3>What this shows</h3>
    <ul><li><code>DeviceOrientationEvent</code> for phone tilt.</li>
        <li>Pointer fallback on desktop.</li></ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .tilt-stage{height:100%;display:grid;place-items:center;perspective:900px}
        .stack{position:relative;width:min(420px,90%);height:240px;transform-style:preserve-3d;border-radius:16px;
               border:1px solid var(--line); background:#0f1218; overflow:hidden}
        .layer{position:absolute;inset:0;display:grid;place-items:center;font-weight:700;color:#e7eaf0;will-change:transform}
        .l1{transform:translateZ(60px);} .l2{transform:translateZ(30px);} .l3{transform:translateZ(0);}
        .panel{position:absolute;left:10px;bottom:10px;font-size:12px;color:#9aa1ad;background:#10131a;border:1px solid var(--line);border-radius:8px;padding:6px 8px}
        .btn{margin-left:8px}
      </style>
      <div class="tilt-stage">
        <div class="stack" id="stack">
          <div class="layer l3">Background</div>
          <div class="layer l2">Middle</div>
          <div class="layer l1">Front</div>
          <div class="panel">Tilt your phone or move mouse.
            <button class="btn" id="enable">Enable motion</button>
          </div>
        </div>
      </div>`;
    const card = container.querySelector("#stack");
    const enable = container.querySelector("#enable");
    const clamp = (v,min,max)=>Math.max(min,Math.min(max,v));
    const apply = (ax, ay)=>{
      // ax, ay = [-1,1]
      const rx = clamp(ay*10,-12,12);
      const ry = clamp(ax*10,-12,12);
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    };
    const onPointer = e=>{
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left)/r.width - .5;
      const y = (e.clientY - r.top)/r.height - .5;
      apply(x, -y);
    };
    card.addEventListener("pointermove", onPointer);
    // Motion (needs permission on iOS)
    const ask = async ()=>{
      try{
        const need = typeof DeviceOrientationEvent!=="undefined" && DeviceOrientationEvent.requestPermission;
        if(need){ const res = await DeviceOrientationEvent.requestPermission(); if(res!=="granted") return; }
        window.addEventListener("deviceorientation", (ev)=>{
          // gamma = left/right (-90..90), beta = front/back (-180..180)
          const ax = clamp((ev.gamma||0)/45, -1, 1);
          const ay = clamp((ev.beta||0)/45,  -1, 1);
          apply(ax, ay);
        });
      }catch{}
    };
    enable.addEventListener("click", ask);

    this._cleanup=()=>{ card.removeEventListener("pointermove", onPointer); enable.replaceWith(enable.cloneNode(true)); container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectDeviceTiltParallax);