const effectSvgTextOnPath = {
  id: "svg-text-on-path",
  name: "SVG Text on a Path",
  type: "SVG",
  tags: ["svg","typography"],
  perf: "GPU-light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>A line of text that follows the arc of a curved line, like writing on a rainbow.</li>
      <li>The text slides continuously along the curve in a smooth, looping animation.</li>
    </ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>.top-wrap{display:grid;place-items:center;height:100%}</style>
      <div class="top-wrap">
        <svg viewBox="0 0 600 200" width="92%" height="60%">
          <defs><path id="curve" d="M20,140 C120,20 480,20 580,140"/></defs>
          <path d="M20,140 C120,20 480,20 580,140" fill="none" stroke="#223"/>
          <text fill="#5b9dff" font-size="24" font-family="system-ui,Segoe UI,Roboto,Inter,sans-serif">
            <textPath href="#curve" startOffset="0%">
              Moving text follows this curve — Effects Lab
              <animate attributeName="startOffset" values="0%;100%;0%" dur="10s" repeatCount="indefinite"/>
            </textPath>
          </text>
        </svg>
      </div>`;
    this._cleanup = ()=>{ container.innerHTML=""; };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectSvgTextOnPath);