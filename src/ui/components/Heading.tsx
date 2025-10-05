import React, { createElement } from 'react'

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

type HeadingProps = {
  as?: HeadingTag
} & React.HTMLAttributes<HTMLHeadingElement>

const BaseHeading: React.FC<HeadingProps> = ({ as = 'h2', children, ...props }) => {
  const defaultClasses: Record<HeadingTag, string> = {
    h1: 'text-4xl lg:text-5xl font-extrabold leading-tight',
    h2: 'text-3xl lg:text-4xl font-bold leading-snug',
    h3: 'text-2xl lg:text-3xl font-semibold',
    h4: 'text-xl font-medium',
    h5: 'text-lg font-medium',
    h6: 'text-base font-medium',
  }

  const defaultClass = defaultClasses[as]
  const className = [defaultClass, props.className].filter(Boolean).join(' ')

  return createElement(as, { ...props, className }, children)
}

const renderForTag = (tag: HeadingTag) => {
  const defaultClasses: Record<HeadingTag, string> = {
    h1: 'text-3xl lg:text-4xl font-bold leading-tight',
    h2: 'text-2xl lg:text-3xl font-semibold leading-snug mt-10 pb-2 border-b border-gray-200 dark:border-gray-700',
    h3: 'text-1xl lg:text-2xl font-medium',
    h4: 'text-lg font-medium',
    h5: 'text-md font-medium',
    h6: 'text-base font-medium',
  }

  const Comp: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children, ...props }) => {
    const className = [defaultClasses[tag], props.className].filter(Boolean).join(' ')
    return createElement(tag, { ...props, className }, children)
  }

  Comp.displayName = `Heading.${tag}`
  return Comp
}

const tagEntries = (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as HeadingTag[]).reduce((acc, tag) => {
  acc[tag] = renderForTag(tag)
  return acc
}, {} as Record<HeadingTag, React.FC<React.HTMLAttributes<HTMLHeadingElement>>>)

export const Heading = Object.assign(BaseHeading, tagEntries) as typeof BaseHeading &
  Record<HeadingTag, React.FC<React.HTMLAttributes<HTMLHeadingElement>>>
