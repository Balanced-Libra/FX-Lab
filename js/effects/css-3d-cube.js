const effectCss3DCube = {
    id: "css-3d-cube",
    name: "3D Cube (CSS)",
    type: "CSS",
    tags: ["css","3d","bold","playful"],
    perf: "GPU-light",
    description: `
      <h3>What this shows</h3>
      <ul>
        <li>Parent <code>perspective</code> + child <code>transform-style: preserve-3d</code>.</li>
        <li>6 faces positioned with <code>translateZ</code> and axis rotations.</li>
        <li>Auto-rotate animation; pauses on hover.</li>
      </ul>`,
    async load(){},
    init(container){
      container.innerHTML = `
        <style>
          .cube-wrap{height:100%;display:grid;place-items:center;perspective:900px}
          .cube{position:relative;width:min(200px,60%);aspect-ratio:1/1;transform-style:preserve-3d;
                animation:spin 8s linear infinite}
          .cube:hover{animation-play-state:paused}
          .face{position:absolute;inset:0;display:grid;place-items:center;font-weight:600;color:#e7eaf0;
                border:1px solid var(--line);border-radius:12px;background:#0f1218;backface-visibility:hidden}
          .f1{transform:translateZ(100px)}
          .f2{transform:rotateY(90deg) translateZ(100px)}
          .f3{transform:rotateY(180deg) translateZ(100px)}
          .f4{transform:rotateY(-90deg) translateZ(100px)}
          .f5{transform:rotateX(90deg) translateZ(100px)}
          .f6{transform:rotateX(-90deg) translateZ(100px)}
          @keyframes spin{
            0%{transform:rotateX(0) rotateY(0)}
            50%{transform:rotateX(180deg) rotateY(30deg)}
            100%{transform:rotateX(360deg) rotateY(360deg)}
          }
        </style>
        <div class="cube-wrap">
          <div class="cube">
            <div class="face f1">1</div>
            <div class="face f2">2</div>
            <div class="face f3">3</div>
            <div class="face f4">4</div>
            <div class="face f5">5</div>
            <div class="face f6">6</div>
          </div>
        </div>`;
      this._cleanup = ()=>{ container.innerHTML=""; };
    },
    teardown(){ this._cleanup?.(); }
  };
  
  // Register this effect
  window.EFFECTS_REGISTRY.registerEffect(effectCss3DCube);