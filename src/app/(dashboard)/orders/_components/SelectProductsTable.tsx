'use client'

import { useMemo, useState } from 'react'
import { Search, Minus, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { parseAmount } from '@/lib/numbers'
import type { Product } from '@/lib/products'

const formatEuro = (n: number) => `€ ${n.toFixed(2)}`

export interface SelectProductsTableProps {
  products: Product[]
  /** Map of productId → quantity. Missing keys are treated as 0. */
  quantities: Record<string, number>
  onQuantityChange: (productId: string, quantity: number) => void
  className?: string
}

export default function SelectProductsTable({
  products,
  quantities,
  onQuantityChange,
  className,
}: SelectProductsTableProps) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return products
    return products.filter((p) => p.name.toLowerCase().includes(q))
  }, [products, query])

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {/* ── Toolbar ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-0.5">
          <h2>Select Products</h2>
          <p className="font-sans text-sm font-normal text-neutral-600">
            Select desired products for order.
          </p>
        </div>

        <div className="focus-within:outline-primary-500 flex h-10 items-center gap-2 rounded-lg border border-neutral-400 px-3 focus-within:outline-2 sm:w-64">
          <Search aria-hidden="true" size={16} className="shrink-0 text-neutral-600" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search product…"
            aria-label="Search product"
            className="w-full bg-transparent font-sans text-sm text-black placeholder:text-neutral-600 focus:outline-none"
          />
        </div>
      </div>

      {/* ── Table ── */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th
                scope="col"
                className="bg-primary-100 h-11 rounded-l-lg pr-3 pl-4 text-left font-sans text-xs font-medium text-neutral-600"
              >
                Product
              </th>
              <th
                scope="col"
                className="bg-primary-100 h-11 w-40 px-3 text-center font-sans text-xs font-medium text-neutral-600"
              >
                Quantity
              </th>
              <th
                scope="col"
                className="bg-primary-100 h-11 w-36 rounded-r-lg px-3 pr-4 text-right font-sans text-xs font-medium text-neutral-600"
              >
                Price
              </th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-10 text-center font-sans text-sm text-neutral-600">
                  No products found.
                </td>
              </tr>
            ) : (
              filtered.map((product) => {
                const qty = quantities[product.id] ?? 0
                const lineTotal = parseAmount(product.price) * qty
                const active = qty > 0

                return (
                  <tr key={product.id} className="border-border-color border-b last:border-b-0">
                    {/* Product name */}
                    <td className="py-2 pr-3 pl-4">
                      <span
                        className={cn(
                          'font-sans text-sm',
                          active ? 'text-primary-500 font-medium' : 'font-normal text-black'
                        )}
                      >
                        {product.name}
                      </span>
                    </td>

                    {/* Quantity stepper */}
                    <td className="px-3 py-2">
                      <div className="mx-auto flex h-9 w-24 items-center justify-between rounded-lg border border-neutral-400 px-2">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${product.name}`}
                          disabled={qty === 0}
                          onClick={() => onQuantityChange(product.id, Math.max(0, qty - 1))}
                          className="focus-visible:outline-primary-500 flex size-5 cursor-pointer items-center justify-center rounded text-black focus-visible:outline-2 disabled:cursor-not-allowed disabled:text-neutral-400"
                        >
                          <Minus aria-hidden="true" size={14} />
                        </button>
                        <span className="font-sans text-sm text-black tabular-nums">{qty}</span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${product.name}`}
                          onClick={() => onQuantityChange(product.id, qty + 1)}
                          className="focus-visible:outline-primary-500 flex size-5 cursor-pointer items-center justify-center rounded text-black focus-visible:outline-2"
                        >
                          <Plus aria-hidden="true" size={14} />
                        </button>
                      </div>
                    </td>

                    {/* Line total */}
                    <td className="px-3 py-2 pr-4 text-right">
                      <span
                        className={cn(
                          'font-sans text-sm',
                          active ? 'text-primary-500 font-medium' : 'font-normal text-black'
                        )}
                      >
                        {formatEuro(lineTotal)}
                      </span>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
