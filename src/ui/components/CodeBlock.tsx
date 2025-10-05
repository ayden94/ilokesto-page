'use client'

import { useTheme } from 'neato/theme'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBlockProps {
  language: string
  children: React.ReactNode
}

export function CodeBlock({ language, children, ...props }: CodeBlockProps) {
  const codeString = String(children).replace(/\n$/, '')
  const { effectiveTheme } = useTheme()
  const style = effectiveTheme === 'dark' ? oneDark : oneLight

  return (
    <div className="my-6">
      <SyntaxHighlighter language={language} style={style} {...props}>
        {codeString}
      </SyntaxHighlighter>
    </div>
  )
}
