const effectRippleButton = {
  id: "js-ripple-button",
  name: "Ripple Button (Click)",
  type: "JS+CSS",
  tags: ["interaction","css","micro-interaction","playful","minimal"],
  perf: "GPU-light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>Create an element at the click position.</li>
      <li>Animate scale + fade with CSS keyframes.</li>
      <li>Clean up the ripple node on <code>animationend</code>.</li>
    </ul>
  `,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .rip-wrap{display:grid;place-items:center;height:100%;gap:14px}
        .rip-btn{
          position:relative; overflow:hidden; border-radius:12px; border:1px solid var(--line);
          background:#0f131b; padding:14px 20px; color:#fff; cursor:pointer;
        }
        .rip{ position:absolute; width:20px; height:20px; border-radius:50%;
          transform:translate(-50%,-50%) scale(0); pointer-events:none;
          background:radial-gradient(circle, rgba(91,157,255,.35), rgba(91,157,255,0) 60%);
          animation:rip 600ms ease-out forwards;
        }
        @keyframes rip{
          to{ transform:translate(-50%,-50%) scale(14); opacity:0; }
        }
      </style>
      <div class="rip-wrap">
        <button class="rip-btn" id="rb">Click for ripple</button>
        <p style="color:#9aa1ad;margin:0">JS places a radial span at the click point; CSS animates it.</p>
      </div>`;
    const btn = container.querySelector("#rb");
    const onClick = (e)=>{
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const s = document.createElement("span");
      s.className = "rip"; s.style.left = x+"px"; s.style.top = y+"px";
      btn.appendChild(s);
      s.addEventListener("animationend", ()=> s.remove());
    };
    btn.addEventListener("click", onClick);
    this._cleanup = ()=> btn.removeEventListener("click", onClick);
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectRippleButton);