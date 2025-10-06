import React from 'react'

type TableProps = React.TableHTMLAttributes<HTMLTableElement> & {
  /** Table is now children-only. Provide header/body/tr/th/td components as children. */
}

const BaseTable: React.FC<TableProps> = ({ className, ...props }) => {
  // Table is now children-only: render any children provided directly inside the table element.
  const {
    className: propsClassName,
    children,
    ...restProps
  } = props as React.TableHTMLAttributes<HTMLTableElement> & {
    children?: React.ReactNode
  }

  const tableClass = ['w-full border-collapse', propsClassName].filter(Boolean).join(' ')

  return (
    <div className={['mt-6', className].filter(Boolean).join(' ')}>
      <table {...restProps} className={tableClass}>
        {children ?? null}
      </table>
    </div>
  )
}

export type { TableProps }

// Subcomponents for manual composition
const TB: React.FC<React.TableHTMLAttributes<HTMLTableElement>> = ({ children, className, ...props }) => {
  return (
    <table {...props} className={['w-full border-collapse', className].filter(Boolean).join(' ')}>
      {children}
    </table>
  )
}

const TH: React.FC<React.ThHTMLAttributes<HTMLTableHeaderCellElement>> = ({ children, className, ...props }) => {
  const thBase =
    'text-left text-sm font-medium text-gray-700 dark:text-gray-300 pb-2 border-b border-gray-200 dark:border-gray-700'
  return (
    <th {...props} className={[thBase, className].filter(Boolean).join(' ')}>
      {children}
    </th>
  )
}

const TD: React.FC<React.TdHTMLAttributes<HTMLTableDataCellElement>> = ({ children, className, ...props }) => {
  const tdBase = 'py-3 pr-6 text-sm text-gray-600 dark:text-gray-300'
  return (
    <td {...props} className={[tdBase, className].filter(Boolean).join(' ')}>
      {children}
    </td>
  )
}

const THEAD: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({ children, className, ...props }) => {
  return (
    <thead {...props} className={[className].filter(Boolean).join(' ')}>
      {children}
    </thead>
  )
}

const TBODY: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({ children, className, ...props }) => {
  return (
    <tbody {...props} className={[className].filter(Boolean).join(' ')}>
      {children}
    </tbody>
  )
}

const ROW: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({ children, className, ...props }) => {
  return (
    <tr {...props} className={[className].filter(Boolean).join(' ')}>
      {children}
    </tr>
  )
}

// Compose default export with subcomponents
// ergonomic aliases for TB/TH/TD
const TABLE = TB
const HEADCELL = TH
const CELL = TD

const Table = Object.assign(BaseTable, {
  row: ROW,
  table: TABLE,
  headCell: HEADCELL,
  cell: CELL,
  head: THEAD,
  body: TBODY,
}) as typeof BaseTable & {
  row: typeof ROW
  table: typeof TABLE
  headCell: typeof HEADCELL
  cell: typeof CELL
  head: typeof THEAD
  body: typeof TBODY
}

export default Table
