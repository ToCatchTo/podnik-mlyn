import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'
import { colors } from '@/theme/tokens'

// Svislá dekorativní vlnka (např. na stránce Kontakt). SVG sinusovka orientovaná svisle.
interface VerticalWaveProps {
  waves?: number
  color?: string
  strokeWidth?: number
  sx?: SxProps<Theme>
}

function buildPath(waves: number): string {
  const step = 100 / waves
  const half = step / 2
  let d = `M10 0`
  for (let i = 0; i < waves; i++) {
    const side = i % 2 === 0 ? 20 : 0
    d += ` Q ${side} ${i * step + half}, 10 ${(i + 1) * step}`
  }
  return d
}

export default function VerticalWave({ waves = 6, color = colors.cream, strokeWidth = 2, sx }: VerticalWaveProps) {
  return (
    <Box sx={{ lineHeight: 0, ...sx }} aria-hidden>
      <svg viewBox="0 0 20 100" preserveAspectRatio="none" width="100%" height="100%" style={{ display: 'block' }}>
        <path d={buildPath(waves)} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      </svg>
    </Box>
  )
}
