import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { fluid } from '@/utils/fluid'
import { colors, layout } from '@/theme/tokens'
import { text } from '@/theme/textStyles'
import { hoverDarken } from '@/theme/interactions'
import content from '@/content/content'

// Patička – černý pruh 50 px položený přes spodní okraj stránky. Vlevo ikona © + text
// (jiný pro mobil/desktop), vpravo logo matfix (na desktopu navíc ikona odkazu).
export default function Footer() {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const copyright = isDesktop ? content.footer.copyrightDesktop : content.footer.copyrightMobile

  return (
    <Box
      component="footer"
      sx={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
        bgcolor: colors.black,
        height: `${layout.footerHeight}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pl: fluid(18, 140),
        pr: fluid(48, 150),
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: fluid(8, 12) }}>
        <Box component="img" src="/icons/footer_copyright.svg" alt="©" sx={{ width: 20, height: 20 }} />
        <Typography component="span" sx={text.footerCopy}>
          {copyright}
        </Typography>
      </Box>

      <Box
        component="a"
        href={content.footer.matfixUrl}
        target="_blank"
        rel="noreferrer"
        sx={{ ...hoverDarken(), display: 'flex', alignItems: 'center', gap: '10px' }}
      >
        <Box component="img" src="/icons/footer_matfix_logo.svg" alt={content.footer.matfixAlt} sx={{ width: 58, height: 15 }} />
        <Box
          component="img"
          src="/icons/footer_matfix_link.svg"
          alt=""
          aria-hidden
          sx={{ display: { xs: 'none', md: 'block' }, width: 20, height: 20 }}
        />
      </Box>
    </Box>
  )
}
