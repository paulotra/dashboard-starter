import { ChevronsUpDown, ChevronUp, ChevronDown } from 'lucide-react'
import type { SortDirection } from '@/lib/orders'

export interface SortIndicatorProps {
  isActive: boolean
  direction: SortDirection
}

export default function SortIndicator({ isActive, direction }: SortIndicatorProps) {
  if (!isActive) {
    return (
      <ChevronsUpDown
        aria-hidden="true"
        size={14}
        className="absolute right-0 shrink-0 text-neutral-600"
      />
    )
  }
  if (direction === 'asc') {
    return (
      <ChevronUp
        aria-hidden="true"
        size={14}
        className="absolute right-0 shrink-0 text-neutral-600"
      />
    )
  }
  return (
    <ChevronDown
      aria-hidden="true"
      size={14}
      className="absolute right-0 shrink-0 text-neutral-600"
    />
  )
}
