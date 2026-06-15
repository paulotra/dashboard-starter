'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { EllipsisVertical } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SAMPLE_PRODUCTS, compareProducts } from '@/lib/products'
import type { Product, ProductSortKey } from '@/lib/products'
import type { SortDirection } from '@/lib/orders'
import CardWrapper from '@/components/ui/CardWrapper'
import FilterChip from '@/components/ui/FilterChip'
import Switch from '@/components/ui/Switch'
import SortIndicator from '@/components/ui/SortIndicator'
import TableSearch from '@/components/form/TableSearch'
import Pagination from '@/components/ui/Pagination'

/* ─── Column config ──────────────────────────────────────────────────── */

interface Column {
  key: ProductSortKey
  label: string
  align?: 'left' | 'center' | 'right'
  minWidth?: string
}

const COLUMNS: Column[] = [
  { key: 'name', label: 'Product', align: 'left', minWidth: 'min-w-56' },
  { key: 'stock', label: 'Stock', align: 'left', minWidth: 'min-w-20' },
  { key: 'category', label: 'Category', align: 'left', minWidth: 'min-w-28' },
  { key: 'dateAdded', label: 'Date Added', align: 'left', minWidth: 'min-w-32' },
  { key: 'price', label: 'Price', align: 'right', minWidth: 'min-w-20' },
]

/* ─── Props ──────────────────────────────────────────────────────────── */

export interface ProductsTableProps {
  products?: Product[]
  title?: string
  pageSize?: number
  className?: string
}

/* ─── Component ──────────────────────────────────────────────────────── */

export default function ProductsTable({
  products = SAMPLE_PRODUCTS,
  title = 'Products',
  pageSize = 7,
  className,
}: ProductsTableProps) {
  /* ── Derive unique categories from data (no hardcoding) ── */
  const allCategories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))).sort(),
    [products]
  )

  /* ── UI state ── */
  // Each product's active state tracked locally by id
  const [activeStates, setActiveStates] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(products.map((p) => [p.id, p.active]))
  )
  // null = no status filter; true = Active only; false = Inactive only
  const [statusFilter, setStatusFilter] = useState<boolean | null>(null)
  const [categoryFilters, setCategoryFilters] = useState<Set<string>>(new Set())
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<ProductSortKey>('name')
  const [sortDir, setSortDir] = useState<SortDirection>('asc')
  const [currentPage, setCurrentPage] = useState(1)

  /* ── Handlers ── */
  function handleToggle(id: string, checked: boolean) {
    setActiveStates((prev) => ({ ...prev, [id]: checked }))
  }

  function handleStatusFilter(value: boolean) {
    setStatusFilter((prev) => (prev === value ? null : value))
    setCurrentPage(1)
  }

  function handleCategoryFilter(category: string) {
    setCategoryFilters((prev) => {
      const next = new Set(prev)
      if (next.has(category)) {
        next.delete(category)
      } else {
        next.add(category)
      }
      return next
    })
    setCurrentPage(1)
  }

  function handleSearch(value: string) {
    setSearch(value)
    setCurrentPage(1)
  }

  function handleSort(key: ProductSortKey) {
    if (key === sortKey) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
    setCurrentPage(1)
  }

  function handlePageChange(page: number) {
    setCurrentPage(page)
  }

  /* ── Derived data ── */
  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase()
    return products.filter((product) => {
      const currentActive = activeStates[product.id] ?? product.active

      const matchesStatus = statusFilter === null || currentActive === statusFilter

      const matchesCategory =
        categoryFilters.size === 0 || categoryFilters.has(product.category)

      const matchesSearch = q === '' || product.name.toLowerCase().includes(q)

      return matchesStatus && matchesCategory && matchesSearch
    })
  }, [products, activeStates, statusFilter, categoryFilters, search])

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      const cmp = compareProducts(a, b, sortKey)
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [filteredProducts, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / pageSize))

  const pagedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return sortedProducts.slice(start, start + pageSize)
  }, [sortedProducts, currentPage, pageSize])

  const showingFrom = sortedProducts.length === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const showingTo = Math.min(currentPage * pageSize, sortedProducts.length)

  return (
    <CardWrapper className={cn('flex flex-col gap-4 px-4 pt-4 pb-3', className)}>
      {/* ── Toolbar ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: title + subtitle */}
        <div className="flex flex-col gap-0.5">
          <h2>{title}</h2>
          <p className="font-sans text-sm font-normal text-neutral-600">
            {products.length} total products
          </p>
        </div>

        {/* Right: filters + search */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status filter chips */}
          <div className="flex items-center gap-1.5" role="group" aria-label="Filter by status">
            <FilterChip active={statusFilter === true} onClick={() => handleStatusFilter(true)}>
              Active
            </FilterChip>
            <FilterChip active={statusFilter === false} onClick={() => handleStatusFilter(false)}>
              Inactive
            </FilterChip>
          </div>

          {/* Divider */}
          <div className="bg-border-color h-6 w-px" aria-hidden="true" />

          {/* Category filter chips */}
          <div className="flex items-center gap-1.5" role="group" aria-label="Filter by category">
            {allCategories.map((category) => (
              <FilterChip
                key={category}
                active={categoryFilters.has(category)}
                onClick={() => handleCategoryFilter(category)}
              >
                {category}
              </FilterChip>
            ))}
          </div>

          {/* Divider */}
          <div className="bg-border-color h-6 w-px" aria-hidden="true" />

          {/* Search */}
          <TableSearch
            value={search}
            onChange={handleSearch}
            placeholder="Search product…"
            label="Search products"
          />
        </div>
      </div>

      {/* ── Scrollable table ── */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {/* Toggle column — not sortable */}
              <th
                scope="col"
                className="bg-primary-100 h-11 w-15 rounded-l-lg px-3 text-center font-sans text-xs font-medium whitespace-nowrap text-neutral-600"
              >
                <span className="sr-only">Active</span>
              </th>

              {/* Sortable columns */}
              {COLUMNS.map((col) => {
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
                      'h-11 px-3',
                      'bg-primary-100 text-left font-sans text-xs font-medium whitespace-nowrap text-neutral-600',
                      col.align === 'right' && 'text-right',
                      col.minWidth
                    )}
                  >
                    <button
                      type="button"
                      aria-label={`Sort by ${col.label}${isActive ? `, currently ${ariaSortValue}` : ''}`}
                      onClick={() => handleSort(col.key)}
                      className={cn(
                        'focus-visible:outline-primary-500 relative inline-flex h-full w-full items-center gap-1 pr-4 focus-visible:outline-2',
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
            {pagedProducts.length === 0 ? (
              <tr>
                <td
                  colSpan={COLUMNS.length + 2}
                  className="py-10 text-center font-sans text-sm text-neutral-600"
                >
                  No products match your search or filters.
                </td>
              </tr>
            ) : (
              pagedProducts.map((product) => {
                const isActive = activeStates[product.id] ?? product.active
                return (
                  <tr
                    key={product.id}
                    className="border-border-color h-20 border-b last:border-b-0"
                  >
                    {/* Toggle cell */}
                    <td className="py-3 pl-3 text-center">
                      <Switch
                        checked={isActive}
                        onChange={(checked) => handleToggle(product.id, checked)}
                        aria-label={`Toggle ${product.name}`}
                      />
                    </td>

                    {/* Product cell: thumbnail + name */}
                    <td className="py-3 pr-3 pl-3">
                      <div className="flex items-center gap-3">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={80}
                          height={80}
                          className="bg-primary-100 size-20 shrink-0 rounded-xl object-cover"
                        />
                        <span className="font-sans text-sm font-medium text-black">
                          {product.name}
                        </span>
                      </div>
                    </td>

                    {/* Stock cell */}
                    <td className="px-3 py-3">
                      <span className="font-sans text-sm font-normal text-black">
                        {product.stock}
                      </span>
                    </td>

                    {/* Category cell */}
                    <td className="px-3 py-3">
                      <span className="font-sans text-sm font-normal text-black">
                        {product.category}
                      </span>
                    </td>

                    {/* Date Added cell */}
                    <td className="px-3 py-3">
                      <span className="font-sans text-sm font-normal text-black">
                        {product.dateAdded}
                      </span>
                    </td>

                    {/* Price cell */}
                    <td className="px-3 py-3 text-right">
                      <span className="font-sans text-sm font-medium text-black">
                        {product.price}
                      </span>
                    </td>

                    {/* Action cell */}
                    <td className="py-3 pr-4 pl-3">
                      <button
                        type="button"
                        aria-label={`More actions for ${product.name}`}
                        className="bg-primary-100 focus-visible:outline-primary-500 flex size-8 items-center justify-center rounded-full text-neutral-600 focus-visible:outline-2"
                      >
                        <EllipsisVertical aria-hidden="true" size={14} />
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── Footer ── */}
      <div className="flex items-center justify-between">
        <p className="font-sans text-xs font-normal text-black">
          Showing {showingFrom}–{showingTo} of {sortedProducts.length} results
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
