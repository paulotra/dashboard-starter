'use client'

import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useDrawerContext } from './DrawerContext'

export interface DrawerHeaderProps {
  /** Title string displayed on the left. */
  title: ReactNode
  className?: string
}

export default function DrawerHeader({ title, className }: DrawerHeaderProps) {
  const { onClose, titleId } = useDrawerContext()

  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-between border-b border-neutral-400 px-5 py-4',
        className
      )}
    >
      <h2 id={titleId} className="font-sans text-base font-medium text-black">
        {title}
      </h2>

      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="flex size-8 items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-200 hover:text-black focus-visible:outline-2 focus-visible:outline-primary-500"
      >
        <X aria-hidden="true" size={16} />
      </button>
    </div>
  )
}
