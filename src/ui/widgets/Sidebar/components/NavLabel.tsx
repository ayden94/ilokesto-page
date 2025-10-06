import { SIDEBAR_STYLES } from '../constants'
import { normalizeTitle } from '../utils/normalize'

interface NavLabelProps {
  title: string
  level: number
}

export function NavLabel({ title, level }: NavLabelProps) {
  const indentClass = level === 0 ? '' : SIDEBAR_STYLES.indent

  return (
    <div className={`${indentClass} py-2`}>
      <span className={SIDEBAR_STYLES.label}>{normalizeTitle(title)}</span>
    </div>
  )
}
