import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { fluid } from '@/utils/fluid'
import { colors } from '@/theme/tokens'
import { text } from '@/theme/textStyles'
import { hoverDarken } from '@/theme/interactions'
import content from '@/content/content'

// Oznámení na domovské stránce (text z BE, řádky oddělené \n). Zobrazí se jednou za relaci
// prohlížeče (stav v sessionStorage), zavírá se křížkem nebo klávesou Escape.
const STORAGE_KEY = 'lightbox_dismissed'

interface LightboxProps {
  text: string
}

function readDismissed(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

export default function Lightbox({ text: message }: LightboxProps) {
  const [open, setOpen] = useState(() => !readDismissed())
  const lines = message.split('\n').filter((line) => line.trim() !== '')

  const close = () => {
    setOpen(false)
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // sessionStorage nemusí být dostupné (soukromý režim) – oznámení se jen zavře
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
      {/* Krémový box: mobil 328 × 508, desktop 1120 × 620, krytí 95 % */}
      <Box
        role="dialog"
        aria-label={lines.join(' ')}
        sx={{
          position: 'relative',
          pointerEvents: 'auto',
          width: { xs: 'calc(100% - 62px)', md: 'min(1120px, calc(100% - 62px))' },
          height: fluid(508, 620),
          bgcolor: colors.cream,
          opacity: 0.95,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: fluid(26, 40),
        }}
      >
        <Typography component="p" sx={text.lightboxText}>
          {lines.map((line, i) => (
            <Box component="span" key={i} sx={{ display: 'block' }}>
              {line}
            </Box>
          ))}
        </Typography>

        {/* Křížek: desktop vpravo nahoře (60 / 55 px), mobil dole na střed (34 px od spodku) */}
        <ButtonBase
          onClick={close}
          aria-label={content.lightbox.close}
          sx={{
            ...hoverDarken(),
            position: 'absolute',
            width: 50,
            height: 50,
            top: { xs: 'calc(100% - 84px)', md: '60px' },
            right: { xs: 'auto', md: '55px' },
            left: { xs: '50%', md: 'auto' },
            transform: { xs: 'translateX(-50%)', md: 'none' },
          }}
        >
          <Box component="img" src="/icons/close.svg" alt="" sx={{ width: 50, height: 50 }} />
        </ButtonBase>
      </Box>
    </Box>
  )
}
