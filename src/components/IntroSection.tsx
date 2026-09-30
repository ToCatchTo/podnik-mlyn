import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Logo from '@/components/Logo'
import WaveDecor from '@/components/WaveDecor'
import { fluid, vw } from '@/utils/fluid'
import { text } from '@/theme/textStyles'
import content from '@/content/content'

// Horní blok stránek Restaurace a Pivovar: vlevo logo, nadpis, úvod a odkazy (children),
// vpravo fotka (desktop vždy na celou výšku okna). Na mobilu je fotka s vlnou vložená mezi úvod a odkazy.
// Desktopový layout začíná až od breakpointu 'wide' (900px) – pod ním by se text a fotka mačkaly.
// Mezi 'md' (600) a 'wide' je hybrid: obsah pod sebou jako na mobilu, ale v bloku na střed
// (max. 600 px, text zleva), fotka na šířku bez vlny.
// Sloupce mají šířky přesně dle návrhu (1106 + 814 z 1920). Svislé mezery v levém sloupci se na
// desktopu škálují čistě proporčně k šířce okna vůči návrhu 1920 (vw), na mobilu mají pevné hodnoty.
const HYBRID_MAX_WIDTH = 600
interface IntroSectionProps {
  heading: string
  photoSrc: string
  photoAlt: string
  // Obsah pod úvodem (odkazy, kontakt); na mobilu následuje až za fotkou
  children: ReactNode
}

export default function IntroSection({ heading, photoSrc, photoAlt, children }: IntroSectionProps) {
  return (
    <Grid container columns={1920} sx={{ position: 'relative', zIndex: 1, alignItems: 'flex-start' }}>
      {/* Levý obsahový sloupec. Hybrid (md–wide): obsah v bloku max. 600 px na střed, text zleva */}
      <Grid
        size={{ xs: 1920, wide: 1106 }}
        sx={{ pl: { xs: '36px', wide: vw(278) }, pr: { xs: '36px', wide: vw(40) } }}
      >
        <Box sx={{ maxWidth: { xs: 'none', md: `${HYBRID_MAX_WIDTH}px`, wide: 'none' }, mx: { md: 'auto', wide: 0 } }}>
          <Logo width={fluid(156, 196)} sx={{ mt: { xs: '74px', wide: vw(139) } }} />

          <Typography
            component="h1"
            sx={{ ...text.sectionHeading, mt: { xs: '41px', wide: vw(114) }, maxWidth: { xs: '318px', md: 'none', wide: fluid(318, 765) } }}
          >
            {heading}
          </Typography>

          <Typography sx={{ ...text.intro, mt: { xs: '29px', wide: vw(29) }, maxWidth: { xs: '318px', md: 'none', wide: fluid(318, 765) } }}>
            {content.intro}
          </Typography>

          {/* Fotka pod úvodem – mobil a hybrid (na desktopu je v pravém sloupci), přes celou šířku okna.
              Mobil: poměr 390/514 s vlnou přes spodní okraj; hybrid: na šířku 16:10, bez vlny. */}
          <Box
            sx={{
              display: { xs: 'block', wide: 'none' },
              position: 'relative',
              width: '100vw',
              ml: 'calc(50% - 50vw)', // full-bleed přes padding sloupce (sloupec i blok jsou symetrické)
              mt: '64px',
              aspectRatio: { xs: '390 / 514', md: '16 / 10' },
            }}
          >
            <Box
              component="img"
              src={photoSrc}
              alt={photoAlt}
              sx={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Vlna překrývá spodní okraj fotky o 39 px a přesahuje 52 px pod ni (jen mobil) */}
            <WaveDecor
              variant="horizontal"
              sx={{ display: { xs: 'block', md: 'none' }, position: 'absolute', left: '-1px', top: 'calc(100% - 39px)', width: '101%' }}
            />
          </Box>

          {/* Odkazy a další obsah: mobil 87 px pod vlnou (139 pod fotkou), hybrid 64 px pod fotkou,
              desktop 77 px pod úvodem */}
          <Box sx={{ mt: { xs: '139px', md: '64px', wide: vw(50) } }}>{children}</Box>
        </Box>
      </Grid>

      {/* Dekorativní vlna vlevo dole – jen desktop. Z obrázku (543 × 126) je vidět jen pravá část:
          obal má viditelnou šířku max. 231 px (níž proporčně k šířce okna) a obrázek je v něm
          zarovnaný k pravému okraji. Spodní okraj vlny je 10 px nad spodním okrajem okna. */}
      <Box
        aria-hidden
        sx={{
          display: { xs: 'none', wide: 'block' },
          position: 'absolute',
          left: 0,
          top: '100dvh',
          transform: 'translateY(calc(-100% - 10px))',
          width: `min(${vw(231)}, 231px)`,
          overflow: 'hidden',
          zIndex: -1,
        }}
      >
        <WaveDecor variant="horizontal" sx={{ width: `${(543 / 231) * 100}%`, ml: `${((231 - 543) / 231) * 100}%` }} />
      </Box>

      {/* Pravý sloupec – fotka (jen desktop), přesně na výšku okna, zarovnaná k hornímu a pravému okraji */}
      <Grid size={{ wide: 814 }} sx={{ display: { xs: 'none', wide: 'block' } }}>
        <Box
          component="img"
          src={photoSrc}
          alt={photoAlt}
          sx={{ display: 'block', width: '100%', height: '100dvh', objectFit: 'cover' }}
        />
      </Grid>
    </Grid>
  )
}
