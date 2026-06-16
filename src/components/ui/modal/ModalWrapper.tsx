'use client'

import { useEffect, useRef, useSyncExternalStore, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

// A store that never changes: server snapshot is `false`, client snapshot is
// `true`. React hydrates with the server value first, then re-renders with the
// client value — giving a mount flag with no hydration mismatch.
const emptySubscribe = () => () => {}

export interface ModalWrapperProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  /**
   * Max-width class for the modal container. Must be a Tailwind utility — no
   * arbitrary values. Defaults to 'max-w-md' (≈448px).
   */
  widthClassName?: string
  /** Show the close (✕) button in the top-right corner. Defaults to true. */
  showCloseButton?: boolean
  /** Accessible name for the dialog (since content is fully custom). */
  'aria-label'?: string
  /** Or point at the id of an element inside `children` that labels the dialog. */
  'aria-labelledby'?: string
}

// Collects all keyboard-focusable elements inside a container.
const FOCUS_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUS_SELECTORS))
}

export default function ModalWrapper({
  open,
  onClose,
  children,
  widthClassName = 'max-w-md',
  showCloseButton = true,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
}: ModalWrapperProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  // Only portal after mount so the first client render matches the server
  // (both render nothing), avoiding a hydration mismatch.
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )

  // --- Body scroll lock ---
  useEffect(() => {
    if (!open) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [open])

  // --- Return focus + initial focus ---
  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement | null
      requestAnimationFrame(() => {
        if (!panelRef.current) return
        const focusable = getFocusableElements(panelRef.current)
        const target = focusable[0] ?? panelRef.current
        target.focus()
      })
    } else if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
      previousFocusRef.current.focus()
      previousFocusRef.current = null
    }
  }, [open])

  // --- Keyboard handlers: Esc to close + focus trap ---
  useEffect(() => {
    if (!open) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }

      if (e.key === 'Tab') {
        const panel = panelRef.current
        if (!panel) return
        const focusable = getFocusableElements(panel)
        if (focusable.length === 0) {
          e.preventDefault()
          return
        }
        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  // Render nothing until mounted, then portal to <body> on the client so the
  // modal escapes any transformed ancestor (e.g. the slide-in drawer panel),
  // which would otherwise become the containing block for `position: fixed`.
  if (!mounted) return null

  return createPortal(
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4',
        open ? 'pointer-events-auto' : 'pointer-events-none'
      )}
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          'absolute inset-0 bg-black/40 transition-opacity duration-200',
          open ? 'opacity-100' : 'opacity-0'
        )}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabelledby ? undefined : (ariaLabel ?? 'Dialog')}
        aria-labelledby={ariaLabelledby}
        tabIndex={-1}
        className={cn(
          'relative w-full rounded-xl bg-white p-6 shadow-xl',
          widthClassName,
          'transition-all duration-200 motion-reduce:transition-none',
          open ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        )}
      >
        {showCloseButton && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 inline-flex cursor-pointer items-center justify-center rounded-md p-1 text-neutral-600 hover:text-black focus-visible:outline-2 focus-visible:outline-primary-500"
          >
            <X aria-hidden="true" size={18} />
          </button>
        )}

        {children}
      </div>
    </div>,
    document.body
  )
}
