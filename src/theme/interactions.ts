import type { Theme } from '@mui/material/styles'
import type { SystemStyleObject } from '@mui/system'

// Hover stavy interaktivních prvků:
// - hoverDarken: textový odkaz nebo samostatná ikona → mírně ztmavne samotný text/ikona
// - hoverBackground: tlačítko s vlastním pozadím → ztmavne jen pozadí, text zůstává

export function hoverDarken(amount = 0.8): SystemStyleObject<Theme> {
  return {
    transition: 'filter 150ms ease',
    '&:hover, &:focus-visible': {
      filter: `brightness(${amount})`,
    },
  }
}

export function hoverBackground(color = 'rgba(0, 0, 0, 0.14)'): SystemStyleObject<Theme> {
  return {
    transition: 'background-color 150ms ease',
    '&:hover, &:focus-visible': {
      bgcolor: color,
    },
  }
}
