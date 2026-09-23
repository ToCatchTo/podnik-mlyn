// Tvary dat z backendu (shodné s placeholdery v content.ts)

// Oznámení v lightboxu na HP; prázdný text = lightbox se nezobrazí
export interface LightboxData {
  text: string
}

// Otevírací doba – jeden řádek na den/skupinu dní
export interface OpeningHours {
  lines: string[]
}

// Karta piva
export interface Beer {
  name: string
  description: string
  price: string // částka v Kč, např. "99"
  volume: string // objem, např. "0,5l"
}

// Odkazy na PDF s menu
export interface MenuLinks {
  lunchMenuUrl: string
  permanentMenuUrl: string
}
