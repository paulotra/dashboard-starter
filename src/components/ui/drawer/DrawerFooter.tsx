import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface DrawerFooterProps {
  children: ReactNode
  className?: string
}

export default function DrawerFooter({ children, className }: DrawerFooterProps) {
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-end gap-2 border-t border-neutral-400 px-5 py-4',
        className
      )}
    >
      {children}
    </div>
  )
}
