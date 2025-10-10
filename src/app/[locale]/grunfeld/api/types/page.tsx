import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('grunfeld.api.types')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <Heading.h2>{t('subtitle1')}</Heading.h2>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

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

      <Heading.h2>{t('subtitle2')}</Heading.h2>

      <Textline>{t.rich('2', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`type PositionX = "left" | "center" | "right";
type PositionY = "top" | "center" | "bottom";

type Position = \`\${PositionY}-\${PositionX}\` | "center";

// All available Position values:
// "top-left", "top-center", "top-right",
// "center-left", "center", "center-right",
// "bottom-left", "bottom-center", "bottom-right"`}</CodeBlock>

      <Heading.h2>{t('subtitle3')}</Heading.h2>

      <Textline>{t.rich('3', codeFormatObject)}</Textline>

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

      <Textline>{t.rich('4', codeFormatObject)}</Textline>
    </>
  )
}
