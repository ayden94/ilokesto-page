import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import List from '@/ui/components/List'
import { Textline } from '@/ui/components/Text'
import { getTranslations } from 'next-intl/server'

export default async function CaroKannPage() {
  const t = await getTranslations('caroKann.introduce')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t.rich('description', codeFormatObject)}</Textline>

      <Heading.h2>{t('whatsNew')}</Heading.h2>

      <List.ul>
        {(['0', '1', '2', '3', '4', '5', '6'] as const).map((num) => (
          <List.item key={num}>{t.rich(`newArray.${num}`, codeFormatObject)}</List.item>
        ))}
      </List.ul>

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
