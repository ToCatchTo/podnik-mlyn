import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import { fluid } from '@/utils/fluid'
import { text } from '@/theme/textStyles'
import { hoverDarken } from '@/theme/interactions'
import content from '@/content/content'

// Hlavička – odkaz "menu" vpravo nahoře (otevírá rozbalené menu). Pozicovaná absolutně
// přes obsah stránky. Odsazení shora/vpravo fluidně dle návrhu (mobil 390 → desktop 1920).
interface HeaderProps {
  onOpenMenu: () => void
}

export default function Header({ onOpenMenu }: HeaderProps) {
  return (
    <Box
      component="header"
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        display: 'flex',
        justifyContent: 'flex-end',
        pt: fluid(74, 111),
        pr: fluid(40, 280),
        pointerEvents: 'none', // klikací je jen samotný odkaz
      }}
    >
      <ButtonBase
        onClick={onOpenMenu}
        disableRipple
        sx={{ ...text.navMenu, ...hoverDarken(), pointerEvents: 'auto', cursor: 'pointer' }}
        aria-label={content.nav.openMenu}
      >
        {content.nav.menu}
      </ButtonBase>
    </Box>
  )
}
