import type { BadgeStatusProps } from '@/components/ui/BadgeStatus'
import { MONTH_MAP, parseDate } from '@/lib/dates'

// Re-export so existing callers that import MONTH_MAP/parseDate from here
// continue to work without changes.
export { MONTH_MAP, parseDate }

/* ─── Types ──────────────────────────────────────────────────────────── */

export interface Order {
  id: string
  orderNumber: string
  name: string
  initials: string
  status: NonNullable<BadgeStatusProps['status']>
  quantity: string
  date: string
  amount: string
}

export type SortKey = 'name' | 'orderNumber' | 'status' | 'quantity' | 'date' | 'amount'
export type SortDirection = 'asc' | 'desc'

/* ─── Sort helpers ───────────────────────────────────────────────────── */

export function parseQuantity(value: string): number {
  const match = value.match(/^(\d+)/)
  return match ? parseInt(match[1], 10) : 0
}

export function parseAmount(value: string): number {
  return parseFloat(value.replace(/[^0-9.]/g, '')) || 0
}


function parseOrderNumber(value: string): number {
  // Strip leading "#" and parse, e.g. "#1042" → 1042
  return parseInt(value.replace(/\D/g, ''), 10) || 0
}

export const STATUS_ORDER: Record<string, number> = {
  Processing: 0,
  Pending: 1,
  Completed: 2,
  Cancelled: 3,
}

export function compareOrders(a: Order, b: Order, key: SortKey): number {
  switch (key) {
    case 'name':
      return a.name.localeCompare(b.name)
    case 'orderNumber':
      return parseOrderNumber(a.orderNumber) - parseOrderNumber(b.orderNumber)
    case 'status': {
      const aRank = STATUS_ORDER[a.status] ?? 99
      const bRank = STATUS_ORDER[b.status] ?? 99
      return aRank - bRank
    }
    case 'quantity':
      return parseQuantity(a.quantity) - parseQuantity(b.quantity)
    case 'date':
      return parseDate(a.date) - parseDate(b.date)
    case 'amount':
      return parseAmount(a.amount) - parseAmount(b.amount)
  }
}

/* ─── Default sample data (8 rows — used by RecentOrdersTable) ───────── */

export const DEFAULT_ORDERS: Order[] = [
  {
    id: '1',
    orderNumber: '#1042',
    name: 'Bakkerij Brood',
    initials: 'BB',
    status: 'Pending',
    quantity: '3 items',
    date: '03 jun 13:46',
    amount: '€49.50',
  },
  {
    id: '2',
    orderNumber: '#1043',
    name: 'Molen Koffie',
    initials: 'MK',
    status: 'Completed',
    quantity: '5 items',
    date: '04 jun 09:12',
    amount: '€82.30',
  },
  {
    id: '3',
    orderNumber: '#1044',
    name: 'Groente Huis',
    initials: 'GH',
    status: 'Processing',
    quantity: '2 items',
    date: '04 jun 10:45',
    amount: '€23.75',
  },
  {
    id: '4',
    orderNumber: '#1045',
    name: 'Vis & Seafood',
    initials: 'VS',
    status: 'Pending',
    quantity: '7 items',
    date: '04 jun 11:30',
    amount: '€134.90',
  },
  {
    id: '5',
    orderNumber: '#1046',
    name: 'Patisserie Belle',
    initials: 'PB',
    status: 'Completed',
    quantity: '4 items',
    date: '04 jun 12:05',
    amount: '€67.20',
  },
  {
    id: '6',
    orderNumber: '#1047',
    name: 'Slagerij Frans',
    initials: 'SF',
    status: 'Cancelled',
    quantity: '1 item',
    date: '04 jun 13:00',
    amount: '€15.50',
  },
  {
    id: '7',
    orderNumber: '#1048',
    name: 'De Kaasboer',
    initials: 'DK',
    status: 'Processing',
    quantity: '6 items',
    date: '04 jun 14:22',
    amount: '€98.40',
  },
  {
    id: '8',
    orderNumber: '#1049',
    name: 'Bloem & More',
    initials: 'BM',
    status: 'Completed',
    quantity: '3 items',
    date: '04 jun 15:37',
    amount: '€44.60',
  },
]

/* ─── Larger sample data (30 rows — used by OrdersTable) ──────────────── */

export const SAMPLE_ORDERS: Order[] = [
  {
    id: '1',
    orderNumber: '#1042',
    name: 'Bakkerij Croissant',
    initials: 'BC',
    status: 'Pending',
    quantity: '3 items',
    date: '01 jun 08:15',
    amount: '€49.50',
  },
  {
    id: '2',
    orderNumber: '#1043',
    name: 'De Groene Markt',
    initials: 'GM',
    status: 'Completed',
    quantity: '5 items',
    date: '01 jun 09:30',
    amount: '€82.30',
  },
  {
    id: '3',
    orderNumber: '#1044',
    name: 'Koffiebar Zon',
    initials: 'KZ',
    status: 'Processing',
    quantity: '2 items',
    date: '01 jun 10:45',
    amount: '€23.75',
  },
  {
    id: '4',
    orderNumber: '#1045',
    name: 'Patisserie Luna',
    initials: 'PL',
    status: 'Pending',
    quantity: '7 items',
    date: '01 jun 11:20',
    amount: '€134.90',
  },
  {
    id: '5',
    orderNumber: '#1046',
    name: 'Slagerij Veen',
    initials: 'SV',
    status: 'Completed',
    quantity: '4 items',
    date: '01 jun 12:05',
    amount: '€67.20',
  },
  {
    id: '6',
    orderNumber: '#1047',
    name: 'Catering Luxe',
    initials: 'CL',
    status: 'Cancelled',
    quantity: '1 item',
    date: '01 jun 13:00',
    amount: '€15.50',
  },
  {
    id: '7',
    orderNumber: '#1048',
    name: 'Markthal Vers',
    initials: 'MV',
    status: 'Processing',
    quantity: '6 items',
    date: '02 jun 08:22',
    amount: '€98.40',
  },
  {
    id: '8',
    orderNumber: '#1049',
    name: 'Restaurant Woud',
    initials: 'RW',
    status: 'Completed',
    quantity: '3 items',
    date: '02 jun 09:37',
    amount: '€44.60',
  },
  {
    id: '9',
    orderNumber: '#1050',
    name: 'Theehuisje Berg',
    initials: 'TB',
    status: 'Pending',
    quantity: '8 items',
    date: '02 jun 10:55',
    amount: '€112.00',
  },
  {
    id: '10',
    orderNumber: '#1051',
    name: 'Bakkerij Croissant',
    initials: 'BC',
    status: 'Processing',
    quantity: '2 items',
    date: '02 jun 11:10',
    amount: '€31.80',
  },
  {
    id: '11',
    orderNumber: '#1052',
    name: 'De Groene Markt',
    initials: 'GM',
    status: 'Cancelled',
    quantity: '5 items',
    date: '02 jun 12:30',
    amount: '€76.50',
  },
  {
    id: '12',
    orderNumber: '#1053',
    name: 'Koffiebar Zon',
    initials: 'KZ',
    status: 'Completed',
    quantity: '1 item',
    date: '02 jun 13:45',
    amount: '€19.90',
  },
  {
    id: '13',
    orderNumber: '#1054',
    name: 'Patisserie Luna',
    initials: 'PL',
    status: 'Pending',
    quantity: '4 items',
    date: '03 jun 08:00',
    amount: '€58.40',
  },
  {
    id: '14',
    orderNumber: '#1055',
    name: 'Slagerij Veen',
    initials: 'SV',
    status: 'Processing',
    quantity: '9 items',
    date: '03 jun 09:15',
    amount: '€203.60',
  },
  {
    id: '15',
    orderNumber: '#1056',
    name: 'Catering Luxe',
    initials: 'CL',
    status: 'Completed',
    quantity: '6 items',
    date: '03 jun 10:30',
    amount: '€145.00',
  },
  {
    id: '16',
    orderNumber: '#1057',
    name: 'Markthal Vers',
    initials: 'MV',
    status: 'Pending',
    quantity: '3 items',
    date: '03 jun 11:00',
    amount: '€42.70',
  },
  {
    id: '17',
    orderNumber: '#1058',
    name: 'Restaurant Woud',
    initials: 'RW',
    status: 'Cancelled',
    quantity: '2 items',
    date: '03 jun 12:20',
    amount: '€27.80',
  },
  {
    id: '18',
    orderNumber: '#1059',
    name: 'Theehuisje Berg',
    initials: 'TB',
    status: 'Completed',
    quantity: '7 items',
    date: '03 jun 13:46',
    amount: '€88.30',
  },
  {
    id: '19',
    orderNumber: '#1060',
    name: 'Bakkerij Brood',
    initials: 'BB',
    status: 'Processing',
    quantity: '5 items',
    date: '04 jun 08:05',
    amount: '€61.20',
  },
  {
    id: '20',
    orderNumber: '#1061',
    name: 'Molen Koffie',
    initials: 'MK',
    status: 'Pending',
    quantity: '4 items',
    date: '04 jun 09:12',
    amount: '€53.40',
  },
  {
    id: '21',
    orderNumber: '#1062',
    name: 'Groente Huis',
    initials: 'GH',
    status: 'Completed',
    quantity: '10 items',
    date: '04 jun 10:25',
    amount: '€189.70',
  },
  {
    id: '22',
    orderNumber: '#1063',
    name: 'Vis & Seafood',
    initials: 'VS',
    status: 'Pending',
    quantity: '3 items',
    date: '04 jun 11:30',
    amount: '€37.90',
  },
  {
    id: '23',
    orderNumber: '#1064',
    name: 'Patisserie Belle',
    initials: 'PB',
    status: 'Cancelled',
    quantity: '1 item',
    date: '04 jun 12:05',
    amount: '€14.50',
  },
  {
    id: '24',
    orderNumber: '#1065',
    name: 'De Kaasboer',
    initials: 'DK',
    status: 'Processing',
    quantity: '8 items',
    date: '04 jun 13:40',
    amount: '€167.30',
  },
  {
    id: '25',
    orderNumber: '#1066',
    name: 'Bloem & More',
    initials: 'BM',
    status: 'Completed',
    quantity: '2 items',
    date: '04 jun 14:55',
    amount: '€29.80',
  },
  {
    id: '26',
    orderNumber: '#1067',
    name: 'Slagerij Frans',
    initials: 'SF',
    status: 'Pending',
    quantity: '6 items',
    date: '05 jun 08:10',
    amount: '€94.60',
  },
  {
    id: '27',
    orderNumber: '#1068',
    name: 'Catering Luxe',
    initials: 'CL',
    status: 'Processing',
    quantity: '4 items',
    date: '05 jun 09:25',
    amount: '€78.20',
  },
  {
    id: '28',
    orderNumber: '#1069',
    name: 'Bakkerij Croissant',
    initials: 'BC',
    status: 'Completed',
    quantity: '5 items',
    date: '05 jun 10:40',
    amount: '€92.50',
  },
  {
    id: '29',
    orderNumber: '#1070',
    name: 'De Groene Markt',
    initials: 'GM',
    status: 'Pending',
    quantity: '9 items',
    date: '05 jun 11:50',
    amount: '€156.80',
  },
  {
    id: '30',
    orderNumber: '#1071',
    name: 'Koffiebar Zon',
    initials: 'KZ',
    status: 'Cancelled',
    quantity: '3 items',
    date: '05 jun 13:05',
    amount: '€41.30',
  },
]
