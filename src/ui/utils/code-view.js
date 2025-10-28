/**
 * Code View Utilities
 * Handles code viewing and copying functionality
 */
class CodeView {
  constructor(state, dom) {
    this.state = state;
    this.dom = dom;
    this.codeBtn = null;
    this.codePanel = null;
  }

  init() {
    this.codeBtn = document.getElementById('codeBtn');
    this.codePanel = document.getElementById('codePanel');
    if (!this.codeBtn || !this.codePanel) return;

    this.codeBtn.addEventListener('click', () => this.toggle());
    this.setupCopyButton();
  }

  toggle() {
    if (!this.state.activeEffect) return;

    const codePanelInner = this.codePanel.querySelector('.code-content');
    if (!codePanelInner) return;

    const effectFile = this.getEffectSourceFile(this.state.activeEffect);
    if (effectFile) {
      fetch(effectFile)
        .then(r => r.text())
        .then(code => {
          codePanelInner.textContent = code;
          this.codePanel.style.display = this.codePanel.style.display === 'none' ? 'grid' : 'none';
        })
        .catch(err => console.error('Failed to load code:', err));
    }
  }

  hide() {
    if (this.codePanel) {
      this.codePanel.style.display = 'none';
    }
  }

  getEffectSourceFile(effect) {
    // Convert effect ID to filename
    return `js/effects/${effect.id}.js`;
  }

  setupCopyButton() {
    const copyBtn = this.codePanel.querySelector('.copy-code');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const code = this.codePanel.querySelector('.code-content')?.textContent;
        if (code) {
          navigator.clipboard.writeText(code).then(() => {
            const original = copyBtn.textContent;
            copyBtn.textContent = '✓ Copied!';
            setTimeout(() => {
              copyBtn.textContent = original;
            }, 2000);
          });
        }
      });
    }
  }
}

window.CodeView = CodeView;
window.initCodeView = function() {
  return new CodeView({}, document);
};

