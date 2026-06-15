import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import CardWrapper from '@/components/ui/CardWrapper'
import Avatar from '@/components/ui/Avatar'

export interface Customer {
  id: string
  name: string
  initials: string
  location: string
  machines: number
  orders: number
}

export const DEFAULT_CUSTOMERS: Customer[] = [
  { id: '1', name: 'Artisan Bakes', initials: 'AB', location: 'Den Haag', machines: 2, orders: 31 },
  {
    id: '2',
    name: 'Molens van Dijk',
    initials: 'MV',
    location: 'Amsterdam',
    machines: 1,
    orders: 23,
  },
  {
    id: '3',
    name: 'Patisserie Lune',
    initials: 'PL',
    location: 'Rotterdam',
    machines: 3,
    orders: 17,
  },
  { id: '4', name: 'Bakkerij Brood', initials: 'BB', location: 'Holten', machines: 2, orders: 12 },
  { id: '5', name: 'De Graanschuur', initials: 'DG', location: 'Utrecht', machines: 4, orders: 8 },
  { id: '6', name: 'Brood & Zout', initials: 'BZ', location: 'Groningen', machines: 5, orders: 6 },
  { id: '7', name: 'Tarwe & Meer', initials: 'TM', location: 'Eindhoven', machines: 3, orders: 5 },
  { id: '8', name: 'Kaas & Korst', initials: 'KK', location: 'Maastricht', machines: 2, orders: 4 },
  { id: '9', name: 'Havermolen', initials: 'HM', location: 'Leiden', machines: 1, orders: 3 },
  { id: '10', name: 'Rogge Rijk', initials: 'RR', location: 'Haarlem', machines: 4, orders: 2 },
  { id: '11', name: 'Vuur & Vlam', initials: 'VV', location: 'Delft', machines: 2, orders: 1 },
]

function pluralize(count: number, singular: string, plural: string): string {
  return count === 1 ? `${count} ${singular}` : `${count} ${plural}`
}

export interface TopCustomersProps {
  customers?: Customer[]
  title?: string
  onAllCustomersClick?: () => void
  allCustomersHref?: string
  className?: string
}

export default function TopCustomers({
  customers = DEFAULT_CUSTOMERS,
  title = 'Top Customers',
  onAllCustomersClick,
  allCustomersHref = '#',
  className,
}: TopCustomersProps) {
  return (
    <CardWrapper className={cn('flex flex-col gap-0 p-0', className)}>
      {/* Header */}
      <div className="border-border-color mb-2 flex items-center justify-between border-b px-4 py-4">
        <h2>{title}</h2>
        <a
          href={allCustomersHref}
          onClick={onAllCustomersClick}
          aria-label="View all customers"
          className="text-primary-500 focus-visible:outline-primary-500 inline-flex items-center gap-1 text-xs font-medium focus-visible:outline-2"
        >
          All Customers
          <ArrowRight aria-hidden="true" size={16} />
        </a>
      </div>

      {/* Customer list */}
      <ul className="flex flex-col pb-3">
        {customers.map((customer) => {
          const machineMeta = pluralize(customer.machines, 'machine', 'machines')
          const orderLabel = pluralize(customer.orders, 'order', 'orders')

          return (
            <li key={customer.id} className="flex items-center gap-3 px-4 py-2">
              <Avatar initials={customer.initials} />

              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="font-sans text-sm font-medium text-black">{customer.name}</span>
                <span className="font-sans text-xs font-normal text-neutral-600">
                  {customer.location} · {machineMeta}
                </span>
              </div>

              <span className="shrink-0 font-sans text-xs font-normal text-neutral-600">
                {orderLabel}
              </span>
            </li>
          )
        })}
      </ul>
    </CardWrapper>
  )
}
