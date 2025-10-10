import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import Warning from '@/ui/components/Warning'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale as 'ko' | 'en'
  const t = await getTranslations({ locale, namespace: 'metadata.caroKann' })
  return { title: t('middlewares'), description: t('middlewares') }
}

export default async function Page() {
  const t = await getTranslations('caroKann.middlewares.devtools')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>devtools</Heading.h1>

      <Warning>{t.rich('0', codeFormatObject)}</Warning>

      <Textline>{t('1')}</Textline>

      <CodeBlock language="tsx">{`const useStore = create(
  devtools(initialState, storeName)
)`}</CodeBlock>

      <Textline>{t('2')}</Textline>

      <CodeBlock language="tsx">{`const useStore = create(
  devtools({ count: 0 }, "devtoolsTestStore")
);

export default function Page() {
  const [count, setCount] = useStore(store => store.count)

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count => count + 1)}>Increment</button>
      <button onClick={() => setCount(count => count - 1)}>Decrement</button>
    </div>
  )
}`}</CodeBlock>

      <Image src="/images/devtools.png" width={1600} height={1200} alt="" />
    </>
  )
}
