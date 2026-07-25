import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'
import { colors } from '@/theme/tokens'

// Placeholder pro fotky z návrhu (bar, kuchař, pivovar).
// Drží správné rozměry a poměr, obsah se doplní finálními fotkami.
interface PhotoPlaceholderProps {
  // Volitelný popisek uprostřed (pro orientaci ve wireframu)
  label?: string
  sx?: SxProps<Theme>
}

export default function PhotoPlaceholder({ label = 'foto', sx }: PhotoPlaceholderProps) {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Jemný diagonální vzor, ať je placeholder zřetelný
        backgroundColor: colors.cardGreen,
        backgroundImage:
          'repeating-linear-gradient(45deg, rgba(255,228,178,0.06) 0, rgba(255,228,178,0.06) 12px, transparent 12px, transparent 24px)',
        color: 'rgba(255,228,178,0.55)',
        fontFamily: 'inherit',
        letterSpacing: 2,
        textTransform: 'uppercase',
        fontSize: 'clamp(12px, 1.2vw, 18px)',
        ...sx,
      }}
    >
      {label}
    </Box>
  )
}
