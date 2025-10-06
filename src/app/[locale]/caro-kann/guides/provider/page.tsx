import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import List from '@/ui/components/List'
import { Textline } from '@/ui/components/Text'
import Warning from '@/ui/components/Warning'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

export default async function Page() {
  const t = await getTranslations('caroKann.provider')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const useCount = create(0);

const countStore = createStore(0)

function App() {
  return (
    <div>
      {/* 기본 상태를 사용하는 컴포넌트 */}
      <Counter />
      
      {/* 독립적인 상태를 가진 Provider */}
      <useCount.Provider store={countStore}>
        <Counter />
      </useCount.Provider>
    </div>
  );
}

function Counter() {
  // 각 Counter는 자신이 속한 Provider의 상태를 사용
  const [count, setCount] = useStore();
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
    </div>
  );
}`}</CodeBlock>

      <Heading.h2>{t('subtitle1')}</Heading.h2>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <List.ul>
        {(['0', '1', '2', '3'] as const).map((num) => (
          <List.item key={num}>{t.rich(`list.${num}`, codeFormatObject)}</List.item>
        ))}
      </List.ul>

      <Textline>{t('2')}</Textline>

      <Heading.h2>{t('subtitle2')}</Heading.h2>

      <Textline>{t.rich('3', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const useCount = create(logger(persist(0, { local: 'count' })));
 
const countStore = createStore(debounce(devtools(0, 'countStore')))
 
function App() {
  return (
    <div>
      {/* 기본 상태를 사용하는 컴포넌트 */}
      <Counter />
      
      {/* 독립적인 상태를 가진 Provider */}
      <useCount.Provider store={countStore}>
        <Counter />
      </useCount.Provider>
    </div>
  );
}
 
function Counter() {
  // 각 Counter는 자신이 속한 Provider의 상태를 사용
  const [count, setCount] = useStore();
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
    </div>
  );
}`}</CodeBlock>

      <Textline>{t.rich('4', codeFormatObject)}</Textline>

      <Warning>{t('5')}</Warning>

      <Textline>{t('6')}</Textline>

      <CodeBlock language="tsx">{`const useBear = create(reducer(
  (state, action: { type: 'increment' | 'decrement' }) => {
    switch (action.type) {
      case 'increment':
        return { ...state, age: state.age + 1 };
      case 'decrement':
        return { ...state, age: state.age - 1 };
      default:
        return state;
    }
  }
, logger({ name: 'useBear', age: 18, status: { count: 0 }, fn: () => console.log('fn') })));

const bearStore = createStore(devtools({ name: 'useBear', age: 18, status: { count: 0 }, fn: () => console.log('fn') }, "useBear"));

function test() {
  return (
    <useBear.Provider store={bearStore}>
      <Test1 />
      <Test2 />
    </useBear.Provider>
  )
}`}</CodeBlock>

      <Image src="/images/provider.png" width={2352} height={1016} alt="" />
    </>
  )
}
