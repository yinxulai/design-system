import * as React from "react"

import { cn } from "@aurora/lib/utils"

export interface FormSectionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
}

const FormSection = React.forwardRef<HTMLDivElement, FormSectionProps>(
  ({ className, title, description, actions, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[var(--radius-lg)] border bg-card p-5 space-y-4",
          className
        )}
        {...props}
      >
        {(title || description || actions) && (
          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              {title && (
                <h3 className="text-base font-semibold tracking-tight">
                  {title}
                </h3>
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
        <div className="space-y-4">{children}</div>
      </div>
    )
  }
)
FormSection.displayName = "FormSection"

export { FormSection }
