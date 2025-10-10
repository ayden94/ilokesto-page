import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('grunfeld.examples.custom-styling')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <Heading.h2>{t('subtitle1')}</Heading.h2>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`grunfeld.add(() => ({
  element: (
    <div className="p-6 bg-white rounded-lg shadow-xl max-w-md">
      <h3 className="text-2xl font-bold mb-4">Styled Dialog</h3>
      <p className="text-gray-600 mb-6">
        Beautiful design using Tailwind CSS
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => grunfeld.remove()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          OK
        </button>
        <button
          onClick={() => grunfeld.remove()}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  ),
  backdropStyle: {
    backdropFilter: "blur(4px)",
  },
}));`}</CodeBlock>

      <Heading.h2>{t('subtitle2')}</Heading.h2>

      <Textline>{t.rich('2', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`// styles.module.css
.dialog {
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  max-width: 400px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #333;
}

.content {
  color: #666;
  margin-bottom: 24px;
  line-height: 1.6;
}

.buttons {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

// Component
import styles from "./styles.module.css";

grunfeld.add(() => ({
  element: (
    <div className={styles.dialog}>
      <h3 className={styles.title}>CSS Module Dialog</h3>
      <p className={styles.content}>
        Styles are isolated using CSS modules
      </p>
      <div className={styles.buttons}>
        <button onClick={() => grunfeld.remove()}>OK</button>
      </div>
    </div>
  ),
}));`}</CodeBlock>

      <Heading.h2>{t('subtitle3')}</Heading.h2>

      <Textline>{t.rich('3', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const DynamicDialog = ({ type }: { type: "success" | "error" | "warning" }) => {
  const colors = {
    success: { bg: "#d4edda", border: "#28a745", text: "#155724" },
    error: { bg: "#f8d7da", border: "#dc3545", text: "#721c24" },
    warning: { bg: "#fff3cd", border: "#ffc107", text: "#856404" },
  };

  const color = colors[type];

  return (
    <div
      style={{
        padding: "20px",
        background: color.bg,
        border: \`2px solid \${color.border}\`,
        borderRadius: "8px",
        color: color.text,
      }}
    >
      <h3 style={{ marginBottom: "8px" }}>
        {type === "success" && "✅ Success"}
        {type === "error" && "❌ Error"}
        {type === "warning" && "⚠️ Warning"}
      </h3>
      <p>Dynamically generated styles</p>
      <button onClick={() => grunfeld.remove()}>OK</button>
    </div>
  );
};

grunfeld.add(() => ({
  element: <DynamicDialog type="success" />,
}));`}</CodeBlock>

      <Heading.h2>{t('subtitle4')}</Heading.h2>

      <Textline>{t.rich('4', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`grunfeld.add(() => ({
  element: <MyDialog />,
  backdropStyle: {
    backgroundColor: "rgba(102, 126, 234, 0.1)",
    backdropFilter: "blur(8px)",
  },
}));

// 어두운 백드롭
grunfeld.add(() => ({
  element: <MyDialog />,
  backdropStyle: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
}));

// 그라디언트 백드롭
grunfeld.add(() => ({
  element: <MyDialog />,
  backdropStyle: {
    background: "linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))",
    backdropFilter: "blur(10px)",
  },
}));`}</CodeBlock>

      <Heading.h2>{t('subtitle5')}</Heading.h2>

      <Textline>{t.rich('5', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`// styles.css
@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animated-dialog {
  animation: slideIn 0.3s ease-out;
}

// Component
grunfeld.add(() => ({
  element: (
    <div className="animated-dialog" style={{ padding: "20px", background: "white" }}>
      <h3>Animated Dialog</h3>
      <p>Appears with smooth animation</p>
      <button onClick={() => grunfeld.remove()}>OK</button>
    </div>
  ),
}));`}</CodeBlock>
    </>
  )
}
