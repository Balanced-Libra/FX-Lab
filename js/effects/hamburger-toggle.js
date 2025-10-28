const effectHamburgerToggle = {
  id: "ui-hamburger-toggle",
  name: "Hamburger ↔ X Toggle",
  type: "JS+CSS",
  tags: ["nav","css","micro-interaction"],
  perf: "GPU-light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>Animated hamburger icon transforming to an "X".</li>
      <li>CSS transitions on <code>transform</code> + <code>opacity</code>.</li>
    </ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .ham-wrap{height:100%;display:grid;place-items:center}
        .ham-btn{width:54px;height:54px;border-radius:12px;border:1px solid var(--line);
                 display:grid;place-items:center;cursor:pointer;background:#0f1218}
        .ham{position:relative;width:26px;height:18px}
        .ham span{position:absolute;left:0;width:100%;height:2px;background:#e7eaf0;border-radius:2px;
                  transition:transform .25s ease, opacity .2s ease, top .25s ease}
        .ham span:nth-child(1){top:0}
        .ham span:nth-child(2){top:8px}
        .ham span:nth-child(3){top:16px}
        .ham-btn.active .ham span:nth-child(1){top:8px; transform:rotate(45deg)}
        .ham-btn.active .ham span:nth-child(2){opacity:0}
        .ham-btn.active .ham span:nth-child(3){top:8px; transform:rotate(-45deg)}
      </style>
      <div class="ham-wrap">
        <button class="ham-btn" id="h"><div class="ham"><span></span><span></span><span></span></div></button>
        <p class="hint" style="color:#9aa1ad;margin-top:10px">Click to toggle. This would control a menu.</p>
      </div>`;
    const btn = container.querySelector("#h");
    const onClick = ()=> btn.classList.toggle("active");
    btn.addEventListener("click", onClick);
    this._cleanup = ()=>{ btn.removeEventListener("click", onClick); container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectHamburgerToggle);