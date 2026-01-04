import { codeFormatter } from '@/shared/utils/code'
import { CodeBlock } from '@/ui/components/CodeBlock'
import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale as 'ko' | 'en'
  const t = await getTranslations({ locale, namespace: 'metadata.utilinent' })
  return {
    title: t('core'),
    description: t('core'),
  }
}

export default async function Page() {
  const t = await getTranslations('utilinent.createProxy')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>createProxy</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`function createProxy<TProxy extends object, TBase extends object = TProxy>(
  base: TBase,
  renderForTag: (tag: any) => React.ForwardRefExoticComponent<any>,
  category: RegistryCategory
): TProxy;`}</CodeBlock>

      <Heading.h2>{t('subtitle1')}</Heading.h2>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`import { ComponentPropsWithRef, createElement, forwardRef } from "react";
import { createProxy, BaseTypeHelperFn, ProxyType } from "@ilokesto/utilinent";

export type ClickableProps = {
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
  children?: React.ReactNode;
};

type BaseClickableType<X = object> = {
  (props: X & ClickableProps): React.ReactNode;
};

const BaseClickable: BaseClickableType = ({ onClick, disabled, children }) => {
  return (
    <button type="button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};`}</CodeBlock>

      <Textline>{t.rich('1a', codeFormatObject)}</Textline>

      <Heading.h2>{t('subtitle2')}</Heading.h2>

      <Textline>{t.rich('2', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`const renderForTag =
  (tag: any) =>
  forwardRef(function Render(
    { onClick, disabled, children, ...props }: ClickableProps & ComponentPropsWithRef<any>,
    ref: any
  ) {
    return createElement(
      tag,
      { ...props, ref, onClick, "aria-disabled": disabled ? true : undefined },
      children
    );
  });

interface BaseClickableFn extends BaseTypeHelperFn {
  type: BaseClickableType<this["props"]>;
}

export type ClickableType = ProxyType<BaseClickableFn, "clickable">;

export const Clickable: ClickableType = createProxy(BaseClickable, renderForTag, "clickable");`}</CodeBlock>

      <Textline>{t.rich('2a', codeFormatObject)}</Textline>

      <Heading.h2>{t('subtitle3')}</Heading.h2>

      <Textline>{t.rich('3', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`import { PluginManager } from "@ilokesto/utilinent";
import Link from "./Link";

PluginManager.register({
  clickable: {
    Link,
  },
});

declare module "@ilokesto/utilinent" {
  interface UtilinentRegister {
    clickable: {
      Link: typeof Link;
    };
  }
}`}</CodeBlock>

      <Heading.h2>{t('subtitle4')}</Heading.h2>

      <Textline>{t.rich('4', codeFormatObject)}</Textline>

      <CodeBlock language="tsx">{`<Clickable onClick={() => console.log("click")}>Default button</Clickable>
<Clickable.div onClick={() => console.log("click")}>Div wrapper</Clickable.div>
<Clickable.Link href="/docs">Custom Link</Clickable.Link>`}</CodeBlock>
    </>
  )
}
