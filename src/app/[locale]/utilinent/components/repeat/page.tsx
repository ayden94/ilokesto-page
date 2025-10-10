import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('utilinent.repeat')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>Repeat</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`function Repeat(props: {
  times: number;
  children: (index: number) => React.ReactNode;
  fallback?: React.ReactNode;
}): React.ReactNode;`}</CodeBlock>
      <Heading.h2>{t('subtitle1')}</Heading.h2>
      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`import { Repeat } from '@ilokesto/utilinent';

function StarRating({ rating }) {
  return (
    <Repeat times={rating}>
      {(index) => <span key={index}>⭐️</span>}
    </Repeat>
  );
}`}</CodeBlock>
      <Heading.h2>{t('subtitle2')}</Heading.h2>
      <Textline>{t.rich('2', codeFormatObject)}</Textline>
      <CodeBlock language="tsx">{`<Repeat.div times={3} className="skeleton">
  {(index) => <div key={index} className="skeleton-item" />}
</Repeat.div>`}</CodeBlock>
    </>
  )
}
