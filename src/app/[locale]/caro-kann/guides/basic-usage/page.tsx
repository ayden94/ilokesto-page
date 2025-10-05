import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('caroKann.basic-usage')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const useStore = create({
  email: "wpfekdml@me.com",
  name: "Ayden Blair",
  phoneNumber: "010-****-****",
  age: 30,
});

function ProfileCard() {
  const [value, setValue] = useStore();
  
  return (
    <div class={style.root}>
      <div>name: {value.name}</div>
      <div>
        <div>email: {value.email}</div>
        <div>phone: {value.phoneNumber}</div>
      </div>
    </div>
  )
}`}</CodeBlock>

      <Heading.h2>{t('subtitle1')}</Heading.h2>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const useStore = create({
  email: "wpfekdml@me.com",
  name: "Ayden Blair",
  phoneNumber: "010-****-****",
  age: 30,
});

function ProfileCard() {
  const [value, setValue] = useStore(store => ({
    email: store.email,
    name: store.name,
    phoneNumber: store.phoneNumber,
  }));
  
  return (
    <div class={style.root}>
      <div>name: {value.name}</div>
      <div>
        <div>email: {value.email}</div>
        <div>phone: {value.phoneNumber}</div>
      </div>
    </div>
  )
}`}</CodeBlock>

      <Heading.h2>{t('subtitle2')}</Heading.h2>

      <Textline>{t.rich('2', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`export const useCart = create<Array<Product>>([])

function Cart() {
  const [value, setValue] useCart(prev => {
    store: prev,
    totalPrice: prev.reduce((sum, item) => sum + item.price, 0)
  })

  return (
    <div>
      {value.store.map( ... )}
      <h3>장바구니 합계: {value.totalPrice}원</h3>
    </div>
  )
}`}</CodeBlock>

      <Heading.h2>{t('subtitle3')}</Heading.h2>

      <Textline>{t.rich('3', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const useStore = create({
  email: "wpfekdml@me.com",
  name: "Ayden Blair",
  phoneNumber: "010-****-****",
  age: 30,
});

function ProfileCard() {
  const value = useStore.readOnly(store => ({
    email: store.email,
    name: store.name,
    phoneNumber: store.phoneNumber,
  }));
  
  return (
    <div class={style.root}>
      <div>name: {value.name}</div>
      <div>
        <div>email: {value.email}</div>
        <div>phone: {value.phoneNumber}</div>
      </div>
    </div>
  )
}`}</CodeBlock>
    </>
  )
}
