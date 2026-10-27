// Konfigurace API administrace (admin.mlynachmel.cz). Všechny endpointy jsou GET s hlavičkou
// X-AUTH-TOKEN. Token je ve Vite bundlu záměrně veřejný – slouží k identifikaci klienta a k jeho
// zneplatnění v administraci (Nastavení → API tokeny), ne k ochraně dat; ochranou je CORS na API.
// Kompletní návod: API.md v kořeni projektu, Swagger na https://admin.mlynachmel.cz/api/doc.
const DEFAULT_API_BASE = 'https://admin.mlynachmel.cz/api'

// VITE_API_BASE_URL přepíše výchozí adresu (testovací doména, lokální mock)
const API_BASE = ((import.meta.env.VITE_API_BASE_URL as string | undefined) || DEFAULT_API_BASE).replace(/\/$/, '')
const API_TOKEN = (import.meta.env.VITE_API_TOKEN as string | undefined) ?? ''

if (import.meta.env.DEV && !API_TOKEN) {
  // Bez tokenu API vrací 401 a web všechen dynamický obsah skryje – ať to není tichá záhada
  console.warn('[api] Chybí VITE_API_TOKEN v .env – data z administrace se nenačtou.')
}

// Cesty endpointů (relativně k API_BASE)
export const endpoints = {
  specialEvent: '/special-event',
  openingHours: '/opening-hours',
  restaurantMenus: '/restaurant-menus',
  beers: '/beers',
} as const

// Plná URL endpointu
export function apiUrl(path: string): string {
  return `${API_BASE}${path}`
}

// Společné fetch options (autorizační hlavička)
export const apiOptions: RequestInit = {
  headers: {
    Accept: 'application/json',
    'X-AUTH-TOKEN': API_TOKEN,
  },
}
