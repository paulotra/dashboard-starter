'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'
import Navigation from './Navigation'
import { PageActionsProvider } from './PageActionsContext'

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <PageActionsProvider>
      <div className="bg-body-color flex h-screen">
        {/* Mobile backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar — static on desktop, overlay on mobile */}
        <div
          className={[
            'fixed inset-y-0 left-0 z-30 md:relative md:flex',
            sidebarOpen ? 'flex' : 'hidden md:flex',
          ].join(' ')}
        >
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <Navigation onMenuClick={() => setSidebarOpen((o) => !o)} />
          <main className="flex-1 overflow-y-auto p-3">{children}</main>
        </div>
      </div>
    </PageActionsProvider>
  )
}
