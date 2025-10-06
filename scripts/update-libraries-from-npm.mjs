#!/usr/bin/env node
/**
 * scripts/update-libraries-from-npm.mjs
 *
 * - 조회: npm registry (https://registry.npmjs.org/<package>)
 * - 생성: libraries 배열을 페이지 파일에 덮어씀
 * - 사용: node scripts/update-libraries-from-npm.mjs [--dry]
#!/usr/bin/env node
/**
 * scripts/update-libraries-from-npm.mjs
 *
 * Simple script: query npm registry for each library and write results to
 * `src/shared/data/npm-latest.json` so the app can import it.
 * Usage: node scripts/update-libraries-from-npm.mjs [--dry]
 */
import fs from 'fs'
import https from 'https'
import path from 'path'

const dryRun = process.argv.includes('--dry')
const workspace = process.cwd()

const candidates = {
  'caro-kann': ['@ilokesto/caro-kann', 'caro-kann'],
  sicilian: ['@ilokesto/sicilian', 'sicilian'],
  grunfeld: ['@ilokesto/grunfeld', 'grunfeld'],
  utilinent: ['@ilokesto/utilinent', 'utilinent'],
  'common-resolver': ['@ilokesto/common-resolver', 'common-resolver'],
  'path-codegen': ['@ilokesto/path-codegen', 'path-codegen'],
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { Accept: 'application/json' } }, (res) => {
        if (res.statusCode >= 400) return reject(new Error(`HTTP ${res.statusCode}`))
        let d = ''
        res.on('data', (c) => (d += c))
        res.on('end', () => {
          try {
            resolve(JSON.parse(d))
          } catch (e) {
            reject(e)
          }
        })
      })
      .on('error', reject)
  })
}

async function findLatest(cands) {
  for (const pkg of cands) {
    try {
      const url = `https://registry.npmjs.org/${encodeURIComponent(pkg)}`
      const json = await fetchJson(url)
      const latest = json['dist-tags'] && json['dist-tags'].latest
      if (latest) return { package: pkg, version: latest }
      const versions = Object.keys(json.versions || {})
      if (versions.length) return { package: pkg, version: versions[versions.length - 1] }
    } catch (e) {
      // try next
    }
  }
  return { package: null, version: null }
}

async function main() {
  const results = {}
  for (const key of Object.keys(candidates)) {
    process.stdout.write(`Checking ${key}... `)
    const meta = await findLatest(candidates[key])
    results[key] = meta
    console.log(`${meta.package || 'NOT FOUND'}@${meta.version || 'n/a'}`)
  }

  const outDir = path.join(workspace, 'src/shared/data')
  fs.mkdirSync(outDir, { recursive: true })
  const outPath = path.join(outDir, 'npm-latest.json')

  if (dryRun) {
    console.log('\n--- DRY RUN: npm latest results (would write) ---\n')
    console.log(JSON.stringify(results, null, 2))
    console.log('\nWould write to:', outPath)
    return
  }

  fs.writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf8')
  console.log('Wrote', outPath)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
