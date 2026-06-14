import Link from 'next/link'
import NavItem from './NavItem'
import { navItems } from '@/lib/nav'

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-border bg-surface">
      <div className="flex h-16 items-center border-b border-border px-4">
        <Link href="/dashboard" className="text-sm font-semibold text-foreground">
          Dashboard Starter
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <NavItem {...item} />
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-border p-3">
        <div className="flex items-center gap-3 rounded-md px-3 py-2">
          <div className="h-7 w-7 shrink-0 rounded-full bg-muted" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">User Name</p>
            <p className="truncate text-xs text-muted-foreground">user@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
