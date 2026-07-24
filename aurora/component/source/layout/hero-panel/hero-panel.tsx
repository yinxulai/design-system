import * as React from "react"

import { cn } from "@aurora/lib/utils"

export interface HeroPanelProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
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
          "rounded-[var(--radius-lg)] border border-primary/15 bg-primary/5 p-6 sm:p-8",
          className
        )}
        {...props}
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3 max-w-2xl">
            {eyebrow && (
              <div className="inline-flex w-fit items-center rounded-md border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
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
