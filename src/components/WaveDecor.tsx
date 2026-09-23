import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'

// Dekorativní vlny z návrhu. 'horizontal' = krémové dvojité vlny (543 × 126),
// 'vertical' = tmavě zelené svislé vlny (252 × 1090). Pozici určuje rodič přes sx.
interface WaveDecorProps {
  variant: 'horizontal' | 'vertical'
  sx?: SxProps<Theme>
}

const src = {
  horizontal: '/images/decor_wave_horizontal.svg',
  vertical: '/images/decor_wave_vertical.svg',
} as const

export default function WaveDecor({ variant, sx }: WaveDecorProps) {
  return (
    <Box
      component="img"
      src={src[variant]}
      alt=""
      aria-hidden
      sx={{ display: 'block', height: 'auto', pointerEvents: 'none', ...sx }}
    />
  )
}
