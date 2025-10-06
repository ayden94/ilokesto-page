import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('caroKann.middlewares.reducer')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>reducer</Heading.h1>

      <Textline>{t('0')}</Textline>

      <CodeBlock language="tsx">{`const useStore = create(
  reducer(reduceFn, initialState)
)`}</CodeBlock>
      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const useStore = create(
  reducer((store, { type, payload = 1 }: { type: string, payload?: number }) => {
    switch (type) {
      case "INCREMENT":
        return { count: store.count + payload };
      case "DECREMENT":
        return { count: store.count - payload };
      default:
        return store;
    }
  },
  { count: 0 })
);

export default function Page() {
  const [count, dispatch] = useStore(store => store.count)

  return (
    <div>
      <h1>{count}</h1>

      <button
        onClick={() => dispatch({ type: "INCREMENT", payload: 2 })}
      >
        Increment
      </button>

      <button
        onClick={() => dispatch({ type: "DECREMENT" })}
      >
        Decrement
      </button>
    </div>
  )
}`}</CodeBlock>
    </>
  )
}
