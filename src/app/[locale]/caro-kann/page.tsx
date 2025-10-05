import { getTranslations } from 'next-intl/server'

export default async function CaroKannPage() {
  const t = await getTranslations('caroKann')

  return (
    <>
      <h1>{t('introduce.title')}</h1>
      <p>{t('introduce.description')}</p>
    </>
  )
}
