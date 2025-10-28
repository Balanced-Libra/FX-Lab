/**
 * Application Initialization
 * Entry point for the application
 */
import { App } from './App.js';
import { EffectsRegistry } from '../core/EffectsRegistry.js';

// Import all effect files
// Note: In a real build system, this would be automated
// For now, keep backward compatibility

let app;

function initializeApp() {
  // Create app instance
  app = new App();

  // Set effects from global registry (for backward compatibility)
  if (window.EFFECTS_REGISTRY && window.EFFECTS_REGISTRY.EFFECTS) {
    app.setEffects(window.EFFECTS_REGISTRY.EFFECTS);
  }

  // Initialize the app
  app.init();

  // Expose app globally for debugging
  window.app = app;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Export for module systems
export { app };

