import Box from '@mui/material/Box'
import PhotoPlaceholder from '@/components/PhotoPlaceholder'
import { colors } from '@/theme/tokens'

// Celoplošné fotopozadí s výrazným zeleným závojem (jako na HP / restaurace / pivovar v návrhu).
// Placeholder fotky se doplní finální fotografií.
export default function HeroBackground() {
  return (
    <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }} aria-hidden>
      <PhotoPlaceholder label="" />
      {/* Zelený závoj přes fotku */}
      <Box sx={{ position: 'absolute', inset: 0, bgcolor: colors.green, opacity: 0.82 }} />
    </Box>
  )
}
