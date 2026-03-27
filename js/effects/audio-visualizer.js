const effectAudioVisualizer = {
    id: "audio-visualizer",
    name: "Audio Visualizer (Oscillator)",
    type: "JS/Audio+Canvas",
    tags: ["audio-reactive","canvas","interaction","energetic","bold"],
    perf: "CPU-light",
    description: `
      <h3>What this shows</h3>
      <ul>
        <li>Web Audio API oscillator → analyser → canvas bars.</li>
        <li>Start/Stop and frequency control.</li>
      </ul>`,
    async load(){},
    init(container){
      container.innerHTML = `
        <style>
          .av{height:100%;display:grid;grid-template-rows:auto 1fr;gap:10px}
          .av .panel{display:flex;gap:10px;align-items:center;padding:10px;border:1px solid var(--line);border-radius:12px;background:#0f1218;color:#cfd5df}
          .av canvas{display:block;width:100%;height:100%;border:1px solid var(--line);border-radius:12px;background:#0b0d12}
        </style>
        <div class="av">
          <div class="panel">
            <button class="btn" id="start">Start</button>
            <button class="btn" id="stop">Stop</button>
            <label>Freq <input id="freq" type="range" min="80" max="1200" value="440"></label>
            <label>Gain <input id="gain" type="range" min="0" max="100" value="8"></label>
          </div>
          <canvas id="cv"></canvas>
        </div>`;
      const c = container.querySelector("#cv");
      const ctx2d = c.getContext("2d");
      const dpr = Math.min(2, window.devicePixelRatio||1);
      const resize = ()=>{
        const w = container.clientWidth, h = container.clientHeight - 66;
        c.width = Math.floor(w*dpr); c.height = Math.floor(h*dpr);
        c.style.width = w+"px"; c.style.height = h+"px";
        ctx2d.setTransform(dpr,0,0,dpr,0,0);
      };
      resize(); const ro=new ResizeObserver(resize); ro.observe(container);
  
      let ac, osc, gain, ana, raf;
      const freq = container.querySelector("#freq");
      const g = container.querySelector("#gain");
      const start = async ()=>{
        if(!ac){
          ac = new (window.AudioContext||window.webkitAudioContext)();
          ana = ac.createAnalyser(); ana.fftSize = 256;
          gain = ac.createGain(); gain.gain.value = (+g.value || 8)/100;
          osc = ac.createOscillator(); osc.type="sine"; osc.frequency.value = +freq.value;
          osc.connect(gain).connect(ana).connect(ac.destination); osc.start();
        }else{
          await ac.resume();
        }
        draw();
      };
      const stop = async ()=>{
        if(ac?.state === "running"){ await ac.suspend(); }
        cancelAnimationFrame(raf);
        renderFrame(true);
      };
      const renderFrame = (paused=false)=>{
        ctx2d.clearRect(0,0,c.clientWidth,c.clientHeight);
        const W=c.clientWidth,H=c.clientHeight;
        ctx2d.fillStyle="#10131a"; ctx2d.fillRect(0,0,W,H);
        const bins = new Uint8Array(ana.frequencyBinCount);
        if(!paused) ana.getByteFrequencyData(bins);
        const n=bins.length, barW = W/n*1.1;
        for(let i=0;i<n;i++){
          const val = paused? 0 : bins[i];
          const h = (val/255)*(H*0.85);
          ctx2d.fillStyle = "rgba(91,157,255,0.9)";
          ctx2d.fillRect(i*barW, H-h, barW*0.9, h);
        }
      };
      const draw = ()=>{
        renderFrame(false);
        raf = requestAnimationFrame(draw);
      };
  
      const onFreq = ()=> { if(osc) osc.frequency.value = +freq.value; };
      const onGain = ()=> { if(gain) gain.gain.value = (+g.value || 0)/100; };
  
      container.querySelector("#start").addEventListener("click", start);
      container.querySelector("#stop").addEventListener("click", stop);
      freq.addEventListener("input", onFreq);
      g.addEventListener("input", onGain);
  
      this._cleanup = ()=>{
        cancelAnimationFrame(raf); ro.disconnect();
        freq.removeEventListener("input", onFreq); g.removeEventListener("input", onGain);
        container.querySelector("#start").replaceWith(container.querySelector("#start").cloneNode(true));
        container.querySelector("#stop").replaceWith(container.querySelector("#stop").cloneNode(true));
        try{ osc?.stop(); }catch{}
        try{ ac?.close(); }catch{}
        container.innerHTML="";
      };
    },
    teardown(){ this._cleanup?.(); }
  };
  
  // Register this effect
  window.EFFECTS_REGISTRY.registerEffect(effectAudioVisualizer);