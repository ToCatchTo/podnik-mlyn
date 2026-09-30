import { createTheme } from '@mui/material/styles'
import { colors, fonts } from '@/theme/tokens'

// Vlastní breakpoint 'wide' (900px): stránky s fotkou vedle textu (Restaurace, Pivovar)
// přepínají na desktopový layout až od něj, pod ním jsou v mobilní verzi.
declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    wide: true
  }
}

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
    // Layout přepínáme na 'md': pod 600px mobilní verze (hodnoty z návrhu 390),
    // od 600px desktopová verze plynule rostoucí k návrhu 1920 (viz utils/fluid.ts).
    // 'wide' (900px) = pozdější přepnutí pro stránky s fotkou vedle textu.
    values: { xs: 0, sm: 600, md: 600, wide: 900, lg: 1200, xl: 1536 },
  },
})

export default theme
