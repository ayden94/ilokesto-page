import { SIDEBAR_STYLES } from '../constants'

interface CloseButtonProps {
  onClick?: () => void
}

export function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <button onClick={onClick} className={SIDEBAR_STYLES.mobile.closeButton}>
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  )
}
