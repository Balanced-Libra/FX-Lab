// Remove the JS warning
try {
  document.getElementById('js-warning')?.remove();
} catch (error) {
  console.warn('Could not remove JS warning:', error);
}

// --- DOM Element References ---
const $grid = document.getElementById("grid");
const $search = document.getElementById("search");
const $tags = document.getElementById("tags");
const $modal = document.getElementById("demoModal");
const $sandbox = document.getElementById("sandbox");
const $title = document.getElementById("demoTitle");
const $metaType = document.getElementById("metaType");
const $metaLoad = document.getElementById("metaLoad");
const $metaTags = document.getElementById("metaTags");
const $close = document.getElementById("closeModal");
const $explain = document.getElementById("explain");

// --- Application State ---
let activeEffect = null;
let activeFilter = new Set();

// Error handling helper
function handleError(error, context) {
  console.error(`Error in ${context}:`, error);
  // Could send to analytics/error tracking service
}

// Graceful degradation for missing WebGL
if (!window.WebGLRenderingContext) {
  console.warn('WebGL not supported - background will fallback gracefully');
}

// --- Core Functions ---
function renderGrid(){
  // Clean up previous magnetic effects
  document.querySelectorAll('.thumb').forEach(thumb => {
    if (thumb._magneticCleanup) { thumb._magneticCleanup(); }
  });
  
  const q = ($search.value||"").trim().toLowerCase();
  $grid.innerHTML = "";
  const filtered = EFFECTS.filter(e=>{
    const normalizedTags = normalizeTags(e);
    const qHit = !q || [e.name,e.type,normalizedTags.join(" ")].toLowerCase().includes(q);
    const tagHit = activeFilter.size === 0 || [...activeFilter].every(tag => 
      normalizedTags.includes(tag.toLowerCase())
    );
    return qHit && tagHit;
  }).sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by name
  
  for(const e of filtered){
    const normalizedTags = normalizeTags(e);
    const card = document.createElement("article"); 
    card.className = "card";
    card.innerHTML = `
      <div class="thumb"></div>
      <div class="body">
        <h3>${e.name}</h3>
        <div class="badges">
          <span class="badge">${e.type}</span>
          ${normalizedTags.slice(0,3).map(t=>`<span class="badge">#${t}</span>`).join("") || ""}
        </div>
        <div class="actions">
          <button class="btn" data-id="${e.id}">Run</button>
          <span class="badge">${e.perf||""}</span>
        </div>
      </div>`;
    
    addMagneticThumbEffect(card);
    
    card.addEventListener("click", (ev)=>{ if (!ev.target.closest("button")) openDemo(e); });
    card.tabIndex = 0;
    card.addEventListener("keydown", (ev)=>{ if ((ev.key === "Enter" || ev.key === " ") && !ev.target.closest("button")) { ev.preventDefault(); openDemo(e); } });
    $grid.appendChild(card);
  }
  if(filtered.length===0){
    const empty = document.createElement("div");
    empty.style.cssText="grid-column:1/-1; color:#9aa1ad; padding:24px";
    empty.textContent = "No matches. Try a different search term.";
    $grid.appendChild(empty);
  }
}

async function openDemo(effect){
  try {
    stopIridescentBackground(); // Stop background when modal opens
    activeEffect?.teardown?.();
    $sandbox.innerHTML="";
    $title.textContent = effect.name;
    $metaType.textContent = effect.type;
    const normalizedTags = normalizeTags(effect);
    $metaTags.textContent = normalizedTags.map(t=>`#${t}`).join(" ");
    $metaLoad.textContent = "loading…";
    $explain.innerHTML = effect.description || "<h3>About this demo</h3><p>No description provided.</p>";

    if(!$modal.open) $modal.showModal();
    const t0 = performance.now();
    
    try {
      await effect.load?.();
    } catch (err) {
      console.warn(`Effect ${effect.name} load failed:`, err);
      $metaLoad.textContent = "load error";
    }
    
    $metaLoad.textContent = `load ${Math.round(performance.now()-t0)}ms`;
    
    try {
      effect.init($sandbox);
      activeEffect = effect;
    } catch (err) {
      handleError(err, `init effect: ${effect.name}`);
      $sandbox.innerHTML = `<p style="padding: 20px; color: var(--text);">Failed to initialize effect. Please try another.</p>`;
    }
  } catch (error) {
    handleError(error, 'openDemo');
  }
}

// --- Tag Management ---
function renderTags(){
  const allTags = new Set();
  EFFECTS.forEach(e => {
    const normalizedTags = normalizeTags(e);
    normalizedTags.forEach(t => allTags.add(t));
  });
  
  // Define tag categories
  const categories = {
    'Technologies': ['css', 'svg', 'canvas', 'webgl', 'audio', 'worker'],
    'Interactions': ['drag', 'keyboard', 'pointer', 'toggle'],
    'Visual Effects': ['particles', '3d', 'shader', 'filter', 'mask', 'typography', 'animation'],
    'Patterns': ['layout', 'scroll', 'nav', 'forms', 'table', 'loader', 'chart', 'dataviz', 'media'],
    'Quality': ['a11y', 'reduced-motion', 'performance', 'heavy']
  };
  
  // Build grouped HTML
  let html = '';
  Object.entries(categories).forEach(([categoryName, categoryTags]) => {
    const availableTags = categoryTags.filter(tag => allTags.has(tag));
    if (availableTags.length === 0) return;
    
    html += `<div class="tag-group">`;
    html += `<div class="tag-group-header">${categoryName}</div>`;
    html += `<div class="tag-group-items">`;
    availableTags.forEach(tag => {
      const active = activeFilter.has(tag);
      html += `<span class="tag ${active ? 'active' : ''}" data-tag="${tag}">${tag}</span>`;
    });
    html += `</div></div>`;
  });
  
  $tags.innerHTML = html;
  
  // Add click handlers
  $tags.querySelectorAll('.tag').forEach(el => {
    el.addEventListener('click', () => {
      const tag = el.dataset.tag;
      if (activeFilter.has(tag)) {
        activeFilter.delete(tag);
      } else {
        activeFilter.add(tag);
      }
      renderTags();
      renderGrid();
    });
  });
}

// --- Code View Toggle ---
function initCodeView() {
  const codeBtn = document.getElementById('codeBtn');
  const codePanel = document.getElementById('codePanel');
  if (!codeBtn || !codePanel) return;
  
  codeBtn.addEventListener('click', () => {
    if (!activeEffect) return;
    
    const codePanelInner = codePanel.querySelector('.code-content');
    if (!codePanelInner) return;
    
    // Find the source file based on effect ID
    const effectFile = getEffectSourceFile(activeEffect);
    if (effectFile) {
      fetch(effectFile)
        .then(r => r.text())
        .then(code => {
          codePanelInner.textContent = code;
          codePanel.style.display = codePanel.style.display === 'none' ? 'grid' : 'none';
        })
        .catch(err => console.error('Failed to load code:', err));
    }
  });
  
  const copyBtn = codePanel.querySelector('.copy-code');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const code = codePanel.querySelector('.code-content')?.textContent;
      if (code) {
        navigator.clipboard.writeText(code).then(() => {
          const original = copyBtn.textContent;
          copyBtn.textContent = '✓ Copied!';
          setTimeout(() => copyBtn.textContent = original, 2000);
        });
      }
    });
  }
}

function getEffectSourceFile(effect) {
  // Convert effect ID to filename
  // e.g., 'css-magnetic-button' -> 'css-magnetic-button.js'
  // This matches the naming convention used in the effects
  return `js/effects/${effect.id}.js`;
}

// --- Theme Management ---
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;
  
  // Load saved theme preference
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeToggle.textContent = '🌞';
  }
  
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    themeToggle.textContent = isLight ? '🌞' : '🌓';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

// --- Keyboard Shortcuts ---
function setupKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Escape to close modal
    if (e.key === 'Escape' && $modal.open) {
      $modal.close();
      return;
    }
    
    // T to toggle theme
    if (e.key === 't' || e.key === 'T') {
      if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) themeToggle.click();
      }
      return;
    }
    
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      $search.focus();
      $search.select();
      return;
    }
    
    // '/' to focus search
    if (e.key === '/' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      $search.focus();
      return;
    }
    
    // Enter in search to open first result
    if (e.key === 'Enter' && e.target === $search && $search.value) {
      const firstCard = $grid.querySelector('.card');
      if (firstCard) {
        firstCard.click();
      }
    }
  });
}

// --- Event Listeners ---
$close.onclick = () => { $modal.close(); };
$modal.addEventListener("close", () => {
  activeEffect?.teardown?.();
  startIridescentBackground(); // Resume background when modal closes
  // Hide code panel when modal closes
  const codePanel = document.getElementById('codePanel');
  if (codePanel) codePanel.style.display = 'none';
});
$search.addEventListener("input", renderGrid);
$modal.addEventListener("click", (e) => { if (e.target === $modal) { $modal.close(); } });

// --- Application Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Initialize background
    if (typeof startIridescentBackground === 'function') {
      startIridescentBackground();
    }
    
    // Initialize fluid glass effect
    const topbar = document.querySelector('.topbar');
    if (topbar && typeof FluidGlassEffect !== 'undefined') {
      new FluidGlassEffect(topbar);
    }
    
    // Initialize theme toggle
    if (typeof initThemeToggle === 'function') {
      initThemeToggle();
    }
    
    // Render initial UI
    renderTags();
    renderGrid();
    
    // Setup keyboard shortcuts
    if (typeof setupKeyboardShortcuts === 'function') {
      setupKeyboardShortcuts();
    }
    
    // Initialize code view
    if (typeof initCodeView === 'function') {
      initCodeView();
    }
    
    console.log('✓ FX-Lab initialized successfully');
  } catch (error) {
    handleError(error, 'initialization');
    console.error('Failed to initialize FX-Lab:', error);
  }
});