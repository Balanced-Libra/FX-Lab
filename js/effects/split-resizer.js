const effectSplitResizer = {
  id: "layout-split-resizer",
  name: "Split View Resizer",
  type: "JS+CSS",
  tags: ["layout","interaction","a11y"],
  perf: "CPU-light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>Resizable two-pane layout with a draggable gutter.</li>
      <li>Clamped to 20%–80%. Arrow keys on the handle also work.</li>
    </ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .split{height:100%;display:grid;grid-template-columns:var(--left,50%) 8px 1fr;gap:0}
        .pane{padding:12px;border:1px solid var(--line);background:#0f1218;color:#cfd5df}
        .gut{background:#121824;border:1px solid var(--line);cursor:col-resize;display:grid;place-items:center}
        .gut:focus-visible{outline:2px solid #5b9dff;outline-offset:2px}
        .hint{font-size:12px;color:#9aa1ad}
      </style>
      <div class="split" id="split">
        <section class="pane"><h4 style="margin:0 0 6px 0;color:#e7eaf0">Left</h4>
          <p class="hint">Drag the handle or use ←/→ when focused.</p>
        </section>
        <div class="gut" id="gut" role="separator" aria-orientation="vertical" tabindex="0" aria-valuemin="20" aria-valuemax="80" aria-valuenow="50">⋮⋮</div>
        <section class="pane"><h4 style="margin:0 0 6px 0;color:#e7eaf0">Right</h4>
          <p class="hint">Grid columns track a CSS variable.</p>
        </section>
      </div>`;
    const root = container.querySelector("#split");
    const gut = container.querySelector("#gut");
    let dragging=false;

    const setPct = (pct)=>{
      const v = Math.max(20, Math.min(80, pct));
      root.style.setProperty("--left", v+"%");
      gut.setAttribute("aria-valuenow", String(Math.round(v)));
    };
    const toPct = (clientX)=>{
      const r = root.getBoundingClientRect();
      return ((clientX - r.left)/r.width)*100;
    };

    const onDown = e=>{ dragging=true; setPct(toPct(e.clientX)); };
    const onMove = e=>{ if(!dragging) return; setPct(toPct(e.clientX)); };
    const onUp   = ()=>{ dragging=false; };

    gut.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    const onKey = e=>{
      if(e.key==="ArrowLeft"){ setPct(parseFloat(getComputedStyle(root).getPropertyValue("--left")) - 2); }
      if(e.key==="ArrowRight"){ setPct(parseFloat(getComputedStyle(root).getPropertyValue("--left")) + 2); }
    };
    gut.addEventListener("keydown", onKey);
    setPct(50);

    this._cleanup = ()=>{
      gut.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      gut.removeEventListener("keydown", onKey);
      container.innerHTML="";
    };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectSplitResizer);