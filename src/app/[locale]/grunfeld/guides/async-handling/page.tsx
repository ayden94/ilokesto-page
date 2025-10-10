import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale as 'ko' | 'en'
  const t = await getTranslations({ locale, namespace: 'metadata.grunfeld.guides' })

  return {
    title: t('asyncHandling'),
    description: t('asyncHandling'),
  }
}

export default async function Page() {
  const t = await getTranslations('grunfeld.guides.async-handling')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <Heading.h2>{t('subtitle1')}</Heading.h2>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const loadData = async () => {
  const promise = grunfeld.add<string>(async (removeWith) => {
    // First, show loading UI
    const loadingElement = (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>Loading user information...</p>
        <div>⏳</div>
      </div>
    );

    // Perform async operation
    try {
      const data = await fetch("/api/user").then((r) => r.json());
      
      // To update UI after successful load,
      // you need to create a new dialog or use state management
      removeWith(data);
    } catch (error) {
      // Close with error on failure
      removeWith(null);
    }

    return loadingDialog;
  });

  const result = await promise;
  console.log("Loaded data:", result);
};`}</CodeBlock>

      <Heading.h2>{t('subtitle2')}</Heading.h2>

      <Textline>{t.rich('2', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const runWorkflow = async () => {
  // Step 1: Email input
  const email = await grunfeld.add<string>((removeWith) => ({
    element: <EmailInput onSubmit={removeWith} />,
  }));

  if (!email) return;

  // Step 2: Password input
  const password = await grunfeld.add<string>((removeWith) => ({
    element: <PasswordInput email={email} onSubmit={removeWith} />,
  }));

  if (!password) return;

  // Step 3: Confirmation
  const confirmed = await grunfeld.add<boolean>((removeWith) => ({
    element: (
      <div>
        <p>Do you want to sign up with this information?</p>
        <p>Email: {email}</p>
        <button onClick={() => removeWith(true)}>Sign Up</button>
        <button onClick={() => removeWith(false)}>Cancel</button>
      </div>
    ),
  }));

  if (confirmed) {
    await signup(email, password);
  }
};`}</CodeBlock>

      <Heading.h2>{t('subtitle3')}</Heading.h2>

      <Textline>{t.rich('3', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const showTimedDialog = async () => {
  const dialogPromise = grunfeld.add<boolean>((removeWith) => ({
    element: (
      <div>
        <p>Please respond within 10 seconds</p>
        <button onClick={() => removeWith(true)}>Confirm</button>
        <button onClick={() => removeWith(false)}>Cancel</button>
      </div>
    ),
  }));

  // Auto-close after 10 seconds
  const timeoutId = setTimeout(() => {
    grunfeld.remove();
  }, 10000);

  const result = await dialogPromise;
  clearTimeout(timeoutId);

  if (result === undefined) {
    console.log("Closed due to timeout");
  } else if (result) {
    console.log("User selected confirm");
  } else {
    console.log("User selected cancel");
  }
};`}</CodeBlock>
    </>
  )
}
