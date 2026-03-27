const effectSvgCircularTimer = {
  id: "svg-circular-timer",
  name: "Circular Timer",
  type: "SVG",
  tags: ["svg","interaction","a11y","minimal","calming"],
  perf: "CPU-light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>A circular ring that drains away as time counts down, with the remaining seconds shown in the centre.</li>
      <li>Start, stop, and reset buttons give full control over the countdown.</li>
    </ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .ct{height:100%;display:grid;grid-template-rows:auto 1fr auto;gap:10px;place-items:center}
        .ct .panel{display:flex;gap:8px}
        .ct svg{display:block}
        .ct .text{position:absolute;inset:0;display:grid;place-items:center;color:#e7eaf0;font-size:28px}
        .ct .wrap{position:relative;width:min(280px,60%);aspect-ratio:1/1}
      </style>
      <div class="ct">
        <div class="panel">
          <label style="color:#cfd5df">Seconds <input id="sec" type="number" value="10" min="1" max="300" style="width:70px;margin-left:6px"></label>
          <button class="btn" id="start">Start</button>
          <button class="btn" id="stop">Stop</button>
          <button class="btn" id="reset">Reset</button>
        </div>
        <div class="wrap">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" stroke="#1a2233" stroke-width="8" fill="none"/>
            <circle id="arc" cx="50" cy="50" r="44" stroke="#5b9dff" stroke-width="8" fill="none"
                    stroke-linecap="round" transform="rotate(-90 50 50)"/>
          </svg>
          <div class="text" id="readout">10</div>
        </div>
      </div>`;
    const arc = container.querySelector("#arc");
    const readout = container.querySelector("#readout");
    const sec = container.querySelector("#sec");
    const btnStart = container.querySelector("#start");
    const btnStop = container.querySelector("#stop");
    const btnReset = container.querySelector("#reset");

    const C = 2 * Math.PI * 44;
    arc.style.strokeDasharray = String(C);
    let raf, startT = null, dur = (+sec.value||10)*1000, pausedAt = 0, running = false;

    function setProgress(ms){
      const clamped = Math.max(0, Math.min(1, 1 - ms/dur));
      arc.style.strokeDashoffset = String((1 - clamped) * C);
      readout.textContent = Math.ceil(clamped * (dur/1000));
    }

    function frame(t){
      if(startT===null) startT = t;
      const elapsed = (t - startT) + pausedAt;
      setProgress(elapsed);
      if(elapsed < dur){ raf = requestAnimationFrame(frame); }
      else { running=false; pausedAt=0; setProgress(dur); }
    }

    function start(){
      if(running){ return; }
      dur = (+sec.value||10)*1000;
      running = true; startT = null;
      raf = requestAnimationFrame(frame);
    }
    function stop(){
      if(!running){ return; }
      running = false;
      cancelAnimationFrame(raf);
      // compute pausedAt from current style
      const d = parseFloat(arc.style.strokeDashoffset||"0");
      const progress = 1 - (d / C);
      pausedAt = progress * dur;
    }
    function reset(){
      cancelAnimationFrame(raf); running=false; pausedAt=0; setProgress(0);
      readout.textContent = (+sec.value||10);
      arc.style.strokeDashoffset = "0";
    }

    btnStart.addEventListener("click", start);
    btnStop.addEventListener("click", stop);
    btnReset.addEventListener("click", reset);
    reset();

    this._cleanup = ()=>{ cancelAnimationFrame(raf); btnStart.replaceWith(btnStart.cloneNode(true)); btnStop.replaceWith(btnStop.cloneNode(true)); btnReset.replaceWith(btnReset.cloneNode(true)); container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectSvgCircularTimer);