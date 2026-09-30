// Generuje public/sitemap.xml ze seznamu veřejných stránek. Spouští se před každým buildem
// (npm skript "prebuild"); vygenerovaný soubor se commituje.
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'node:path'

// Musí odpovídat SITE_ORIGIN v src/seo.ts (skript nemůže importovat TypeScript)
const ORIGIN = 'https://www.mlynachmel.cz'
// Veřejné stránky (shodné s routami v src/App.tsx)
export const STATIC_PATHS = ['/', '/restaurace', '/pivovar', '/kontakt']

export function buildSitemap({ origin, paths, today }) {
  const urls = paths.map((p) => `  <url>\n    <loc>${origin}${p}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

// Spuštění z příkazové řádky
if (process.argv[1] && resolve(fileURLToPath(import.meta.url)) === resolve(process.argv[1])) {
  const root = join(dirname(fileURLToPath(import.meta.url)), '..')
  const xml = buildSitemap({ origin: ORIGIN, paths: STATIC_PATHS, today: new Date().toISOString().slice(0, 10) })
  writeFileSync(join(root, 'public', 'sitemap.xml'), xml)
  console.log(`sitemap.xml: ${xml.match(/<url>/g).length} URL`)
}
