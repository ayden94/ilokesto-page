import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('caroKann.middlewares.debounce')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>debounce</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const useStore = create(
  debounce(initialState, wait = 300ms)
)`}</CodeBlock>

      <Textline>{t('1')}</Textline>

      <CodeBlock language="tsx">{`const useStore = create(
  debounce({ count: 0 }, 1000)
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
    </>
  )
}
