import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('grunfeld.guides.dialog-patterns')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <Heading.h2>{t('subtitle1')}</Heading.h2>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`grunfeld.add(() => (
  <div>
    <p>Task completed successfully!</p>
    <button onClick={() => grunfeld.remove()}>OK</button>
  </div>
));`}</CodeBlock>

      <Heading.h2>{t('subtitle2')}</Heading.h2>

      <Textline>{t.rich('2', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const confirmed = await grunfeld.add<boolean>((removeWith) => ({
  element: (
    <div>
      <p>Are you sure you want to delete this?</p>
      <button onClick={() => removeWith(true)}>Delete</button>
      <button onClick={() => removeWith(false)}>Cancel</button>
    </div>
  ),
}));

if (confirmed) {
  // Proceed with deletion
}`}</CodeBlock>

      <Heading.h2>{t('subtitle3')}</Heading.h2>

      <Textline>{t.rich('3', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const name = await grunfeld.add<string>((removeWith) => ({
  element: (
    <div>
      <h3>Enter your name</h3>
      <input
        type="text"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            removeWith(e.currentTarget.value);
          }
        }}
      />
      <button onClick={(e) => {
        const input = e.currentTarget.previousElementSibling as HTMLInputElement;
        removeWith(input.value);
      }}>
        OK
      </button>
    </div>
  ),
}));

console.log("Entered name:", name);`}</CodeBlock>

      <Heading.h2>{t('subtitle4')}</Heading.h2>

      <Textline>{t.rich('4', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`interface FormData {
  email: string;
  password: string;
}

const data = await grunfeld.add<FormData>((removeWith) => ({
  element: <CustomLoginForm onSubmit={removeWith} />,
  position: "center",
  lightDismiss: false,
}));

if (data) {
  // Handle login
  await login(data.email, data.password);
}`}</CodeBlock>
    </>
  )
}
