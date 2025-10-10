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
    title: t('confirmDialog'),
    description: t('confirmDialog'),
  }
}

export default async function Page() {
  const t = await getTranslations('grunfeld.examples.confirm-dialog')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <Heading.h2>{t('subtitle1')}</Heading.h2>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const handleDelete = async () => {
  const confirmed = await grunfeld.add<boolean>((removeWith) => ({
    element: (
      <div style={{ padding: "20px", background: "white", borderRadius: "8px" }}>
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete? This action cannot be undone.</p>
        <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
          <button
            onClick={() => removeWith(true)}
            style={{ background: "#c00", color: "white" }}
          >
            Delete
          </button>
          <button onClick={() => removeWith(false)}>
            Cancel
          </button>
        </div>
      </div>
    ),
  }));

  if (confirmed) {
    await deleteItem();
    console.log("Deleted");
  }
};`}</CodeBlock>

      <Heading.h2>{t('subtitle2')}</Heading.h2>

      <Textline>{t.rich('2', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const DestructiveConfirm = ({ onConfirm }: { onConfirm: (value: boolean) => void }) => {
  const [inputValue, setInputValue] = useState("");
  const confirmText = "DELETE";

  return (
    <div style={{ padding: "20px", background: "white", borderRadius: "8px" }}>
      <h3>⚠️ Dangerous Action</h3>
      <p>To proceed, type "{confirmText}".</p>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={confirmText}
        style={{ width: "100%", padding: "8px", marginTop: "8px" }}
      />
      <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
        <button
          onClick={() => onConfirm(true)}
          disabled={inputValue !== confirmText}
          style={{
            background: inputValue === confirmText ? "#c00" : "#ccc",
            color: "white",
          }}
        >
          Delete
        </button>
        <button onClick={() => onConfirm(false)}>Cancel</button>
      </div>
    </div>
  );
};

const handleDangerousDelete = async () => {
  const confirmed = await grunfeld.add<boolean>((removeWith) => ({
    element: <DestructiveConfirm onConfirm={removeWith} />,
    lightDismiss: false,
  }));

  if (confirmed) {
    await performDangerousAction();
  }
};`}</CodeBlock>

      <Heading.h2>{t('subtitle3')}</Heading.h2>

      <Textline>{t.rich('3', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const saveChanges = async () => {
  if (!hasChanges) {
    await save();
    return;
  }

  const confirmed = await grunfeld.add<boolean>((removeWith) => ({
    element: (
      <div>
        <h3>Save Changes</h3>
        <p>Do you want to save changes?</p>
        <button onClick={() => removeWith(true)}>Save</button>
        <button onClick={() => removeWith(false)}>Cancel</button>
      </div>
    ),
  }));

  if (confirmed) {
    await save();
    grunfeld.add(() => <div>Saved!</div>);
  } else {
    console.log("Save cancelled");
  }
};`}</CodeBlock>

      <Heading.h2>{t('subtitle4')}</Heading.h2>

      <Textline>{t.rich('4', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const showTimedConfirm = async () => {
  const confirmPromise = grunfeld.add<boolean>((removeWith) => ({
    element: (
      <div>
        <h3>⏰ Please respond within 10 seconds</h3>
        <p>Will be automatically cancelled after timeout.</p>
        <button onClick={() => removeWith(true)}>Confirm</button>
        <button onClick={() => removeWith(false)}>Cancel</button>
      </div>
    ),
  }));

  // 10 second timeout
  const timeoutId = setTimeout(() => {
    grunfeld.remove();
  }, 10000);

  const result = await confirmPromise;
  clearTimeout(timeoutId);

  if (result === undefined) {
    console.log("Auto-cancelled due to timeout");
  } else if (result) {
    console.log("Confirmed");
  } else {
    console.log("Cancelled");
  }
};`}</CodeBlock>
    </>
  )
}
