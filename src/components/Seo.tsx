import { useEffect } from 'react'
import { DEFAULT_OG_IMAGE, SITE_ORIGIN, formatTitle } from '@/seo'

// SEO hlavička stránky: titulek, popis, canonical, Open Graph a Twitter značky.
// React 18 značky do <head> sám nepřesouvá, proto je komponenta zapisuje v efektu přímo
// do document.head (vytvoří je, nebo přepíše existující). Nic nevykresluje.
// Použití: <Seo path="/kontakt" title={SEO['/kontakt'].title} description={SEO['/kontakt'].description} />
interface SeoProps {
  // Cesta bez originu, např. /kontakt
  path: string
  // Bez značky; prázdné = titulek domovské stránky
  title?: string
  description: string
  ogImage?: string
  // Stránky, které se nemají indexovat
  noindex?: boolean
}

// Značky spravované komponentou mají atribut data-seo
const MANAGED = 'data-seo'

// Vytvoří nebo přepíše <meta name|property="key" content="…">
function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    el.setAttribute(MANAGED, '')
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

// Vytvoří nebo přepíše <link rel="canonical">
function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    el.setAttribute(MANAGED, '')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export default function Seo({ path, title, description, ogImage = DEFAULT_OG_IMAGE, noindex = false }: SeoProps) {
  const fullTitle = formatTitle(title)
  const url = SITE_ORIGIN + path
  const image = SITE_ORIGIN + ogImage

  // Statické značky v index.html sloužily robotům bez JS; po naskočení Reactu je nahradí
  // značky zapsané níže (jinak by byly v hlavičce dvakrát)
  useEffect(() => {
    document.head.querySelectorAll('[data-seo-static]').forEach((el) => el.remove())
  }, [])

  useEffect(() => {
    document.title = fullTitle
    setMeta('name', 'description', description)
    setCanonical(url)
    // og:type, og:site_name, og:locale a twitter:card jsou napříč webem stejné – statické v index.html
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', image)
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', image)
    // robots jen u stránek mimo index; jinde značku odstranit (přechod z noindex stránky)
    if (noindex) setMeta('name', 'robots', 'noindex, nofollow')
    else document.head.querySelector('meta[name="robots"]')?.remove()
  }, [fullTitle, description, url, image, noindex])

  return null
}
