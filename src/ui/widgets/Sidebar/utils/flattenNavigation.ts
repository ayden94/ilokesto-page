import type { NavItem } from '../types'

export interface FlatNavItem {
  title: string
  href: string
  fullPath: string
}

/**
 * Flattens nested navigation structure into a linear array of pages with href.
 * Only includes items that have an href (actual pages).
 */
export function flattenNavigation(navigation: NavItem[], basePath: string): FlatNavItem[] {
  const result: FlatNavItem[] = []

  function walk(items: NavItem[]) {
    for (const item of items) {
      if (item.href) {
        result.push({
          title: item.title,
          href: item.href,
          fullPath: `${basePath}${item.href}`,
        })
      }
      if (item.children && item.children.length > 0) {
        walk(item.children)
      }
    }
  }

  walk(navigation)
  return result
}

/**
 * Finds the previous and next pages based on the current pathname.
 */
export function findAdjacentPages(
  navigation: NavItem[],
  basePath: string,
  currentPathname: string,
): { prev: FlatNavItem | null; next: FlatNavItem | null } {
  const flatNav = flattenNavigation(navigation, basePath)

  // Normalize paths for comparison
  const normalizedCurrent = currentPathname.replace(/\/+$/, '')

  const currentIndex = flatNav.findIndex((item) => normalizedCurrent.endsWith(item.fullPath.replace(/\/+$/, '')))

  if (currentIndex === -1) {
    return { prev: null, next: null }
  }

  return {
    prev: currentIndex > 0 ? flatNav[currentIndex - 1] : null,
    next: currentIndex < flatNav.length - 1 ? flatNav[currentIndex + 1] : null,
  }
}
