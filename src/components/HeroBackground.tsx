import Box from '@mui/material/Box'
import { fluid } from '@/utils/fluid'

// Fotka interiéru v pozadí stránky: 31 % krytí, režim multiply na zeleném pozadí.
// Výchozí výška = celý rodič (obsah stránky). Pivovar používá jen horní část dle návrhu
// (mobil 844, desktop 1366), pod ní pokračuje čistě zelené pozadí s kartami.
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
        height: variant === 'full' ? '100%' : fluid(844, 1366),
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
