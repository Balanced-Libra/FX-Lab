/**
 * Theme Manager
 * Handles theme switching between dark and light modes
 */
class ThemeManager {
  constructor() {
    this.currentTheme = 'dark';
    this.toggleButton = null;
  }

  init() {
    this.toggleButton = document.getElementById('themeToggle');
    if (!this.toggleButton) return;

    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
      this.toggleButton.textContent = '🌞';
      this.currentTheme = 'light';
    }

    this.toggleButton.addEventListener('click', () => this.toggle());
  }

  toggle() {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    this.toggleButton.textContent = isLight ? '🌞' : '🌓';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    this.currentTheme = isLight ? 'light' : 'dark';
  }

  getCurrentTheme() {
    return this.currentTheme;
  }
}

window.ThemeManager = ThemeManager;
window.initThemeToggle = function() {
  const tm = new ThemeManager();
  tm.init();
  return tm;
};

