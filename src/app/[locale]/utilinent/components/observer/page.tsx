import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('utilinent.observer')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>Observer</Heading.h1>
      <Textline>{t.rich('0', codeFormatObject)}</Textline>
      <CodeBlock language="tsx">{`const Observer: ForwardRefExoticComponent<{
  children?: React.ReactNode | ((isIntersecting: boolean) => React.ReactNode);
  fallback?: React.ReactNode;
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
  onIntersect?: (isIntersecting: boolean, entry: IntersectionObserverEntry) => void;
} & RefAttributes<HTMLDivElement>>`}</CodeBlock>
      <Heading.h2>{t('subtitle1')}</Heading.h2>
      <Textline>{t.rich('1', codeFormatObject)}</Textline>
      <CodeBlock language="tsx">{`import { Observer } from '@ilokesto/utilinent';

function InfiniteScrollTrigger({ onLoadMore }) {
  return (
    <Observer 
      onIntersect={(isVisible) => {
        if (isVisible) {
          onLoadMore();
        }
      }}
    >
      <Spinner />
    </Observer>
  );
}`}</CodeBlock>
      <Heading.h2>{t('subtitle2')}</Heading.h2>
      <Textline>{t.rich('2', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`function SomeSection({ productId }) {
  return (
    <>
      <Observer
        triggerOnce
        onIntersect={(isVisible) => {
          if (isVisible) {
            // 분석 이벤트 전송
            analytics.track('Product Section Viewed', { productId });
          }
        }}
      />
    </>
  );
}`}</CodeBlock>

      <Heading.h2>useIntersectionObserver</Heading.h2>
      <Textline>{t.rich('3', codeFormatObject)}</Textline>
      <CodeBlock language="tsx">{`function useIntersectionObserver(options?: {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
  initialIsIntersecting?: boolean;
  onChange?: (isIntersecting: boolean, entry: IntersectionObserverEntry) => void;
}): {
  ref: (node: HTMLElement | null) => void;
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | undefined;
};`}</CodeBlock>
    </>
  )
}
