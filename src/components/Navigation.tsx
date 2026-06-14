'use client'

import { usePathname } from 'next/navigation'
import { ALL_NAV_ITEMS } from '@/lib/nav'
import Breadcrumb from './Breadcrumb'

export default function Navigation() {
  const pathname = usePathname() ?? ''
  const current = ALL_NAV_ITEMS.find(
    (item) => pathname === item.href || pathname.startsWith(item.href + '/')
  )

  if (!current) return null

  const Icon = current.icon

  return (
    <header className="border-border-color border-l bg-white px-5 py-5">
      <div className="flex items-center gap-3">
        <div className="bg-primary-100 flex size-10 shrink-0 items-center justify-center rounded-lg">
          <Icon size={16} className="text-primary-500" />
        </div>
        <div className="flex flex-col">
          <h1 className="font-sans text-lg font-medium text-black">{current.label}</h1>
          <Breadcrumb items={[{ label: current.section }, { label: current.label }]} />
        </div>
      </div>
    </header>
  )
}
