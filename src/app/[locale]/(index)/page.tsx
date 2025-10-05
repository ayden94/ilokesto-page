import { GithubIcon } from '@/ui/components/icons/GithubIcon'
import { Footer } from '@/ui/widgets/Footer'
import { Header } from '@/ui/widgets/Header'
import Link from 'next/link'

// GitHub 프로필의 Pinned 레포지토리 정보를 기반으로 생성되었습니다.
const libraries = [
  {
    name: 'caro-kann',
    description: 'React.js의 전역 상태(Global State) 관리를 위한 TypeScript 라이브러리입니다.',
    repoUrl: 'https://github.com/ilokesto/caro-kann',
    docsUrl: 'https://github.com/ilokesto/caro-kann#readme',
    npmUrl: 'https://www.npmjs.com/package/caro-kann',
    tags: [
      'State Management',
      'React',
      'Global State',
      'Hooks',
      'Middleware',
      'Persistence',
      'Derived State',
      'ReadOnly',
      'Mergeable Store',
    ],
  },
  {
    name: 'sicilian',
    description: 'React.js의 전역 폼 상태(Global Form State) 관리를 위한 TypeScript 라이브러리입니다.',
    repoUrl: 'https://github.com/ilokesto/sicilian',
    docsUrl: 'https://github.com/ilokesto/sicilian#readme',
    npmUrl: 'https://www.npmjs.com/package/sicilian',
    tags: [
      'Form State',
      'Global State',
      'Validation',
      'Controlled Components',
      'Runtime Validation',
      'React',
      'Schema Integration',
    ],
  },
  {
    name: 'grunfeld',
    description: 'React.js를 위한 간단하고 직관적인 다이얼로그(Dialog) 관리 라이브러리입니다.',
    repoUrl: 'https://github.com/ilokesto/grunfeld',
    docsUrl: 'https://github.com/ilokesto/grunfeld#readme',
    npmUrl: 'https://www.npmjs.com/package/grunfeld',
    tags: ['Dialog', 'Modal', 'Prompt', 'Promise-based', 'React', 'Positioning', 'Customizable', 'Async UI'],
  },
  {
    name: 'utilinent',
    description: 'SolidJS의 간결하고 직관적인 제어 흐름 API를 React.js로 가져오는 라이브러리입니다.',
    repoUrl: 'https://github.com/ilokesto/utilinent',
    docsUrl: 'https://github.com/ilokesto/utilinent#readme',
    npmUrl: 'https://www.npmjs.com/package/utilinent',
    tags: ['Control Flow', 'Conditional Rendering', 'Flow API', 'React', 'Declarative UI', 'Lightweight'],
  },
  {
    name: 'common-resolver',
    description: '다양한 스키마 유효성 검사 라이브러리를 일관된 인터페이스로 통합하는 유틸리티 라이브러리입니다.',
    repoUrl: 'https://github.com/ilokesto/common-resolver',
    docsUrl: 'https://github.com/ilokesto/common-resolver#readme',
    npmUrl: 'https://www.npmjs.com/package/common-resolver',
    tags: [
      'Validation',
      'Schema Adapter',
      'Unified Interface',
      'Resolver Pattern',
      'Type-safe Validation',
      'Extensible',
    ],
  },
  {
    name: 'neato',
    description: 'React와 TailwindCSS를 위한 모던하고 접근성 높은 UI 컴포넌트 라이브러리입니다.',
    repoUrl: 'https://github.com/ilokesto/neato',
    docsUrl: 'https://github.com/ilokesto/neato#readme',
    npmUrl: 'https://www.npmjs.com/package/neato',
    tags: ['UI Components', 'TailwindCSS', 'Accessible UI', 'Design System', 'React Components', 'Theming'],
  },
  {
    name: 'path-codegen',
    description: '타입스크립트 프로젝트의 경로 별칭(Path Alias)을 위한 코드 생성기입니다.',
    repoUrl: 'https://github.com/ilokesto/path-codegen',
    docsUrl: 'https://github.com/ilokesto/path-codegen#readme',
    npmUrl: 'https://www.npmjs.com/package/path-codegen',
    tags: ['Codegen', 'Path Alias', 'CLI Tool', 'TypeScript', 'Build Tool', 'Module Resolution'],
  },
]

export default function IndexPage() {
  return (
    <>
      <Header githubLink="https://github.com/ilokesto" title="@ilokesto" />

      <main className="max-w-[1440px] mx-auto p-6">
        {/* Hero Section: 자신을 소개하는 섹션 */}
        <section className="text-center my-16 md:my-24">
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            ilokesto[iloˈkɛsto], which means &quot;toolbox&quot; in Esperanto,
            <br />
            is a collection of various libraries for TypeScript and React.
          </p>
        </section>

        {/* Libraries Section: 라이브러리 목록을 보여주는 섹션 */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {libraries.map((lib) => (
              <div key={lib.name} className="card p-6 flex flex-col">
                <div className="flex-grow">
                  <h4 className="text-xl font-semibold mb-2">{lib.name}</h4>
                  <p className="mb-4">{lib.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {lib.tags.map((tag) => (
                      <span key={tag} className="text-xs font-mono px-2 py-1 rounded-full bg-black/5 dark:bg-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-auto">
                  <Link href={lib.repoUrl} title="GitHub Repository">
                    <GithubIcon />
                  </Link>
                  <Link href={lib.docsUrl} className="text-sm font-medium hover:underline">
                    문서 보기
                  </Link>
                  {/* 필요에 따라 npm 링크 등을 추가할 수 있습니다. */}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer: 페이지 하단 */}
      <Footer />
    </>
  )
}
