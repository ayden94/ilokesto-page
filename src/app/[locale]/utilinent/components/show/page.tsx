import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale as 'ko' | 'en'
  const t = await getTranslations({ locale, namespace: 'metadata.utilinent' })
  return { title: t('components'), description: t('components') }
}

export default async function Page() {
  const t = await getTranslations('utilinent.show')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>Show</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`// Basic usage
function Show<T>(props: {
  when: T | null | undefined | false;
  children: React.ReactNode | ((value: NonNullable<T>) => React.ReactNode);
  fallback?: React.ReactNode;
}): React.ReactNode;

// Array condition
function Show<T extends Array<unknown>>(props: {
  when: T;
  children: React.ReactNode | ((values: NonNullableElements<T>) => React.ReactNode);
  fallback?: React.ReactNode;
}): React.ReactNode;`}</CodeBlock>

      <Heading.h2>{t('subtitle1')}</Heading.h2>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`import { Show } from '@ilokesto/utilinent';

function UserProfile({ user }) {
  return (
    <Show when={user} fallback={<div>Login required.</div>}>
      {(user) => <h1>Welcome, {user.name}!</h1>}
    </Show>
  );
}`}</CodeBlock>

      <Heading.h2>{t('subtitle2')}</Heading.h2>

      <Textline>{t.rich('2', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`<Show when={[user, user.isActive, user.hasPermission]}>
  {([user, isActive, hasPermission]) => (
    isActive && hasPermission ? <Profile user={user} /> : null
  )}
</Show>`}</CodeBlock>

      <Heading.h2>{t('subtitle3')}</Heading.h2>

      <Textline>{t.rich('3', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`// Without element variant
<div className="badge">
  <Show when={user.isAdmin} fallback="user">
    admin
  </Show>
</div>

// With element variant
<Show.div when={user.isAdmin} className="badge" fallback="user">
  admin
</Show.div>`}</CodeBlock>

      <Heading.h2>{t('subtitle4')}</Heading.h2>

      <Textline>{t.rich('4', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`import { Show, Showable } from '@ilokesto/utilinent';

function UserProfile({ user }) {
  return (
    <Show.div when={user} className="profile">
      <h1>User Profile</h1>
      <Showable fallback={<div>Please login to view profile.</div>}>
        {(user) => (
          <>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </>
        )}
      </Showable>
    </Show.div>
  );
}`}</CodeBlock>
    </>
  )
}
