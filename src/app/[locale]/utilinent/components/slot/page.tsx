import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale as 'ko' | 'en'
  const t = await getTranslations({ locale, namespace: 'metadata.utilinent' })
  return {
    title: t('components'),
    description: t('components'),
  }
}

export default async function Page() {
  const t = await getTranslations('utilinent.slot')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>Slot</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const Slot: ForwardRefExoticComponent<
  React.HTMLAttributes<HTMLElement> & RefAttributes<HTMLElement>
>;

function Slottable(props: {
  children: React.ReactNode;
}): React.ReactElement;`}</CodeBlock>

      <Heading.h2>{t('subtitle1')}</Heading.h2>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`import { Slot, Slottable } from '@ilokesto/utilinent';

function Button({ asChild, ...props }) {
  const Comp = asChild ? Slot : 'button';
  return <Comp {...props} />;
}

// render as a button
<Button onClick={handleClick}>클릭</Button>

// render as a link
<Button asChild>
  <Link to="/home">홈으로</Link>
</Button>`}</CodeBlock>

      <Heading.h2>{t('subtitle2')}</Heading.h2>

      <Textline>{t.rich('2', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`<Slot style={{ color: 'red' }}>
  <div>
    <Icon />
    <Slottable>
      <span>이 span에만 style이 적용됨</span>
    </Slottable>
  </div>
</Slot>`}</CodeBlock>
    </>
  )
}
