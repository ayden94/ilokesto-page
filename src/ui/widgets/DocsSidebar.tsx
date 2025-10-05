'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface NavItem {
  title: string
  href?: string
  children?: NavItem[]
}

interface DocsSidebarProps {
  navigation: NavItem[]
  basePath: string
  isOpen?: boolean
  onClose?: () => void
}

export function DocsSidebar({ navigation, basePath, isOpen = true, onClose }: DocsSidebarProps) {
  const pathname = usePathname()
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['guides', 'utils', 'middlewares']))

  const toggleSection = (title: string) => {
    const newOpenSections = new Set(openSections)
    if (newOpenSections.has(title.toLowerCase())) {
      newOpenSections.delete(title.toLowerCase())
    } else {
      newOpenSections.add(title.toLowerCase())
    }
    setOpenSections(newOpenSections)
  }

  const renderNavItem = (item: NavItem, level = 0) => {
    const isCurrentPage = item.href && pathname === `${basePath}${item.href}`
    const hasChildren = item.children && item.children.length > 0
    const isOpen = openSections.has(item.title.toLowerCase())
    const indentClass = level === 0 ? '' : 'ml-4 pl-4 border-l border-gray-200 dark:border-gray-700'

    if (hasChildren) {
      return (
        <div key={item.title} className={indentClass}>
          <button
            onClick={() => toggleSection(item.title)}
            className="flex items-center justify-between w-full py-2 text-left"
          >
            <span className="font-medium">{item.title}</span>
            <svg
              className={`w-4 h-4 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            className={`mt-1 overflow-hidden transition-all duration-300 ease-in-out ${
              isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div>{item.children?.map((child) => renderNavItem(child, level + 1))}</div>
          </div>
        </div>
      )
    }

    if (item.href) {
      return (
        <div key={item.title} className={indentClass}>
          <Link
            href={`${basePath}${item.href}`}
            className={`block py-2 px-3 rounded-md text-sm transition-colors ${
              isCurrentPage
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-medium'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            {item.title}
          </Link>
        </div>
      )
    }

    return (
      <div key={item.title} className={`${indentClass} py-2`}>
        <span className="text-gray-500 dark:text-gray-400 font-medium text-sm uppercase tracking-wide">
          {item.title}
        </span>
      </div>
    )
  }

  return (
    <>
      {/* Mobile overlay (always mounted to allow animation) */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isOpen}
      >
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={onClose}
        />

        {/* Sliding sidebar */}
        <aside
          className={`fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 overflow-y-auto transform transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-end p-3 h-16 border-b border-gray-200 dark:border-gray-700">
            <button onClick={onClose} className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="pt-10 p-6">
            <nav className="space-y-2">{navigation.map((item) => renderNavItem(item))}</nav>
          </div>
        </aside>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block overflow-y-auto h-full">
        <nav className="space-y-2">{navigation.map((item) => renderNavItem(item))}</nav>
      </aside>
    </>
  )
}
