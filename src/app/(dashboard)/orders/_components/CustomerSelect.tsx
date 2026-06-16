'use client'

import { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SAMPLE_CUSTOMERS } from '@/lib/customers'
import type { Customer } from '@/lib/customers'
import CardWrapper from '@/components/ui/CardWrapper'
import Avatar from '@/components/ui/Avatar'

export interface CustomerSelectProps {
  value: Customer | null
  onChange: (customer: Customer | null) => void
  customers?: Customer[]
  className?: string
}

export default function CustomerSelect({
  value,
  onChange,
  customers = SAMPLE_CUSTOMERS,
  className,
}: CustomerSelectProps) {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return customers.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 6)
  }, [customers, query])

  return (
    <CardWrapper className={cn('flex flex-col gap-4 px-4 pt-4 pb-5', className)}>
      <span className="font-sans text-sm font-medium text-black">Select Customer</span>

      {/* Search */}
      <div className="focus-within:outline-primary-500 flex h-9 items-center gap-2 rounded-lg border border-neutral-400 px-3 focus-within:outline-2">
        <Search aria-hidden="true" size={16} className="shrink-0 text-neutral-600" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search customer…"
          aria-label="Search customer"
          className="w-full bg-transparent font-sans text-sm text-black placeholder:text-neutral-600 focus:outline-none"
        />
      </div>

      {value ? (
        /* Selected customer chip */
        <div className="bg-primary-100 flex items-center justify-between gap-3 rounded-xl px-4 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="bg-primary-500 flex size-10 shrink-0 items-center justify-center rounded-full">
              <span className="font-sans text-sm font-medium text-white">{value.initials}</span>
            </div>
            <span className="truncate font-sans text-sm font-medium text-black">{value.name}</span>
          </div>
          <button
            type="button"
            onClick={() => onChange(null)}
            aria-label={`Remove ${value.name}`}
            className="focus-visible:outline-primary-500 shrink-0 cursor-pointer rounded text-neutral-600 hover:text-black focus-visible:outline-2"
          >
            <X aria-hidden="true" size={18} />
          </button>
        </div>
      ) : results.length > 0 ? (
        /* Search results */
        <ul className="flex flex-col gap-1">
          {results.map((customer) => (
            <li key={customer.id}>
              <button
                type="button"
                onClick={() => {
                  onChange(customer)
                  setQuery('')
                }}
                className="hover:bg-primary-100 focus-visible:outline-primary-500 flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2 focus-visible:outline-2"
              >
                <Avatar initials={customer.initials} />
                <span className="truncate font-sans text-sm font-medium text-black">
                  {customer.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : query ? (
        <p className="font-sans text-sm font-normal text-neutral-600">No customers found.</p>
      ) : null}
    </CardWrapper>
  )
}
