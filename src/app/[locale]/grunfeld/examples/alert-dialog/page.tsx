import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale as 'ko' | 'en'
  const t = await getTranslations({ locale, namespace: 'metadata.grunfeld.examples' })

  return {
    title: t('alertDialog'),
    description: t('alertDialog'),
  }
}

export default async function Page() {
  const t = await getTranslations('grunfeld.examples.alert-dialog')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <Heading.h2>{t('subtitle1')}</Heading.h2>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`grunfeld.add(() => (
  <div style={{ padding: "20px", background: "white", borderRadius: "8px" }}>
    <p>This is an alert message</p>
    <button onClick={() => grunfeld.remove()}>OK</button>
  </div>
));`}</CodeBlock>

      <Heading.h2>{t('subtitle2')}</Heading.h2>

      <Textline>{t.rich('2', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`grunfeld.add(() => ({
  element: (
    <div style={{ padding: "20px", background: "white", borderRadius: "8px" }}>
      <h3>✅ Success</h3>
      <p>Save completed!</p>
      <button onClick={() => grunfeld.remove()}>OK</button>
    </div>
  ),
  position: "top-right",
}));`}</CodeBlock>

      <Heading.h2>{t('subtitle3')}</Heading.h2>

      <Textline>{t.rich('3', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`grunfeld.add(() => ({
  element: (
    <div style={{
      padding: "20px",
      background: "#fee",
      borderRadius: "8px",
      border: "2px solid #c00"
    }}>
      <h3>❌ Error</h3>
      <p>Unable to perform operation</p>
      <button onClick={() => grunfeld.remove()}>OK</button>
    </div>
  ),
  backdropStyle: {
    backgroundColor: "rgba(255, 0, 0, 0.1)",
  },
}));`}</CodeBlock>

      <Heading.h2>{t('subtitle4')}</Heading.h2>

      <Textline>{t.rich('4', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const showToast = (message: string) => {
  grunfeld.add(() => ({
    element: (
      <div style={{
        padding: "16px 24px",
        background: "#333",
        color: "white",
        borderRadius: "8px",
      }}>
        {message}
      </div>
    ),
    position: "bottom-center",
    lightDismiss: false,
  }));

  // Auto-remove after 3 seconds
  setTimeout(() => {
    grunfeld.remove();
  }, 3000);
};

// Usage
showToast("Copied!");`}</CodeBlock>

      <Textline>{t.rich('5', codeFormatObject)}</Textline>
    </>
  )
}
