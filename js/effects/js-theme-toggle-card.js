const effectThemeToggleCard = {
  id: "js-theme-toggle-card",
  name: "Theme Toggle (CSS Vars)",
  type: "JS+CSS",
  tags: ["css","a11y","forms","minimal","playful"],
  perf: "GPU-light",
  description: `
    <h3>What this shows</h3>
    <ul><li>Swap themes by toggling a <code>data-theme</code> attribute.</li>
        <li>Colors flow from CSS custom properties.</li></ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .ttc{height:100%;display:grid;place-items:center}
        .card{
          --bg:#0f1218; --fg:#e7eaf0; --mut:#9aa1ad; --line: #1d2635;
          border:1px solid var(--line); border-radius:14px; padding:16px; width:min(520px,92%);
          background:var(--bg); color:var(--fg); transition:background .2s ease, color .2s ease, border-color .2s ease;
        }
        .card[data-theme="light"]{ --bg:#f7f8fb; --fg:#0e1116; --mut:#2c3446; --line:#cfd6e6; }
        .row{display:flex;justify-content:space-between;align-items:center}
        .mut{color:var(--mut)}
        .toggle{border:1px solid var(--line); border-radius:999px; padding:6px 10px; background:none; color:inherit; cursor:pointer}
        .chip{display:inline-block;border:1px solid var(--line);border-radius:999px;padding:4px 8px;margin-right:6px}
      </style>
      <div class="ttc">
        <div class="card" id="card" data-theme="dark" aria-live="polite">
          <div class="row">
            <h4 style="margin:0">Theme Toggle</h4>
            <button class="toggle" id="btn">Switch to Light</button>
          </div>
          <p class="mut">This card's colors come from CSS variables. Toggling the theme swaps the variables.</p>
          <div><span class="chip">--bg</span><span class="chip">--fg</span><span class="chip">--mut</span><span class="chip">--line</span></div>
        </div>
      </div>`;
    const card = container.querySelector("#card");
    const btn = container.querySelector("#btn");
    const click = ()=>{
      const next = card.dataset.theme === "dark" ? "light" : "dark";
      card.dataset.theme = next;
      btn.textContent = next==="dark" ? "Switch to Light" : "Switch to Dark";
      card.setAttribute("aria-label", `Theme set to ${next}`);
    };
    btn.addEventListener("click", click);
    this._cleanup=()=>{ btn.removeEventListener("click", click); container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectThemeToggleCard);