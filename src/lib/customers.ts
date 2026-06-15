import { parseAmount } from '@/lib/numbers'

/* ─── Types ──────────────────────────────────────────────────────────── */

export type CustomerStatus = 'Activated' | 'Deactivated' | 'Invite Sent' | 'Expired'

export interface Customer {
  id: string
  name: string
  initials: string
  location: string
  status: CustomerStatus
  orders: number
  totalSpent: string
  /** Contact phone number — shown on the customer detail page. */
  contactNumber?: string
  /** Free-form notes — shown on the customer detail page. */
  notes?: string
}

export type CustomerSortKey = 'name' | 'location' | 'status' | 'orders' | 'totalSpent'
export type SortDirection = 'asc' | 'desc'

/* ─── Sort helpers ───────────────────────────────────────────────────── */

/**
 * Status ordinal for sorting: Activated → Deactivated → Invite Sent → Expired
 * Alphabetical within the union, but with "Invite Sent" after "Deactivated"
 * to keep active states first and inactive last.
 */
const STATUS_ORDER: Record<CustomerStatus, number> = {
  Activated: 0,
  Deactivated: 1,
  'Invite Sent': 2,
  Expired: 3,
}

export function getCustomerById(id: string): Customer | undefined {
  return SAMPLE_CUSTOMERS.find((c) => c.id === id)
}

export function compareCustomers(a: Customer, b: Customer, key: CustomerSortKey): number {
  switch (key) {
    case 'name':
      return a.name.localeCompare(b.name)
    case 'location':
      return a.location.localeCompare(b.location)
    case 'status':
      return STATUS_ORDER[a.status] - STATUS_ORDER[b.status]
    case 'orders':
      return a.orders - b.orders
    case 'totalSpent':
      return parseAmount(a.totalSpent) - parseAmount(b.totalSpent)
  }
}

/* ─── Sample data (22 rows — ~3 pages at pageSize 10) ──────────────── */

export const SAMPLE_CUSTOMERS: Customer[] = [
  // Design rows (9)
  {
    id: '1',
    name: 'Bakkerij Brood',
    initials: 'BB',
    location: 'Museumstraat 1, 1071 XX Amsterdam, Netherlands',
    status: 'Activated',
    orders: 135,
    totalSpent: '€49.50',
    contactNumber: '325 - 3139 - 230',
    notes:
      'Preventief onderhoud uitgevoerd, Klant heeft gevraagd om follow-up afspraak. Accu vervangen na meting.',
  },
  {
    id: '2',
    name: 'Graan & Honing',
    initials: 'GH',
    location: 'Keizersgracht 245, 1016 EA Amsterdam, Netherlands',
    status: 'Activated',
    orders: 8,
    totalSpent: '€32.00',
  },
  {
    id: '3',
    name: 'De Espresso Bar',
    initials: 'DE',
    location: 'Prinsengracht 89, 1015 DT Amsterdam, Netherlands',
    status: 'Deactivated',
    orders: 24,
    totalSpent: '€96.80',
  },
  {
    id: '4',
    name: 'Verse Bloemen',
    initials: 'VB',
    location: 'Herengracht 412, 1017 BZ Amsterdam, Netherlands',
    status: 'Invite Sent',
    orders: 5,
    totalSpent: '€18.75',
  },
  {
    id: '5',
    name: 'Kaasmarkt',
    initials: 'KM',
    location: 'Nieuwendijk 34, 1012 ML Amsterdam, Netherlands',
    status: 'Expired',
    orders: 16,
    totalSpent: '€64.50',
  },
  {
    id: '6',
    name: 'Zuiderbad Bistro',
    initials: 'ZB',
    location: 'Hobbemastraat 26, 1071 ZC Amsterdam, Netherlands',
    status: 'Activated',
    orders: 30,
    totalSpent: '€145.00',
  },
  {
    id: '7',
    name: 'Rijksweg Keuken',
    initials: 'RK',
    location: 'Stadhouderskade 7, 1054 ES Amsterdam, Netherlands',
    status: 'Activated',
    orders: 11,
    totalSpent: '€55.20',
  },
  {
    id: '8',
    name: 'Noord West Deli',
    initials: 'NW',
    location: 'Van Hallstraat 615, 1051 HG Amsterdam, Netherlands',
    status: 'Expired',
    orders: 7,
    totalSpent: '€29.90',
  },
  {
    id: '9',
    name: 'Patisserie Céleste',
    initials: 'PC',
    location: 'Spiegelgracht 14, 1017 JP Amsterdam, Netherlands',
    status: 'Invite Sent',
    orders: 18,
    totalSpent: '€112.50',
  },
  // Additional rows (13) — varied statuses/orders for multi-page pagination
  {
    id: '10',
    name: 'Amstel Keuken',
    initials: 'AK',
    location: 'Amstelstraat 19, 1017 DA Amsterdam, Netherlands',
    status: 'Activated',
    orders: 22,
    totalSpent: '€88.40',
  },
  {
    id: '11',
    name: 'Broodje & Meer',
    initials: 'BM',
    location: 'Vondelstraat 44, 1054 GE Amsterdam, Netherlands',
    status: 'Deactivated',
    orders: 6,
    totalSpent: '€24.60',
  },
  {
    id: '12',
    name: 'Canaal Catering',
    initials: 'CC',
    location: 'Bloemgracht 93, 1015 TN Amsterdam, Netherlands',
    status: 'Activated',
    orders: 35,
    totalSpent: '€178.20',
  },
  {
    id: '13',
    name: 'Dam Delicatessen',
    initials: 'DD',
    location: 'Damrak 70, 1012 LM Amsterdam, Netherlands',
    status: 'Invite Sent',
    orders: 3,
    totalSpent: '€11.25',
  },
  {
    id: '14',
    name: 'Eiland Eetcafé',
    initials: 'EE',
    location: 'Java-eiland 8, 1019 SB Amsterdam, Netherlands',
    status: 'Activated',
    orders: 14,
    totalSpent: '€62.80',
  },
  {
    id: '15',
    name: 'Foodhallen Pop-up',
    initials: 'FP',
    location: 'Bellamyplein 51, 1053 AT Amsterdam, Netherlands',
    status: 'Expired',
    orders: 9,
    totalSpent: '€38.50',
  },
  {
    id: '16',
    name: 'Gouden Lepel',
    initials: 'GL',
    location: 'Utrechtsestraat 55, 1017 VJ Amsterdam, Netherlands',
    status: 'Activated',
    orders: 27,
    totalSpent: '€131.70',
  },
  {
    id: '17',
    name: 'Havenmeester Bistro',
    initials: 'HB',
    location: 'Westerdoksdijk 40, 1013 AE Amsterdam, Netherlands',
    status: 'Deactivated',
    orders: 19,
    totalSpent: '€76.30',
  },
  {
    id: '18',
    name: 'IJsbreker Café',
    initials: 'IC',
    location: 'Weesperzijde 23, 1091 EC Amsterdam, Netherlands',
    status: 'Invite Sent',
    orders: 2,
    totalSpent: '€8.90',
  },
  {
    id: '19',
    name: 'Jordaan Snacks',
    initials: 'JS',
    location: 'Elandsgracht 70, 1016 TX Amsterdam, Netherlands',
    status: 'Activated',
    orders: 41,
    totalSpent: '€209.60',
  },
  {
    id: '20',
    name: 'Kleine Keuken',
    initials: 'KK',
    location: 'Tweede Anjeliersdwarsstraat 3, 1015 NX Amsterdam, Netherlands',
    status: 'Expired',
    orders: 13,
    totalSpent: '€54.30',
  },
  {
    id: '21',
    name: 'Leidseplein Lunch',
    initials: 'LL',
    location: 'Leidseplein 12, 1017 PT Amsterdam, Netherlands',
    status: 'Activated',
    orders: 48,
    totalSpent: '€242.00',
  },
  {
    id: '22',
    name: 'Marnixstraat Markt',
    initials: 'MM',
    location: 'Marnixstraat 397, 1016 XP Amsterdam, Netherlands',
    status: 'Invite Sent',
    orders: 4,
    totalSpent: '€15.60',
  },
]
