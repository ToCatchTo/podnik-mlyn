import Box from '@mui/material/Box'
import HeroBackground from '@/components/HeroBackground'
import IntroSection from '@/components/IntroSection'
import ArrowLink from '@/components/ArrowLink'
import BeerCard from '@/components/BeerCard'
import { vw } from '@/utils/fluid'
import Seo from '@/components/Seo'
import { text, visuallyHidden } from '@/theme/textStyles'
import { SEO } from '@/seo'
import { priceLabel } from '@/utils/format'
import { useBeers } from '@/hooks/useContent'
import content from '@/content/content'

// Stránka Pivovar – úvodní blok s fotkou a odkaz "nabídka piva", pod ním mřížka karet s pivem
// (mobil 2 sloupce, desktop 3 sloupce). Karty přicházejí z API; dokud žádné nejsou (nenačtené,
// prázdný seznam, chyba), odkaz ani sekce s nabídkou se nevykreslí.
// Fotka stránky – zatím stejná v pozadí i jako ostrá v úvodním bloku
const PHOTO_SRC = '/images/pivovar_photo.webp'

export default function Pivovar() {
  const c = content.pivovar
  const beers = useBeers()
  const hasBeers = beers.length > 0

  // Plynulé odscrollování na nabídku piva
  const scrollToOffer = () => {
    document.getElementById(c.offerAnchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <Box sx={{ position: 'relative', flex: 1 }}>
      <Seo path="/pivovar" title={SEO['/pivovar'].title} description={SEO['/pivovar'].description} />
      <HeroBackground variant="top" src={PHOTO_SRC} />

      <IntroSection
        heading={c.heading}
        photoSrc={PHOTO_SRC}
        photoAlt={c.photoAlt}
        links={
          hasBeers && (
            <ArrowLink
              label={c.offerLink}
              to={`#${c.offerAnchor}`}
              direction="down"
              textSx={text.subLink}
              onClick={scrollToOffer}
            />
          )
        }
      />

      {/* Nabídka piva – karty: mobil 2 sloupce (mezera 11), od 600 px 3 sloupce; hybrid (600–899)
          v bloku max. 600 px na střed (stejně jako úvodní text), desktop mezera 85 proporčně.
          Výjimka z MUI Grid: CSS grid s gridAutoRows 1fr srovná výšku všech karet podle nejvyšší
          (text z BE může být různě dlouhý). */}
      {hasBeers && (
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
          {/* Vizuálně skrytý h2, aby názvy piv (h3) nenavazovaly přímo na h1 */}
          <Box component="h2" sx={visuallyHidden}>
            {c.offerLink}
          </Box>
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
            {beers.map((beer) => (
              <BeerCard
                key={beer.id}
                name={beer.name}
                description={beer.text ?? ''}
                imageSrc={beer.image ?? c.beerFallbackImage}
                priceLabel={priceLabel(beer)}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  )
}
