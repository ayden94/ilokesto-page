interface ChevronIconProps {
  isOpen: boolean
  className?: string
}

export function ChevronIcon({ isOpen, className = '' }: ChevronIconProps) {
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
