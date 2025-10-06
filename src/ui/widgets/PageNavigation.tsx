'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { NavItem } from './Sidebar/types'
import { findAdjacentPages } from './Sidebar/utils/flattenNavigation'
import { normalizeTitle } from './Sidebar/utils/normalize'

interface PageNavigationProps {
  navigation: NavItem[]
  basePath: string
}

export function PageNavigation({ navigation, basePath }: PageNavigationProps) {
  const pathname = usePathname()
  const { prev, next } = findAdjacentPages(navigation, basePath, pathname)

  if (!prev && !next) {
    return null
  }

  return (
    <nav className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
      <div className="grid grid-cols-2 gap-4">
        {/* Previous Page - Always on the left */}
        <div>
          {prev && (
            <Link
              href={prev.fullPath}
              className="group flex flex-col p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all"
            >
              <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">← Previous</span>
              <span className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {normalizeTitle(prev.title)}
              </span>
            </Link>
          )}
        </div>

        {/* Next Page - Always on the right */}
        <div>
          {next && (
            <Link
              href={next.fullPath}
              className="group flex flex-col p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all text-right"
            >
              <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">Next →</span>
              <span className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {normalizeTitle(next.title)}
              </span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
