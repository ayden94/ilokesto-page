import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('sicilian.tutorials.custom')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>Custom Form</Heading.h1>
      <Textline>{t.rich('0', codeFormatObject)}</Textline>
      <CodeBlock language="tsx" filename="src/component/TodoForm.tsx">{`const TODO_LIST_FORM = new CreateForm({
  validateOn: ["submit", "change"],
  clearFormOn: ["submit", "routeChange"],
});

export default function TodoForm() {
  const [todo, setTodo] = useState<Array<{ name: string, todo: "date" | "text" }>>([{ name: "date", todo: "date" }]);

  return (
    <form onSubmit={TODO_LIST_FORM.handleSubmit((data) => {console.log(data)})}>
      {todo.map(({ name, todo }, i) => (
        <div key={i}>
          {name}
          <input {...TODO_LIST_FORM.register({ name, type: todo, validate: { required: true } })}/>
          {TODO_LIST_FORM.getErrors(name)}
        </div>
      ))}

      <button type="button" onClick={() => setTodo(prev => [...prev, { name: \`할일 \${prev.length}\`, todo: "text" }])}>Add todo</button>
      <button>submit</button>
    </form>
  )
}`}</CodeBlock>
      <Textline>{t.rich('1', codeFormatObject)}</Textline>
      <CodeBlock language="tsx" filename="src/component/TodoForm.tsx">{`const TODO_LIST_FORM = new CreateForm({
  validateOn: ["submit", "change"],
  clearFormOn: ["submit", "routeChange"],
});

export default function TodoForm() {
  const [todo, setTodo] = useState<Array<{ name: string, type: "date" | "text" }>>([{ name: "date", type: "date" }, { name: "할일 1", type: "text" }]);

  return (
    <form onSubmit={TODO_LIST_FORM.handleSubmit((data) => {console.log(data)})}>
      {todo.map(({ name, type }, i) => (
        <div key={i}>
          <SicilianProvider value={{ register: TODO_LIST_FORM.register, name, type, validate: { required: true }, getErrors: TODO_LIST_FORM.getErrors }}>
            <TodoInput />
          </SicilianProvider>
        </div>
      ))}

      <button type="button" onClick={() => setTodo(prev => [...prev, { name: \`할일 \${prev.length}\`, type: "text" }])}>Add TODO</button>
      <button>submit</button>
    </form>
  )
}

const TodoInput = () => {
  const { register, name, validate, type, getErrors } = useSicilianContext();

  return (
    <>
      {name}
      <input {...register({name, validate, type})}/>
      {getErrors(name)}
    </>
  )
}`}</CodeBlock>
    </>
  )
}
