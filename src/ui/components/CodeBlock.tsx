'use client'

import { useTheme } from 'neato/theme'
import { useEffect, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { CheckIcon } from './icons/CheckIcon'
import { CopyIcon } from './icons/CopyIcon'

interface CodeBlockProps {
  language: string
  children: React.ReactNode
}

export function CodeBlock({ language, children, ...props }: CodeBlockProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

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
    <div className="relative my-6">
      <button
        onClick={handleCopy}
        disabled={isCopied}
        className={`absolute top-3 right-3 p-2 rounded-lg ${buttonStyle}`}
      >
        {isCopied ? <CheckIcon className="w-4 h-4 text-green-500" /> : <CopyIcon className="w-4 h-4" />}
      </button>
      <SyntaxHighlighter
        language={language}
        style={style}
        className={`rounded-lg text-sm ${!mounted ? 'invisible' : ''}`}
        showLineNumbers
        lineNumberStyle={{ opacity: 0.6, userSelect: 'none' }}
        {...props}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  )
}
