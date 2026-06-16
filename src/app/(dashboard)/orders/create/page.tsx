'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { parseAmount } from '@/lib/numbers'
import { SAMPLE_PRODUCTS } from '@/lib/products'
import type { Customer } from '@/lib/customers'
import CardWrapper from '@/components/ui/CardWrapper'
import CreateOrderHeader from '../_components/CreateOrderHeader'
import CustomerSelect from '../_components/CustomerSelect'
import SelectProductsTable from '../_components/SelectProductsTable'
import CreateOrderSummary from '../_components/CreateOrderSummary'

const VAT_RATE = 0.09
const SHIPPING_FLAT = 4.95
const formatEuro = (n: number) => `€ ${n.toFixed(2)}`

export default function CreateOrderPage() {
  const router = useRouter()
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [note, setNote] = useState('')
  const [quantities, setQuantities] = useState<Record<string, number>>({})

  function handleQuantityChange(productId: string, quantity: number) {
    setQuantities((prev) => {
      const next = { ...prev }
      if (quantity <= 0) {
        delete next[productId]
      } else {
        next[productId] = quantity
      }
      return next
    })
  }

  // Live totals derived from the selected quantities.
  const { summary, itemCount } = useMemo(() => {
    const subtotal = SAMPLE_PRODUCTS.reduce(
      (sum, p) => sum + parseAmount(p.price) * (quantities[p.id] ?? 0),
      0
    )
    const count = Object.values(quantities).reduce((sum, q) => sum + q, 0)
    const vat = subtotal * VAT_RATE
    const shipping = count > 0 ? SHIPPING_FLAT : 0
    const grandTotal = subtotal + vat + shipping

    return {
      itemCount: count,
      summary: {
        subtotal: formatEuro(subtotal),
        vat: formatEuro(vat),
        shipping: formatEuro(shipping),
        grandTotal: formatEuro(grandTotal),
      },
    }
  }, [quantities])

  function handleCreate() {
    console.log('create order', { customerId: customer?.id, note, quantities })
    router.push('/orders')
  }

  return (
    <>
      <CreateOrderHeader />

      <div className="flex flex-col gap-3 lg:flex-row lg:items-start">
        {/* ── Product selection ── */}
        <CardWrapper className="w-full min-w-0 flex-1 px-4 pt-4 pb-3">
          <SelectProductsTable
            products={SAMPLE_PRODUCTS}
            quantities={quantities}
            onQuantityChange={handleQuantityChange}
          />
        </CardWrapper>

        {/* ── Right column ── */}
        <div className="flex w-full shrink-0 flex-col gap-3 lg:w-90">
          <CustomerSelect value={customer} onChange={setCustomer} />
          <CreateOrderSummary
            summary={summary}
            note={note}
            onNoteChange={setNote}
            onCreate={handleCreate}
            disabled={!customer || itemCount === 0}
          />
        </div>
      </div>
    </>
  )
}
