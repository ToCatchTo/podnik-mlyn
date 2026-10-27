import { useFetch } from '@/hooks/useFetch'
import { apiUrl, apiOptions, endpoints } from '@/api/endpoints'
import type {
  Beer,
  BeersResponse,
  MenuFile,
  OpeningHoursResponse,
  RestaurantMenusResponse,
  SpecialEvent,
  SpecialEventResponse,
} from '@/api/types'

// Hooky pro obsah z administrace. API je zdroj pravdy: dokud se data načítají nebo když API
// selže (401, 404, výpadek), hooky vrací „nic“ (null / prázdný seznam) a stránky příslušnou část
// nevykreslí. Žádné placeholdery. Odpovědi se cachují po dobu života stránky (viz useFetch).
const options = { ...apiOptions, shared: true }

function useApi<T>(path: string): T | null {
  const { data } = useFetch<T>(apiUrl(path), options)
  return data
}

// Mimořádná událost pro lightbox na HP (null = vypnutá / nenačtená)
export function useSpecialEvent(): SpecialEvent | null {
  return useApi<SpecialEventResponse>(endpoints.specialEvent)?.item ?? null
}

// Otevírací doba (null = není nastavená / nenačtená)
export function useOpeningHours(): OpeningHoursResponse | null {
  const data = useApi<OpeningHoursResponse>(endpoints.openingHours)
  return data && data.items.length > 0 ? data : null
}

// Soubory menu – slot bez souboru je null
export function useRestaurantMenus(): { lunch: MenuFile | null; permanent: MenuFile | null } {
  const data = useApi<RestaurantMenusResponse>(endpoints.restaurantMenus)
  return { lunch: data?.lunch ?? null, permanent: data?.permanent ?? null }
}

// Pivní karty v pořadí z administrace ([] = žádné / nenačtené)
export function useBeers(): Beer[] {
  return useApi<BeersResponse>(endpoints.beers)?.items ?? []
}
