import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale as 'ko' | 'en'
  const t = await getTranslations({ locale, namespace: 'metadata.commonResolver' })

  return {
    title: t('resolver'),
    description: t('resolver'),
  }
}

export default async function Page() {
  const t = await getTranslations('commonResolver.resolver')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>Resolver</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>
      <CodeBlock language="ts">{`declare function zodResolver<T>(schema: ValidateSchema<T>["zod"]): Resolver<T>
declare function yupResolver<T>(schema: ValidateSchema<T>["yup"]): Resolver<T>
declare function superstructResolver<T>(schema: ValidateSchema<T>["superstruct"]): Resolver<T>`}</CodeBlock>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>
      <CodeBlock language="ts">{`export type Resolver<T> = {
  validate: (state: T, name?: string) => {
    valid: true;
    error: null;
    data: T;
  } | {
    valid: false;
    error: CRES<T>;
    data: null;
  };
}`}</CodeBlock>
      <Textline>{t.rich('2', codeFormatObject)}</Textline>
      <CodeBlock language="ts">{`type CRES<T> = RecursivePartial<T> & { "root"?: string };

export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? RecursivePartial<T[P]>
    : string;
};`}</CodeBlock>
    </>
  )
}
