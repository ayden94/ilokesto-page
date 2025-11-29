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
    title: t('title'),
    description: t('description'),
  }
}

export default async function Page() {
  const t = await getTranslations('commonResolver.introduce')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t.rich('description', codeFormatObject)}</Textline>

      <Heading.h2>{t('installation')}</Heading.h2>

      <Textline>{t('installationBody')}</Textline>

      <CodeBlock filename="install.sh" language="bash">
        {`npm install @ilokesto/common-resolver
pnpm add @ilokesto/common-resolver
yarn add @ilokesto/common-resolver
bun add @ilokesto/common-resolver`}
      </CodeBlock>

      <Heading.h2>{t('subtitle0')}</Heading.h2>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <CodeBlock language="ts">{`import { zodResolver, isZodSchema } from "@ilokesto/common-resolver/zod"
import { yupResolver, isYupSchema } from "@ilokesto/common-resolver/yup"
import { superstructResolver, isSuperStructSchema } from "@ilokesto/common-resolver/superstruct"
import { getResolver } from "@ilokesto/common-resolver/getResolver"
import { ValidateSchema, Resolver } "@ilokesto/common-resolver/types"`}</CodeBlock>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <CodeBlock language="ts">{`const zSchema = z.string({ message: "string이어야 합니다" }).min(1, "zSchema는 필수입니다");

zodResolver(zSchema).validate("").error // {root: "zSchema는 필수입니다"}
`}</CodeBlock>

      <Heading.h2>{t.rich('subtitle1', codeFormatObject)}</Heading.h2>

      <Textline>{t.rich('2', codeFormatObject)}</Textline>
      <CodeBlock language="ts">{`import { getResolver } from "@ilokesto/common-resolver/getResolver";
import { ValidateSchema } from "@ilokesto/common-resolver/types";

export const validate: Middleware["validate"] = <T>(initState: T | MiddlewareStore<T>, validator: ValidateSchema<T>["zod" | "yup" | "superstruct"]) => {
  const Store = getStoreFromInitState(initState);
  const validateScheme = getResolver(validator);

  const setStore = (nextState: T | ((prev: T) => T)) => {
    const newState = typeof nextState === "function" ? (nextState as (prev: T) => T)(Store.getStore()) : nextState;

    const { valid, error } = validateScheme.validate(newState);

    if (!valid) {
      console.error(\`[Validation Error] Invalid state:\`, error);
      return;
    }

    Store.setStore(newState);
  };

  return {
    store: { ...Store, setStore },
    [storeTypeTag]: "validate"
  };
};`}</CodeBlock>

      <Textline>{t.rich('3', codeFormatObject)}</Textline>
      <CodeBlock language="ts">{`import { create } from "caro-kann"
import { z } from "zod";

const zSchema = z.string({ message: "string이어야 합니다" });

const useNumber = create(validate("", zSchema))`}</CodeBlock>

      <Heading.h2>{t.rich('subtitle2', codeFormatObject)}</Heading.h2>

      <Textline>{t.rich('4', codeFormatObject)}</Textline>
      <CodeBlock language="ts">{`import type { Resolver } from "@ilokesto/common-resolver/types";

export class Validate<T extends InitState> implements IValidate {
  constructor(
    private store: IStore<T>,
    private setError: (action: Partial<T>) => void,
    private resolver: Resolver<T> | undefined
  ) {}

  public doValidate = ({ target: { name } }: SicilianEvent) => {
    const store = this.store.getStore();

    if (this.resolver) {
      const { valid, error } = this.resolver.validate(store);

      if (!valid) {
        this.setError({ [name]: typeof error[name] === "string" ? error[name] : "" })
        return;
      }
    }
  }
}`}</CodeBlock>

      <Textline>{t.rich('5', codeFormatObject)}</Textline>
      <CodeBlock language="ts">{`export { zodResolver } from "@ilokesto/common-resolver/zod";
export { yupResolver } from "@ilokesto/common-resolver/yup";
export { superstructResolver } from "@ilokesto/common-resolver/superstruct";`}</CodeBlock>

      <Textline>{t.rich('6', codeFormatObject)}</Textline>
      <CodeBlock language="ts">{`import { CreateForm } from "sicilian"
import { zodResolver } from "sicilian/resolver"
import { z } from "zod";

const zSchema = z.object({
  email: z.string()
    .email('유효한 이메일 주소를 입력해 주세요')
    .min(1, '이메일은 필수 입력 항목입니다'),
  
  nickname: z.string()
    .min(2, '닉네임은 2글자 이상이어야 합니다')
    .max(20, '닉네임은 20글자 이하여야 합니다'),
  
  password: z.string()
    .max(100, '비밀번호는 100자 이하여야 합니다')
    .regex(/[a-z]/, '최소 하나의 소문자를 포함해야 합니다')
    .regex(/[0-9]/, '최소 하나의 숫자를 포함해야 합니다')
    .regex(/[^a-zA-Z0-9]/, '최소 하나의 특수문자를 포함해야 합니다')
    .min(8, '비밀번호는 8자 이상이어야 합니다'),
  
  passwordCheck: z.string()
    .min(1, '비밀번호 확인은 필수 입력 항목입니다'),
  
  agreeToTerms: z.boolean()
    .refine(val => val === true, {
      message: '이용약관에 동의해 주세요'
    })
}).refine(data => {
  return data.password === data.passwordCheck
}, {
  message: '비밀번호가 일치하지 않습니다',
  path: ['passwordCheck']
});

const signFormController = new CreateForm({
  initState: {
    email: "",
    nickname: "",
    password: "",
    passwordCheck: "",
    agreeToTerms: false,
  },
  resolver: zodResolver(zSchema)
})`}</CodeBlock>
    </>
  )
}
