import Box from '@mui/material/Box'
import { vw } from '@/utils/fluid'

// Fotka interiéru v pozadí stránky: 31 % krytí, režim multiply na zeleném pozadí.
// Výchozí výška = celý rodič (obsah stránky). Pivovar používá jen horní část dle návrhu:
// mobil (do 'wide') 844 px, desktop úvodní blok na výšku okna + 286 px (1366 − 1080 z návrhu,
// proporčně), pod ní pokračuje čistě zelené pozadí s kartami.
interface HeroBackgroundProps {
  variant?: 'full' | 'top'
}

export default function HeroBackground({ variant = 'full' }: HeroBackgroundProps) {
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
        src="/images/hero_background.webp"
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
    </Box>
  )
}
