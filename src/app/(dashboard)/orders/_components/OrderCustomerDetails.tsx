import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import CardWrapper from '@/components/ui/CardWrapper'

/* ─── Label / value row ─────────────────────────────────────────────── */

function InfoRow({
  label,
  value,
  highlight,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="font-sans text-xs font-normal text-neutral-600">{label}</span>
      <span
        className={cn(
          'text-right font-sans text-xs font-normal',
          highlight ? 'text-primary-500' : 'text-black'
        )}
      >
        {value}
      </span>
    </div>
  )
}

/* ─── Component ─────────────────────────────────────────────────────── */

export interface OrderCustomerDetailsProps {
  name: string
  email: string
  contactNumber: string
  address: string
  /** When provided, renders a "Go to customer" link. */
  customerHref?: string
  className?: string
}

export default function OrderCustomerDetails({
  name,
  email,
  contactNumber,
  address,
  customerHref,
  className,
}: OrderCustomerDetailsProps) {
  return (
    <CardWrapper className={cn('flex flex-col gap-4 px-4 pt-4 pb-3', className)}>
      <div className="flex items-center justify-between">
        <span className="font-sans text-sm font-medium text-black">Customer Details</span>
        {customerHref && (
          <Link
            href={customerHref}
            className="text-primary-500 focus-visible:outline-primary-500 inline-flex items-center gap-1 font-sans text-xs font-normal focus-visible:outline-2"
          >
            Go to customer
            <ArrowRight aria-hidden="true" size={14} />
          </Link>
        )}
      </div>

      <div className="flex flex-col gap-2 rounded-xl bg-neutral-200 px-4 py-4">
        <InfoRow label="Name" value={name} highlight />
        <InfoRow label="Email Address" value={email} highlight />
        <InfoRow label="Contact Number" value={contactNumber} />
        <InfoRow label="Address" value={address} />
      </div>
    </CardWrapper>
  )
}
