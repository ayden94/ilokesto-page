/**
 * Normalizes a title by replacing multiple whitespace characters (including newlines)
 * with a single space and trimming the result.
 */
export function normalizeTitle(title: string): string {
  return title.replace(/\s+/g, ' ').trim()
}

/**
 * Normalizes a path by removing trailing slashes.
 */
export function normalizePath(path: string): string {
  return path ? path.replace(/\/+$/, '') : ''
}

/**
 * Generates a unique ID for a navigation item.
 * Uses href if available, otherwise creates a slug from the title.
 */
export function generateNavItemId(title: string, href?: string, parentId = ''): string {
  if (href) {
    return href
  }

  const slug = normalizeTitle(title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return parentId ? `${parentId}/${slug}` : slug
}
