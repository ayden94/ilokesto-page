import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale as 'ko' | 'en'
  const t = await getTranslations({ locale, namespace: 'metadata.sicilian' })
  return { title: t('guides'), description: t('guides') }
}

export default async function Page() {
  const t = await getTranslations('sicilian.guides.create')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`createForm<T extends InitState>(InitObject?: {
  initValue?: T
  resolver?: Resolver<T>
  validator?: Validator<T>
  validateOn?: Array<'blur' | 'submit' | 'change'>
  clearFormOn?: Array<'submit' | 'routeChange'>
}): FormController<T>`}</CodeBlock>

      <Heading.h2>initValue</Heading.h2>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`import { CreateForm } from "@ilokesto/sicilian";

const formController = new CreateForm({
  initValue: {
    email: "",
    nickname: "",
    password: "",
    passwordCheck: "",
    agreeToTerms: false,
  }
})`}</CodeBlock>

      <Heading.h2>resolver</Heading.h2>

      <Textline>{t.rich('2', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`import { CreateForm } from "@ilokesto/sicilian";
import { zodResolver } from "@ilokesto/sicilian/resolver"
 
const zSchema = z.object({
  email: z.string()
    .email('유효한 이메일 주소를 입력해 주세요')
    .min(1, '이메일은 필수 입력 항목입니다'),
  
  nickname: z.string()
    .min(2, '닉네임은 2글자 이상이어야 합니다')
    .max(20, '닉네임은 20글자 이하여야 합니다'),
  
  password: z.string()
    .min(8, '비밀번호는 8자 이상이어야 합니다')
    .max(100, '비밀번호는 100자 이하여야 합니다')
    .regex(/[a-z]/, '최소 하나의 소문자를 포함해야 합니다')
    .regex(/[0-9]/, '최소 하나의 숫자를 포함해야 합니다')
    .regex(/[^a-zA-Z0-9]/, '최소 하나의 특수문자를 포함해야 합니다'),
  
  passwordCheck: z.string()
    .min(1, '비밀번호 확인은 필수 입력 항목입니다'),
  
  agreeToTerms: z.boolean()
    .refine(val => val === false, {
      message: '이용약관에 동의해 주세요'
    })
}).refine(data => data.password === data.passwordCheck, {
  message: '비밀번호가 일치하지 않습니다',
  path: ['passwordCheck'] // 에러를 passwordCheck 필드에 연결
})
 
const formController = new CreateForm({
  initValue: {
    email: "",
    nickname: "",
    password: "",
    passwordCheck: "",
    agreeToTerms: false,
  },
  resolver: zodResolver(zSchema)
})`}</CodeBlock>

      <Heading.h2>validator</Heading.h2>

      <Textline>
        {t.rich('3', {
          ...codeFormatObject,
          a: (chunk) => (
            <Link className="link" href="/resolver-and-validator">
              {chunk}
            </Link>
          ),
        })}
      </Textline>

      <CodeBlock language="tsx">{`import { CreateForm } from "@ilokesto/sicilian";
import { zodResolver } from "@ilokesto/sicilian/resolver"

const emailValidate = {
  required: { required: true, message: "이메일을 입력해주세요" },
  RegExp: {
    RegExp: new RegExp("^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
    message: "유효한 이메일 주소를 입력해 주세요",
  },
}
const nicknameValidate = {
  required: { required: true, message: "비밀번호를 입력해주세요" },
  minLength: { number: 2, message: "닉네임은 2글자 이상이어야 합니다" },
  maxLength: { number: 20, message: "닉네임은 20글자 이하여야 합니다" },
}
const passwordValidate = {
  required: { required: true, message: "비밀번호를 입력해주세요" },
  minLength: { number: 8, message: "비밀번호는 8자 이상이어야 합니다" },
  maxLength: { number: 16, message: "비밀번호는 16자 이하여야 합니다" },
  RegExp: [
    {
      RegExp: new RegExp(/[a-z]/),
      message: "최소 하나의 소문자를 포함해야 합니다",
    },
    {
      RegExp: new RegExp(/[0-9]/),
      message: "최소 하나의 숫자를 포함해야 합니다",
    },
    {
      RegExp: new RegExp(/[^a-zA-Z0-9]/),
      message: "최소 하나의 특수문자를 포함해야 합니다",
    },
  ],
}
const passwordCheckValidate = {
  required: { required: true, message: "비밀번호 확인은 필수 입력 항목입니다" },
  custom: {
    checkFn: (value: string, store: { password: string }) => value !== store.password,
    message: "비밀번호가 일치하지 않습니다",
  },
}
const agreeValidate = {
  checked: {
    checked: true,
    message: "이용약관에 동의해 주세요",
  }
}
 
const formController = new CreateForm({
  initValue: {
    email: "",
    nickname: "",
    password: "",
    passwordCheck: "",
    agreeToTerms: false,
  },
  resolver: zodResolver(zSchema),
  validator: {
    email: emailValidate,
    nickname: nicknameValidate,
    password: passwordValidate,
    passwordCheck: passwordCheckValidate,
    agreeToTerms: agreeValidate,
  }
})`}</CodeBlock>

      <Heading.h2>validateOn</Heading.h2>

      <Textline>{t.rich('4', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`import { CreateForm } from "@ilokesto/sicilian";
import { zodResolver } from "@ilokesto/sicilian/resolver"
 
const formController = new CreateForm({
  initValue: {
    email: "",
    nickname: "",
    password: "",
    passwordCheck: "",
    agreeToTerms: false,
  },
  resolver: zodResolver(zSchema),
  validator: {
    email: emailValidate,
    nickname: nicknameValidate,
    password: passwordValidate,
    passwordCheck: passwordCheckValidate,
    agreeToTerms: agreeValidate,
  },
  validateOn: ["change", "blur", "submit"]
})`}</CodeBlock>

      <Heading.h2>clearFormOn</Heading.h2>

      <Textline>{t.rich('5', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`import { CreateForm } from "@ilokesto/sicilian";
import { zodResolver } from "@ilokesto/sicilian/resolver"

const formController = new CreateForm({
  initValue: {
    email: "",
    nickname: "",
    password: "",
    passwordCheck: "",
    agreeToTerms: false,
  },
  resolver: zodResolver(zSchema),
  validator: {
    email: emailValidate,
    nickname: nicknameValidate,
    password: passwordValidate,
    passwordCheck: passwordCheckValidate,
    agreeToTerms: agreeValidate,
  },
  validateOn: ["change", "blur", "submit"],
  clearFormOn: ["submit", "routeChange"]
})`}</CodeBlock>
    </>
  )
}
