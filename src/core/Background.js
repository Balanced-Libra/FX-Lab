// Iridescent Background Implementation
const vertexShader = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;
uniform float uTime;
uniform vec3 uColor;
uniform vec3 uResolution;
uniform vec2 uMouse;
uniform float uAmplitude;
uniform float uSpeed;
varying vec2 vUv;
void main() {
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;
  uv += (uMouse - vec2(0.5)) * uAmplitude;
  float d = -uTime * 0.5 * uSpeed;
  float a = 0.0;
  for (float i = 0.0; i < 8.0; ++i) {
    a += cos(i - d - a * uv.x);
    d += sin(uv.y * i + a);
  }
  d += uTime * 0.5 * uSpeed;
  vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
  col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * uColor;
  gl_FragColor = vec4(col, 1.0);
}
`;

class Background {
  constructor(container, options = {}) {
    this.container = container;
    this.color = options.color || [0.07, 0.08, 0.12];
    this.speed = options.speed || 0.5;
    this.amplitude = options.amplitude || 0.05;
    this.mouseReact = options.mouseReact !== undefined ? options.mouseReact : true;
    this.mousePos = { x: 0.5, y: 0.5 };
    this.instance = null;
  }

  start() {
    if (this.instance) return;
    this.instance = new IridescentBackground(this.container, {
      color: this.color,
      speed: this.speed,
      amplitude: this.amplitude,
      mouseReact: this.mouseReact
    });
  }

  stop() {
    if (this.instance) {
      this.instance.destroy();
      this.instance = null;
    }
  }

  destroy() {
    this.stop();
  }
}

class IridescentBackground {
  constructor(container, options = {}) {
    this.container = container;
    this.color = options.color || [0.07, 0.08, 0.12];
    this.speed = options.speed || 0.5;
    this.amplitude = options.amplitude || 0.05;
    this.mouseReact = options.mouseReact !== undefined ? options.mouseReact : true;
    this.mousePos = { x: 0.5, y: 0.5 };
    this.init();
  }

  init() {
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.zIndex = '-1';
    this.canvas.style.pointerEvents = 'none';
    document.body.insertBefore(this.canvas, document.body.firstChild);
    this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
    if (!this.gl) { console.error('WebGL not supported'); return; }
    this.setup();
    this.animate();
    window.addEventListener('resize', this.handleResize.bind(this));
    this.handleResize();
    if (this.mouseReact) {
      window.addEventListener('mousemove', this.handleMouseMove.bind(this));
    }
  }

  setup() {
    const gl = this.gl;
    const vertexShaderSource = this.createShader(gl.VERTEX_SHADER, vertexShader);
    const fragmentShaderSource = this.createShader(gl.FRAGMENT_SHADER, fragmentShader);
    this.program = gl.createProgram();
    gl.attachShader(this.program, vertexShaderSource);
    gl.attachShader(this.program, fragmentShaderSource);
    gl.linkProgram(this.program);
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) { console.error('Unable to initialize the shader program'); return; }
    gl.useProgram(this.program);
    const vertices = new Float32Array([-1, -1, 0, 0, 3, -1, 2, 0, -1, 3, 0, 2]);
    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    const positionLocation = gl.getAttribLocation(this.program, 'position');
    const uvLocation = gl.getAttribLocation(this.program, 'uv');
    gl.enableVertexAttribArray(positionLocation);
    gl.enableVertexAttribArray(uvLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 16, 0);
    gl.vertexAttribPointer(uvLocation, 2, gl.FLOAT, false, 16, 8);
    this.uniforms = {
      uTime: gl.getUniformLocation(this.program, 'uTime'),
      uColor: gl.getUniformLocation(this.program, 'uColor'),
      uResolution: gl.getUniformLocation(this.program, 'uResolution'),
      uMouse: gl.getUniformLocation(this.program, 'uMouse'),
      uAmplitude: gl.getUniformLocation(this.program, 'uAmplitude'),
      uSpeed: gl.getUniformLocation(this.program, 'uSpeed')
    };
    gl.uniform3fv(this.uniforms.uColor, this.color);
    gl.uniform1f(this.uniforms.uAmplitude, this.amplitude);
    gl.uniform1f(this.uniforms.uSpeed, this.speed);
  }

  createShader(type, source) {
    const gl = this.gl;
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  handleResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    if (this.uniforms && this.uniforms.uResolution) {
      this.gl.uniform3f(this.uniforms.uResolution, this.canvas.width, this.canvas.height, this.canvas.width / this.canvas.height);
    }
  }

  handleMouseMove(event) {
    this.mousePos.x = event.clientX / window.innerWidth;
    this.mousePos.y = 1.0 - (event.clientY / window.innerHeight);
    if (this.uniforms && this.uniforms.uMouse) {
      this.gl.uniform2f(this.uniforms.uMouse, this.mousePos.x, this.mousePos.y);
    }
  }

  animate() {
    if (!this.gl) return;
    const render = (time) => {
      this.gl.uniform1f(this.uniforms.uTime, time * 0.001);
      this.gl.clearColor(0, 0, 0, 1);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
      this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
      this.animationId = requestAnimationFrame(render);
    };
    this.animationId = requestAnimationFrame(render);
  }

  destroy() {
    if (this.animationId) { cancelAnimationFrame(this.animationId); }
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('mousemove', this.handleMouseMove);
    if (this.canvas && this.canvas.parentNode) { this.canvas.parentNode.removeChild(this.canvas); }
    if (this.gl) {
      const loseContext = this.gl.getExtension('WEBGL_lose_context');
      if (loseContext) { loseContext.loseContext(); }
    }
  }
}

// Global instance for background
let iridescentBgInstance = null;

// Export to global namespace
window.Background = Background;
window.IridescentBackground = IridescentBackground;
window.startIridescentBackground = () => {
  if (iridescentBgInstance) return;
  iridescentBgInstance = new IridescentBackground(document.body, {
    color: [0.07, 0.08, 0.12],
    speed: 0.5,
    amplitude: 0.05,
    mouseReact: true
  });
};

window.stopIridescentBackground = () => {
  if (iridescentBgInstance) {
    iridescentBgInstance.destroy();
    iridescentBgInstance = null;
  }
};

