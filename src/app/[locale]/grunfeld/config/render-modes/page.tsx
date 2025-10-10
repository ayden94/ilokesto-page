import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import List from '@/ui/components/List'
import { Textline } from '@/ui/components/Text'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale as 'ko' | 'en'
  const t = await getTranslations({ locale, namespace: 'metadata.grunfeld.config' })

  return {
    title: t('renderModes'),
    description: t('renderModes'),
  }
}

export default async function Page() {
  const t = await getTranslations('grunfeld.config.render-modes')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <Heading.h2>{t('subtitle1')}</Heading.h2>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <List.ul>
        {(['0', '1', '2', '3'] as const).map((num) => (
          <List.item key={num}>{t.rich(`list0.${num}`, codeFormatObject)}</List.item>
        ))}
      </List.ul>

      <Textline>{t.rich('2', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`grunfeld.add(() => ({
  element: <MyDialog />,
  renderMode: "inline", // default
}));`}</CodeBlock>

      <Heading.h2>{t('subtitle2')}</Heading.h2>

      <Textline>{t.rich('3', codeFormatObject)}</Textline>

      <List.ul>
        {(['0', '1', '2', '3'] as const).map((num) => (
          <List.item key={num}>{t.rich(`list1.${num}`, codeFormatObject)}</List.item>
        ))}
      </List.ul>

      <Textline>{t.rich('4', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`grunfeld.add(() => ({
  element: <MyDialog />,
  renderMode: "top-layer",
}));`}</CodeBlock>

      <Heading.h2>{t('subtitle3')}</Heading.h2>

      <Textline>{t.rich('5', codeFormatObject)}</Textline>

      <CodeBlock language="text">{`Inline mode:
- Chrome: All versions
- Firefox: All versions
- Safari: All versions
- Edge: All versions
- IE: 11+

Top-layer mode:
- Chrome: 37+
- Firefox: 98+
- Safari: 15.4+
- Edge: 79+`}</CodeBlock>

      <Textline>{t.rich('6', codeFormatObject)}</Textline>

      <Heading.h2>{t('subtitle4')}</Heading.h2>

      <Textline>{t.rich('7', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`// Use top-layer only for some dialogs
grunfeld.add(() => ({
  element: <CriticalModal />,
  renderMode: "top-layer",
}));

grunfeld.add(() => ({
  element: <RegularModal />,
  renderMode: "inline",
}));`}</CodeBlock>

      <Textline>{t.rich('8', codeFormatObject)}</Textline>
    </>
  )
}
