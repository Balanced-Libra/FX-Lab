const effectSvgMorphBlob = {
  id: "svg-morph-blob",
  name: "Morphing Blob",
  type: "SVG",
  tags: ["svg","filter","typography","calming","playful"],
  perf: "GPU-light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>A soft, rounded shape that slowly morphs between different blob silhouettes on a seamless loop.</li>
      <li>Filled with a blue-to-green gradient, giving it a calm, organic feel.</li>
    </ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>.morph-wrap{display:grid;place-items:center;height:100%}</style>
      <div class="morph-wrap">
        <svg viewBox="0 0 260 240" width="70%" height="70%">
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="#5b9dff"/><stop offset="1" stop-color="#34d399"/>
            </linearGradient>
          </defs>
          <path fill="url(#grad)">
            <animate attributeName="d" dur="7000ms" repeatCount="indefinite"
              values="
                M200,120 C200,70 160,40 120,40 C80,40 40,70 40,120 C40,170 80,200 120,200 C160,200 200,170 200,120 Z;
                M210,120 C210,65 170,50 130,60 C90,70 50,90 50,120 C50,150 90,165 130,175 C170,185 210,175 210,120 Z;
                M200,120 C200,70 160,40 120,40 C80,40 40,70 40,120 C40,170 80,200 120,200 C160,200 200,170 200,120 Z
              " />
          </path>
        </svg>
      </div>`;
    this._cleanup = ()=>{ container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectSvgMorphBlob);