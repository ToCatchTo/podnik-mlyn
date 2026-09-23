import Box from '@mui/material/Box'
import HeroBackground from '@/components/HeroBackground'
import IntroSection from '@/components/IntroSection'
import ArrowLink from '@/components/ArrowLink'
import BeerCard from '@/components/BeerCard'
import { fluid } from '@/utils/fluid'
import { text } from '@/theme/textStyles'
import { priceLabel } from '@/utils/format'
import { useBeers } from '@/hooks/useContent'
import content from '@/content/content'

// Stránka Pivovar – úvodní blok s fotkou a odkaz "nabídka piva", pod ním mřížka karet s pivem
// (mobil 2 sloupce, desktop 3 sloupce). Karty se načítají z BE (fallback content.ts).
export default function Pivovar() {
  const c = content.pivovar
  const { data: beers } = useBeers()

  // Plynulé odscrollování na nabídku piva
  const scrollToOffer = () => {
    document.getElementById(c.offerAnchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <Box sx={{ position: 'relative', flex: 1 }}>
      <HeroBackground variant="top" />

      <IntroSection heading={c.heading} photoSrc="/images/pivovar_photo.webp" photoAlt={c.photoAlt}>
        <ArrowLink
          label={c.offerLink}
          to={`#${c.offerAnchor}`}
          direction="down"
          textSx={text.subLink}
          onClick={scrollToOffer}
        />
      </IntroSection>

      {/* Nabídka piva – karty: mobil 2 sloupce (mezera 11), desktop 3 sloupce (mezera 85).
          Výjimka z MUI Grid: CSS grid s gridAutoRows 1fr srovná výšku všech karet podle nejvyšší
          (text z BE může být různě dlouhý). */}
      <Box
        id={c.offerAnchor}
        sx={{ position: 'relative', zIndex: 1, px: fluid(37, 278), pt: fluid(147, 70), pb: fluid(218, 128) }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gridAutoRows: '1fr',
            columnGap: fluid(11, 85),
            rowGap: fluid(50, 55),
          }}
        >
          {beers.map((beer, i) => (
            <BeerCard key={i} name={beer.name} description={beer.description} priceLabel={priceLabel(beer)} />
          ))}
        </Box>
      </Box>
    </Box>
  )
}
