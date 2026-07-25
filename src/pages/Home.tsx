import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import Stack from '@mui/material/Stack'
import HeroBackground from '@/components/HeroBackground'
import Logo from '@/components/Logo'
import ArrowLink from '@/components/ArrowLink'
import { fluid } from '@/utils/fluid'
import { text } from '@/theme/textStyles'
import content from '@/content/content'

// Domovská stránka – hero s velkým logem a odkazy restaurace/pivovar.
// Desktop: logo vlevo, odkazy vpravo. Mobil: logo nahoře na střed, odkazy pod ním.
export default function Home() {
  return (
    <Box sx={{ position: 'relative', flex: 1, display: 'flex' }}>
      <HeroBackground />

      <Grid
        container
        sx={{
          position: 'relative',
          zIndex: 1,
          flex: 1,
          alignItems: 'center',
          px: { xs: fluid(36, 36), md: 0 },
          py: { xs: fluid(60, 60), md: 0 },
        }}
      >
        {/* Logo */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            display: 'flex',
            justifyContent: { xs: 'center', md: 'flex-start' },
            pl: { md: fluid(0, 296) },
          }}
        >
          <Logo size={fluid(300, 500)} />
        </Grid>

        {/* Odkazy */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            pl: { xs: 0, md: fluid(0, 146) },
            pt: { xs: fluid(48, 48), md: 0 },
          }}
        >
          <Stack sx={{ gap: fluid(23, 32) }}>
            {content.home.links.map((l) => (
              <ArrowLink key={l.label} label={l.label} to={l.to} textSx={text.hpLink} />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}
