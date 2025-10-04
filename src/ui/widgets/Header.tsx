import Link from 'next/link'
import { GithubIcon } from '../components/icons/GithubIcon'
import { LocaleToggler } from '../features/LocaleToggler'
import { ThemeToggler } from '../features/ThemeToggler'

export function Header({ githubLink, title }: { githubLink: string; title: string }) {
  return (
    <header className=" sticky top-0 z-auto custom-shadow">
      <div className="flex items-center h-16 max-w-[1440px] mx-auto p-6">
        <h1 className="flex-grow text-2xl/6 font-medium">{title}</h1>

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
