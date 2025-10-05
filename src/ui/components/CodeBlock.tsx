'use client'

import { useTheme } from 'neato/theme'
import { useEffect, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBlockProps {
  language: string
  children: React.ReactNode
}

export function CodeBlock({ language, children, ...props }: CodeBlockProps) {
  const codeString = String(children).replace(/\n$/, '')
  const { effectiveTheme } = useTheme()
  const style = effectiveTheme === 'dark' ? materialDark : materialLight
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString).then(() => {
      setIsCopied(true)
    })
  }

  useEffect(() => {
    if (!isCopied) return
    const timer = setTimeout(() => setIsCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [isCopied])

  const buttonStyle =
    effectiveTheme === 'dark'
      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'

  return (
    <div className="my-6 relative group">
      <button
        onClick={handleCopy}
        disabled={isCopied}
        className={`absolute top-3 right-3 p-1.5 rounded-md text-xs transition-opacity opacity-0 group-hover:opacity-100 ${
          isCopied ? '!opacity-100' : ''
        } ${buttonStyle}`}
      >
        {isCopied ? 'Copied!' : 'Copy'}
      </button>
      <SyntaxHighlighter language={language} style={style} {...props}>
        {codeString}
      </SyntaxHighlighter>
    </div>
  )
}
