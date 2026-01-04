import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale as 'ko' | 'en'
  const t = await getTranslations({ locale, namespace: 'metadata.utilinent' })
  return {
    title: t('components'),
    description: t('components'),
  }
}

export default async function Page() {
  const t = await getTranslations('utilinent.for')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>For</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`function For<T extends Array<unknown>>(props: {
  each: T | null | undefined;
  children: (item: T[number], index: number) => React.ReactNode;
  fallback?: React.ReactNode;
}): React.ReactNode;`}</CodeBlock>

      <Heading.h2>{t('subtitle1')}</Heading.h2>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`import { For } from '@ilokesto/utilinent';

function TodoList({ todos }) {
  return (
    <For each={todos} fallback={<div>할 일이 없습니다.</div>}>
      {(todo, index) => <div key={index}>{todo.text}</div>}
    </For>
  );
}`}</CodeBlock>

      <Heading.h2>{t('subtitle2')}</Heading.h2>

      <Textline>{t.rich('2', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`<For.ul each={items} className="list">
  {(item, index) => <li key={index}>{item.name}</li>}
</For.ul>`}</CodeBlock>

      <Heading.h2>{t('subtitle3')}</Heading.h2>

      <Textline>{t.rich('3', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`import { For } from '@ilokesto/utilinent';

function ProductList({ products }) {
  return (
    <For each={products}>
      {(product) => <ProductCard key={product.id} product={product} />}
    </For>
  );
}`}</CodeBlock>
    </>
  )
}
