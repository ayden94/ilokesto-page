import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('commonResolver.tutorials')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>CRES</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <CodeBlock language="ts">{``}</CodeBlock>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <CodeBlock language="ts">{``}</CodeBlock>
    </>
  )
}
