import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import List from '@/ui/components/List'
import { Textline } from '@/ui/components/Text'
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('grunfeld.api.remove-clear')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <Heading.h2>{t('subtitle1')}</Heading.h2>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`// Remove most recent dialog
grunfeld.remove();

// Usage example
grunfeld.add(() => <div>First</div>);
grunfeld.add(() => <div>Second</div>);
grunfeld.add(() => <div>Third</div>);

grunfeld.remove(); // "Third" is removed
grunfeld.remove(); // "Second" is removed`}</CodeBlock>

      <Textline>{t.rich('2', codeFormatObject)}</Textline>

      <Heading.h2>{t('subtitle2')}</Heading.h2>

      <Textline>{t.rich('3', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`// Remove all dialogs
grunfeld.clear();

// Usage example
grunfeld.add(() => <div>First</div>);
grunfeld.add(() => <div>Second</div>);
grunfeld.add(() => <div>Third</div>);

grunfeld.clear(); // All dialogs are removed`}</CodeBlock>

      <Textline>{t.rich('4', codeFormatObject)}</Textline>

      <Heading.h2>{t('subtitle3')}</Heading.h2>

      <Textline>{t.rich('5', codeFormatObject)}</Textline>

      <List.ul>
        {(['0', '1'] as const).map((num) => (
          <List.item key={num}>{t.rich(`list.${num}`, codeFormatObject)}</List.item>
        ))}
      </List.ul>

      <Textline>{t.rich('6', codeFormatObject)}</Textline>
    </>
  )
}
