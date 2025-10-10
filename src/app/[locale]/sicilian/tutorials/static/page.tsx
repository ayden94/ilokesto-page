import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale as 'ko' | 'en'
  const t = await getTranslations({ locale, namespace: 'metadata.sicilian' })
  return {
    title: t('tutorials'),
    description: t('tutorials'),
  }
}

export default async function Page() {
  const t = await getTranslations('sicilian.tutorials.static')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>Static Form</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <CodeBlock language="tsx" filename="src/shared/signUpForm.ts">{`export const SIGN_UP_FORM = new CreateForm({
  validator: {
    email: {
      required: { required: true, message: "Please enter your email" },
      RegExp: {
        RegExp: new RegExp("^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
        message: "Invalid email format",
      },
    },
    nickname: {
      required: { required: true, message: "Please enter your nickname" },
      minLength: { number: 2, message: "Nickname must be at least 2 characters" },
      maxLength: { number: 10, message: "Nickname must be 10 characters or less" },
    },
    password: {
      required: { required: true, message: "Please enter your password" },
      minLength: { number: 8, message: "Password must be at least 8 characters" },
      maxLength: { number: 16, message: "Password must be 16 characters or less" },
      RegExp: [
        {
          RegExp: new RegExp("^[^\\s]+$"),
          message: "Password cannot contain spaces",
        },
        {
          RegExp: new RegExp("^(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[a-z\\d@$!%*?&]+$"),
          message: "Password must contain lowercase letters, numbers, and special characters",
        },
      ],
    },
    passwordConfirm: {
      required: { required: true, message: "Please enter your password" },
      minLength: { number: 8, message: "Password must be at least 8 characters" },
      maxLength: { number: 16, message: "Password must be 16 characters or less" },
      RegExp: [
        {
          RegExp: new RegExp("^[^\\s]+$"),
          message: "Password cannot contain spaces",
        },
        {
          RegExp: new RegExp("^(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[a-z\\d@$!%*?&]+$"),
          message: "Password must contain lowercase letters, numbers, and special characters",
        },
      ],
      custom: {
        checkFn: (value: string, store: { password: unknown }) => value !== store.password,
        message: "Passwords do not match",
      },
    },
    "Check terms and conditions": {
      checked: { checked: false, message: "Please agree to the terms and conditions" },
    }
  },
  validateOn: ["submit", "change"],
  clearFormOn: ["submit", "routeChange"]
});`}</CodeBlock>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <CodeBlock language="tsx" filename="src/component/SignUpForm.tsx">{`import { SIGN_UP_FORM } from "..."

const SIGN_UP = [{
  name: "email",
  type: "text"
}, {
  name: "nickname",
  type: "text"
}, {
  name: "password",
  type: "password"
}, {
  name: "passwordConfirm",
  type: "password"
}, {
  name: "Check terms and conditions",
  type: "checkbox"
}] as const;

export default function SignUpForm() {
  return (
    <form style={{ display: "flex", flexDirection: "column", width: "500px" }} onSubmit={SIGN_UP_FORM.handleSubmit((data) => {data})}>
      {SIGN_UP.map(({ name, type }) => (
        <div key={name}>
          {name}
          <input {...SIGN_UP_FORM.register({ name, type })}/>
          {SIGN_UP_FORM.getErrors(name)}
        </div>
      ))}
      
      <button>submit</button>
    </form>
  )
}`}</CodeBlock>
    </>
  )
}
