// SEO texty stránek – titulky, popisky a údaje o provozovně pro strukturovaná data.
// Vše pro SEO je jen ve frontendu (nezávisle na hostingu): značky do <head> zapisuje
// components/Seo.tsx, statické výchozí hodnoty pro roboty bez JS jsou v index.html.
import content from '@/content/content'

// Kanonická adresa webu – DOČASNÁ, před spuštěním potvrdit (www vs. bez www).
// Stejná hodnota je i v index.html (og:image), public/robots.txt a scripts/generate-sitemap.mjs.
export const SITE_ORIGIN = 'https://www.mlynachmel.cz'
export const BRAND = content.brand.name
export const TITLE_SEPARATOR = ' – '
// Výchozí obrázek pro sdílení (1200 × 630)
export const DEFAULT_OG_IMAGE = '/images/og_default.jpg'
// Titulek domovské stránky za názvem značky
const HOME_TITLE = 'Sezemický pivovar a restaurace'

export interface SeoMeta {
  // Bez značky; prázdné = značka + výchozí titulek domovské stránky
  title?: string
  // Cca 120–160 znaků
  description: string
}

// Stránky podle cesty
export const SEO = {
  '/': {
    description:
      'Mlýn a chmel – řemeslný pivovar a restaurace v historickém mlýně v Sezemicích u Pardubic. Čerstvě uvařené pivo, domácí kuchyně a polední menu.',
  },
  '/restaurace': {
    title: 'Restaurace',
    description:
      'Restaurace Mlýn a chmel v Sezemicích – domácí kuchyně, polední a stálé menu. Rezervace a pronájem na tel. +420 607 13 12 12.',
  },
  '/pivovar': {
    title: 'Řemeslný pivovar',
    description:
      'Sezemický řemeslný pivovar Mlýn a chmel – piva vařená v historickém mlýně v Sezemicích. Podívejte se na aktuální nabídku piva.',
  },
  '/kontakt': {
    title: 'Kontakt',
    description:
      'Kontakt a otevírací doba pivovaru a restaurace Mlýn a chmel, Tyršovo náměstí 12, Sezemice. Rezervace: +420 607 13 12 12, info@mlynachmel.cz.',
  },
} satisfies Record<string, SeoMeta>

// Celý titulek stránky: "Mlýn a chmel – Kontakt"
export const formatTitle = (title?: string) => `${BRAND}${TITLE_SEPARATOR}${title ?? HOME_TITLE}`

// Údaje provozovny pro JSON-LD (odpovídají content.kontakt)
export const LOCAL_BUSINESS = {
  name: 'Mlýn a chmel – Sezemický pivovar a restaurace',
  legalName: 'Mlýn a chmel s.r.o.',
  street: 'Tyršovo náměstí 12',
  city: 'Sezemice',
  postalCode: '533 04',
  region: 'Pardubický kraj',
  cuisine: 'Česká kuchyně',
} as const

// Strukturovaná data provozovny (schema.org). Otevírací doba záměrně chybí – v obsahu je
// zatím placeholder 00:00; po doplnění skutečné doby přidat openingHoursSpecification.
export const localBusinessJsonLd = (): Record<string, unknown> => ({
  '@type': ['Restaurant', 'Brewery'],
  '@id': `${SITE_ORIGIN}/#business`,
  name: LOCAL_BUSINESS.name,
  legalName: LOCAL_BUSINESS.legalName,
  url: SITE_ORIGIN,
  logo: `${SITE_ORIGIN}/icons/apple_touch_icon.png`,
  image: `${SITE_ORIGIN}${DEFAULT_OG_IMAGE}`,
  telephone: content.kontakt.reservation.phone,
  email: content.kontakt.reservation.email,
  servesCuisine: LOCAL_BUSINESS.cuisine,
  address: {
    '@type': 'PostalAddress',
    streetAddress: LOCAL_BUSINESS.street,
    addressLocality: LOCAL_BUSINESS.city,
    postalCode: LOCAL_BUSINESS.postalCode,
    addressRegion: LOCAL_BUSINESS.region,
    addressCountry: 'CZ',
  },
})
