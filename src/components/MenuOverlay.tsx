import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import ButtonBase from '@mui/material/ButtonBase'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import { fluid } from '@/utils/fluid'
import { colors } from '@/theme/tokens'
import { text } from '@/theme/textStyles'
import { hoverDarken } from '@/theme/interactions'
import { useMenuLinks } from '@/hooks/useContent'
import content from '@/content/content'

// Rozbalené menu. Desktop: krémový panel vpravo (830 px z 1920, přes celou výšku vč. patičky).
// Mobil: krémová plocha přes celou obrazovku, patička zůstává vidět.
interface MenuOverlayProps {
  open: boolean
  onClose: () => void
}

export default function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  // Odkaz na polední menu (PDF z BE)
  const { data: menuLinks } = useMenuLinks()

  // Seznam položek menu (sdílený pro obě varianty); 'lunchMenu' je externí PDF v novém okně
  const itemSx = { ...text.menuItem, ...hoverDarken(), justifyContent: 'flex-start', cursor: 'pointer', width: 'fit-content' }
  const items = (
    <Stack sx={{ gap: fluid(13, 15) }}>
      {content.menu.items.map((item, i) =>
        item.to === 'lunchMenu' ? (
          <ButtonBase
            key={`${item.label}-${i}`}
            component="a"
            href={menuLinks.lunchMenuUrl}
            target="_blank"
            rel="noreferrer"
            onClick={onClose}
            disableRipple
            sx={itemSx}
          >
            {item.label}
          </ButtonBase>
        ) : (
          <ButtonBase key={`${item.label}-${i}`} component={Link} to={item.to} onClick={onClose} disableRipple sx={itemSx}>
            {item.label}
          </ButtonBase>
        ),
      )}
    </Stack>
  )

  // Zavírací křížek 50 × 50 (ikona z návrhu)
  const closeButton = (
    <ButtonBase onClick={onClose} aria-label={content.nav.closeMenu} sx={{ ...hoverDarken(), width: 50, height: 50 }}>
      <Box component="img" src="/icons/close.svg" alt="" sx={{ width: 50, height: 50 }} />
    </ButtonBase>
  )

  // Společné pozadí přes celý viewport (kvůli plynulému fade a zachycení kliknutí mimo panel)
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 1300,
        overflow: 'hidden',
        // Zavřené menu je zcela skryté (nezasahuje do layoutu ani screenshotů)
        opacity: open ? 1 : 0,
        visibility: open ? 'visible' : 'hidden',
        transition: 'opacity 250ms ease, visibility 250ms ease',
        pointerEvents: open ? 'auto' : 'none',
      }}
      aria-hidden={!open}
      onClick={onClose}
    >
      {isDesktop ? (
        // DESKTOP: krémový panel vpravo, položky 175 px od levého okraje panelu (x = 1265), první 327 px shora.
        // Šířka panelu je odvozená od pozice odkazů na HP (50vw + fluid(0,146), viz Home.tsx),
        // aby je vždy zakryl a přesahoval ještě 40 px vlevo za ně (na 1920 = 854 px).
        // Procenta u paddingu se počítají z šířky overlaye (ne panelu), proto vw.
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            height: '100%',
            width: `max(320px, calc(50vw - ${fluid(0, 146)} + 40px))`,
            bgcolor: colors.cream,
            transform: open ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 300ms ease-out',
            pl: 'clamp(70px, 9.115vw, 175px)',
            pt: 'clamp(120px, 30.3vh, 327px)',
          }}
        >
          {items}
          <Box sx={{ position: 'absolute', left: '47%', top: 'min(853px, 79vh)' }}>{closeButton}</Box>
        </Box>
      ) : (
        // MOBIL: krémová plocha přes celou obrazovku, položky 68 px zleva, první 242 px shora, křížek na střed
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            position: 'absolute',
            inset: 0,
            bgcolor: colors.cream,
            opacity: open ? 1 : 0,
            transition: 'opacity 250ms ease-out',
            pl: '68px',
            pt: 'clamp(120px, 28.7vh, 242px)',
          }}
        >
          {items}
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 'min(689px, 81.6vh)',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {closeButton}
          </Box>
        </Box>
      )}
    </Box>
  )
}
