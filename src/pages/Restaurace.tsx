import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import HeroBackground from '@/components/HeroBackground'
import IntroSection from '@/components/IntroSection'
import ArrowLink from '@/components/ArrowLink'
import ContactGroup from '@/components/ContactGroup'
import { fluid, vw, fitHeight } from '@/utils/fluid'
import { telHref, mailHref } from '@/utils/contactLinks'
import { useRestaurantMenus } from '@/hooks/useContent'
import Seo from '@/components/Seo'
import { text } from '@/theme/textStyles'
import { SEO } from '@/seo'
import type { MenuFile } from '@/api/types'
import content from '@/content/content'

// Stránka Restaurace – úvodní blok s fotkou, odkazy na menu a kontakt na rezervace.
// Fotka stránky – zatím stejná v pozadí i jako ostrá v úvodním bloku
const PHOTO_SRC = '/images/restaurace_photo.webp'

// Odkaz na soubor menu (PDF i obrázek se otevírají v nové kartě – prohlížeč obojí zobrazí sám,
// mimeType se nevyhodnocuje). Pod odkazem drobná poznámka obsluhy (např. týden platnosti).
function MenuLink({ label, file }: { label: string; file: MenuFile }) {
  return (
    <Box>
      <ArrowLink label={label} to={file.url} external textSx={text.subLink} smallGap />
      {file.note && <Typography sx={{ ...text.note, mt: fluid(4, 8) }}>{file.note}</Typography>}
    </Box>
  )
}

export default function Restaurace() {
  const c = content.restaurace
  // Soubory menu z API; slot bez nahraného souboru je null a odkaz se nevykreslí
  const menus = useRestaurantMenus()
  return (
    <Box sx={{ position: 'relative', flex: 1 }}>
      <Seo path="/restaurace" title={SEO['/restaurace'].title} description={SEO['/restaurace'].description} />
      <HeroBackground src={PHOTO_SRC} />

      <IntroSection
        heading={c.heading}
        photoSrc={PHOTO_SRC}
        photoAlt={c.photoAlt}
        // Odkazy na menu (nové okno); na desktopu vždy na první obrazovce.
        // Mezera mezi nimi je na desktopu omezená i výškou okna.
        links={
          <Stack sx={{ gap: { xs: '14px', wide: fitHeight(vw(38), 38) } }}>
            {menus.lunch && <MenuLink label={c.lunchMenu} file={menus.lunch} />}
            {menus.permanent && <MenuLink label={c.permanentMenu} file={menus.permanent} />}
          </Stack>
        }
      >
        {/* Kontakt na rezervace. Mobil: 87 px pod vlnou fotky (139 pod fotkou), hybrid 64 px pod
            fotkou, desktop 137 px pod odkazy */}
        <ContactGroup
          label={c.contactLabel}
          lines={[
            { label: c.phone, href: telHref(c.phone) },
            { label: c.email, href: mailHref(c.email) },
          ]}
          textSx={text.contactTextSmall}
          linesMt={fluid(20, 36)}
          sx={{ mt: { xs: '139px', md: '64px', wide: vw(137) }, pb: { xs: '90px', wide: vw(81) } }}
        />
      </IntroSection>
    </Box>
  )
}
