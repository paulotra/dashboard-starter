import type { ReactNode } from 'react'
import { SquarePen } from 'lucide-react'
import type { Customer, CustomerStatus } from '@/lib/customers'
import CardWrapper from '@/components/ui/CardWrapper'
import BadgeStatus from '@/components/ui/BadgeStatus'
import type { BadgeVariant } from '@/components/ui/BadgeStatus'

/* ─── Status → variant map ──────────────────────────────────────────── */

const CUSTOMER_STATUS_VARIANT: Record<CustomerStatus, BadgeVariant> = {
  Activated: 'success',
  Deactivated: 'danger',
  'Invite Sent': 'info',
  Expired: 'warning',
}

/* ─── Label / value row ─────────────────────────────────────────────── */

function InfoRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="font-sans text-xs font-normal text-neutral-600">{label}</span>
      <span className="text-right font-sans text-xs font-normal text-black">{children}</span>
    </div>
  )
}

/* ─── Section heading with an edit action ───────────────────────────── */

function SectionHeading({ title, editLabel }: { title: string; editLabel: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-sans text-sm font-medium text-black">{title}</span>
      <button
        type="button"
        className="text-primary-500 focus-visible:outline-primary-500 inline-flex cursor-pointer items-center gap-1 focus-visible:outline-2"
      >
        <SquarePen aria-hidden="true" size={14} />
        <span className="font-sans text-xs font-normal">{editLabel}</span>
      </button>
    </div>
  )
}

/* ─── Component ─────────────────────────────────────────────────────── */

export interface CustomerProfileCardProps {
  customer: Customer
  className?: string
}

export default function CustomerProfileCard({ customer, className }: CustomerProfileCardProps) {
  // Email isn't stored on the model — derive a sensible address from the name.
  const email = `${customer.name.toLowerCase().split(' ')[0]}@gmail.com`

  return (
    <CardWrapper className={className}>
      <div className="flex flex-col gap-5">
        {/* ── Header: avatar + name + email ── */}
        <div className="flex items-center gap-4">
          <div
            aria-hidden="true"
            className="bg-primary-100 flex size-20 shrink-0 items-center justify-center rounded-full"
          >
            <span className="text-primary-500 font-sans text-2xl font-medium">
              {customer.initials}
            </span>
          </div>
          <div className="flex min-w-0 flex-col gap-1">
            <span className="truncate font-sans text-lg font-medium text-black">
              {customer.name}
            </span>
            <span className="text-primary-500 truncate font-sans text-xs font-normal">{email}</span>
          </div>
        </div>

        <hr className="border-border-color" />

        {/* ── Details ── */}
        <div className="flex flex-col gap-4">
          <SectionHeading title="Details" editLabel="Edit details" />

          <div className="flex flex-col gap-2 rounded-xl bg-neutral-200 px-4 py-4">
            <InfoRow label="Name">{customer.name}</InfoRow>
            <InfoRow label="Email Address">{email}</InfoRow>
            <InfoRow label="Contact Number">{customer.contactNumber ?? '—'}</InfoRow>
            <InfoRow label="Address">{customer.location}</InfoRow>
            <InfoRow label="Orders">{customer.orders}</InfoRow>
            <InfoRow label="Status">
              <BadgeStatus variant={CUSTOMER_STATUS_VARIANT[customer.status]}>
                {customer.status}
              </BadgeStatus>
            </InfoRow>
          </div>
        </div>

        <hr className="border-border-color" />

        {/* ── Notes ── */}
        <div className="flex flex-col gap-3">
          <SectionHeading title="Notes" editLabel="Edit note" />

          <div className="rounded-xl bg-neutral-200 p-4">
            <p className="font-sans text-xs font-normal leading-5 text-black">
              {customer.notes ?? 'No notes added yet.'}
            </p>
          </div>
        </div>
      </div>
    </CardWrapper>
  )
}
