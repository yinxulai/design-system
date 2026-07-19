import * as React from "react"
import { ChevronRight } from "lucide-react"

import { cn } from "@aurora/lib/utils"

export interface BreadcrumbsProps
  extends React.HTMLAttributes<HTMLElement> {
  items: {
    label: React.ReactNode
    href?: string
  }[]
}

const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ className, items, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn(
          "flex items-center flex-wrap gap-1 text-sm",
          className
        )}
        {...props}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <React.Fragment key={index}>
              {index > 0 && (
                <ChevronRight className="size-4 text-muted-foreground/40 shrink-0" />
              )}
              {isLast || !item.href ? (
                <span
                  className={cn(
                    "font-medium",
                    isLast
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 rounded-sm"
                >
                  {item.label}
                </a>
              )}
            </React.Fragment>
          )
        })}
      </nav>
    )
  }
)
Breadcrumbs.displayName = "Breadcrumbs"

export { Breadcrumbs }
