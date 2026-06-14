'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { NAV_SECTIONS } from '@/lib/nav'
import Logo from './Logo'

export interface SidebarUser {
  name: string
  plan: string
  initials: string
}

export interface SidebarProps {
  companyName?: string
  user?: SidebarUser
}

export default function Sidebar({
  companyName = 'Company Name',
  user = { name: 'Paulo Trajano', plan: 'Starter Plan', initials: 'PT' },
}: SidebarProps) {
  const pathname = usePathname() ?? ''

  return (
    <aside className="flex h-full w-72 flex-col bg-white">
      {/* Logo + Nav */}
      <div className="flex flex-1 flex-col gap-10 overflow-y-auto px-6 pt-6">
        <Logo companyName={companyName} />

        <nav className="flex flex-col gap-3">
          {NAV_SECTIONS.map((section, idx) => (
            <div key={section.label}>
              {idx > 0 && <hr className="border-border-color mb-3" />}
              <div className="flex flex-col gap-4">
                <p className="text-2xs font-sans font-semibold tracking-widest text-neutral-700">
                  {section.label}
                </p>
                <div className="flex flex-col">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={[
                          'flex items-center justify-between rounded-lg px-3 py-2 transition-colors',
                          isActive
                            ? 'bg-primary-100 text-primary-500'
                            : 'text-black hover:bg-neutral-200',
                        ].join(' ')}
                      >
                        <span className="flex items-center gap-3">
                          <item.icon
                            size={18}
                            className={isActive ? 'text-primary-500' : 'text-neutral-600'}
                          />
                          <span className="font-sans text-sm font-normal">{item.label}</span>
                        </span>
                        {item.badge != null && (
                          <span className="bg-primary-200 text-2xs text-primary-500 rounded-full px-2 py-1 font-sans font-semibold">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Account */}
      <div className="border-border-color flex items-center justify-between border-t px-6 pt-6 pb-8">
        <div className="flex items-center gap-3">
          <div className="bg-primary-100 flex size-10 shrink-0 items-center justify-center rounded-full">
            <span className="text-primary-500 font-sans text-sm font-medium">{user.initials}</span>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-sans text-sm text-black">{user.name}</p>
            <p className="font-sans text-xs text-neutral-600">{user.plan}</p>
          </div>
        </div>
        <ChevronRight size={20} className="shrink-0 text-neutral-500" />
      </div>
    </aside>
  )
}
