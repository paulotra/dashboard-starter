import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface DrawerBodyProps {
  children: ReactNode
  className?: string
}

export default function DrawerBody({ children, className }: DrawerBodyProps) {
  return (
    <div className={cn('flex-1 overflow-y-auto p-5', className)}>
      {children}
    </div>
  )
}
