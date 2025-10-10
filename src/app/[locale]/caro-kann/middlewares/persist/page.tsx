import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import Table from '@/ui/components/Table'
import { Textline } from '@/ui/components/Text'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale as 'ko' | 'en'
  const t = await getTranslations({ locale, namespace: 'metadata.caroKann' })
  return { title: t('middlewares'), description: t('middlewares') }
}

export default async function Page() {
  const t = await getTranslations('caroKann.middlewares.persist')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>persist</Heading.h1>

      <Textline>{t('0')}</Textline>

      <CodeBlock language="tsx">{`const useStore = create(
  persist(initialState, persistOptions)
)`}</CodeBlock>

      <Textline>{t('1')}</Textline>

      <CodeBlock language="tsx">{`type Theme = "light" | "dark";

const useStore = create<Theme>(
  persist(
    "light",
    {
      local: "theme",
   // session: "theme",
   // cookie: "theme",
    }
  )
);`}</CodeBlock>

      <Table>
        <Table.head>
          <Table.row>
            <Table.headCell>Key</Table.headCell>
            <Table.headCell>Value</Table.headCell>
          </Table.row>
        </Table.head>

        <Table.body>
          <Table.row>
            <Table.cell>theme</Table.cell>
            <Table.cell>
              <code className="code">{'{"state":"light","version":0}'}</code>
            </Table.cell>
          </Table.row>
        </Table.body>
      </Table>

      <Textline>{t('2')}</Textline>

      <CodeBlock language="tsx">{`type Theme = { color: "light" | "dark", fontSize: number };

const useStore = create<Theme>(
  persist(
    { color: "light", fontSize: 16 },
    {
      local: "theme",
      migrate: [
        (prev: "light" | "dark") => ({ color: prev, fontSize: 16 })
      ],
    }
  )
);`}</CodeBlock>

      <Table>
        <Table.head>
          <Table.row>
            <Table.headCell>Key</Table.headCell>
            <Table.headCell>Value</Table.headCell>
          </Table.row>
        </Table.head>

        <Table.body>
          <Table.row>
            <Table.cell>theme</Table.cell>
            <Table.cell>
              <code className="code">{'{"state":{"color":"dark","fontSize":16},"version":1}'}</code>
            </Table.cell>
          </Table.row>
        </Table.body>
      </Table>

      <Textline>{t.rich('3', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`type Theme = { color: "light" | "dark", ["font-size"]: number };

const useStore = create<Theme>(
  persist(
    { color: "light", ["font-size"]: 16 },
    {
      local: "theme",
      migrate: [
        (prev: "light" | "dark")
          => ({ color: prev, fontSize: 16 }),
        (prev: { color: "light" | "dark", fontSize: number })
          => ({ color: prev.color, ["font-size"]: prev.fontSize })
      ],
    }
  )
);`}</CodeBlock>
      <Table>
        <Table.head>
          <Table.row>
            <Table.headCell>Key</Table.headCell>
            <Table.headCell>Value</Table.headCell>
          </Table.row>
        </Table.head>

        <Table.body>
          <Table.row>
            <Table.cell>theme</Table.cell>
            <Table.cell>
              <code className="code">{'{"state":{"color":"dark","font-size":16},"version":2}'}</code>
            </Table.cell>
          </Table.row>
        </Table.body>
      </Table>

      <Textline>{t('4')}</Textline>
    </>
  )
}
