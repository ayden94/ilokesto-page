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
  const t = await getTranslations('utilinent.switch')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>Switch &amp; Match</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`function Switch(props: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}): React.ReactNode;

function Match<T>(props: {
  when: T | null | undefined | false;
  children: React.ReactNode | ((value: NonNullable<T>) => React.ReactNode);
}): React.ReactNode;`}</CodeBlock>

      <Heading.h2>{t('subtitle1')}</Heading.h2>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`import { Switch, Match } from '@ilokesto/utilinent';

function StatusBadge({ status }) {
  return (
    <Switch fallback={<span>Unknown</span>}>
      <Match when={status === 'loading'}>Loading...</Match>
      <Match when={status === 'ready'}>Ready</Match>
      <Match when={status === 'error'}>Error</Match>
    </Switch>
  );
}`}</CodeBlock>

      <Heading.h2>{t('subtitle2')}</Heading.h2>

      <Textline>{t.rich('2', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`<Switch>
  <Match when={user}>{(user) => <Profile user={user} />}</Match>
  <Match when={!user}>Sign in</Match>
</Switch>`}</CodeBlock>

      <Heading.h2>{t('subtitle3')}</Heading.h2>

      <Textline>{t.rich('3', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`<Switch.div className="status">
  <Match when={isOnline}>Online</Match>
  <Match when={!isOnline}>Offline</Match>
</Switch.div>`}</CodeBlock>
    </>
  )
}
