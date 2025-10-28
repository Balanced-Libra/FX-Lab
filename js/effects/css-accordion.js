const effectCssAccordion = {
  id: "css-accordion",
  name: "Accordion (details/summary)",
  type: "CSS",
  tags: ["css","a11y","forms"],
  perf: "GPU-light",
  description: `
    <h3>What this shows</h3>
    <ul><li>Native <code>&lt;details&gt;</code>/<code>&lt;summary&gt;</code> for accessibility.</li>
        <li>CSS-only smooth content reveal using <code>grid-template-rows</code>.</li></ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .acc{height:100%;display:grid;place-items:center;padding:16px}
        .acc .panel{width:min(560px,92%); border:1px solid var(--line); border-radius:12px; background:#0f1218; overflow:hidden}
        .acc details{border-top:1px solid var(--line)}
        .acc details:first-child{border-top:none}
        .acc summary{list-style:none; cursor:pointer; padding:14px 16px; color:#e7eaf0}
        .acc summary::-webkit-details-marker{display:none}
        .acc .content{display:grid; grid-template-rows:0fr; transition:grid-template-rows .35s ease}
        .acc .content > div{overflow:hidden; padding:0 16px 12px 16px; color:#9aa1ad}
        .acc details[open] .content{grid-template-rows:1fr}
        .acc summary:focus-visible{outline:2px solid #5b9dff; outline-offset:4px; border-radius:8px}
      </style>
      <div class="acc">
        <div class="panel">
          <details open>
            <summary>What is this?</summary>
            <div class="content"><div>CSS-only accordion using <code>details</code>. No JS for toggle behavior.</div></div>
          </details>
          <details>
            <summary>Why grid for animation?</summary>
            <div class="content"><div>We animate <code>grid-template-rows</code> from 0fr → 1fr so height becomes smooth without JS.</div></div>
          </details>
          <details>
            <summary>Keyboard support?</summary>
            <div class="content"><div>Built-in: Space/Enter toggles the section, and focus styles help navigation.</div></div>
          </details>
        </div>
      </div>`;
    this._cleanup=()=>{ container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectCssAccordion);