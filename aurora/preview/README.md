# Aurora Design System - Preview Gallery

> **Live HTML + CSS previews of the Aurora design system**

Interactive demos built with pure HTML and CSS (no frameworks) to showcase the design system's visual style, components, and patterns.

---

## 📂 Preview Pages

### 🏠 [index.html](./index.html) - Home & Overview
**What it shows:**
- Design philosophy (5 core pillars)
- Key visual characteristics
- Quick navigation to all preview pages
- Hero panel with radial gradients
- Surface card variants

**Best for:** First-time visitors wanting to understand Aurora at a glance

---

### 🎨 [components.html](./components.html) - Component Library
**What it shows:**
- Buttons (primary, outline, ghost, all sizes)
- Surface cards (default, muted, accent tones)
- Stat cards for metrics display
- Badges and status indicators
- List rows and repeating content
- Form elements (inputs, textareas)
- Empty states
- Section headers with actions

**Best for:** Developers implementing components, designers exploring UI patterns

---

### 🌈 [colors.html](./colors.html) - Color System
**What it shows:**
- OKLCH color palette explanation
- Primary, semantic, and status colors
- Gradient backgrounds (light + dark mode)
- Hero panel multi-layer gradients
- Color psychology and reasoning
- Accessibility contrast ratios (WCAG AA)

**Best for:** Understanding color strategy, accessibility validation, brand applications

---

### 📊 [dashboard.html](./dashboard.html) - Complete Layout
**What it shows:**
- Full dashboard layout
- Navigation with frosted glass effect
- Stat cards grid (4 metrics)
- Charts and data visualization placeholders
- Activity feed with timeline
- Team activity sidebar
- Project list with badges
- Two-column responsive layout

**Best for:** Seeing how components work together, layout patterns, real-world application

---

### 📝 [typography.html](./typography.html) - Typography System
**What it shows:**
- Complete type scale (10px - 48px)
- Inter Variable font specimens
- Line height demonstrations
- Letter spacing strategy (negative for large, positive for small)
- Readability guidelines (line length, contrast)
- Weight variants (400, 500, 600, 700)
- Best practices (do's and don'ts)

**Best for:** Content creators, copywriters, developers implementing text hierarchy

---

## 🚀 How to Use

### Local Development

1. **Clone or download the Aurora design system**
   ```bash
   git clone https://github.com/yourusername/aurora.git
   cd aurora/preview
   ```

2. **Open in browser**
   - Simply double-click `index.html` to open in your default browser
   - Or use a local server:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Node.js (http-server)
     npx http-server -p 8000
     
     # VS Code Live Server extension
     Right-click index.html → "Open with Live Server"
     ```

3. **Navigate**
   - Start at `index.html` for overview
   - Use top navigation to explore other pages
   - All pages are fully standalone (no build step required)

---

## 🎨 Design Features Showcased

### Visual Characteristics
- ✨ **Radial Gradients:** Subtle indigo gradients (18-24% opacity) for depth
- 🥶 **Frosted Glass:** `backdrop-filter: blur(16px)` for layering
- 🔵 **Large Radius:** 24-32px border radius for friendly, modern feel
- 🌑 **Multi-layer Shadows:** Soft, deep shadows with purple tints
- 🎯 **OKLCH Colors:** Perceptually uniform color space
- 📏 **4px Rhythm:** Consistent spacing scale throughout

### Interaction States
- **Hover:** Opacity 0.9 + translateY(-2px) lift on cards
- **Focus:** 3px ring with 50% opacity (WCAG compliant)
- **Active:** Visual press feedback
- **Disabled:** 50% opacity + not-allowed cursor

### Responsive Behavior
- **Mobile-first:** Stacks naturally on small screens
- **Breakpoints:** 640px (sm), 768px (md), 1024px (lg)
- **Touch-friendly:** 44px minimum touch targets
- **Adaptive padding:** Scales from 12px to 32px

---

## 🔧 Customization

### Modify Colors

Edit `styles.css` `:root` variables:

```css
:root {
  --primary: #4f46e5;        /* Change primary color */
  --foreground: #0a0a0a;     /* Change text color */
  --background: #ffffff;     /* Change background */
  /* ... more tokens */
}
```

### Add Dark Mode Support

The system includes automatic dark mode support via `@media (prefers-color-scheme: dark)`.

### Change Font

Replace Google Fonts link in HTML `<head>`:

```html
<!-- Current: Inter Variable -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

<!-- Example: Replace with Poppins -->
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Then update CSS:
```css
:root {
  --font-family: 'Poppins', -apple-system, sans-serif;
}
```

---

## 📐 Implementation Notes

### Pure CSS - No Dependencies
- ✅ **No Tailwind CSS** (though design mirrors Tailwind conventions)
- ✅ **No JavaScript frameworks** (React, Vue, etc.)
- ✅ **No build tools** required
- ✅ **Works offline** after initial load

### Browser Support
- **Modern browsers:** Chrome 90+, Firefox 90+, Safari 14+, Edge 90+
- **CSS features used:**
  - CSS Grid & Flexbox
  - CSS Custom Properties (variables)
  - `backdrop-filter` for frosted glass
  - `oklch()` color space (with hex fallbacks)

### Performance
- **Single CSS file:** `styles.css` (~15KB unminified)
- **System fonts fallback:** Inter from Google Fonts (optional)
- **No images:** Pure CSS gradients and effects
- **Fast render:** < 100ms paint on modern devices

---

## 📚 Related Documentation

- **[DESIGN.md](../DESIGN.md)** - Design principles and philosophy
- **[COMPONENTS.md](../COMPONENTS.md)** - Complete component API reference
- **[README.md](../README.md)** - Getting started guide

---

## 🎯 Use Cases

### For Designers
- **Visual reference** when creating mockups
- **Color palette** for Figma/Sketch
- **Component patterns** for consistency
- **Accessibility standards** for compliance

### For Developers
- **Implementation guide** for building components
- **CSS patterns** to copy/paste
- **Responsive examples** for mobile-first design
- **Accessibility attributes** for ARIA labels

### For Stakeholders
- **Quick preview** of design direction
- **Interactive demos** for decision-making
- **No technical setup** required (just open in browser)

### For Documentation
- **Screenshot source** for design docs
- **Live examples** in Storybook/documentation sites
- **Testing sandbox** for new patterns

---

## 🐛 Known Limitations

1. **No JavaScript interactions**
   - Dropdowns, modals, tooltips are static
   - Use actual component library for full functionality

2. **Simplified layouts**
   - Real dashboards have dynamic data
   - These are visual references, not production code

3. **Browser compatibility**
   - `backdrop-filter` not supported in older browsers
   - OKLCH colors have limited support (fallbacks provided)

---

## 📄 License

MIT License - Use freely in personal and commercial projects.

---

## 🙋 Questions?

- **Design questions:** See [DESIGN.md](../DESIGN.md#design-philosophy)
- **Component API:** See [COMPONENTS.md](../COMPONENTS.md)
- **General info:** See [README.md](../README.md)

---

**Aurora Design System** · Version 1.0 · 2026  
Built with ❤️ for modern SaaS applications
