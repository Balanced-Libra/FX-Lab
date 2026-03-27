const effectCssNeonText = {
  id: "css-neon-text",
  name: "Neon Text Glow",
  type: "CSS",
  tags: ["css","typography","micro-interaction","bold","dramatic"],
  perf: "GPU-light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>Layered <code>text-shadow</code> for neon glow.</li>
      <li>Subtle flicker via keyframes.</li>
      <li>No JavaScript.</li>
    </ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        @keyframes flicker{
          0%,19%,21%,23%,80%,100%{ opacity:1; text-shadow:
            0 0 6px #5b9dff66, 0 0 12px #5b9dffaa, 0 0 24px #5b9dffcc, 0 0 48px #5b9dff88; }
          20%,22%{ opacity:0.8; text-shadow:
            0 0 3px #5b9dff44, 0 0 6px #5b9dff88, 0 0 12px #5b9dff99, 0 0 24px #5b9dff55; }
        }
        .neon-wrap{display:grid;place-items:center;height:100%;text-align:center}
        .neon{
          font-size: clamp(28px, 6vw, 64px);
          color:#e7eaf0;
          letter-spacing:.08em;
          animation:flicker 3.5s infinite;
        }
        .sub{color:#9aa1ad;margin-top:8px}
      </style>
      <div class="neon-wrap">
        <div>
          <div class="neon">NEON GLOW</div>
          <div class="sub">Text-shadow layers + flicker</div>
        </div>
      </div>`;
    this._cleanup = ()=>{ container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectCssNeonText);