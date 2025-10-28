const effectCssMasonryColumns = {
  id: "css-masonry-columns",
  name: "Masonry Gallery (CSS columns)",
  type: "CSS",
  tags: ["css","layout","media"],
  perf: "GPU-light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>Masonry-like layout using <code>columns</code> + <code>break-inside: avoid</code>.</li>
      <li>No JS layout logic.</li>
    </ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .msn{height:100%;overflow:auto;padding:12px}
        .cols{columns: 3 220px; column-gap:12px}
        .tile{display:block; break-inside:avoid; margin:0 0 12px 0;
              border:1px solid var(--line); border-radius:12px; overflow:hidden; background:#0f1218}
        .tile img{display:block; width:100%; height:auto}
      </style>
      <div class="msn">
        <div class="cols">
          ${Array.from({length:12},(_,i)=>`<a class="tile" href="#" tabindex="0"><img src="https://picsum.photos/seed/m${i}/600/${260+((i*37)%220)}" alt="Random ${i+1}"></a>`).join("")}
        </div>
      </div>`;
    this._cleanup = ()=>{ container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectCssMasonryColumns);