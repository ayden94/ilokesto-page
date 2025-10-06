'use client'

import { DesktopSidebar } from './components/DesktopSidebar'
import { MobileSidebar } from './components/MobileSidebar'
import { useNavigation } from './hooks/useNavigation'
import type { SidebarProps } from './types'

export function Sidebar({ navigation, basePath, isOpen = false, onClose }: SidebarProps) {
  const { isSectionOpen, toggleSection } = useNavigation(navigation)

  return (
    <>
      <MobileSidebar
        navigation={navigation}
        basePath={basePath}
        isOpen={isOpen}
        isSectionOpen={isSectionOpen}
        toggleSection={toggleSection}
        onClose={onClose}
      />
      <DesktopSidebar
        navigation={navigation}
        basePath={basePath}
        isSectionOpen={isSectionOpen}
        toggleSection={toggleSection}
      />
    </>
  )
}

// Re-export types and utilities for convenience
export type { NavItem, SidebarProps } from './types'
export { findAdjacentPages, flattenNavigation } from './utils/flattenNavigation'
export type { FlatNavItem } from './utils/flattenNavigation'
