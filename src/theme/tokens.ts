// Designové tokeny vytažené 1:1 z XD návrhu (Mlyn_webdesign).
// Barvy, fonty a referenční šířky pro fluid() škálování.

// Barvy z návrhu
export const colors = {
  green: '#4A644A', // hlavní pozadí / primární barva
  cream: '#FFE4B2', // text a akcenty na zeleném pozadí
  cardGreen: '#3B5139', // pozadí karet s pivem
  black: '#000000', // patička (footer bar)
  white: '#FFFFFF', // drobné texty v patičce
} as const

// Náhradní (bezplatné) fonty za komerční Safiro a Albula Pro
export const fonts = {
  // Safiro (nadpisy, navigace) → Figtree
  heading: '"Figtree", system-ui, sans-serif',
  // Albula Pro (drobné texty) → Inter
  small: '"Inter", system-ui, sans-serif',
} as const

// Referenční šířky viewportu odpovídají artboardům v návrhu (mobil 390, desktop 1920)
// a shodují se s konstantami ve fluid.ts.
export const REF = { mobile: 390, desktop: 1920 } as const

// Breakpoint pro přepnutí layoutu mobil → desktop (MUI 'md')
export const LAYOUT_BREAKPOINT = 'md' as const
