import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import HeroBackground from '@/components/HeroBackground'
import Logo from '@/components/Logo'
import ArrowLink from '@/components/ArrowLink'
import PhotoPlaceholder from '@/components/PhotoPlaceholder'
import WaveDivider from '@/components/WaveDivider'
import { fluid } from '@/utils/fluid'
import { text } from '@/theme/textStyles'
import content from '@/content/content'

// Stránka Restaurace – rozdělený layout: vlevo obsah (logo, nadpis, úvod, odkazy, kontakt),
// vpravo fotka (desktop). Na mobilu je fotka vložená mezi úvod a odkazy.
export default function Restaurace() {
  const c = content.restaurace
  return (
    <Box sx={{ position: 'relative', flex: 1, display: 'flex' }}>
      <HeroBackground />

      <Grid container sx={{ position: 'relative', zIndex: 1, flex: 1, alignItems: 'flex-start' }}>
        {/* Levý obsahový sloupec */}
        <Grid
          size={{ xs: 12, md: 7 }}
          sx={{ pl: fluid(36, 278), pr: fluid(36, 40), pt: fluid(74, 138), pb: fluid(40, 80) }}
        >
          <Logo size={fluid(120, 130)} />

          <Typography component="h1" sx={{ ...text.sectionHeading, mt: fluid(130, 243) }}>
            {c.heading}
          </Typography>

          <Typography sx={{ ...text.intro, mt: fluid(6, 6), maxWidth: fluid(318, 705) }}>
            {content.intro}
          </Typography>

          {/* Fotka – jen na mobilu (na desktopu je v pravém sloupci), přes celou šířku */}
          <Box
            sx={{
              display: { xs: 'block', md: 'none' },
              width: '100vw',
              ml: 'calc(50% - 50vw)', // full-bleed přes padding sloupce
              aspectRatio: '390 / 514',
              mt: fluid(56, 0),
              overflow: 'hidden',
            }}
          >
            <PhotoPlaceholder label="foto" />
          </Box>

          {/* Dekorativní vlnka – jen na mobilu (mezi fotkou a odkazy) */}
          <WaveDivider sx={{ display: { xs: 'block', md: 'none' }, height: 24, mt: fluid(30, 0) }} strokeWidth={2} />

          {/* Odkazy na menu */}
          <Stack sx={{ mt: fluid(80, 108), gap: fluid(23, 46) }}>
            {c.links.map((l) => (
              <ArrowLink key={l.label} label={l.label} to={l.to} textSx={text.subLink} />
            ))}
          </Stack>

          {/* Kontakt */}
          <Box sx={{ mt: fluid(150, 136) }}>
            <Typography sx={text.contactHeading}>{c.contactLabel}</Typography>
            <Box sx={{ mt: fluid(14, 24) }}>
              <Typography sx={text.contactBody}>{c.phone}</Typography>
              <Typography sx={text.contactBody}>{c.email}</Typography>
            </Box>
          </Box>
        </Grid>

        {/* Pravý sloupec – fotka (jen desktop), zarovnaná nahoru */}
        <Grid size={{ xs: 12, md: 5 }} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Box sx={{ width: '100%', aspectRatio: '818 / 1080', overflow: 'hidden' }}>
            <PhotoPlaceholder label="foto" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
