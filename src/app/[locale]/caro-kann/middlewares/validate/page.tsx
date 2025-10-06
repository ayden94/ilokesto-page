import { codeFormatter } from '@/shared/utils/code'
import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

export default async function Page() {
  const t = await getTranslations('caroKann.middlewares.validate')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>validate</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <Textline>
        {t.rich('1', {
          ...codeFormatObject,
          a: (chunk) => (
            <Link className="link" href="/common-resolver">
              {chunk}
            </Link>
          ),
        })}
      </Textline>
    </>
  )
}
