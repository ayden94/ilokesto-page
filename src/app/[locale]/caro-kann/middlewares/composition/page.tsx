import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale as 'ko' | 'en'
  const t = await getTranslations({ locale, namespace: 'metadata.caroKann' })
  return { title: t('middlewares'), description: t('middlewares') }
}

export default async function Page() {
  const t = await getTranslations('caroKann.middlewares.composition')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const useStore = create(
  reducer(
    (store, { type, payload = 1 }: { type: string, payload?: number }) => {
      switch (type) {
        case "INCREMENT":
          return { count: store.count + payload };
        case "DECREMENT":
          return { count: store.count - payload };
        default:
          return store;
      }
    },
    persist(
      devtools(
        { count: 0 },
        "devtoolsTestStore"
      ),
      { local: "count" }
    )
  )
);`}</CodeBlock>

      <CodeBlock language="tsx">{`export default function Page() {
  const [count, dispatch] = useStore(store => store.count)

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch({ type: "INCREMENT", payload: 2 })}>Increment</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>Decrement</button>
    </div>
  )
}`}</CodeBlock>

      <Heading.h2>{t('subtitle1')}</Heading.h2>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const useStore = create(
  persist(validate({ count: 0 }, zSchema), { local: "count" })
);

const useStore = create(
  validate(persist({ count: 0 }, { local: "count" }), zSchema)
);`}</CodeBlock>

      <Textline>{t.rich('2', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const useStore = create(
  debounce(logger({ count: 0 }, { diff: true, timestamp: true }), 3000)
);

const useStore = create(
  logger(debounce({ count: 0 }, 3000), { diff: true, timestamp: true })
);`}</CodeBlock>

      <Textline>{t.rich('3', codeFormatObject)}</Textline>
    </>
  )
}
