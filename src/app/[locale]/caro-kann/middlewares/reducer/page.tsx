import { codeFormatter } from '@/shared/utils/code'
import { Heading } from '@/ui/components/Heading'
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('caroKann.middlewares')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>reducer</Heading.h1>
    </>
  )
}
