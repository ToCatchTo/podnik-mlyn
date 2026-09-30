import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
// Fonty bundlované lokálně (ne z CDN)
import '@fontsource/bricolage-grotesque/400.css'
import '@fontsource/bricolage-grotesque/500.css'
import '@fontsource/inter/400.css'
import App from '@/App'
import theme from '@/theme/theme'

// Vstupní bod aplikace – React, MUI motiv a routing
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      {/* CssBaseline sjednotí výchozí styly napříč prohlížeči */}
      <CssBaseline />
      {/* future: chování React Routeru v7 zapnuté předem (bez varování v konzoli) */}
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
