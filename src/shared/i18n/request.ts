// i18n/request.ts
import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

// Whitelisted loaders for each namespace. Keep this explicit so bundlers
// only include referenced files instead of trying to resolve arbitrary paths.
const messageLoaders: Record<string, (locale: string) => Promise<Record<string, unknown>>> = {
  common: (l) => import(`./messages/${l}/index.ts`).then((m) => m.default),
  sicilian: (l) => import(`./messages/${l}/sicilian.json`).then((m) => m.default),
  'caro-kann': (l) => import(`./messages/${l}/caro-kann.json`).then((m) => m.default),
  // add other namespaces as needed
}

function determineNamespacesFromPath(pathname: string) {
  // simple heuristic: map top-level segment to namespace
  // e.g. /sicilian/... -> 'sicilian', /caro-kann -> 'caro-kann'
  const parts = pathname.split('/').filter(Boolean)
  // parts[0] may be a locale (e.g., 'ko' or 'en') in app router paths
  const maybeLocale = parts[0]
  const locales = routing.locales as unknown as string[]
  let segment = parts[0]
  if (parts.length > 1 && typeof maybeLocale === 'string' && locales.includes(maybeLocale)) {
    segment = parts[1]
  }

  const namespaces: string[] = ['common']
  if (!segment) return namespaces

  // map folder names to namespace keys
  const mapping: Record<string, string> = {
    sicilian: 'sicilian',
    'caro-kann': 'caro-kann',
    // add other route -> namespace mappings here as needed
  }

  if (mapping[segment]) namespaces.push(mapping[segment])

  return namespaces
}

// export default getRequestConfig(async (params: unknown) => {
//   type ReqParams = { requestLocale: Promise<string> | string; request?: { nextUrl?: { pathname?: string } } }
//   const { requestLocale, request } = params as ReqParams
//   const requested = typeof requestLocale === 'string' ? requestLocale : await requestLocale
//   const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale

//   // Determine which namespaces to load based on the request pathname
//   const pathname = request?.nextUrl?.pathname ?? `/${locale}`
//   const namespaces = determineNamespacesFromPath(pathname)

//   // Load and merge messages from the whitelisted loaders
//   const messages: Record<string, unknown> = {}
//   for (const ns of namespaces) {
//     const loader = messageLoaders[ns]
//     if (loader) {
//       try {
//         Object.assign(messages, await loader(locale))
//       } catch (err) {
//         console.warn(`i18n: failed to load namespace ${ns} for locale ${locale}:`, err)
//       }
//     }
//   }

//   return { locale, messages }
// })

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale

  return {
    locale,
    messages: (await import(`./messages/${locale}/index.ts`)).default,
  }
})
