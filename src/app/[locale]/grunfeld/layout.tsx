'use client'

import { Header } from '@/ui/widgets/Header'
import { PageNavigation } from '@/ui/widgets/PageNavigation'
import { Sidebar } from '@/ui/widgets/Sidebar'
import { useState } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="h-screen grid grid-rows-[auto_1fr]">
      <Header
        githubLink="https://github.com/ilokesto/grunfeld"
        title="grunfeld"
        showMenuButton
        onMenuClick={() => setSidebarOpen(true)}
      />

      <div className="overflow-hidden">
        <div className="max-w-[1440px] mx-auto h-full">
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] pb-0 gap-6 h-full overflow-hidden">
            <Sidebar
              navigation={navigation}
              basePath="/grunfeld"
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />

            <main className="overflow-auto">
              <div className="max-w-[920px] pt-12 px-8 pb-30 m-auto">
                {children}
                <PageNavigation navigation={navigation} basePath="/grunfeld" />
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

const navigation = [
  {
    title: 'Introduce Grunfeld',
    href: '/',
  },
  {
    title: 'API Reference',
    href: '/api',
  },
  {
    title: 'Guides',
    children: [
      { title: 'Basic Usage', href: '/guides/basic-usage' },
      { title: 'Provider Setup', href: '/guides/provider-setup' },
      { title: 'Dialog Patterns', href: '/guides/dialog-patterns' },
      { title: 'Async Handling', href: '/guides/async-handling' },
    ],
  },

  {
    title: 'Configuration',
    children: [
      { title: 'Provider Options', href: '/config/provider-options' },
      { title: 'Dialog Options', href: '/config/dialog-options' },
      { title: 'Position System', href: '/config/position-system' },
      { title: 'Render Modes', href: '/config/render-modes' },
    ],
  },
  {
    title: 'Examples',
    children: [
      { title: 'Alert Dialog', href: '/examples/alert-dialog' },
      { title: 'Confirmation Dialog', href: '/examples/confirm-dialog' },
      { title: 'Input Dialog', href: '/examples/input-dialog' },
      { title: 'Custom Styling', href: '/examples/custom-styling' },
      { title: 'Promise Handling', href: '/examples/promise-handling' },
    ],
  },
]
