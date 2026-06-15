'use client'

import {
  useEffect,
  useRef,
  useId,
  type ReactNode,
} from 'react'
import { cn } from '@/lib/utils'
import { DrawerContext } from './DrawerContext'

export interface DrawerWrapperProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  /** Currently only 'right' is supported. */
  side?: 'right'
  /**
   * Width class for the panel. Must be a Tailwind utility — no arbitrary values.
   * Defaults to 'w-full sm:max-w-lg' (≈512px on sm+, full-width on mobile).
   */
  widthClassName?: string
  /** Accessible label for the dialog when no visible title is present. */
  'aria-label'?: string
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

export default function DrawerWrapper({
  open,
  onClose,
  children,
  side = 'right',
  widthClassName = 'w-full sm:max-w-lg',
  'aria-label': ariaLabel,
}: DrawerWrapperProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const titleId = useId()

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
      // Store the element that had focus before the drawer opened
      previousFocusRef.current = document.activeElement as HTMLElement | null
      // Move focus into the panel (first focusable element, or the panel itself)
      requestAnimationFrame(() => {
        if (!panelRef.current) return
        const focusable = getFocusableElements(panelRef.current)
        const target = focusable[0] ?? panelRef.current
        target.focus()
      })
    } else {
      // Return focus when drawer closes
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus()
        previousFocusRef.current = null
      }
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
          // Shift+Tab: if on first, wrap to last
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          // Tab: if on last, wrap to first
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  return (
    <DrawerContext.Provider value={{ onClose, titleId }}>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-40 bg-black/40',
          'transition-opacity duration-300',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabel ? undefined : titleId}
        aria-label={ariaLabel}
        tabIndex={-1}
        className={cn(
          'fixed top-0 bottom-0 z-50 flex flex-col bg-white shadow-xl',
          side === 'right' && 'right-0',
          widthClassName,
          'transition-transform duration-300 motion-reduce:transition-none',
          open ? 'translate-x-0' : 'translate-x-full',
          // Keep accessible when closed (pointer-events off, aria-hidden via inert-ish)
          !open && 'pointer-events-none'
        )}
      >
        {children}
      </div>
    </DrawerContext.Provider>
  )
}
