import Link from 'next/link'
import { SIDEBAR_STYLES } from '../constants'
import { normalizeTitle } from '../utils/normalize'

interface NavLinkProps {
  title: string
  href: string
  basePath: string
  level: number
  isActive: boolean
  onClose?: () => void
}

export function NavLink({ title, href, basePath, level, isActive, onClose }: NavLinkProps) {
  const indentClass = level === 0 ? '' : SIDEBAR_STYLES.indent
  const linkStyles = isActive ? SIDEBAR_STYLES.link.active : SIDEBAR_STYLES.link.inactive

  return (
    <div className={indentClass}>
      <Link
        href={`${basePath}${href}`}
        onClick={() => onClose?.()}
        className={`${SIDEBAR_STYLES.link.base} ${linkStyles}`}
      >
        {normalizeTitle(title)}
      </Link>
    </div>
  )
}
