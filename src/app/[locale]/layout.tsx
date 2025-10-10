// app/[locale]/layout.tsx
import { createThemeScript } from 'neato/theme/script'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import './globals.css'
import { Provider } from './provider'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale as 'ko' | 'en'
  const t = await getTranslations({ locale, namespace: 'metadata' })

  return {
    title: {
      default: t('default.title'),
      template: `%s | ${t('default.title')}`,
    },
    keywords: ['React', 'TypeScript', 'State Management', 'Form Validation', 'Dialog Management', 'UI Components'],
    authors: [{ name: 'ilokesto', url: 'https://github.com/ilokesto' }],
    creator: 'ilokesto',
    publisher: 'ilokesto',
    openGraph: {
      type: 'website',
      locale: locale,
      url: 'https://ilokesto.vercel.app',
      siteName: t('default.title'),
    },
    twitter: {
      card: 'summary_large_image',
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const locale = (await params).locale
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: createThemeScript(),
          }}
        />
      </head>

      <body>
        <NextIntlClientProvider messages={messages}>
          <Provider>{children}</Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
