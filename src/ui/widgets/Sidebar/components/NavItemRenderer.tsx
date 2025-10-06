'use client'

import { usePathname } from 'next/navigation'
import type { NavItem } from '../types'
import { isPathActive } from '../utils/navigation'
import { generateNavItemId } from '../utils/normalize'
import { NavLabel } from './NavLabel'
import { NavLink } from './NavLink'
import { NavSection } from './NavSection'

interface NavItemRendererProps {
  item: NavItem
  basePath: string
  level: number
  isSectionOpen: (id: string) => boolean
  toggleSection: (id: string) => void
  onClose?: () => void
  parentId?: string
}

export function NavItemRenderer({
  item,
  basePath,
  level,
  isSectionOpen,
  toggleSection,
  onClose,
  parentId = '',
}: NavItemRendererProps) {
  const pathname = usePathname()
  const itemId = generateNavItemId(item.title, item.href, parentId)
  const hasChildren = item.children && item.children.length > 0

  // Section with children
  if (hasChildren) {
    // If the parent has an href, render the section always open and make the title a link.
    if (item.href) {
      return (
        <NavSection title={item.title} level={level} href={item.href}>
          {item.children?.map((child) => (
            <NavItemRenderer
              key={generateNavItemId(child.title, child.href, itemId)}
              item={child}
              basePath={basePath}
              level={level + 1}
              isSectionOpen={isSectionOpen}
              toggleSection={toggleSection}
              onClose={onClose}
              parentId={itemId}
            />
          ))}
        </NavSection>
      )
    }

    const isOpen = isSectionOpen(itemId)

    return (
      <NavSection title={item.title} level={level} isOpen={isOpen} onToggle={() => toggleSection(itemId)}>
        {item.children?.map((child) => (
          <NavItemRenderer
            key={generateNavItemId(child.title, child.href, itemId)}
            item={child}
            basePath={basePath}
            level={level + 1}
            isSectionOpen={isSectionOpen}
            toggleSection={toggleSection}
            onClose={onClose}
            parentId={itemId}
          />
        ))}
      </NavSection>
    )
  }

  // Link item
  if (item.href) {
    const targetPath = `${basePath}${item.href}`
    const isActive = isPathActive(pathname, targetPath)

    return (
      <NavLink
        title={item.title}
        href={item.href}
        basePath={basePath}
        level={level}
        isActive={isActive}
        onClose={onClose}
      />
    )
  }

  // Label only (no href, no children)
  return <NavLabel title={item.title} level={level} />
}
