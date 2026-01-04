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
  const t = await getTranslations('utilinent.optional')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>OptionalWrapper</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`function OptionalWrapper<T>(props: {
  when: T;
  children: React.ReactNode;
  wrapper: (children: React.ReactNode) => React.ReactNode;
  fallback?: (children: React.ReactNode) => React.ReactNode;
}): React.ReactNode;`}</CodeBlock>

      <Heading.h2>{t('subtitle1')}</Heading.h2>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`import { OptionalWrapper } from '@ilokesto/utilinent';

function Post({ post, withLink }) {
  return (
    <OptionalWrapper
      when={withLink}
      wrapper={(children) => <a href={\`/posts/\${post.id}\`}>{children}</a>}
    >
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </OptionalWrapper>
  );
}`}</CodeBlock>

      <Heading.h2>{t('subtitle2')}</Heading.h2>

      <Textline>{t.rich('2', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`<OptionalWrapper
  when={withLink}
  wrapper={(children) => <a href={\`/posts/\${post.id}\`}>{children}</a>}
  fallback={(children) => <span className="muted">{children}</span>}
>
  <h2>{post.title}</h2>
</OptionalWrapper>`}</CodeBlock>
    </>
  )
}
