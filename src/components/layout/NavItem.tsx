'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import type { NavItem } from '@/types'

export default function NavItem({ label, href, icon: Icon }: NavItem) {
  const pathname = usePathname()
  const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:bg-surface-hover hover:text-foreground'
      )}
    >
      {Icon && <Icon className="h-4 w-4 shrink-0" />}
      {label}
    </Link>
  )
}
