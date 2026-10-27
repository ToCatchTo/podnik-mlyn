import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { fluid, vw } from '@/utils/fluid'
import { colors } from '@/theme/tokens'
import { text } from '@/theme/textStyles'
import { hoverDarken } from '@/theme/interactions'
import content from '@/content/content'

// Mimořádná událost na domovské stránce (titulek + HTML text z administrace). Při zavření se do
// localStorage uloží `version`; lightbox se znovu ukáže, až když přijde jiná verze (nová zpráva,
// nebo ji obsluha vypnula a zapnula). Zavírá se křížkem nebo klávesou Escape.
const STORAGE_KEY = 'specialEventDismissed'

interface LightboxProps {
  title: string
  html: string
  version: string
}

function readDismissedVersion(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export default function Lightbox({ title, html, version }: LightboxProps) {
  const [open, setOpen] = useState(() => readDismissedVersion() !== version)

  const close = () => {
    setOpen(false)
    try {
      localStorage.setItem(STORAGE_KEY, version)
    } catch {
      // localStorage nemusí být dostupné (soukromý režim) – oznámení se jen zavře
    }
  }

  // Zavření klávesou Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (!open) return null

  return (
    // Plocha přes celý viewport, neblokuje klikání mimo box
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 1200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: { xs: 'flex-start', md: 'center' },
        pt: { xs: '193px', md: 0 },
        pointerEvents: 'none',
      }}
    >
      {/* Krémový box: mobil 328 × 508, desktop 1120 × 620 proporčně k šířce okna, s minimem
          540 × 320, nikdy širší než okno − 62. Výška je minimum – delší text box natáhne, nejvýš
          však na výšku okna (pak se text uvnitř scrolluje). Krytí 95 % */}
      <Box
        role="dialog"
        aria-labelledby="special-event-title"
        sx={{
          position: 'relative',
          pointerEvents: 'auto',
          width: { xs: 'calc(100% - 62px)', md: `min(max(540px, ${vw(1120)}), calc(100% - 62px))` },
          minHeight: { xs: 'min(508px, calc(100dvh - 233px))', md: `min(max(320px, ${vw(620)}), calc(100dvh - 120px))` },
          maxHeight: { xs: 'calc(100dvh - 233px)', md: 'calc(100dvh - 120px)' },
          bgcolor: colors.cream,
          opacity: 0.95,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Scrollovatelný obsah; při kratším textu vycentrovaný (margin auto) */}
        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            px: { xs: fluid(26, 40), md: `max(${fluid(26, 40)}, ${vw(130)})` },
            pt: { xs: '60px', md: `max(60px, ${vw(80)})` },
            // Mobil: pod textem je v toku křížek, desktop: křížek je absolutně v rohu
            pb: { xs: '20px', md: `max(60px, ${vw(80)})` },
          }}
        >
          <Box sx={{ my: 'auto' }}>
            <Typography id="special-event-title" component="h2" sx={text.lightboxText}>
              {title}
            </Typography>
            {/* HTML z editoru v administraci (odstavce, tučné, odkazy). Zdroj je vlastní
                důvěryhodná administrace, proto se nesanitizuje. */}
            <Box
              sx={{
                ...text.lightboxBody,
                mt: fluid(20, 32),
                '& p': { m: 0 },
                '& p + p': { mt: fluid(10, 16) },
                '& strong, & b': { fontWeight: 500 },
                '& a': {
                  ...hoverDarken(),
                  color: 'inherit',
                  textDecoration: 'underline',
                  textUnderlineOffset: '0.12em',
                  textDecorationThickness: '0.05em',
                },
              }}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </Box>
        </Box>

        {/* Křížek: desktop vpravo nahoře (60 / 55 px proporčně, min. 20 px), mobil dole na střed
            (34 px od spodku) */}
        <ButtonBase
          onClick={close}
          aria-label={content.lightbox.close}
          sx={{
            ...hoverDarken(),
            position: { xs: 'relative', md: 'absolute' },
            flexShrink: 0,
            width: 50,
            height: 50,
            top: { xs: 'auto', md: `max(20px, ${vw(60)})` },
            right: { xs: 'auto', md: `max(20px, ${vw(55)})` },
            alignSelf: { xs: 'center', md: 'auto' },
            mb: { xs: '34px', md: 0 },
          }}
        >
          <Box component="img" src="/icons/close.svg" alt="" sx={{ width: 50, height: 50 }} />
        </ButtonBase>
      </Box>
    </Box>
  )
}
