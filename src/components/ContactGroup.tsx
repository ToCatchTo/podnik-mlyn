import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { SxProps, Theme } from '@mui/material/styles'
import type { SystemStyleObject } from '@mui/system'
import { fluid } from '@/utils/fluid'
import { text } from '@/theme/textStyles'
import { hoverDarken } from '@/theme/interactions'

// Řádek hodnoty: prostý text, odkaz (telefon / e-mail) – na hover podtržený a ztmavený –
// nebo dvojice popisek + hodnota (otevírací doba: „Po–Čt“ | „11:00–22:00“)
export type ContactLine = string | { label: string; href: string } | { label: string; value: string }

type PairLine = Extract<ContactLine, { value: string }>
const isPair = (line: ContactLine): line is PairLine => typeof line !== 'string' && 'value' in line

// Po sobě jdoucí dvojice se seskupí do jedné mřížky, aby hodnoty seděly pod sebou
type Segment = { kind: 'pairs'; lines: PairLine[] } | { kind: 'single'; line: Exclude<ContactLine, PairLine> }

function toSegments(lines: readonly ContactLine[]): Segment[] {
  const segments: Segment[] = []
  for (const line of lines) {
    const last = segments[segments.length - 1]
    if (isPair(line)) {
      if (last?.kind === 'pairs') last.lines.push(line)
      else segments.push({ kind: 'pairs', lines: [line] })
    } else {
      segments.push({ kind: 'single', line })
    }
  }
  return segments
}

// Skupina kontaktní informace: popisek (label) + jeden či více řádků hodnoty.
// Varianta 'small' použije drobné písmo tenčího řezu (provozovatel); popisek zůstává běžný.
interface ContactGroupProps {
  label: string
  lines: readonly ContactLine[]
  variant?: 'body' | 'small'
  // Textový styl popisku i hodnot (Kontakt 33 px, Restaurace 30 px)
  textSx?: SystemStyleObject<Theme>
  // Mezera mezi popiskem a hodnotami (Kontakt 20 → 32, Restaurace 20 → 36)
  linesMt?: string
  // Drobná poznámka pod řádky (např. „Kuchyně vaří do 21:00.“ u otevírací doby)
  note?: string | null
  sx?: SxProps<Theme>
}

export default function ContactGroup({
  label,
  lines,
  variant = 'body',
  textSx = text.contactText,
  linesMt = fluid(20, 32),
  note,
  sx,
}: ContactGroupProps) {
  const bodyStyle = variant === 'small' ? text.operatorSmall : textSx

  return (
    <Box sx={sx}>
      <Typography component="h2" sx={textSx}>
        {label}
      </Typography>
      <Box sx={{ mt: variant === 'small' ? fluid(22, 32) : linesMt }}>
        {toSegments(lines).map((segment, i) => {
          if (segment.kind === 'pairs') {
            // Popisek vlevo, hodnota vpravo; sloupec popisků široký podle nejdelšího
            return (
              <Box
                key={i}
                sx={{ display: 'grid', gridTemplateColumns: 'max-content auto', columnGap: fluid(12, 20) }}
              >
                {segment.lines.map((line, j) => (
                  <Box key={j} sx={{ display: 'contents' }}>
                    <Typography sx={bodyStyle}>{line.label}</Typography>
                    <Typography sx={bodyStyle}>{line.value}</Typography>
                  </Box>
                ))}
              </Box>
            )
          }
          const line = segment.line
          return typeof line === 'string' ? (
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
          )
        })}
      </Box>
      {note && <Typography sx={{ ...text.note, mt: fluid(8, 12) }}>{note}</Typography>}
    </Box>
  )
}
