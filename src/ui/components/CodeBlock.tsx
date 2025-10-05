'use client'

import { useTheme } from 'neato/theme'
import { useEffect, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { CheckIcon } from './icons/CheckIcon'
import { CopyIcon } from './icons/CopyIcon'
import { FileIcon } from './icons/FileIcon'

interface CodeBlockProps {
  language: string
  children: React.ReactNode
  filename?: string
}

export function CodeBlock({ language, children, filename, ...props }: CodeBlockProps) {
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

  if (!mounted) {
    return (
      <div className="my-6" style={{ visibility: mounted ? 'visible' : 'hidden' }}>
        {filename && (
          <div className="flex items-center gap-2 px-4 py-2 text-xs text-gray-600 bg-gray-200 rounded-t-md">
            <FileIcon className="w-3 h-3" />
            <span>{filename}</span>
          </div>
        )}
        <div className="relative">
          <button
            disabled
            className="absolute p-2 text-gray-400 bg-gray-200 rounded-lg cursor-not-allowed top-3 right-3"
          >
            <CopyIcon className="w-4 h-4" />
          </button>
          <pre
            style={{
              padding: '1rem',
              backgroundColor: '#f6f8fa',
              ...(filename && {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                marginTop: 0,
              }),
            }}
          >
            <code>{codeString}</code>
          </pre>
        </div>
      </div>
    )
  }

  return (
    <div className="my-6">
      {filename && (
        <div className="flex items-center gap-2 px-4 py-2 text-xs text-gray-300 bg-gray-800 rounded-t-md">
          <FileIcon className="w-3 h-3" />
          <span>{filename}</span>
        </div>
      )}
      <div className="relative">
        <button
          onClick={handleCopy}
          disabled={isCopied}
          className={`absolute top-3 right-3 p-2 rounded-lg z-10 ${buttonStyle}`}
        >
          {isCopied ? <CheckIcon className="w-4 h-4 text-green-500" /> : <CopyIcon className="w-4 h-4" />}
        </button>
        <SyntaxHighlighter
          language={language}
          style={style}
          showLineNumbers
          lineNumberStyle={{ opacity: 0.6, userSelect: 'none' }}
          customStyle={{
            ...(filename && {
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              marginTop: 0,
            }),
          }}
          {...props}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
