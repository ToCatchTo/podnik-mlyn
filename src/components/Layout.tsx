import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MenuOverlay from '@/components/MenuOverlay'
import { colors, layout } from '@/theme/tokens'

// Sdílený layout všech stránek: zelené pozadí, hlavička (menu), obsah, patička a překryvné menu.
// Obsah má min. výšku celého viewportu a spodní odsazení o výšku patičky; patička leží
// absolutně přes spodní okraj stránky (HP se tak vejde přesně do okna bez scrollování).
export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: colors.green,
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      <Header onOpenMenu={() => setMenuOpen(true)} />

      {/* Hlavní obsah – vyplní minimálně celý viewport, dole místo pro patičku */}
      <Box
        component="main"
        sx={{
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          pb: `${layout.footerHeight}px`,
        }}
      >
        <Outlet />
      </Box>

      <Footer />

      {/* key resetuje stav při přechodu na jinou stránku (menu se zavře) */}
      <MenuOverlay key={location.pathname} open={menuOpen} onClose={() => setMenuOpen(false)} />
    </Box>
  )
}
