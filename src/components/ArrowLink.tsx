import ButtonBase from '@mui/material/ButtonBase'
import Box from '@mui/material/Box'
import type { Theme } from '@mui/material/styles'
import type { SystemStyleObject } from '@mui/system'
import { Link } from 'react-router-dom'
import { fluid } from '@/utils/fluid'
import { hoverDarken } from '@/theme/interactions'

// Odkaz s šipkou z návrhu (např. "restaurace →", "nabídka piva ↓").
// Šipka sedí spodní hranou na účaři textu; mezera 16 → 40 px.
// external = běžný <a> otevřený v novém okně (PDF menu), jinak routerový Link.
interface ArrowLinkProps {
  label: string
  to: string
  direction?: 'right' | 'down'
  external?: boolean
  smallGap?: boolean // mezera mezi textem a šipkou 16px (default 40px)
  // Textový styl (z textStyles), určuje velikost/font/barvu
  textSx: SystemStyleObject<Theme>
  onClick?: () => void
}

// Rozměry šipek dle návrhu: vpravo 21×17 → 35×27, dolů 17×21 → 27,5×35
const icon = {
  right: { src: '/icons/arrow_right.svg', width: fluid(21, 35) },
  down: { src: '/icons/arrow_down.svg', width: fluid(16.5, 27.5) },
} as const

export default function ArrowLink({ label, to, direction = 'right', external = false, smallGap, textSx, onClick }: ArrowLinkProps) {
  const sx = {
    ...textSx,
    ...hoverDarken(),
    display: 'inline-flex',
    alignItems: 'baseline',
    gap: smallGap ? fluid(16, 40) : fluid(40, 60),
    width: 'fit-content',
    cursor: 'pointer',
  }
  const children = (
    <>
      {label}
      <Box component="img" src={icon[direction].src} alt="" aria-hidden sx={{ width: icon[direction].width, height: 'auto' }} />
    </>
  )

  if (external) {
    return (
      <ButtonBase component="a" href={to} target="_blank" rel="noreferrer" onClick={onClick} disableRipple sx={sx}>
        {children}
      </ButtonBase>
    )
  }
  return (
    <ButtonBase component={Link} to={to} onClick={onClick} disableRipple sx={sx}>
      {children}
    </ButtonBase>
  )
}
