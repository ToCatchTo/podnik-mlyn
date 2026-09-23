import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import Logo from '@/components/Logo'
import ContactGroup from '@/components/ContactGroup'
import WaveDecor from '@/components/WaveDecor'
import { fluid } from '@/utils/fluid'
import { telHref, mailHref } from '@/utils/contactLinks'
import { useOpeningHours } from '@/hooks/useContent'
import content from '@/content/content'

// Stránka Kontakt – logo nahoře, pod ním dvousloupcový výpis kontaktních údajů (sloupce 552 px).
// Desktop: 2 sloupce (rezervace|adresa / otevírací doba|provozovatel), svislé vlny vlevo.
// Mobil: jeden sloupec, svislé vlny vpravo.
export default function Kontakt() {
  const c = content.kontakt
  // Otevírací doba z BE (fallback content.ts)
  const { data: hours } = useOpeningHours()
  return (
    <Box sx={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
      <WaveDecor
        variant="vertical"
        sx={{
          position: 'absolute',
          zIndex: 0,
          width: fluid(116, 252),
          top: { xs: '474px', md: '-6px' },
          left: { xs: 'auto', md: fluid(0, 130) },
          right: { xs: '-4px', md: 'auto' },
        }}
      />

      <Box sx={{ position: 'relative', zIndex: 1, pl: fluid(36, 554), pr: fluid(36, 262), pb: fluid(94, 140) }}>
        <Logo width={fluid(156, 196)} sx={{ mt: fluid(74, 139) }} />

        <Grid container rowSpacing={fluid(55, 108)} sx={{ mt: fluid(63, 121), maxWidth: fluid(318, 1104) }}>
          {/* Pořadí odpovídá mobilnímu layoutu; na desktopu řádkové plnění vytvoří 2 sloupce */}
          <Grid size={{ xs: 12, md: 6 }}>
            <ContactGroup
              label={c.reservation.label}
              lines={[
                { label: c.reservation.phone, href: telHref(c.reservation.phone) },
                { label: c.reservation.email, href: mailHref(c.reservation.email) },
              ]}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ContactGroup label={c.address.label} lines={c.address.lines} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ContactGroup label={c.hours.label} lines={hours.lines} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ContactGroup label={c.operator.label} lines={c.operator.lines} variant="small" />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
