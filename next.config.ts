// next.config.ts
import { NextConfig } from 'next'

import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  viewTransition: true,
}

const withNextIntl = createNextIntlPlugin('./src/shared/i18n/request.ts')
export default withNextIntl(nextConfig)
