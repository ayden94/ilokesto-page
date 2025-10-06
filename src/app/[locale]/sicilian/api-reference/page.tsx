import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('sicilian.api')

  return (
    <>
      <Heading.h1>API Reference</Heading.h1>

      <Textline>{t('0')}</Textline>
    </>
  )
}
