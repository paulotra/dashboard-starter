'use client'

import { useState, useMemo } from 'react'
import { EllipsisVertical } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SAMPLE_ORDERS, compareOrders } from '@/lib/orders'
import type { Order, SortKey, SortDirection } from '@/lib/orders'
import CardWrapper from '@/components/ui/CardWrapper'
import Avatar from '@/components/ui/Avatar'
import BadgeStatus from '@/components/ui/BadgeStatus'
import type { BadgeStatusProps } from '@/components/ui/BadgeStatus'
import FilterChip from '@/components/ui/FilterChip'
import SortIndicator from '@/components/ui/SortIndicator'
import TableSearch from '@/components/form/TableSearch'
import Pagination from '@/components/ui/Pagination'

/* ─── Types ──────────────────────────────────────────────────────────── */

type StatusFilter = NonNullable<BadgeStatusProps['status']>

const ALL_STATUS_FILTERS: StatusFilter[] = ['Pending', 'Processing', 'Cancelled', 'Completed']

/* ─── Column config ──────────────────────────────────────────────────── */

interface Column {
  key: SortKey
  label: string
  align?: 'left' | 'center' | 'right'
  /** Minimum width class to prevent columns squishing on narrower viewports */
  minWidth?: string
}

const COLUMNS: Column[] = [
  { key: 'name', label: 'Customer', align: 'left', minWidth: 'min-w-40' },
  { key: 'orderNumber', label: 'Order #', align: 'left', minWidth: 'min-w-24' },
  { key: 'status', label: 'Status', align: 'center', minWidth: 'min-w-28' },
  { key: 'quantity', label: 'Quantity', align: 'left', minWidth: 'min-w-24' },
  { key: 'date', label: 'Order Date', align: 'left', minWidth: 'min-w-32' },
  { key: 'amount', label: 'Amount', align: 'right', minWidth: 'min-w-24' },
]

/* ─── Props ──────────────────────────────────────────────────────────── */

export interface OrdersTableProps {
  orders?: Order[]
  title?: string
  pageSize?: number
  className?: string
}

/* ─── Component ──────────────────────────────────────────────────────── */

export default function OrdersTable({
  orders = SAMPLE_ORDERS,
  title = 'Recent Orders',
  pageSize = 15,
  className,
}: OrdersTableProps) {
  /* ── UI state ── */
  const [activeFilters, setActiveFilters] = useState<Set<StatusFilter>>(new Set())
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('orderNumber')
  const [sortDir, setSortDir] = useState<SortDirection>('asc')
  const [currentPage, setCurrentPage] = useState(1)

  /* ── Derived data ── */
  const filteredOrders = useMemo(() => {
    const q = search.trim().toLowerCase()
    return orders.filter((order) => {
      const matchesStatus =
        activeFilters.size === 0 || activeFilters.has(order.status as StatusFilter)
      const matchesSearch =
        q === '' ||
        order.name.toLowerCase().includes(q) ||
        order.orderNumber.toLowerCase().includes(q)
      return matchesStatus && matchesSearch
    })
  }, [orders, activeFilters, search])

  const sortedOrders = useMemo(() => {
    return [...filteredOrders].sort((a, b) => {
      const cmp = compareOrders(a, b, sortKey)
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [filteredOrders, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(sortedOrders.length / pageSize))

  const pagedOrders = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return sortedOrders.slice(start, start + pageSize)
  }, [sortedOrders, currentPage, pageSize])

  const showingFrom = sortedOrders.length === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const showingTo = Math.min(currentPage * pageSize, sortedOrders.length)

  /* ── Handlers ── */
  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
    setCurrentPage(1)
  }

  function toggleFilter(status: StatusFilter) {
    setActiveFilters((prev) => {
      const next = new Set(prev)
      if (next.has(status)) {
        next.delete(status)
      } else {
        next.add(status)
      }
      return next
    })
    setCurrentPage(1)
  }

  function handleSearch(value: string) {
    setSearch(value)
    setCurrentPage(1)
  }

  function handlePageChange(page: number) {
    setCurrentPage(page)
  }

  return (
    <CardWrapper className={cn('flex flex-col gap-4 px-4 pt-4 pb-3', className)}>
      {/* ── Toolbar ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        {/* Left: title + subtitle */}
        <div className="flex flex-col gap-0.5">
          <h2>{title}</h2>
          <p className="font-sans text-sm font-normal text-neutral-600">
            {orders.length} total orders
          </p>
        </div>

        {/* Right: filters + search */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Filter chips */}
          <div className="flex items-center gap-1.5" role="group" aria-label="Filter by status">
            {ALL_STATUS_FILTERS.map((status) => (
              <FilterChip
                key={status}
                active={activeFilters.has(status)}
                onClick={() => toggleFilter(status)}
              >
                {status}
              </FilterChip>
            ))}
          </div>

          {/* Divider */}
          <div className="bg-border-color h-6 w-px" aria-hidden="true" />

          {/* Search */}
          <TableSearch
            value={search}
            onChange={handleSearch}
            placeholder="Search order…"
            label="Search orders"
          />
        </div>
      </div>

      {/* ── Scrollable table ── */}
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
                      'h-11 px-3 first:pl-4',
                      'bg-primary-100 font-sans text-xs font-medium whitespace-nowrap text-neutral-600',
                      col.align === 'center' && 'text-center',
                      col.align === 'right' && 'text-right',
                      !col.align && 'text-left',
                      col.minWidth,
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
            {pagedOrders.length === 0 ? (
              <tr>
                <td
                  colSpan={COLUMNS.length + 1}
                  className="py-10 text-center font-sans text-sm text-neutral-600"
                >
                  No orders match your search or filters.
                </td>
              </tr>
            ) : (
              pagedOrders.map((order) => (
                <tr key={order.id} className="border-border-color h-16 border-b last:border-b-0">
                  {/* Customer cell — avatar + name only */}
                  <td className="py-3 pr-3 pl-4">
                    <div className="flex items-center gap-3">
                      <Avatar initials={order.initials} />
                      <span className="font-sans text-sm font-normal text-black">{order.name}</span>
                    </div>
                  </td>

                  {/* Order # cell */}
                  <td className="px-3 py-3">
                    <span className="text-primary-500 font-sans text-sm font-medium">
                      {order.orderNumber}
                    </span>
                  </td>

                  {/* Status cell */}
                  <td className="px-3 py-3 text-center">
                    <BadgeStatus status={order.status} />
                  </td>

                  {/* Quantity cell */}
                  <td className="px-3 py-3">
                    <span className="font-sans text-sm font-normal text-black">
                      {order.quantity}
                    </span>
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
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Footer ── */}
      <div className="flex items-center justify-between">
        <p className="font-sans text-xs font-normal text-black">
          Showing {showingFrom}–{showingTo} of {sortedOrders.length} results
        </p>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </CardWrapper>
  )
}
