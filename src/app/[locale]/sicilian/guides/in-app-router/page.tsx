import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale as 'ko' | 'en'
  const t = await getTranslations({ locale, namespace: 'metadata.sicilian' })
  return { title: t('guides'), description: t('guides') }
}

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
