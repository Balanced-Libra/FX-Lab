const effectCssConicPie = {
  id: "css-conic-pie",
  name: "Conic Pie Chart (sliders)",
  type: "JS+CSS",
  tags: ["css","typography","interaction"],
  perf: "GPU-light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>Pie via <code>conic-gradient</code> using CSS variables.</li>
      <li>Two sliders set A &amp; B; C = 100 − A − B (clamped).</li>
      <li>Legend updates live.</li>
    </ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .pie-wrap{height:100%;display:grid;grid-template-columns:min(360px,40%) 1fr;gap:14px;align-items:center}
        .panel{border:1px solid var(--line);border-radius:12px;background:#0f1218;padding:14px;color:#cfd5df}
        .row{display:grid;grid-template-columns:70px 1fr auto;gap:10px;align-items:center}
        .stage{display:grid;place-items:center;height:100%}
        .pie{
          --a:40; --b:30; --c:30;
          width:min(300px,70%); aspect-ratio:1/1; border-radius:50%;
          border:1px solid var(--line);
          background:
            conic-gradient(#5b9dff 0 calc(var(--a)*1%),
                           #34d399 calc(var(--a)*1%) calc((var(--a)+var(--b))*1%),
                           #fbbf24 calc((var(--a)+var(--b))*1%) 100%);
          box-shadow:0 10px 30px rgba(0,0,0,.25);
        }
        .legend{display:grid;gap:6px;margin-top:10px}
        .dot{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:6px;vertical-align:middle}
      </style>
      <div class="pie-wrap">
        <div class="panel">
          <div class="row"><span>A</span><input id="ra" type="range" min="0" max="100" value="40"><output id="oa">40%</output></div>
          <div class="row"><span>B</span><input id="rb" type="range" min="0" max="100" value="30"><output id="ob">30%</output></div>
          <div class="legend">
            <div><span class="dot" style="background:#5b9dff"></span>A: <span id="la">40%</span></div>
            <div><span class="dot" style="background:#34d399"></span>B: <span id="lb">30%</span></div>
            <div><span class="dot" style="background:#fbbf24"></span>C: <span id="lc">30%</span></div>
          </div>
        </div>
        <div class="stage"><div class="pie" id="pie"></div></div>
      </div>`;
    const $ = s=>container.querySelector(s);
    const pie=$("#pie"), ra=$("#ra"), rb=$("#rb"), oa=$("#oa"), ob=$("#ob"), la=$("#la"), lb=$("#lb"), lc=$("#lc");
    const update=()=>{
      let A=+ra.value, B=+rb.value;
      if (A+B>100) { const over=A+B-100; if (B>=over) B-=over; else { A=Math.max(0,A-(over-B)); B=0; } ra.value=A; rb.value=B; }
      const C = Math.max(0, 100 - A - B);
      pie.style.setProperty("--a", A); pie.style.setProperty("--b", B); pie.style.setProperty("--c", C);
      oa.value=A+"%"; ob.value=B+"%"; la.textContent=oa.value; lb.textContent=ob.value; lc.textContent=C+"%";
    };
    ra.addEventListener("input", update); rb.addEventListener("input", update); update();
    this._cleanup=()=>{ ra.replaceWith(ra.cloneNode(true)); rb.replaceWith(rb.cloneNode(true)); container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectCssConicPie);