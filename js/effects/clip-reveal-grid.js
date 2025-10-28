const effectClipRevealGrid = {
    id: "css-clip-reveal-grid",
    name: "Clip-Path Hover Grid",
    type: "CSS",
    tags: ["css","media","interaction"],
    perf: "GPU-light",
    description: `
      <h3>What this shows</h3>
      <ul>
        <li>Image captions revealed with a <code>clip-path</code> polygon.</li>
        <li>Pure CSS hover/focus; no JS.</li>
      </ul>`,
    async load(){},
    init(container){
      container.innerHTML = `
        <style>
          .cr{height:100%;overflow:auto;padding:12px}
          .crg{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px}
          .tile{position:relative;border:1px solid var(--line);border-radius:12px;overflow:hidden;background:#0f1218}
          .tile img{display:block;width:100%;height:160px;object-fit:cover}
          .cap{position:absolute;inset:auto 0 0 0;background:rgba(11,13,18,.85);color:#e7eaf0;padding:10px 12px;line-height:1.3;
               clip-path:polygon(0 100%,100% 100%,100% 70%,0 100%);transition:clip-path .35s ease}
          .tile:focus-within .cap, .tile:hover .cap{
            clip-path:polygon(0 0,100% 0,100% 100%,0 100%);
          }
          .tile a{position:absolute;inset:0;outline:none}
          .tile a:focus-visible{outline:2px solid #5b9dff;outline-offset:-4px}
        </style>
        <div class="cr"><div class="crg">
          ${Array.from({length:8},(_,i)=>`
            <figure class="tile">
              <img src="https://picsum.photos/seed/clip${i}/600/400" alt="Photo ${i+1}">
              <figcaption class="cap">Caption ${i+1} — clip-path diagonal reveal</figcaption>
              <a href="#" aria-label="Open item ${i+1}"></a>
            </figure>`).join("")}
        </div></div>`;
      this._cleanup = ()=>{ container.innerHTML=""; };
    },
    teardown(){ this._cleanup?.(); }
  };
  
  // Register this effect
  window.EFFECTS_REGISTRY.registerEffect(effectClipRevealGrid);