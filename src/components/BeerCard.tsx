import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { fluid } from '@/utils/fluid'
import { colors } from '@/theme/tokens'
import { text } from '@/theme/textStyles'

// Karta jednoho piva – zaoblený zelený box s obrázkem lahve, názvem, popisem a cenou.
// Rozměry a odsazení fluidně dle návrhu (mobil 153×309 → desktop 398×680).
// Popis roste (flexGrow), takže cena sedí u spodního okraje stejně ve všech kartách.
interface BeerCardProps {
  name: string
  description: string
  priceLabel: string
}

export default function BeerCard({ name, description, priceLabel }: BeerCardProps) {
  return (
    <Box
      sx={{
        bgcolor: colors.cardGreen,
        borderRadius: fluid(25, 55),
        pt: fluid(20, 51),
        px: fluid(16, 42),
        pb: fluid(14, 36),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
      }}
    >
      {/* Obrázek lahve (placeholder), poměr stran dle návrhu 315/410 */}
      <Box
        component="img"
        src="/images/beer_bottle.webp"
        alt={name}
        sx={{
          display: 'block',
          width: '100%',
          aspectRatio: '315 / 410',
          objectFit: 'cover',
          borderRadius: fluid(15, 34),
        }}
      />

      <Typography component="h3" sx={{ ...text.beerName, mt: fluid(13, 19) }}>
        {name}
      </Typography>
      {/* Popis je v návrhu o 13 px širší než lahev na každé straně (desktop) */}
      <Typography sx={{ ...text.beerDesc, mt: fluid(8, 14), mx: fluid(0, -13), flexGrow: 1, whiteSpace: 'pre-line' }}>
        {description}
      </Typography>
      <Typography sx={{ ...text.beerName, mt: fluid(11, 17) }}>{priceLabel}</Typography>
    </Box>
  )
}
