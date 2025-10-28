const effectScrollPinSteps = {
  id: "scroll-pin-steps",
  name: "Scroll Pin Steps",
  type: "Scroll",
  tags: ["scroll","a11y"],
  perf: "CPU-light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li><code>position: sticky</code> to pin a panel while steps scroll.</li>
      <li><code>IntersectionObserver</code> updates the pinned text.</li>
    </ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .pin-root{height:100%;overflow:auto;padding:12px;display:grid;grid-template-columns:1fr min(360px,35%);gap:12px}
        .steps{display:grid;gap:14px}
        .step{min-height:220px;border:1px solid var(--line);border-radius:12px;background:#10131a;color:#cfd5df;padding:16px}
        .pin{position:sticky; top:12px; align-self:start; border:1px solid var(--line); border-radius:12px; background:#0f1218; padding:16px; height:fit-content}
        .pin h4{margin:0 0 8px 0; color:#e7eaf0}
        .now{outline:1px solid #5b9dff}
      </style>
      <div class="pin-root" id="root">
        <div class="steps" id="steps">
          ${["Setup","Measure","Map scroll","Polish"].map((t,i)=>`
            <section class="step" data-title="${t}">
              <h3>Step ${i+1}: ${t}</h3>
              <p>Scrollable content block ${i+1}. As this enters view, the pinned panel updates.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non dui a arcu fermentum.</p>
            </section>`).join("")}
          ${Array.from({length:4},(_,i)=>`
            <section class="step" data-title="Extra ${i+5}">
              <h3>Extra ${i+5}</h3><p>More content for scrolling…</p>
            </section>`).join("")}
        </div>
        <aside class="pin" id="pin">
          <h4 id="pinTitle">Pinned Panel</h4>
          <p id="pinBody">Scroll the steps. This text updates to the current section.</p>
        </aside>
      </div>`;
    const root = container.querySelector("#root");
    const pinTitle = container.querySelector("#pinTitle");
    const pinBody = container.querySelector("#pinBody");
    const steps = [...container.querySelectorAll(".step")];

    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          steps.forEach(s=>s.classList.remove("now"));
          e.target.classList.add("now");
          pinTitle.textContent = e.target.dataset.title;
          pinBody.textContent  = `Currently viewing: "${e.target.dataset.title}".`;
        }
      });
    }, {root, threshold:0.6});

    steps.forEach(s=>io.observe(s));
    this._cleanup = ()=>{ io.disconnect(); container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectScrollPinSteps);