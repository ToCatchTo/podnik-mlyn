// Konfigurace API: základní URL a cesty endpointů. Bez VITE_API_BASE_URL se nic nenačítá
// a aplikace používá placeholdery z content.ts.
const API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') ?? ''
const API_TOKEN = (import.meta.env.VITE_API_TOKEN as string | undefined) ?? ''

// Cesty endpointů (upravit podle skutečného backendu)
export const endpoints = {
  lightbox: '/lightbox',
  openingHours: '/opening-hours',
  beers: '/beers',
  menuLinks: '/menu-links',
} as const

// Plná URL endpointu, nebo null když API není nakonfigurováno
export function apiUrl(path: string): string | null {
  return API_BASE ? `${API_BASE}${path}` : null
}

// Společné fetch options (autorizační hlavička, pokud je token)
export const apiOptions: RequestInit = {
  headers: {
    Accept: 'application/json',
    ...(API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {}),
  },
}
