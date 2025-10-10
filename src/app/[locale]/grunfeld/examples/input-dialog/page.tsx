import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('grunfeld.examples.input-dialog')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <Heading.h2>{t('subtitle1')}</Heading.h2>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const TextInput = ({ onSubmit }: { onSubmit: (value: string) => void }) => {
  const [value, setValue] = useState("");

  return (
    <div style={{ padding: "20px", background: "white", borderRadius: "8px" }}>
      <h3>Enter your name</h3>
      <input
        autoFocus
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && value.trim()) {
            onSubmit(value.trim());
          }
        }}
        style={{ width: "100%", padding: "8px", marginBottom: "16px" }}
      />
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={() => onSubmit(value.trim())}
          disabled={!value.trim()}
        >
          OK
        </button>
        <button onClick={() => onSubmit("")}>Cancel</button>
      </div>
    </div>
  );
};

const getName = async () => {
  const name = await grunfeld.add<string>((removeWith) => ({
    element: <TextInput onSubmit={removeWith} />,
  }));

  if (name) {
    console.log("Entered name:", name);
  }
};`}</CodeBlock>

      <Heading.h2>{t('subtitle2')}</Heading.h2>

      <Textline>{t.rich('2', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const ValidatedInput = ({ onSubmit }: { onSubmit: (value: string) => void }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (value: string) => {
    if (!value) return "Please enter email";
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)) {
      return "Please enter valid email address";
    }
    return "";
  };

  const handleSubmit = () => {
    const errorMsg = validateEmail(email);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    onSubmit(email);
  };

  return (
    <div style={{ padding: "20px", background: "white", borderRadius: "8px" }}>
      <h3>Enter Email</h3>
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError("");
        }}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "8px",
          border: error ? "2px solid red" : "1px solid #ccc",
        }}
      />
      {error && <p style={{ color: "red", margin: "0 0 16px" }}>{error}</p>}
      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={handleSubmit}>OK</button>
        <button onClick={() => onSubmit("")}>Cancel</button>
      </div>
    </div>
  );
};

const getEmail = async () => {
  const email = await grunfeld.add<string>((removeWith) => ({
    element: <ValidatedInput onSubmit={removeWith} />,
  }));

  if (email) {
    console.log("Entered email:", email);
  }
};`}</CodeBlock>

      <Heading.h2>{t('subtitle3')}</Heading.h2>

      <Textline>{t.rich('3', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`interface FormData {
  name: string;
  email: string;
  age: number;
}

const MultiFieldForm = ({ onSubmit }: { onSubmit: (data: FormData) => void }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    age: 0,
  });

  const handleChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isValid = formData.name && formData.email && formData.age > 0;

  return (
    <div style={{ padding: "20px", background: "white", borderRadius: "8px" }}>
      <h3>Enter User Information</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input
          placeholder="Name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={formData.age || ""}
          onChange={(e) => handleChange("age", parseInt(e.target.value) || 0)}
        />
      </div>
      <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
        <button onClick={() => onSubmit(formData)} disabled={!isValid}>
          OK
        </button>
        <button onClick={() => onSubmit(null as any)}>Cancel</button>
      </div>
    </div>
  );
};

const getFormData = async () => {
  const data = await grunfeld.add<FormData>((removeWith) => ({
    element: <MultiFieldForm onSubmit={removeWith} />,
  }));

  if (data) {
    console.log("Entered data:", data);
  }
};`}</CodeBlock>

      <Heading.h2>{t('subtitle4')}</Heading.h2>

      <Textline>{t.rich('4', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const SelectDialog = ({ 
  options, 
  onSelect 
}: { 
  options: string[]; 
  onSelect: (value: string) => void;
}) => {
  return (
    <div style={{ padding: "20px", background: "white", borderRadius: "8px" }}>
      <h3>Select an option</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            style={{
              padding: "12px",
              textAlign: "left",
              background: "#f5f5f5",
              border: "1px solid #ddd",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        onClick={() => onSelect("")}
        style={{ marginTop: "16px", width: "100%" }}
      >
        Cancel
      </button>
    </div>
  );
};

const getSelection = async () => {
  const options = ["Option 1", "Option 2", "Option 3"];
  
  const selected = await grunfeld.add<string>((removeWith) => ({
    element: <SelectDialog options={options} onSelect={removeWith} />,
  }));

  if (selected) {
    console.log("Selected option:", selected);
  }
};`}</CodeBlock>
    </>
  )
}
