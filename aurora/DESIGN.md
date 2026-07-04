# Modern SaaS Design System

> **Category:** Enterprise SaaS  
> **Aesthetic:** Clean, modern, gradient-rich with sophisticated depth and clear hierarchy  
> **Companion Document:** [COMPONENTS.md](./COMPONENTS.md) for detailed component API and usage examples

---

## Design Philosophy

### Core Principle: Clarity Through Depth

This design system is built on the belief that **digital interfaces should feel like physical spaces** — with depth, light, and layers that guide attention naturally. We don't flatten everything; we use subtle gradients, shadows, and transparency to create visual hierarchy that mirrors how humans understand physical environments.

### Design Pillars

**1. Progressive Disclosure**
- Start simple, reveal complexity only when needed
- Use depth (shadows, blur, layers) to indicate interactivity and importance
- Clear visual hierarchy guides users through tasks without overwhelming them

**2. Spatial Consistency**
- Layout follows predictable patterns: fixed navigation, centered content, breathing room
- Consistent spacing rhythm (4px base, 8px increments) creates visual harmony
- Large corner radius (24-32px) softens interactions, making the interface feel approachable

**3. Responsive Honesty**
- Mobile and desktop are different experiences — we embrace that
- Touch targets are generous (44px minimum) on mobile, precise on desktop
- Navigation adapts to context: persistent sidebar on desktop, collapsible on mobile

**4. Feedback Loops**
- Every interaction provides immediate visual feedback
- Hover states preview interactivity (lift, color shift)
- Focus rings guide keyboard navigation
- Loading states maintain context (skeleton screens, spinners)

**5. Accessible by Default**
- High contrast ratios (4.5:1 minimum) ensure readability
- Keyboard navigation is a first-class citizen, not an afterthought
- Motion respects user preferences (reduced motion support)
- Screen readers get semantic HTML and ARIA labels

### Why This Approach?

**Gradients & Blur:** Create depth without harsh lines. Radial gradients (18-24% opacity) add visual interest without distraction. Backdrop blur signals layering and focus.

**Large Corner Radius:** 24-32px radius feels modern and friendly. It reduces visual noise and creates flow between sections.

**Multi-layer Shadows:** Deep, soft shadows (60-100px blur) with low opacity (0.28-0.42) create realistic depth. Purple/blue tints echo the decorative background gradients.

**Immediate Transitions:** 100-200ms transitions feel instant but provide visual continuity. Longer (300ms) for complex state changes like expanding accordions.

**Zero Tooltip Delay:** Information should be instant. 0ms delay shows tooltips immediately on hover, respecting users' curiosity.

---

## 1. Visual Theme & Atmosphere

A contemporary enterprise design language built on soft gradients, generous spacing, and refined depth. The system communicates professionalism through subtle radial gradients, frosted-glass surfaces, and carefully calibrated shadows. The foundation is a pure neutral palette (black/white with zero chroma) with decorative indigo gradients providing ambient warmth.

**Design Intent:**

This aesthetic serves enterprise users who need to focus on complex tasks. The gradient-rich background provides visual interest without competing for attention. Frosted-glass surfaces (backdrop-blur) create clear layering — users immediately understand what's an overlay, what's a card, what's the background.

**Key Characteristics:**

- Soft radial gradients on major surfaces (18% opacity, subtle)
- Frosted-glass backdrop blur effects (`backdrop-blur-xl`) for layering
- Large corner radius (24px–32px) for primary surfaces — friendly, modern
- Multi-layer shadow system with purple/blue tints — ties to primary palette
- High color contrast for accessibility (4.5:1 text, 3:1 interactive)
- Generous whitespace and padding — content breathes, focus is clear

---

## 2. Color Palette & Roles

### Design Intent: Semantic Color with Perceptual Uniformity

We use **OKLCH color space** instead of traditional hex/RGB because:

- **Perceptually Uniform:** Equal numeric changes produce equal visual differences (unlike RGB)
- **Predictable Lightness:** `L` value directly maps to perceived brightness
- **Wider Gamut:** Supports modern displays with P3 color space
- **Better Interpolation:** Gradients don't pass through muddy colors

**Color Psychology:**

- **Neutral Primary:** Pure black/white with zero chroma creates timeless, professional appearance that never feels dated or trendy
- **Indigo Ambience:** Subtle indigo gradients (18-24% opacity) in backgrounds provide warmth without distraction
- **Cool Neutral Tones:** Gray palette with subtle blue undertones reduces eye strain, feels modern and clean
- **Minimal Saturation:** Reserved for critical feedback (errors) and success states — draws attention where needed
- **70-90% Opacity:** Creates layering without hard edges, glass-like depth

**Semantic Color Strategy:**
Colors communicate meaning, not just decoration:
- Primary = "Take action here"
- Muted = "Supporting information"
- Destructive = "Stop and think"
- Accent = "Hover preview"

### Primary

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `--background` | `oklch(1 0 0)` (#ffffff-ish) | `oklch(0.145 0 0)` (#0a0a0a-ish) | Main canvas |
| `--foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` | Primary text |
| `--primary` | `oklch(0.205 0 0)` | `oklch(0.87 0 0)` | CTA buttons, links |
| `--primary-foreground` | `oklch(0.985 0 0)` | `oklch(0.205 0 0)` | Text on primary |

### Semantic

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `--card` | `oklch(1 0 0)` | `oklch(0.205 0 0)` | Card surfaces |
| `--muted` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` | Subtle backgrounds |
| `--muted-foreground` | `oklch(0.556 0 0)` | `oklch(0.708 0 0)` | Secondary text |
| `--accent` | `oklch(0.97 0 0)` | `oklch(0.371 0 0)` | Hover states |
| `--destructive` | `oklch(0.58 0.22 27)` | `oklch(0.704 0.191 22.216)` | Error/danger |

### Neutral

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `--border` | `oklch(0.922 0 0)` | `oklch(1 0 0 / 10%)` | Card borders |
| `--input` | `oklch(0.922 0 0)` | `oklch(1 0 0 / 15%)` | Input borders |
| `--ring` | `oklch(0.708 0 0)` | `oklch(0.556 0 0)` | Focus rings |

### Gradients & Effects

**Radial Gradient (Light):**
```css
radial-gradient(circle at top left, rgba(129,140,248,0.18), transparent 34%),
linear-gradient(180deg, #f8fafc 0%, #f5f7fb 100%)
```

**Radial Gradient (Dark):**
```css
radial-gradient(circle at top left, rgba(79,70,229,0.24), transparent 30%),
linear-gradient(180deg, #020617 0%, #0f172a 100%)
```

**Frosted Surface:**
```css
background: rgba(255,255,255,0.85);
backdrop-filter: blur(16px);
```

### Shadows

**Surface Shadow (24px radius cards):**
```css
box-shadow: 0 24px 60px -30px rgba(15,23,42,0.32);
```

**Elevated Shadow (32px radius panels):**
```css
box-shadow: 0 35px 100px -42px rgba(15,23,42,0.42);
```

**Accent Gradient Shadow:**
```css
box-shadow: 0 24px 60px -32px rgba(79,70,229,0.28);
```

---

## 3. Typography Rules

### Design Intent: Readability is King

Typography is the primary interface between content and user. We prioritize **readability over style**:

**Why Inter Variable?**
- **Variable Font:** One file, infinite weights (400-900), reduces bandwidth
- **Optimized for Screens:** Tall x-height, open apertures, clear at small sizes
- **Neutral Personality:** Doesn't compete with content, suitable for all contexts
- **Excellent Hinting:** Crisp at all sizes, even on low-DPI screens

**Hierarchy Philosophy:**

1. **Contrast Creates Clarity:** 48px hero vs. 16px body (3:1 ratio) — clear visual steps
2. **Line Height for Readability:** 1.5 for body text (comfortable reading), 1.15 for headings (tight, impactful)
3. **Negative Letter Spacing on Large Text:** -0.02em on 48px+ reduces visual gaps between letters
4. **Positive Tracking on Small Text:** +0.05em on micro text (10px) increases legibility
5. **Weight Differentiation:** 600 for headings (authoritative), 400 for body (easy to read)

**Readability Guidelines:**
- Never below 14px for body text (12px absolute minimum for captions)
- Max line length: 75 characters (~672px at 16px) — prevents eye strain
- Sufficient contrast: 4.5:1 minimum (WCAG AA)

### Font Families

- **Primary:** `'Inter Variable', -apple-system, system-ui, sans-serif`
- **Fallback:** System UI stack

### Hierarchy

| Level | Family | Size | Weight | Line Height | Letter Spacing |
|-------|--------|------|--------|-------------|----------------|
| **Hero Title** | Inter Variable | 48px (3rem) | 600 | 1.15 | -0.02em |
| **Display** | Inter Variable | 40px (2.5rem) | 600 | 1.20 | -0.015em |
| **Heading 1** | Inter Variable | 36px (2.25rem) | 600 | 1.25 | -0.01em |
| **Heading 2** | Inter Variable | 24px (1.5rem) | 600 | 1.30 | normal |
| **Heading 3** | Inter Variable | 20px (1.25rem) | 600 | 1.35 | normal |
| **Body Large** | Inter Variable | 18px (1.125rem) | 400 | 1.50 | normal |
| **Body** | Inter Variable | 16px (1rem) | 400 | 1.50 | normal |
| **Body Medium** | Inter Variable | 16px (1rem) | 500 | 1.50 | normal |
| **Caption** | Inter Variable | 14px (0.875rem) | 400 | 1.40 | normal |
| **Small** | Inter Variable | 12px (0.75rem) | 500 | 1.35 | 0.01em |
| **Micro** | Inter Variable | 10px (0.625rem) | 600 | 1.30 | 0.05em (uppercase) |

---

## 4. Component Specifications

> 📚 **For detailed component API documentation, usage examples, and implementation guides, see [COMPONENTS.md](./COMPONENTS.md)**

### Design Intent: Components as System Blocks

Components are designed with **composability** in mind. Each component is self-contained yet harmonious with others. We prioritize:

- **Visual Weight:** Primary actions (solid bg) > Secondary (outline) > Tertiary (ghost)
- **Touch-Friendly:** Minimum 36px height (h-9) balances desktop precision with mobile usability
- **Consistent Radius:** Buttons (6px) are deliberately smaller than cards (24px) to create visual hierarchy
- **State Clarity:** Hover, focus, active, disabled states are visually distinct but follow the same color logic

**Component Categories:**
- **Layout:** DashboardShell, PageSection
- **Containers:** Surface, HeroPanel, FormSection
- **Content:** SectionHeader, StatCard, ListRow, EmptyState
- **Forms:** Input, Select, Checkbox, Radio, Textarea
- **Data Display:** Tables, Badges, Charts
- **Navigation:** Breadcrumbs, Tabs, Pagination
- **Feedback:** Toast, Alerts, Loading States
- **Icons:** Lucide React with size/color system

### Buttons

**Design Rationale:**
Buttons use **opacity reduction (0.8)** instead of color shifts on hover because it preserves brand color while signaling interactivity. The 6px radius is small enough to feel precise but large enough to avoid sharp edges.

**Specifications:**

**Primary:**
- Background: `var(--primary)`
- Text: `var(--primary-foreground)`
- Padding: `10px 16px` (h-9)
- Border Radius: `6px` (rounded-md)
- Font: 14px, 500 weight
- Hover: `opacity: 0.8`

**Secondary/Outline:**
- Background: `var(--background)`
- Border: `1px solid var(--border)`
- Text: `var(--foreground)`
- Border Radius: `6px`
- Hover: `var(--accent)` background

**Ghost:**
- No border, no background
- Hover: `var(--muted)` background

### Cards

**Standard Surface:**
- Background: `var(--card) / 90%` with `backdrop-blur-xl`
- Border: `1px solid var(--border) / 70%`
- Border Radius: `24px`
- Padding: `20px` (p-5)
- Shadow: `0 24px 60px -30px rgba(15,23,42,0.32)`

**Accent Surface (for stats/highlights):**
- Background: `linear-gradient(135deg, var(--primary)/10, var(--background))`
- Border: `1px solid var(--primary)/20`
- Shadow: `0 24px 60px -32px rgba(79,70,229,0.28)`

### Inputs

- Border: `1px solid var(--input)`
- Border Radius: `6px` (rounded-md)
- Padding: `8px 10px`
- Font: 14px
- Focus: `3px ring var(--ring)/50%`
- Invalid: `3px ring var(--destructive)/20%`

### Hero Panel

- Border Radius: `32px`
- Padding: `24px` (sm: 32px, lg: 40px)
- Background: Radial gradient + linear gradient overlay
- Border: `1px solid var(--border)/70%`
- Shadow: `0 35px 100px -42px rgba(15,23,42,0.42)`
- Glass shine overlay: `linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.24) 45%, transparent 100%)`

### Badge

- Height: `20px` (h-5)
- Padding: `0 8px` (px-2)
- Border Radius: `9999px` (fully rounded)
- Font: 12px, 500 weight
- Border: `1px solid transparent`

### List Items

- Border Radius: `18px`
- Border: `1px solid var(--border)/70%`
- Background: `var(--background)/70%`
- Padding: `12px` (p-3)
- Gap: `12px` between items

---

## 5. Layout & Spacing

### Design Intent: Rhythm and Breathing Room

Spacing creates visual rhythm — the "heartbeat" of the interface. We use a **4px base unit** because:

- **Mathematical Consistency:** All spacing is divisible by 4, creating perfect alignment
- **Predictable Scale:** Doubling (4 → 8 → 16 → 32) creates clear visual steps
- **Cognitive Load:** Users don't notice the spacing system, they feel the rhythm

**Generous Whitespace Philosophy:**
Modern screens are large. Don't fear empty space — it guides attention. Section gaps (24-32px) prevent visual crowding. Card padding (20px) ensures content never touches edges.

### Spacing Scale

Based on Tailwind's spacing (4px base unit):

| Token | Value | Usage |
|-------|-------|-------|
| `1` | 4px | Micro gaps |
| `2` | 8px | Tight spacing |
| `3` | 12px | Default gap |
| `4` | 16px | Standard padding |
| `5` | 20px | Card padding |
| `6` | 24px | Section spacing |
| `8` | 32px | Large sections |
| `10` | 40px | Major blocks |
| `12` | 48px | Hero padding |

### Corner Radius

| Token | Value | Usage |
|-------|-------|-------|
| `sm` | `4px` | Badges, micro elements |
| `md` | `6px` | Buttons, inputs |
| `lg` | `10px` | Small cards |
| `xl` | `12px` | Standard cards |
| `2xl` | `16px` | Nested cards |
| `3xl` | `20px` | Section headers |
| `custom-24` | `24px` | Primary surfaces |
| `custom-28` | `28px` | Dashboard headers |
| `custom-32` | `32px` | Hero panels |
| `full` | `9999px` | Pills, circles |

### Container Widths

- **Max Width (standard):** `1280px` (max-w-7xl)
- **Content Width:** `672px` (max-w-2xl) for text-heavy content
- **Dashboard Shell:** `1280px` with `24px` side padding

---

## 6. Depth & Elevation

### Design Intent: Mimicking Physical Reality

Shadows are not decoration — they're **information**. In physical space, shadows tell us:
- How far an object is from the surface (shadow size)
- Light source direction (shadow angle)
- Object shape (shadow form)

We mimic this in UI:

**Shadow Philosophy:**

1. **Soft, Deep Shadows:** Large blur (60-100px), low opacity (0.28-0.42) — creates soft, realistic depth
2. **Negative Spread:** -30px to -42px spread concentrates shadow under element (objects don't cast infinitely)
3. **Blue-Purple Tints:** `rgba(15,23,42,...)` has slight blue, ties to indigo primary, feels modern not flat black
4. **Layered Shadows:** Multiple shadows (Level 4 modals) create ultra-realistic depth

**Why These Specific Values?**
- **60-100px blur:** Soft enough to feel natural, not harsh digital edges
- **0.28-0.42 opacity:** Visible but not dominant, doesn't obscure content beneath
- **30-42px negative spread:** Prevents shadow "halo" around elements

**Elevation = Importance:**
- Flush (0): Inline text, icons
- Raised (1): Subtle separation
- Card (2): Primary content containers
- Panel (3): Prominent sections (hero panels)
- Modal (4): Critical overlays that demand attention

### Shadow System

**Level 0 (Flush):**
- No shadow
- Use for inline elements

**Level 1 (Raised):**
```css
box-shadow: 0 1px 2px 0 rgba(15,23,42,0.05);
```

**Level 2 (Card):**
```css
box-shadow: 0 24px 60px -30px rgba(15,23,42,0.32);
```

**Level 3 (Panel):**
```css
box-shadow: 0 35px 100px -42px rgba(15,23,42,0.42);
```

**Level 4 (Modal):**
```css
box-shadow: 0 35px 100px -42px rgba(15,23,42,0.42),
            0 24px 70px -40px rgba(15,23,42,0.34);
```

### Backdrop Blur

- **Standard:** `backdrop-blur-xl` (16px)
- **Heavy:** `backdrop-blur-2xl` (24px)

---

## 7. Interaction States

### Design Intent: Affordance Through Feedback

Interaction states answer the question: **"Can I interact with this?"** Good interaction design is invisible — users don't think about it, they just act.

**Core Principles:**

1. **Immediate Feedback:** Hover states appear within 100ms (feels instant)
2. **Subtle Lift:** 2px translation (`translateY(-0.5px)`) suggests physicality without being distracting
3. **Progressive Enhancement:** Keyboard users get focus rings, mouse users get hover states, touch users get instant feedback
4. **Reversibility:** All states are reversible — hover away, blur away, release away

**Why These Specific Values?**

- **3px focus ring:** Thick enough to see, thin enough to not dominate
- **50% opacity ring:** High contrast without being harsh
- **0.8 opacity hover:** 20% darker is perceptible but not jarring
- **100ms transitions:** Faster than human reaction time (200ms), feels instant

### Hover

**Buttons:**
- Primary: `bg-primary/80` (20% darker)
- Outline/Ghost: Shift to `bg-muted` with `text-foreground`
- Link: Apply `underline`

**Cards & Interactive Surfaces:**
- Translation: `translateY(-0.5px)` (2px lift)
- Background: `bg-muted/50` color shift
- Border: Lighten to `border-primary/50` for emphasis

**Navigation & Tabs:**
- Text color: `text-muted-foreground` → `text-foreground`
- Background: Subtle `bg-accent` or `bg-muted`

### Focus

**Keyboard Focus Ring:**
- Ring width: `3px` (ring-[3px])
- Ring color: `var(--ring)/50%` (50% opacity)
- Border color: `var(--border-ring)`
- Applied via: `focus-visible:ring-ring/50 focus-visible:border-ring`

**Focus Visible Strategy:**
- Use `focus-visible:` prefix for keyboard-only focus
- Avoid `:focus` to prevent mouse-click focus rings
- Ring appears outside border (does not shift layout)

### Active

**Button Press:**
- No scale transform (maintains solid feel)
- Background darkens further: `active:bg-primary/90`
- Pressed state via: `aria-pressed:bg-muted`

**Interactive Elements:**
- Translation resets: `translateY(0)`
- Background state: `data-[state=selected]:bg-muted`

### Disabled

**Visual Treatment:**
- Opacity: `0.5` for all disabled elements
- Cursor: `not-allowed`
- Pointer events: `none` (blocks all interaction)
- Applied via: `disabled:pointer-events-none disabled:opacity-50`

### Transition Behavior

**Default Transitions:**
- Duration: `100ms` (duration-100) for most interactions
- Timing: Default browser easing (ease)
- Properties: `transition-colors` for backgrounds, `transition-all` for buttons

**Specific Durations:**
- Sidebar animations: `200ms ease-linear`
- Dialog/modal: `100ms` with zoom + fade
- Tooltips: `0ms delay` (instant show)

**Transform Transitions:**
- Hover lift: `transition` (default 150ms)
- Rotation (chevrons): `duration-300` for smooth rotation

### Loading & Skeleton States

**Loading Indicators:**
- Spinner: `animate-spin` (continuous rotation)
- Applied to: Icons like `<RefreshCwIcon>`
- Duration: Infinite until loaded

**Skeleton Placeholders:**
- Animation: `animate-pulse` (opacity fade in/out)
- Background: `bg-muted`
- Border radius: Matches content shape (rounded-md)

### Modal & Overlay Animations

**Entry Animation:**
- Overlay: `fade-in-0` with `backdrop-blur-xs`
- Content: `zoom-in-95` (scale from 95% to 100%)
- Slide direction: `slide-in-from-top-2` or side-specific

**Exit Animation:**
- Overlay: `fade-out-0`
- Content: `zoom-out-95`
- Duration: `100ms`

### Micro-interactions

**Icon Feedback:**
- Hover rotation: ChevronDown rotates 180° on expand
- Loading spin: Continuous `animate-spin` on RefreshCw
- Success check: Instant appearance (no animation)

**Tooltip Behavior:**
- Delay: `0ms` (instant on hover)
- Fade in: `fade-in-0`
- Position: Dynamic based on available space

**Table Row Hover:**
- Background: `hover:bg-muted/50`
- Transition: `transition-colors`
- Selected state: `data-[state=selected]:bg-muted`

---

## 8. Do's and Don'ts

### Design Intent: Guiding Principles in Practice

These aren't arbitrary rules — they're **patterns that emerged from real use**. Follow them to maintain consistency and avoid common pitfalls.

### ✅ Do

- Use 24px+ border radius for primary surfaces
- Apply frosted-glass effects with `backdrop-blur`
- Maintain high contrast ratios (WCAG AA minimum)
- Use multi-layer shadows for depth
- Apply radial gradients subtly (18–24% opacity max)
- Use consistent spacing (multiples of 4px)

### ❌ Don't

- Use sharp corners on large surfaces (< 12px radius)
- Skip backdrop blur on semi-transparent surfaces
- Over-saturate gradients (> 30% opacity)
- Mix different shadow styles within same component
- Use heavy drop shadows without blur
- Skip letter-spacing on uppercase micro text

---

## 8.5. Cross-Device Design Decision Framework

### Design Intent: Empowering Consistent Decision-Making

This framework enables you to **make design decisions in scenarios not explicitly covered** by this document. The goal: anyone can extrapolate from these principles to create consistent experiences across any device or context.

### Core Decision Hierarchy

When designing for a new component, screen, or interaction, follow this priority order:

```
1. User Goal → What is the user trying to accomplish?
2. Device Context → Desktop (precision) vs. Mobile (speed) vs. Tablet (hybrid)?
3. Content Density → Information-heavy vs. Action-focused?
4. Interaction Model → Mouse/keyboard vs. Touch vs. Voice?
5. Visual Priority → Primary action vs. Supporting content?
```

**Example Application:**

Building a new "File Upload" component:
1. **User Goal:** Upload a file quickly, see progress, handle errors
2. **Device Context:** Desktop (drag-drop + browse) vs. Mobile (camera + browse)
3. **Content Density:** Minimal (just the uploader) during upload, expands to show list
4. **Interaction Model:** Desktop = hover preview, Mobile = tap to select
5. **Visual Priority:** Upload button = Primary, File list = Secondary

---

### Scaling Strategy: The 3-Zone System

Divide every design into **3 conceptual zones** that scale differently:

#### Zone 1: Critical Actions (Scale Minimally)
- **What:** Primary CTAs, form inputs, navigation
- **Desktop → Mobile:** -10% to -20% size reduction maximum
- **Why:** Users need to complete actions regardless of device
- **Example:** Button height: 36px desktop → 32px mobile (11% reduction)

#### Zone 2: Content & Layout (Scale Moderately)
- **What:** Text, cards, images, containers
- **Desktop → Mobile:** -20% to -40% size reduction
- **Why:** Content adapts to screen real estate
- **Example:** Card padding: 24px desktop → 16px mobile (33% reduction)

#### Zone 3: Decorative Elements (Scale Aggressively or Remove)
- **What:** Gradients, shadows, blur effects, large radius
- **Desktop → Mobile:** -40% to -60% reduction, or remove entirely
- **Why:** Performance and focus matter more than decoration on small screens
- **Example:** Shadow blur: 60px desktop → 30px mobile (50% reduction) or remove

---

### Decision Matrix: Spacing & Sizing

Use this formula to calculate any spacing/sizing for intermediate breakpoints:

```
Mobile Value + ((Desktop Value - Mobile Value) × Breakpoint Factor)
```

**Breakpoint Factors:**
- `sm` (640px): 0.25 (25% toward desktop)
- `md` (768px): 0.50 (50% toward desktop)
- `lg` (1024px): 0.75 (75% toward desktop)
- `xl` (1280px): 1.00 (full desktop)

**Example: Card Padding**
- Mobile (base): 16px
- Desktop: 24px
- Difference: 8px

Calculated values:
- `sm`: 16 + (8 × 0.25) = **18px**
- `md`: 16 + (8 × 0.50) = **20px** ✅ (use existing token `p-5`)
- `lg`: 16 + (8 × 0.75) = **22px** → round to **24px**
- `xl`: 24px

**Practical Implementation:**
```tsx
<div className="p-4 sm:p-5 lg:p-6">
  {/* 16px → 20px → 24px */}
</div>
```

---

### Typography Scaling Decision Tree

**Step 1: Identify Text Role**
- [ ] Is this a heading? → Use size-based scaling
- [ ] Is this body text? → Maintain minimum 16px
- [ ] Is this metadata/caption? → 14px minimum, don't reduce further

**Step 2: Apply Scaling Rules**

**Headings (Display, H1, H2):**
```
Mobile = Desktop × 0.70 to 0.80

H1 Desktop: 36px → Mobile: 28px (0.78 ratio)
H2 Desktop: 24px → Mobile: 20px (0.83 ratio)
```

**Body Text:**
```
Mobile = Desktop (or increase for readability)

Body Desktop: 16px → Mobile: 16px (no reduction)
Optional: Mobile: 18px (increase for touch screens)
```

**UI Text (Buttons, Labels):**
```
Mobile = Desktop - 2px maximum

Button Desktop: 14px → Mobile: 14px (no reduction)
Label Desktop: 14px → Mobile: 12px (acceptable minimum)
```

---

### Interaction Pattern Selection Guide

Use this flowchart to choose the right pattern:

```
Is the action PRIMARY?
├─ Yes → Full-width button on mobile, standard button on desktop
└─ No → Is there space for inline action?
    ├─ Yes → Keep inline (icon button + label)
    └─ No → Move to overflow menu (⋮) on mobile

Does the content need manipulation?
├─ Sorting/Filtering → Desktop: Dropdown, Mobile: Bottom sheet
├─ Selection → Desktop: Checkbox, Mobile: Checkbox (larger touch target)
└─ Editing → Desktop: Inline edit, Mobile: Full-screen modal

Is navigation hierarchical?
├─ 2 levels → Desktop: Sidebar, Mobile: Hamburger menu
├─ 3+ levels → Desktop: Sidebar with sections, Mobile: Drill-down navigation
└─ Flat (< 5 items) → Desktop: Top nav, Mobile: Bottom nav
```

---

### Component Adaptation Patterns

#### Pattern 1: Expand → Collapse
**When:** Desktop has side-by-side layout, mobile doesn't

**Example: Form with Preview**
```
Desktop: [Form | Preview] (2 columns)
Mobile:  [Form] → Tap "Preview" → [Preview] (tabs/accordion)
```

#### Pattern 2: Persistent → On-Demand
**When:** Desktop has always-visible controls, mobile needs space

**Example: Data Table Actions**
```
Desktop: Hover row → Show actions inline
Mobile:  Swipe row → Reveal actions
         OR Tap row → Bottom sheet with actions
```

#### Pattern 3: Inline → Modal
**When:** Complex input requires focus on mobile

**Example: Date Range Picker**
```
Desktop: Inline calendar dropdown (medium size)
Mobile:  Full-screen modal with large touch targets
```

#### Pattern 4: Multi-Column → Single Stack
**When:** Content cards need full attention on mobile

**Example: Dashboard Widgets**
```
Desktop: 3-column grid (33% each)
Tablet:  2-column grid (50% each)
Mobile:  1-column stack (100%)
```

---

### Shadow & Depth Adaptation Rules

**Rule 1: Reduce Blur Proportionally**
```
Mobile Blur = Desktop Blur × 0.5

Desktop: 60px blur → Mobile: 30px blur
Desktop: 100px blur → Mobile: 50px blur
```

**Rule 2: Reduce Spread Proportionally**
```
Mobile Spread = Desktop Spread × 0.7

Desktop: -30px spread → Mobile: -21px spread
Desktop: -42px spread → Mobile: -29px spread
```

**Rule 3: Maintain Opacity**
```
Keep opacity the same across devices

Desktop: rgba(15,23,42,0.32) → Mobile: rgba(15,23,42,0.32)
(Only reduce blur and spread, not color/opacity)
```

**Rule 4: Simplify Multi-Layer Shadows**
```
Desktop: 2-3 layer shadows → Mobile: 1-2 layer shadows

Desktop (Modal):
  shadow-[0_35px_100px_-42px_rgba(15,23,42,0.42),
          0_24px_70px_-40px_rgba(15,23,42,0.34)]

Mobile (Modal):
  shadow-[0_20px_50px_-20px_rgba(15,23,42,0.42)]
  (Keep strongest shadow only)
```

---

### Border Radius Adaptation Formula

**Small Elements (Buttons, Inputs):**
```
Mobile Radius = Desktop Radius (no change)

Desktop: 6px → Mobile: 6px
Reason: Buttons are already touch-optimized
```

**Medium Elements (Cards, Panels):**
```
Mobile Radius = Desktop Radius × 0.75

Desktop: 24px → Mobile: 18px
Desktop: 20px → Mobile: 15px → Round to 16px (2xl)
```

**Large Elements (Hero, Modals):**
```
Mobile Radius = Desktop Radius × 0.70

Desktop: 32px → Mobile: 22px → Round to 24px
Desktop: 28px → Mobile: 20px
```

**Exceptions:**
- Pills/circles (`rounded-full`) → Always `9999px` (no change)
- Micro elements (badges) → Already at minimum, no change

---

### Performance-Driven Decisions

When device capabilities differ, prioritize **perceived performance**:

#### Low-End Mobile Devices
```
1. Remove backdrop-blur → Use solid bg with 90% opacity
2. Reduce shadow complexity → 1 layer instead of 2-3
3. Simplify gradients → Linear only, or solid colors
4. Disable hover effects → Instant tap feedback only
5. Reduce animation duration → 50ms instead of 100ms
```

#### High-End Desktop
```
1. Full backdrop-blur-xl (16px)
2. Multi-layer shadows (up to 3 layers)
3. Radial + linear gradients
4. Smooth transitions (100-200ms)
5. Micro-interactions (icon rotations, etc.)
```

**Detection Strategy:**
```javascript
// Pseudo-code for capability detection
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const lowEndDevice = navigator.hardwareConcurrency < 4 || 
                      !window.CSS?.supports('backdrop-filter', 'blur(10px)')

if (lowEndDevice) {
  // Use simplified styling
}
```

---

### Practical Examples: Applying the Framework

#### Example 1: New "Comment Thread" Component

**Analysis:**
1. **User Goal:** Read comments, reply quickly
2. **Device:** Desktop (detailed) vs. Mobile (scan quickly)
3. **Content Density:** High (nested threads)
4. **Interaction:** Desktop = inline reply, Mobile = modal reply
5. **Priority:** Comments = secondary, Reply = primary action

**Design Decisions:**

**Desktop:**
- Nested indentation: 32px per level (shows hierarchy)
- Avatar: 40px (clear identity)
- Inline reply box (always visible)
- Hover shows actions (edit, delete)

**Mobile:**
- Flat list (no deep nesting, "View replies" link)
- Avatar: 32px (still clear, saves space)
- FAB for reply (bottom-right corner)
- Tap shows actions in bottom sheet

**Spacing:**
```tsx
<div className="space-y-3 md:space-y-4 lg:space-y-6">
  {/* 12px → 16px → 24px */}
</div>
```

---

#### Example 2: New "Data Visualization Dashboard"

**Analysis:**
1. **User Goal:** Understand trends at a glance
2. **Device:** Desktop (analyze deeply) vs. Mobile (quick check)
3. **Content Density:** Very high (multiple charts)
4. **Interaction:** Desktop = hover tooltips, Mobile = tap tooltips
5. **Priority:** Charts = primary, Filters = secondary

**Design Decisions:**

**Desktop:**
- 3-column grid (33% each chart)
- Persistent filter sidebar (left side)
- Hover tooltips (instant, 0ms delay)
- 24px padding on cards

**Mobile:**
- Single column (100%, vertical scroll)
- Filters in sticky header (collapsible)
- Tap for tooltip (persistent until tap outside)
- 16px padding on cards

**Chart Sizing:**
```tsx
<div className="h-64 md:h-80 lg:h-96">
  {/* 256px → 320px → 384px */}
</div>
```

---

#### Example 3: New "Multi-Step Form Wizard"

**Analysis:**
1. **User Goal:** Complete form without losing progress
2. **Device:** Desktop (all steps visible) vs. Mobile (focus one step)
3. **Content Density:** Medium (5-8 fields per step)
4. **Interaction:** Desktop = click next, Mobile = swipe or tap
5. **Priority:** Current step = primary, Progress = secondary

**Design Decisions:**

**Desktop:**
- Horizontal stepper at top (all steps visible)
- 2-column form layout (labels left, inputs right)
- Next/Back buttons bottom-right
- 32px vertical spacing between fields

**Mobile:**
- Minimal progress indicator (Step 2 of 5)
- Single-column layout (labels above inputs)
- Fixed bottom bar with Next button (always visible)
- 24px vertical spacing between fields

**Button Layout:**
```tsx
// Desktop: side-by-side
<div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
  <Button variant="outline">Back</Button>
  <Button>Next</Button>
</div>

// Mobile: stacked, reverse order (Next on top)
```

---

### Edge Cases & Boundary Conditions

#### Very Small Screens (< 375px)
- **Strategy:** Maintain minimum readable sizes, reduce whitespace further
- **Text:** Never below 14px
- **Touch targets:** Never below 40px height
- **Spacing:** Use `p-3` (12px) minimum, not `p-2`

#### Very Large Screens (> 1920px)
- **Strategy:** Cap max-width, don't stretch content infinitely
- **Containers:** `max-w-7xl` (1280px) or `max-w-screen-xl`
- **Images:** Maintain aspect ratio, don't upscale beyond 2x
- **Typography:** Cap at desktop sizes, don't increase further

#### Tablet Landscape (768px - 1024px)
- **Strategy:** Hybrid approach (desktop layout, mobile interactions)
- **Navigation:** Desktop-style sidebar with touch-optimized targets
- **Cards:** 2-column grid (not 3, not 1)
- **Modals:** Medium size (not full-screen, not small dropdown)

#### Unusual Aspect Ratios (Ultra-wide, Vertical)
- **Ultra-wide:** Use multi-column layouts, but cap content width
- **Vertical (tablet portrait):** Prioritize vertical scrolling, not horizontal
- **Foldables:** Treat as desktop when unfolded, mobile when folded

---

### Self-Testing Checklist

Before implementing a new design, ask:

- [ ] Does this follow the 4px spacing rhythm?
- [ ] Are touch targets at least 40px (mobile) or 36px (desktop)?
- [ ] Is text at least 14px (never below)?
- [ ] Does contrast meet WCAG AA (4.5:1 for text)?
- [ ] Do hover states exist on desktop only (not mobile)?
- [ ] Do focus rings work for keyboard navigation?
- [ ] Does the design work without color alone (for colorblind users)?
- [ ] Can I complete the task on mobile without frustration?
- [ ] Does the mobile version remove or simplify decorative elements?
- [ ] Is the shadow blur reduced by 50% on mobile?

If you answer "no" to any question, revisit the design against this framework.

---

## 9. Responsive Behavior

### Design Intent: Context-Aware, Not Just Smaller

Responsive design isn't about shrinking desktop layouts — it's about **respecting the context** of each device:

- **Mobile users** are often on-the-go: minimize navigation depth, prioritize quick actions
- **Desktop users** have space and precision: persistent navigation, multi-column layouts, hover states
- **Tablet users** get the best of both: touch-optimized but with desktop-like density

**Core Philosophy:**

1. **Mobile First in Intent, Desktop First in Execution:** Design for mobile constraints (focus, simplicity) but implement for desktop first (our primary users)
2. **Touch vs. Pointer:** Mobile gets 44px touch targets and bottom navigation; desktop gets compact controls and sidebar
3. **Progressive Disclosure:** Mobile hides complexity (hamburger menu); desktop reveals it (persistent sidebar)
4. **Performance Matters:** Reduce blur, shadows, and animation complexity on mobile for smooth 60fps

### Breakpoints

| Breakpoint | Min Width | Usage |
|------------|-----------|-------|
| `sm` | 640px | Small tablets |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large screens |

### Scaling Rules

**Typography:**
- Reduce by 4–8px per breakpoint below `md`
- Hero titles: 48px → 36px on mobile
- Body text: Maintains 16px minimum for readability

**Padding & Spacing:**
- Reduce by 25–50% on `sm` screens
- Hero panels: `p-10 lg:p-10 → p-6 sm:p-8`
- Cards: `p-6 → p-4 sm:p-5`
- Container: `px-8 → px-4 sm:px-6`

**Border Radius:**
- Reduce by 20–30% on mobile
- Cards: `24px → ~18px` equivalent feel
- Hero: `32px → ~24px` equivalent feel

**Shadows:**
- Reduce blur radius by 30–50% on mobile
- Maintain shadow presence for depth hierarchy
- Adjust spread to prevent overflow

### Mobile-Specific Interactions

**Navigation:**
- Desktop: Fixed rounded-full navbar with backdrop-blur
- Mobile (`< lg`): Full-width overlay menu
  - Trigger: Hamburger icon button
  - Animation: Fade-in overlay with `backdrop-blur-sm`
  - Background: `bg-background/80`
  - Close: Tap outside or close button

**Bottom Navigation (Mobile):**
- Visible: `< lg` breakpoint only
- Position: Fixed bottom with `pb-24` content padding
- Style: `bg-background/95 backdrop-blur-xl`
- Border: Top border for separation
- Interaction: Touch-optimized tap targets (min 44px)

**Touch Targets:**
- Minimum size: 44x44px (iOS HIG standard)
- Buttons: `h-9` (36px) with adequate spacing
- Icons: `size-5` (20px) minimum
- Mobile adjustments: Increase padding for easier tapping

**Sidebar Behavior:**
- Desktop (`lg+`): Persistent sidebar
- Mobile: Hidden by default
  - Toggle: Via hamburger or swipe gesture (if supported)
  - Animation: Slide-in with `transition-[left,right] duration-200`
  - Overlay: `backdrop-blur-xs` backdrop

**Gesture Support:**
- Swipe gestures: Not implemented (relies on browser defaults)
- Pull-to-refresh: Browser native support
- Tap: Standard touch event handling

### Layout Adaptations

**Grid Layouts:**
- Desktop: `grid-cols-2` or `grid-cols-3`
- Tablet: `md:grid-cols-2`
- Mobile: Single column (default)
- Gap reduction: `gap-6 → gap-4` on mobile

**Flex Layouts:**
- Desktop: `flex-row` with `justify-between`
- Mobile: `flex-col` stacking
- Header actions: `sm:flex-row` (row from small up)

**Content Width:**
- Max-width containers: `max-w-7xl` (1280px)
- Mobile: `px-4` breathing room (16px sides)
- Desktop: `px-8` generous spacing (32px sides)

**Typography Adjustments:**
- Line height: Increase by 0.1-0.15 on mobile for readability
- Letter spacing: Maintain or slightly increase
- Font size: Never below 14px for body text

### Performance Considerations

**Animation Optimization:**
- Use `transform` and `opacity` for GPU acceleration
- Avoid animating `width`, `height`, `left`, `top`
- Prefer `translate` over `position` changes

**Reduced Motion:**
- Respect `prefers-reduced-motion: reduce`
- Disable transforms and transitions when reduced motion is on
- Maintain state changes without animation

**Mobile Performance:**
- Backdrop blur: May reduce to `backdrop-blur-sm` on low-end devices
- Shadow complexity: Simplify multi-layer shadows on mobile
- Gradient overlays: Consider simpler gradients for performance

---

## 10. Accessibility

### Design Intent: Inclusive Design is Good Design

Accessibility isn't an afterthought or a compliance checkbox — it's **fundamental to good UX**. When you design for people with disabilities, you improve the experience for everyone:

- **High contrast** helps everyone in bright sunlight
- **Keyboard navigation** benefits power users who never touch their mouse
- **Clear error messages** reduce frustration for all users
- **Large touch targets** help everyone with motor impairments, including temporary ones (holding coffee)

**Core Accessibility Principles:**

1. **Perceivable:** Users can perceive all information (color isn't the only indicator)
2. **Operable:** Users can operate all controls (keyboard, mouse, touch, voice)
3. **Understandable:** Interface behaves predictably, errors are clear
4. **Robust:** Works with assistive technologies (screen readers, magnifiers)

**Our Commitment:**
- WCAG 2.1 Level AA compliance minimum
- Keyboard navigation for all interactive elements
- Screen reader tested with NVDA/JAWS/VoiceOver
- Reduced motion support for vestibular disorders

### Color Contrast

- **Normal Text:** Minimum 4.5:1 contrast ratio
- **Large Text (18px+):** Minimum 3:1 contrast ratio
- **Interactive Elements:** Minimum 3:1 against background
- **Tested Against:** WCAG 2.1 Level AA standards

### Focus Indicators

**Keyboard Focus:**
- Always visible focus ring (3px, 50% opacity)
- Ring color: `var(--ring)` (neutral gray, high contrast)
- Never remove `:focus` styles without replacement
- Use `focus-visible:` for keyboard-only focus states

**Focus Ring Specifications:**
- Width: `3px` (`ring-[3px]`)
- Color: `ring-ring/50` (50% opacity for subtlety)
- Border: `focus-visible:border-ring` (solid border inside ring)
- Offset: Ring appears outside element (no layout shift)

**Component-Specific Focus:**
- Buttons: 3px ring + border color change
- Inputs: 3px ring + border change to `border-ring`
- Checkboxes: 3px ring maintaining border
- Radio buttons: 3px ring on circular element

### Form Validation & Feedback

**Invalid State:**
- Visual: `aria-invalid:border-destructive` (red border)
- Ring: `aria-invalid:ring-destructive/20` (subtle red glow)
- Text: Error message with `text-destructive`
- Icon: Optional error icon in `text-destructive`

**Validation Timing:**
- On blur: Validate after user leaves field
- On submit: Show all errors on submit attempt
- On fix: Remove error as soon as valid input entered

**Error Message Structure:**
- Use `aria-describedby` to link error to input
- Position: Below input field
- Font size: `text-sm` (14px)
- Color: `text-destructive`
- Icon: Circle-x or AlertCircle for visibility

**Success State:**
- Border: `border-green-500` or return to default
- Optional checkmark icon
- Success message: `text-green-600 dark:text-green-400`

### Keyboard Navigation

**Tab Order:**
- Follows visual layout (left-to-right, top-to-bottom)
- Skip links: Optional "Skip to main content" for complex layouts
- Tab traps: Modals trap focus until closed

**Keyboard Shortcuts:**
- `Tab`: Navigate forward
- `Shift+Tab`: Navigate backward
- `Enter`: Activate buttons, submit forms
- `Space`: Toggle checkboxes, radio buttons, switches
- `Escape`: Close modals, dropdowns, menus
- `Arrow keys`: Navigate within menus, tabs, radio groups

**Interactive Elements:**
- All interactive elements are keyboard accessible
- Custom components use proper ARIA roles
- Buttons: `<button>` or `role="button"` with keyboard handlers

### Screen Reader Support

**Semantic HTML:**
- Use native elements: `<button>`, `<input>`, `<nav>`, `<main>`
- Avoid generic `<div>` for interactive elements
- Proper heading hierarchy: `<h1>` → `<h2>` → `<h3>`

**ARIA Labels:**
- `aria-label`: Provide labels for icon-only buttons
- `aria-labelledby`: Link elements to their labels
- `aria-describedby`: Link to help text and error messages
- `aria-hidden="true"`: Hide decorative icons from screen readers

**Status & State:**
- `role="status"`: For loading indicators
- `aria-live="polite"`: For non-critical updates
- `aria-live="assertive"`: For critical alerts
- `aria-expanded`: For collapsible sections (accordions, dropdowns)
- `aria-pressed`: For toggle buttons
- `aria-selected`: For tabs and selectable items

**Form Labels:**
- Always pair `<label>` with `<input>`
- Use `for` attribute or wrap input in label
- Placeholder is NOT a substitute for label
- Help text: Use `aria-describedby` to link

### Motion & Animation

**Reduced Motion:**
- Respect `prefers-reduced-motion: reduce` media query
- Disable transforms: No `translateY`, `rotate`, `scale`
- Disable transitions: Instant state changes
- Keep focus indicators and state changes

**Implementation:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Touch & Pointer Targets

**Minimum Size:**
- Touch targets: 44x44px (iOS HIG)
- Pointer targets: 40x40px minimum
- Spacing: 8px minimum between targets

**Visual vs. Hit Area:**
- Visual size may be smaller (e.g., icon button)
- Hit area extended with padding or pseudo-elements
- Use `after:absolute after:-inset-x-3 after:-inset-y-2` pattern

### Loading & Progress States

**Loading Indicators:**
- Spinner with `role="status"`
- `aria-label="Loading"` for context
- Animation: `animate-spin` (continuous)
- Announce completion: `aria-live="polite"`

**Progress Bars:**
- Use `<progress>` element or `role="progressbar"`
- `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- Visual: Show percentage or status text

**Skeleton Screens:**
- Use `aria-busy="true"` on container
- Animate: `animate-pulse` (subtle)
- Remove `aria-busy` when content loads

### Error Handling

**Error Messages:**
- Clear, concise, actionable language
- Avoid technical jargon
- Provide solution or next steps
- Position: Near the source of error

**Toast Notifications:**
- Use `role="alert"` for errors
- `role="status"` for success/info
- Auto-dismiss: 5-7 seconds (or user control)
- Action button: Optional "Undo" or "Dismiss"

**Form Errors:**
- Show field-level errors immediately after validation
- Summary at top for multiple errors (optional)
- Link summary items to specific fields
- Scroll to first error on submit

---

## 11. Agent Prompt Quick Reference

**For rapid prototyping by AI agents:**

- **Background:** Radial gradient `rgba(129,140,248,0.18)` + `linear-gradient(#f8fafc, #f5f7fb)`
- **Text:** `oklch(0.145 0 0)` (dark) / `oklch(0.985 0 0)` (light on dark)
- **Primary CTA:** `oklch(0.205 0 0)`, white text, `rounded-md`, `h-9`
- **Card:** `24px` radius, `backdrop-blur-xl`, `border: 1px solid oklch(0.922 0 0 / 70%)`
- **Shadow:** `0 24px 60px -30px rgba(15,23,42,0.32)`
- **Hero:** `32px` radius, gradient bg, glass overlay, `p-6 sm:p-8 lg:p-10`
- **Font:** Inter Variable, 16px body, 24px heading 2

---

## 12. Applying This System: From Principles to Practice

### How to Use This Document

This design system is not a rigid rulebook — it's a **decision framework**. When designing:

**1. Start with Principles, Not Components**
- Ask: "What's the user trying to accomplish?"
- Choose patterns that support that goal
- Don't force a component because it exists

**2. Follow the Hierarchy**
- Design Philosophy → Visual rules → Component specs
- If a component doesn't fit the philosophy, question the component, not the philosophy

**3. Consistency Over Perfection**
- Use the spacing scale (4px base) even if 22px "looks better" than 24px
- Consistency reduces cognitive load more than pixel-perfect aesthetics

**4. Break Rules Intentionally**
- If you break a rule (e.g., use 16px radius instead of 24px), document why
- Intentional breaks preserve intent; accidental breaks create inconsistency

### Common Patterns

**Building a Form:**
1. Use FormSection for grouping (24px radius, border, subtle shadow)
2. Inputs have 6px radius (smaller than container)
3. 16px spacing between fields (Token `4`)
4. Labels above inputs, help text below
5. Error messages with destructive color + aria-invalid

**Building a Dashboard:**
1. DashboardShell container (max-w-7xl, responsive padding)
2. SectionHeader for each major section
3. Surface cards for content blocks (24px radius, backdrop-blur)
4. StatCard with accent tone for metrics
5. 24px spacing between sections

**Building a Modal:**
1. Overlay with backdrop-blur-sm (separates from content)
2. Content card with Level 4 shadow (most prominent)
3. zoom-in-95 animation (scales from 95% to 100%)
4. 100ms duration (instant feel)
5. Trap focus inside modal, Escape to close

### Extending the System

When you need something new:

**Adding a Color:**
- Does it fit the semantic structure? (Primary, Semantic, Neutral)
- Does it pass WCAG AA contrast? (4.5:1 for text)
- Does it have a clear role? (Don't add colors for aesthetics)

**Adding a Component:**
- Does it follow the spacing scale?
- Does it use existing color tokens?
- Does it have clear hover/focus/disabled states?
- Is it keyboard accessible?
- Does it work on mobile?

**Changing a Value:**
- Will it break existing designs?
- Does it maintain the visual hierarchy?
- Document the change and notify the team

### Design System Governance

**This is a living document.** As we learn from user feedback and new patterns emerge:

- Update principles when they no longer serve users
- Add components when patterns repeat 3+ times
- Remove components that aren't being used
- Document all changes with rationale

**The goal:** Empower teams to build consistent, accessible, beautiful experiences without reinventing the wheel every time.

---

*Design System Version: 1.0*  
*Last Updated: 2026-07-04*  
*Maintained by: Design & Engineering Teams*
