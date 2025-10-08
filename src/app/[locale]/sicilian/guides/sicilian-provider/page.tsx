import { codeFormatter } from '@/shared/utils/code'
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('sicilian')
  const codeFormatObject = codeFormatter()

  return <></>
}
