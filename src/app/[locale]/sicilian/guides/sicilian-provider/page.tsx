import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import Warning from '@/ui/components/Warning'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale as 'ko' | 'en'
  const t = await getTranslations({ locale, namespace: 'metadata.sicilian' })
  return { title: t('guides'), description: t('guides') }
}

export default async function Page() {
  const t = await getTranslations('sicilian.guides.provider')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`<input {...register('email', validator.email)}>`}</CodeBlock>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">
        {`<SicilianProvider value={{ register, name: "" }}>
                                  // ~~~~ email
                                  //      nickname
                                  //      password
                                  //      passwordCheck
                                  //      agreeToTerms

  <Input />
</SicilianProvider>`}
      </CodeBlock>

      <Textline>{t.rich('2', codeFormatObject)}</Textline>

      <Warning>🚨 Sicilian Error : useSicilianContext must be used within a SicilianProvider</Warning>

      <Textline>{t.rich('3', codeFormatObject)}</Textline>

      <Warning>
        🚨 Sicilian Error : getValues property has not been passed to the SicilianProvider, but you are trying to use
        the getValues function.
      </Warning>

      <Textline>{t.rich('4', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`import { register, getValues, getErrors } from "@/hooks/FormController/signUp.ts"
import { SicilianProvider } from "@ilokesto/sicilian/provider"

export default function Home() {
  { ... }

  return (
    <>
      { ... }
      
      <SicilianProvider value={{ register, name: "email", getErrors }}>
        <Input />
      </SicilianProvider>

      <SicilianProvider value={{ register, name: "password", getErrors }}>
        <Input />
      </SicilianProvider>
      
      { ... }
    </>
  )
}`}</CodeBlock>
      <CodeBlock language="tsx">{`import { useSicilianContext } from "@ilokesto/sicilian/provider"

export default function Input({className, ...props}: InputHTMLAttributes<HTMLInputElement>) {
  const { register, name, validate, getErrors } = useSicilianContext()
  
  const errorMessage = getErrors(name)
  
  return (
    <>
      <input {...props} {...register({ name, validate })} className={clsx(styles.input, className)} />
      <Show when={!!errorMessage}>
        {errorMessage}
      </Show>
    </>
  );
}`}</CodeBlock>
    </>
  )
}
