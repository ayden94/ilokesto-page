import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('caroKann.create-store')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const useStore = create({
  email: "wpfekdml@me.com",
  name: "Ayden Blair",
  phoneNumber: "010-****-****",
  age: 30,
});`}</CodeBlock>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`function ProfileCard() {
  const [value, setValue] = useStore();
  
  return (
    <div class={style.root}>
      <div>name: {value.name}</div>
      <div>
        <div>email: {value.email}</div>
        <div>phone: {value.phoneNumber}</div>
      </div>
    </div>
  )
}`}</CodeBlock>
    </>
  )
}
