import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import List from '@/ui/components/List'
import { Textline } from '@/ui/components/Text'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale as 'ko' | 'en'
  const t = await getTranslations({ locale, namespace: 'metadata.sicilian' })
  return { title: t('guides'), description: t('guides') }
}

export default async function Page() {
  const t = await getTranslations('sicilian.guides.validate')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <Heading.h2>validator and validate</Heading.h2>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <List.ul>
        {(['0', '1'] as const).map((num) => (
          <List.item key={num}>{t.rich(`list.${num}`, codeFormatObject)}</List.item>
        ))}
      </List.ul>

      <Textline>{t.rich('2', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`export type Validator<T extends InitState> = Partial<Record<keyof T, validate<T>>>;
 
export type validate<T extends InitState> = {
  required?: { required: boolean; message: string } | boolean;
  minLength?: { number: number; message: string } | number;
  maxLength?: { number: number; message: string } | number;
  checked?: { checked: boolean; message: string } | boolean;
  RegExp?: RegExpErrorObj | Array<RegExpErrorObj>;
  custom?: CustomCheckerErrorObj<T> | Array<CustomCheckerErrorObj<T>>;
};
 
type RegExpErrorObj = { RegExp: RegExp; message?: string };
type CustomCheckerErrorObj<T extends InitState> = {
  checkFn: (value: string, store: T, checked?: boolean) => boolean;
  message?: string;
};`}</CodeBlock>

      <Heading.h3>required</Heading.h3>

      <Textline>{t.rich('3', codeFormatObject)}</Textline>

      <Heading.h3>minLength and maxLength</Heading.h3>

      <Textline>{t.rich('4', codeFormatObject)}</Textline>

      <Heading.h3>checked</Heading.h3>

      <Textline>{t.rich('5', codeFormatObject)}</Textline>

      <Heading.h3>RegExp and custom</Heading.h3>

      <Textline>{t.rich('6', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const passwordValidate = {
  required: { required: true, message: "Please enter a password" },
  minLength: { number: 8, message: "Password must be at least 8 characters" },
  maxLength: { number: 16, message: "Password must be at most 16 characters" },
  RegExp: [
    {
      RegExp: new RegExp(/[a-z]/),
      message: "Must include at least one lowercase letter",
    },
    {
      RegExp: new RegExp(/[0-9]/),
      message: "Must include at least one number",
    },
    {
      RegExp: new RegExp(/[^a-zA-Z0-9]/),
      message: "Must include at least one special character",
    },
  ],
}`}</CodeBlock>

      <Textline>{t.rich('7', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const passwordCheckValidate = {
  required: { required: true, message: "Password confirmation is required" },
  custom: {
    checkFn: (value: string, store: { password: string }) => value !== store.password,
    message: "Passwords do not match",
  },
}`}</CodeBlock>

      <Textline>{t.rich('8', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const isWordInclude = (wordList: string[]) => (value: string) => {
  for (const word of wordList) {
    if (value.includes(word)) return true;
  }
 
  return false;
};
 
export const useSignValidate = () => {
  const { data } = useQuery({ ... })
 
  const email = { ... }
  const password = { ... }
  const passwordCheck = { ... }
 
  const nickname = {
    custom: [
      {
        checkFn: !isWordInclude(data?.bad ?? []),
        message: "Nickname cannot contain offensive words",
      },
      {
        checkFn: !isWordInclude(data?.sexual ?? []),
        message: "Nickname cannot contain sexual content",
      },
    ]
  }
  
  return { email, nickname, password, passwordCheck }
}`}</CodeBlock>

      <CodeBlock language="tsx">{`export default function SignUp() {
  const validator = useSignValidate();

  return (
    { ... }
    <input {...register("nickname", validator.nickname)} />
  )
}`}</CodeBlock>

      <Heading.h2>validateOptions</Heading.h2>

      <Textline>{t.rich('9', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`export function validateOptions<T extends InitState>(option: RegisterErrorObj<T>): RegisterErrorObj<T> {
  return option
}`}</CodeBlock>

      <Heading.h2>{t('subtitle')}</Heading.h2>

      <Textline>{t.rich('10', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`export const { register } = createForm({
  initValue: { email: "" },
  validator: {
    email: {
      maxLength: 16,
      minLength: 8
    }
  },
})

export default function Comp() {  
  return <input {...register({ name: "email", validate: { required: true } })}> // maxLength and minLength will not be applied
}`}</CodeBlock>

      <Textline>{t.rich('11', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`// required is meaningless
password: { minLength: 10, required: true }

// required is meaningful
password: { required: true, minLength: 10 }`}</CodeBlock>
    </>
  )
}
