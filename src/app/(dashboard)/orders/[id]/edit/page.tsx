'use client'

import { useMemo, useState } from 'react'
import { useParams, useRouter, notFound } from 'next/navigation'
import { parseAmount } from '@/lib/numbers'
import { getOrderById } from '@/lib/orders'
import type { Order } from '@/lib/orders'
import { SAMPLE_PRODUCTS, SAMPLE_ORDER_PRODUCTS } from '@/lib/products'
import { SAMPLE_CUSTOMERS } from '@/lib/customers'
import CardWrapper from '@/components/ui/CardWrapper'
import EditOrderHeader from '../../_components/EditOrderHeader'
import OrderCustomerDetails from '../../_components/OrderCustomerDetails'
import SelectProductsTable from '../../_components/SelectProductsTable'
import CreateOrderSummary from '../../_components/CreateOrderSummary'

const VAT_RATE = 0.09
const SHIPPING_FLAT = 4.95
const formatEuro = (n: number) => `€ ${n.toFixed(2)}`

// Seed the form with the order's existing line items, matched to the product
// catalogue by name. (No order→product relation exists in the sample data.)
function seedQuantities(order?: Order): Record<string, number> {
  if (!order) return {}
  const map: Record<string, number> = {}
  for (const item of SAMPLE_ORDER_PRODUCTS) {
    const product = SAMPLE_PRODUCTS.find((p) => p.name === item.name)
    if (product) map[product.id] = item.quantity
  }
  return map
}

export default function EditOrderPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const order = getOrderById(params?.id ?? '')
  const customer = order ? SAMPLE_CUSTOMERS.find((c) => c.name === order.name) : undefined

  const [quantities, setQuantities] = useState<Record<string, number>>(() => seedQuantities(order))
  const [note, setNote] = useState('')

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

  if (!order) {
    notFound()
  }

  const email = `${order.name.toLowerCase().split(' ')[0]}@gmail.com`

  const handleUpdate = () => {
    console.log('update order', { orderId: order.id, note, quantities })
    router.push(`/orders/${order.id}`)
  }

  return (
    <>
      <EditOrderHeader orderNumber={order.orderNumber} />

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
          {/* Customer is fixed when editing an order — read-only details. */}
          <OrderCustomerDetails
            name={order.name}
            email={email}
            contactNumber={customer?.contactNumber ?? '—'}
            address={customer?.location ?? '—'}
            customerHref={customer ? `/customers/${customer.id}` : undefined}
          />
          <CreateOrderSummary
            summary={summary}
            note={note}
            onNoteChange={setNote}
            onCreate={handleUpdate}
            submitLabel="Update Order"
            orderDetails={{
              orderNumber: order.orderNumber,
              status: order.status,
              orderDate: order.date,
              quantity: itemCount,
            }}
            disabled={itemCount === 0}
          />
        </div>
      </div>
    </>
  )
}
