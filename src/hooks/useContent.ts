import { useFetch } from '@/hooks/useFetch'
import { apiUrl, apiOptions, endpoints } from '@/api/endpoints'
import type { Beer, LightboxData, MenuLinks, OpeningHours } from '@/api/types'
import content from '@/content/content'

// Hooky pro obsah z backendu. Dokud API není nakonfigurováno, načítá se, nebo selže,
// vrací placeholder z content.ts – layout tak nikdy neskáče a web nezůstane prázdný.
interface ContentState<T> {
  data: T
  loading: boolean
}

function useContent<T>(path: string, fallback: T): ContentState<T> {
  const { data, loading } = useFetch<T>(apiUrl(path), apiOptions)
  return { data: data ?? fallback, loading }
}

export function useLightbox(): ContentState<LightboxData> {
  return useContent<LightboxData>(endpoints.lightbox, { text: content.lightbox.text })
}

export function useOpeningHours(): ContentState<OpeningHours> {
  return useContent<OpeningHours>(endpoints.openingHours, { lines: [...content.kontakt.hours.lines] })
}

export function useBeers(): ContentState<Beer[]> {
  return useContent<Beer[]>(endpoints.beers, [...content.pivovar.beers])
}

export function useMenuLinks(): ContentState<MenuLinks> {
  return useContent<MenuLinks>(endpoints.menuLinks, { ...content.restaurace.menuLinks })
}
