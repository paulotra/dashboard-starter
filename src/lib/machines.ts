import { parseDate } from '@/lib/dates'
import type { SortDirection } from '@/lib/orders'

// Re-export so consumers can import SortDirection from one place if needed.
export type { SortDirection }

/* ─── Types ──────────────────────────────────────────────────────────── */

export interface MaintenanceEntry {
  date: string
  description: string
}

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
  /** Physical address where the machine is installed. */
  address: string
  /** Chronological log of maintenance events, most recent first. */
  maintenanceHistory: MaintenanceEntry[]
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
    address: 'Museumstraat 1, 1071 XX Amsterdam, Netherlands',
    maintenanceHistory: [
      { date: '12 Mar 2025', description: 'Preventief onderhoud uitgevoerd' },
      { date: '8 Sep 2024', description: 'Ontkalking & filter vervangen' },
      { date: '2 Feb 2024', description: 'Algemene inspectie' },
    ],
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
    address: 'Herengracht 182, 1016 BR Amsterdam, Netherlands',
    maintenanceHistory: [
      { date: '10 Jan 2025', description: 'Pomp vervangen & druk afgesteld' },
      { date: '4 Jul 2024', description: 'Ontkalking uitgevoerd' },
      { date: '15 Dec 2023', description: 'Preventief onderhoud & reiniging' },
    ],
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
    address: 'Keizersgracht 310, 1016 EX Amsterdam, Netherlands',
    maintenanceHistory: [
      { date: '22 Mar 2025', description: 'Stoomkraan gereviseerd' },
      { date: '11 Oct 2024', description: 'Filter & zeef vervangen' },
      { date: '3 Apr 2024', description: 'Algemene inspectie & reiniging' },
    ],
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
    address: 'Prinsengracht 521, 1016 HT Amsterdam, Netherlands',
    maintenanceHistory: [
      { date: '5 Feb 2025', description: 'Maalmolen schoongemaakt & gekalibreerd' },
      { date: '20 Aug 2024', description: 'Ontkalking & filter vervangen' },
      { date: '9 Jan 2024', description: 'Preventief onderhoud uitgevoerd' },
    ],
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
    address: 'Reguliersdwarsstraat 36, 1017 BM Amsterdam, Netherlands',
    maintenanceHistory: [
      { date: '18 Nov 2024', description: 'Volledige reiniging & software-update' },
      { date: '2 Jun 2024', description: 'Ontkalking & melkschuimsysteem gereinigd' },
      { date: '14 Jan 2024', description: 'Algemene inspectie & smeermiddelen vervangen' },
    ],
  },
]
