import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

/**
 * Builds the list of page tokens to display, including ellipsis markers.
 * Always shows: first page, last page, current ± 1 neighbour, with "…" gaps.
 */
function buildPageTokens(currentPage: number, totalPages: number): (number | '…')[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const pages = new Set<number>()
  pages.add(1)
  pages.add(totalPages)
  pages.add(currentPage)
  if (currentPage - 1 >= 1) pages.add(currentPage - 1)
  if (currentPage + 1 <= totalPages) pages.add(currentPage + 1)

  const sorted = Array.from(pages).sort((a, b) => a - b)
  const tokens: (number | '…')[] = []

  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      tokens.push('…')
    }
    tokens.push(sorted[i])
  }

  return tokens
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  const tokens = buildPageTokens(currentPage, totalPages)
  const isPrevDisabled = currentPage <= 1
  const isNextDisabled = currentPage >= totalPages

  return (
    <nav aria-label="Pagination" className={cn('flex items-center gap-1', className)}>
      {/* Previous */}
      <button
        type="button"
        aria-label="Previous page"
        disabled={isPrevDisabled}
        onClick={() => onPageChange(currentPage - 1)}
        className={cn(
          'flex size-8 items-center justify-center rounded-lg border border-primary-200 bg-white',
          'focus-visible:outline-primary-500 focus-visible:outline-2',
          'disabled:cursor-not-allowed disabled:opacity-40',
          !isPrevDisabled && 'hover:bg-primary-100'
        )}
      >
        <ChevronLeft aria-hidden="true" size={14} />
      </button>

      {/* Page tokens */}
      {tokens.map((token, i) => {
        if (token === '…') {
          return (
            <span
              key={`ellipsis-${i}`}
              aria-hidden="true"
              className="flex size-8 items-center justify-center text-xs text-neutral-600"
            >
              …
            </span>
          )
        }

        const isActive = token === currentPage
        return (
          <button
            key={token}
            type="button"
            aria-label={`Go to page ${token}`}
            aria-current={isActive ? 'page' : undefined}
            onClick={() => onPageChange(token)}
            className={cn(
              'flex size-8 items-center justify-center rounded-lg border text-xs',
              'focus-visible:outline-primary-500 focus-visible:outline-2',
              isActive
                ? 'border-primary-500 bg-primary-500 font-medium text-white'
                : 'border-primary-200 bg-white font-normal text-black hover:bg-primary-100'
            )}
          >
            {token}
          </button>
        )
      })}

      {/* Next */}
      <button
        type="button"
        aria-label="Next page"
        disabled={isNextDisabled}
        onClick={() => onPageChange(currentPage + 1)}
        className={cn(
          'flex size-8 items-center justify-center rounded-lg border border-primary-200 bg-white',
          'focus-visible:outline-primary-500 focus-visible:outline-2',
          'disabled:cursor-not-allowed disabled:opacity-40',
          !isNextDisabled && 'hover:bg-primary-100'
        )}
      >
        <ChevronRight aria-hidden="true" size={14} />
      </button>
    </nav>
  )
}
