import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import App from '@/App'
import theme from '@/theme/theme'

// Vstupní bod aplikace – připojení Reactu do #root a obalení MUI motivem
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      {/* CssBaseline sjednotí výchozí styly napříč prohlížeči */}
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
