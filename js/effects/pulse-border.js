// 3) CSS "Pulse Border Card"
const effectCssPulseBorder = {
  id: "css-pulse-border",
  name: "Pulse Border Card",
  type: "CSS",
  tags: ["css","micro-interaction","minimal","energetic"],
  perf: "GPU-light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>CSS <code>@keyframes</code> for subtle breathing/pulse.</li>
      <li><code>outline</code> + <code>box-shadow</code> glow.</li>
      <li>No JavaScript needed.</li>
    </ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        @keyframes pulseGlow { 0%,100%{box-shadow:0 0 0 rgba(91,157,255,0);} 50%{box-shadow:0 0 24px rgba(91,157,255,.25);} }
        .pulse-card{ width:min(520px,90%); margin:auto; margin-top:6%; background:linear-gradient(180deg,#12141a,#0e1116);
          border:1px solid var(--line); border-radius:16px; padding:20px; outline:1px solid rgba(91,157,255,.25);
          animation:pulseGlow 2.4s ease-in-out infinite; transition:transform .2s ease, box-shadow .2s ease; }
        .pulse-card:hover{ transform:translateY(-2px); box-shadow:0 12px 40px rgba(91,157,255,.18); }
        .pulse-card h4{margin:0 0 6px 0} .pulse-card p{margin:0; color:#9aa1ad}
      </style>
      <article class="pulse-card"><h4>CSS Pulse</h4><p>Breathing glow using keyframes + shadow.</p></article>`;
    this._cleanup = ()=>{ container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectCssPulseBorder);