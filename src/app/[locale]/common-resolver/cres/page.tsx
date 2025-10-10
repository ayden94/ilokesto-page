import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale as 'ko' | 'en'
  const t = await getTranslations({ locale, namespace: 'metadata.commonResolver' })

  return {
    title: t('cres'),
    description: t('cres'),
  }
}

export default async function Page() {
  const t = await getTranslations('commonResolver.CRES')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>CRES</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <CodeBlock language="ts">{`const CEF = {
  agreeToTerms: "모든 약관에 동의해야 합니다",
  agreeToTerms.marketingTerms: "마케팅 수신 동의에 동의해야 합니다",
  email: "이메일 형식이 아닙니다",
  root: '비밀번호가 일치하지 않습니다'
}`}</CodeBlock>
      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <CodeBlock language="ts">{`const value = {
  email: "test",
  nickname: "test",
  password: "test1234!",
  passwordCheck: "test1234",
  agreeToTerms: {
    theTerms: true,
    personalTerms: true,
    marketingTerms: false,
  },
}
 
const zSchema = z.object({
  email: z.string().email("이메일 형식이 아닙니다").min(1, "이메일은 필수입니다"),
  nickname: z.string().min(1, "닉네임은 필수입니다"),
  password: z.string().min(1, "비밀번호는 필수입니다"),
  passwordCheck: z.string().min(1, "비밀번호 확인은 필수입니다"),
  agreeToTerms: z.object(
    {
      theTerms: z.boolean().refine(val => val, { message: "이용약관에 동의해야 합니다" }),
      personalTerms: z.boolean().refine(val => val, { message: "개인정보 수집 및 이용에 동의해야 합니다" }),
      marketingTerms: z.boolean().refine(val => val, { message: "마케팅 수신 동의에 동의해야 합니다" }),
    }
  ).refine(val => val.theTerms && val.personalTerms && val.marketingTerms, { message: "모든 약관에 동의해야 합니다" }),
}).refine(data => {
  if (data.password !== data.passwordCheck) {
    return false;
  }
  return true;
}, "비밀번호가 일치하지 않습니다")`}</CodeBlock>
      <Textline>{t.rich('2', codeFormatObject)}</Textline>

      <CodeBlock language="ts">{`const CRES = {
  agreeToTerms: {
    marketingTerms: { root: '마케팅 수신 동의에 동의해야 합니다' },
    root: '모든 약관에 동의해야 합니다'
  },
  email: { root: '이메일 형식이 아닙니다' },
  root: '비밀번호가 일치하지 않습니다'
}`}</CodeBlock>
      <Textline>{t.rich('3', codeFormatObject)}</Textline>

      <CodeBlock language="ts">{`type CRES<T> = RecursivePartial<T> & { "root"?: string };
 
export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? RecursivePartial<T[P]>
    : string;
};`}</CodeBlock>
      <Textline>{t.rich('4', codeFormatObject)}</Textline>

      <Image src="/images/cres1.png" alt="" width={1018} height={354} />
      <Textline>{t.rich('5', codeFormatObject)}</Textline>
      <CodeBlock language="ts">{`export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? RecursivePartial<T[P]> | string
    : string;
};`}</CodeBlock>
      <Image src="/images/cres2.png" alt="" width={1600} height={306} />
    </>
  )
}
