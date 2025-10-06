'use client'

import { SIDEBAR_STYLES } from '../constants'
import type { NavItem } from '../types'
import { CloseButton } from './CloseButton'
import { SidebarContent } from './SidebarContent'

interface MobileSidebarProps {
  navigation: NavItem[]
  basePath: string
  isOpen: boolean
  isSectionOpen: (id: string) => boolean
  toggleSection: (id: string) => void
  onClose?: () => void
}

export function MobileSidebar({
  navigation,
  basePath,
  isOpen,
  isSectionOpen,
  toggleSection,
  onClose,
}: MobileSidebarProps) {
  return (
    <div
      className={`${SIDEBAR_STYLES.mobile.overlay} ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <div className={`${SIDEBAR_STYLES.mobile.backdrop} ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />

      {/* Sliding sidebar */}
      <aside
        className={`${SIDEBAR_STYLES.mobile.sidebar} ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={SIDEBAR_STYLES.mobile.header}>
          <CloseButton onClick={onClose} />
        </div>
        <div className={SIDEBAR_STYLES.mobile.content}>
          <SidebarContent
            navigation={navigation}
            basePath={basePath}
            isSectionOpen={isSectionOpen}
            toggleSection={toggleSection}
            onClose={onClose}
          />
        </div>
      </aside>
    </div>
  )
}
