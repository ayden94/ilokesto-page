import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
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
    </>
  )
}
