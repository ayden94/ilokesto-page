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
  const t = await getTranslations('utilinent.mount')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>Mount</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`function Mount(props: {
  children: React.ReactNode | (() => React.ReactNode | Promise<React.ReactNode>);
  fallback?: React.ReactNode;
  onError?: (error: unknown) => void;
}): React.ReactNode;`}</CodeBlock>

      <Heading.h2>{t('subtitle1')}</Heading.h2>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`import { Mount } from '@ilokesto/utilinent';

function UserPanel() {
  return (
    <Mount fallback={<span>Loading...</span>}>
      {async () => {
        const user = await fetch('/api/user').then((res) => res.json());
        return <div>{user.name}</div>;
      }}
    </Mount>
  );
}`}</CodeBlock>

      <Heading.h2>{t('subtitle2')}</Heading.h2>

      <Textline>{t.rich('2', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`<Mount
  fallback={<div>Unable to load.</div>}
  onError={(error) => console.error('Mount failed:', error)}
>
  {() => {
    if (Math.random() > 0.5) {
      throw new Error('Oops');
    }
    return <div>Mounted</div>;
  }}
</Mount>`}</CodeBlock>

      <Heading.h2>{t('subtitle3')}</Heading.h2>

      <Textline>{t.rich('3', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`<Mount.section fallback={<Skeleton />}>
  {async () => <Profile />}
</Mount.section>`}</CodeBlock>
    </>
  )
}
