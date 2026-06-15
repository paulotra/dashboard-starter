'use client'

import type { ReactNode } from 'react'
import { X, ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useDrawerContext } from './DrawerContext'

export interface DrawerHeaderProps {
  /** Title string displayed on the left. */
  title: ReactNode
  /** When provided, renders a back button before the title. */
  onBack?: () => void
  className?: string
}

export default function DrawerHeader({ title, onBack, className }: DrawerHeaderProps) {
  const { onClose, titleId } = useDrawerContext()

  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-between border-b border-neutral-400 px-5 py-4',
        className
      )}
    >
      <div className="flex min-w-0 items-center gap-2">
        {onBack && (
          <button
            type="button"
            aria-label="Back"
            onClick={onBack}
            className="focus-visible:outline-primary-500 flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-neutral-200 text-black focus-visible:outline-2"
          >
            <ChevronLeft aria-hidden="true" size={18} />
          </button>
        )}
        <h2 id={titleId} className="min-w-0 font-sans text-base font-medium text-black">
          {title}
        </h2>
      </div>

      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="focus-visible:outline-primary-500 ml-2 flex size-8 shrink-0 items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-200 hover:text-black focus-visible:outline-2"
      >
        <X aria-hidden="true" size={16} />
      </button>
    </div>
  )
}
