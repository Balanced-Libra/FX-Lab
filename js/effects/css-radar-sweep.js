const effectCssRadarSweep = {
    id: "css-radar-sweep",
    name: "Radar Sweep (Conic + Mask)",
    type: "CSS",
    tags: ["css","filter","media"],
    perf: "GPU-light",
    description: `
      <h3>What this shows</h3>
      <ul>
        <li>Animated sweep via <code>conic-gradient</code> rotation.</li>
        <li>Ring mask using <code>radial-gradient</code> to cut the center.</li>
        <li>Decorative grid + blips.</li>
      </ul>`,
    async load(){},
    init(container){
      container.innerHTML = `
        <style>
          @keyframes spin360 { to { transform: rotate(360deg); } }
          .rad{position:relative;height:100%;display:grid;place-items:center;background:#0b0d12;border-radius:12px;overflow:hidden}
          .rad .ring{
            --size: min(70vmin, 90%);
            width:var(--size); aspect-ratio:1/1; position:relative; border:1px solid var(--line); border-radius:50%;
            background:
              radial-gradient(closest-side, transparent 58%, #0b0d12 59% 61%, transparent 62%),
              radial-gradient(circle at 50% 50%, #1a2233 1px, transparent 1px) 0 0/10% 10%,
              radial-gradient(circle at 50% 50%, #111622, #0b0d12 55%);
            overflow:hidden;
          }
          .sweep{
            position:absolute; inset:0;
            background: conic-gradient(from 0deg, rgba(91,157,255,.35), rgba(91,157,255,0) 60%);
            animation: spin360 6s linear infinite;
            /* mask to ring */
            -webkit-mask: radial-gradient(closest-side, transparent 0 34%, #000 35%);
                    mask: radial-gradient(closest-side, transparent 0 34%, #000 35%);
          }
          .blip{
            position:absolute; width:8px; height:8px; border-radius:50%; background:#5b9dff; box-shadow:0 0 10px #5b9dff;
            animation: ping 2.4s ease-in-out infinite;
          }
          @keyframes ping {
            0%,100%{ transform: scale(1); opacity:.9 }
            50%{ transform: scale(1.6); opacity:.3 }
          }
        </style>
        <div class="rad">
          <div class="ring" id="ring">
            <div class="sweep"></div>
            <div class="blip" style="left:22%; top:36%"></div>
            <div class="blip" style="left:68%; top:62%"></div>
            <div class="blip" style="left:42%; top:74%"></div>
          </div>
        </div>`;
      this._cleanup = ()=>{ container.innerHTML=""; };
    },
    teardown(){ this._cleanup?.(); }
  };
  window.EFFECTS_REGISTRY.registerEffect(effectCssRadarSweep);