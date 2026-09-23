// Designové tokeny vytažené 1:1 z XD návrhu (Mlyn_webdesign v2).
// Barvy, fonty a společné rozměry layoutu.

// Barvy z návrhu
export const colors = {
  green: '#4A644A', // hlavní pozadí / primární barva
  cream: '#FFE4B2', // text a akcenty na zeleném pozadí
  cardGreen: '#3B5139', // pozadí karet s pivem a svislé dekorativní vlny
  black: '#000000', // patička (footer bar)
  white: '#FFFFFF', // drobné texty v patičce
} as const

// Fonty: Bricolage Grotesque je z návrhu (bundlovaný přes @fontsource),
// Inter je bezplatná náhrada za Albula Pro (jen drobný text v patičce)
export const fonts = {
  heading: '"Bricolage Grotesque", system-ui, sans-serif',
  small: '"Inter", system-ui, sans-serif',
} as const

// Referenční šířky viewportu odpovídají artboardům v návrhu (mobil 390, desktop 1920)
// a shodují se s konstantami ve fluid.ts.
export const REF = { mobile: 390, desktop: 1920 } as const

// Společné rozměry layoutu (px z návrhu)
export const layout = {
  footerHeight: 50, // černá patička (mobil i desktop)
} as const

// Breakpoint pro přepnutí layoutu mobil → desktop (MUI 'md')
export const LAYOUT_BREAKPOINT = 'md' as const
