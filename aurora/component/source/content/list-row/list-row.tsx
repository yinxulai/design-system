import * as React from "react"

import { cn } from "@aurora/lib/utils"

export interface ListRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode
  description?: React.ReactNode
  meta?: React.ReactNode
  action?: React.ReactNode
}

const ListRow = React.forwardRef<HTMLDivElement, ListRowProps>(
  ({ className, title, description, meta, action, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-1 rounded-[var(--radius-lg)] border border-border/70 p-3 sm:flex-row sm:items-center sm:justify-between",
          "bg-background/70 transition-colors duration-200 hover:bg-muted/50",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate">{title}</div>
            {description && (
              <p className="text-sm text-muted-foreground truncate">
                {description}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {meta && (
            <span className="text-xs text-muted-foreground">{meta}</span>
          )}
          {action}
        </div>
      </div>
    )
  }
)
ListRow.displayName = "ListRow"

export { ListRow }
