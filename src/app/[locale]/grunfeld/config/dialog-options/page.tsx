import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import List from '@/ui/components/List'
import { Textline } from '@/ui/components/Text'
import Warning from '@/ui/components/Warning'
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('grunfeld.config.dialog-options')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <Heading.h2>{t('subtitle1')}</Heading.h2>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`grunfeld.add(() => ({
  element: <div>Alert message</div>,
  position: "top-right",
}));`}</CodeBlock>

      <Textline>{t.rich('2', codeFormatObject)}</Textline>

      <Heading.h2>{t('subtitle2')}</Heading.h2>

      <Textline>{t.rich('3', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`grunfeld.add(() => ({
  element: <div>Important dialog</div>,
  lightDismiss: false, // Cannot close by clicking backdrop
}));`}</CodeBlock>

      <Textline>{t.rich('4', codeFormatObject)}</Textline>

      <Heading.h2>{t('subtitle3')}</Heading.h2>

      <Textline>{t.rich('5', codeFormatObject)}</Textline>

      <List.ul>
        {(['0', '1'] as const).map((num) => (
          <List.item key={num}>{t.rich(`list.${num}`, codeFormatObject)}</List.item>
        ))}
      </List.ul>

      <Textline>{t.rich('6', codeFormatObject)}</Textline>

      <Heading.h2>{t('subtitle4')}</Heading.h2>

      <Textline>{t.rich('7', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`grunfeld.add(() => ({
  element: <div>Styled dialog</div>,
  backdropStyle: {
    backgroundColor: "rgba(102, 126, 234, 0.1)",
    backdropFilter: "blur(8px)",
  },
}));`}</CodeBlock>

      <Textline>{t.rich('8', codeFormatObject)}</Textline>

      <Heading.h2>{t('subtitle5')}</Heading.h2>

      <Textline>{t.rich('9', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`grunfeld.add(() => ({
  element: <div>Dialog</div>,
  dismissCallback: () => {
    console.log("Dialog has been closed");
    // Analytics, logging, cleanup, etc.
  },
}));`}</CodeBlock>

      <Warning>{t.rich('10', codeFormatObject)}</Warning>
    </>
  )
}
