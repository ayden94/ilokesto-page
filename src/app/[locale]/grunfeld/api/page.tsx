import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import List from '@/ui/components/List'
import { Textline } from '@/ui/components/Text'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale as 'ko' | 'en'
  const t = await getTranslations({ locale, namespace: 'metadata.grunfeld.api' })

  return {
    title: t('title'),
    description: t('title'),
  }
}

export default async function Page() {
  const t = await getTranslations('grunfeld.api')
  const tMeta = await getTranslations('metadata.grunfeld.api')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>{tMeta('title')}</Heading.h1>

      {/* grunfeld.add() Section */}
      <Heading.h2>{t('add-method.title')}</Heading.h2>

      <Textline>{t.rich('add-method.0', codeFormatObject)}</Textline>

      <Heading.h3>{t('add-method.subtitle1')}</Heading.h3>

      <Textline>{t.rich('add-method.1', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`grunfeld.add(() => React.ReactNode | GrunfeldProps): void`}</CodeBlock>

      <Textline>{t.rich('add-method.2', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`// Direct React element return
grunfeld.add(() => <div>Simple alert</div>);

// With options
grunfeld.add(() => ({
  element: <div>Positioned alert</div>,
  position: "top-right",
  lightDismiss: false,
}));`}</CodeBlock>

      <Heading.h3>{t('add-method.subtitle2')}</Heading.h3>

      <Textline>{t.rich('add-method.3', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`grunfeld.add<T>((removeWith: (data: T) => void) => GrunfeldProps): Promise<T | undefined>`}</CodeBlock>

      <Textline>{t.rich('add-method.4', codeFormatObject)}</Textline>

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

      <Heading.h3>{t('add-method.subtitle3')}</Heading.h3>

      <Textline>{t.rich('add-method.5', codeFormatObject)}</Textline>

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
          <List.item key={num}>{t.rich(`add-method.list.${num}`, codeFormatObject)}</List.item>
        ))}
      </List.ul>

      <Heading.h3>{t('add-method.subtitle4')}</Heading.h3>

      <Textline>{t.rich('add-method.6', codeFormatObject)}</Textline>

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

      <Textline>{t.rich('add-method.7', codeFormatObject)}</Textline>

      {/* remove & clear Section */}
      <Heading.h2 className="mt-16">{t('remove-clear.title')}</Heading.h2>

      <Textline>{t.rich('remove-clear.0', codeFormatObject)}</Textline>

      <Heading.h3>{t('remove-clear.subtitle1')}</Heading.h3>

      <Textline>{t.rich('remove-clear.1', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`// Remove most recent dialog
grunfeld.remove();

// Usage example
grunfeld.add(() => <div>First</div>);
grunfeld.add(() => <div>Second</div>);
grunfeld.add(() => <div>Third</div>);

grunfeld.remove(); // "Third" is removed
grunfeld.remove(); // "Second" is removed`}</CodeBlock>

      <Textline>{t.rich('remove-clear.2', codeFormatObject)}</Textline>

      <Heading.h3>{t('remove-clear.subtitle2')}</Heading.h3>

      <Textline>{t.rich('remove-clear.3', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`// Remove all dialogs
grunfeld.clear();

// Usage example
grunfeld.add(() => <div>First</div>);
grunfeld.add(() => <div>Second</div>);
grunfeld.add(() => <div>Third</div>);

grunfeld.clear(); // All dialogs are removed`}</CodeBlock>

      <Textline>{t.rich('remove-clear.4', codeFormatObject)}</Textline>

      <Heading.h3>{t('remove-clear.subtitle3')}</Heading.h3>

      <Textline>{t.rich('remove-clear.5', codeFormatObject)}</Textline>

      <List.ul>
        {(['0', '1'] as const).map((num) => (
          <List.item key={num}>{t.rich(`remove-clear.list.${num}`, codeFormatObject)}</List.item>
        ))}
      </List.ul>

      <Textline>{t.rich('remove-clear.6', codeFormatObject)}</Textline>

      {/* Types Section */}
      <Heading.h2 className="mt-16">{t('types.title')}</Heading.h2>

      <Textline>{t.rich('types.0', codeFormatObject)}</Textline>

      <Heading.h3>{t('types.subtitle1')}</Heading.h3>

      <Textline>{t.rich('types.1', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`import type { 
  GrunfeldProps, 
  Position, 
  RenderMode 
} from "@ilokesto/grunfeld";

interface GrunfeldProps {
  element: React.ReactNode;
  position?: Position;
  lightDismiss?: boolean;
  backdropStyle?: React.CSSProperties;
  dismissCallback?: () => unknown;
  renderMode?: RenderMode;
}

type RenderMode = "inline" | "top-layer";`}</CodeBlock>

      <Heading.h3>{t('types.subtitle2')}</Heading.h3>

      <Textline>{t.rich('types.2', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`type PositionX = "left" | "center" | "right";
type PositionY = "top" | "center" | "bottom";

type Position = \`\${PositionY}-\${PositionX}\` | "center";

// All available Position values:
// "top-left", "top-center", "top-right",
// "center-left", "center", "center-right",
// "bottom-left", "bottom-center", "bottom-right"`}</CodeBlock>

      <Heading.h3>{t('types.subtitle3')}</Heading.h3>

      <Textline>{t.rich('types.3', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`// Return boolean
const result = await grunfeld.add<boolean>((removeWith) => ({
  element: <ConfirmDialog onConfirm={removeWith} />,
}));
// result type: boolean | undefined

// Return custom object
interface FormData {
  email: string;
  password: string;
}

const data = await grunfeld.add<FormData>((removeWith) => ({
  element: <LoginForm onSubmit={removeWith} />,
}));
// data type: FormData | undefined`}</CodeBlock>

      <Textline>{t.rich('types.4', codeFormatObject)}</Textline>
    </>
  )
}
