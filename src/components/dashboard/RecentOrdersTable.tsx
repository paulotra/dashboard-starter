'use client'

import { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import CardWrapper from '@/components/ui/CardWrapper'
import BadgeStatus from '@/components/ui/BadgeStatus'
import type { BadgeStatusProps } from '@/components/ui/BadgeStatus'
import { EllipsisVertical, ChevronsUpDown, ChevronUp, ChevronDown } from 'lucide-react'

export interface Order {
  id: string
  orderNumber: string
  name: string
  initials: string
  status: NonNullable<BadgeStatusProps['status']>
  quantity: string
  date: string
  amount: string
}

export const DEFAULT_ORDERS: Order[] = [
  {
    id: '1',
    orderNumber: '#1042',
    name: 'Bakkerij Brood',
    initials: 'BB',
    status: 'Pending',
    quantity: '3 items',
    date: '03 jun 13:46',
    amount: '€49.50',
  },
  {
    id: '2',
    orderNumber: '#1043',
    name: 'Molen Koffie',
    initials: 'MK',
    status: 'Completed',
    quantity: '5 items',
    date: '04 jun 09:12',
    amount: '€82.30',
  },
  {
    id: '3',
    orderNumber: '#1044',
    name: 'Groente Huis',
    initials: 'GH',
    status: 'Processing',
    quantity: '2 items',
    date: '04 jun 10:45',
    amount: '€23.75',
  },
  {
    id: '4',
    orderNumber: '#1045',
    name: 'Vis & Seafood',
    initials: 'VS',
    status: 'Pending',
    quantity: '7 items',
    date: '04 jun 11:30',
    amount: '€134.90',
  },
  {
    id: '5',
    orderNumber: '#1046',
    name: 'Patisserie Belle',
    initials: 'PB',
    status: 'Completed',
    quantity: '4 items',
    date: '04 jun 12:05',
    amount: '€67.20',
  },
  {
    id: '6',
    orderNumber: '#1047',
    name: 'Slagerij Frans',
    initials: 'SF',
    status: 'Cancelled',
    quantity: '1 item',
    date: '04 jun 13:00',
    amount: '€15.50',
  },
  {
    id: '7',
    orderNumber: '#1048',
    name: 'De Kaasboer',
    initials: 'DK',
    status: 'Processing',
    quantity: '6 items',
    date: '04 jun 14:22',
    amount: '€98.40',
  },
  {
    id: '8',
    orderNumber: '#1049',
    name: 'Bloem & More',
    initials: 'BM',
    status: 'Completed',
    quantity: '3 items',
    date: '04 jun 15:37',
    amount: '€44.60',
  },
]

/* ─── Sort helpers ─────────────────────────────────────────────────── */

type SortKey = 'name' | 'status' | 'quantity' | 'date' | 'amount'
type SortDirection = 'asc' | 'desc'

function parseQuantity(value: string): number {
  const match = value.match(/^(\d+)/)
  return match ? parseInt(match[1], 10) : 0
}

function parseAmount(value: string): number {
  // Strip currency symbol and parse as float, e.g. "€49.50" → 49.5
  return parseFloat(value.replace(/[^0-9.]/g, '')) || 0
}

const MONTH_MAP: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
}

function parseDate(value: string): number {
  // Format: "04 jun 13:46"
  const parts = value.trim().split(' ')
  if (parts.length !== 3) return 0
  const [dayStr, monthStr, timeStr] = parts
  const day = parseInt(dayStr, 10)
  const month = MONTH_MAP[monthStr.toLowerCase()] ?? 0
  const [hours, minutes] = timeStr.split(':').map(Number)
  const now = new Date()
  return new Date(now.getFullYear(), month, day, hours, minutes).getTime()
}

const STATUS_ORDER: Record<string, number> = {
  Processing: 0,
  Pending: 1,
  Completed: 2,
  Cancelled: 3,
}

function compareOrders(a: Order, b: Order, key: SortKey): number {
  switch (key) {
    case 'name':
      return a.name.localeCompare(b.name)
    case 'status': {
      const aRank = STATUS_ORDER[a.status] ?? 99
      const bRank = STATUS_ORDER[b.status] ?? 99
      return aRank - bRank
    }
    case 'quantity':
      return parseQuantity(a.quantity) - parseQuantity(b.quantity)
    case 'date':
      return parseDate(a.date) - parseDate(b.date)
    case 'amount':
      return parseAmount(a.amount) - parseAmount(b.amount)
  }
}

/* ─── Column config ─────────────────────────────────────────────────── */

interface Column {
  key: SortKey
  label: string
  align?: 'left' | 'center' | 'right'
}

const COLUMNS: Column[] = [
  { key: 'name', label: 'Name', align: 'left' },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'quantity', label: 'Quantity', align: 'left' },
  { key: 'date', label: 'Date', align: 'left' },
  { key: 'amount', label: 'Amount', align: 'right' },
]

/* ─── Component ─────────────────────────────────────────────────────── */

export interface RecentOrdersTableProps {
  orders?: Order[]
  title?: string
  subtitle?: string
  className?: string
}

export default function RecentOrdersTable({
  orders = DEFAULT_ORDERS,
  title = 'Recent Orders',
  subtitle,
  className,
}: RecentOrdersTableProps) {
  const resolvedSubtitle = subtitle ?? `You have ${orders.length} recent orders`

  const [sortKey, setSortKey] = useState<SortKey>('date')
  const [sortDir, setSortDir] = useState<SortDirection>('asc')

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const sortedOrders = useMemo(() => {
    return [...orders].sort((a, b) => {
      const cmp = compareOrders(a, b, sortKey)
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [orders, sortKey, sortDir])

  return (
    <CardWrapper className={cn('flex flex-col gap-4 px-4 pt-4 pb-3', className)}>
      {/* Toolbar */}
      <div className="flex flex-col gap-0.5">
        <h2>{title}</h2>
        <p className="font-sans text-sm font-normal text-neutral-600">{resolvedSubtitle}</p>
      </div>

      {/* Scrollable table wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {COLUMNS.map((col, i) => {
                const isActive = col.key === sortKey
                const ariaSortValue = isActive
                  ? sortDir === 'asc'
                    ? 'ascending'
                    : 'descending'
                  : 'none'

                return (
                  <th
                    key={col.key}
                    scope="col"
                    aria-sort={ariaSortValue}
                    className={cn(
                      'h-11 px-3 first:pl-4 last:pr-4',
                      'bg-primary-100 font-sans text-xs font-medium whitespace-nowrap text-neutral-600',
                      col.align === 'center' && 'text-center',
                      col.align === 'right' && 'text-right',
                      !col.align && 'text-left',
                      i === 0 && 'rounded-l-lg'
                    )}
                  >
                    <button
                      type="button"
                      aria-label={`Sort by ${col.label}${isActive ? `, currently ${ariaSortValue}` : ''}`}
                      onClick={() => handleSort(col.key)}
                      className={cn(
                        'focus-visible:outline-primary-500 relative inline-flex h-full w-full items-center gap-1 pr-4 focus-visible:outline-2',
                        col.align === 'center' && 'justify-center',
                        col.align === 'right' && 'justify-end'
                      )}
                    >
                      <span>{col.label}</span>
                      <SortIndicator isActive={isActive} direction={sortDir} />
                    </button>
                  </th>
                )
              })}
              {/* Action column — no sort */}
              <th scope="col" className="bg-primary-100 w-12 rounded-r-lg pr-4">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {sortedOrders.map((order) => (
              <tr key={order.id} className="border-border-color border-b last:border-b-0">
                {/* Name cell */}
                <td className="py-3 pr-3 pl-4">
                  <div className="flex items-center gap-3">
                    <Avatar initials={order.initials} />
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <span className="text-primary-500 font-sans text-xs font-medium">
                        {order.orderNumber}
                      </span>
                      <span className="font-sans text-sm font-normal text-black">{order.name}</span>
                    </div>
                  </div>
                </td>

                {/* Status cell */}
                <td className="px-3 py-3 text-center">
                  <BadgeStatus status={order.status} />
                </td>

                {/* Quantity cell */}
                <td className="px-3 py-3">
                  <span className="font-sans text-sm font-normal text-black">{order.quantity}</span>
                </td>

                {/* Date cell */}
                <td className="px-3 py-3">
                  <span className="font-sans text-sm font-normal text-black capitalize">
                    {order.date}
                  </span>
                </td>

                {/* Amount cell */}
                <td className="px-3 py-3 text-right">
                  <span className="font-sans text-sm font-medium text-black">{order.amount}</span>
                </td>

                {/* Action cell */}
                <td className="py-3 pr-4 pl-3">
                  <button
                    type="button"
                    aria-label={`More actions for order ${order.orderNumber}`}
                    className="bg-primary-100 focus-visible:outline-primary-500 flex size-8 items-center justify-center rounded-full text-neutral-600 focus-visible:outline-2"
                  >
                    <EllipsisVertical aria-hidden="true" size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardWrapper>
  )
}

/* ─── SortIndicator ─────────────────────────────────────────────────── */

interface SortIndicatorProps {
  isActive: boolean
  direction: SortDirection
}

function SortIndicator({ isActive, direction }: SortIndicatorProps) {
  if (!isActive) {
    return (
      <ChevronsUpDown
        aria-hidden="true"
        size={14}
        className="absolute right-0 shrink-0 text-neutral-600"
      />
    )
  }
  if (direction === 'asc') {
    return (
      <ChevronUp
        aria-hidden="true"
        size={14}
        className="absolute right-0 shrink-0 text-neutral-600"
      />
    )
  }
  return (
    <ChevronDown
      aria-hidden="true"
      size={14}
      className="absolute right-0 shrink-0 text-neutral-600"
    />
  )
}

/* ─── Avatar (co-located — small enough to not warrant its own file) ── */

interface AvatarProps {
  initials: string
  className?: string
}

function Avatar({ initials, className }: AvatarProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'bg-primary-100 flex size-10 shrink-0 items-center justify-center rounded-full',
        className
      )}
    >
      <span className="text-primary-500 font-sans text-xs font-medium">{initials}</span>
    </div>
  )
}
