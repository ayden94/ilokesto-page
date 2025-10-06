'use client'

import { SIDEBAR_STYLES } from '../constants'
import type { NavItem } from '../types'
import { SidebarContent } from './SidebarContent'

interface DesktopSidebarProps {
  navigation: NavItem[]
  basePath: string
  isSectionOpen: (id: string) => boolean
  toggleSection: (id: string) => void
}

export function DesktopSidebar({ navigation, basePath, isSectionOpen, toggleSection }: DesktopSidebarProps) {
  return (
    <aside className={SIDEBAR_STYLES.desktop.sidebar}>
      <SidebarContent
        navigation={navigation}
        basePath={basePath}
        isSectionOpen={isSectionOpen}
        toggleSection={toggleSection}
      />
    </aside>
  )
}
