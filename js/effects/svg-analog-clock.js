const effectSvgAnalogClock = {
  id: "svg-analog-clock",
  name: "Analog Clock (SVG)",
  type: "SVG",
  tags: ["svg","typography","interaction","minimal","calming"],
  perf: "CPU-light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>SVG hands rotated with transforms.</li>
      <li>Smooth second hand using <code>requestAnimationFrame</code>.</li>
    </ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .clk{height:100%;display:grid;place-items:center}
        .dial{filter:drop-shadow(0 6px 20px rgba(0,0,0,.35))}
      </style>
      <div class="clk">
        <svg class="dial" viewBox="0 0 100 100" width="60%" height="60%">
          <circle cx="50" cy="50" r="46" fill="#0f1218" stroke="#21232b" stroke-width="2"/>
          ${Array.from({length:60},(_,i)=>{
            const a=(i/60)*2*Math.PI, r1= i%5===0? 41:44, r2=46;
            const x1=50+Math.sin(a)*r1, y1=50-Math.cos(a)*r1;
            const x2=50+Math.sin(a)*r2, y2=50-Math.cos(a)*r2;
            const w=i%5===0? 1.8:0.6;
            return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#2a3243" stroke-width="${w}"/>`;
          }).join("")}
          <g id="h"><rect x="49" y="26" width="2" height="26" rx="1" fill="#e7eaf0"/></g>
          <g id="m"><rect x="49.5" y="18" width="1" height="34" rx="0.5" fill="#aab3c2"/></g>
          <g id="s"><rect x="49.5" y="14" width="1" height="38" rx="0.5" fill="#5b9dff"/></g>
          <circle cx="50" cy="50" r="2" fill="#5b9dff"/>
        </svg>
      </div>`;
    const gH = container.querySelector("#h"),
          gM = container.querySelector("#m"),
          gS = container.querySelector("#s");
    let raf;
    const tick = ()=>{
      const now = new Date();
      const ms = now.getMilliseconds();
      const s  = now.getSeconds() + ms/1000;
      const m  = now.getMinutes() + s/60;
      const h  = (now.getHours()%12) + m/60;

      gS.setAttribute("transform", `rotate(${s*6} 50 50)`);
      gM.setAttribute("transform", `rotate(${m*6} 50 50)`);
      gH.setAttribute("transform", `rotate(${h*30} 50 50)`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    this._cleanup = ()=>{ cancelAnimationFrame(raf); container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectSvgAnalogClock);