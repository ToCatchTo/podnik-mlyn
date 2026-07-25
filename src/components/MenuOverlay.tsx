import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import ButtonBase from '@mui/material/ButtonBase'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import { fluid } from '@/utils/fluid'
import { colors } from '@/theme/tokens'
import { text } from '@/theme/textStyles'
import content from '@/content/content'

// Rozbalené menu. Desktop: krémový panel vpravo (35,2 % šířky). Mobil: přes celou obrazovku.
// Položky zelené na krémovém pozadí, zavírací křížek.
interface MenuOverlayProps {
  open: boolean
  onClose: () => void
}

export default function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  // Seznam položek menu (sdílený pro obě varianty)
  const items = (
    <Stack sx={{ gap: fluid(15, 23) }}>
      {content.menu.items.map((item, i) => (
        <ButtonBase
          key={`${item.label}-${i}`}
          component={Link}
          to={item.to}
          onClick={onClose}
          disableRipple
          sx={{ ...text.menuItem, justifyContent: 'flex-start', cursor: 'pointer', width: 'fit-content' }}
        >
          {item.label}
        </ButtonBase>
      ))}
    </Stack>
  )

  // Zavírací křížek
  const closeButton = (
    <IconButton onClick={onClose} aria-label="Zavřít menu" sx={{ color: colors.green, p: 0 }}>
      <CloseIcon sx={{ fontSize: fluid(40, 64) }} />
    </IconButton>
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
    >
      {isDesktop ? (
        // DESKTOP: krémový panel vpravo
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            height: '100%',
            width: '35.2%',
            bgcolor: colors.cream,
            transform: open ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 300ms ease-out',
            pl: '20.4%', // vodorovně: % z šířky panelu (odpovídá návrhu)
            pt: '32vh', // svisle: % z výšky viewportu
          }}
        >
          {items}
          <Box sx={{ position: 'absolute', right: '14%', bottom: '16vh' }}>{closeButton}</Box>
        </Box>
      ) : (
        // MOBIL: krémový přes celou obrazovku (patička černá zůstává vidět dole)
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: fluid(40, 50),
            bgcolor: colors.cream,
            opacity: open ? 1 : 0,
            transition: 'opacity 250ms ease-out',
            pl: '17.4%', // vodorovně: % z šířky (odpovídá návrhu)
            pt: '30vh', // svisle: % z výšky viewportu
          }}
        >
          {items}
          <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: '20vh', display: 'flex', justifyContent: 'center' }}>
            {closeButton}
          </Box>
        </Box>
      )}
    </Box>
  )
}
