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
        githubLink="https://github.com/ilokesto/sicilian"
        title="sicilian"
        showMenuButton
        onMenuClick={() => setSidebarOpen(true)}
      />

      <div className="overflow-hidden">
        <div className="max-w-[1440px] mx-auto h-full">
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] pb-0 gap-6 h-full overflow-hidden">
            <Sidebar
              navigation={navigation}
              basePath="/sicilian"
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />

            <main className="overflow-auto">
              <div className="max-w-[920px] pt-12 px-8 pb-30 m-auto">
                {children}
                <PageNavigation navigation={navigation} basePath="/sicilian" />
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
    title: 'Introduce the sicilian',
    href: '/',
  },
  {
    title: 'API Reference',
    href: '/api-reference',
  },
  {
    title: 'CLI usage',
    href: '/cli-usage',
  },
  {
    title: 'Tutorials',
    href: '/tutorials',
    children: [
      {
        title: 'Static Form',
        href: '/tutorials/static-form',
      },
      {
        title: 'Dynamic Form',
        href: '/tutorials/dynamic-form',
      },
      {
        title: 'Custom Form',
        href: '/tutorials/custom-form',
      },
    ],
  },
  {
    title: 'Guides',
    children: [
      { title: 'Create a store', href: '/guides/create-store' },
      { title: 'Basic usage', href: '/guides/basic-usage' },
      { title: 'Provider', href: '/guides/provider' },
    ],
  },
]
