import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@aurora/lib/utils"

export interface PaginationProps
  extends React.HTMLAttributes<HTMLElement> {
  currentPage: number
  totalPages: number
  onPageChange?: (page: number) => void
}

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ className, currentPage, totalPages, onPageChange, ...props }, ref) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    const showPrev = currentPage > 1
    const showNext = currentPage < totalPages

    return (
      <nav
        ref={ref}
        className={cn("flex items-center gap-1", className)}
        aria-label="Pagination"
        {...props}
      >
        <button
          type="button"
          disabled={!showPrev}
          onClick={() => onPageChange?.(currentPage - 1)}
          className={cn(
            "inline-flex items-center gap-1 rounded-md border px-3 py-2 text-sm font-medium transition-all",
            "hover:bg-accent hover:text-accent-foreground",
            "disabled:pointer-events-none disabled:opacity-50"
          )}
        >
          <ChevronLeft className="size-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        <div className="hidden sm:flex items-center gap-1">
          {pages.map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange?.(page)}
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-all",
                "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
                page === currentPage
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {page}
            </button>
          ))}
        </div>

        <span className="sm:hidden px-2 text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>

        <button
          type="button"
          disabled={!showNext}
          onClick={() => onPageChange?.(currentPage + 1)}
          className={cn(
            "inline-flex items-center gap-1 rounded-md border px-3 py-2 text-sm font-medium transition-all",
            "hover:bg-accent hover:text-accent-foreground",
            "disabled:pointer-events-none disabled:opacity-50"
          )}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="size-4" />
        </button>
      </nav>
    )
  }
)
Pagination.displayName = "Pagination"

export { Pagination }
