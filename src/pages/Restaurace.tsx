import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import HeroBackground from '@/components/HeroBackground'
import IntroSection from '@/components/IntroSection'
import ArrowLink from '@/components/ArrowLink'
import ContactGroup from '@/components/ContactGroup'
import { fluid, vw, fitHeight } from '@/utils/fluid'
import { telHref, mailHref } from '@/utils/contactLinks'
import { useMenuLinks } from '@/hooks/useContent'
import Seo from '@/components/Seo'
import { text } from '@/theme/textStyles'
import { SEO } from '@/seo'
import content from '@/content/content'

// Stránka Restaurace – úvodní blok s fotkou, odkazy na menu a kontakt na rezervace.
export default function Restaurace() {
  const c = content.restaurace
  const { data: menuLinks } = useMenuLinks()
  return (
    <Box sx={{ position: 'relative', flex: 1 }}>
      <Seo path="/restaurace" title={SEO['/restaurace'].title} description={SEO['/restaurace'].description} />
      <HeroBackground />

      <IntroSection
        heading={c.heading}
        photoSrc="/images/restaurace_photo.webp"
        photoAlt={c.photoAlt}
        // Odkazy na PDF s menu (nové okno), adresy z BE; na desktopu vždy na první obrazovce.
        // Mezera mezi nimi je na desktopu omezená i výškou okna.
        links={
          <Stack sx={{ gap: { xs: '14px', wide: fitHeight(vw(38), 38) } }}>
            <ArrowLink label={c.lunchMenu} to={menuLinks.lunchMenuUrl} external textSx={text.subLink} smallGap />
            <ArrowLink label={c.permanentMenu} to={menuLinks.permanentMenuUrl} external textSx={text.subLink} smallGap />
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
