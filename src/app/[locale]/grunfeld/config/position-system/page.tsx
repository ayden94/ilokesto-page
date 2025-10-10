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
    title: t('positionSystem'),
    description: t('positionSystem'),
  }
}

export default async function Page() {
  const t = await getTranslations('grunfeld.config.position-system')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <Heading.h2>{t('subtitle1')}</Heading.h2>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <CodeBlock language="text">{`top-left     | top-center     | top-right
center-left  | center         | center-right
bottom-left  | bottom-center  | bottom-right`}</CodeBlock>

      <Heading.h2>{t('subtitle2')}</Heading.h2>

      <Textline>{t.rich('2', codeFormatObject)}</Textline>

      <List.ul>
        {(['0', '1', '2', '3', '4'] as const).map((num) => (
          <List.item key={num}>{t.rich(`list.${num}`, codeFormatObject)}</List.item>
        ))}
      </List.ul>

      <CodeBlock language="tsx">{`// Center modal
grunfeld.add(() => ({
  element: <ImportantModal />,
  position: "center",
}));

// Top-right notification
grunfeld.add(() => ({
  element: <Notification />,
  position: "top-right",
}));

// Bottom action sheet
grunfeld.add(() => ({
  element: <ActionSheet />,
  position: "bottom-center",
}));`}</CodeBlock>

      <Heading.h2>{t('subtitle3')}</Heading.h2>

      <Textline>{t.rich('3', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`// All shown at top-right but stacked by z-index
grunfeld.add(() => ({
  element: <Notification1 />,
  position: "top-right",
}));

grunfeld.add(() => ({
  element: <Notification2 />,
  position: "top-right",
}));

grunfeld.add(() => ({
  element: <Notification3 />,
  position: "top-right",
}));`}</CodeBlock>

      <Textline>{t.rich('4', codeFormatObject)}</Textline>
    </>
  )
}
