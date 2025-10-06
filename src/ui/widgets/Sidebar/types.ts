export interface NavItem {
  title: string
  href?: string
  children?: NavItem[]
  /** Optional initial open state for items with children. Defaults to true. */
  isOpen?: boolean
}

export interface SidebarProps {
  navigation: NavItem[]
  basePath: string
  isOpen?: boolean
  onClose?: () => void
}

export interface NavItemProps {
  item: NavItem
  basePath: string
  level: number
  isOpen: boolean
  isCurrentPage: boolean
  onToggle: () => void
  onClose?: () => void
}
