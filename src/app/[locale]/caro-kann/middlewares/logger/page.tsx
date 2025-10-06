import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import Warning from '@/ui/components/Warning'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

export default async function Page() {
  const t = await getTranslations('caroKann.middlewares.logger')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>logger</Heading.h1>

      <Warning>{t.rich('0', codeFormatObject)}</Warning>

      <Textline>{t('1')}</Textline>

      <CodeBlock language="tsx">{`const useStore = create(
  logger(initialState, options: { 
    collapsed?: boolean, 
    diff?: boolean,
    timestamp?: boolean
  } = { collapsed: false, diff: false, timestamp: true })
)`}</CodeBlock>

      <Textline>{t('2')}</Textline>

      <CodeBlock language="tsx">{`const useStore = create(
  logger({ count: 0 }, { diff: true, timestamp: true })
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

      <Image src="/images/logger.png" width={658} height={596} alt="" />
    </>
  )
}
