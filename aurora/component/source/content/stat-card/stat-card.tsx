import * as React from "react"

import { cn } from "@aurora/lib/utils"
import { Surface } from "@aurora/layout/surface"

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: React.ReactNode
  value: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  tone?: "default" | "muted" | "accent"
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, title, value, description, action, tone = "default", ...props }, ref) => {
    return (
      <Surface
        ref={ref}
        tone={tone}
        className={cn("p-5 flex flex-col gap-4", className)}
        {...props}
      >
        <div className="flex items-start justify-between">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {action && <div className="shrink-0">{action}</div>}
        </div>
        <div className="space-y-1">
          <div className="text-3xl font-semibold tracking-tight tabular-nums">
            {value}
          </div>
          {description && (
            <p className="text-sm text-muted-foreground leading-6">
              {description}
            </p>
          )}
        </div>
      </Surface>
    )
  }
)
StatCard.displayName = "StatCard"

export { StatCard }
