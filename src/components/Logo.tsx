import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'
import { colors, fonts } from '@/theme/tokens'
import content from '@/content/content'

// Placeholder loga MLÝN CHMEL (kruhový emblém). Nahradí se finálním logem (ideálně SVG).
// Kruhový rám, uvnitř název ve dvou řádcích, tagline a stylizovaný chmelový list + vlnka.
interface LogoProps {
  // Šířka loga (přijímá fluid()/clamp() řetězec i číslo)
  size?: string | number
  sx?: SxProps<Theme>
}

export default function Logo({ size = 200, sx }: LogoProps) {
  return (
    <Box sx={{ width: size, aspectRatio: '1 / 1', flexShrink: 0, lineHeight: 0, ...sx }} aria-label={content.brand.name}>
      <svg viewBox="0 0 200 200" width="100%" height="100%" role="img" aria-label={content.brand.name}>
        {/* Vnější kruh */}
        <circle cx="100" cy="100" r="96" fill="none" stroke={colors.cream} strokeWidth="2.5" />
        {/* Horní část názvu */}
        <text
          x="100" y="66" textAnchor="middle"
          fontFamily={fonts.heading} fontSize="34" fontWeight={600}
          fill={colors.cream} letterSpacing="2"
        >
          MLÝN
        </text>
        {/* Stylizovaný chmelový list uprostřed */}
        <path
          d="M100 78 C114 88 114 108 100 122 C86 108 86 88 100 78 Z"
          fill="none" stroke={colors.cream} strokeWidth="2"
        />
        <line x1="100" y1="82" x2="100" y2="120" stroke={colors.cream} strokeWidth="1.5" />
        {/* Dolní část názvu */}
        <text
          x="100" y="150" textAnchor="middle"
          fontFamily={fonts.heading} fontSize="34" fontWeight={600}
          fill={colors.cream} letterSpacing="2"
        >
          CHMEL
        </text>
        {/* Vlnka pod názvem */}
        <path
          d="M64 168 Q76 160 88 168 T112 168 T136 168"
          fill="none" stroke={colors.cream} strokeWidth="2" strokeLinecap="round"
        />
      </svg>
    </Box>
  )
}
