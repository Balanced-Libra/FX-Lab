const effectCssFlipCard = {
  id: "css-flip-card",
  name: "3D Flip Card (Hover/Focus)",
  type: "CSS",
  tags: ["css","3d","a11y","playful","minimal"],
  perf: "GPU-light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>Parent <code>perspective</code> + child rotateY.</li>
      <li>Flips on :hover and :focus-within for keyboard users.</li>
    </ul>
  `,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>
        .flip-wrap{display:grid;place-items:center;height:100%; perspective:900px;}
        .flip{position:relative; width:min(420px,90%); height:240px; transform-style:preserve-3d;
              transition:transform .5s cubic-bezier(.2,.7,.2,1);}
        .flip-wrap:hover .flip, .flip:focus-within{ transform:rotateY(180deg); }
        .face{position:absolute; inset:0; display:grid; place-items:center; border:1px solid var(--line);
              border-radius:16px; background:#0f1218; backface-visibility:hidden;}
        .back{ transform:rotateY(180deg); background:#101a26; }
        .flip button{position:absolute; inset:auto auto 12px 12px}
      </style>
      <div class="flip-wrap">
        <div class="flip" tabindex="-1">
          <div class="face front">Front</div>
          <div class="face back">Back</div>
          <button class="btn">Focus me</button>
        </div>
      </div>`;
    this._cleanup = ()=>{ container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectCssFlipCard);