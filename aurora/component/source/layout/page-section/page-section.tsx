import * as React from "react"

import { cn } from "@aurora/lib/utils"

export interface PageSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
}

const PageSection = React.forwardRef<HTMLDivElement, PageSectionProps>(
  ({ className, title, description, actions, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn("space-y-4", className)}
        {...props}
      >
        {(title || description || actions) && (
          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              {title && (
                <h2 className="text-lg font-semibold tracking-tight">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
              )}
            </div>
            {actions && (
              <div className="flex items-center gap-2 shrink-0">
                {actions}
              </div>
            )}
          </div>
        )}
        {children}
      </section>
    )
  }
)
PageSection.displayName = "PageSection"

export { PageSection }
