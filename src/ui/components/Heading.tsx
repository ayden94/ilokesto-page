import React, { createElement } from 'react'

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

type HeadingProps = {
  as?: HeadingTag
  id?: string
} & React.HTMLAttributes<HTMLHeadingElement>

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/<[^>]*>/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')

const getTextFromChildren = (children: React.ReactNode) => {
  const arr = React.Children.toArray(children)
  return arr.map((c) => (typeof c === 'string' ? c : '')).join(' ')
}

const BaseHeading: React.FC<HeadingProps> = ({ as = 'h2', id, children, ...props }) => {
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

  const headingText = getTextFromChildren(children)
  const autoId = id ?? (headingText ? slugify(headingText) : undefined)

  // show anchor for headings except h1
  const showAnchor = autoId && as !== 'h1'

  // Wrap children and append anchor link that appears on hover
  const content = (
    <>
      <span className="inline">{children}</span>
      {showAnchor && (
        <a
          href={`#${autoId}`}
          aria-label="anchor"
          className="ml-2 opacity-0 group-hover:opacity-100 text-gray-400 transition-opacity"
          style={{ fontSize: 'inherit', lineHeight: 'inherit' }}
        >
          #
        </a>
      )}
    </>
  )

  return createElement(as, { id: autoId, ...props, className: `${className} group scroll-mt-24` }, content)
}

const renderForTag = (tag: HeadingTag) => {
  const defaultClasses: Record<HeadingTag, string> = {
    h1: 'text-3xl lg:text-4xl font-bold leading-tight',
    h2: 'text-2xl lg:text-3xl font-semibold leading-snug mt-10 pb-2 border-b border-gray-200 dark:border-gray-700',
    h3: 'text-1xl lg:text-2xl font-medium mt-8 mb-4',
    h4: 'text-lg font-medium',
    h5: 'text-md font-medium',
    h6: 'text-base font-medium',
  }

  const Comp: React.FC<React.HTMLAttributes<HTMLHeadingElement> & { id?: string }> = ({ children, id, ...props }) => {
    const className = [defaultClasses[tag], props.className].filter(Boolean).join(' ')

    const headingText = getTextFromChildren(children)
    const autoId = id ?? (headingText ? slugify(headingText) : undefined)
    const showAnchor = autoId && tag !== 'h1'

    const content = (
      <>
        <span className="inline">{children}</span>
        {showAnchor && (
          <a
            href={`#${autoId}`}
            aria-label="anchor"
            className="ml-2 opacity-0 group-hover:opacity-100 text-gray-400 transition-opacity"
            style={{ fontSize: 'inherit', lineHeight: 'inherit' }}
          >
            #
          </a>
        )}
      </>
    )

    return createElement(tag, { id: autoId, ...props, className: `${className} group scroll-mt-24` }, content)
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
