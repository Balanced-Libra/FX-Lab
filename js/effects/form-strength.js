const effectFormStrength = {
  id: "form-strength-floating",
  name: "Floating Labels + Strength Meter",
  type: "JS+CSS",
  tags: ["forms","a11y","interaction"],
  perf: "CPU-light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>Floating labels using <code>:focus-within</code> and <code>:placeholder-shown</code>.</li>
      <li>Lightweight strength meter (length + variety of chars).</li>
    </ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .fx-form{height:100%;display:grid;place-items:center}
        .card{width:min(520px,92%);border:1px solid var(--line);border-radius:14px;background:#0f1218;padding:16px;color:#cfd5df}
        .row{position:relative;margin-top:12px}
        .row input{
          width:100%;padding:14px 12px;border-radius:10px;border:1px solid var(--line);
          background:#0c1016;color:#e7eaf0;outline:none;
        }
        .row label{
          position:absolute; left:12px; top:12px; pointer-events:none; color:#9aa1ad;
          transition:transform .15s ease, color .15s ease, font-size .15s ease;
          background:transparent; padding:0 4px;
        }
        .row:focus-within label,
        .row input:not(:placeholder-shown) + label{
          transform:translateY(-22px); font-size:12px; color:#5b9dff; background:#0f1218;
        }
        .meter{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:10px}
        .meter span{height:8px;border-radius:6px;background:#1a202c;border:1px solid #232b3a}
        .meter span.on{background:#34d399;border-color:#256d5a}
        .hint{font-size:12px;color:#9aa1ad;margin-top:8px}
      </style>
      <div class="fx-form">
        <div class="card">
          <div class="row">
            <input id="email" type="email" placeholder=" " autocomplete="email">
            <label for="email">Email</label>
          </div>
          <div class="row">
            <input id="pw" type="password" placeholder=" " autocomplete="new-password">
            <label for="pw">Password</label>
            <div class="meter" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
            <div class="hint" id="hint">Strength: Weak</div>
          </div>
        </div>
      </div>`;
    const pw = container.querySelector("#pw");
    const bars = [...container.querySelectorAll(".meter span")];
    const hint = container.querySelector("#hint");

    const score = (s)=>{
      let sc = 0;
      if(s.length >= 8) sc++;
      if(/[A-Z]/.test(s) && /[a-z]/.test(s)) sc++;
      if(/\d/.test(s)) sc++;
      if(/[^A-Za-z0-9]/.test(s)) sc++;
      return sc;
    };
    const text = ["Very weak","Weak","OK","Good","Strong"];
    const onInput = ()=>{
      const n = score(pw.value);
      bars.forEach((b,i)=> b.classList.toggle("on", i < n));
      hint.textContent = "Strength: " + text[n];
    };
    pw.addEventListener("input", onInput);
    onInput();

    this._cleanup = ()=>{ pw.removeEventListener("input", onInput); container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectFormStrength);