import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('grunfeld.guides.provider-setup')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <Heading.h2>{t('subtitle1')}</Heading.h2>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`import { GrunfeldProvider } from "@ilokesto/grunfeld";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <GrunfeldProvider>
          {children}
        </GrunfeldProvider>
      </body>
    </html>
  );
}`}</CodeBlock>

      <Heading.h2>{t('subtitle2')}</Heading.h2>

      <Textline>{t.rich('2', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`import { GrunfeldProvider } from "@ilokesto/grunfeld";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GrunfeldProvider>
      <Component {...pageProps} />
    </GrunfeldProvider>
  );
}`}</CodeBlock>

      <Heading.h2>{t('subtitle3')}</Heading.h2>

      <Textline>{t.rich('3', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`import { GrunfeldProvider } from "@ilokesto/grunfeld";

function App() {
  return (
    <GrunfeldProvider>
      <YourApp />
    </GrunfeldProvider>
  );
}

export default App;`}</CodeBlock>
    </>
  )
}
