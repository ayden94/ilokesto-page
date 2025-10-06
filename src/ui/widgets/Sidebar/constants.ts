export const SIDEBAR_STYLES = {
  indent: 'ml-4 pl-2 border-l border-gray-200 dark:border-gray-700',
  link: {
    base: 'block py-2 px-3 rounded-md text-sm transition-colors',
    active: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-medium',
    inactive:
      'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800',
  },
  section: {
    button: 'flex items-center justify-between w-full py-2 text-left',
    title: 'font-medium',
    chevron: 'w-4 h-4 transition-transform duration-200 ease-in-out',
    content: 'mt-1 overflow-hidden transition-all duration-300 ease-in-out',
  },
  label: 'text-sm font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400',
  mobile: {
    overlay: 'fixed inset-0 z-50 lg:hidden transition-opacity duration-300',
    backdrop: 'fixed inset-0 bg-black/50 transition-opacity duration-300',
    sidebar:
      'fixed left-0 top-0 h-full w-64 border-r border-gray-200 dark:border-gray-700 overflow-y-auto transform transition-transform duration-300',
    header: 'flex items-center justify-end h-16 p-3 border-b border-gray-200 dark:border-gray-700',
    closeButton: 'p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800',
    content: 'p-6 pt-10',
  },
  desktop: {
    sidebar: 'hidden h-full pt-10 pl-4 overflow-y-auto lg:block',
  },
  nav: 'space-y-2',
} as const
