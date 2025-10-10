import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('grunfeld.guides.basic-usage')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <Heading.h2>{t('subtitle1')}</Heading.h2>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`import { grunfeld } from "@ilokesto/grunfeld";

function MyComponent() {
  const showAlert = () => {
    // Simple alert - returns void
    grunfeld.add(() => (
      <div>
        <p>Hello!</p>
        <button onClick={() => grunfeld.remove()}>OK</button>
      </div>
    ));
  };

  return <button onClick={showAlert}>Show Alert</button>;
}`}</CodeBlock>

      <Heading.h2>{t('subtitle2')}</Heading.h2>

      <Textline>{t.rich('2', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`import { grunfeld } from "@ilokesto/grunfeld";

function MyComponent() {
  const showConfirm = async () => {
    const result = await grunfeld.add<boolean>((removeWith) => ({
      element: (
        <div>
          <p>Are you sure you want to delete this?</p>
          <button onClick={() => removeWith(true)}>Confirm</button>
          <button onClick={() => removeWith(false)}>Cancel</button>
        </div>
      ),
    }));

    if (result) {
      console.log("User clicked confirm");
    } else {
      console.log("User clicked cancel");
    }
  };

  return <button onClick={showConfirm}>Confirmation Dialog</button>;
}`}</CodeBlock>

      <Heading.h2>{t('subtitle3')}</Heading.h2>

      <Textline>{t.rich('3', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`import { grunfeld } from "@ilokesto/grunfeld";
import { useState } from "react";

const InputDialog = ({ onClose }: { onClose: (name: string) => void }) => {
  const [name, setName] = useState("");

  return (
    <div style={{ padding: "20px", background: "white", borderRadius: "8px" }}>
      <h3>Enter your name</h3>
      <input
        autoFocus
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) =>
          e.key === "Enter" && name.trim() && onClose(name.trim())
        }
      />
      <div>
        <button
          onClick={() => name.trim() && onClose(name.trim())}
          disabled={!name.trim()}
        >
          OK
        </button>
        <button onClick={() => onClose("")}>Cancel</button>
      </div>
    </div>
  );
};

function MyComponent() {
  const showInput = async () => {
    const input = await grunfeld.add<string>((removeWith) => ({
      element: <InputDialog onClose={removeWith} />,
    }));

    if (input) {
      console.log("Input value:", input);
    } else {
      console.log("Canceled");
    }
  };

  return <button onClick={showInput}>Input Dialog</button>;
}`}</CodeBlock>
    </>
  )
}
