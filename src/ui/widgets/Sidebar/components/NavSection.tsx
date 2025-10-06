import { SIDEBAR_STYLES } from '../constants'
import { normalizeTitle } from '../utils/normalize'
import { ChevronIcon } from './ChevronIcon'

interface NavSectionProps {
  title: string
  level: number
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}

export function NavSection({ title, level, isOpen, onToggle, children }: NavSectionProps) {
  const indentClass = level === 0 ? '' : SIDEBAR_STYLES.indent

  return (
    <div className={indentClass}>
      <button onClick={onToggle} className={SIDEBAR_STYLES.section.button}>
        <span className={SIDEBAR_STYLES.section.title}>{normalizeTitle(title)}</span>
        <ChevronIcon isOpen={isOpen} className={SIDEBAR_STYLES.section.chevron} />
      </button>
      <div className={`${SIDEBAR_STYLES.section.content} ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div>{children}</div>
      </div>
    </div>
  )
}
