import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import HeroBackground from '@/components/HeroBackground'
import Logo from '@/components/Logo'
import ArrowLink from '@/components/ArrowLink'
import PhotoPlaceholder from '@/components/PhotoPlaceholder'
import BeerCard from '@/components/BeerCard'
import WaveDivider from '@/components/WaveDivider'
import { fluid } from '@/utils/fluid'
import { text } from '@/theme/textStyles'
import content from '@/content/content'

// Stránka Pivovar – nahoře rozdělený layout (obsah vlevo, fotka vpravo),
// pod tím mřížka karet s pivem (desktop 3 sloupce, mobil 2 sloupce).
export default function Pivovar() {
  const c = content.pivovar
  return (
    <Box sx={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <HeroBackground />

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {/* Horní rozdělená část */}
        <Grid container sx={{ alignItems: 'flex-start' }}>
          <Grid
            size={{ xs: 12, md: 7 }}
            sx={{ pl: fluid(36, 278), pr: fluid(36, 40), pt: fluid(74, 138) }}
          >
            <Logo size={fluid(120, 130)} />

            <Typography component="h1" sx={{ ...text.sectionHeading, mt: fluid(130, 243), maxWidth: fluid(220, 600) }}>
              {c.heading}
            </Typography>

            <Typography sx={{ ...text.intro, mt: fluid(6, 6), maxWidth: fluid(318, 705) }}>
              {content.intro}
            </Typography>

            {/* Fotka – jen na mobilu, přes celou šířku */}
            <Box
              sx={{
                display: { xs: 'block', md: 'none' },
                width: '100vw',
                ml: 'calc(50% - 50vw)',
                aspectRatio: '390 / 514',
                mt: fluid(56, 0),
                overflow: 'hidden',
              }}
            >
              <PhotoPlaceholder label="foto" />
            </Box>

            {/* Dekorativní vlnka – jen na mobilu */}
            <WaveDivider sx={{ display: { xs: 'block', md: 'none' }, height: 24, mt: fluid(30, 0) }} strokeWidth={2} />

            <Box sx={{ mt: fluid(80, 108) }}>
              <ArrowLink label={c.offerLink} to="/pivovar" direction="down" textSx={text.subLink} />
            </Box>
          </Grid>

          {/* Pravý sloupec – fotka (jen desktop) */}
          <Grid size={{ xs: 12, md: 5 }} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box sx={{ width: '100%', aspectRatio: '818 / 1080', overflow: 'hidden' }}>
              <PhotoPlaceholder label="foto" />
            </Box>
          </Grid>
        </Grid>

        {/* Mřížka karet s pivem přes celou šířku */}
        <Box sx={{ px: fluid(36, 278), pt: fluid(60, 100), pb: fluid(40, 80) }}>
          <Grid
            container
            columnSpacing={{ xs: 1.5, md: 10.625 }}
            rowSpacing={{ xs: 5, md: 6.25 }}
          >
            {c.beers.map((beer, i) => (
              <Grid key={i} size={{ xs: 6, md: 4 }}>
                <BeerCard name={beer.name} desc={beer.desc} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}
