import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import List from '@/ui/components/List'
import { Textline } from '@/ui/components/Text'
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('grunfeld.api.add-method')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <Heading.h2>{t('subtitle1')}</Heading.h2>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`grunfeld.add(() => React.ReactNode | GrunfeldProps): void`}</CodeBlock>

      <Textline>{t.rich('2', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`// Direct React element return
grunfeld.add(() => <div>Simple alert</div>);

// With options
grunfeld.add(() => ({
  element: <div>Positioned alert</div>,
  position: "top-right",
  lightDismiss: false,
}));`}</CodeBlock>

      <Heading.h2>{t('subtitle2')}</Heading.h2>

      <Textline>{t.rich('3', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`grunfeld.add<T>((removeWith: (data: T) => void) => GrunfeldProps): Promise<T | undefined>`}</CodeBlock>

      <Textline>{t.rich('4', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const result = await grunfeld.add<boolean>((removeWith) => ({
  element: (
    <div>
      <p>Are you sure?</p>
      <button onClick={() => removeWith(true)}>Yes</button>
      <button onClick={() => removeWith(false)}>No</button>
    </div>
  ),
}));

// Receive string input
const input = await grunfeld.add<string>((removeWith) => ({
  element: <InputForm onSubmit={removeWith} />,
}));`}</CodeBlock>

      <Heading.h2>{t('subtitle3')}</Heading.h2>

      <Textline>{t.rich('5', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`interface GrunfeldProps {
  element: React.ReactNode;
  position?: Position;
  lightDismiss?: boolean;
  backdropStyle?: React.CSSProperties;
  dismissCallback?: () => unknown;
  renderMode?: "inline" | "top-layer";
}`}</CodeBlock>

      <List.ul>
        {(['0', '1', '2', '3', '4', '5'] as const).map((num) => (
          <List.item key={num}>{t.rich(`list.${num}`, codeFormatObject)}</List.item>
        ))}
      </List.ul>

      <Heading.h2>{t('subtitle4')}</Heading.h2>

      <Textline>{t.rich('6', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const promise = grunfeld.add<boolean>((removeWith) => ({
  element: (
    <div>
      <p>Are you sure?</p>
      <button onClick={() => removeWith(true)}>Yes</button>
      <button onClick={() => removeWith(false)}>No</button>
    </div>
  ),
}));

// Force remove dialog from elsewhere
setTimeout(() => {
  grunfeld.remove(); // promise resolves to undefined
}, 1000);

const result = await promise; // result is undefined
if (result === undefined) {
  console.log("Dialog was interrupted");
}`}</CodeBlock>

      <Textline>{t.rich('7', codeFormatObject)}</Textline>
    </>
  )
}
