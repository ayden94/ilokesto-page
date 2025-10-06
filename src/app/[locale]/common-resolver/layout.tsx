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
              <div className="max-w-[920px] pt-12 px-8 pb-30 m-auto">
                {children}
                <PageNavigation navigation={navigation} basePath="/common-resolver" />
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
    title: 'Introduce the common-resolver',
    href: '/',
  },
  {
    title: 'Resolver',
    href: '/resolver',
  },
  {
    title: 'CRES',
    href: '/cres',
  },
]
