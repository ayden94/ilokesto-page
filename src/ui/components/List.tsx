import React, { cloneElement, createElement, isValidElement } from 'react'

type ListTag = 'ul' | 'ol'

type LiSize = 'xs' | 'sm' | 'base' | 'lg'

type ListProps = React.HTMLAttributes<HTMLUListElement> & {
  children: React.ReactNode
  /** 클래스 이름을 직접 지정하고 싶을 때 사용 */
  liClassName?: string
  /** 간단한 사이즈 키로 li 폰트 크기를 지정할 수 있음 */
  liSize?: LiSize
}

const defaultClasses: Record<ListTag, string> = {
  // 기본 리스트 스타일과 중첩 리스트에 적용할 Tailwind 유틸리티
  // Tailwind JIT의 arbitrary selector를 이용해 `li > ul` / `li > ol`에 스타일을 적용합니다.
  ul: 'mt-6 list-disc pl-6 space-y-2 [&>li>ul]:list-disc [&>li>ul]:pl-6 [&>li>ul]:mt-2 [&>li>ul]:text-sm [&>li>ul]:marker:text-sm [&>li>ol]:list-decimal [&>li>ol]:pl-6',
  ol: 'mt-6 list-decimal pl-6 space-y-2 [&>li>ul]:list-disc [&>li>ul]:pl-6 [&>li>ul]:mt-2 [&>li>ul]:text-sm [&>li>ul]:marker:text-sm [&>li>ol]:list-decimal [&>li>ol]:pl-6',
}

const liSizeClasses: Record<LiSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  // 기본값: 보통 글꼴 굵기, 기본 크기와 줄높이 8, list-item 표시
  base: 'font-normal text-base leading-6 list-item break-keep',
  lg: 'text-lg',
}

const renderForTag = (tag: ListTag) => {
  const Comp: React.FC<ListProps> = ({ children, liClassName, liSize = 'base', ...props }) => {
    const className = [defaultClasses[tag], props.className].filter(Boolean).join(' ')

    // li에 적용할 클래스: 사이즈 매핑 + 사용자 liClassName
    const appliedLiClass = [liSizeClasses[liSize], liClassName].filter(Boolean).join(' ')

    // 직접적인 <li> 자식에 대해 className을 주입합니다.
    const mappedChildren = React.Children.map(children, (child) => {
      if (isValidElement(child) && child.type === 'li') {
        const liEl = child as React.ReactElement<React.LiHTMLAttributes<HTMLLIElement>, 'li'>
        const existing = (liEl.props.className as string) || ''
        const merged = [appliedLiClass, existing].filter(Boolean).join(' ')
        return cloneElement(liEl, { className: merged } as Partial<React.LiHTMLAttributes<HTMLLIElement>>)
      }
      return child
    })

    return createElement(tag, { ...props, className }, mappedChildren)
  }
  Comp.displayName = `List.${tag}`
  return Comp
}

const item: React.FC<React.LiHTMLAttributes<HTMLLIElement> & { size?: LiSize }> = ({
  children,
  className,
  size = 'base',
  ...props
}) => {
  const applied = [liSizeClasses[size], className].filter(Boolean).join(' ')
  return createElement('li', { ...props, className: applied }, children)
}
item.displayName = 'List.item'

const List = {
  ul: renderForTag('ul'),
  ol: renderForTag('ol'),
  item,
}

export default List

export type { ListProps }
