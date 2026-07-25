import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import HeroBackground from '@/components/HeroBackground'
import Logo from '@/components/Logo'
import ContactGroup from '@/components/ContactGroup'
import VerticalWave from '@/components/VerticalWave'
import { fluid } from '@/utils/fluid'
import { colors } from '@/theme/tokens'
import content from '@/content/content'

// Stránka Kontakt – logo nahoře, pod ním dvousloupcový výpis kontaktních údajů.
// Desktop: 2 sloupce (rezervace|adresa / otevírací doba|provozovatel).
// Mobil: jeden sloupec v pořadí rezervace, adresa, otevírací doba, provozovatel.
export default function Kontakt() {
  const c = content.kontakt
  return (
    <Box sx={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <HeroBackground />

      {/* Svislá dekorativní vlnka – desktop vlevo, mobil vpravo */}
      <VerticalWave
        color={colors.cardGreen}
        sx={{
          position: 'absolute',
          zIndex: 1,
          top: fluid(30, 30),
          height: fluid(500, 780),
          width: fluid(40, 60),
          left: { xs: 'auto', md: fluid(70, 90) },
          right: { xs: fluid(20, 20), md: 'auto' },
        }}
      />

      <Box sx={{ position: 'relative', zIndex: 1, pl: fluid(36, 554), pr: fluid(36, 322), pt: fluid(74, 138), pb: fluid(40, 80) }}>
        <Logo size={fluid(120, 130)} />

        <Grid
          container
          columnSpacing={{ xs: 0, md: 7.5 }}
          rowSpacing={{ xs: 7, md: 8 }}
          sx={{ mt: fluid(133, 200) }}
        >
          {/* Pořadí odpovídá mobilnímu layoutu; na desktopu řádkové plnění vytvoří 2 sloupce */}
          <Grid size={{ xs: 12, md: 6 }}>
            <ContactGroup
              label={c.reservation.label}
              lines={[c.reservation.phone, c.reservation.email]}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ContactGroup label={c.address.label} lines={c.address.lines} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ContactGroup label={c.hours.label} lines={c.hours.lines} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ContactGroup label={c.operator.label} lines={c.operator.lines} variant="small" />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
