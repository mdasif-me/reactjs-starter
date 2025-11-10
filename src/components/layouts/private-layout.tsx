'use client'

import { useState } from 'react'
import { Sidebar, Topbar } from '@/shared'

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="bg-bg relative flex h-screen overflow-hidden">
      {/* sidebar - hidden on md and below, shown on lg and above */}
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      {/* sidebar overlay - hidden on lg and above */}
      {sidebarOpen && (
        <div
          className="bg-fg/30 fixed inset-0 z-40 backdrop-blur-xs duration-300 ease-in lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* responsive - sidebar for mobile/tablet */}
      <div
        className={`fixed top-0 left-0 z-50 h-screen w-64 transform transition-transform duration-300 lg:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar onMobileClose={() => setSidebarOpen(false)} />
      </div>

      {/* main sidebar */}
      <div className="flex-1 overflow-auto">
        <Topbar sidebarOpen={sidebarOpen} onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="mx-auto max-w-[calc(100vw-0rem)] p-2 md:p-6 lg:max-w-[calc(100vw-0rem)]">
          <div className="min-h-[calc(100vh-8rem)]">{children}</div>
        </main>
      </div>
    </div>
  )
}
