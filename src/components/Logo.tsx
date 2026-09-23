import Box from '@mui/material/Box'
import { keyframes } from '@mui/material/styles'
import type { SxProps, Theme } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import { hoverDarken } from '@/theme/interactions'
import content from '@/content/content'

// Logo Sezemického pivovaru (vektor z návrhu, krémová barva). Poměr stran 540 : 629.
// Na podstránkách je odkazem na domovskou stránku (linkToHome), na HP je jen obrázek bez hoveru.
// animated = varianta pro HP: emblém se rozsvítí a mírně zvětší (1 s); po jeho dokončení vjedou
// vlny pod ním – horní zleva, spodní zprava. Startují zcela mimo box loga a box je ořezává
// (overflow hidden), takže se odhalují postupně, jak vjíždějí dovnitř. Po dojezdu stojí.
// Emblém a obě vlny jsou tři SVG soubory se shodným viewBoxem, takže leží přesně na sobě.
// Při prefers-reduced-motion je logo statické.
interface LogoProps {
  // Šířka (px nebo clamp() z fluid())
  width: string
  animated?: boolean
  linkToHome?: boolean
  sx?: SxProps<Theme>
}

const emblemEnter = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`

const waveFromLeft = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
`

const waveFromRight = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`

const EMBLEM_DURATION = '1s'
const WAVE_DURATION = '1.1s'
// Vlny startují až po dokončení fade-inu emblému
const WAVE_DELAY = EMBLEM_DURATION
// Fade-in emblému: rychlý start, dlouhé doznění
const EMBLEM_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'
// Vjezd vln: plynulé zpomalení (easeOutCubic), aby byl pohyb čitelný a bez přejetí
const WAVE_EASE = 'cubic-bezier(0.33, 1, 0.68, 1)'
const REDUCED_MOTION = '@media (prefers-reduced-motion: reduce)'

export default function Logo({ width, animated = false, linkToHome = true, sx }: LogoProps) {
  // Obal: odkaz s hoverem, nebo neutrální box (HP)
  const wrapperProps = linkToHome
    ? { component: Link, to: '/', 'aria-label': content.nav.home, sx: { display: 'block', width, ...hoverDarken(), ...sx } }
    : { sx: { display: 'block', width, ...sx } }

  if (!animated) {
    return (
      <Box {...wrapperProps}>
        <Box component="img" src="/images/logo.svg" alt={content.brand.logoAlt} sx={{ display: 'block', width: '100%', height: 'auto' }} />
      </Box>
    )
  }

  const layer = { position: 'absolute', inset: 0, width: '100%', height: '100%' } as const
  const waveSx = (animation: typeof waveFromLeft) => ({
    ...layer,
    animation: `${animation} ${WAVE_DURATION} ${WAVE_EASE} ${WAVE_DELAY} both`,
    [REDUCED_MOTION]: { animation: 'none' },
  })

  return (
    <Box {...wrapperProps}>
      {/* overflow hidden: vlny mimo box nejsou vidět, odhalují se až při vjezdu */}
      <Box
        role="img"
        aria-label={content.brand.logoAlt}
        sx={{ position: 'relative', width: '100%', aspectRatio: '540 / 629', overflow: 'hidden' }}
      >
        <Box
          component="img"
          src="/images/logo_emblem.svg"
          alt=""
          sx={{
            ...layer,
            animation: `${emblemEnter} ${EMBLEM_DURATION} ${EMBLEM_EASE} both`,
            [REDUCED_MOTION]: { animation: 'none' },
          }}
        />
        <Box component="img" src="/images/logo_wave_top.svg" alt="" sx={waveSx(waveFromLeft)} />
        <Box component="img" src="/images/logo_wave_bottom.svg" alt="" sx={waveSx(waveFromRight)} />
      </Box>
    </Box>
  )
}
