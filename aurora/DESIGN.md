# Aurora Design System

> **Category:** Creative workspace dashboard  
> **Aesthetic:** Calm, structured, and polished, with neutral surfaces, soft depth, and restrained accent color

## How These Documents Work Together

This document defines the design intent, visual principles, and system-level guidance for the current Aurora preview experience. It answers the question: what should Aurora feel like and why?

- Use [DESIGN.md](./DESIGN.md) for philosophy, tone, hierarchy, and visual rules.
- Use [STYLES.md](./STYLES.md) for the shared semantic CSS foundation that makes those rules implementable.
- Use [COMPONENTS.md](./COMPONENTS.md) for higher-level component APIs and composition patterns built on top of the shared foundation.

In practice, the workflow is: principles first, semantic styles second, components third.

---

## Design Philosophy

### Core Principle: Clarity Through Restraint

Aurora should feel calm, direct, and dependable. The interface should help people focus on the task rather than compete for attention.

### Design Pillars

**1. Progressive Disclosure**
- Start simple, reveal complexity only when needed
- Use depth (shadows, blur, layers) to indicate interactivity and importance
- Clear visual hierarchy guides users through tasks without overwhelming them

**2. Spatial Consistency**
- Layout follows predictable patterns: fixed navigation, centered content, breathing room
- Consistent spacing rhythm (4px base, 8px increments) creates visual harmony
- Soft but restrained corner radius (8px-16px) keeps interactions approachable without feeling overly rounded

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

### Design Intent Summary

- Large surfaces stay neutral and quiet.
- Color is used as punctuation, not as a dominant background treatment.
- Elevation and spacing create hierarchy without visual noise.
- Motion should be subtle, immediate, and respectful of user attention.

### System Discipline

To keep the system durable, the implementation must follow a few governing rules:

- **Single source of truth:** intent belongs in this document, reusable primitives in [STYLES.md](./STYLES.md), and component composition in [COMPONENTS.md](./COMPONENTS.md).
- **Token-first execution is mandatory:** every new color, spacing, radius, shadow, typography, motion, or control-size decision must be introduced in the shared token layer before it appears in a component or preview screen. Raw values are not allowed in implementation work.
- **State completeness is mandatory:** every reusable component must define default, hover, focus, active, disabled, loading, selected, and error states before it is considered system-ready.
- **Accessibility is a release requirement:** contrast, keyboard behavior, focus visibility, reduced motion, and touch targets must be verified before a pattern ships.
- **Visual restraint is a non-negotiable constraint:** gradients, motion, and saturated accents may be used only when they support hierarchy or feedback. They are never allowed to become the visual language of core surfaces, repetitive cards, or long-form content.
- **Workflow patterns must be explicit:** forms, empty states, loading states, error recovery, navigation hierarchy, and content density are treated as shared product patterns, not one-off UI treatments.
- **The preview is part of the contract:** if a preview screen contradicts the documented system rules, the preview is considered out of spec and must be corrected.

### Product Pattern Standards

A mature design system is not defined by visuals alone. It must also provide repeatable product patterns for the moments where users need to make decisions, recover from mistakes, or navigate complex information.

#### 1. Forms and Validation States
- Every form field must have a defined default, hover, focus, filled, disabled, error, success, and loading state.
- Validation must be progressive: inline helper text first, field-level error next, then a summary-level error when necessary.
- Required fields must be visually distinguishable without becoming noisy; optional fields must remain clearly secondary.
- Error messaging must explain what went wrong and how to fix it, rather than relying on color alone.
- Forms must not ship with incomplete states; a field without a defined invalid or disabled state is considered incomplete implementation.

#### 2. Data Lists and Tables
- Data surfaces must support at least three density modes: comfortable for overview tasks, compact for dense workflows, and spacious for review or analysis.
- Row height, spacing, and text scale must change intentionally across those modes rather than being arbitrary.
- Tables and lists must preserve hierarchy through clear headers, consistent alignment, logical grouping, and strong contrast between primary and secondary information.
- Selection, hover, active, disabled, and loading rows must share the same interaction rules as other interface controls.
- Dense data layouts must never sacrifice readability, touch targets, or scanability.

#### 3. Empty, Error, and Loading States
- Empty states must explain what is missing, why it matters, and what the user can do next.
- Error states must be recoverable: include the issue, impact, and a path forward.
- Loading states must preserve context. Skeletons are required for content blocks, while small spinners or progress feedback are required for short actions.
- Feedback must stay brief, specific, and action-oriented; generic messages are not allowed.
- Any screen that can fail, wait, or be empty must use a documented state pattern rather than ad hoc copy.

#### 4. Navigation and Information Architecture
- Multi-level navigation must have a clear hierarchy: primary, secondary, and tertiary levels must feel meaningfully different.
- The system must define how users move between overview and detail, how breadcrumbs and tabs reinforce location, and how navigation adapts on mobile and desktop.
- Deep navigation must avoid redundant layers; each level must have a distinct purpose and not compete with the level above it.
- Navigation patterns must be documented with both content hierarchy and interaction behavior, not just visual styling.
- If a navigation pattern is reused in more than one workflow, it must be promoted to a system primitive.

Implementation rule: if a pattern appears in more than one core workflow, it must be treated as a system primitive rather than a one-off UI treatment.

### Token architecture and execution contract

A durable system needs one explicit path from intent to implementation:

1. **Foundation tokens** define raw values for color, spacing, radius, shadow, typography, and motion.
2. **Semantic tokens** describe roles such as background, surface, border, primary action, muted text, and status colors.
3. **Component tokens** map those semantics to specific patterns like cards, inputs, and focus rings.
4. **State tokens** define hover, focus, active, disabled, selected, and error treatments so interaction behavior stays consistent.

Implementation rule: if a new value appears in UI work, it should first be added to the shared token layer and then reused by components rather than being introduced ad hoc.

Theme rule: dark mode should override color tokens only. Shared tokens for spacing, typography, grid sizing, motion, shadows, and component scale stay in the common layer so light and dark themes remain visually aligned.

### Accessibility & Responsive Standards

- Maintain at least 4.5:1 contrast for text and 3:1 for interactive elements.
- Ensure visible focus states on all interactive controls and keyboard-accessible navigation patterns.
- Respect `prefers-reduced-motion` and avoid animation that competes with content.
- Support touch targets of at least 44px on touch devices.
- Allow layouts to change by context: single column on narrow screens, two-column on tablet, and more spacious multi-column layouts on desktop.

---

## Semantic CSS Foundations

For implementation-ready semantic CSS primitives, see [STYLES.md](./STYLES.md). That document turns these principles into reusable layout and styling patterns.

---

## 1. Visual Theme & Atmosphere

Aurora should feel calm, structured, and polished. The visual language is intentionally restrained: neutral surfaces, subtle depth, and accent color used for feedback rather than decoration.

### What belongs in this document
- Intent, tone, and product principles remain here.
- Shared tokens, spacing, layout primitives, and motion rules live in [STYLES.md](./STYLES.md).
- Reusable component APIs, variants, and composition patterns live in [COMPONENTS.md](./COMPONENTS.md).

### Implementation summary
- Color should stay neutral at the foundation, with accent color reserved for actions, feedback, and data emphasis.
- Typography should prioritize readability through clear hierarchy, generous line-height, and appropriate contrast.
- Layout should use a consistent spacing rhythm, bounded content widths, and responsive behavior.
- Elevation should signal hierarchy through shadow and blur without creating visual noise.
- Every interactive pattern should define default, hover, focus, active, disabled, loading, selected, and error states.

---

## 2. Design Application Workflow

When a new experience is introduced, follow this sequence:

1. Start from the principles in this document.
2. Express reusable tokens, layout primitives, and feedback patterns in [STYLES.md](./STYLES.md).
3. Compose them into reusable components in [COMPONENTS.md](./COMPONENTS.md).
4. Review responsiveness, accessibility, and state completeness before release.

---

## 3. Review Checklist

A pattern is ready to ship when it can answer these questions clearly:

- Does it use shared primitives instead of one-off styling?
- Does it define the necessary states for interaction and feedback?
- Does it remain readable and functional at mobile, tablet, and desktop sizes?
- Does it meet contrast, focus visibility, and reduced-motion expectations?

---

## 4. Cross-Device Decision Framework

Use the same decision order for any new component or screen:

1. User goal
2. Device context
3. Content density
4. Interaction model
5. Visual priority

That framework should guide how spacing, size, and visual emphasis adapt across breakpoints without breaking the system language.

---

## 5. Layout & Spacing

The implementation details for spacing, radius, containers, elevation, and interaction states now live in [STYLES.md](./STYLES.md) and [COMPONENTS.md](./COMPONENTS.md). This document keeps the intent and decision framework high level.

### Shared implementation rules
- Use a 4px spacing rhythm and scaled padding values to maintain calm vertical and horizontal rhythm.
- Keep content widths bounded and predictable so large screens do not feel over-stretched.
- Define surface radius, shadow, blur, and motion once in the shared style layer and reuse them across components.
- Apply the same state logic to buttons, cards, tabs, links, and form controls so behavior feels consistent.

---

## 6. Do's and Don'ts

Use these as guardrails when applying the system:

### ✅ Do
- Keep large surfaces quiet and neutral.
- Use color as punctuation rather than decoration.
- Preserve consistent spacing, border weights, and elevation.
- Document every reusable interaction state before shipping.

### ❌ Don't
- Introduce one-off values that do not map to the shared token layer.
- Let gradients, blur, or motion overpower the content hierarchy.
- Ship components without clear default, hover, focus, disabled, loading, and error states.

---

## 7. Cross-Device Decision Framework

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
