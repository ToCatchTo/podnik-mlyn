import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import Stack from '@mui/material/Stack'
import HeroBackground from '@/components/HeroBackground'
import Logo from '@/components/Logo'
import ArrowLink from '@/components/ArrowLink'
import Lightbox from '@/components/Lightbox'
import { vw } from '@/utils/fluid'
import { text } from '@/theme/textStyles'
import { useLightbox } from '@/hooks/useContent'
import content from '@/content/content'

// Domovská stránka – hero s velkým logem a odkazy restaurace/pivovar + oznámení (lightbox).
// Desktop: logo vlevo (347/252), odkazy vpravo (1106/527), geometrie proporčně k šířce (vw).
// Mobil: logo nahoře, odkazy pod ním, pevné hodnoty z návrhu 390.
// Stránka se musí vejít do okna bez scrollování, proto jsou svislé hodnoty omezené i podílem
// výšky viewportu (poměry z návrhu 1080 / 844 px).
export default function Home() {
  const { data: lightbox } = useLightbox()
  return (
    <Box sx={{ position: 'relative', flex: 1, display: 'flex' }}>
      <HeroBackground />

      {/* alignContent: řádky se nesmí roztáhnout do volné výšky (obsah drží u horního okraje) */}
      <Grid container sx={{ position: 'relative', zIndex: 1, flex: 1, alignItems: 'flex-start', alignContent: 'flex-start' }}>
        {/* Logo: shora 204/844 → 252/1080, výška loga 374/844 → 629/1080 (šířka = výška × 540/629) */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{ pl: { xs: '35px', md: vw(347) }, pt: { xs: 'min(204px, 23.3dvh)', md: `min(${vw(252)}, 23.3dvh)` } }}
        >
          <Logo width={{ xs: 'min(321px, 50dvh)', md: `min(${vw(540)}, 50dvh)` }} animated linkToHome={false} />
        </Grid>

        {/* Odkazy: mobil 76 px pod logem (9 % výšky), desktop 529/1080 shora */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            pl: { xs: '36px', md: vw(146) },
            pt: { xs: 'min(76px, 9dvh)', md: `min(${vw(529)}, 49dvh)` },
          }}
        >
          <Stack sx={{ gap: { xs: '15px', md: vw(18) } }}>
            {content.home.links.map((l) => (
              <ArrowLink key={l.label} label={l.label} to={l.to} textSx={text.hpLink} />
            ))}
          </Stack>
        </Grid>
      </Grid>

      {/* Oznámení jen když je z BE vyplněný text */}
      {lightbox.text.trim() !== '' && <Lightbox text={lightbox.text} />}
    </Box>
  )
}
