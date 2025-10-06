import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('commonResolver.introduce')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t.rich('description', codeFormatObject)}</Textline>

      <Heading.h2>{t('installation')}</Heading.h2>

      <Textline>{t('installationBody')}</Textline>

      <CodeBlock filename="install.sh" language="bash">
        {`npm install common-resolver
pnpm add common-resolver
yarn add common-resolver
bun add common-resolver`}
      </CodeBlock>
    </>
  )
}
