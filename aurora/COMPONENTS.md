# Component Library Reference

> **Purpose:** Detailed component API documentation and usage guidelines

## How This File Fits the System

This document is the component layer of Aurora. It should not repeat the full philosophy from [DESIGN.md](./DESIGN.md) or re-specify the low-level CSS foundation from [STYLES.md](./STYLES.md); instead, it should describe how higher-level UI building blocks are composed from those shared primitives.

- [DESIGN.md](./DESIGN.md) answers: what should Aurora feel like?
- [STYLES.md](./STYLES.md) answers: what shared CSS primitives should we use?
- This file answers: how should we compose those primitives into reusable components?

> **Implementation Note:** For plain HTML/CSS or preview work, start from the semantic primitives documented in [STYLES.md](./STYLES.md). Component APIs in this file should describe composition intent, not duplicate the style token layer.

### Component-to-styles mapping

When describing a component, prefer this order of thinking:

- Shell and page framing should rely on `.page-shell`, `.section`, and `.stack`.
- Cards and panels should be built from `.surface`, with spacing and rhythm supplied by the shared layout primitives.
- Section headers should use `.section-header`, `.text-label`, and `.text-caption` rather than bespoke title styling.
- Lists and rows should use `.list` and `.stack` patterns, with metadata expressed through muted and strong text helpers.
- Form groups and feedback states should follow the interaction and feedback classes from [STYLES.md](./STYLES.md) so components stay consistent across pages.

### Semantic class usage in examples

Prefer the semantic classes from [STYLES.md](./STYLES.md) in the examples below. New implementation work should favor `.page-shell`, `.section`, `.surface`, `.stack`, `.cluster`, `.text-label`, `.text-caption`, `.badge`, `.alert`, and related helpers over one-off utility strings.

## Component maturity standards

A component is only considered system-ready when it can answer four questions clearly:

- **When should it be used?** Define the scenario, content type, and level of emphasis.
- **What states does it support?** Default, hover, focus, active, disabled, loading, error, and selected states should be documented.
- **How should it behave responsively?** Specify stacking, density, and interaction changes across mobile, tablet, and desktop.
- **How is it made accessible?** Include keyboard support, focus visibility, color contrast, and semantic structure expectations.

### Recommended component checklist

- Use shared primitives from [STYLES.md](./STYLES.md) before introducing bespoke styling.
- Avoid ad-hoc spacing or visual treatment that cannot be traced back to a token or shared pattern.
- Document the component’s do/don’t guidance so teams can apply it consistently.
- Treat accessibility and responsive behavior as part of the component contract, not as a later polish pass.

### Example component contract

A ready-to-ship component should explicitly define:

- **Purpose and usage:** when it should be used, and when a different pattern should be preferred.
- **Variants:** default, subtle, emphasized, and any contextual alternatives.
- **States:** default, hover, focus, active, disabled, loading, selected, and error.
- **Responsive behavior:** stacking, density, and interaction changes across mobile, tablet, and desktop.
- **Accessibility requirements:** keyboard flow, focus visibility, semantics, contrast, and reduced-motion handling.

This contract should be documented alongside each component so that implementation, review, and testing all use the same standard.

### Executable component contract template

Every component should be documented with the same structure so the system remains actionable rather than descriptive:

- **Purpose:** what problem the component solves and when it should be used.
- **Variants:** default, subtle, emphasized, and contextual alternatives.
- **States:** default, hover, focus, active, disabled, loading, selected, and error.
- **Responsive behavior:** how it stacks, compresses, or reflows across mobile, tablet, and desktop.
- **Accessibility requirements:** keyboard support, focus visibility, semantic structure, contrast, and motion expectations.
- **Token usage:** which shared tokens it relies on instead of one-off measurements.

A component is not system-ready until those answers are explicit in the documentation and visible in the implementation.

---

## Table of Contents

1. [Layout Components](#layout-components)
2. [Container Components](#container-components)
3. [Content Components](#content-components)
4. [Form Components](#form-components)
5. [Data Display](#data-display)
6. [Navigation Components](#navigation-components)
7. [Feedback Components](#feedback-components)
8. [Icon System](#icon-system)

> The sections below should stay focused on composition, API shape, and usage guidance. Low-level spacing, color, and structural primitives are defined in [STYLES.md](./STYLES.md).

---

## Layout Components

### DashboardShell

**Purpose:** Root container for all dashboard pages. Provides consistent max-width, padding, and spacing.

#### API

```typescript
interface DashboardShellProps {
  className?: string
  children?: React.ReactNode
  [key: string]: any  // Additional HTML div props
}
```

#### Design Specs

- **Base Frame:** Use the shared `.page-shell` primitive as the outer container.
- **Section Rhythm:** Stack major content areas with `.section` and `.stack` rather than ad-hoc spacing.
- **Content Width:** Keep the page centered and constrained by the same max-width token used in [STYLES.md](./STYLES.md).
- **Layout:** Column-based composition with clear vertical separation between sections.

#### Usage

```tsx
import { DashboardShell } from '@/design-system/components/app-shell'

export default function DashboardPage() {
  return (
    <DashboardShell>
      <PageSection title="Overview">
        {/* Content */}
      </PageSection>
      <PageSection title="Recent Activity">
        {/* Content */}
      </PageSection>
    </DashboardShell>
  )
}
```

#### Design Rationale

- **1280px max-width:** Prevents text lines from exceeding 75-80 characters on ultra-wide screens
- **Responsive padding:** Maintains comfortable margins on all devices without wasting space
- **24px section gap:** Follows 4px spacing rhythm, provides clear visual separation

#### Best Practices

✅ **Do:**
- Use as the outermost container for all dashboard pages
- Nest PageSection or direct content inside
- Combine with other layout utilities if needed

❌ **Don't:**
- Nest DashboardShell inside another DashboardShell
- Override max-width (breaks consistency)
- Use for non-dashboard pages (use page-specific layouts)

---

### PageSection

**Purpose:** Groups related content with a header. Combines SectionHeader and content area.

#### API

```typescript
interface PageSectionProps {
  title: React.ReactNode          // Required: Section title
  description?: React.ReactNode   // Optional: Subtitle/description
  actions?: React.ReactNode       // Optional: Right-aligned buttons/actions
  children?: React.ReactNode      // Section content
  className?: string
  [key: string]: any
}
```

#### Design Specs

- **Layout:** Flexbox column
- **Gap:** `16px` (gap-4) between header and content
- **Content Spacing:** `16px` (space-y-4) between child elements
- **Responsive:** Stacks on mobile, may expand on desktop

#### Usage

```tsx
<PageSection
  title="Recent Releases"
  description="Latest releases from your projects"
  actions={
    <>
      <Button variant="outline" size="sm">Filter</Button>
      <Button size="sm">New Release</Button>
    </>
  }
>
  <Surface>
    {/* Release list */}
  </Surface>
</PageSection>
```

#### When to Use

- Dashboard sections with distinct topics
- Settings page groups
- Any content that needs a title + description + actions

#### Best Practices

✅ **Do:**
- Keep titles concise (3-5 words)
- Use description for context, not lengthy explanations
- Place primary action last in actions slot

❌ **Don't:**
- Use for single-item sections (just use SectionHeader)
- Nest PageSection inside PageSection (use nested content instead)

---

## Container Components

### Surface

**Purpose:** The foundational card component. All card-based UI builds on Surface.

#### API

```typescript
interface SurfaceProps {
  tone?: 'default' | 'muted' | 'accent'  // Visual variant
  children?: React.ReactNode
  className?: string
  [key: string]: any  // Additional HTML div props
}
```

#### Variants

**Default (`tone="default"`)**
- **Use Case:** Primary content cards, main information
- **Border:** `border-border/70` (70% opacity)
- **Background:** `bg-card/90` (90% opacity) + backdrop-blur-xl
- **Shadow:** `0 24px 60px -30px rgba(15,23,42,0.32)` (Level 2)
- **Visual Weight:** Medium - primary content

**Muted (`tone="muted"`)**
- **Use Case:** Secondary content, supporting information, less important cards
- **Border:** `border-border/60` (60% opacity, lighter)
- **Background:** `bg-slate-50/70` light, `bg-slate-900/40` dark
- **Shadow:** None (relies on border for separation)
- **Visual Weight:** Low - supporting content

**Accent (`tone="accent"`)**
- **Use Case:** Call-to-action cards, featured content, promotional sections
- **Border:** `border-primary/20` (primary color, 20% opacity)
- **Background:** Gradient from `primary/10` to `background`
- **Shadow:** `0 24px 60px -32px rgba(79,70,229,0.28)` (purple tint)
- **Visual Weight:** High - demands attention

#### Design Specs

- **Base Primitive:** Start from `.surface` rather than inventing a new card shell.
- **Radius:** Use the shared surface radius token for a soft, friendly container.
- **Border and Shadow:** Keep border and shadow treatment aligned with the surface rules from [STYLES.md](./STYLES.md).
- **Padding:** Add spacing through shared layout helpers rather than hard-coding component-specific padding whenever possible.

#### Usage

```tsx
// Default card
<Surface className="surface stack space-4">
  <h3 className="text-label">Title</h3>
  <p className="text-caption">Content</p>
</Surface>

// Muted supporting card
<Surface tone="muted" className="surface-muted stack space-3">
  <p className="text-body">Secondary information</p>
</Surface>

// Accent featured card
<Surface tone="accent" className="surface-accent stack space-5">
  <h3 className="text-label">Featured!</h3>
  <p className="text-body">Special promotion content</p>
</Surface>
```

#### Design Rationale

- **24px radius:** Creates soft, modern appearance; large enough to be distinctive
- **Backdrop blur:** Adds depth and hierarchy; indicates "layered" content
- **Three tones:** Provides semantic visual hierarchy without needing custom styling
- **90% opacity:** Allows subtle background texture through, adds richness

#### Composition Patterns

**Information Cards:**
```tsx
<Surface className="surface stack space-4">
  <div className="cluster">
    <h3 className="text-label">Title</h3>
    <Badge className="badge">Status</Badge>
  </div>
  <p className="text-caption">Description</p>
  <div className="cluster">
    <Button variant="secondary" size="sm">Action</Button>
  </div>
</Surface>
```

**List Container:**
```tsx
<Surface className="surface stack space-2">
  <ListRow title="Item 1" />
  <ListRow title="Item 2" />
  <ListRow title="Item 3" />
</Surface>
```

#### Responsive Behavior

- **Padding:** Use responsive utilities `p-4 sm:p-5 lg:p-6`
- **Stacking:** On mobile, cards stack vertically with `space-y-4`
- **Shadow:** Consider reducing shadow blur on mobile for performance (automatically handled)

#### Accessibility

- **Semantic HTML:** Use `<article>` or `<section>` instead of `<div>` if content is standalone
- **Focus:** If interactive, ensure keyboard focus styles are visible
- **Contrast:** All three tones meet WCAG AA contrast ratios

#### Best Practices

✅ **Do:**
- Use `default` for 80% of cards
- Use `muted` for sidebars, metadata, supporting info
- Use `accent` sparingly (1-2 per page) for CTAs
- Add padding via className: `p-5` is standard

❌ **Don't:**
- Nest Surface inside Surface (creates visual noise)
- Use multiple `accent` cards on same screen
- Override border-radius (breaks consistency)
- Skip backdrop-blur (it's core to the design)

---

### HeroPanel

**Purpose:** High-impact header section for landing pages and feature highlights. Creates immediate visual interest with gradients and large typography.

#### API

```typescript
interface HeroPanelProps {
  eyebrow?: React.ReactNode       // Small label above title
  title: React.ReactNode          // Required: Main heading
  description?: React.ReactNode   // Subtitle/supporting text
  actions?: React.ReactNode       // CTA buttons
  children?: React.ReactNode      // Optional: Right-aligned content (image, illustration)
  className?: string
  [key: string]: any
}
```

#### Design Specs

- **Border Radius:** `32px` (rounded-[32px]) - extra large for prominence
- **Padding:** `24px` mobile (p-6), `32px` tablet (sm:p-8), `40px` desktop (lg:p-10)
- **Shadow:** Level 3 - `0 35px 100px -42px rgba(15,23,42,0.42)`
- **Background:** Radial gradient (indigo 24% opacity) + linear gradient + glass shine overlay
- **Title Size:** `30px` mobile (text-3xl), `36px` tablet+ (sm:text-4xl)
- **Layout:** Column on mobile, row on desktop (lg:flex-row)

#### Visual Layers

1. **Base Gradient:** Radial + linear gradient background
2. **Shine Overlay:** 120deg linear gradient (white 24% opacity at 45%)
3. **Content Layer:** z-10, above decorative elements

#### Usage

```tsx
<HeroPanel
  eyebrow="New Feature"
  title="Welcome to Release Manager"
  description="Streamline your release workflow with powerful automation and insights."
  actions={
    <>
      <Button size="lg">Get Started</Button>
      <Button variant="outline" size="lg">Learn More</Button>
    </>
  }
>
  {/* Optional: Illustration or screenshot */}
  <img src="/hero-illustration.png" alt="Product preview" className="lg:max-w-md" />
</HeroPanel>
```

#### Design Rationale

- **32px radius:** Larger than cards (24px) to signal importance
- **Radial gradient:** Draws eye to content, adds depth
- **Shine overlay:** Creates premium, polished look
- **Flexible layout:** Accommodates text-only or text + visual content

#### Eyebrow Component

```tsx
// Rendered as:
<div className="inline-flex w-fit items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
  {eyebrow}
</div>
```

**Use Cases:**
- "New" / "Beta" / "Coming Soon"
- Category labels
- Status indicators

#### Best Practices

✅ **Do:**
- Use once per page (maximum twice)
- Keep title under 60 characters
- Limit description to 1-2 sentences
- Use 1-2 actions maximum

❌ **Don't:**
- Use for secondary sections (use SectionHeader)
- Overload with content (keep focused)
- Stack multiple HeroPanels vertically

---

### FormSection

**Purpose:** Groups related form fields with a header. Provides visual container and semantic structure for forms.

#### API

```typescript
interface FormSectionProps {
  title: React.ReactNode          // Required: Section title
  description?: React.ReactNode   // Optional: Instructions/help text
  actions?: React.ReactNode       // Optional: Section-level actions
  children?: React.ReactNode      // Form fields
  className?: string
  [key: string]: any
}
```

#### Design Specs

- **Border Radius:** `24px` (rounded-[24px])
- **Padding:** `20px` (p-5)
- **Border:** `1px solid border-border/70`
- **Background:** `bg-background/70` + backdrop blur
- **Shadow:** Light - `0 20px 60px -36px rgba(15,23,42,0.24)`
- **Field Spacing:** `16px` (space-y-4) between children

#### Usage

```tsx
<FormSection
  title="Profile Information"
  description="Update your personal details and contact information."
>
  <div className="space-y-1.5">
    <Label htmlFor="name">Full Name</Label>
    <Input id="name" defaultValue="John Doe" />
  </div>
  
  <div className="space-y-1.5">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" defaultValue="john@example.com" />
  </div>
  
  <div className="flex justify-end gap-3">
    <Button variant="outline">Cancel</Button>
    <Button>Save Changes</Button>
  </div>
</FormSection>
```

#### Multi-Section Forms

```tsx
<form className="space-y-6">
  <FormSection title="Account Settings">
    {/* Fields */}
  </FormSection>
  
  <FormSection title="Privacy Settings">
    {/* Fields */}
  </FormSection>
  
  <FormSection title="Notification Preferences">
    {/* Fields */}
  </FormSection>
</form>
```

#### Best Practices

✅ **Do:**
- Group 3-6 related fields per section
- Use description for instructions, not field labels
- Place section-level actions in `actions` slot
- Use `space-y-4` for field spacing

❌ **Don't:**
- Put single field in FormSection (unnecessary wrapper)
- Use for non-form content
- Nest FormSection inside FormSection

---

## Content Components

### SectionHeader

**Purpose:** Standalone section header with title, description, and action buttons. Does not include content area (use PageSection for that).

#### API

```typescript
interface SectionHeaderProps {
  title: React.ReactNode          // Required: Section title
  description?: React.ReactNode   // Optional: Subtitle
  actions?: React.ReactNode       // Optional: Right-aligned buttons
  className?: string
  [key: string]: any
}
```

#### Design Specs

- **Base Primitive:** Use `.section-header` as the structural foundation.
- **Text Hierarchy:** Pair the title with `.text-label` and supporting copy with `.text-caption`.
- **Surface Treatment:** Keep the header visually light by relying on neutral background and border rules from the shared styles.
- **Layout:** Allow the header to become a row on larger screens while staying compact on mobile.

#### Usage

```tsx
<SectionHeader
  title="Team Members"
  description="Manage who has access to this project"
  actions={
    <>
      <Button variant="outline" size="sm">
        <FilterIcon className="size-4" />
        Filter
      </Button>
      <Button size="sm">
        <PlusIcon className="size-4" />
        Add Member
      </Button>
    </>
  }
/>
```

#### When to Use

- Before lists, tables, or grids that need context
- Page subsections that aren't full PageSection components
- Anywhere you need title + actions without wrapper

#### Best Practices

✅ **Do:**
- Keep titles short and descriptive
- Use sentence case (not Title Case)
- Align actions to the right
- Use icon + text for clarity

❌ **Don't:**
- Use without subsequent content
- Make description longer than title
- Put more than 3 actions

---

### StatCard

**Purpose:** Display key metrics and statistics prominently. Optimized for dashboards.

#### API

```typescript
interface StatCardProps {
  title: React.ReactNode           // Metric name
  value: React.ReactNode           // The statistic (number, text)
  description?: React.ReactNode    // Trend, change, or context
  action?: React.ReactNode         // Optional icon/button
  tone?: 'default' | 'muted' | 'accent'
  className?: string
  [key: string]: any
}
```

#### Design Specs

- **Container:** Uses `<Surface>` component with chosen tone
- **Padding:** `20px` (p-5)
- **Layout:** Vertical flex with `16px` gap (gap-4)
- **Title:** `14px` font-medium text-muted-foreground
- **Value:** `30px` (text-3xl) font-semibold tracking-tight
- **Description:** `14px` text-muted-foreground leading-6

#### Variants

```tsx
// Default - neutral metric
<StatCard
  title="Total Releases"
  value="127"
  description="12 this month"
/>

// Accent - positive/important metric
<StatCard
  tone="accent"
  title="Active Projects"
  value="8"
  description="+2 from last month"
/>

// With action icon
<StatCard
  title="Pending Approvals"
  value="3"
  description="Requires attention"
  action={<AlertCircleIcon className="size-5 text-destructive" />}
/>
```

#### Dashboard Grid

```tsx
<div className="card-grid">
  <StatCard title="Total Users" value="1,234" tone="accent" />
  <StatCard title="Active Sessions" value="89" />
  <StatCard title="Conversion Rate" value="12.4%" />
  <StatCard title="Revenue" value="$45.2K" tone="accent" />
</div>
```

#### Typography Formatting

**Large Numbers:**
```tsx
<StatCard title="Downloads" value={
  <span className="tabular-nums">1,234,567</span>
} />
```

**Percentages:**
```tsx
<StatCard title="Success Rate" value={
  <>98.5<span className="text-xl">%</span></>
} />
```

**Trend Indicators:**
```tsx
<StatCard
  title="Revenue"
  value="$45.2K"
  description={
    <span className="flex items-center gap-1 text-green-600">
      <TrendingUpIcon className="size-4" />
      +12.5% vs last month
    </span>
  }
/>
```

#### Best Practices

✅ **Do:**
- Use tabular-nums for aligned numbers
- Keep title short (1-3 words)
- Use description for trends/comparisons
- Group related stats in grids

❌ **Don't:**
- Put paragraphs in description (keep to 1 line)
- Use more than 8 stat cards on one page
- Mix formatting styles (be consistent)

---

### ListRow

**Purpose:** Uniform list item component for tables, lists, and repeating content. Ensures consistent spacing and layout.

#### API

```typescript
interface ListRowProps {
  title: React.ReactNode          // Primary text
  description?: React.ReactNode   // Secondary text
  meta?: React.ReactNode          // Right-aligned metadata (date, status)
  action?: React.ReactNode        // Right-aligned action button/icon
  className?: string
  [key: string]: any
}
```

#### Design Specs

- **Border Radius:** `18px` (rounded-[18px]) - smaller than cards for compactness
- **Padding:** `12px` (p-3)
- **Border:** `1px solid border-border/70`
- **Background:** `bg-background/70`
- **Layout:** Column on mobile, row on tablet+ (sm:flex-row)
- **Gap:** `12px` (gap-3)
- **Title:** `14px` font-semibold, truncates if long
- **Description:** `14px` text-muted-foreground, wraps

#### Usage

```tsx
// Basic list
<div className="space-y-2">
  <ListRow title="Item One" description="Details about item one" />
  <ListRow title="Item Two" description="Details about item two" />
  <ListRow title="Item Three" description="Details about item three" />
</div>

// With metadata and actions
<ListRow
  title="Release v2.1.0"
  description="Major feature update with bug fixes"
  meta={<span className="text-xs">2 days ago</span>}
  action={
    <Button variant="ghost" size="sm">
      <ChevronRightIcon className="size-4" />
    </Button>
  }
/>
```

#### Interactive Lists

```tsx
<div className="stack space-2">
  {releases.map((release) => (
    <ListRow
      key={release.id}
      title={release.name}
      description={release.description}
      meta={<Badge className="badge">{release.status}</Badge>}
      action={
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVerticalIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      }
      className="surface-ghost is-active"
      onClick={() => navigate(`/releases/${release.id}`)}
    />
  ))}
</div>
```

#### Best Practices

✅ **Do:**
- Use consistent spacing between rows (space-y-2)
- Truncate long titles with `truncate` class
- Keep actions compact (icon buttons)
- Use for homogeneous lists (same structure)

❌ **Don't:**
- Mix ListRow with other list styles in same list
- Put complex layouts inside ListRow (keep simple)
- Use for single items (just use regular div)

---

### EmptyState

**Purpose:** Communicate absence of content with clear guidance. Reduces user confusion and provides action path.

#### API

```typescript
interface EmptyStateProps {
  icon?: React.ReactNode          // Optional: Illustrative icon
  title: React.ReactNode          // What's missing/empty
  description?: React.ReactNode   // Why empty + what to do
  action?: React.ReactNode        // Primary CTA button
  className?: string
  [key: string]: any
}
```

#### Design Specs

- **Border Radius:** `24px` (rounded-[24px])
- **Padding:** `24px` (p-6)
- **Border:** `1px dashed border-border/70` (dashed = temporary state)
- **Background:** `bg-background/60`
- **Layout:** Column, items aligned start (left)
- **Icon Container:** `rounded-2xl` border p-3, text-muted-foreground
- **Title:** `18px` (text-lg) font-semibold
- **Description:** `14px` (text-sm) leading-6

#### Usage

```tsx
// Simple empty state
<EmptyState
  title="No releases yet"
  description="Create your first release to get started."
  action={<Button>Create Release</Button>}
/>

// With icon
<EmptyState
  icon={<PackageIcon className="size-6" />}
  title="No packages found"
  description="Upload a package or connect your repository to see packages here."
  action={
    <>
      <Button>Upload Package</Button>
      <Button variant="outline">Connect Repository</Button>
    </>
  }
/>

// List/table placeholder
<Surface className="p-5">
  <EmptyState
    icon={<SearchIcon className="size-6" />}
    title="No results found"
    description="Try adjusting your filters or search terms."
  />
</Surface>
```

#### Icon Recommendations

- **No data:** `InboxIcon`, `FileQuestionIcon`
- **No search results:** `SearchXIcon`, `FilterXIcon`
- **No items created:** `PlusCircleIcon`, `PackageIcon`
- **Error state:** `AlertTriangleIcon`, `AlertCircleIcon`
- **Permission denied:** `LockIcon`, `ShieldAlertIcon`

#### Best Practices

✅ **Do:**
- Explain WHY empty (new user? filtered out? error?)
- Provide clear action if user can fix it
- Use friendly, encouraging language
- Include icon for visual interest

❌ **Don't:**
- Use error red unless actual error
- Make description longer than 2 sentences
- Leave without action if user can resolve

---

## Form Components

### Input Fields

**Base Input Component** (from shadcn/ui)

#### Sizes

```tsx
// Default (height: 36px)
<Input placeholder="Email" />

// Large (height: 44px) - mobile-optimized
<Input placeholder="Email" className="h-11" />

// Small (height: 32px) - compact forms
<Input placeholder="Search" className="h-8 text-sm" />
```

#### Variants

**Default:**
```tsx
<Input type="text" placeholder="Username" />
```

**With Icon:**
```tsx
<div className="relative">
  <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
  <Input placeholder="Search" className="pl-9" />
</div>
```

**With Clear Button:**
```tsx
<div className="relative">
  <Input value={value} onChange={(e) => setValue(e.target.value)} />
  {value && (
    <button
      type="button"
      onClick={() => setValue('')}
      className="absolute right-3 top-1/2 -translate-y-1/2"
    >
      <XIcon className="size-4 text-muted-foreground hover:text-foreground" />
    </button>
  )}
</div>
```

#### States

**Error State:**
```tsx
<div className="space-y-1.5">
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    aria-invalid="true"
    aria-describedby="email-error"
    className="border-destructive focus-visible:ring-destructive/20"
  />
  <p id="email-error" className="text-sm text-destructive">
    Please enter a valid email address
  </p>
</div>
```

**Disabled State:**
```tsx
<Input disabled placeholder="Cannot edit" />
```

**Read-Only:**
```tsx
<Input readOnly value="Fixed value" className="bg-muted" />
```

---

### Select Dropdowns

#### Native Select (Mobile)

```tsx
<select className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
</select>
```

#### Custom Select (Desktop) - Using Radix UI

```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

<Select defaultValue="option1">
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </SelectContent>
</Select>
```

#### When to Use Which

- **Native `<select>`:** Mobile devices, simple lists (< 10 items), accessibility priority
- **Custom Select:** Desktop, searchable lists, grouped options, rich content

---

### Checkbox & Radio

#### Checkbox

```tsx
<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <label
    htmlFor="terms"
    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
  >
    Accept terms and conditions
  </label>
</div>
```

#### Radio Group

```tsx
<RadioGroup defaultValue="option1">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option1" id="option1" />
    <Label htmlFor="option1">Option 1</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option2" id="option2" />
    <Label htmlFor="option2">Option 2</Label>
  </div>
</RadioGroup>
```

---

### Switch Toggle

```tsx
<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>
```

---

### Textarea

```tsx
<Textarea
  placeholder="Enter your message"
  className="min-h-[120px] resize-none"
/>
```

---

### Form Layout Patterns

#### Single Column (Default)

```tsx
<form className="section stack space-4">
  <div className="stack space-2">
    <Label htmlFor="name" className="text-label">Name</Label>
    <Input id="name" />
  </div>
  
  <div className="stack space-2">
    <Label htmlFor="email" className="text-label">Email</Label>
    <Input id="email" type="email" />
  </div>
  
  <div className="cluster">
    <Button variant="secondary">Cancel</Button>
    <Button type="submit" className="button primary">Submit</Button>
  </div>
</form>
```

#### Two Column (Desktop)

```tsx
<form className="space-y-6">
  <div className="grid gap-4 sm:grid-cols-2">
    <div className="space-y-1.5">
      <Label htmlFor="first-name">First Name</Label>
      <Input id="first-name" />
    </div>
    <div className="space-y-1.5">
      <Label htmlFor="last-name">Last Name</Label>
      <Input id="last-name" />
    </div>
  </div>
  
  <div className="space-y-1.5">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" />
  </div>
</form>
```

#### Inline Label + Input

```tsx
<div className="flex items-center gap-4">
  <Label htmlFor="inline-input" className="w-24 shrink-0">Label</Label>
  <Input id="inline-input" />
</div>
```

---

## Data Display

### Tables

#### Basic Table Structure

```tsx
<div className="surface border-surface">
  <table className="table">
    <thead className="border-b bg-muted/50">
      <tr>
        <th className="h-12 px-4 text-left align-middle font-semibold text-sm">Name</th>
        <th className="h-12 px-4 text-left align-middle font-semibold text-sm">Status</th>
        <th className="h-12 px-4 text-left align-middle font-semibold text-sm">Date</th>
        <th className="h-12 px-4 text-right align-middle font-semibold text-sm">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b transition-colors hover:bg-muted/50">
        <td className="p-4 align-middle">Release v1.0</td>
        <td className="p-4 align-middle">
          <Badge>Published</Badge>
        </td>
        <td className="p-4 align-middle text-sm text-muted-foreground">2 days ago</td>
        <td className="p-4 align-middle text-right">
          <Button variant="ghost" size="sm">Edit</Button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

#### Table Density Variants

**Default (height: 48px)**
```tsx
<tr className="border-b hover:bg-muted/50">
  <td className="p-4">Content</td>
</tr>
```

**Compact (height: 40px)**
```tsx
<tr className="border-b hover:bg-muted/50">
  <td className="px-4 py-2 text-sm">Content</td>
</tr>
```

**Comfortable (height: 56px)**
```tsx
<tr className="border-b hover:bg-muted/50">
  <td className="px-4 py-4">Content</td>
</tr>
```

#### Striped Rows

```tsx
<tbody>
  {items.map((item, index) => (
    <tr key={item.id} className={cn(
      "border-b transition-colors hover:bg-muted/50",
      index % 2 === 0 && "bg-muted/30"
    )}>
      <td className="p-4">{item.name}</td>
    </tr>
  ))}
</tbody>
```

#### Responsive Table (Mobile)

```tsx
// Desktop: Full table
// Mobile: Card layout
<div className="space-y-4 md:space-y-0">
  {/* Mobile view */}
  <div className="md:hidden space-y-3">
    {items.map((item) => (
      <Surface key={item.id} className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div className="font-semibold">{item.name}</div>
            <Badge>{item.status}</Badge>
          </div>
          <div className="text-sm text-muted-foreground">{item.description}</div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm">Edit</Button>
            <Button variant="ghost" size="sm">Delete</Button>
          </div>
        </div>
      </Surface>
    ))}
  </div>
  
  {/* Desktop view */}
  <div className="hidden md:block">
    <table className="w-full">
      {/* ... */}
    </table>
  </div>
</div>
```

---

### Badges

#### Variants

```tsx
// Default
<Badge>Default</Badge>

// Secondary
<Badge variant="secondary">Secondary</Badge>

// Outline
<Badge variant="outline">Outline</Badge>

// Destructive
<Badge variant="destructive">Error</Badge>
```

#### Custom Status Badges

```tsx
// Success
<Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400">
  Published
</Badge>

// Warning
<Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400">
  Draft
</Badge>

// Info
<Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400">
  Pending
</Badge>
```

#### Badge Sizes

```tsx
// Small (default)
<Badge className="px-2 py-0.5 text-xs">Small</Badge>

// Medium
<Badge className="px-2.5 py-1 text-sm">Medium</Badge>

// With icon
<Badge>
  <CheckCircleIcon className="mr-1 size-3" />
  Verified
</Badge>
```

---

## Navigation Components

### Breadcrumbs

```tsx
<nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm">
  <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
    Home
  </Link>
  <ChevronRightIcon className="size-4 text-muted-foreground/40" />
  <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
    Projects
  </Link>
  <ChevronRightIcon className="size-4 text-muted-foreground/40" />
  <span className="font-semibold text-foreground">Current Page</span>
</nav>
```

#### Mobile Breadcrumbs (Truncated)

```tsx
<nav className="flex items-center space-x-2 text-sm">
  <Link href="/" className="text-muted-foreground">
    <HomeIcon className="size-4" />
  </Link>
  <ChevronRightIcon className="size-4 text-muted-foreground/40" />
  <span className="text-muted-foreground">...</span>
  <ChevronRightIcon className="size-4 text-muted-foreground/40" />
  <span className="font-semibold text-foreground">Current</span>
</nav>
```

---

### Tabs

#### Underline Style

```tsx
<Tabs defaultValue="overview">
  <TabsList className="h-10 rounded-none border-b bg-transparent p-0">
    <TabsTrigger
      value="overview"
      className="relative h-10 rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
    >
      Overview
    </TabsTrigger>
    <TabsTrigger value="activity">Activity</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  
  <TabsContent value="overview" className="mt-6">
    {/* Content */}
  </TabsContent>
</Tabs>
```

#### Pill Style

```tsx
<Tabs defaultValue="overview">
  <TabsList className="gap-2">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="activity">Activity</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  
  <TabsContent value="overview">
    {/* Content */}
  </TabsContent>
</Tabs>
```

---

### Pagination

```tsx
<nav className="flex items-center justify-center gap-2" aria-label="Pagination">
  <Button variant="outline" size="sm" disabled>
    <ChevronLeftIcon className="size-4" />
    Previous
  </Button>
  
  <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
    1
  </Button>
  <Button variant="ghost" size="sm">2</Button>
  <Button variant="ghost" size="sm">3</Button>
  <span className="px-2 text-muted-foreground">...</span>
  <Button variant="ghost" size="sm">10</Button>
  
  <Button variant="outline" size="sm">
    Next
    <ChevronRightIcon className="size-4" />
  </Button>
</nav>
```

#### Mobile Pagination (Simplified)

```tsx
<nav className="flex items-center justify-between" aria-label="Pagination">
  <Button variant="outline" size="sm">
    <ChevronLeftIcon className="size-4" />
    Previous
  </Button>
  
  <span className="text-sm text-muted-foreground">
    Page 1 of 10
  </span>
  
  <Button variant="outline" size="sm">
    Next
    <ChevronRightIcon className="size-4" />
  </Button>
</nav>
```

---

## Feedback Components

### Toast Notifications

```tsx
// Using sonner or shadcn/ui toast
import { toast } from 'sonner'

// Success
toast.success('Release published successfully')

// Error
toast.error('Failed to publish release', {
  description: 'Please check your network connection and try again.'
})

// Info
toast('New update available', {
  description: 'Version 2.1.0 is ready to download.'
})

// With action
toast('Release pending approval', {
  action: {
    label: 'Review',
    onClick: () => navigate('/approvals')
  }
})
```

#### Toast Configuration

```tsx
<Toaster
  position="bottom-right"
  toastOptions={{
    duration: 3000,
    className: 'rounded-lg border shadow-lg',
  }}
/>
```

---

### Inline Alerts

#### Info Alert

```tsx
<Alert>
  <InfoIcon className="size-4" />
  <AlertTitle>Information</AlertTitle>
  <AlertDescription>
    This action cannot be undone. Please review carefully.
  </AlertDescription>
</Alert>
```

#### Success Alert

```tsx
<Alert className="border-green-200 bg-green-50 text-green-900 dark:border-green-900/30 dark:bg-green-900/10 dark:text-green-400">
  <CheckCircleIcon className="size-4" />
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>
    Your changes have been saved successfully.
  </AlertDescription>
</Alert>
```

#### Warning Alert

```tsx
<Alert variant="destructive" className="border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900/30 dark:bg-amber-900/10">
  <AlertTriangleIcon className="size-4" />
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>
    This release has pending security vulnerabilities.
  </AlertDescription>
</Alert>
```

#### Error Alert

```tsx
<Alert variant="destructive">
  <AlertCircleIcon className="size-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Failed to connect to server. Please try again later.
  </AlertDescription>
</Alert>
```

#### Alert with Action

```tsx
<Alert>
  <InfoIcon className="size-4" />
  <AlertTitle>Update Available</AlertTitle>
  <AlertDescription>
    A new version of the app is available.
  </AlertDescription>
  <div className="mt-3">
    <Button size="sm" variant="outline">Update Now</Button>
  </div>
</Alert>
```

---

### Loading States

#### Spinner

```tsx
<div className="flex items-center justify-center p-8">
  <Loader2Icon className="size-8 animate-spin text-muted-foreground" />
</div>
```

#### Skeleton Screens

```tsx
// Card skeleton
<div className="rounded-[24px] border p-5 space-y-3">
  <Skeleton className="h-4 w-[250px]" />
  <Skeleton className="h-4 w-[200px]" />
  <Skeleton className="h-10 w-[100px]" />
</div>

// List skeleton
<div className="space-y-2">
  {[...Array(5)].map((_, i) => (
    <div key={i} className="rounded-[18px] border p-3">
      <Skeleton className="h-4 w-full" />
    </div>
  ))}
</div>
```

#### Progress Bar

```tsx
<Progress value={60} className="w-full" />
```

---

## Icon System

### Icon Library

**Primary:** [Lucide React](https://lucide.dev/) (`lucide-react`)

```bash
pnpm add lucide-react
```

**Why Lucide:**
- 24×24 base grid, consistent sizing
- Stroke-width: 2 (matches our visual weight)
- 1000+ icons, actively maintained
- Tree-shakeable, only import what you use
- MIT license

---

### Icon Sizes

```tsx
import { HomeIcon } from 'lucide-react'

// Micro: 12px (text-xs inline)
<HomeIcon className="size-3" />

// Small: 16px (buttons, inline text)
<HomeIcon className="size-4" />

// Medium: 20px (default UI icons)
<HomeIcon className="size-5" />

// Large: 24px (prominent actions)
<HomeIcon className="size-6" />

// XL: 32px (hero sections, empty states)
<HomeIcon className="size-8" />
```

---

### Icon Colors

#### Inherit Parent

```tsx
// Inherits text color from parent
<HomeIcon className="size-5" />
```

#### Muted Icons

```tsx
<HomeIcon className="size-5 text-muted-foreground" />
```

#### Interactive Icons

```tsx
<button className="text-muted-foreground hover:text-foreground transition-colors">
  <SettingsIcon className="size-5" />
</button>
```

#### Status Icons

```tsx
// Success
<CheckCircleIcon className="size-5 text-green-600" />

// Warning
<AlertTriangleIcon className="size-5 text-amber-600" />

// Error
<AlertCircleIcon className="size-5 text-destructive" />

// Info
<InfoIcon className="size-5 text-blue-600" />
```

---

### Icon Button Patterns

#### Icon Only

```tsx
<Button variant="ghost" size="icon">
  <SettingsIcon className="size-5" />
  <span className="sr-only">Settings</span>
</Button>
```

#### Icon + Text

```tsx
<Button>
  <PlusIcon className="mr-2 size-4" />
  Add Item
</Button>
```

#### Icon Right

```tsx
<Button>
  Continue
  <ChevronRightIcon className="ml-2 size-4" />
</Button>
```

---

### Icon Alignment with Text

#### Inline with Text

```tsx
<p className="flex items-center gap-2 text-sm">
  <CheckCircleIcon className="size-4 text-green-600" />
  <span>Verified account</span>
</p>
```

#### Optical Alignment (Fine-tuning)

```tsx
// For perfect vertical centering with text
<span className="inline-flex items-center gap-1">
  <StarIcon className="size-4 -mb-0.5" />
  Featured
</span>
```

---

### Common Icon Usage

#### Navigation

```tsx
<nav className="space-y-1">
  <a href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted">
    <HomeIcon className="size-5" />
    <span>Dashboard</span>
  </a>
  <a href="/projects" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted">
    <FolderIcon className="size-5" />
    <span>Projects</span>
  </a>
</nav>
```

#### Input with Icon

```tsx
<div className="relative">
  <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
  <Input placeholder="Search" className="pl-9" />
</div>
```

#### Dropdown Menu

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon">
      <MoreVerticalIcon className="size-5" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>
      <EditIcon className="mr-2 size-4" />
      Edit
    </DropdownMenuItem>
    <DropdownMenuItem>
      <TrashIcon className="mr-2 size-4" />
      Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

## Best Practices Summary

### Component Selection Guide

**When building a page:**

1. **Start with DashboardShell** (for dashboard pages)
2. **Use PageSection** for major sections with headers
3. **Choose Surface tone** based on content importance:
   - Default: Primary content
   - Muted: Supporting information
   - Accent: Featured/CTA content
4. **Use StatCard** for metrics on dashboards
5. **Use ListRow** for homogeneous lists
6. **Use EmptyState** when content is missing
7. **Use FormSection** for grouped form fields

### Composition Hierarchy

```
DashboardShell
  └─ PageSection
       └─ Surface (default tone)
            └─ ListRow (multiple)
  └─ PageSection
       └─ Grid
            └─ StatCard (accent tone)
            └─ StatCard (default tone)
  └─ EmptyState (when needed)
```

### Accessibility Checklist

- [ ] Use semantic HTML (`<nav>`, `<main>`, `<article>`)
- [ ] Label all form fields with `<Label htmlFor="...">`
- [ ] Provide `aria-label` for icon-only buttons
- [ ] Use `aria-invalid` and `aria-describedby` for form errors
- [ ] Ensure 4.5:1 contrast ratio for text
- [ ] Test keyboard navigation (Tab, Enter, Escape)
- [ ] Add focus-visible styles (never remove focus indicators)
- [ ] Provide text alternatives for icons (`<span className="sr-only">`)

---

*Component Library Version: 1.0*  
*Last Updated: 2026-07-04*  
*Companion to: [DESIGN.md](./DESIGN.md)*
