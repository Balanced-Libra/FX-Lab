/**
 * Keyboard Handler
 * Manages keyboard shortcuts for the application
 */
class KeyboardHandler {
  constructor(app) {
    this.app = app;
    this.searchInput = null;
    this.modal = null;
  }

  init() {
    this.searchInput = document.getElementById('search');
    this.modal = document.getElementById('demoModal');

    document.addEventListener('keydown', (e) => this.handleKeydown(e));
  }

  handleKeydown(e) {
    // Escape to close modal
    if (e.key === 'Escape' && this.modal && this.modal.open) {
      this.modal.close();
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
      if (this.searchInput) {
        this.searchInput.focus();
        this.searchInput.select();
      }
      return;
    }

    // '/' to focus search
    if (e.key === '/' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      if (this.searchInput) {
        this.searchInput.focus();
      }
      return;
    }

    // Enter in search to open first result
    if (e.key === 'Enter' && e.target === this.searchInput && this.searchInput?.value) {
      const grid = document.getElementById('grid');
      if (grid) {
        const firstCard = grid.querySelector('.card');
        if (firstCard) {
          firstCard.click();
        }
      }
    }
  }
}

window.KeyboardHandler = KeyboardHandler;
window.setupKeyboardShortcuts = function() {
  return new KeyboardHandler({});
};

