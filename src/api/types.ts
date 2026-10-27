// Tvary odpovědí API administrace (viz API.md a Swagger /api/doc)

// Mimořádná událost pro lightbox na HP. `text` je HTML z editoru, `version` je identifikátor
// verze (čas poslední úpravy) – porovnává se jen na rovnost s hodnotou uloženou při zavření.
export interface SpecialEvent {
  title: string
  text: string
  version: string
}

export interface SpecialEventResponse {
  item: SpecialEvent | null
}

// Otevírací doba – řádky jsou volné texty (label vlevo, value vpravo), nic se neparsuje
export interface OpeningHoursItem {
  label: string
  value: string
}

export interface OpeningHoursResponse {
  items: OpeningHoursItem[]
  note: string | null
}

// Soubor menu (PDF nebo obrázek) – slot bez nahraného souboru je null
export interface MenuFile {
  url: string
  name: string
  mimeType: 'application/pdf' | 'image/jpeg' | 'image/png' | 'image/webp' | string
  size: number
  note: string | null
  updatedAt: string
}

export interface RestaurantMenusResponse {
  permanent: MenuFile | null
  lunch: MenuFile | null
}

// Pivní karta – `text` je prostý text s \n, `image` absolutní URL nebo null
export interface Beer {
  id: number
  name: string
  text: string | null
  image: string | null
  price: number // celé Kč
  volumeMl: number
}

export interface BeersResponse {
  items: Beer[]
}
