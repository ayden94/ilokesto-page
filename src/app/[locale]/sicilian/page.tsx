import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import List from '@/ui/components/List'
import { Textline } from '@/ui/components/Text'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

export default async function Page() {
  const t = await getTranslations('sicilian.introduce')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t.rich('description', codeFormatObject)}</Textline>

      <Heading.h2>{t('whatsNew')}</Heading.h2>

      <List.ul>
        {(['0', '1', '2', '3', '4'] as const).map((num) => (
          <List.item key={num}>
            {t.rich(`list.${num}`, {
              ...codeFormatObject,
              a: (chunk) => (
                <Link className="link" href="">
                  {chunk}
                </Link>
              ),
            })}
          </List.item>
        ))}
      </List.ul>

      <Heading.h2>{t('installation')}</Heading.h2>

      <Textline>{t('installationBody')}</Textline>

      <CodeBlock filename="install.sh" language="bash">
        {`npm install sicilian
pnpm add sicilian
yarn add sicilian
bun add sicilian`}
      </CodeBlock>
    </>
  )
}
