import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import Stack from '@mui/material/Stack'
import HeroBackground from '@/components/HeroBackground'
import Logo from '@/components/Logo'
import ArrowLink from '@/components/ArrowLink'
import Lightbox from '@/components/Lightbox'
import { vw } from '@/utils/fluid'
import Seo from '@/components/Seo'
import JsonLd from '@/components/JsonLd'
import { text, visuallyHidden } from '@/theme/textStyles'
import { SEO, localBusinessJsonLd } from '@/seo'
import { useLightbox } from '@/hooks/useContent'
import content from '@/content/content'

// Domovská stránka – hero s velkým logem a odkazy restaurace/pivovar + oznámení (lightbox).
// Desktop: logo vlevo (347/252), odkazy vpravo (1106/527), geometrie proporčně k šířce (vw).
// Mobil: logo nahoře, odkazy pod ním, pevné hodnoty z návrhu 390. V okně širším než návrh
// (390–599 px) je blok logo + odkazy vycentrovaný; menu v hlavičce zůstává vpravo.
// Stránka se má vejít do okna bez scrollování, proto jsou svislé hodnoty omezené i podílem
// výšky viewportu (poměry z návrhu 1080 / 844 px). Na mobilu má ale přednost mezera 80 px
// mezi odkazy a patičkou – když se do okna nevejde, stránka se o chybějící kus scrolluje.

// Mobilní šířka loga (omezená i výškou okna) = šířka vycentrovaného bloku obsahu
const MOBILE_LOGO_WIDTH = 'min(321px, 50dvh)'
// Levé odsazení mobilního bloku: vycentrovaný na šířku loga, nejméně však odsazení z návrhu
// (na 390 px vychází přesně návrh). Odkazy jsou dle návrhu o 1 px víc vpravo než logo.
const mobilePl = (designPx: number) =>
  `max(${designPx}px, calc(50vw - ${MOBILE_LOGO_WIDTH} / 2 + ${designPx - 35}px))`

export default function Home() {
  const { data: lightbox } = useLightbox()
  return (
    <Box sx={{ position: 'relative', flex: 1, display: 'flex' }}>
      <Seo path="/" description={SEO['/'].description} />
      <JsonLd data={localBusinessJsonLd()} />
      <HeroBackground />
      {/* Návrh na HP nadpis nemá (jen logo) – h1 je vizuálně skrytý */}
      <Box component="h1" sx={visuallyHidden}>
        {content.home.heading}
      </Box>

      {/* alignContent: řádky se nesmí roztáhnout do volné výšky (obsah drží u horního okraje) */}
      <Grid container sx={{ position: 'relative', zIndex: 1, flex: 1, alignItems: 'flex-start', alignContent: 'flex-start' }}>
        {/* Logo: shora 204/844 → 252/1080, výška loga 374/844 → 629/1080 (šířka = výška × 540/629) */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{ pl: { xs: mobilePl(35), md: vw(347) }, pt: { xs: 'min(204px, 23.3dvh)', md: `min(${vw(252)}, 23.3dvh)` } }}
        >
          <Logo width={{ xs: MOBILE_LOGO_WIDTH, md: `min(${vw(540)}, 50dvh)` }} animated linkToHome={false} />
        </Grid>

        {/* Odkazy: mobil 76 px pod logem (9 % výšky) a 80 px nad patičkou, desktop 529/1080 shora */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            pl: { xs: mobilePl(36), md: vw(146) },
            pt: { xs: 'min(76px, 9dvh)', md: `min(${vw(529)}, 49dvh)` },
            // Mobil: mezera mezi posledním odkazem a patičkou
            pb: { xs: '80px', md: 0 },
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
