import type { ReactNode } from 'react'
import { SquarePen } from 'lucide-react'
import { cn } from '@/lib/utils'
import CardWrapper from '@/components/ui/CardWrapper'
import BadgeStatus from '@/components/ui/BadgeStatus'
import type { OrderStatus } from '@/components/ui/BadgeStatus'

/* ─── Label / value row ─────────────────────────────────────────────── */

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="font-sans text-xs font-normal text-neutral-600">{label}</span>
      <span className="text-right font-sans text-xs font-normal text-black">{children}</span>
    </div>
  )
}

/* ─── Types ─────────────────────────────────────────────────────────── */

export interface OrderSummary {
  vat: string
  shipping: string
  amount: string
  grandTotal: string
}

export interface OrderDetailsCardProps {
  orderNumber: string
  status: OrderStatus
  orderDate: string
  quantity: string
  summary: OrderSummary
  notes?: string
  className?: string
}

/* ─── Component ─────────────────────────────────────────────────────── */

export default function OrderDetailsCard({
  orderNumber,
  status,
  orderDate,
  quantity,
  summary,
  notes,
  className,
}: OrderDetailsCardProps) {
  return (
    <CardWrapper className={cn('flex flex-col gap-5 px-4 pt-4 pb-3', className)}>
      {/* ── Order details ── */}
      <div className="flex flex-col gap-4">
        <span className="font-sans text-sm font-medium text-black">Order Details</span>
        <div className="flex flex-col gap-2">
          <Row label="Order #">{orderNumber}</Row>
          <Row label="Status">
            <BadgeStatus status={status} />
          </Row>
          <Row label="Order Date">
            <span className="capitalize">{orderDate}</span>
          </Row>
          <Row label="Quantity">{quantity}</Row>
        </div>
      </div>

      <hr className="border-border-color" />

      {/* ── Order summary ── */}
      <div className="flex flex-col gap-4">
        <span className="font-sans text-sm font-medium text-black">Order Summary</span>
        <div className="flex flex-col gap-2">
          <Row label="VAT (9%)">{summary.vat}</Row>
          <Row label="Shipping">{summary.shipping}</Row>
          <Row label="Amount">{summary.amount}</Row>
          <Row label="Grand Total">{summary.grandTotal}</Row>
        </div>
      </div>

      <hr className="border-border-color" />

      {/* ── Notes ── */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="font-sans text-sm font-medium text-black">Notes</span>
          <button
            type="button"
            className="text-primary-500 focus-visible:outline-primary-500 inline-flex cursor-pointer items-center gap-1 font-sans text-xs font-normal focus-visible:outline-2"
          >
            <SquarePen aria-hidden="true" size={14} />
            Edit note
          </button>
        </div>
        <div className="rounded-xl bg-neutral-200 p-4">
          <p className="font-sans text-xs font-normal leading-5 text-black">
            {notes ?? 'No notes added yet.'}
          </p>
        </div>
      </div>
    </CardWrapper>
  )
}
