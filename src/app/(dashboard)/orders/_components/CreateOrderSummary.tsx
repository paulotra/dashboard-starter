'use client'

import { useId } from 'react'
import { cn } from '@/lib/utils'
import CardWrapper from '@/components/ui/CardWrapper'
import Button from '@/components/ui/Button'

export interface OrderSummaryValues {
  subtotal: string
  vat: string
  shipping: string
  grandTotal: string
}

export interface CreateOrderSummaryProps {
  summary: OrderSummaryValues
  note: string
  onNoteChange: (note: string) => void
  onCreate: () => void
  /** Disables the Create Order button (e.g. until a customer is selected). */
  disabled?: boolean
  className?: string
}

function Row({
  label,
  value,
  emphasis,
}: {
  label: string
  value: string
  emphasis?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span
        className={cn(
          'font-sans text-xs',
          emphasis ? 'text-primary-500 font-medium' : 'font-normal text-neutral-600'
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          'font-sans text-xs',
          emphasis ? 'text-primary-500 font-medium' : 'font-normal text-black'
        )}
      >
        {value}
      </span>
    </div>
  )
}

export default function CreateOrderSummary({
  summary,
  note,
  onNoteChange,
  onCreate,
  disabled,
  className,
}: CreateOrderSummaryProps) {
  const noteId = useId()

  return (
    <CardWrapper className={cn('flex flex-col gap-5 px-4 pt-4 pb-4', className)}>
      {/* ── Order summary ── */}
      <div className="flex flex-col gap-4">
        <span className="font-sans text-sm font-medium text-black">Order Summary</span>
        <div className="flex flex-col gap-2">
          <Row label="Subtotal" value={summary.subtotal} />
          <Row label="VAT (9%)" value={summary.vat} />
          <Row label="Shipping" value={summary.shipping} />
          <Row label="Grand Total" value={summary.grandTotal} emphasis />
        </div>
      </div>

      <hr className="border-border-color" />

      {/* ── Note ── */}
      <div className="flex flex-col gap-3">
        <label htmlFor={noteId} className="font-sans text-sm font-medium text-black">
          Note
        </label>
        <textarea
          id={noteId}
          rows={3}
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          placeholder="e.g. Preventief onderhoud uitgevoerd"
          className="focus:outline-primary-500 min-h-23 w-full resize-none rounded-lg border border-neutral-400 bg-white px-3 py-3 font-sans text-xs leading-5 text-black placeholder:text-neutral-600 focus:outline-2"
        />
      </div>

      {/* ── Submit ── */}
      <Button
        variant="primary-filled"
        type="button"
        onClick={onCreate}
        disabled={disabled}
        className="w-full justify-center disabled:cursor-not-allowed disabled:opacity-50"
      >
        Create Order
      </Button>
    </CardWrapper>
  )
}
