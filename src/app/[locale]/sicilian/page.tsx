import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import List from '@/ui/components/List'
import { Textline } from '@/ui/components/Text'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

export default async function Page() {
  const t = await getTranslations('sicilian.introduce')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t.rich('description', codeFormatObject)}</Textline>

      <Heading.h2>{t('whatsNew')}</Heading.h2>

      <List.ul>
        {(['0', '1', '2', '3', '4'] as const).map((num) => (
          <List.item key={num}>
            {t.rich(`list.${num}`, {
              ...codeFormatObject,
              a: (chunk) => (
                <Link className="link" href="">
                  {chunk}
                </Link>
              ),
            })}
          </List.item>
        ))}
      </List.ul>

      <Heading.h2>{t('installation')}</Heading.h2>

      <Textline>{t('installationBody')}</Textline>

      <CodeBlock filename="install.sh" language="bash">
        {`npm install @ilokesto/sicilian
pnpm add @ilokesto/sicilian
yarn add @ilokesto/sicilian
bun add @ilokesto/sicilian`}
      </CodeBlock>

      <Heading.h2>{t('quickStart')}</Heading.h2>

      <Textline>{t('quickStartBody')}</Textline>

      <CodeBlock language="tsx">{`
import { useForm } from '@ilokesto/sicilian';

export default function MySimpleForm() {
  const { register, handleSubmit, getErrors } = useForm({
    initValue: {
      name: '',
      email: ''
    },
    validator: {
      name: {
        required: { required: true, message: 'name is required' }
      },
      email: {
        required: { required: true, message: 'email is required' },
        RegExp: {
          RegExp: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
          message: 'email format is invalid'
        }
      }
    }
  });

  const onSubmit = (data) => {
    console.log('data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">name:</label>
        <input id="name" {...register({ name: 'name', type: 'text' })} />
        {getErrors('name')}
      </div>

      <div>
        <label htmlFor="email">email:</label>
        <input id="email" {...register({ name: 'email', type: 'email' })} />
        {getErrors('email')}
      </div>

      <button type="submit">login</button>
    </form>
  );
}`}</CodeBlock>
    </>
  )
}
