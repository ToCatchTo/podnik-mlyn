// Plynulé (fluid) škálování pixelové hodnoty podle šířky viewportu pomocí CSS clamp().
//
// fluid(minPx, maxPx) vrátí clamp(), který hodnotu lineárně interpoluje mezi
// referenčními šířkami obrazovky: minPx platí do 600px (mobilní layout drží hodnoty
// z návrhu 390 beze změny), maxPx na 1920px (desktopový návrh). Mezi 600 a 1920px
// hodnota plynule roste; nad 1920px zůstává na maxPx.
//
// Např.: height: fluid(100, 120) → 100px do 600px, 120px na 1920px, mezi tím plynule.

// Referenční šířky viewportu: od MIN_VIEWPORT začíná desktopový layout (shodné s breakpointem
// 'md' v theme.ts), MAX_VIEWPORT je šířka desktopového návrhu.
const MIN_VIEWPORT = 600
const MAX_VIEWPORT = 1920

// Zaokrouhlení na 3 desetinná místa, ať v CSS nejsou zbytečně dlouhá čísla
const round = (n: number) => Math.round(n * 1000) / 1000

export function fluid(minPx: number, maxPx: number): string {
  // Stejné hodnoty → není co interpolovat
  if (minPx === maxPx) return `${minPx}px`

  // Lineární funkce hodnota(šířka) = sklon * šířka + průsečík (vše v px)
  const slope = (maxPx - minPx) / (MAX_VIEWPORT - MIN_VIEWPORT)
  const interceptPx = minPx - slope * MIN_VIEWPORT
  // 1vw = 1 % šířky viewportu, takže sklon * šířku vyjádříme jako (sklon * 100)vw
  const slopeVw = slope * 100

  // clamp() vyžaduje MIN ≤ MAX; při klesajícím průběhu (minPx > maxPx) je nutné prohodit
  const lower = Math.min(minPx, maxPx)
  const upper = Math.max(minPx, maxPx)

  return `clamp(${lower}px, calc(${round(interceptPx)}px + ${round(slopeVw)}vw), ${upper}px)`
}

// Čistě proporční škálování pixelové hodnoty z návrhu (šířka 1920) podle šířky viewportu.
// Na rozdíl od fluid() neinterpoluje k mobilní hodnotě – hodnota je px × (šířka / 1920).
// Nad 1920px se zastaví na hodnotě z návrhu (stejně jako fluid()), aby se web na širokých
// monitorech dál nezvětšoval. Např.: mt: vw(139) → 104.25px na 1440px, 139px na 1920px i 2560px.
export function vw(designPx: number): string {
  if (designPx === 0) return '0px'
  const proportional = `${round((designPx / MAX_VIEWPORT) * 100)}vw`
  // U záporné hodnoty je "strop" z pohledu čísla naopak dolní mez
  return designPx > 0 ? `min(${proportional}, ${designPx}px)` : `max(${proportional}, ${designPx}px)`
}
