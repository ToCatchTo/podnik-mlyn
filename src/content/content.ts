// Centrální soubor se všemi statickými texty aplikace.
// V komponentách nepoužívej hardcoded texty – vždy je ber odsud.

export const content = {
  // Obecné texty aplikace
  app: {
    name: 'Podnik Mlýn',
  },
} as const

export type Content = typeof content

export default content
