import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import List from '@/ui/components/List'
import { Textline } from '@/ui/components/Text'
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('sicilian.cli')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t.rich('description', codeFormatObject)}</Textline>

      <Heading.h2>{t('subtitle1')}</Heading.h2>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <CodeBlock language="bash">{`npx sicilian help`}</CodeBlock>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <CodeBlock language="bash">{`npx sicilian`}</CodeBlock>

      <Heading.h2>{t('subtitle2')}</Heading.h2>

      <Textline>{t.rich('2', codeFormatObject)}</Textline>

      <CodeBlock language="bash">{`npx sicilian -g <file_path> [options]`}</CodeBlock>

      <List.ul>
        {(['0', '1'] as const).map((num) => (
          <List.item key={num}>{t.rich(`list.${num}`, codeFormatObject)}</List.item>
        ))}
      </List.ul>

      <Heading.h3>{t('subtitle3')}</Heading.h3>

      <Textline>{t.rich('3', codeFormatObject)}</Textline>

      <CodeBlock language="bash">{`npx sicilian -g src/components/MyForm.tsx`}</CodeBlock>

      <Textline>{t.rich('4', codeFormatObject)}</Textline>

      <CodeBlock filename="src/components/MyForm.tsx" language="ts">{`import { CreateForm } from '@ilokesto/sicilian';

export const sicilianForm = new CreateForm({ 
  initValue: {}, 
  resolver: undefined, 
  validator: {}, 
  validateOn: ["change", "blur", "submit"],
  clearFormOn: ["submit", "routeChange"]
});
`}</CodeBlock>

      <Heading.h3>{t('subtitle4')}</Heading.h3>

      <Textline>{t.rich('5', codeFormatObject)}</Textline>

      <CodeBlock language="bash">{`npx sicilian -g src/utils/formHooks.ts -o`}</CodeBlock>

      <Textline>{t.rich('6', codeFormatObject)}</Textline>

      <CodeBlock filename="src/utils/formHooks.ts" language="ts">{`import { CreateForm } from '@ilokesto/sicilian';

export const {
  initValue,
  register,
  getValues,
  getErrors,
  setValues,
  setErrors,
  handleSubmit
} = new CreateForm({ 
  initValue: {}, 
  resolver: undefined, 
  validator: {}, 
  validateOn: ["change", "blur", "submit"],
  clearFormOn: ["submit", "routeChange"]
});
`}</CodeBlock>
    </>
  )
}
