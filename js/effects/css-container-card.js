const effectCssContainerCard = {
  id: "css-container-query-card",
  name: "Container Query Card",
  type: "CSS",
  tags: ["css","layout","a11y"],
  perf: "GPU-light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li><code>@container</code> queries: component adapts to its own width.</li>
      <li>Switches from stacked → side-by-side layout.</li>
    </ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .cq-wrap{height:100%;display:grid;place-items:center;padding:12px}
        .card{container-type:inline-size; width:min(680px,92%); border:1px solid var(--line); border-radius:12px;
              background:#0f1218; color:#cfd5df; padding:14px; display:grid; gap:12px}
        .media{border-radius:10px; background:linear-gradient(135deg,#121a28,#0d121b); height:160px}
        .body{display:grid;gap:6px}
        .title{color:#e7eaf0;font-weight:600}
        /* default: stacked */
        @container (min-width: 520px){
          .card{ grid-template-columns: 220px 1fr; align-items:center }
          .media{ height:140px }
        }
        @container (min-width: 620px){
          .card{ grid-template-columns: 260px 1fr; }
        }
      </style>
      <div class="cq-wrap">
        <article class="card">
          <div class="media"></div>
          <div class="body">
            <div class="title">Container Queries</div>
            <p>Resize the modal to see this card switch between stacked and side-by-side layouts. The breakpoints are based on the <em>card's own width</em>, not the viewport.</p>
            <div class="badges"><span class="badge">@container</span><span class="badge">inline-size</span></div>
          </div>
        </article>
      </div>`;
    this._cleanup = ()=>{ container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectCssContainerCard);