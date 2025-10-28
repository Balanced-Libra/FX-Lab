const effectSvgMiniLineChart = {
  id: "svg-mini-line-chart",
  name: "Mini Line Chart (Tooltip)",
  type: "SVG",
  tags: ["svg","interaction","typography"],
  perf: "CPU-light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>Build an SVG path from data.</li>
      <li>Pointer tracking + nearest point tooltip.</li>
    </ul>`,
  async load(){},
  init(container){
    // random data
    const N=24, data=Array.from({length:N},(_,i)=>({x:i, y: 40 + Math.sin(i/3)*20 + Math.random()*12}));
    const W=600,H=240, pad=24, xMax=N-1, yMin=Math.min(...data.map(d=>d.y))-5, yMax=Math.max(...data.map(d=>d.y))+5;
    const sx = x => pad + (x/xMax)*(W-2*pad);
    const sy = y => H-pad - ((y - yMin)/(yMax - yMin))*(H-2*pad);
    const d = data.map((p,i)=> (i? "L":"M")+sx(p.x)+","+sy(p.y)).join(" ");

    container.innerHTML = `
      <style>
        .lc{height:100%;display:grid;place-items:center}
        .lc .card{width:92%;max-width:720px;border:1px solid var(--line);border-radius:12px;background:#0f1218;padding:12px}
        .axis{stroke:#2a3243;stroke-width:1}
        .line{fill:none;stroke:#5b9dff;stroke-width:2}
        .pt{fill:#e7eaf0;stroke:#1a2233;stroke-width:.8}
        .tip{pointer-events:none}
        .tip rect{fill:#0b0d12;stroke:#21232b;rx:6}
        .tip text{font-size:12px;fill:#e7eaf0}
      </style>
      <div class="lc">
        <div class="card">
          <svg viewBox="0 0 ${W} ${H}" width="100%" height="260">
            <g>
              <line class="axis" x1="${pad}" y1="${H-pad}" x2="${W-pad}" y2="${H-pad}"/>
              <line class="axis" x1="${pad}" y1="${pad}" x2="${pad}" y2="${H-pad}"/>
              <path d="${d}" class="line"/>
              ${data.map(p=>`<circle class="pt" cx="${sx(p.x)}" cy="${sy(p.y)}" r="2.5"></circle>`).join("")}
              <rect id="hit" x="${pad}" y="${pad}" width="${W-2*pad}" height="${H-2*pad}" fill="transparent"/>
              <g id="tip" class="tip" opacity="0">
                <line id="vl" x1="0" x2="0" y1="${pad}" y2="${H-pad}" stroke="#2a3243" stroke-dasharray="4 4"/>
                <circle id="tp" r="4" fill="#5b9dff" stroke="#1a2233"/>
                <g id="tb">
                  <rect id="tbbox" x="0" y="0" width="80" height="24"></rect>
                  <text id="tbtext" x="6" y="16">0, 0</text>
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>`;

    const svg = container.querySelector("svg");
    const hit = container.querySelector("#hit");
    const tip = container.querySelector("#tip");
    const vl = container.querySelector("#vl");
    const tp = container.querySelector("#tp");
    const tb = container.querySelector("#tb");
    const tbbox = container.querySelector("#tbbox");
    const tbtext = container.querySelector("#tbtext");

    const onMove = (e)=>{
      const r = svg.getBoundingClientRect();
      const x = Math.max(pad, Math.min(W-pad, e.clientX - r.left));
      const t = (x - pad) / (W - 2*pad) * xMax;
      const idx = Math.max(0, Math.min(N-1, Math.round(t)));
      const p = data[idx];
      const px = sx(p.x), py = sy(p.y);
      tip.setAttribute("opacity","1");
      vl.setAttribute("x1", px); vl.setAttribute("x2", px);
      tp.setAttribute("cx", px); tp.setAttribute("cy", py);
      const label = `x ${idx} • y ${p.y.toFixed(1)}`;
      tbtext.textContent = label;
      // size + position bubble
      const tw = Math.max(60, label.length*6.5);
      tbbox.setAttribute("width", tw);
      const bx = Math.min(W - pad - tw, Math.max(pad, px + 8));
      const by = Math.max(pad, py - 30);
      tb.setAttribute("transform", `translate(${bx},${by})`);
    };
    const onLeave = ()=> tip.setAttribute("opacity","0");

    hit.addEventListener("pointermove", onMove);
    hit.addEventListener("pointerleave", onLeave);

    this._cleanup = ()=>{ hit.removeEventListener("pointermove", onMove); hit.removeEventListener("pointerleave", onLeave); container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectSvgMiniLineChart);