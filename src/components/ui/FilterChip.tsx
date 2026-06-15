import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

export interface FilterChipProps extends ComponentPropsWithoutRef<'button'> {
  active?: boolean
}

export default function FilterChip({
  active = false,
  className,
  children,
  ...props
}: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        'cursor-pointer rounded-lg px-3 py-2 font-sans text-xs',
        'focus-visible:outline-primary-500 focus-visible:outline-2',
        active
          ? 'bg-primary-100 text-primary-500 border-primary-100 border font-medium'
          : 'hover:bg-primary-100 border border-neutral-400 bg-white font-normal text-black',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
