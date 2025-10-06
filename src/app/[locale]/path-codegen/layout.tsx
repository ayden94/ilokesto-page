'use client'

import { Header } from '@/ui/widgets/Header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen grid grid-rows-[auto_1fr]">
      <Header githubLink="https://github.com/ilokesto/path-codegen" title="path-codegen" showMenuButton={false} />

      <div className="max-w-[1440px] mx-auto h-full">
        <div className="max-w-[920px] pt-12 px-8 pb-30 m-auto">{children}</div>
      </div>
    </div>
  )
}
