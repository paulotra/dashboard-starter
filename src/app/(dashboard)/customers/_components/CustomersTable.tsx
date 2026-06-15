'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { EllipsisVertical } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SAMPLE_CUSTOMERS, compareCustomers } from '@/lib/customers'
import type { Customer, CustomerSortKey, CustomerStatus, SortDirection } from '@/lib/customers'
import CardWrapper from '@/components/ui/CardWrapper'
import Avatar from '@/components/ui/Avatar'
import BadgeStatus from '@/components/ui/BadgeStatus'
import type { BadgeVariant } from '@/components/ui/BadgeStatus'
import FilterChip from '@/components/ui/FilterChip'
import SortIndicator from '@/components/ui/SortIndicator'
import TableSearch from '@/components/form/TableSearch'
import Pagination from '@/components/ui/Pagination'

/* ─── Status → variant map ───────────────────────────────────────────── */

const CUSTOMER_STATUS_VARIANT: Record<CustomerStatus, BadgeVariant> = {
  Activated: 'success',
  Deactivated: 'danger',
  'Invite Sent': 'info',
  Expired: 'warning',
}

/* ─── Column config ──────────────────────────────────────────────────── */

interface Column {
  key: CustomerSortKey
  label: string
  align?: 'left' | 'center' | 'right'
  minWidth?: string
}

const COLUMNS: Column[] = [
  { key: 'name', label: 'Customer', align: 'left', minWidth: 'min-w-40' },
  { key: 'location', label: 'Location', align: 'left', minWidth: 'min-w-72' },
  { key: 'status', label: 'Status', align: 'center', minWidth: 'min-w-28' },
  { key: 'orders', label: 'Orders', align: 'right', minWidth: 'min-w-20' },
  { key: 'totalSpent', label: 'Total Spent', align: 'right', minWidth: 'min-w-24' },
]

/* ─── Props ──────────────────────────────────────────────────────────── */

export interface CustomersTableProps {
  customers?: Customer[]
  title?: string
  pageSize?: number
  className?: string
}

/* ─── Component ──────────────────────────────────────────────────────── */

export default function CustomersTable({
  customers = SAMPLE_CUSTOMERS,
  title = 'Customers',
  pageSize = 10,
  className,
}: CustomersTableProps) {
  /* ── Derive unique status filters from data ── */
  const allStatusFilters = useMemo<CustomerStatus[]>(() => {
    const seen = new Set<CustomerStatus>()
    customers.forEach((c) => seen.add(c.status))
    // Sort by the STATUS_ORDER defined in customers.ts: Activated → Deactivated → Invite Sent → Expired
    const order: CustomerStatus[] = ['Activated', 'Deactivated', 'Invite Sent', 'Expired']
    return order.filter((s) => seen.has(s))
  }, [customers])

  /* ── UI state ── */
  const [activeFilters, setActiveFilters] = useState<Set<CustomerStatus>>(new Set())
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<CustomerSortKey>('name')
  const [sortDir, setSortDir] = useState<SortDirection>('asc')
  const [currentPage, setCurrentPage] = useState(1)

  /* ── Derived data ── */
  const filteredCustomers = useMemo(() => {
    const q = search.trim().toLowerCase()
    return customers.filter((customer) => {
      const matchesStatus =
        activeFilters.size === 0 || activeFilters.has(customer.status)
      const matchesSearch =
        q === '' ||
        customer.name.toLowerCase().includes(q) ||
        customer.location.toLowerCase().includes(q)
      return matchesStatus && matchesSearch
    })
  }, [customers, activeFilters, search])

  const sortedCustomers = useMemo(() => {
    return [...filteredCustomers].sort((a, b) => {
      const cmp = compareCustomers(a, b, sortKey)
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [filteredCustomers, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(sortedCustomers.length / pageSize))

  const pagedCustomers = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return sortedCustomers.slice(start, start + pageSize)
  }, [sortedCustomers, currentPage, pageSize])

  const showingFrom = sortedCustomers.length === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const showingTo = Math.min(currentPage * pageSize, sortedCustomers.length)

  /* ── Handlers ── */
  function handleSort(key: CustomerSortKey) {
    if (key === sortKey) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
    setCurrentPage(1)
  }

  function toggleFilter(status: CustomerStatus) {
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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: title + subtitle */}
        <div className="flex flex-col gap-0.5">
          <h2>{title}</h2>
          <p className="font-sans text-sm font-normal text-neutral-600">
            {customers.length} total customers
          </p>
        </div>

        {/* Right: filters + search */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Filter chips — derived from data */}
          <div className="flex items-center gap-1.5" role="group" aria-label="Filter by status">
            {allStatusFilters.map((status) => (
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
            placeholder="Search customer…"
            label="Search customers"
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
            {pagedCustomers.length === 0 ? (
              <tr>
                <td
                  colSpan={COLUMNS.length + 1}
                  className="py-10 text-center font-sans text-sm text-neutral-600"
                >
                  No customers match your search or filters.
                </td>
              </tr>
            ) : (
              pagedCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-border-color h-14 border-b last:border-b-0"
                >
                  {/* Customer cell — avatar + name */}
                  <td className="py-3 pr-3 pl-4">
                    <Link
                      href={`/customers/${customer.id}`}
                      className="focus-visible:outline-primary-500 group inline-flex items-center gap-3 rounded-lg focus-visible:outline-2"
                    >
                      <Avatar initials={customer.initials} />
                      <span className="font-sans text-sm font-medium text-black group-hover:text-primary-500">
                        {customer.name}
                      </span>
                    </Link>
                  </td>

                  {/* Location cell */}
                  <td className="px-3 py-3">
                    <span className="font-sans text-sm font-normal text-black">
                      {customer.location}
                    </span>
                  </td>

                  {/* Status cell */}
                  <td className="px-3 py-3 text-center">
                    <BadgeStatus variant={CUSTOMER_STATUS_VARIANT[customer.status]}>
                      {customer.status}
                    </BadgeStatus>
                  </td>

                  {/* Orders cell */}
                  <td className="px-3 py-3 text-right">
                    <span className="font-sans text-sm font-normal text-black">
                      {customer.orders}
                    </span>
                  </td>

                  {/* Total Spent cell */}
                  <td className="px-3 py-3 text-right">
                    <span className="font-sans text-sm font-medium text-black">
                      {customer.totalSpent}
                    </span>
                  </td>

                  {/* Action cell */}
                  <td className="py-3 pr-4 pl-3">
                    <button
                      type="button"
                      aria-label={`More actions for customer ${customer.name}`}
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
          Showing {showingFrom}–{showingTo} of {sortedCustomers.length} results
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
