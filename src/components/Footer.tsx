import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { fluid } from '@/utils/fluid'
import { colors, fonts } from '@/theme/tokens'
import { text } from '@/theme/textStyles'
import content from '@/content/content'

// Patička – černý pruh přes celou šířku. Vlevo copyright (jiný text pro mobil/desktop),
// vpravo logo "matfix" (placeholder).
export default function Footer() {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const copyright = isDesktop ? content.footer.copyrightDesktop : content.footer.copyrightMobile

  return (
    <Box
      component="footer"
      sx={{
        flexShrink: 0,
        bgcolor: colors.black,
        minHeight: fluid(40, 50),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pl: fluid(46, 172),
        pr: fluid(30, 90),
      }}
    >
      <Typography component="span" sx={text.footerCopy}>
        © {copyright}
      </Typography>
      <Typography
        component="span"
        sx={{
          fontFamily: fonts.small,
          fontWeight: 700,
          fontSize: fluid(14, 20),
          lineHeight: 1,
          color: colors.white,
          letterSpacing: '-0.02em',
        }}
      >
        {content.footer.logo}
      </Typography>
    </Box>
  )
}
