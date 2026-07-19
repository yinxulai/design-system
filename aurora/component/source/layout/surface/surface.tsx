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
            "bg-card/90 border border-border/70 shadow-xl backdrop-blur-xl":
              tone === "default",
            "bg-muted/70 dark:bg-muted/40 border border-border/60":
              tone === "muted",
            "bg-gradient-to-br from-primary/10 to-background border border-primary/20 shadow-sm":
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
