import * as React from "react"

import { cn } from "@aurora/lib/utils"

export interface HeroPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
}

const HeroPanel = React.forwardRef<HTMLDivElement, HeroPanelProps>(
  (
    { className, eyebrow, title, description, actions, children, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-[var(--radius-lg)] border p-6 sm:p-8",
          "bg-gradient-to-br from-primary/5 via-background to-background",
          className
        )}
        {...props}
      >
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-20"
          style={{
            background:
              "linear-gradient(120deg, rgba(255,255,255,0.24) 45%, transparent 55%)",
          }}
        />
        <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3 max-w-2xl">
            {eyebrow && (
              <div className="inline-flex w-fit items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                {eyebrow}
              </div>
            )}
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              {title}
            </h1>
            {description && (
              <p className="text-base text-muted-foreground leading-relaxed">
                {description}
              </p>
            )}
            {actions && (
              <div className="flex flex-wrap items-center gap-3 pt-1">
                {actions}
              </div>
            )}
          </div>
          {children && (
            <div className="flex shrink-0 items-center justify-center">
              {children}
            </div>
          )}
        </div>
      </div>
    )
  }
)
HeroPanel.displayName = "HeroPanel"

export { HeroPanel }
