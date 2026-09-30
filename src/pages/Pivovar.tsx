import Box from '@mui/material/Box'
import HeroBackground from '@/components/HeroBackground'
import IntroSection from '@/components/IntroSection'
import ArrowLink from '@/components/ArrowLink'
import BeerCard from '@/components/BeerCard'
import { vw } from '@/utils/fluid'
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

      {/* Nabídka piva – karty: mobil 2 sloupce (mezera 11), od 600 px 3 sloupce; hybrid (600–899)
          v bloku max. 600 px na střed (stejně jako úvodní text), desktop mezera 85 proporčně.
          Výjimka z MUI Grid: CSS grid s gridAutoRows 1fr srovná výšku všech karet podle nejvyšší
          (text z BE může být různě dlouhý). */}
      <Box
        id={c.offerAnchor}
        sx={{
          position: 'relative',
          zIndex: 1,
          px: { xs: '37px', md: '36px', wide: vw(278) },
          pt: { xs: '147px', md: '100px', wide: vw(70) },
          pb: { xs: '218px', md: '140px', wide: vw(128) },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gridAutoRows: '1fr',
            columnGap: { xs: '11px', md: '24px', wide: vw(85) },
            rowGap: { xs: '50px', wide: vw(55) },
            maxWidth: { xs: 'none', md: '600px', wide: 'none' },
            mx: { md: 'auto', wide: 0 },
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
