import Heading from '@/ui/components/Heading'
import { getTranslations } from 'next-intl/server'

export default async function CaroKannPage() {
  const t = await getTranslations('caroKann')

  return (
    <>
      <Heading.h1>{t('introduce.title')}</Heading.h1>
      <p>{t('introduce.description')}</p>
    </>
  )
}
