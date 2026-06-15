import { parseDate } from '@/lib/dates'
import { parseAmount } from '@/lib/numbers'
import type { SortDirection } from '@/lib/orders'

// Re-export so consumers can import SortDirection from one place if needed.
export type { SortDirection }

/* ─── Types ──────────────────────────────────────────────────────────── */

export interface Product {
  id: string
  name: string
  image: string
  stock: number
  category: string
  dateAdded: string
  price: string
  active: boolean
}

export type ProductSortKey = 'name' | 'stock' | 'category' | 'dateAdded' | 'price'

/* ─── Sort helper ────────────────────────────────────────────────────── */

export function compareProducts(a: Product, b: Product, key: ProductSortKey): number {
  switch (key) {
    case 'name':
      return a.name.localeCompare(b.name)
    case 'stock':
      return a.stock - b.stock
    case 'category':
      return a.category.localeCompare(b.category)
    case 'dateAdded':
      return parseDate(a.dateAdded) - parseDate(b.dateAdded)
    case 'price':
      return parseAmount(a.price) - parseAmount(b.price)
  }
}

/* ─── Sample data (21 rows — 3 pages at pageSize 7) ─────────────────── */

export const SAMPLE_PRODUCTS: Product[] = [
  // ── Design-specified rows (ids 1–7) ──────────────────────────────────
  {
    id: '1',
    name: 'Bakkerij Brood',
    category: 'Coffee',
    stock: 32,
    dateAdded: '03 Jun 13:46',
    price: '€49.50',
    active: true,
    image: '/products/bakkerij-brood.png',
  },
  {
    id: '2',
    name: 'Cappuccino',
    category: 'Coffee',
    stock: 22,
    dateAdded: '10 Jun 09:30',
    price: '€3.90',
    active: false,
    image: '/products/cappuccino.png',
  },
  {
    id: '3',
    name: 'Earl Grey',
    category: 'Tea',
    stock: 35,
    dateAdded: '10 Jun 10:15',
    price: '€3.20',
    active: true,
    image: '/products/earl-grey.png',
  },
  {
    id: '4',
    name: 'Americano',
    category: 'Coffee',
    stock: 19,
    dateAdded: '11 Jun 08:45',
    price: '€2.80',
    active: false,
    image: '/products/americano.png',
  },
  {
    id: '5',
    name: 'Minestrone',
    category: 'Soup',
    stock: 8,
    dateAdded: '11 Jun 12:20',
    price: '€5.50',
    active: false,
    image: '/products/minestrone.png',
  },
  {
    id: '6',
    name: 'Chamomile Tea',
    category: 'Tea',
    stock: 14,
    dateAdded: '12 Jun 14:00',
    price: '€3.00',
    active: true,
    image: '/products/chamomile-tea.png',
  },
  {
    id: '7',
    name: 'Chicken Soup',
    category: 'Soup',
    stock: 11,
    dateAdded: '12 Jun 13:30',
    price: '€6.50',
    active: true,
    image: '/products/chicken-soup.png',
  },
  // ── Extra rows for multi-page demo (ids 8–21) ─────────────────────────
  {
    id: '8',
    name: 'Espresso',
    category: 'Coffee',
    stock: 40,
    dateAdded: '01 Jun 08:00',
    price: '€2.50',
    active: true,
    image: '/products/americano.png',
  },
  {
    id: '9',
    name: 'Flat White',
    category: 'Coffee',
    stock: 28,
    dateAdded: '02 Jun 10:10',
    price: '€4.20',
    active: true,
    image: '/products/cappuccino.png',
  },
  {
    id: '10',
    name: 'Green Tea',
    category: 'Tea',
    stock: 50,
    dateAdded: '02 Jun 11:30',
    price: '€2.90',
    active: true,
    image: '/products/earl-grey.png',
  },
  {
    id: '11',
    name: 'Tomato Soup',
    category: 'Soup',
    stock: 15,
    dateAdded: '04 Jun 09:00',
    price: '€4.80',
    active: false,
    image: '/products/minestrone.png',
  },
  {
    id: '12',
    name: 'Latte',
    category: 'Coffee',
    stock: 24,
    dateAdded: '05 Jun 08:30',
    price: '€3.70',
    active: true,
    image: '/products/cappuccino.png',
  },
  {
    id: '13',
    name: 'Mint Tea',
    category: 'Tea',
    stock: 18,
    dateAdded: '06 Jun 14:15',
    price: '€2.60',
    active: false,
    image: '/products/chamomile-tea.png',
  },
  {
    id: '14',
    name: 'Pumpkin Soup',
    category: 'Soup',
    stock: 7,
    dateAdded: '07 Jun 11:00',
    price: '€5.90',
    active: true,
    image: '/products/chicken-soup.png',
  },
  {
    id: '15',
    name: 'Macchiato',
    category: 'Coffee',
    stock: 16,
    dateAdded: '07 Jun 15:20',
    price: '€3.10',
    active: true,
    image: '/products/americano.png',
  },
  {
    id: '16',
    name: 'Rooibos Tea',
    category: 'Tea',
    stock: 30,
    dateAdded: '08 Jun 09:45',
    price: '€3.30',
    active: false,
    image: '/products/earl-grey.png',
  },
  {
    id: '17',
    name: 'French Onion Soup',
    category: 'Soup',
    stock: 5,
    dateAdded: '08 Jun 13:00',
    price: '€6.20',
    active: true,
    image: '/products/minestrone.png',
  },
  {
    id: '18',
    name: 'Lungo',
    category: 'Coffee',
    stock: 20,
    dateAdded: '09 Jun 10:30',
    price: '€2.70',
    active: false,
    image: '/products/bakkerij-brood.png',
  },
  {
    id: '19',
    name: 'Jasmine Tea',
    category: 'Tea',
    stock: 12,
    dateAdded: '09 Jun 16:00',
    price: '€3.50',
    active: true,
    image: '/products/chamomile-tea.png',
  },
  {
    id: '20',
    name: 'Lentil Soup',
    category: 'Soup',
    stock: 9,
    dateAdded: '10 Jun 12:00',
    price: '€4.50',
    active: false,
    image: '/products/chicken-soup.png',
  },
  {
    id: '21',
    name: 'Ristretto',
    category: 'Coffee',
    stock: 45,
    dateAdded: '13 Jun 08:00',
    price: '€2.30',
    active: true,
    image: '/products/americano.png',
  },
]
