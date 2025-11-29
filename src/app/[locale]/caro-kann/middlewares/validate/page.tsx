import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale as 'ko' | 'en'
  const t = await getTranslations({ locale, namespace: 'metadata.caroKann' })
  return { title: t('middlewares'), description: t('middlewares') }
}

export default async function Page() {
  const t = await getTranslations('caroKann.middlewares.validate')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>validate</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const useStore = create(
  validate(initialState, Resolver<T>)
)`}</CodeBlock>

      <Textline>
        {t.rich('1', {
          ...codeFormatObject,
          a: (chunk) => (
            <Link className="link" href="/common-resolver">
              {chunk}
            </Link>
          ),
        })}
      </Textline>

      <CodeBlock language="tsx">{`import { z } from "zod";
import * as yup from "yup";
import { object, number } from "superstruct";
import { zodResolver } from "common-resolver/zod"
import { yupResolver } from "common-resolver/yupResolver"
import { superstructResolver } from "common-resolver/superstructResolver"

const zSchema = z.object({ count: z.number().min(0) });
const ySchema = yup.object({ count: yup.number().min(0).required() });
const sSchema = object({ count: number() });

const useStore = create(
  validate({ count: 0 }, zodResolver(zSchema))
  // validate({ count: 0 }, yupResolver(ySchema))
  // validate({ count: 0 }, superstructResolver(sSchema))
);

export default function Page() {
  const [count, setCount] = useStore(store => store.count)

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(store => ({ count: store.count + 1 }))}>Increment</button>
      <button onClick={() => setCount(store => ({ count: store.count - 1 }))}>Decrement</button>
    </div>
  )
}`}</CodeBlock>
    </>
  )
}
