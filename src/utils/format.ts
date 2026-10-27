import type { Beer } from '@/api/types'
import content from '@/content/content'

// Objem z mililitrů na litry ve tvaru z návrhu: 500 → "0,5l", 330 → "0,33l", 1000 → "1l"
export function volumeLabel(volumeMl: number): string {
  return `${(volumeMl / 1000).toLocaleString('cs-CZ', { maximumFractionDigits: 2 })}l`
}

// Cena piva ve tvaru "59 Kč / 0,5l"
export function priceLabel(beer: Pick<Beer, 'price' | 'volumeMl'>): string {
  return `${beer.price} ${content.pivovar.currency} / ${volumeLabel(beer.volumeMl)}`
}
