const effectCssShimmer = {
  id: "css-shimmer-skeleton",
  name: "Shimmer Skeleton",
  type: "CSS",
  tags: ["css","micro-interaction"],
  perf: "GPU-light",
  description: `
    <h3>What this shows</h3>
    <ul><li>"Loading" placeholders using a moving gradient.</li>
        <li>Only CSS: keyframes + pseudo-element.</li></ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        @keyframes sh { to { transform: translateX(100%);} }
        .sk-wrap{display:grid;place-items:center;height:100%;padding:20px;}
        .sk-card{width:min(520px,92%);border:1px solid var(--line);border-radius:14px;padding:16px;background:#0f1218}
        .sk-line,.sk-avatar{position:relative;overflow:hidden;background:#141923;border-radius:8px}
        .sk-avatar{width:56px;height:56px;border-radius:50%}
        .sk-line{height:12px}.sk-line.m{height:16px}.sk-line+.sk-line{margin-top:10px}
        .shimmer::before{
          content:"";position:absolute;inset:0;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.06),transparent);
          transform:translateX(-100%);animation:sh 1.4s linear infinite;
        }
      </style>
      <div class="sk-wrap">
        <div class="sk-card">
          <div style="display:flex;gap:12px;align-items:center;margin-bottom:12px">
            <div class="sk-avatar shimmer"></div>
            <div style="flex:1">
              <div class="sk-line m shimmer"></div>
              <div class="sk-line shimmer" style="width:60%"></div>
            </div>
          </div>
          <div class="sk-line shimmer"></div>
          <div class="sk-line shimmer" style="width:90%"></div>
          <div class="sk-line shimmer" style="width:70%"></div>
        </div>
      </div>`;
    this._cleanup = ()=>{ container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectCssShimmer);