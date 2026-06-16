import { notFound } from 'next/navigation'
import { getCustomerById } from '@/lib/customers'
import { SAMPLE_ORDERS } from '@/lib/orders'
import CustomerProfileCard from '../_components/CustomerProfileCard'
import CustomerOrdersTable from '../_components/CustomerOrdersTable'
import CustomerDetailHeader from '../_components/CustomerDetailHeader'

export default async function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const customer = getCustomerById(id)

  if (!customer) {
    notFound()
  }

  const pendingOrders = SAMPLE_ORDERS.filter((o) => o.status === 'New Order').length

  return (
    <>
      <CustomerDetailHeader customerName={customer.name} pendingOrders={pendingOrders} />

      <div className="flex flex-col gap-2 lg:flex-row lg:items-start">
        <CustomerProfileCard customer={customer} className="w-full shrink-0 lg:w-90" />
        <CustomerOrdersTable className="w-full min-w-0 flex-1" />
      </div>
    </>
  )
}
