import { codeFormatter } from '@/shared/utils/code'
import { Heading } from '@/ui/components/Heading'
import { Textline } from '@/ui/components/Text'
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('sicilian.guides.validate')
  const codeFormatObject = codeFormatter()

  return (
    <>
      <Heading.h1>{t('title')}</Heading.h1>

      <Textline>{t.rich('0', codeFormatObject)}</Textline>

      <Heading.h2>validator and validate</Heading.h2>

      <Textline>{t.rich('1', codeFormatObject)}</Textline>

      <Textline>{t.rich('2', codeFormatObject)}</Textline>

      <Heading.h3>required</Heading.h3>

      <Textline>{t.rich('3', codeFormatObject)}</Textline>

      <Heading.h3>minLength and maxLength</Heading.h3>

      <Textline>{t.rich('4', codeFormatObject)}</Textline>

      <Heading.h3>checked</Heading.h3>

      <Textline>{t.rich('5', codeFormatObject)}</Textline>

      <Heading.h3>RegExp and custom</Heading.h3>

      <Textline>{t.rich('6', codeFormatObject)}</Textline>

      <Textline>{t.rich('7', codeFormatObject)}</Textline>

      <Textline>{t.rich('8', codeFormatObject)}</Textline>

      <Heading.h2>validateOptions</Heading.h2>

      <Textline>{t.rich('9', codeFormatObject)}</Textline>

      <Heading.h2>{t('subtitle')}</Heading.h2>

      <Textline>{t.rich('10', codeFormatObject)}</Textline>

      <Textline>{t.rich('11', codeFormatObject)}</Textline>
    </>
  )
}
