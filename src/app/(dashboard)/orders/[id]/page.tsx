import { notFound } from 'next/navigation'
import { getOrderById } from '@/lib/orders'
import { parseAmount } from '@/lib/numbers'
import { SAMPLE_CUSTOMERS } from '@/lib/customers'
import { SAMPLE_ORDER_PRODUCTS } from '@/lib/products'
import CardWrapper from '@/components/ui/CardWrapper'
import OrderDetailHeader from '../_components/OrderDetailHeader'
import OrderCustomerDetails from '../_components/OrderCustomerDetails'
import OrderDetailsCard from '../_components/OrderDetailsCard'
import OrderCancellation from '../_components/OrderCancellation'
import OrderedProductsTable from '../_components/OrderedProductsTable'

const formatEuro = (n: number) => `€ ${n.toFixed(2)}`

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const order = getOrderById(id)

  if (!order) {
    notFound()
  }

  // Reuse the customers dataset for the linked customer's contact info.
  const customer = SAMPLE_CUSTOMERS.find((c) => c.name === order.name)
  const email = `${order.name.toLowerCase().split(' ')[0]}@gmail.com`

  // Derive a simple summary from the order amount (no separate line-item model).
  const amount = parseAmount(order.amount)
  const vat = amount * 0.09
  const summary = {
    vat: formatEuro(vat),
    shipping: formatEuro(0),
    amount: formatEuro(amount),
    grandTotal: formatEuro(amount),
  }

  return (
    <>
      <OrderDetailHeader orderNumber={order.orderNumber} />

      <div className="flex flex-col gap-3 lg:flex-row lg:items-start">
        {/* ── Ordered products ── */}
        <CardWrapper className="flex w-full min-w-0 flex-1 flex-col gap-4 px-4 pt-4 pb-3">
          <div className="flex flex-col gap-0.5">
            <h2 className="font-sans text-xl font-medium text-black">Ordered Products</h2>
            <p className="font-sans text-sm font-normal text-neutral-600">
              {SAMPLE_ORDER_PRODUCTS.length} types of products
            </p>
          </div>
          <OrderedProductsTable products={SAMPLE_ORDER_PRODUCTS} />
        </CardWrapper>

        {/* ── Right column: detail cards ── */}
        <div className="flex w-full shrink-0 flex-col gap-3 lg:w-90">
          <OrderCustomerDetails
            name={order.name}
            email={email}
            contactNumber={customer?.contactNumber ?? '—'}
            address={customer?.location ?? '—'}
            customerHref={customer ? `/customers/${customer.id}` : undefined}
          />
          <OrderDetailsCard
            orderNumber={order.orderNumber}
            status={order.status}
            orderDate={order.date}
            quantity={order.quantity}
            summary={summary}
          />
          <OrderCancellation orderNumber={order.orderNumber} />
        </div>
      </div>
    </>
  )
}
