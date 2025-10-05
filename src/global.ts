// src/global.ts
import { routing } from '@/shared/i18n'
import koMessages from '@/shared/i18n/messages/ko'
import { Formats } from 'next-intl'

export const formats = {
  dateTime: {
    short: {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    },
  },
  number: {
    precise: {
      maximumFractionDigits: 5,
    },
  },
  list: {
    enumeration: {
      style: 'long',
      type: 'conjunction',
    },
  },
} satisfies Formats

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number]
    Messages: typeof koMessages
    Formats: typeof formats
  }
}
