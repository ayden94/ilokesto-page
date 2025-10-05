import { neato } from 'neato'
import Link from 'next/link'
import { GithubIcon } from '../components/icons/GithubIcon'
import { LocaleToggler } from '../features/LocaleToggler'
import { ThemeToggler } from '../features/ThemeToggler'

interface HeaderProps {
  githubLink: string
  title: string
  className?: string
  showMenuButton?: boolean
  onMenuClick?: () => void
}

export function Header({ githubLink, title, className, showMenuButton, onMenuClick }: HeaderProps) {
  return (
    <header className={neato(`sticky top-0 z-50 custom-shadow ${className}`)}>
      <div className="flex items-center h-16 max-w-[1440px] mx-auto p-6">
        <div className="flex items-center gap-3">
          {showMenuButton && (
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
          <h1 className="text-2xl/6 font-medium">{title}</h1>
        </div>

        <div className="flex-grow" />

        <div className="flex items-center gap-4">
          <LocaleToggler />
          <ThemeToggler />
          <Link href={githubLink}>
            <GithubIcon />
          </Link>
        </div>
      </div>
    </header>
  )
}
