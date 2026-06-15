import { cn } from '@/lib/utils'

/* ─── Semantic variant config ─────────────────────────────────────────── */

const VARIANT_CONFIG = {
  success: {
    bg: 'bg-green-100',
    dot: 'bg-green-500',
    text: 'text-green-500',
  },
  warning: {
    bg: 'bg-yellow-100',
    dot: 'bg-yellow-600',
    text: 'text-yellow-600',
  },
  info: {
    bg: 'bg-primary-200',
    dot: 'bg-primary-500',
    text: 'text-primary-500',
  },
  danger: {
    bg: 'bg-red-100',
    dot: 'bg-red-500',
    text: 'text-red-500',
  },
  neutral: {
    bg: 'bg-neutral-200',
    dot: 'bg-neutral-500',
    text: 'text-neutral-500',
  },
} as const

export type BadgeVariant = keyof typeof VARIANT_CONFIG

/* ─── Order-status → variant map (backward-compat) ───────────────────── */

const ORDER_STATUS_VARIANT: Record<string, BadgeVariant> = {
  Pending: 'warning',
  Completed: 'success',
  Processing: 'info',
  Cancelled: 'danger',
}

export type OrderStatus = keyof typeof ORDER_STATUS_VARIANT

/* ─── Props ───────────────────────────────────────────────────────────── */

export interface BadgeStatusProps {
  /**
   * Semantic color variant. When provided, `children` (or `status`) supplies
   * the visible label. Prefer this over `status` for new call sites.
   */
  variant?: BadgeVariant
  /**
   * Visible label text. Used when `variant` is set.
   */
  children?: string
  /**
   * Legacy convenience prop: an order status string that is mapped
   * automatically to the matching variant + label. Kept for backward
   * compatibility with existing OrdersTable / RecentOrdersTable usage.
   *
   * @deprecated Prefer explicit `variant` + `children` for new call sites.
   */
  status?: OrderStatus
  className?: string
}

/* ─── Component ───────────────────────────────────────────────────────── */

export default function BadgeStatus({
  variant,
  children,
  status,
  className,
}: BadgeStatusProps) {
  // Resolve variant + label from either the explicit props or the legacy status
  const resolvedVariant: BadgeVariant =
    variant ?? (status ? (ORDER_STATUS_VARIANT[status] ?? 'neutral') : 'neutral')
  const resolvedLabel: string = children ?? status ?? ''

  const { bg, dot, text } = VARIANT_CONFIG[resolvedVariant]

  return (
    <div className={cn('inline-flex items-center gap-1 rounded px-2 py-1', bg, className)}>
      <span className={cn('size-1.5 shrink-0 rounded-full', dot)} />
      <span className={cn('text-2xs font-sans font-medium whitespace-nowrap', text)}>
        {resolvedLabel}
      </span>
    </div>
  )
}
