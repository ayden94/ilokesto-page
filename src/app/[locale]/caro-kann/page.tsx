import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import { getTranslations } from 'next-intl/server'

export default async function CaroKannPage() {
  const t = await getTranslations('caroKann.introduce')

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t('description')}</Textline>

      <Heading.h2>{t('whatsNew')}</Heading.h2>
    </>
  )
}
