// 1) CSS-only "Magnetic Button"
const effectMagneticButton = {
  id: "css-magnetic-button",
  name: "Magnetic Button Hover",
  type: "CSS",
  tags: ["css","interaction","mobile-safe","playful","minimal"],
  perf: "GPU-light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>A button that feels "magnetic" — it subtly shifts toward your cursor as you hover.</li>
      <li>A radial highlight tracks your pointer position across the button surface.</li>
      <li>Pure CSS custom properties updated by a tiny bit of JavaScript.</li>
    </ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <div style="display:grid;place-items:center;height:100%;gap:20px">
        <button class="magnetic-btn" id="magBtn">Hover me</button>
        <p style="color:#9aa1ad;margin:0">CSS radial highlight follows pointer with slight translate.</p>
      </div>`;
    const btn = container.querySelector("#magBtn");
    const onMove = (e)=>{
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      btn.style.setProperty("--mx", `${(x/r.width)*100}%`);
      btn.style.setProperty("--my", `${(y/r.height)*100}%`);
      const dx = (x/r.width - .5)*12;
      const dy = (y/r.height - .5)*12;
      btn.style.setProperty("--dx", `${dx.toFixed(1)}px`);
      btn.style.setProperty("--dy", `${dy.toFixed(1)}px`);
    };
    btn.addEventListener("pointermove", onMove);
    btn.addEventListener("pointerleave", ()=>{ btn.style.removeProperty("--dx"); btn.style.removeProperty("--dy"); });
    this._cleanup = ()=> btn.removeEventListener("pointermove", onMove);
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectMagneticButton);