interface ChevronIconProps {
  isOpen?: boolean
  className?: string
  variant?: 'toggle' | 'link'
}

export function ChevronIcon({ isOpen = false, className = '', variant = 'toggle' }: ChevronIconProps) {
  if (variant === 'link') {
    return (
      <svg
        className={`w-4 h-4 transform ${className} rotate-180`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    )
  }

  return (
    <svg
      className={`w-4 h-4 transition-transform duration-200 ease-in-out ${isOpen ? 'rotate-90' : ''} ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
}
