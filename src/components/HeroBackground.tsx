import Box from '@mui/material/Box'
import { alpha } from '@mui/material/styles'
import { vw } from '@/utils/fluid'
import { colors } from '@/theme/tokens'

// Fotka v pozadí stránky: 31 % krytí, režim multiply na zeleném pozadí.
// Výchozí fotka (HP) je fotka pivovaru; Restaurace a Pivovar si předávají vlastní fotku (src) –
// zatím stejnou, jakou mají v úvodním bloku jako ostrou prezentační.
// Přes fotku leží ještě poloprůhledná vrstva tmavší zelené (OVERLAY_OPACITY), která pozadí
// ztmaví a fotku utlumí – sílu ztmavení řídí jen tato konstanta.
// Výchozí výška = celý rodič (obsah stránky). Pivovar používá jen horní část dle návrhu:
// mobil (do 'wide') 844 px, desktop úvodní blok na výšku okna + 286 px (1366 − 1080 z návrhu,
// proporčně), pod ní pokračuje čistě zelené pozadí s kartami.
interface HeroBackgroundProps {
  variant?: 'full' | 'top'
  src?: string
}

const DEFAULT_SRC = '/images/pivovar_photo.webp'

// Krytí tmavě zelené vrstvy přes fotku (0 = bez ztmavení, vyšší = tmavší pozadí)
const OVERLAY_OPACITY = 0.3
const overlayColor = alpha(colors.cardGreen, OVERLAY_OPACITY)
// U varianty 'top' vrstva na posledních 200 px plynule mizí, aby pod fotkou nevznikl
// ostrý přechod do čistě zeleného pozadí
const OVERLAY_FADE = '200px'

export default function HeroBackground({ variant = 'full', src = DEFAULT_SRC }: HeroBackgroundProps) {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: variant === 'full' ? '100%' : { xs: '844px', wide: `calc(100dvh + ${vw(286)})` },
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Box
        component="img"
        src={src}
        alt=""
        sx={{
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: 0.31,
          mixBlendMode: 'multiply',
        }}
      />
      {/* Ztmavující zelená vrstva přes fotku */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            variant === 'full'
              ? overlayColor
              : `linear-gradient(to bottom, ${overlayColor} calc(100% - ${OVERLAY_FADE}), transparent)`,
        }}
      />
    </Box>
  )
}
