# FX-Lab 🎨

**A Beautiful Interactive Playground for Modern Web Effects**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Effects](https://img.shields.io/badge/Effects-60+-blue)](https://github.com)
[![Vanilla JS](https://img.shields.io/badge/Vanilla-JS-F7DF1E)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

Explore **60+ interactive effects** for modern web development. From CSS animations to WebGL shaders, FX-Lab provides a comprehensive reference library with live demos and copyable code.

---

## ✨ Features

- 🎯 **60+ Interactive Effects** - Browse animations, transitions, and UI patterns
- 🔍 **Smart Search** - Find effects by name, technology, or tags  
- 🏷️ **Tag Filtering** - Organize by technologies and patterns
- 💻 **Code View** - View and copy source code for any effect
- 🌓 **Dark/Light Theme** - Comfortable viewing in any environment
- ⌨️ **Keyboard Shortcuts** - Quick navigation and controls
- 📱 **Fully Responsive** - Beautiful on all devices
- ♿ **Accessible** - ARIA labels and keyboard navigation

## 🚀 Quick Start

### Option 1: Direct Use
```bash
# Clone the repository
git clone https://github.com/yourusername/fx-lab.git
cd fx-lab

# Open index.html in your browser
open index.html
```

### Option 2: Local Server (Recommended)
```bash
# Using Python
python -m http.server 8000

# Using Node.js (after setup)
npm install
npm run dev

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

---

## 📖 Usage

### Navigation
- **Search**: Type in the search bar or press `/`
- **Filter**: Click category tags to filter effects
- **Demo**: Click any card to view the effect
- **Code**: Click the "📄 Code" button to view source
- **Theme**: Press `T` to toggle dark/light mode

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `/` | Focus search bar |
| `Ctrl/Cmd + K` | Focus search bar |
| `T` | Toggle theme |
| `Esc` | Close modal |
| `Enter` | Open first search result |

### Tag Categories

**Technologies**: CSS, SVG, Canvas, WebGL, Audio, Workers  
**Interactions**: Drag, Keyboard, Pointer, Toggle  
**Visual Effects**: Particles, 3D, Shaders, Filters, Masks  
**Patterns**: Layout, Scroll, Navigation, Forms, Media  
**Quality**: Accessibility, Performance, Reduced Motion

---

## 🛠️ Tech Stack

- **Vanilla JavaScript** - No frameworks, pure JS
- **CSS3** - Modern styling with CSS variables
- **WebGL** - Hardware-accelerated background
- **Web APIs** - Intersection Observer, Web Animations, etc.
- **Zero Dependencies** (except optional gl-matrix for WebGL)

---

## 📁 Project Structure

```
fx-lab/
├── index.html              # Main HTML file
├── styles.css              # All styling (882 lines)
├── js/
│   ├── app.js              # Main application logic
│   ├── background.js       # Iridescent background effect
│   ├── ui-helpers.js       # UI utility functions
│   ├── constants.js        # Configuration constants
│   ├── effects-registry.js # Effect registration system
│   └── effects/            # 60+ effect files
│       ├── css-*.js        # CSS effects
│       ├── svg-*.js        # SVG effects
│       ├── canvas-*.js     # Canvas effects
│       └── webgl-*.js      # WebGL effects
└── src/                    # Refactored modules (in progress)
    ├── core/              # Core systems
    ├── ui/                # UI components
    └── config/            # Configuration
```

---

## 🎯 Categories of Effects

### CSS Effects
CSS-only animations and transitions
- Magnetic Button, Pulse Border, Tilt Card
- Glass Effect, Gradient Border, Neon Text
- Accordion, Radio Tabs, Marquee

### SVG Effects
Scalable vector graphics patterns
- Path Drawing, Text on Path
- Morphing Blobs, Animated Charts
- Analog Clock, Circular Timer

### Canvas Effects
Dynamic canvas animations
- Particle Systems, Starfield, Fireworks
- Metaballs, Flow Fields, Bouncing Balls

### WebGL Effects
Hardware-accelerated shaders
- Plasma effects, Advanced visualizations

### Interactions
User interaction patterns
- Drag & Drop, Sorting, Reordering
- Pan & Zoom, Parallax, Infinite Scroll
- Form Validation, File Upload

---

## 🔧 Development

### Running Locally

1. Clone the repository
2. Open `index.html` in a modern browser
3. Start exploring and modifying effects

### Adding New Effects

Create a new file in `js/effects/`:

```javascript
const effectMyEffect = {
  id: 'my-effect',
  name: 'My Cool Effect',
  type: 'CSS',
  tags: ['interaction', 'animation'],
  perf: 'GPU-light',
  description: '<h3>Description</h3><p>What this does...</p>',
  async load() {},
  init(container) {
    container.innerHTML = `<!-- Your HTML -->`;
    // Your code
  },
  teardown() {
    // Cleanup
  }
};

window.EFFECTS_REGISTRY.registerEffect(effectMyEffect);
```

Then add it to `index.html` in the effects section.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Credits & Acknowledgments

Created as a comprehensive reference for modern web effects and patterns. All effects are original implementations designed to be educational and reusable.

Inspired by:
- Modern CSS techniques
- Web animation best practices
- Interaction design patterns
- Performance optimization strategies

---

## 📈 Roadmap

- [ ] Add more effects (aiming for 100+)
- [ ] Export to CodePen feature
- [ ] Social sharing buttons
- [ ] Dark mode (enhanced)
- [ ] User favorites/bookmarks
- [ ] Advanced filtering options
- [ ] Performance metrics
- [ ] Community contributions

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingEffect`)
3. Commit your changes (`git commit -m 'Add some AmazingEffect'`)
4. Push to the branch (`git push origin feature/AmazingEffect`)
5. Open a Pull Request

---

## 📮 Contact & Links

- **Live Demo**: [[Website]](https://fx-lab.netlify.app/)
- **GitHub Issues**: https://github.com/Balanced-Libra/fx-lab/issues
- **Portfolio**: [[Portfolio](https://guyjames.site]

---

**Made with ❤️ for developers who love beautiful, interactive web experiences**
