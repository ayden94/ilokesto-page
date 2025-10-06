import { GithubIcon } from '@/ui/components/icons/GithubIcon'
import { Footer } from '@/ui/widgets/Footer'
import { Header } from '@/ui/widgets/Header'
import { For } from '@ilokesto/utilinent'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

type LibraryNames = 'caro-kann' | 'sicilian' | 'grunfeld' | 'utilinent' | 'common-resolver' | 'path-codegen'

// GitHub 프로필의 Pinned 레포지토리 정보를 기반으로 생성되었습니다.
const libraries = [
  {
    name: 'caro-kann',
    primary: 'hover:bg-carokann-primary',
    secondary: 'hover:text-carokann-secondary',
    tags: ['State Management', 'Global State', 'Middleware', 'Persistence', 'Derived State', 'Mergeable Store'],
  },
  {
    name: 'sicilian',
    primary: 'hover:bg-sicilian-primary',
    secondary: 'hover:text-sicilian-secondary',
    tags: ['Form State', 'Validation', 'Controlled Components', 'Runtime Validation', 'Schema Integration'],
  },
  {
    name: 'grunfeld',
    primary: 'hover:bg-grunfeld-primary',
    secondary: 'hover:text-grunfeld-secondary',
    tags: ['Dialog', 'Modal', 'Prompt', 'Promise-based', 'React', 'Positioning', 'Customizable', 'Async UI'],
  },
  {
    name: 'utilinent',
    primary: 'hover:bg-utilinent-primary',
    secondary: 'hover:text-utilinent-secondary',
    tags: ['Control Flow', 'Conditional Rendering', 'Flow API', 'React', 'Declarative UI', 'Lightweight'],
  },
  {
    name: 'common-resolver',
    primary: 'hover:bg-common-resolver-primary',
    secondary: 'hover:text-common-resolver-secondary',
    tags: ['Schema Validation', 'Adapter', 'Migration', 'Zod', 'Yup', 'Superstruct'],
  },
  {
    name: 'path-codegen',
    primary: 'hover:bg-pathcodegen-primary',
    secondary: 'hover:text-pathcodegen-secondary',
    tags: ['Code Generation', 'TypeScript', 'Path Utilities', 'Type Safety', 'Developer Experience'],
  },
] satisfies Array<{ name: LibraryNames; tags: Array<string>; primary: string; secondary: string }>

export default async function IndexPage() {
  const t = await getTranslations('ilokesto')

  return (
    <>
      <Header githubLink="https://github.com/ilokesto" className="custom-shadow" />

      <main className="max-w-[1440px] mx-auto p-6">
        {/* Hero Section: 자신을 소개하는 섹션 */}
        <section className="my-16 text-center md:my-24">
          <p className="max-w-3xl mx-auto text-lg md:text-xl">{t.rich('introduce', { br: () => <br /> })}</p>
        </section>

        {/* Libraries Section: 라이브러리 목록을 보여주는 섹션 */}
        <section>
          <For.div each={libraries} className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {(tag) => <LibraryCard key={tag.name} {...tag} />}
          </For.div>
        </section>
      </main>

      {/* Footer: 페이지 하단 */}
      <Footer />
    </>
  )
}

async function LibraryCard({
  name,
  tags,
  primary,
  secondary,
}: {
  name: LibraryNames
  tags: string[]
  primary: string
  secondary: string
}) {
  const t = await getTranslations('ilokesto')

  return (
    <div key={name} className={`card p-6 flex flex-col transition-all duration-200 ${primary} ${secondary}`}>
      <div className="flex-grow">
        <h4 className={`text-xl font-semibold mb-2 `}>{name}</h4>

        <p className="mb-4">{t.rich(`${name}.description`)}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span key={tag} className="px-2 py-1 font-mono text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 mt-auto">
        <Link href={`https://github.com/ilokesto/${name}`} title="GitHub Repository">
          <GithubIcon />
        </Link>

        <Link href={`/${name}`} className="text-sm font-medium hover:underline">
          문서 보기
        </Link>

        {/* 필요에 따라 npm 링크 등을 추가할 수 있습니다. */}
      </div>
    </div>
  )
}
