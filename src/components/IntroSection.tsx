import { useLayoutEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Logo from '@/components/Logo'
import WaveDecor from '@/components/WaveDecor'
import { fluid, vw, fitHeight } from '@/utils/fluid'
import { text } from '@/theme/textStyles'
import content from '@/content/content'

// Horní blok stránek Restaurace a Pivovar: vlevo logo, nadpis, úvod a odkazy (children),
// vpravo fotka (desktop vždy na celou výšku okna). Když je obsah pod sebou (mobil, hybrid),
// následuje fotka až za odkazy (na mobilu s vlnou), další obsah (children) až pod ní.
// Desktopový layout začíná až od breakpointu 'wide' (900px) – pod ním by se text a fotka mačkaly.
// Mezi 'md' (600) a 'wide' je hybrid: obsah pod sebou jako na mobilu, ale v bloku na střed
// (max. 600 px, text zleva), fotka na šířku bez vlny.
// Sloupce mají šířky přesně dle návrhu (1106 + 814 z 1920). Svislé mezery v levém sloupci se na
// desktopu škálují čistě proporčně k šířce okna vůči návrhu 1920 (vw), na mobilu mají pevné hodnoty.
//
// První obrazovka na desktopu: logo, nadpis, úvod a odkazy (links) se musí vejít do výšky okna,
// aby byly odkazy vidět hned po příchodu na stránku. Dvě opatření:
// 1) logo, písmo i mezery se v okně nižším než návrh (poměr 1920 × 1080) zmenšují proporčně
//    k výšce okna (fitHeight) – blok se chová jako zmenšený návrh;
// 2) blok je od 'wide' flex sloupec s max. výškou okna a svislé mezery v něm jsou pružné –
//    když se obsah ani tak nevejde (užší okno = víc řádků úvodu), stáhnou se až na své minimum (Gap).
// Ve vysokém okně zůstává vše přesně podle návrhu.
const HYBRID_MAX_WIDTH = 600
// Rezerva pod odkazy k dolnímu okraji okna (px v návrhu 1920). Další obsah (children) ji
// záporným okrajem vrací zpět, takže jeho vzdálenost od odkazů odpovídá návrhu.
const FOLD_RESERVE = 40

interface IntroSectionProps {
  heading: string
  photoSrc: string
  photoAlt: string
  // Odkazy pod úvodem (menu / nabídka piva) – na desktopu vždy na první obrazovce;
  // na mobilu a v hybridu jsou před fotkou
  links: ReactNode
  // Další obsah pod odkazy (kontakt) – už se na první obrazovku vejít nemusí;
  // na mobilu a v hybridu následuje až za fotkou
  children?: ReactNode
}

// Svislá mezera. Mobil (xs) a hybrid (md) mají pevnou výšku; na desktopu ('wide') je to pružná
// položka flex sloupce: výchozí výška z návrhu (wide, px v návrhu 1920 × 1080 – škáluje se
// šířkou i výškou okna), při nedostatku místa se stáhne nejvýš na wideMin.
// Všechny mezery se stahují úměrně své velikosti.
interface GapProps {
  xs: string
  md?: string
  wide: number
  wideMin?: number
}

function Gap({ xs, md, wide, wideMin = wide }: GapProps) {
  return (
    <Box
      aria-hidden
      sx={{
        height: { xs, ...(md !== undefined && { md }), wide: 'auto' },
        flex: { wide: `0 1 ${fitHeight(vw(wide), wide)}` },
        minHeight: { wide: fitHeight(vw(wideMin), wideMin) },
      }}
    />
  )
}

export default function IntroSection({ heading, photoSrc, photoAlt, links, children }: IntroSectionProps) {
  // Pojistka pro velmi nízké okno: když se první obrazovka nevejde ani s mezerami na minimu,
  // obsah z bloku (max. výška okna) přeteče. Obal proto dostane min. výšku podle skutečné výšky
  // obsahu, aby přetečený obsah nepřekryl to, co následuje pod ním.
  const foldWrapperRef = useRef<HTMLDivElement>(null)
  const foldRef = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const wrapper = foldWrapperRef.current
    const fold = foldRef.current
    if (!wrapper || !fold) return
    const sync = () => {
      wrapper.style.minHeight = `${fold.scrollHeight}px`
    }
    const observer = new ResizeObserver(sync)
    observer.observe(fold)
    Array.from(fold.children).forEach((child) => observer.observe(child))
    sync()
    return () => observer.disconnect()
  }, [])

  return (
    <Grid container columns={1920} sx={{ position: 'relative', zIndex: 1, alignItems: 'flex-start' }}>
      {/* Levý obsahový sloupec. Hybrid (md–wide): obsah v bloku max. 600 px na střed, text zleva */}
      <Grid
        size={{ xs: 1920, wide: 1106 }}
        sx={{ pl: { xs: '36px', wide: vw(278) }, pr: { xs: '36px', wide: vw(40) } }}
      >
        <Box sx={{ maxWidth: { xs: 'none', md: `${HYBRID_MAX_WIDTH}px`, wide: 'none' }, mx: { md: 'auto', wide: 0 } }}>
          <Box ref={foldWrapperRef}>
            {/* První obrazovka: na desktopu flex sloupec nejvýš na výšku okna, mezery (Gap) pružné */}
            <Box
              ref={foldRef}
              sx={{ display: { xs: 'block', wide: 'flex' }, flexDirection: 'column', maxHeight: { wide: '100dvh' } }}
            >
              <Gap xs="74px" wide={139} wideMin={56} />
              <Logo width={{ xs: fluid(156, 196), wide: fitHeight(fluid(156, 196), 196, 110) }} sx={{ flexShrink: 0 }} />

              <Gap xs="41px" wide={114} wideMin={40} />
              <Typography
                component="h1"
                sx={{ ...text.sectionHeading, flexShrink: 0, maxWidth: { xs: '318px', md: 'none', wide: fluid(318, 765) } }}
              >
                {heading}
              </Typography>

              <Gap xs="29px" wide={29} wideMin={16} />
              <Typography sx={{ ...text.intro, flexShrink: 0, maxWidth: { xs: '318px', md: 'none', wide: fluid(318, 765) } }}>
                {content.intro}
              </Typography>

              {/* Odkazy jsou vždy hned pod úvodem, tedy i na mobilu a v hybridu před fotkou:
                  mobil a hybrid 40 px pod úvodem, desktop 50 px (v nízkém okně méně) a s rezervou
                  nad dolním okrajem okna */}
              <Gap xs="40px" wide={50} wideMin={24} />
              <Box sx={{ flexShrink: 0 }}>{links}</Box>

              {/* Fotka pod odkazy – mobil a hybrid (na desktopu je v pravém sloupci), přes celou šířku okna.
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
              <Box aria-hidden sx={{ display: { xs: 'none', wide: 'block' }, flexShrink: 0, height: vw(FOLD_RESERVE) }} />
            </Box>
          </Box>

          {/* Další obsah pod odkazy (mobil a hybrid: pod fotkou); na desktopu záporný okraj ruší
              rezervu první obrazovky */}
          {children && <Box sx={{ mt: { wide: vw(-FOLD_RESERVE) } }}>{children}</Box>}
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
