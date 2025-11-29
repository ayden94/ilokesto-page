import { Link } from '@/shared/i18n/navigation'
import { SIDEBAR_STYLES } from '../constants'
import { normalizeTitle } from '../utils/normalize'
import { ChevronIcon } from './ChevronIcon'

interface NavSectionProps {
  title: string
  level: number
  isOpen?: boolean
  onToggle?: () => void
  href?: string
  basePath?: string
  children: React.ReactNode
}

export function NavSection({ title, level, isOpen = false, onToggle, href, basePath, children }: NavSectionProps) {
  const indentClass = level === 0 ? '' : SIDEBAR_STYLES.indent

  return (
    <div className={indentClass}>
      {href ? (
        <div className={SIDEBAR_STYLES.section.button}>
          <Link href={`${basePath ?? ''}${href}`} className={SIDEBAR_STYLES.section.title}>
            {normalizeTitle(title)}
          </Link>
          {/* keep chevron purely visual for now (no toggle) */}
          <ChevronIcon isOpen={true} className={SIDEBAR_STYLES.section.chevron} variant={href ? 'link' : 'toggle'} />
        </div>
      ) : (
        <button onClick={onToggle} className={SIDEBAR_STYLES.section.button}>
          <span className={SIDEBAR_STYLES.section.title}>{normalizeTitle(title)}</span>
          <ChevronIcon isOpen={isOpen} className={SIDEBAR_STYLES.section.chevron} />
        </button>
      )}
      <div
        className={`${SIDEBAR_STYLES.section.content} ${href || isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div>{children}</div>
      </div>
    </div>
  )
}
