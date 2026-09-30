import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import Restaurace from '@/pages/Restaurace'
import Pivovar from '@/pages/Pivovar'
import Kontakt from '@/pages/Kontakt'

// Kořenová komponenta – definuje routy jednotlivých stránek uvnitř sdíleného Layoutu.
// Neznámá adresa přesměruje na domovskou stránku.
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/restaurace" element={<Restaurace />} />
        <Route path="/pivovar" element={<Pivovar />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
