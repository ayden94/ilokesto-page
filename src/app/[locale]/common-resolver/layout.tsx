'use client'

import { Header } from '@/ui/widgets/Header'
import { Sidebar } from '@/ui/widgets/Sidebar'
import { useState } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="h-screen grid grid-rows-[auto_1fr]">
      <Header
        githubLink="https://github.com/ilokesto/common-resolver"
        title="common-resolver"
        showMenuButton
        onMenuClick={() => setSidebarOpen(true)}
      />

      <div className="overflow-hidden">
        <div className="max-w-[1440px] mx-auto h-full">
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] pb-0 gap-6 h-full overflow-hidden">
            <Sidebar
              navigation={navigation}
              basePath="/common-resolver"
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />

            <main className="overflow-auto">
              <div className="max-w-[920px] pt-12 px-8 pb-30 m-auto">{children}</div>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

const navigation = [
  {
    title: 'Introduce the\ncommon-resolver',
    href: '/',
  },
  {
    title: 'Tutorials',
    href: '/tutorials',
  },
  {
    title: 'Guides',
    isOpen: false,
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
