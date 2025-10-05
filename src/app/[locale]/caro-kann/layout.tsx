'use client'

import { DocsSidebar } from '@/ui/widgets/DocsSidebar'
import { Header } from '@/ui/widgets/Header'
import { useState } from 'react'

const navigation = [
  {
    title: 'Introduce the caro-kann',
    href: '/',
  },
  {
    title: 'Tutorials',
  },
  {
    title: 'Guides',
    children: [
      { title: 'Create a store', href: '/guides/create-store' },
      { title: 'Basic usage', href: '/guides/basic-usage' },
      { title: 'Provider', href: '/guides/provider' },
    ],
  },
  {
    title: 'Utils',
    children: [
      { title: 'Adaptor', href: '/utils/adaptor' },
      { title: 'Merge', href: '/utils/merge' },
    ],
  },
  {
    title: 'Middlewares',
    children: [
      { title: 'logger', href: '/middlewares/logger' },
      { title: 'devtools', href: '/middlewares/devtools' },
      { title: 'debounce', href: '/middlewares/debounce' },
      { title: 'persist', href: '/middlewares/persist' },
      { title: 'validate', href: '/middlewares/validate' },
      { title: 'reducer', href: '/middlewares/reducer' },
      { title: 'Middleware Composition', href: '/middlewares/composition' },
    ],
  },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="h-screen grid grid-rows-[auto_1fr]">
      <Header
        githubLink="https://github.com/ilokesto/caro-kann"
        title="caro-kann"
        showMenuButton
        onMenuClick={() => setSidebarOpen(true)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] overflow-hidden">
        <DocsSidebar
          navigation={navigation}
          basePath="/caro-kann"
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="overflow-auto">
          <div className="max-w-4xl mx-auto p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
