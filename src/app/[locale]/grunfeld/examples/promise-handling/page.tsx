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
    title: t('promiseHandling'),
    description: t('promiseHandling'),
  }
}

export default async function Page() {
  const t = await getTranslations('grunfeld.examples.promise-handling')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <Heading.h2>{t('subtitle1')}</Heading.h2>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const runOnboarding = async () => {
  // Step 1: Welcome message
  await grunfeld.add<void>((removeWith) => ({
    element: (
      <div>
        <h2>Welcome! 👋</h2>
        <p>Let's start a quick tutorial</p>
        <button onClick={() => removeWith()}>Start</button>
      </div>
    ),
  }));

  // Step 2: Feature introduction
  await grunfeld.add<void>((removeWith) => ({
    element: (
      <div>
        <h2>Key Features</h2>
        <p>Here are the main features of this app</p>
        <button onClick={() => removeWith()}>Next</button>
      </div>
    ),
  }));

  // Step 3: Complete
  await grunfeld.add<void>((removeWith) => ({
    element: (
      <div>
        <h2>Complete! 🎉</h2>
        <p>You're now ready to use the app</p>
        <button onClick={() => removeWith()}>Get Started</button>
      </div>
    ),
  }));

  console.log("Onboarding complete");
};`}</CodeBlock>

      <Heading.h2>{t('subtitle2')}</Heading.h2>

      <Textline>{t.rich('2', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const conditionalWorkflow = async () => {
  // First question
  const wantsToSave = await grunfeld.add<boolean>((removeWith) => ({
    element: (
      <div>
        <p>Do you want to save changes?</p>
        <button onClick={() => removeWith(true)}>Yes</button>
        <button onClick={() => removeWith(false)}>No</button>
      </div>
    ),
  }));

  if (!wantsToSave) {
    console.log("Not saving");
    return;
  }

  // Choose save location
  const location = await grunfeld.add<string>((removeWith) => ({
    element: (
      <div>
        <p>Where do you want to save?</p>
        <button onClick={() => removeWith("local")}>Local</button>
        <button onClick={() => removeWith("cloud")}>Cloud</button>
      </div>
    ),
  }));

  if (location === "cloud") {
    // Login required for cloud
    const loggedIn = await grunfeld.add<boolean>((removeWith) => ({
      element: (
        <div>
          <p>Login required to save to cloud</p>
          <button onClick={() => removeWith(true)}>Login</button>
          <button onClick={() => removeWith(false)}>Cancel</button>
        </div>
      ),
    }));

    if (!loggedIn) {
      console.log("Login cancelled");
      return;
    }

    await saveToCloud();
  } else {
    await saveToLocal();
  }

  grunfeld.add(() => <div>Saved!</div>);
};`}</CodeBlock>

      <Heading.h2>{t('subtitle3')}</Heading.h2>

      <Textline>{t.rich('3', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const timedInput = async () => {
  const timeout = new Promise<string>((resolve) => {
    setTimeout(() => resolve("TIMEOUT"), 5000);
  });

  const userInput = grunfeld.add<string>((removeWith) => ({
    element: (
      <div>
        <p>Enter within 5 seconds:</p>
        <input
          autoFocus
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

  const result = await Promise.race([userInput, timeout]);

  if (result === "TIMEOUT") {
    grunfeld.remove(); // Close dialog
    console.log("Timeout");
  } else {
    console.log("Input value:", result);
  }
};`}</CodeBlock>

      <Heading.h2>{t('subtitle4')}</Heading.h2>

      <Textline>{t.rich('4', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const fetchDataWithDialog = async () => {
  try {
    // Show loading dialog
    grunfeld.add(() => ({
      element: (
        <div>
          <p>Loading data...</p>
          <div className="spinner" />
        </div>
      ),
      lightDismiss: false,
    }));

    // Fetch data
    const data = await fetch("/api/data").then((r) => {
      if (!r.ok) throw new Error("Failed to fetch");
      return r.json();
    });

    // Close loading dialog
    grunfeld.remove();

    // Success message
    grunfeld.add(() => (
      <div>
        <h3>✅ Success</h3>
        <p>Data loaded</p>
        <button onClick={() => grunfeld.remove()}>OK</button>
      </div>
    ));

    return data;
  } catch (error) {
    // Close loading dialog
    grunfeld.remove();

    // Show error dialog
    await grunfeld.add<void>((removeWith) => ({
      element: (
        <div>
          <h3>❌ Error</h3>
          <p>Unable to load data</p>
          <button onClick={() => removeWith()}>OK</button>
        </div>
      ),
    }));

    throw error;
  }
};`}</CodeBlock>

      <Heading.h2>{t('subtitle5')}</Heading.h2>

      <Textline>{t.rich('5', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const handleDialogInterruption = async () => {
  const promise = grunfeld.add<boolean>((removeWith) => ({
    element: (
      <div>
        <p>Are you sure?</p>
        <button onClick={() => removeWith(true)}>Yes</button>
        <button onClick={() => removeWith(false)}>No</button>
      </div>
    ),
  }));

  // Dialog can be closed externally for various reasons
  // e.g., route change, user presses ESC, another code calls grunfeld.clear()

  const result = await promise;

  if (result === undefined) {
    console.log("Dialog was interrupted");
    // Perform cleanup
  } else if (result) {
    console.log("User selected confirm");
  } else {
    console.log("User selected cancel");
  }
};

// Practical example: Close all dialogs on route change
router.events.on("routeChangeStart", () => {
  grunfeld.clear();
});`}</CodeBlock>
    </>
  )
}
