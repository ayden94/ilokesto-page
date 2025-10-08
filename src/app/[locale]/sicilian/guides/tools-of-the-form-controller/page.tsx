import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import List from '@/ui/components/List'
import { Textline } from '@/ui/components/Text'
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('sicilian.guides.tools')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const {
  initValue,
  register,
  getValues,
  getErrors,
  setValues,
  setErrors,
  handleSubmit,
  handleServerAction
} = formController`}</CodeBlock>

      <Heading.h2>register</Heading.h2>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`type TRegister<T extends InitState> = {
  // radio 타입일 경우 - ExtractKeys<T> 버전
  <K extends ExtractKeys<T>>(params: { name: K; validate?: RegisterErrorObj<T>; type: 'radio'; value: string}): IRegister<T>,
  // radio 타입이 아닌 경우 - ExtractKeys<T> 버전
  <K extends ExtractKeys<T>>(params: { name: K; validate?: RegisterErrorObj<T>; type?: Exclude<ValidInputTypes, 'radio'> }): IRegister<T>,
  
  // radio 타입일 경우 - string 버전
  (params: { name: string; validate?: RegisterErrorObj<T>; type: 'radio'; value: string }): IRegister<T>,
  // radio 타입이 아닌 경우 - string 버전
  (params: { name: string; validate?: RegisterErrorObj<T>; type?: Exclude<ValidInputTypes, 'radio'> }): IRegister<T>;
}`}</CodeBlock>

      <Textline>{t.rich('2', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`export interface IRegister<T extends InitState> {
  onChange: (e: SicilianEvent) => void
  onFocus: (e: SicilianEvent) => void
  onBlur: (e: SicilianEvent) => void
  name: ExtractKeys<T> | string
  id: ExtractKeys<T> | string
  type: HTMLInputElement["type"]
  value?: string
  checked?: boolean
}`}</CodeBlock>

      <Heading.h2>Values and Errors</Heading.h2>

      <Textline>{t.rich('3', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`getValues: State<T, unknown>;
getErrors: State<{ [key in keyof T]: string }, string>;
setValues: IStore<T>["setStore"];
setErrors: IStore<{ [key in keyof T]: string }>["setStore"];
`}</CodeBlock>

      <CodeBlock language="tsx">{`export type State<T extends InitState, BasicReturnType> = {
  (): T & { [x: string]: BasicReturnType | undefined };
  <K extends ExtractKeys<T>>(name: K): T[K];
  (name: string): BasicReturnType | undefined;
}
 
export interface IStore<T> {
  ...
  setStore: (nextState: Partial<T> & { [x: string]: string | boolean | FileList }) => void;
  ...
}`}</CodeBlock>

      <Textline>{t.rich('4', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const { setValues } = ArticleFormController
 
const { data } = useQuery({
  queryKey: ["review", reviewId],
  queryFn: getReview(reviewId)
  }
});
 
useEffect(() => {
  setValues({
    title: data?.title ?? "",
    author: data?.author ?? "",
    description: data?.description ?? ""
  });
}, [data]);`}</CodeBlock>

      <Heading.h2>handleSubmit</Heading.h2>

      <Textline>{t.rich('5', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`<form
  onSubmit={handleSubmit(async (data, e) => {
    const res = await fetch("URL", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  })}
>`}</CodeBlock>

      <Textline>{t.rich('6', codeFormatObject)}</Textline>

      <List.ul>
        {(['0', '1'] as const).map((num) => (
          <List.item key={num}>{t.rich(`list.${num}`, codeFormatObject)}</List.item>
        ))}
      </List.ul>

      <Textline>{t.rich('7', codeFormatObject)}</Textline>

      <Heading.h2>handleServerAction</Heading.h2>

      <Textline>{t.rich('8', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`export function FeedbackModal() {
  const [state, execute, isPending] = useActionState(postFeedback);
  
  useEffect(() => {
    if (state?.message) {
      grunfeld.clear();
      toast.success("피드백이 제출되었습니다.");
    }
  }, [state?.message]);

  return <Form
    action={handleServerAction(execute)}
    className="flex flex-col w-full gap-24 overflow-y-scroll md:min-w-400"
  >
}`}</CodeBlock>

      <Textline>{t.rich('9', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`"use server";

import { FeedbackTypeKr } from "@/shared/types";
import { getCookieValue } from "@/shared/utils/cookieUtils";
import { getEnumKeyByValue } from "@/shared/utils/enumUtils";
import { fetcher } from "@/shared/utils/fetcher";

export async function postFeedback(
  prev: unknown,
  {
    type,
    message,
  }: {
    type: FeedbackTypeKr | "";
    message: string;
  }
) {
  try {
    return await fetcher.post(
      \`feedback\`,
      {
        body: {
          type: getEnumKeyByValue(type, FeedbackTypeKr),
          message,
        },
      },
      {
        headers: {
          Cookie: await getCookieValue(),
        },
      }
    );
  } catch (error) {
    console.error("Error occurred while starting interview:", error);
  }
}
`}</CodeBlock>
      <Textline>{t.rich('10', codeFormatObject)}</Textline>
    </>
  )
}
