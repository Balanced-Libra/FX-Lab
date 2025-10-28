/**
 * Main Application
 * Orchestrates all components and systems
 */
import { State } from './state.js';
import { DOM } from './dom.js';
import { Background } from '../core/Background.js';
import { ThemeManager } from '../core/ThemeManager.js';
import { KeyboardHandler } from '../core/KeyboardHandler.js';
import { Grid } from '../ui/components/Grid.js';
import { TagFilter } from '../ui/components/TagFilter.js';
import { Modal } from '../ui/components/Modal.js';
import { CodeView } from '../ui/utils/code-view.js';
import { FluidGlassEffect } from '../ui/utils/fluid-glass.js';

export class App {
  constructor() {
    // Core systems
    this.state = new State();
    this.dom = new DOM();
    this.background = new Background(document.body, {
      color: [0.07, 0.08, 0.12],
      speed: 0.5,
      amplitude: 0.05,
      mouseReact: true
    });
    this.theme = new ThemeManager();
    this.keyboard = new KeyboardHandler(this);

    // UI components
    this.grid = new Grid(this.state, this.dom);
    this.tagFilter = new TagFilter(this.state, this.dom);
    this.modal = new Modal(this.state, this.dom, this.background);
    this.codeView = new CodeView(this.state, this.dom);

    // Setup event listeners
    this.setupEvents();
  }

  init() {
    // Initialize all systems
    document.getElementById('js-warning')?.remove();

    this.background.start();
    this.theme.init();
    this.keyboard.init();
    this.modal.init();
    this.codeView.init();

    // Initialize fluid glass effect for topbar
    const topbar = document.querySelector('.topbar');
    if (topbar) {
      new FluidGlassEffect(topbar);
    }

    // Render initial UI
    this.render();

    // Setup search listener
    this.dom.search.addEventListener('input', () => this.render());

    console.log('FX-Lab initialized successfully');
  }

  setupEvents() {
    // Listen for filter changes
    this.state.on('filterChanged', () => {
      this.grid.render();
    });

    // Listen for demo open requests
    this.state.on('openDemo', (effect) => {
      this.modal.open(effect);
    });

    // Listen for effect changes (code view)
    this.state.on('effectChanged', () => {
      this.codeView.hide();
    });
  }

  render() {
    this.tagFilter.render();
    this.grid.render();
  }

  setEffects(effects) {
    this.state.effects = effects;
  }
}

