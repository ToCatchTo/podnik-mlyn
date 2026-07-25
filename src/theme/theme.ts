import { createTheme } from '@mui/material/styles'
import { colors, fonts } from '@/theme/tokens'

// Základní MUI motiv aplikace – barvy z návrhu a náhradní fonty.
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: colors.green },
    background: { default: colors.green, paper: colors.green },
    text: { primary: colors.cream },
  },
  typography: {
    fontFamily: fonts.heading,
  },
  breakpoints: {
    // Ponecháváme výchozí MUI breakpointy; layout přepínáme na 'md' (900px).
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  },
})

export default theme
