import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale as 'ko' | 'en'
  const t = await getTranslations({ locale, namespace: 'metadata.sicilian' })
  return { title: t('apiReference'), description: t('apiReference') }
}

export default async function Page() {
  const t = await getTranslations('sicilian.api')

  return (
    <>
      <Heading.h1>API Reference</Heading.h1>

      <Textline>{t('0')}</Textline>
    </>
  )
}
