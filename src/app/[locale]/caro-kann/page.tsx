import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import { getTranslations } from 'next-intl/server'

export default async function CaroKannPage() {
  const t = await getTranslations('caroKann.introduce')

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t('description')}</Textline>

      <Heading.h2>{t('whatsNew')}</Heading.h2>

      <Heading.h2>{t('installation')}</Heading.h2>

      <Textline>{t('installationBody')}</Textline>

      <CodeBlock filename="install.sh" language="bash">
        {`npm install caro-kann
pnpm add caro-kann
yarn add caro-kann
bun add caro-kann`}
      </CodeBlock>
    </>
  )
}
