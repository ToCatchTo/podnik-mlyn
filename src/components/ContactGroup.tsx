import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { SxProps, Theme } from '@mui/material/styles'
import { fluid } from '@/utils/fluid'
import { text } from '@/theme/textStyles'

// Skupina kontaktní informace: popisek (label) + jeden či více řádků hodnoty.
// Varianta 'small' použije drobné písmo (provozovatel).
interface ContactGroupProps {
  label: string
  lines: readonly string[]
  variant?: 'body' | 'small'
  sx?: SxProps<Theme>
}

export default function ContactGroup({ label, lines, variant = 'body', sx }: ContactGroupProps) {
  const bodyStyle = variant === 'small' ? text.provozovatelSmall : text.contactBody

  return (
    <Box sx={sx}>
      <Typography component="h2" sx={text.contactHeading}>
        {label}
      </Typography>
      <Box sx={{ mt: variant === 'small' ? fluid(8, 12) : fluid(14, 24) }}>
        {lines.map((line, i) => (
          <Typography key={i} sx={bodyStyle}>
            {line}
          </Typography>
        ))}
      </Box>
    </Box>
  )
}
