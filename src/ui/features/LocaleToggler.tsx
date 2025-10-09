'use client'

import { Link, usePathname } from '@/shared/i18n'
import { useLocale } from 'next-intl'

export function LocaleToggler() {
  const pathname = usePathname()
  const currentLocale = useLocale()
  const nextLocale = currentLocale === 'en' ? 'ko' : 'en'

  return (
    <Link href={pathname} className="text-xl/5" locale={nextLocale} scroll={false} replace>
      {currentLocale.toUpperCase()}
    </Link>
  )
}
