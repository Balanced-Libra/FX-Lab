const effectCssRadioTabs = {
  id: "css-radio-tabs",
  name: "Radio Tabs (CSS-only)",
  type: "CSS",
  tags: ["css","a11y","nav"],
  perf: "GPU-light",
  description: `
    <h3>What this shows</h3>
    <ul><li>Tabs using radios + labels (no JS).</li>
        <li>Only one panel visible via sibling selectors.</li></ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .tabs{height:100%;display:grid;grid-template-rows:auto 1fr;gap:10px}
        .tabbar{display:flex;gap:8px;flex-wrap:wrap}
        .tabbar label{padding:8px 12px;border:1px solid var(--line);border-radius:10px;cursor:pointer;color:#cfd5df;background:#0f1218}
        .tabbar input{position:absolute;opacity:0;pointer-events:none}
        .tabbar input:checked + label{outline:1px solid #5b9dff;color:#e7eaf0}
        .panes{border:1px solid var(--line);border-radius:12px;background:#0b0d12;padding:12px;height:100%;overflow:auto}
        .pane{display:none}
        #t1:checked ~ .panes #p1,
        #t2:checked ~ .panes #p2,
        #t3:checked ~ .panes #p3 {display:block}
      </style>
      <div class="tabs">
        <div class="tabbar" role="tablist">
          <input id="t1" type="radio" name="t" checked>
          <label for="t1" role="tab" aria-controls="p1" aria-selected="true">Intro</label>
          <input id="t2" type="radio" name="t">
          <label for="t2" role="tab" aria-controls="p2" aria-selected="false">Details</label>
          <input id="t3" type="radio" name="t">
          <label for="t3" role="tab" aria-controls="p3" aria-selected="false">More</label>
        </div>
        <div class="panes">
          <section id="p1" class="pane"><p>Pure CSS tabs using radio inputs.</p></section>
          <section id="p2" class="pane"><p>Each label toggles a radio; sibling selectors reveal its panel.</p></section>
          <section id="p3" class="pane"><p>Keyboard users can tab to the labels and press Space/Enter.</p></section>
        </div>
      </div>`;
    this._cleanup=()=>{ container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectCssRadioTabs);