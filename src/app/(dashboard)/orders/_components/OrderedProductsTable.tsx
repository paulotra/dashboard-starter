import Image from 'next/image'
import { cn } from '@/lib/utils'
import { getOrderProductsTotals } from '@/lib/products'
import type { OrderProduct } from '@/lib/products'

/* ─── Column config ──────────────────────────────────────────────────── */

interface Column {
  key: keyof OrderProduct | 'product'
  label: string
  align: 'left' | 'right'
  minWidth: string
}

const COLUMNS: Column[] = [
  { key: 'product', label: 'Product', align: 'left', minWidth: 'min-w-56' },
  { key: 'category', label: 'Category', align: 'left', minWidth: 'min-w-28' },
  { key: 'quantity', label: 'Quantity', align: 'right', minWidth: 'min-w-24' },
  { key: 'price', label: 'Price', align: 'right', minWidth: 'min-w-24' },
]

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
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {COLUMNS.map((col, i) => (
              <th
                key={col.key}
                scope="col"
                className={cn(
                  'h-11 px-3',
                  'bg-primary-100 font-sans text-xs font-medium whitespace-nowrap text-neutral-600',
                  col.align === 'right' ? 'text-right' : 'text-left',
                  col.minWidth,
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
            <tr>
              <td
                colSpan={COLUMNS.length}
                className="py-10 text-center font-sans text-sm text-neutral-600"
              >
                No products in this order.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id} className="border-border-color h-20 border-b last:border-b-0">
                {/* Product cell: thumbnail + name */}
                <td className="py-3 pr-3 pl-4">
                  <div className="flex items-center gap-3">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={56}
                        height={56}
                        className="bg-primary-100 size-14 shrink-0 rounded-lg object-cover"
                      />
                    ) : (
                      <div
                        className="bg-primary-100 size-14 shrink-0 rounded-lg"
                        aria-hidden="true"
                      />
                    )}
                    <span className="font-sans text-sm font-medium text-black">{product.name}</span>
                  </div>
                </td>

                {/* Category cell */}
                <td className="px-3 py-3">
                  <span className="font-sans text-sm font-normal text-black">
                    {product.category}
                  </span>
                </td>

                {/* Quantity cell */}
                <td className="px-3 py-3 text-right">
                  <span className="font-sans text-sm font-normal text-black">
                    {product.quantity}
                  </span>
                </td>

                {/* Price cell */}
                <td className="py-3 pr-4 pl-3 text-right">
                  <span className="font-sans text-sm font-medium text-black">{product.price}</span>
                </td>
              </tr>
            ))
          )}
        </tbody>

        {products.length > 0 && (
          <tfoot>
            <tr>
              <th scope="row" className="py-4 pr-3 pl-4 text-left font-sans text-sm font-medium text-black">
                Total
              </th>
              <td aria-hidden="true" />
              <td className="text-primary-500 px-3 py-4 text-right font-sans text-sm font-medium">
                {totals.quantity}
              </td>
              <td className="text-primary-500 py-4 pr-4 pl-3 text-right font-sans text-sm font-medium">
                {totals.price}
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  )
}
