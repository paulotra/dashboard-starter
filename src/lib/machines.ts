import { parseDate } from '@/lib/dates'
import type { SortDirection } from '@/lib/orders'

// Re-export so consumers can import SortDirection from one place if needed.
export type { SortDirection }

/* ─── Types ──────────────────────────────────────────────────────────── */

export interface Machine {
  id: string
  name: string
  serialNumber: string
  category: string
  lastMaintenance: string
  dateAdded: string
  active: boolean
  /** Path to the machine's product image under /public. */
  image: string
}

export type MachineSortKey = 'name' | 'category' | 'lastMaintenance' | 'dateAdded'

/* ─── Sort helper ────────────────────────────────────────────────────── */

export function compareMachines(a: Machine, b: Machine, key: MachineSortKey): number {
  switch (key) {
    case 'name':
      return a.name.localeCompare(b.name)
    case 'category':
      return a.category.localeCompare(b.category)
    case 'lastMaintenance':
      return parseDate(a.lastMaintenance) - parseDate(b.lastMaintenance)
    case 'dateAdded':
      return parseDate(a.dateAdded) - parseDate(b.dateAdded)
  }
}

/* ─── Sample data ────────────────────────────────────────────────────── */

export const SAMPLE_MACHINES: Machine[] = [
  {
    id: '1',
    name: 'BFC Classica GT 2 groeps',
    serialNumber: 'JE6-2021-4482',
    category: 'Espressomachines',
    lastMaintenance: '03 Jun 13:46',
    dateAdded: '03 Jun 13:46',
    active: true,
    image: '/machines/bfc-classica-gt.png',
  },
  {
    id: '2',
    name: 'La Marzocco Linea PB',
    serialNumber: 'LM-2022-8871',
    category: 'Espressomachines',
    lastMaintenance: '10 Jan 09:22',
    dateAdded: '12 Jun 14:05',
    active: false,
    image: '/machines/la-marzocco-linea-pb.png',
  },
  {
    id: '3',
    name: 'Nuova Simonelli Aurelia Wave',
    serialNumber: 'NS-2020-3345',
    category: 'Espressomachines',
    lastMaintenance: '22 Mar 11:38',
    dateAdded: '11 Jun 08:47',
    active: false,
    image: '/machines/nuova-simonelli-aurelia-wave.png',
  },
  {
    id: '4',
    name: 'Jura Giga 6',
    serialNumber: 'JR-2023-1122',
    category: 'Koffiemachines',
    lastMaintenance: '05 Feb 15:00',
    dateAdded: '13 Jun 10:30',
    active: true,
    image: '/machines/jura-giga-6.png',
  },
  {
    id: '5',
    name: 'Franke A800 FM',
    serialNumber: 'FK-2019-7789',
    category: 'Volautomaten',
    lastMaintenance: '18 Nov 16:55',
    dateAdded: '09 Jun 17:12',
    active: true,
    image: '/machines/franke-a800-fm.png',
  },
]
