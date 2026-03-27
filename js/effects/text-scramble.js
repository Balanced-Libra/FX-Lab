const effectTextScramble = {
  id: "js-text-scramble",
  name: "Text Scramble → Resolve",
  type: "JS",
  tags: ["interaction","typography","dramatic","energetic"],
  perf: "CPU-light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>Text starts as a rapid blur of random characters that gradually resolves into the real message.</li>
      <li>Each letter locks in one by one from left to right, creating a decoding effect.</li>
    </ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .scr-wrap{display:grid;place-items:center;height:100%;gap:14px}
        .scr{font-size:28px;letter-spacing:.5px;color:#e7eaf0;text-align:center}
      </style>
      <div class="scr-wrap">
        <div id="scrTxt" class="scr"></div>
        <button class="btn" id="scrNext">Next</button>
      </div>`;
    const phrases = [
      "Hello, Effects Lab",
      "Scramble → Resolve",
      "Tiny, pasteable demos",
      "CSS · SVG · Canvas · Scroll"
    ];
    const chars = "!<>-_\\/[]{}—=+*^?#________";
    const el = container.querySelector("#scrTxt");
    const btn = container.querySelector("#scrNext");
    let i = 0, frame = 0, raf, queue = [];

    const scrambleTo = (text)=>{
      cancelAnimationFrame(raf);
      const old = el.textContent || "";
      const len = Math.max(old.length, text.length);
      queue = [];
      for(let n=0;n<len;n++){
        const from = old[n] || "";
        const to = text[n] || "";
        const start = Math.floor(Math.random()*20);
        const end   = start + 10 + Math.floor(Math.random()*20);
        queue.push({from,to,start,end,char:null});
      }
      frame = 0; update();
    };

    const update = ()=>{
      let out = "", done = 0;
      for(const q of queue){
        if(frame >= q.end){ done++; out += q.to; }
        else if(frame >= q.start){
          if(!q.char || Math.random()<0.28) q.char = chars[(Math.random()*chars.length)|0];
          out += `<span style="color:#9aa1ad">${q.char}</span>`;
        } else out += q.from;
      }
      el.innerHTML = out;
      if(done === queue.length) return;
      raf = requestAnimationFrame(update); frame++;
    };

    btn.addEventListener("click", ()=>{
      i = (i+1)%phrases.length;
      scrambleTo(phrases[i]);
    });
    scrambleTo(phrases[i]);

    this._cleanup = ()=>{ cancelAnimationFrame(raf); btn.replaceWith(btn.cloneNode(true)); container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectTextScramble);