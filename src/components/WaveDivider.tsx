import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'
import { colors } from '@/theme/tokens'

// Dekorativní vlnka (motiv vody / chmele z loga). Vykreslená jako SVG sinusovka.
interface WaveDividerProps {
  // Počet vln
  waves?: number
  // Barva čáry
  color?: string
  // Tloušťka čáry
  strokeWidth?: number
  sx?: SxProps<Theme>
}

// Sestaví SVG path jedné souvislé vlnky (hladké kvadratické oblouky)
function buildPath(waves: number): string {
  const step = 100 / waves // šířka jedné vlny v uživatelských jednotkách
  const half = step / 2
  let d = `M0 10`
  for (let i = 0; i < waves; i++) {
    const up = i % 2 === 0 ? 0 : 20 // střídání nahoru/dolů
    d += ` Q ${i * step + half} ${up}, ${(i + 1) * step} 10`
  }
  return d
}

export default function WaveDivider({
  waves = 4,
  color = colors.cream,
  strokeWidth = 3,
  sx,
}: WaveDividerProps) {
  return (
    <Box sx={{ width: '100%', lineHeight: 0, ...sx }}>
      <svg
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
        width="100%"
        height="100%"
        style={{ display: 'block' }}
      >
        <path d={buildPath(waves)} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      </svg>
    </Box>
  )
}
