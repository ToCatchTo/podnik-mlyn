// Plynulé (fluid) škálování pixelové hodnoty podle šířky viewportu pomocí CSS clamp().
//
// fluid(minPx, maxPx) vrátí clamp(), který hodnotu lineárně interpoluje mezi
// referenčními šířkami obrazovky: minPx platí na 390px, maxPx na 1920px.
// Mimo tento rozsah je hodnota "zaseknutá" (clampnutá) na krajních hodnotách.
//
// Např.: height: fluid(100, 120) → 100px na 390px, 120px na 1920px, mezi tím plynule.

// Referenční šířky viewportu (mobil → desktop)
const MIN_VIEWPORT = 390
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

export default fluid
