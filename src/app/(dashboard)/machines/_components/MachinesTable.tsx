'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { EllipsisVertical } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SAMPLE_MACHINES, compareMachines } from '@/lib/machines'
import type { Machine, MachineSortKey } from '@/lib/machines'
import type { SortDirection } from '@/lib/orders'
import CardWrapper from '@/components/ui/CardWrapper'
import FilterChip from '@/components/ui/FilterChip'
import Switch from '@/components/ui/Switch'
import SortIndicator from '@/components/ui/SortIndicator'
import TableSearch from '@/components/form/TableSearch'

/* ─── Column config ──────────────────────────────────────────────────── */

interface Column {
  key: MachineSortKey
  label: string
  minWidth?: string
}

const COLUMNS: Column[] = [
  { key: 'name', label: 'Machine', minWidth: 'min-w-64' },
  { key: 'category', label: 'Category', minWidth: 'min-w-36' },
  { key: 'lastMaintenance', label: 'Last maintenance', minWidth: 'min-w-36' },
  { key: 'dateAdded', label: 'Date Added', minWidth: 'min-w-32' },
]

/* ─── Props ──────────────────────────────────────────────────────────── */

export interface MachinesTableProps {
  machines?: Machine[]
  title?: string
  className?: string
  /** Called with the clicked machine when a row is selected. */
  onMachineSelect?: (machine: Machine) => void
}

/* ─── Component ──────────────────────────────────────────────────────── */

export default function MachinesTable({
  machines = SAMPLE_MACHINES,
  title = 'Machines',
  className,
  onMachineSelect,
}: MachinesTableProps) {
  /* ── Derive unique categories from data (no hardcoding) ── */
  const allCategories = useMemo(
    () => Array.from(new Set(machines.map((m) => m.category))).sort(),
    [machines]
  )

  /* ── UI state ── */
  // Each machine's active state tracked locally by id
  const [activeStates, setActiveStates] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(machines.map((m) => [m.id, m.active]))
  )
  // null = no status filter; true = Active only; false = Inactive only
  const [statusFilter, setStatusFilter] = useState<boolean | null>(null)
  const [categoryFilters, setCategoryFilters] = useState<Set<string>>(new Set())
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<MachineSortKey>('name')
  const [sortDir, setSortDir] = useState<SortDirection>('asc')

  /* ── Handlers ── */
  function handleToggle(id: string, checked: boolean) {
    setActiveStates((prev) => ({ ...prev, [id]: checked }))
  }

  function handleStatusFilter(value: boolean) {
    setStatusFilter((prev) => (prev === value ? null : value))
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
  }

  function handleSearch(value: string) {
    setSearch(value)
  }

  function handleSort(key: MachineSortKey) {
    if (key === sortKey) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  /* ── Derived data ── */
  const filteredMachines = useMemo(() => {
    const q = search.trim().toLowerCase()
    return machines.filter((machine) => {
      const currentActive = activeStates[machine.id] ?? machine.active

      const matchesStatus = statusFilter === null || currentActive === statusFilter

      const matchesCategory = categoryFilters.size === 0 || categoryFilters.has(machine.category)

      const matchesSearch =
        q === '' ||
        machine.name.toLowerCase().includes(q) ||
        machine.serialNumber.toLowerCase().includes(q)

      return matchesStatus && matchesCategory && matchesSearch
    })
  }, [machines, activeStates, statusFilter, categoryFilters, search])

  const sortedMachines = useMemo(() => {
    return [...filteredMachines].sort((a, b) => {
      const cmp = compareMachines(a, b, sortKey)
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [filteredMachines, sortKey, sortDir])

  return (
    <CardWrapper className={cn('flex flex-col gap-4 px-4 pt-4 pb-3', className)}>
      {/* ── Toolbar ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: title + subtitle */}
        <div className="flex flex-col gap-0.5">
          <h2>{title}</h2>
          <p className="font-sans text-sm font-normal text-neutral-600">
            {machines.length} total machines
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
            placeholder="Search machine…"
            label="Search machines"
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
                      col.minWidth
                    )}
                  >
                    <button
                      type="button"
                      aria-label={`Sort by ${col.label}${isActive ? `, currently ${ariaSortValue}` : ''}`}
                      onClick={() => handleSort(col.key)}
                      className="focus-visible:outline-primary-500 relative inline-flex h-full w-full items-center gap-1 pr-4 focus-visible:outline-2"
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
            {sortedMachines.length === 0 ? (
              <tr>
                <td
                  colSpan={COLUMNS.length + 2}
                  className="py-10 text-center font-sans text-sm text-neutral-600"
                >
                  No machines match your search or filters.
                </td>
              </tr>
            ) : (
              sortedMachines.map((machine) => {
                const isActive = activeStates[machine.id] ?? machine.active
                const isSelectable = Boolean(onMachineSelect)

                return (
                  <tr
                    key={machine.id}
                    onClick={isSelectable ? () => onMachineSelect!(machine) : undefined}
                    className={cn(
                      'border-border-color h-20 border-b last:border-b-0',
                      isSelectable && 'hover:bg-primary-100 cursor-pointer'
                    )}
                  >
                    {/* Toggle cell — stop propagation so row click isn't triggered */}
                    <td className="py-3 pl-3 text-center" onClick={(e) => e.stopPropagation()}>
                      <Switch
                        checked={isActive}
                        onChange={(checked) => handleToggle(machine.id, checked)}
                        aria-label={`Toggle ${machine.name}`}
                      />
                    </td>

                    {/* Machine cell: thumbnail + name + serial
                        The name is a <button> so keyboard users can reach and
                        activate the row preview without the row needing
                        role="button" (which conflicts with implicit role="row"). */}
                    <td className="py-3 pr-3 pl-3">
                      <div className="flex items-center gap-3">
                        <Image
                          src={machine.image}
                          alt={machine.name}
                          width={80}
                          height={80}
                          className="bg-primary-100 size-20 shrink-0 rounded-xl object-cover"
                        />
                        <div className="flex flex-col gap-0.5">
                          {isSelectable ? (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                onMachineSelect!(machine)
                              }}
                              className="focus-visible:outline-primary-500 text-left font-sans text-sm font-medium text-black focus-visible:outline-2"
                            >
                              {machine.name}
                            </button>
                          ) : (
                            <span className="font-sans text-sm font-medium text-black">
                              {machine.name}
                            </span>
                          )}
                          <span className="font-sans text-sm font-normal text-neutral-600">
                            Serial number : {machine.serialNumber}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category cell */}
                    <td className="px-3 py-3">
                      <span className="font-sans text-sm font-normal text-black">
                        {machine.category}
                      </span>
                    </td>

                    {/* Last maintenance cell */}
                    <td className="px-3 py-3">
                      <span className="font-sans text-sm font-normal text-black">
                        {machine.lastMaintenance}
                      </span>
                    </td>

                    {/* Date Added cell */}
                    <td className="px-3 py-3">
                      <span className="font-sans text-sm font-normal text-black">
                        {machine.dateAdded}
                      </span>
                    </td>

                    {/* Action cell — stop propagation so ⋮ button doesn't trigger row select */}
                    <td className="py-3 pr-4 pl-3" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        aria-label={`More actions for ${machine.name}`}
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
    </CardWrapper>
  )
}
