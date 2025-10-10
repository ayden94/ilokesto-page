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
  const t = await getTranslations('sicilian.tutorials.dynamic')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>Dynamic Form</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <CodeBlock
        language="tsx"
        filename="src/component/CommentInput.tsx"
      >{`export function CommentInput({ initComment }: { initComment?: string }) {
  const COMMENT_FORM = useForm({
    initValue: {
      comment: initComment ?? ""
    },
    validator: {
      comment: {
        required: { required: true, message: "Please enter a comment" },
        maxLength: { number: 100, message: "Comments must be 100 characters or less" },
        custom: {
          checkFn: (value: string) => value !== initComment,
          message: "Comment has not been changed"
        }
      }
    },
    validateOn: ["submit", "change"],
  })
 
  return (
    <form onSubmit={COMMENT_FORM.handleSubmit((data) => {console.log(data)})}>
      <input {...COMMENT_FORM.register({ name: "comment" })}/>
      {COMMENT_FORM.getErrors("comment")}
      <button>submit</button>
    </form>
  )
}`}</CodeBlock>
    </>
  )
}
