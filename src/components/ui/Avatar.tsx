import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

export interface AvatarProps extends ComponentPropsWithoutRef<'div'> {
  initials: string
  className?: string
}

export default function Avatar({ initials, className, ...props }: AvatarProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-100',
        className
      )}
      {...props}
    >
      <span className="font-sans text-xs font-medium text-primary-500">{initials}</span>
    </div>
  )
}
