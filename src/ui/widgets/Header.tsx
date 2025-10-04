import Link from 'next/link'
import { GithubIcon } from '../components/icons/GithubIcon'
import { LocaleToggler } from '../features/LocaleToggler'
import { ThemeToggler } from '../features/ThemeToggler'

export function Header({ githubLink, title }: { githubLink: string; title: string }) {
  return (
    <header className="flex items-center">
      <h1 className="flex-grow text-lg font-medium">{title}</h1>
      <div>
        <LocaleToggler />
        <ThemeToggler />
        <Link href={githubLink}>
          <GithubIcon />
        </Link>
      </div>
    </header>
  )
}
