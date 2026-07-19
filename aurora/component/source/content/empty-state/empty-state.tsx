import * as React from "react"

import { cn } from "@aurora/lib/utils"

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon, title, description, action, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-start gap-3 rounded-[var(--radius-lg)] border border-dashed border-border/70 bg-background/60 p-6",
          className
        )}
        {...props}
      >
        {icon && (
          <div className="rounded-2xl border p-3 text-muted-foreground">
            {icon}
          </div>
        )}
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              {description}
            </p>
          )}
        </div>
        {action && <div className="pt-1">{action}</div>}
      </div>
    )
  }
)
EmptyState.displayName = "EmptyState"

export { EmptyState }
