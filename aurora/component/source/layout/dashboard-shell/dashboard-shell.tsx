import * as React from "react"

import { cn } from "@aurora/lib/utils"

export interface DashboardShellProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const DashboardShell = React.forwardRef<HTMLDivElement, DashboardShellProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full px-4 py-6 sm:px-6 lg:px-8",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
DashboardShell.displayName = "DashboardShell"

export { DashboardShell }
