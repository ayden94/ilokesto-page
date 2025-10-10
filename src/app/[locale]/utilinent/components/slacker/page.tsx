import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('utilinent.slacker')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>Slacker</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`function Slacker<T = any>(props: {
  loader: () => Promise<T> | T;
  children: (data: T) => React.ReactNode;
  loadingFallback?: React.ReactNode;
  errorFallback?: React.ReactNode | ((props: {
    error: Error;
    retry: () => void;
    isLoading: boolean;
  }) => React.ReactNode);
  threshold?: number | number[];
  rootMargin?: string;
  onError?: (error: Error) => void;
  maxRetries?: number;
  retryDelay?: number;
}): React.ReactElement;`}</CodeBlock>

      <Heading.h2>{t('subtitle1')}</Heading.h2>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`import { Slacker } from '@ilokesto/utilinent';

function UserProfile({ userId }) {
  return (
    <Slacker
      loader={() => fetch(\`/api/users/\${userId}\`).then(r => r.json())}
      loadingFallback={<Spinner />}
      errorFallback={<ErrorMessage />}
    >
      {(user) => (
        <div>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </div>
      )}
    </Slacker>
  );
}`}</CodeBlock>

      <Heading.h2>{t('subtitle2')}</Heading.h2>

      <Textline>{t.rich('2', codeFormatObject)}</Textline>
      <CodeBlock language="tsx">{`<Slacker
  loader={fetchData}
  maxRetries={3}
  retryDelay={2000}
  loadingFallback={<Spinner />}
  errorFallback={({ error, retry }) => (
    <div>
      <p>오류: {error.message}</p>
      <button onClick={retry}>재시도</button>
    </div>
  )}
  onError={(err) => console.error('Failed to load:', err)}
>
  {(data) => <Content data={data} />}
</Slacker>`}</CodeBlock>
    </>
  )
}
