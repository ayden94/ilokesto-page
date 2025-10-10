import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('grunfeld.introduce')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t.rich('description', codeFormatObject)}</Textline>

      <Heading.h2>{t('installation')}</Heading.h2>

      <Textline>{t('installationBody')}</Textline>

      <CodeBlock filename="install.sh" language="bash">
        {`npm install @ilokesto/grunfeld
pnpm add @ilokesto/grunfeld
yarn add @ilokesto/grunfeld
bun add @ilokesto/grunfeld`}
      </CodeBlock>

      <Heading.h2>{t('quickStart')}</Heading.h2>

      <Textline>{t.rich('quickStartBody', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`import { GrunfeldProvider } from "@ilokesto/grunfeld";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GrunfeldProvider>
      <Component {...pageProps} />
    </GrunfeldProvider>
  );
}`}</CodeBlock>

      <Heading.h3>{t('subtitle1')}</Heading.h3>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`import { grunfeld } from "@ilokesto/grunfeld";

export default function YourComponent() {
  const showConfirmDialog = async () => {
    const result = await grunfeld.add<boolean>((removeWith) => ({
      element: (
        <div>
          <p>Are you sure you want to delete this?</p>
          <button onClick={() => removeWith(true)}>Confirm</button>
          <button onClick={() => removeWith(false)}>Cancel</button>
        </div>
      ),
      position: "center",
      dismissCallback: () => console.log("Dialog closed"),
    }));

    if (result) {
      console.log("User confirmed the action");
    } else {
      console.log("User canceled the action");
    }
  };

  return <button onClick={showConfirmDialog}>Open confirm dialog</button>;
}`}</CodeBlock>
    </>
  )
}
