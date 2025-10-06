import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('caroKann.middlewares')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>persist</Heading.h1>

      <CodeBlock language="tsx">{``}</CodeBlock>
    </>
  )
}
