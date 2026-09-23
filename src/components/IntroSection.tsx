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
// Sloupce mají šířky přesně dle návrhu (1106 + 814 z 1920). Svislé mezery v levém sloupci se na
// desktopu škálují čistě proporčně k šířce okna vůči návrhu 1920 (vw), na mobilu mají pevné hodnoty.
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
      {/* Levý obsahový sloupec */}
      <Grid size={{ xs: 1920, md: 1106 }} sx={{ pl: fluid(36, 278), pr: { xs: '36px', md: '40px' } }}>
        <Logo width={fluid(156, 196)} sx={{ mt: { xs: '74px', md: vw(139) } }} />

        <Typography
          component="h1"
          sx={{ ...text.sectionHeading, mt: { xs: '41px', md: vw(114) }, maxWidth: fluid(318, 765) }}
        >
          {heading}
        </Typography>

        <Typography sx={{ ...text.intro, mt: { xs: '29px', md: vw(29) }, maxWidth: fluid(318, 765) }}>
          {content.intro}
        </Typography>

        {/* Fotka s vlnou – jen na mobilu (na desktopu je v pravém sloupci), přes celou šířku */}
        <Box
          sx={{
            display: { xs: 'block', md: 'none' },
            position: 'relative',
            width: '100vw',
            ml: 'calc(50% - 50vw)', // full-bleed přes padding sloupce
            mt: '64px',
            aspectRatio: '390 / 514',
          }}
        >
          <Box
            component="img"
            src={photoSrc}
            alt={photoAlt}
            sx={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {/* Vlna překrývá spodní okraj fotky o 39 px a přesahuje 52 px pod ni */}
          <WaveDecor
            variant="horizontal"
            sx={{ position: 'absolute', left: '-1px', top: 'calc(100% - 39px)', width: '101%' }}
          />
        </Box>

        {/* Odkazy a další obsah: mobil 87 px pod vlnou (139 pod fotkou), desktop 77 px pod úvodem */}
        <Box sx={{ mt: { xs: '139px', md: vw(50) } }}>{children}</Box>
      </Grid>

      {/* Dekorativní vlna vlevo dole – jen desktop. Z obrázku (543 × 126) je vidět jen pravá část:
          obal má viditelnou šířku max. 231 px (níž proporčně k šířce okna) a obrázek je v něm
          zarovnaný k pravému okraji. Spodní okraj vlny je 10 px nad spodním okrajem okna. */}
      <Box
        aria-hidden
        sx={{
          display: { xs: 'none', md: 'block' },
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
      <Grid size={{ md: 814 }} sx={{ display: { xs: 'none', md: 'block' } }}>
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
