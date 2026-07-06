# Styles Reference

This document is the implementation contract for Aurora's visual language as expressed in the current preview experience. It defines the semantic CSS foundation for static previews, HTML/CSS prototypes, and the base layer for richer component implementations.

## Source of truth for future work

- Treat the current preview as the reference implementation for shape, rhythm, and hierarchy.
- Preserve the existing dashboard patterns: sidebar navigation, top bar, tab bar, hero banner, app cards, and list rows.
- Prefer semantic classes and shared tokens over one-off styles so the preview stays stable when the docs evolve.

## Relationship to the Other Docs

- [DESIGN.md](./DESIGN.md) defines the principles, tone, and visual intent.
- This file turns those principles into reusable semantic CSS primitives.
- [COMPONENTS.md](./COMPONENTS.md) uses these primitives to describe higher-level component APIs and composition patterns.

When in doubt, start here for shared layout, spacing, typography, control, and feedback patterns.

## 1. Scope and Intent

This document is the shared implementation layer for Aurora. Its purpose is to ensure that any screen built in HTML/CSS, preview markup, or a component-based UI can follow the same structural and visual rules.

Use this document as the default reference for the following foundation categories:
- text and typography
- borders and outlines
- spacing and rhythm
- surfaces and background treatment
- layout primitives
- interaction and feedback states
- responsive behavior

## 2. Core Design Rules

### 2.1 Prefer semantic structure over custom styling

Start with semantic classes such as `.page-shell`, `.section`, `.surface`, `.stack`, `.cluster`, `.list`, and `.table`. Avoid writing one-off selectors for every screen.

### 2.2 Use design tokens before hard-coded values

Prefer tokens for color, spacing, radius, shadows, and motion. If a new value is needed, add a token first rather than introducing a hard-coded number.

### 2.3 Keep hierarchy quiet and explicit

The system should feel calm, not noisy. Typography, spacing, and color should create clear hierarchy without visual clutter.

### 2.4 Respect state and feedback

Every interactive element should have clear default, hover, focus, disabled, and selected states.

### 2.5 Accessibility and responsive rules

- Use visible focus styles for every interactive control and keep them consistent across components.
- Respect reduced-motion preferences and avoid decorative motion that distracts from primary tasks.
- Preserve readable line lengths, touch targets, and spacing at every breakpoint.
- Prefer single-column layouts on small screens, two-column arrangements on tablet, and more spacious compositions on desktop.
- Avoid introducing new visual weight without a semantic reason; if a component needs emphasis, use intent-driven tokens rather than one-off styling.

### 2.6 Non-negotiable shared-layer rules

The shared style layer must provide reusable primitives for high-frequency product patterns so implementation stays consistent across forms, lists, feedback, and navigation. These are not optional polish choices; they are part of the system contract.

- **Token use is mandatory:** colors, spacing, radius, shadow, typography, motion, and control sizing must come from shared tokens. No component may introduce a new visual measurement without first defining it in the token layer.
- **Decorative treatments are restricted:** gradients, blur, animation, and saturation are allowed only when they support hierarchy, state feedback, or emphasis. They are not allowed to decorate ordinary surfaces or repeated content containers.
- **States must be explicit:** every interactive primitive must define default, hover, focus, active, disabled, selected, and error states in the shared layer or in the component contract.
- **High-frequency workflows must be reusable:** forms, empty states, loading states, navigation, and data-density patterns must be implemented as shared primitives and reused consistently.
- **The preview must reflect the spec:** if the preview shows a pattern that is not supported by the shared layer, the implementation is considered incomplete.

### 2.7 Shared state and product-pattern primitives

The shared style layer should also provide reusable primitives for high-frequency product patterns so implementation stays consistent across forms, lists, feedback, and navigation.

```css
.form-group {
  display: grid;
  gap: 8px;
}

.form-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--foreground);
}

.form-help {
  font-size: 12px;
  color: var(--muted-foreground);
}

.form-error {
  color: var(--destructive);
}

.form-success {
  color: var(--success);
}

.empty-state {
  display: grid;
  gap: 16px;
  padding: 32px;
  border: 1px dashed var(--border);
  border-radius: var(--radius-lg);
  background: var(--muted);
  text-align: center;
}

.empty-state-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}

.inline-feedback {
  padding: 12px 14px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--muted);
}

.inline-feedback.is-error {
  border-color: var(--destructive);
  background: color-mix(in srgb, var(--destructive) 12%, var(--muted));
}

.inline-feedback.is-success {
  border-color: var(--success);
  background: color-mix(in srgb, var(--success) 12%, var(--muted));
}

.skeleton {
  position: relative;
  overflow: hidden;
  background: var(--muted);
}

.skeleton::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--foreground) 8%, transparent), transparent);
  animation: shimmer 1.2s infinite;
}

.table-shell {
  display: grid;
  gap: 8px;
}

.table-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 44px;
  padding: 12px 14px;
  border-bottom: 1px solid var(--border);
}

.table-row.is-selected {
  background: var(--accent);
}

.breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  color: var(--muted-foreground);
}

.subnav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 4px;
  border-radius: 999px;
  background: var(--muted);
}
```

These primitives should be used before introducing project-specific patterns. The goal is to preserve the same interaction language for validation, feedback, layout density, and navigation across every product surface.

### 2.7 Grid sizing guidance

Grid-based collections such as cards, app lists, and community tiles should not grow indefinitely as the viewport gets larger. Each repeated item should have a defined minimum and maximum width, and the grid tracks should use a bounded range rather than an unconstrained `1fr` fill.

Use patterns such as `repeat(auto-fit, minmax(min(100%, 240px), 320px))` or an equivalent combination of `min-width`, `max-width`, and `width: 100%` on the child item. This keeps the layout calm on large screens, preserves consistent rhythm, and avoids cards stretching into awkward proportions.

### 2.7 Token governance and review checklist

Use this checklist when introducing or changing shared styles:

- Define the value once in the token layer before applying it to a component.
- Prefer semantic aliases such as background, surface, border, or primary action over raw hex values.
- Verify focus visibility, contrast, and touch targets before shipping a new pattern.
- Confirm that the layout behaves sensibly at mobile, tablet, and desktop widths.
- Remove decorative treatments that do not support hierarchy, clarity, or trust.

### 2.8 Shared visual language implementation details

These details belong in the shared style layer so previews and components stay aligned with the system intent.

- **Color:** Use a neutral foundation with restrained accents. Keep large surfaces calm and let color support actions, feedback, and data emphasis.
- **Typography:** Prefer readable, high-contrast type with a clear hierarchy for display, heading, body, caption, and micro text.
- **Spacing and layout:** Use a 4px rhythm, bounded content widths, and predictable section spacing rather than ad hoc gutters.
- **Surfaces and elevation:** Radius, border, shadow, and blur should be defined once in tokens and reused by cards, panels, and overlays.
- **Interaction states:** Every interactive primitive should define default, hover, focus, active, disabled, selected, loading, and error states.
- **Responsive behavior:** Prefer single-column layouts on small screens and more spacious multi-column compositions on larger breakpoints.
- **Product patterns:** Forms, empty states, loading states, tables, and navigation should be shared primitives rather than one-off styles.

## 3. Token Layer

### 3.1 Preview token review anchors

For preview validation, treat the following token groups as the minimum visual regression set:

- Color foundation: background, foreground, surface, border, muted text, primary/secondary/accent
- Status colors: danger, success, warning, info
- Shape and rhythm: radius, spacing, typography scale
- Size and shape primitives: avatar sizes, icon sizes, pill radius, badge/chip padding, control heights
- Typography and composition primitives: a small set of display, heading, body, and caption sizes plus shared line-height and hero button padding
- Elevation and motion: shadows, focus ring, brand gradient, transitions

If one of these groups changes dramatically, the preview will look materially different even when the overall layout stays the same. A quick pass can therefore focus on whether the preview still feels calm, restrained, and consistent in contrast, border weight, corner softness, and depth.

### 3.2 Token hierarchy

Aurora's styling should be driven by a layered token system rather than isolated values. The simplest mental model is:

1. Foundation tokens: define the raw primitives such as color, spacing, radius, motion, and typography.
2. Semantic tokens: assign meaning to those primitives for shared roles such as background, surface, border, action, overlay, feedback, and layout intent.
3. Component tokens: only after the first two layers exist, define component-specific scales such as control height, badge padding, avatar sizes, app icon sizes, and hero spacing.
4. State tokens: add interaction overrides for hover, focus, active, disabled, and selected states.

A good rule of thumb is: foundation tokens are for values, semantic tokens are for roles, and component tokens are for component-scale decisions. Avoid using foundation values directly in component styles when a semantic token already exists.

### 3.3 Single-source token contract

The design system should expose one canonical token layer for every visual decision. Any new color, spacing, radius, shadow, typography, or motion value must be defined once here and then reused by preview styles and components.

#### Required token flow
1. Define the raw foundation token.
2. Map it to a semantic role such as background, surface, border, action, or status.
3. Reuse the semantic token from shared primitives and components.
4. Review the change against contrast, focus visibility, touch target, and responsive behavior before release.

### 3.4 Current preview token layers

The current preview token set should be read in three layers so implementation stays understandable and future changes stay scoped:

- Foundation tokens: the raw values that define the design language, including color primitives, spacing scale, radius values, shadows, motion curves, and the default font stack.
- Semantic tokens: the meaning layer that maps those values to shared roles, such as background, surface, border, action, overlay, feedback, and container/layout intent.
- Component tokens: the scale layer used only when a preview pattern needs its own consistent size or rhythm, such as control heights, badge padding, avatar sizes, app icon sizes, hero button padding, and progress bar dimensions.

In practice, foundation tokens define what exists; semantic tokens define what a thing means; component tokens define how a specific component scales.

### 3.5 Semantic color tokens for light and dark themes

Aurora should expose two complete color sets: one for the default light theme and one for the dark theme. Components should consume the semantic color tokens below, while layout, spacing, radius, motion, and component-scale tokens remain in the shared root layer.

In practice, the dark-theme block should only override color-related tokens. Shared values such as spacing, typography, grid sizing, control heights, and shadow scales stay in the root layer and are reused by both themes.

```css
:root {
  /* Shared layout and component-scale tokens */
  --spacing-2: 8px;
  --content-inline-padding: clamp(16px, 3vw, 32px);
  --grid-card-min-width: 240px;
  --grid-card-max-width: 320px;
  --control-min-height: 40px;
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);

  /* Light theme colors */
  --color-background: oklch(1 0 0);
  --color-foreground: oklch(0.145 0 0);
  --color-card: oklch(1 0 0);
  --color-muted: oklch(0.961 0 0);
  --color-muted-foreground: oklch(0.451 0 0);
  --color-border: oklch(0.898 0 0);
  --color-input: oklch(0.945 0 0);
  --color-ring: oklch(0.145 0 0);

  --color-primary: oklch(0.09 0 0);
  --color-primary-foreground: oklch(0.98 0 0);
  --color-secondary: oklch(0.961 0 0);
  --color-secondary-foreground: oklch(0.09 0 0);
  --color-accent: oklch(0.961 0 0);
  --color-accent-foreground: oklch(0.09 0 0);

  --color-surface: var(--color-card);
  --color-surface-muted: var(--color-muted);
  --color-surface-hover: oklch(0.945 0 0);
  --color-surface-active: oklch(0.905 0 0);
  --color-control: var(--color-border);
  --color-control-hover: oklch(0.93 0 0);
  --color-control-pressed: oklch(0.89 0 0);
  --color-action-default: var(--color-primary);
  --color-action-hover: oklch(0.14 0 0);
  --color-action-pressed: oklch(0.12 0 0);
  --color-overlay: rgba(15, 23, 42, 0.04);
}

[data-theme="dark"] {
  /* Dark theme colors only */
  /* 提升背景/卡片/次级面板的明度层级差距，避免暗色模式下内容糊成一片 */
  --color-background: oklch(0.16 0 0);
  --color-foreground: oklch(0.97 0 0);
  --color-card: oklch(0.26 0 0);
  --color-muted: oklch(0.34 0 0);
  --color-muted-foreground: oklch(0.64 0 0);
  --color-border: oklch(0.42 0 0);
  --color-input: oklch(0.30 0 0);
  --color-ring: oklch(0.94 0 0);

  --color-primary: oklch(0.95 0 0);
  --color-primary-foreground: oklch(0.12 0 0);
  --color-secondary: oklch(0.34 0 0);
  --color-secondary-foreground: oklch(0.95 0 0);
  --color-accent: oklch(0.38 0 0);
  --color-accent-foreground: oklch(0.95 0 0);

  --color-surface: var(--color-card);
  --color-surface-muted: var(--color-muted);
  --color-surface-hover: oklch(0.30 0 0);
  --color-surface-active: oklch(0.38 0 0);
  --color-overlay: rgba(255, 255, 255, 0.08);
}
```

Do not duplicate spacing, radius, typography, or component-scale tokens inside the dark theme block. If a token influences structure or rhythm rather than color, keep it in the shared layer.

### 3.6 Semantic aliases for implementation

These aliases should be used by shared UI primitives and component styles so that the implementation stays readable and consistent.

```css
:root {
  --background: var(--color-background);
  --foreground: var(--color-foreground);
  --card: var(--color-card);
  --muted: var(--color-muted);
  --muted-foreground: var(--color-muted-foreground);
  --border: var(--color-border);
  --input: var(--color-input);
  --ring: var(--color-ring);
  --primary: var(--color-primary);
  --primary-foreground: var(--color-primary-foreground);
  --accent: var(--color-accent);
  --accent-foreground: var(--color-accent-foreground);
  --destructive: var(--color-danger);
  --success: var(--color-success);
  --warning: var(--color-warning);
  --info: var(--color-info);
}
```

### 3.7 Spacing scale

```css
:root {
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-5: 20px;
  --spacing-6: 24px;
  --spacing-8: 32px;
  --spacing-12: 48px;
}
```

### 3.8 Radius and elevation

```css
:root {
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);
  --shadow-xl: 0 24px 60px -30px rgba(15, 23, 42, 0.32);
}
```

### 3.7 Component, interaction, and state tokens

When a token is used by a shared component pattern, it should be named for the role it serves rather than the raw value. The same contract should cover surfaces, controls, and feedback states so a consumer can build the same UI language without inventing new values.

```css
:root {
  --surface-radius: var(--radius-lg);
  --surface-border: 1px solid var(--color-border);
  --surface-shadow: var(--shadow-md);
  --surface-hover: var(--color-surface-hover);
  --surface-active: var(--color-surface-active);
  --control-default: var(--color-control);
  --control-hover: var(--color-control-hover);
  --control-pressed: var(--color-control-pressed);
  --action-default: var(--color-action-default);
  --action-hover: var(--color-action-hover);
  --action-pressed: var(--color-action-pressed);
  --action-disabled: var(--color-action-disabled);
  --action-disabled-foreground: var(--color-action-disabled-foreground);
  --focus-ring: 0 0 0 3px oklch(from var(--color-focus) l c h / 0.16);
  --overlay-backdrop: var(--color-overlay);
}
```

Use these tokens to define defaults for tabs, buttons, links, cards, inputs, and badges. State tokens such as `--color-success-soft`, `--color-danger-soft`, `--color-warning-soft`, and `--color-info-soft` should be used for inline feedback, badges, or subtle banners rather than hard-coded colors.

## 4. Layout Primitives

These classes form the base layer for most screens.

### 4.1 Common layout helpers

```css
:root {
  --page-max-width: none;
  --content-inline-padding: 24px;
  --surface-radius: var(--radius-lg);
  --surface-border: 1px solid var(--border);
  --surface-shadow: var(--shadow-md);
}

.page-shell {
  width: 100%;
  margin: 0 auto;
  padding: var(--content-inline-padding);
}

.section {
  display: grid;
  gap: 16px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.surface {
  background: var(--card);
  border: var(--surface-border);
  border-radius: var(--surface-radius);
  box-shadow: var(--surface-shadow);
}

.stack {
  display: grid;
  gap: 16px;
}

.cluster {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.split {
  display: grid;
  gap: 24px;
  grid-template-columns: minmax(0, 1.4fr) minmax(320px, 0.8fr);
}

.hero-banner {
  padding: 32px;
  border-radius: var(--surface-radius);
  background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #2563eb 100%);
  color: white;
}
```

### Layout usage rules
- Use `.page-shell` for the outer page frame.
- Use `.section` for grouped content areas.
- Use `.surface` for cards, panels, and secondary containers.
- Use `.split` when content needs a main area and a supporting sidebar.

## 5. Typography System

This section covers the base text semantics that should appear in almost every screen.

### 5.1 Type scale

```css
:root {
  --font-sans: "Geist", "Segoe UI", "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: "Geist Mono", "SFMono-Regular", Consolas, "Liberation Mono", monospace;
  --text-xs: 12px;
  --text-sm: 13px;
  --text-base: 14px;
  --text-lg: 16px;
  --text-xl: 18px;
  --text-2xl: 24px;
  --text-3xl: 32px;
}

body {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: 1.5;
  color: var(--foreground);
  background: var(--background);
}

h1, h2, h3, h4, h5, h6 {
  margin: 0;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

.text-muted {
  color: var(--muted-foreground);
}

.text-strong {
  color: var(--foreground);
  font-weight: 600;
}

.text-xs { font-size: var(--text-xs); }
.text-sm { font-size: var(--text-sm); }
.text-lg { font-size: var(--text-lg); }
.text-xl { font-size: var(--text-xl); }
.text-2xl { font-size: var(--text-2xl); }
.text-3xl { font-size: var(--text-3xl); }
```

### 5.2 Typography rules
- Body text should stay readable and neutral.
- Headings should be concise and informative.
- Secondary text should use muted color and slightly smaller size.
- Avoid using more than three type weights in a single screen.

### 5.3 Text semantic helpers

```css
.text-caption {
  font-size: var(--text-xs);
  line-height: 1.4;
  color: var(--muted-foreground);
}

.text-body {
  font-size: var(--text-base);
  line-height: 1.5;
  color: var(--foreground);
}

.text-label {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--foreground);
}

.text-inline-code {
  font-family: ui-monospace, SFMono-Regular, monospace;
  font-size: 0.93em;
  padding: 0.1em 0.35em;
  border-radius: 0.35em;
  background: var(--muted);
}
```

## 6. Content Patterns

### 6.1 Lists

```css
.list {
  display: grid;
  gap: 12px;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
}

.list-item:last-child {
  border-bottom: none;
}
```

### 6.2 Tables

```css
.table {
  display: grid;
  gap: 0;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--surface-radius);
  background: var(--card);
}

.table-row {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr);
  gap: 16px;
  padding: 14px 16px;
  align-items: center;
  border-top: 1px solid var(--border);
}

.table-row:first-child {
  border-top: none;
}
```

### 6.3 Card grid

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
  gap: 16px;
}
```

## 7. Controls and Input Patterns

This section covers the most common control primitives and their visual states.

### 7.1 Buttons

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 40px;
  padding: 0 14px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--card);
  color: var(--foreground);
  font: inherit;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 160ms ease, border-color 160ms ease, transform 160ms ease;
}

.button:hover {
  background: var(--accent);
}

.button:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

.button.primary {
  background: var(--primary);
  color: var(--primary-foreground);
  border-color: var(--primary);
}

.button.secondary {
  background: var(--muted);
  color: var(--foreground);
}

.button.ghost {
  background: transparent;
  border-color: transparent;
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### 7.2 Inputs

```css
.field {
  display: grid;
  gap: 8px;
}

.label {
  font-size: var(--text-sm);
  font-weight: 500;
}

.input,
.select,
.textarea {
  width: 100%;
  min-height: 40px;
  padding: 0 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--card);
  color: var(--foreground);
  font: inherit;
}

.input:focus,
.select:focus,
.textarea:focus {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
  border-color: var(--ring);
}
```

## 8. Feedback and Status Patterns

This section covers status, badge, and neutral feedback treatments.

### 8.1 Badges and pills

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 999px;
  background: var(--muted);
  color: var(--foreground);
  font-size: var(--text-xs);
  font-weight: 600;
}
```

### 8.2 Progress and status

```css
.progress-bar {
  width: 100%;
  height: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: var(--muted);
}

.progress-fill {
  height: 100%;
  border-radius: inherit;
  background: var(--primary);
}

.status-success { color: var(--success); }
.status-warning { color: var(--warning); }
.status-danger { color: var(--destructive); }
.status-info { color: var(--info); }
```

### 8.3 Alerts and empty states

```css
.alert {
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--muted);
}

.empty-state {
  display: grid;
  gap: 8px;
  padding: 24px;
  text-align: center;
  color: var(--muted-foreground);
}
```

## 9. State and Interaction Rules

This section covers the common interaction states that should be consistent across components.

- Hover states should be subtle and consistent.
- Focus states must be visible and keyboard-accessible.
- Disabled controls should look inactive without disappearing.
- Active or selected states should use stronger contrast than default.

```css
.is-active {
  border-color: var(--primary);
  background: var(--accent);
}

.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}
```

## 10. Responsive Guidelines

This section covers how the shared primitives should adapt across viewport sizes.

- Use fluid grids and allow cards to wrap naturally on smaller viewports.
- Prioritize one-column layout on narrow screens.
- Keep touch targets at least 40px high on mobile.
- Avoid forcing overly dense content in small viewports.

```css
@media (max-width: 768px) {
  .page-shell {
    padding: 16px;
  }

  .split {
    grid-template-columns: 1fr;
  }
}
```

## 11. Authoring Guidelines for Future Work

- Start from the semantic primitives before introducing one-off classes.
- Reuse existing names when a pattern already exists.
- Prefer tokens over hard-coded values.
- If a pattern is reused in multiple screens, promote it into this document.
- Do not introduce a visual style without a corresponding semantic class or token.
- If a new pattern appears in more than one context, it should be documented here rather than only in a single page.

## 12. Foundation Class Inventory

The following categories should be treated as the default semantic vocabulary for Aurora. They are intended to be stable, reusable, and easy to map to preview implementations.

### 12.1 Text classes

- `.text-caption` — secondary metadata and small helper text
- `.text-body` — standard paragraph and content text
- `.text-label` — short field or section labels
- `.text-strong` — emphasized text inside a neutral context
- `.text-inline-code` — inline code and technical labels

### 12.2 Border and outline classes

- `.border-surface` — standard surface boundary
- `.border-muted` — softer separation for secondary content
- `.border-strong` — stronger visual separation for emphasis
- `.focus-ring` — shared visible focus treatment

### 12.3 Surface and background classes

- `.surface` — default card or panel surface
- `.surface-muted` — secondary, less prominent background
- `.surface-accent` — highlighted or featured surface
- `.surface-ghost` — nearly transparent surface for lightweight containers

### 12.4 Radius and shadow classes

- `.radius-sm` — compact, subtle rounding
- `.radius-md` — default component rounding
- `.radius-lg` — large surface rounding
- `.shadow-sm` — subtle elevation
- `.shadow-md` — standard card elevation
- `.shadow-lg` — stronger layered elevation

### 12.5 Spacing classes

- `.space-1` through `.space-10` — semantic spacing helpers mapped to the spacing token scale

### 12.6 Layout classes

- `.page-shell` — outer page frame
- `.section` — grouped content section
- `.section-header` — title and action header block
- `.stack` — vertical rhythm container
- `.cluster` — inline wrapping group
- `.split` — two-column supporting layout
- `.card-grid` — rhythmic card layout

### 12.7 Interaction classes

- `.button` — base button treatment
- `.button.primary` — primary action
- `.button.secondary` — secondary action
- `.button.ghost` — tertiary or subtle action
- `.is-active` — active or selected state
- `.is-disabled` — disabled state

### 12.8 Feedback classes

- `.badge` — compact status or category marker
- `.progress-bar` — progress visualization wrapper
- `.progress-fill` — progress indicator fill
- `.alert` — inline feedback or notice container
- `.empty-state` — empty or no-results treatment

### 12.9 Preview mapping guidance

When a new preview screen is built, the implementation should prefer these classes in order:
1. structural layout classes
2. surface and spacing classes
3. text and content classes
4. control and feedback classes
5. component-specific overrides only when necessary

This gives the preview a direct path to the same semantic vocabulary used in the design and component docs.
