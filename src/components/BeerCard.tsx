import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { fluid } from '@/utils/fluid'
import { colors } from '@/theme/tokens'
import { text } from '@/theme/textStyles'
import PhotoPlaceholder from '@/components/PhotoPlaceholder'

// Karta jednoho piva – zaoblený zelený box s obrázkem lahve, názvem a popisem.
// Rozměry a odsazení fluidně dle návrhu (mobil 153×309 → desktop 398×656).
interface BeerCardProps {
  name: string
  desc: string
}

export default function BeerCard({ name, desc }: BeerCardProps) {
  return (
    <Box
      sx={{
        bgcolor: colors.cardGreen,
        borderRadius: fluid(25, 55),
        pt: fluid(20, 51),
        px: fluid(16, 42),
        pb: fluid(24, 55),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
      }}
    >
      {/* Obrázek lahve (placeholder), poměr stran dle návrhu 315/410 */}
      <Box
        sx={{
          width: '100%',
          aspectRatio: '315 / 410',
          borderRadius: fluid(15, 34),
          overflow: 'hidden',
        }}
      >
        <PhotoPlaceholder label="lahev" />
      </Box>

      <Typography component="h3" sx={{ ...text.beerName, mt: fluid(13, 19) }}>
        {name}
      </Typography>
      <Typography sx={{ ...text.beerDesc, mt: fluid(6, 10), whiteSpace: 'pre-line' }}>
        {desc}
      </Typography>
    </Box>
  )
}
