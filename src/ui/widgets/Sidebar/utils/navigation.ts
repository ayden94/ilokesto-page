import type { NavItem } from '../types'
import { generateNavItemId } from './normalize'

/**
 * Computes the initial set of open section IDs from navigation items.
 * Sections are open by default unless explicitly set to isOpen: false.
 */
export function computeInitialOpenSections(navigation: NavItem[]): Set<string> {
  const openSections = new Set<string>()

  function walk(items: NavItem[], parentId = '') {
    for (const item of items) {
      if (item.children && item.children.length > 0) {
        const itemId = generateNavItemId(item.title, item.href, parentId)

        // Default to open unless explicitly set to false
        if (item.isOpen !== false) {
          openSections.add(itemId)
        }

        walk(item.children, itemId)
      }
    }
  }

  walk(navigation)
  return openSections
}

/**
 * Checks if a path matches the current pathname.
 */
export function isPathActive(pathname: string, targetPath: string): boolean {
  if (!targetPath) return false

  const normalizedPathname = pathname.replace(/\/+$/, '')
  const normalizedTarget = targetPath.replace(/\/+$/, '')

  return normalizedPathname.endsWith(normalizedTarget)
}
