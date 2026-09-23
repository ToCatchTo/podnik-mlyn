import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { SxProps, Theme } from '@mui/material/styles'
import type { SystemStyleObject } from '@mui/system'
import { fluid } from '@/utils/fluid'
import { text } from '@/theme/textStyles'
import { hoverDarken } from '@/theme/interactions'

// Řádek hodnoty: prostý text, nebo odkaz (telefon / e-mail) – na hover podtržený a ztmavený
export type ContactLine = string | { label: string; href: string }

// Skupina kontaktní informace: popisek (label) + jeden či více řádků hodnoty.
// Varianta 'small' použije drobné písmo (provozovatel).
interface ContactGroupProps {
  label: string
  lines: readonly ContactLine[]
  variant?: 'body' | 'small'
  // Textový styl popisku i hodnot (Kontakt 33 px, Restaurace 30 px)
  textSx?: SystemStyleObject<Theme>
  // Mezera mezi popiskem a hodnotami (Kontakt 20 → 32, Restaurace 20 → 36)
  linesMt?: string
  sx?: SxProps<Theme>
}

export default function ContactGroup({
  label,
  lines,
  variant = 'body',
  textSx = text.contactText,
  linesMt = fluid(20, 32),
  sx,
}: ContactGroupProps) {
  const bodyStyle = variant === 'small' ? text.operatorSmall : textSx

  return (
    <Box sx={sx}>
      <Typography component="h2" sx={textSx}>
        {label}
      </Typography>
      <Box sx={{ mt: variant === 'small' ? fluid(22, 32) : linesMt }}>
        {lines.map((line, i) =>
          typeof line === 'string' ? (
            <Typography key={i} sx={bodyStyle}>
              {line}
            </Typography>
          ) : (
            <Typography key={i} sx={bodyStyle}>
              <Box
                component="a"
                href={line.href}
                sx={{
                  ...hoverDarken(),
                  color: 'inherit',
                  textDecoration: 'none',
                  textUnderlineOffset: '0.12em',
                  textDecorationThickness: '0.05em',
                  '&:hover, &:focus-visible': { textDecoration: 'underline' },
                }}
              >
                {line.label}
              </Box>
            </Typography>
          ),
        )}
      </Box>
    </Box>
  )
}
