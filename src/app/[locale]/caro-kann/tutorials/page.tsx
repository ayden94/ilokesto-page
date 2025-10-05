import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import List from '@/ui/components/List'
import { Textline } from '@/ui/components/Text'
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('caroKann.tutorials')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t.rich('description', codeFormatObject)}</Textline>

      <Heading.h2>{t('createStore.title')}</Heading.h2>

      <Textline>{t('createStore.0')}</Textline>

      <CodeBlock filename="types/product.ts" language="ts">
        {`export type Product = {
  id: string
  name: string
  price: number
  imageUrl?: string
  description?: string
}`}
      </CodeBlock>

      <Textline>{t.rich('createStore.1', codeFormatObject)}</Textline>

      <CodeBlock filename="store/cart.ts" language="tsx">
        {`import { create } from 'caro-kann'
import { Product } from '../types/product'

export const useCart = create<Array<Product>>([])`}
      </CodeBlock>

      <Heading.h2>{t('useCart.title')}</Heading.h2>

      <Textline>{t.rich('useCart.0', codeFormatObject)}</Textline>

      <CodeBlock filename="components/ProductBinder.tsx" language="tsx">
        {`function ProductBinder({ productList }: { productList: Array<Product> }) {
  const [cart, setCart] = useCart()

  return (
    <>
      {productList.map((product) => (
        <ProductCard key={product.id}>
          {product.imageUrl && <ProductCard.Image image={product.imageUrl} />}
          <ProductCard.Title name={product.name} />
          <ProductCard.Description description={product.description} />
          <ProductCard.Price price={product.price} />
          <button onClick={() => setCart((prev) => [...prev, product])}>Add to Cart</button>
        </ProductCard>
      ))}
    </>
  )
}`}
      </CodeBlock>

      <Textline>{t.rich('useCart.1', codeFormatObject)}</Textline>

      <CodeBlock filename="components/ProductBinder.tsx" language="tsx">
        {`const [cart, setCart] = useCart()`}
      </CodeBlock>

      <Textline>{t.rich('useCart.2', codeFormatObject)}</Textline>

      <CodeBlock filename="components/ProductBinder.tsx" language="tsx">
        {`function ProductBinder({ product }: { product: Product }) {
  const setCart = useCart.writeOnly()

  return (
    <>
      {productList.map(product => (
        <ProductCard key={product.id}>
          {product.imageUrl && <ProductCard.Image image={product.imageUrl}>}
          <ProductCard.Title name={product.name}>
          <ProductCard.Description description={product.description}>
          <ProductCard.Price price={product.price}>
          <button onClick={() => setCart(prev => [...prev, product])}>Add to Cart</button>
        </ProductCard>
      ))}
    </>
  )
}`}
      </CodeBlock>

      <Textline>{t.rich('useCart.3', codeFormatObject)}</Textline>

      <Heading.h2>{t('readOnly.title')}</Heading.h2>

      <Textline>{t.rich('readOnly.0', codeFormatObject)}</Textline>

      <CodeBlock filename="components/Header.tsx" language="tsx">
        {`function Header() {
  const cartLength = useCart.readOnly(store => store.length)
 
  return (
    <header>
      <Menu />
 
      <Logo />
 
      <Link href="/cart">
        <div className="cart">
          <Image src="/cart.svg" alt="cart" width={24} height={24} />
          {cartLength !== 0 && <span className="cart-count">{cartLength}</span>}
        </div>
      </Link>
    </header>
  )
}`}
      </CodeBlock>

      <Textline>{t.rich('readOnly.1', codeFormatObject)}</Textline>

      <List.ol>
        {(['0', '1', '2'] as const).map((num) => (
          <List.item key={num}>{t.rich(`readOnly.list.${num}`, codeFormatObject)}</List.item>
        ))}
      </List.ol>

      <Textline>{t.rich('readOnly.2', codeFormatObject)}</Textline>

      <Heading.h2>{t('cartPage.title')}</Heading.h2>

      <Textline>{t.rich('cartPage.0', codeFormatObject)}</Textline>

      <List.ul>
        {(['0', '1'] as const).map((num) => (
          <List.item key={num}>{t.rich(`cartPage.list.${num}`, codeFormatObject)}</List.item>
        ))}
      </List.ul>

      <CodeBlock filename="app/[locale]/cart/page.tsx" language="tsx">
        {`function Cart() {
  const [cartData, setCart] = useCart(store => ({
    items: store, // 장바구니 아이템 배열 전체
    priceTotal: store.reduce((sum, product) => sum + product.price, 0) // 각 product의 price를 합산
  }));

  return (
    <>
      {cartData.items.map(product => (
        <ProductCard key={product.id}>
          {product.imageUrl && <ProductCard.Image image={product.imageUrl}>}
          <ProductCard.Title name={product.name}>
          <ProductCard.Description description={product.description}>
          <ProductCard.Price price={product.price}>
          <button onClick={() => setCart(prev => prev.filter(item => item.id !== product.id))}>Remove from Cart</button>
        </ProductCard>
      ))}
      <div>
        {/* priceTotal을 직접 사용 */}
        <strong>총액: \${cartData.priceTotal.toFixed(2)}</strong>
      </div>
      <button onClick={() => setCart([] as Array<Product>)}>장바구니 비우기</button>
    </>
  )
}`}
      </CodeBlock>
    </>
  )
}
