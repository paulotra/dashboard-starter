'use client'

import { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { DEFAULT_ORDERS, compareOrders } from '@/lib/orders'
import type { Order, SortKey, SortDirection } from '@/lib/orders'
import CardWrapper from '@/components/ui/CardWrapper'
import BadgeStatus from '@/components/ui/BadgeStatus'
import Avatar from '@/components/ui/Avatar'
import SortIndicator from '@/components/ui/SortIndicator'
import { EllipsisVertical } from 'lucide-react'

// Re-export so existing consumers keep working
export type { Order }
export { DEFAULT_ORDERS }

/* ─── Column config ─────────────────────────────────────────────────── */

type RecentSortKey = Extract<SortKey, 'name' | 'status' | 'quantity' | 'date' | 'amount'>

interface Column {
  key: RecentSortKey
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

  const [sortKey, setSortKey] = useState<RecentSortKey>('date')
  const [sortDir, setSortDir] = useState<SortDirection>('asc')

  function handleSort(key: RecentSortKey) {
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
