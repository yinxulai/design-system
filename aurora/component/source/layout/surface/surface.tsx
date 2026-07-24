import * as React from "react"

import { cn } from "@aurora/lib/utils"

export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: "default" | "muted" | "accent"
}

const Surface = React.forwardRef<HTMLDivElement, SurfaceProps>(
  ({ className, tone = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[var(--radius-lg)] transition-all duration-200",
          {
            "border border-border/70 bg-card shadow-sm":
              tone === "default",
            "bg-muted/70 dark:bg-muted/40 border border-border/60":
              tone === "muted",
            "border border-primary/20 bg-primary/5 shadow-sm":
              tone === "accent",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Surface.displayName = "Surface"

export { Surface }
