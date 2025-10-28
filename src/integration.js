/**
 * Integration Layer
 * Connects the new modular structure to the existing HTML
 * This maintains backward compatibility while using the new architecture
 */

// This file will be loaded AFTER all effects are registered
// It initializes the new modular architecture

document.addEventListener('DOMContentLoaded', () => {
  // Import the new modules (in a real scenario with build system)
  console.log('Initializing new modular architecture...');
  
  // The new App class is available via imports above
  // For now, keep existing initialization until we fully migrate HTML
  
  // This is a placeholder for the integration
  // The actual wiring happens in the updated app.js
});

