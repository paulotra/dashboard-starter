'use client'

import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { ALL_NAV_ITEMS } from '@/lib/nav'
import Breadcrumb from './Breadcrumb'
import type { BreadcrumbItem } from './Breadcrumb'
import { NavActionsSlot, usePageActions } from './PageActionsContext'

interface NavigationProps {
  onMenuClick?: () => void
}

export default function Navigation({ onMenuClick }: NavigationProps) {
  const pathname = usePathname() ?? ''
  const { header } = usePageActions()
  const current = ALL_NAV_ITEMS.find(
    (item) => pathname === item.href || pathname.startsWith(item.href + '/')
  )

  if (!current) return null

  const Icon = current.icon

  // A page may override the title + breadcrumb (e.g. a customer detail page);
  // otherwise fall back to the static nav config for the matched route.
  const title = header?.title ?? current.label
  const breadcrumbItems: BreadcrumbItem[] =
    header?.breadcrumb ?? [{ label: current.section }, { label: current.label }]

  return (
    <header className="border-border-color shadow-navigation z-10 border-l bg-white px-5 py-5">
      <div className="flex items-center justify-between gap-3">
        {/* Left: menu toggle (mobile) + icon + title + breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex size-10 shrink-0 items-center justify-center rounded-lg text-black md:hidden"
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <div className="bg-primary-100 hidden size-10 shrink-0 items-center justify-center rounded-lg md:flex">
            <Icon size={16} className="text-primary-500" />
          </div>
          <div className="flex flex-col">
            <h1>{title}</h1>
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>

        {/* Right: page-level action buttons injected by each page */}
        <NavActionsSlot />
      </div>
    </header>
  )
}
