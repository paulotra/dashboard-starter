import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

export interface CardWrapperProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
}

export default function CardWrapper({ className, children, ...props }: CardWrapperProps) {
  return (
    <div className={cn('shadow-card rounded-xl bg-white p-4', className)} {...props}>
      {children}
    </div>
  )
}
