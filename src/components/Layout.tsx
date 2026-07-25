import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MenuOverlay from '@/components/MenuOverlay'
import { colors } from '@/theme/tokens'

// Sdílený layout všech stránek: zelené pozadí, hlavička (menu), obsah, patička a překryvné menu.
export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: colors.green,
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      <Header onOpenMenu={() => setMenuOpen(true)} />

      {/* Hlavní obsah – roste, aby patička byla u spodního okraje i na krátkých stránkách */}
      <Box component="main" sx={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <Outlet />
      </Box>

      <Footer />

      {/* key resetuje stav při přechodu na jinou stránku (menu se zavře) */}
      <MenuOverlay key={location.pathname} open={menuOpen} onClose={() => setMenuOpen(false)} />
    </Box>
  )
}
