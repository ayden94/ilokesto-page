import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import List from '@/ui/components/List'
import { Textline } from '@/ui/components/Text'
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('pathCodegen')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>Path Codegen</Heading.h1>

      <Textline>{t('description')}</Textline>

      <Heading.h2>{t('usage')}</Heading.h2>

      <Textline>{t('0')}</Textline>

      <CodeBlock language="bash">{`npx path-codegen <source-directory> [options]`}</CodeBlock>

      <List.ul>
        {(['1', '2'] as const).map((num) => (
          <List.item key={num}>{t.rich(`${num}`, codeFormatObject)}</List.item>
        ))}
      </List.ul>

      <Textline>{t('3')}</Textline>
      <CodeBlock language="bash">{`assets/
├── images/
│   ├── logo.png
│   └── icons/
│       └── home.svg
└── README.md`}</CodeBlock>

      <Textline>{t('4')}</Textline>
      <CodeBlock language="bash">{`npx path-codegen assets -o src/generated/paths.ts`}</CodeBlock>

      <Textline>{t('5')}</Textline>
      <CodeBlock filename="src/generated/paths.ts" language="ts">{`export const ASSETS = {
  README: "/README.md",
  images: {
    icons: {
      home: "/icons/home.svg"
    },
    logo: "/images/logo.png"
  }
} as const;`}</CodeBlock>
    </>
  )
}
