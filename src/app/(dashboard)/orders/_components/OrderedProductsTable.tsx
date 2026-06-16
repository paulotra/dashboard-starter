import Image from 'next/image'
import { cn } from '@/lib/utils'
import { getOrderProductsTotals } from '@/lib/products'
import type { OrderProduct } from '@/lib/products'

/* ─── Column config ──────────────────────────────────────────────────────
 * This table intentionally diverges from OrdersTable / ProductsTable: no
 * header fill and no row dividers — a clean, borderless "airy" list per the
 * Ordered Products design. Quantity is centered; Price is right-aligned.
 * ----------------------------------------------------------------------- */

interface Column {
  key: keyof OrderProduct | 'product'
  label: string
  align: 'left' | 'center' | 'right'
  /** Fixed-ish width for the secondary columns; Product flexes to fill. */
  width?: string
}

const COLUMNS: Column[] = [
  { key: 'product', label: 'Product', align: 'left' },
  { key: 'category', label: 'Category', align: 'left', width: 'w-36' },
  { key: 'quantity', label: 'Quantity', align: 'center', width: 'w-40' },
  { key: 'price', label: 'Price', align: 'right', width: 'w-36' },
]

const alignText = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const

/* ─── Props ──────────────────────────────────────────────────────────── */

export interface OrderedProductsTableProps {
  products: OrderProduct[]
  className?: string
}

/* ─── Component ──────────────────────────────────────────────────────── */

export default function OrderedProductsTable({ products, className }: OrderedProductsTableProps) {
  const totals = getOrderProductsTotals(products)

  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full border-collapse border-separate border-spacing-y-2">
        <thead>
          <tr className="shadow-card">
            {COLUMNS.map((col, i) => (
              <th
                key={col.key}
                scope="col"
                className={cn(
                  'h-11 bg-white px-3 font-sans text-xs font-medium whitespace-nowrap text-neutral-600',
                  alignText[col.align],
                  col.width,
                  i === 0 && 'rounded-l-lg pl-4',
                  i === COLUMNS.length - 1 && 'rounded-r-lg pr-4'
                )}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr className="shadow-card">
              <td
                colSpan={COLUMNS.length}
                className="py-10 text-center font-sans text-sm text-neutral-600"
              >
                No products in this order.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id}>
                {/* Product cell: thumbnail + name */}
                <td className="rounded-l-lg bg-white px-2 py-2">
                  <div className="flex items-center gap-3">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={80}
                        height={80}
                        className="bg-primary-100 size-20 shrink-0 rounded object-cover"
                      />
                    ) : (
                      <div className="bg-primary-100 size-20 shrink-0 rounded" aria-hidden="true" />
                    )}
                    <span className="font-sans text-sm font-medium text-black">{product.name}</span>
                  </div>
                </td>

                {/* Category cell */}
                <td className="bg-white px-3 py-2 text-left">
                  <span className="font-sans text-sm font-normal text-black">
                    {product.category}
                  </span>
                </td>

                {/* Quantity cell — centered */}
                <td className="bg-white px-3 py-2 text-center">
                  <span className="font-sans text-sm font-normal text-black">
                    {product.quantity}
                  </span>
                </td>

                {/* Price cell — right-aligned */}
                <td className="rounded-r-lg bg-white py-2 pr-4 pl-3 text-right">
                  <span className="font-sans text-sm font-medium text-black">{product.price}</span>
                </td>
              </tr>
            ))
          )}
        </tbody>

        {products.length > 0 && (
          <tfoot>
            <tr className="shadow-card">
              <th
                scope="row"
                className="rounded-l-lg bg-white py-5 pr-3 pl-4 text-left font-sans text-sm font-medium text-black"
              >
                Total
              </th>
              <td aria-hidden="true" className="bg-white" />
              <td className="text-primary-500 bg-white px-3 py-5 text-center font-sans text-sm font-bold">
                {totals.quantity}
              </td>
              <td className="text-primary-500 rounded-r-lg bg-white py-5 pr-4 pl-3 text-right font-sans text-sm font-bold">
                {totals.price}
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  )
}
