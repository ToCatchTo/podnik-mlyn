import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import Logo from '@/components/Logo'
import ContactGroup from '@/components/ContactGroup'
import WaveDecor from '@/components/WaveDecor'
import { fluid, vw } from '@/utils/fluid'
import { telHref, mailHref } from '@/utils/contactLinks'
import { useOpeningHours } from '@/hooks/useContent'
import Seo from '@/components/Seo'
import JsonLd from '@/components/JsonLd'
import { visuallyHidden } from '@/theme/textStyles'
import { SEO, localBusinessJsonLd } from '@/seo'
import content from '@/content/content'

// Stránka Kontakt – logo nahoře, pod ním dvousloupcový výpis kontaktních údajů (sloupce 552 px).
// Desktop (od 'wide', 900px): 2 sloupce (rezervace|adresa / otevírací doba|provozovatel), svislé
// vlny vlevo, geometrie proporčně k šířce okna (vw). Pod 900px mobilní verze: jeden sloupec,
// svislé vlny vpravo, pevné hodnoty.

// Šířka obsahového bloku (logo + kontakty) z návrhu a jeho levé odsazení
const BLOCK_WIDTH = 1104
const DESIGN_PL = 554
const WIDE_BREAKPOINT = 900
const DESIGN_WIDTH = 1920

// Levé odsazení bloku na desktopu: na 900 px je blok vycentrovaný, s rostoucí šířkou okna
// lineárně odjíždí doleva a na 1920 px dosáhne pozice z návrhu (554 px); nad 1920 už drží
// proporčně (vw(554)). Přímka px = slope · šířka + intercept vedená body
// (900, centrovaný offset) a (1920, 554); min() ji nad 1920 zastaví na proporční hodnotě.
const centeredPlAtWide = (WIDE_BREAKPOINT - (BLOCK_WIDTH / DESIGN_WIDTH) * WIDE_BREAKPOINT) / 2
const plSlope = (DESIGN_PL - centeredPlAtWide) / (DESIGN_WIDTH - WIDE_BREAKPOINT)
const plIntercept = DESIGN_PL - plSlope * DESIGN_WIDTH
const round = (n: number) => Math.round(n * 1000) / 1000
const desktopPl = `min(calc(${round(plSlope * 100)}vw + ${round(plIntercept)}px), ${vw(DESIGN_PL)})`

// Mobil (pod 900 px): blok široký 318 px (z návrhu 390) je vycentrovaný; při zužování okna
// mu levé odsazení klesá, až se na 36 px (návrh 390) zastaví.
const MOBILE_BLOCK_WIDTH = 318
const MOBILE_PL = 36
const mobilePl = `max(${MOBILE_PL}px, calc(50vw - ${MOBILE_BLOCK_WIDTH / 2}px))`

export default function Kontakt() {
  const c = content.kontakt
  // Otevírací doba z BE (fallback content.ts)
  const { data: hours } = useOpeningHours()
  return (
    <Box sx={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
      <Seo path="/kontakt" title={SEO['/kontakt'].title} description={SEO['/kontakt'].description} />
      <JsonLd data={localBusinessJsonLd()} />
      <WaveDecor
        variant="vertical"
        sx={{
          position: 'absolute',
          zIndex: 0,
          width: { xs: '116px', wide: vw(252) },
          top: { xs: '474px', wide: '-6px' },
          left: { xs: 'auto', wide: vw(130) },
          right: { xs: '-4px', wide: 'auto' },
        }}
      />

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          pl: { xs: mobilePl, wide: desktopPl },
          pr: { xs: '36px', wide: '36px' },
          pb: { xs: '94px', wide: vw(140) },
        }}
      >
        <Logo width={fluid(156, 196)} sx={{ mt: { xs: '74px', wide: vw(139) } }} />
        {/* Návrh na stránce nadpis nemá – h1 je vizuálně skrytý */}
        <Box component="h1" sx={visuallyHidden}>
          {c.heading}
        </Box>

        <Grid
          container
          rowSpacing={{ xs: '55px', wide: vw(108) }}
          sx={{ mt: { xs: '63px', wide: vw(121) }, maxWidth: { xs: `${MOBILE_BLOCK_WIDTH}px`, wide: vw(BLOCK_WIDTH) } }}
        >
          {/* Pořadí odpovídá mobilnímu layoutu; na desktopu řádkové plnění vytvoří 2 sloupce */}
          <Grid size={{ xs: 12, wide: 6 }}>
            <ContactGroup
              label={c.reservation.label}
              lines={[
                { label: c.reservation.phone, href: telHref(c.reservation.phone) },
                { label: c.reservation.email, href: mailHref(c.reservation.email) },
              ]}
            />
          </Grid>
          <Grid size={{ xs: 12, wide: 6 }}>
            <ContactGroup label={c.address.label} lines={c.address.lines} />
          </Grid>
          <Grid size={{ xs: 12, wide: 6 }}>
            <ContactGroup label={c.hours.label} lines={hours.lines} />
          </Grid>
          <Grid size={{ xs: 12, wide: 6 }}>
            <ContactGroup label={c.operator.label} lines={c.operator.lines} variant="small" />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
