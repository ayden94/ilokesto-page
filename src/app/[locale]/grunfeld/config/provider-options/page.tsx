import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import List from '@/ui/components/List'
import { Textline } from '@/ui/components/Text'
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('grunfeld.config.provider-options')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <Heading.h2>{t('subtitle1')}</Heading.h2>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <List.ul>
        {(['0', '1', '2', '3'] as const).map((num) => (
          <List.item key={num}>{t.rich(`list.${num}`, codeFormatObject)}</List.item>
        ))}
      </List.ul>

      <Heading.h2>{t('subtitle2')}</Heading.h2>

      <Textline>{t.rich('2', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`import { GrunfeldProvider } from "@ilokesto/grunfeld";

function App() {
  return (
    <GrunfeldProvider
      options={{
        defaultPosition: "top-right",
        defaultLightDismiss: true,
        defaultRenderMode: "inline",
        defaultBackdropStyle: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(5px)",
        },
      }}
    >
      <YourApp />
    </GrunfeldProvider>
  );
}`}</CodeBlock>

      <Heading.h2>{t('subtitle3')}</Heading.h2>

      <Textline>{t.rich('3', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`// This dialog ignores Provider settings and appears in top-right
grunfeld.add(() => ({
  element: <div>Important alert</div>,
  position: "top-right",
  lightDismiss: false,
}));`}</CodeBlock>

      <Textline>{t.rich('4', codeFormatObject)}</Textline>
    </>
  )
}
