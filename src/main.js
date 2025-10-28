/**
 * Main Entry Point
 * Loads all modules and initializes the application using global scope for backward compatibility
 */

// Remove JS warning
document.getElementById('js-warning')?.remove();

// Core modules
import './core/EffectsRegistry.js';
import './config/constants.js';
import { Background } from './core/Background.js';
import { ThemeManager } from './core/ThemeManager.js';
import { KeyboardHandler } from './core/KeyboardHandler.js';

// UI utilities
import './ui/utils/magnetic.js';
import './ui/utils/tags.js';
import './ui/utils/fluid-glass.js';
import { CodeView } from './ui/utils/code-view.js';

// UI components  
import { Grid } from './ui/components/Grid.js';
import { TagFilter } from './ui/components/TagFilter.js';
import { Modal } from './ui/components/Modal.js';

// App
import { State } from './app/state.js';
import { DOM } from './app/dom.js';

// Global initialization
let app;

class Application {
  constructor() {
    this.state = new State();
    this.dom = new DOM();
    this.background = new Background(document.body);
    this.theme = new ThemeManager();
    this.keyboard = new KeyboardHandler(this);
    
    this.grid = new Grid(this.state, this.dom);
    this.tagFilter = new TagFilter(this.state, this.dom);
    this.modal = new Modal(this.state, this.dom, this.background);
    this.codeView = new CodeView(this.state, this.dom);
    
    this.setupEvents();
  }

  init() {
    this.background.start();
    this.theme.init();
    this.keyboard.init();
    this.modal.init();
    this.codeView.init();

    const topbar = document.querySelector('.topbar');
    if (topbar) {
      window.FluidGlassEffect?.(topbar);
    }

    this.render();
    
    this.dom.search.addEventListener('input', () => this.render());
    
    console.log('FX-Lab initialized');
  }

  setupEvents() {
    this.state.on('filterChanged', () => this.grid.render());
    this.state.on('openDemo', (effect) => this.modal.open(effect));
    this.state.on('effectChanged', () => this.codeView.hide());
  }

  render() {
    this.tagFilter.render();
    this.grid.render();
  }

  setEffects(effects) {
    this.state.effects = effects;
  }
}

// Initialize when DOM is ready
function initialize() {
  app = new Application();
  
  if (window.EFFECTS_REGISTRY?.EFFECTS) {
    app.setEffects(window.EFFECTS_REGISTRY.EFFECTS);
  }
  
  app.init();
  window.app = app;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}

export { app };

