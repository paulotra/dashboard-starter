'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import CardWrapper from '@/components/ui/CardWrapper'
import Button from '@/components/ui/Button'

/* ─── Types ─────────────────────────────────────────────────────────── */

export type OrderStatus = 'New Order' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled'

/** The ordered pipeline (Cancelled is a terminal state, outside the flow). */
export const ORDER_PIPELINE = ['New Order', 'Confirmed', 'Shipped', 'Delivered'] as const

interface StatusStyle {
  /** Text color for the pipeline label. */
  text: string
  /** Background color for completed dots + the progress fill. */
  bg: string
}

const STATUS_STYLES: Record<OrderStatus, StatusStyle> = {
  'New Order': { text: 'text-primary-500', bg: 'bg-primary-500' },
  Confirmed: { text: 'text-secondary-500', bg: 'bg-secondary-500' },
  Shipped: { text: 'text-mint-500', bg: 'bg-mint-500' },
  Delivered: { text: 'text-green-500', bg: 'bg-green-500' },
  Cancelled: { text: 'text-red-500', bg: 'bg-red-500' },
}

/** Fraction-of-track fill width for each pipeline index (0-based). */
const FILL_WIDTH = ['w-0', 'w-1/3', 'w-2/3', 'w-full'] as const

/** The next action available from a given status, if any. */
const NEXT_ACTION: Partial<Record<OrderStatus, { label: string; next: OrderStatus }>> = {
  'New Order': { label: 'Confirm Order', next: 'Confirmed' },
  Confirmed: { label: 'Ship Order', next: 'Shipped' },
  Shipped: { label: 'Mark as Delivered', next: 'Delivered' },
}

/* ─── Props ─────────────────────────────────────────────────────────── */

export interface OrderProgressProps {
  status: OrderStatus
  /** Called when a step dot or the action button changes the status. */
  onStatusChange?: (status: OrderStatus) => void
  title?: string
  className?: string
}

/* ─── Component ─────────────────────────────────────────────────────── */

export default function OrderProgress({
  status,
  onStatusChange,
  title = 'Order Progress',
  className,
}: OrderProgressProps) {
  const isCancelled = status === 'Cancelled'
  // Index within the pipeline; -1 when cancelled (no positive progress).
  const currentIndex = isCancelled
    ? -1
    : ORDER_PIPELINE.indexOf(status as (typeof ORDER_PIPELINE)[number])
  const { text, bg } = STATUS_STYLES[status]
  const action = NEXT_ACTION[status]

  return (
    <CardWrapper className={cn('flex flex-col gap-4', className)}>
      {/* Header */}
      <p className="font-sans text-sm font-medium text-black">{title}</p>

      <div className="flex flex-col gap-2">
        {/* Pipeline label */}
        <p className="font-sans text-xs font-normal text-neutral-600">
          Pipeline: <span className={cn('font-semibold', text)}>{status}</span>
        </p>

        {/* Progress: the pipeline track, plus a separate red segment when cancelled */}
        <div className="flex items-center gap-2">
          {/* Pipeline track + step dots */}
          <div className="relative flex-1 py-1.5">
            {/* Background track */}
            <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-neutral-300" />
            {/* Completed fill (not shown when cancelled — the flow never progressed) */}
            {!isCancelled && currentIndex > 0 && (
              <div
                className={cn(
                  'absolute top-1/2 left-0 h-1 -translate-y-1/2 rounded-full',
                  FILL_WIDTH[currentIndex],
                  bg
                )}
              />
            )}

            {/* Step dots */}
            <div className="relative flex items-center justify-between">
              {ORDER_PIPELINE.map((step, i) => {
                const isComplete = !isCancelled && i <= currentIndex
                const interactive = Boolean(onStatusChange)

                return (
                  <button
                    key={step}
                    type="button"
                    disabled={!interactive}
                    onClick={() => onStatusChange?.(step)}
                    aria-label={`Set status to ${step}`}
                    aria-current={step === status ? 'step' : undefined}
                    className={cn(
                      'flex size-4 items-center justify-center rounded-full border-4 outline-2 outline-white transition-colors',
                      interactive && 'cursor-pointer',
                      'focus-visible:outline-primary-500 focus-visible:outline-2',
                      isComplete
                        ? cn(bg, 'border-transparent text-white')
                        : 'border-neutral-300 bg-white'
                    )}
                  >
                    {isComplete && <Check aria-hidden="true" size={10} />}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Separate cancellation bar — always shown; red when cancelled, grey otherwise */}
          <div
            className={cn(
              'h-1 w-16 shrink-0 rounded-full',
              isCancelled ? 'bg-red-500' : 'bg-neutral-300'
            )}
            aria-hidden="true"
          />
        </div>

        <p className="font-sans text-xs font-normal text-neutral-600">
          Click a step to change the status.
        </p>
      </div>

      {/* Contextual action */}
      {action && (
        <Button
          variant="primary-filled"
          type="button"
          className="w-full justify-center"
          onClick={() => onStatusChange?.(action.next)}
        >
          {action.label}
        </Button>
      )}
    </CardWrapper>
  )
}
