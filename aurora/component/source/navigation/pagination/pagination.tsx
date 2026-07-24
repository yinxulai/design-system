import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@aurora/lib/utils"

type PaginationItem = number | "ellipsis-start" | "ellipsis-end"

function getPaginationItems(
  currentPage: number,
  totalPages: number
): PaginationItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const pages = new Set([1, totalPages])
  for (
    let page = Math.max(2, currentPage - 1);
    page <= Math.min(totalPages - 1, currentPage + 1);
    page += 1
  ) {
    pages.add(page)
  }

  const sortedPages = [...pages].sort((a, b) => a - b)
  const items: PaginationItem[] = []

  sortedPages.forEach((page, index) => {
    const previousPage = sortedPages[index - 1]
    if (previousPage && page - previousPage > 1) {
      items.push(index === 1 ? "ellipsis-start" : "ellipsis-end")
    }
    items.push(page)
  })

  return items
}

export interface PaginationProps
  extends React.HTMLAttributes<HTMLElement> {
  currentPage: number
  totalPages: number
  onPageChange?: (page: number) => void
}

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ className, currentPage, totalPages, onPageChange, ...props }, ref) => {
    const normalizedTotalPages = Number.isFinite(totalPages)
      ? Math.max(0, Math.floor(totalPages))
      : 0
    const normalizedCurrentPage = normalizedTotalPages
      ? Math.min(
          normalizedTotalPages,
          Math.max(1, Math.floor(currentPage) || 1)
        )
      : 0
    const pages = getPaginationItems(
      normalizedCurrentPage,
      normalizedTotalPages
    )
    const showPrev = normalizedCurrentPage > 1
    const showNext = normalizedCurrentPage < normalizedTotalPages

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
          aria-label="Go to previous page"
          onClick={() => onPageChange?.(normalizedCurrentPage - 1)}
          className={cn(
            "inline-flex min-h-11 items-center gap-1 rounded-md border px-3 py-2 text-sm font-medium transition-all duration-200 sm:min-h-9",
            "hover:bg-accent hover:text-accent-foreground",
            "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
            "disabled:pointer-events-none disabled:opacity-50"
          )}
        >
          <ChevronLeft aria-hidden="true" className="size-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        <div className="hidden sm:flex items-center gap-1">
          {pages.map((item) =>
            typeof item === "number" ? (
              <button
                key={item}
                type="button"
                aria-label={`Go to page ${item}`}
                aria-current={
                  item === normalizedCurrentPage ? "page" : undefined
                }
                onClick={() => onPageChange?.(item)}
                className={cn(
                  "inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
                  item === normalizedCurrentPage
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {item}
              </button>
            ) : (
              <span
                key={item}
                aria-hidden="true"
                className="inline-flex h-9 w-9 items-center justify-center text-muted-foreground"
              >
                &hellip;
              </span>
            )
          )}
        </div>

        <span className="sm:hidden px-2 text-sm text-muted-foreground">
          Page {normalizedCurrentPage} of {normalizedTotalPages}
        </span>

        <button
          type="button"
          disabled={!showNext}
          aria-label="Go to next page"
          onClick={() => onPageChange?.(normalizedCurrentPage + 1)}
          className={cn(
            "inline-flex min-h-11 items-center gap-1 rounded-md border px-3 py-2 text-sm font-medium transition-all duration-200 sm:min-h-9",
            "hover:bg-accent hover:text-accent-foreground",
            "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
            "disabled:pointer-events-none disabled:opacity-50"
          )}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight aria-hidden="true" className="size-4" />
        </button>
      </nav>
    )
  }
)
Pagination.displayName = "Pagination"

export { Pagination }
