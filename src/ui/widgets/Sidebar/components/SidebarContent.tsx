'use client'

import { SIDEBAR_STYLES } from '../constants'
import type { NavItem } from '../types'
import { generateNavItemId } from '../utils/normalize'
import { NavItemRenderer } from './NavItemRenderer'

interface SidebarContentProps {
  navigation: NavItem[]
  basePath: string
  isSectionOpen: (id: string) => boolean
  toggleSection: (id: string) => void
  onClose?: () => void
}

export function SidebarContent({ navigation, basePath, isSectionOpen, toggleSection, onClose }: SidebarContentProps) {
  return (
    <nav className={SIDEBAR_STYLES.nav}>
      {navigation.map((item) => (
        <NavItemRenderer
          key={generateNavItemId(item.title, item.href)}
          item={item}
          basePath={basePath}
          level={0}
          isSectionOpen={isSectionOpen}
          toggleSection={toggleSection}
          onClose={onClose}
        />
      ))}
    </nav>
  )
}
