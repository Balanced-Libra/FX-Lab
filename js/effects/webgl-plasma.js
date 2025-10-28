const effectWebglPlasma = {
  id: "webgl-plasma",
  name: "WebGL Plasma (Shader)",
  type: "WebGL",
  tags: ["webgl","shader","media"],
  perf: "GPU-light",
  description: `
    <h3>What this shows</h3>
    <ul>
      <li>Minimal WebGL: full-screen triangle + fragment shader.</li>
      <li>Uniforms: resolution &amp; time; DPR-aware resize.</li>
    </ul>`,
  async load(){},
  init(container){
    container.innerHTML = `
      <style>.glwrap{height:100%;position:relative}.glcanvas{width:100%;height:100%;display:block;border-radius:12px;border:1px solid var(--line);background:#000}
      .glerr{position:absolute;inset:0;display:grid;place-items:center;color:#e7eaf0}</style>
      <div class="glwrap"><canvas class="glcanvas" id="gl"></canvas><div class="glerr" id="glerr" hidden>WebGL not supported</div></div>`;
    const canvas = container.querySelector("#gl");
    const err = container.querySelector("#glerr");
    const gl = canvas.getContext("webgl");
    if(!gl){ err.hidden=false; this._cleanup=()=>{container.innerHTML=""}; return; }

    const vsrc = `
      attribute vec2 a_pos;
      void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
    `;
    const fsrc = `
      precision mediump float;
      uniform vec2 u_res;
      uniform float u_time;
      // cosine palette by iq
      vec3 pal(float t, vec3 a, vec3 b, vec3 c, vec3 d){ return a + b*cos(6.28318*(c*t + d)); }
      void main(){
        vec2 uv = gl_FragCoord.xy / u_res.xy;
        uv = uv*2.0 - 1.0;
        uv.x *= u_res.x/u_res.y; // keep aspect
        float t = u_time*0.25;
        float v = 0.0;
        v += sin(uv.x*3.0 + t*1.3);
        v += sin(uv.y*3.0 - t*1.7);
        v += sin((uv.x+uv.y)*2.5 + t*1.1);
        v += sin(length(uv)*3.5 - t*1.9);
        v = v/4.0;
        vec3 col = pal(v, vec3(0.5), vec3(0.5), vec3(1.0,0.7,0.4), vec3(0.0,0.15,0.2));
        gl_FragColor = vec4(col, 1.0);
      }
    `;
    const compile = (type, src)=>{
      const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
      if(!gl.getShaderParameter(s, gl.COMPILE_STATUS)){ console.error(gl.getShaderInfoLog(s)); }
      return s;
    };
    const vs = compile(gl.VERTEX_SHADER, vsrc);
    const fs = compile(gl.FRAGMENT_SHADER, fsrc);
    const prog = gl.createProgram();
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if(!gl.getProgramParameter(prog, gl.LINK_STATUS)){ console.error(gl.getProgramInfoLog(prog)); }
    gl.useProgram(prog);

    // full-screen triangle
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");

    const dpr = Math.min(2, window.devicePixelRatio||1);
    const ro = new ResizeObserver(()=>resize()); ro.observe(container);
    function resize(){
      const w = Math.max(1, container.clientWidth);
      const h = Math.max(1, container.clientHeight);
      canvas.width = Math.floor(w*dpr);
      canvas.height = Math.floor(h*dpr);
      canvas.style.width = w+"px";
      canvas.style.height = h+"px";
      gl.viewport(0,0,canvas.width, canvas.height);
    }
    resize();

    let raf, start = performance.now();
    const draw = ()=>{
      const t = (performance.now() - start)/1000;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    this._cleanup = ()=>{
      cancelAnimationFrame(raf);
      ro.disconnect();
      gl.deleteBuffer(buf); gl.deleteProgram(prog); gl.deleteShader(vs); gl.deleteShader(fs);
      container.innerHTML="";
    };
  },
  teardown(){ this._cleanup?.(); }
};
window.EFFECTS_REGISTRY.registerEffect(effectWebglPlasma);