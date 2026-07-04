# Design System

> A comprehensive design system for modern SaaS applications with gradient-rich aesthetics, sophisticated depth, and enterprise-grade accessibility.

---

## 📚 Documentation Structure

### [DESIGN.md](./DESIGN.md) - Design Principles & Philosophy
**Purpose:** The foundational document explaining WHY behind every design decision.

**Contains:**
- Design Philosophy (5 core pillars)
- Visual Theme & Atmosphere
- Color Palette & Roles (OKLCH color space)
- Typography Rules (Inter Variable)
- Layout & Spacing (4px rhythm)
- Depth & Elevation (shadow system)
- Interaction States (hover, focus, active, disabled)
- Do's and Don'ts
- Cross-Device Design Decision Framework
- Responsive Behavior
- Accessibility (WCAG 2.1 AA)
- Agent Prompt Quick Reference
- Applying the System

**Read this if you want to:**
- Understand the design philosophy
- Learn the principles behind decisions
- Make consistent decisions in uncovered scenarios
- Contribute to the design system
- Onboard new designers/developers

---

### [COMPONENTS.md](./COMPONENTS.md) - Component Library Reference
**Purpose:** Detailed API documentation and usage examples for all components.

**Contains:**
- Layout Components (DashboardShell, PageSection)
- Container Components (Surface, HeroPanel, FormSection)
- Content Components (SectionHeader, StatCard, ListRow, EmptyState)
- Form Components (Input, Select, Checkbox, Radio, Textarea)
- Data Display (Tables, Badges)
- Navigation Components (Breadcrumbs, Tabs, Pagination)
- Feedback Components (Toast, Alerts, Loading)
- Icon System (Lucide React guidelines)

**Read this if you want to:**
- Implement a specific component
- Understand component props and variants
- See code examples and best practices
- Learn accessibility considerations for each component
- Find the right component for your use case

---

## 🎨 Quick Start

### For Designers

1. **Read [DESIGN.md](./DESIGN.md) first** - Understand the philosophy and principles
2. **Reference [COMPONENTS.md](./COMPONENTS.md)** - Learn component patterns and variants
3. **Use the Decision Framework** - Apply principles to new scenarios not explicitly covered
4. **Follow Do's and Don'ts** - Avoid common pitfalls

### For Developers

1. **Import components from `design-system/components/`**
   ```tsx
   import { Surface, StatCard, DashboardShell } from '@/design-system/components/app-shell'
   ```

2. **Reference [COMPONENTS.md](./COMPONENTS.md)** for API details
   ```tsx
   <Surface tone="accent" className="p-5">
     <StatCard title="Total Users" value="1,234" />
   </Surface>
   ```

3. **Follow accessibility guidelines** - Keyboard navigation, ARIA labels, contrast ratios

4. **Use design tokens** - Color, spacing, typography from the system
   ```tsx
   className="text-muted-foreground space-y-4 rounded-[24px]"
   ```

---

## 📂 Directory Structure

```
design-system/
├── README.md                 # This file - overview and navigation
├── DESIGN.md                 # Design principles and philosophy
├── COMPONENTS.md             # Component API documentation
└── components/
    └── app-shell.tsx         # Core design system components
```

---

## 🎯 Design Principles Summary

### 1. Progressive Disclosure
Start simple, reveal complexity only when needed. Use depth to indicate interactivity.

### 2. Spatial Consistency
Predictable layouts with 4px spacing rhythm and large corner radius (24-32px).

### 3. Responsive Honesty
Mobile and desktop are different experiences - embrace that with context-aware design.

### 4. Feedback Loops
Every interaction provides immediate visual feedback (100-200ms transitions).

### 5. Accessible by Default
WCAG 2.1 AA compliance minimum, keyboard navigation, screen reader support.

---

## 🎨 Visual Identity

### Color System
- **OKLCH Color Space** - Perceptual uniformity, predictable lightness
- **Primary:** Indigo (professional, trustworthy)
- **Neutral Cool Tones** - Reduces eye strain
- **70-90% Opacity** - Creates layering without hard edges

### Typography
- **Font:** Inter Variable (400-900 weights)
- **Scale:** 10px to 48px with clear hierarchy
- **Line Height:** 1.5 for body, 1.15 for headings
- **Letter Spacing:** Negative for large text, positive for small

### Spacing & Layout
- **Rhythm:** 4px base unit (8px, 12px, 16px, 24px, 32px)
- **Max Width:** 1280px (max-w-7xl) for content
- **Border Radius:** 6px buttons, 18px lists, 24px cards, 32px heroes

### Depth & Shadows
- **Level 1 (Raised):** Subtle separation
- **Level 2 (Card):** Primary content containers
- **Level 3 (Panel):** Prominent sections
- **Level 4 (Modal):** Critical overlays
- **Blur:** 24-100px with purple/blue tints

---

## 🚀 Component Categories

### Layout Components
- **DashboardShell** - Root container, 1280px max-width, responsive padding
- **PageSection** - Section grouping with header

### Container Components
- **Surface** - Base card (3 tones: default, muted, accent)
- **HeroPanel** - Landing page header with gradients
- **FormSection** - Form field grouping

### Content Components
- **SectionHeader** - Standalone header with actions
- **StatCard** - Metrics display
- **ListRow** - Uniform list items
- **EmptyState** - No-content placeholder

---

## ✅ Accessibility Features

- **WCAG 2.1 Level AA** compliance minimum
- **4.5:1 contrast** for text, 3:1 for interactive elements
- **Keyboard navigation** - Tab, Enter, Escape, Arrow keys
- **Screen reader support** - Semantic HTML, ARIA labels
- **Focus indicators** - 3px ring, never removed
- **Reduced motion** - Respects `prefers-reduced-motion`
- **Touch targets** - 44px minimum on mobile

---

## 📖 Usage Examples

### Building a Dashboard

```tsx
import { DashboardShell, PageSection, Surface, StatCard } from '@/design-system/components/app-shell'

export default function DashboardPage() {
  return (
    <DashboardShell>
      <PageSection
        title="Overview"
        description="Key metrics at a glance"
        actions={<Button>Export</Button>}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Users" value="1,234" tone="accent" />
          <StatCard title="Active Sessions" value="89" />
          <StatCard title="Revenue" value="$45.2K" tone="accent" />
          <StatCard title="Conversion" value="12.4%" />
        </div>
      </PageSection>
      
      <PageSection title="Recent Activity">
        <Surface className="p-5">
          {/* Content */}
        </Surface>
      </PageSection>
    </DashboardShell>
  )
}
```

### Building a Form

```tsx
import { FormSection } from '@/design-system/components/app-shell'
import { Label, Input, Button } from '@/components/ui'

export default function SettingsPage() {
  return (
    <form className="space-y-6">
      <FormSection
        title="Profile Information"
        description="Update your personal details"
      >
        <div className="space-y-1.5">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" />
        </div>
        
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" />
        </div>
        
        <div className="flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button type="submit">Save</Button>
        </div>
      </FormSection>
    </form>
  )
}
```

---

## 🤝 Contributing

### Adding New Components

1. **Define the use case** - What problem does this solve?
2. **Check existing components** - Can you compose from existing?
3. **Follow design principles** - 4px rhythm, WCAG AA, consistent radius
4. **Document in COMPONENTS.md** - API, variants, examples, best practices
5. **Test accessibility** - Keyboard nav, screen readers, contrast

### Updating Documentation

1. **DESIGN.md changes** - For principles, philosophy, design rationale
2. **COMPONENTS.md changes** - For API, props, usage examples
3. **Keep both in sync** - Cross-reference when needed

---

## 🔗 Related Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Primitives](https://www.radix-ui.com/primitives) - Base for shadcn/ui
- [Lucide Icons](https://lucide.dev/) - Icon library
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Accessibility reference
- [OKLCH Color Space](https://oklch.com/) - Modern color picker

---

## 📝 Changelog

### Version 1.0 (2026-07-04)
- Initial design system documentation
- 9 core components in app-shell.tsx
- Comprehensive design principles
- Cross-device design decision framework
- Complete accessibility guidelines
- Component library reference

---

*Design System Version: 1.0*  
*Last Updated: 2026-07-04*  
*Maintained by: Design & Engineering Teams*
