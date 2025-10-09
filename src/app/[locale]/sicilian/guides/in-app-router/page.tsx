import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('sicilian.guides.appRouter')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>in App Router</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`'use client'
import { SicilianProvider } from "@ilokesto/sicilian/provider";
import { register } from "@/component/play";
import Input from "@/component/Input";
 
export default function Home() {
  return (
    <div>
      <SicilianProvider value={{register, name: "email"}}>
        <Input />
      </SicilianProvider>
 
      <SicilianProvider value={{register, name: "password"}}>
        <Input />
      </SicilianProvider>
    </div>
  )
}`}</CodeBlock>
    </>
  )
}
