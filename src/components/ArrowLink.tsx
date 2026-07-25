import ButtonBase from '@mui/material/ButtonBase'
import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import { fluid } from '@/utils/fluid'

// Odkaz s šipkou (např. "restaurace →", "nabídka piva ↓").
interface ArrowLinkProps {
  label: string
  to: string
  direction?: 'right' | 'down'
  // Textový styl (z textStyles), určuje velikost/font/barvu
  textSx: SxProps<Theme>
  onClick?: () => void
}

export default function ArrowLink({ label, to, direction = 'right', textSx, onClick }: ArrowLinkProps) {
  return (
    <ButtonBase
      component={Link}
      to={to}
      onClick={onClick}
      disableRipple
      sx={{
        ...textSx,
        display: 'inline-flex',
        alignItems: 'center',
        gap: fluid(10, 20),
        width: 'fit-content',
        cursor: 'pointer',
      }}
    >
      {label}
      <Box component="span" aria-hidden sx={{ fontSize: '0.85em', lineHeight: 1 }}>
        {direction === 'down' ? '↓' : '→'}
      </Box>
    </ButtonBase>
  )
}
