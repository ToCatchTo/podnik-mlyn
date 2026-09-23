import type { Beer } from '@/api/types'
import content from '@/content/content'

// Cena piva ve tvaru "99 Kč / 0,5l"
export function priceLabel(beer: Pick<Beer, 'price' | 'volume'>): string {
  return `${beer.price} ${content.pivovar.currency} / ${beer.volume}`
}
