const effectAudioOscilloscope = {
    id: "audio-oscilloscope",
    name: "WebAudio Oscilloscope",
    type: "JS/Canvas",
    tags: ["audio","canvas","visualizer","minimal","calming"],
    perf: "CPU-light",
    description: `
      <h3>What this shows</h3>
      <ul>
        <li>Web Audio graph: Oscillator → Gain → Analyser.</li>
        <li>Time-domain trace + frequency bars on canvas.</li>
        <li>Start/Stop + waveform select; clean teardown.</li>
      </ul>`,
    async load(){},
    init(container){
      container.innerHTML = `
        <style>
          .au{height:100%;display:grid;grid-template-rows:auto 1fr;gap:10px}
          .au .panel{display:flex;gap:8px;align-items:center;border:1px solid var(--line);
                     border-radius:12px;background:#0f1218;padding:10px;color:#cfd5df}
          .au canvas{display:block;width:100%;height:100%;border:1px solid var(--line);
                     border-radius:12px;background:#0b0d12}
        </style>
        <div class="au">
          <div class="panel">
            <button class="btn" id="start">Start</button>
            <button class="btn" id="stop">Stop</button>
            <label>Wave <select id="type">
              <option>sine</option><option>square</option><option>sawtooth</option><option>triangle</option>
            </select></label>
            <label>Vol <input id="vol" type="range" min="0" max="1" step="0.01" value="0.08"></label>
          </div>
          <canvas id="cv"></canvas>
        </div>`;
      const c = container.querySelector("#cv"), ctx = c.getContext("2d");
      const startBtn=container.querySelector("#start"), stopBtn=container.querySelector("#stop");
      const typeSel=container.querySelector("#type"), vol=container.querySelector("#vol");
      const dpr=Math.min(2,window.devicePixelRatio||1);
      const resize=()=>{const w=container.clientWidth,h=container.clientHeight-58;
        c.width=Math.floor(w*dpr); c.height=Math.floor(h*dpr); c.style.width=w+"px"; c.style.height=h+"px";
        ctx.setTransform(dpr,0,0,dpr,0,0);};
      resize(); const ro=new ResizeObserver(resize); ro.observe(container);
  
      let ac,gain,osc,ana,raf,running=false;
      const dataT=new Uint8Array(1024), dataF=new Uint8Array(512);
  
      function draw(){
        const w=c.clientWidth,h=c.clientHeight; ctx.clearRect(0,0,w,h);
        // time domain
        ana.getByteTimeDomainData(dataT);
        ctx.beginPath(); for(let i=0;i<dataT.length;i++){
          const x = i/(dataT.length-1)*w, y = (dataT[i]/255)*h;
          i?ctx.lineTo(x,y):ctx.moveTo(x,y);
        }
        ctx.lineWidth=2; ctx.strokeStyle="#5b9dff"; ctx.stroke();
        // frequency bars
        ana.getByteFrequencyData(dataF);
        const bw = Math.max(1, w/dataF.length);
        for(let i=0;i<dataF.length;i++){
          const v=dataF[i]/255, bh=v*(h*0.4);
          ctx.fillStyle="rgba(164,196,255,.55)";
          ctx.fillRect(i*bw, h-bh, bw*0.9, bh);
        }
        raf=requestAnimationFrame(draw);
      }
      function start(){
        if(running) return;
        ac = new (window.AudioContext||window.webkitAudioContext)();
        gain = ac.createGain(); gain.gain.value = +vol.value;
        osc = ac.createOscillator(); osc.type = typeSel.value; osc.frequency.value = 220;
        ana = ac.createAnalyser(); ana.fftSize=1024;
        osc.connect(gain).connect(ana).connect(ac.destination); osc.start();
        running=true; draw();
      }
      function stop(){
        if(!running) return;
        cancelAnimationFrame(raf);
        osc.stop(); ac.close();
        running=false;
      }
      startBtn.addEventListener("click", start);
      stopBtn.addEventListener("click", stop);
      typeSel.addEventListener("change", ()=>{ if(osc) osc.type=typeSel.value; });
      vol.addEventListener("input", ()=>{ if(gain) gain.gain.value=+vol.value; });
  
      this._cleanup=()=>{ try{stop();}catch{} ro.disconnect();
        startBtn.replaceWith(startBtn.cloneNode(true)); stopBtn.replaceWith(stopBtn.cloneNode(true));
        container.innerHTML=""; };
    },
    teardown(){ this._cleanup?.(); }
  };
  
  // Register this effect
  window.EFFECTS_REGISTRY.registerEffect(effectAudioOscilloscope);