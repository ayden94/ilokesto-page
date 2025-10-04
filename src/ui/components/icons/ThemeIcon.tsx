'use client'

import { motion } from 'framer-motion'
import { SVGProps, useEffect, useState } from 'react'

interface ThemeIconProps extends SVGProps<SVGSVGElement> {
  theme: 'light' | 'dark'
}

export function ThemeIcon({ theme, ...props }: ThemeIconProps) {
  const isLight = theme === 'light'
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* 태양 중심 원 */}
      <motion.circle
        cx="12"
        cy="12"
        r="5"
        stroke="orange"
        initial={{
          scale: isLight ? 1 : 0,
          opacity: isLight ? 1 : 0,
          fill: isLight ? 'orange' : 'transparent',
        }}
        animate={{
          scale: isLight ? 1 : 0,
          opacity: isLight ? 1 : 0,
          fill: isLight ? 'orange' : 'transparent',
        }}
        transition={{
          duration: mounted ? 0.4 : 0,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      />

      {/* 태양 광선들 */}
      {[
        { x1: 12, y1: 1, x2: 12, y2: 3 }, // 위
        { x1: 12, y1: 21, x2: 12, y2: 23 }, // 아래
        { x1: 4.22, y1: 4.22, x2: 5.64, y2: 5.64 }, // 왼쪽 위
        { x1: 18.36, y1: 18.36, x2: 19.78, y2: 19.78 }, // 오른쪽 아래
        { x1: 1, y1: 12, x2: 3, y2: 12 }, // 왼쪽
        { x1: 21, y1: 12, x2: 23, y2: 12 }, // 오른쪽
        { x1: 4.22, y1: 19.78, x2: 5.64, y2: 18.36 }, // 왼쪽 아래
        { x1: 18.36, y1: 5.64, x2: 19.78, y2: 4.22 }, // 오른쪽 위
      ].map((line, i) => (
        <motion.line
          key={`ray-${i}`}
          {...line}
          stroke="orange"
          initial={{
            opacity: isLight ? 1 : 0,
            scale: isLight ? 1 : 0.5,
            rotate: isLight ? 0 : 45,
          }}
          animate={{
            opacity: isLight ? 1 : 0,
            scale: isLight ? 1 : 0.5,
            rotate: isLight ? 0 : 45,
          }}
          transition={{
            duration: mounted ? 0.4 : 0,
            ease: [0.34, 1.56, 0.64, 1],
            delay: mounted && isLight ? i * 0.03 : 0,
          }}
          style={{
            originX: '12px',
            originY: '12px',
          }}
        />
      ))}

      {/* 달 */}
      <motion.path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        stroke="royalblue"
        initial={{
          scale: isLight ? 0 : 1,
          opacity: isLight ? 0 : 1,
          rotate: isLight ? -30 : 0,
          fill: isLight ? 'transparent' : 'royalblue',
        }}
        animate={{
          scale: isLight ? 0 : 1,
          opacity: isLight ? 0 : 1,
          rotate: isLight ? -30 : 0,
          fill: isLight ? 'transparent' : 'royalblue',
        }}
        transition={{
          duration: mounted ? 0.4 : 0,
          ease: [0.34, 1.56, 0.64, 1],
        }}
        style={{
          originX: '12px',
          originY: '12px',
        }}
      />
    </svg>
  )
}
