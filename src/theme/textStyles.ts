import type { SxProps, Theme } from '@mui/material/styles'
import { fluid } from '@/utils/fluid'
import { colors, fonts } from '@/theme/tokens'

// Textové styly odvozené z XD návrhu. Každá velikost i line-height je fluidní
// mezi mobilní (390px) a desktopovou (1920px) hodnotou z návrhu.
// fluid(mobilePx, desktopPx) → clamp() interpolující podle šířky viewportu.

export const text: Record<string, SxProps<Theme>> = {
  // Navigace "menu" (26 → 48), podtržené
  navMenu: {
    fontFamily: fonts.heading,
    fontWeight: 400,
    fontSize: fluid(26, 48),
    lineHeight: 1,
    color: colors.cream,
    textDecoration: 'underline',
    textUnderlineOffset: fluid(3, 6),
  },
  // Velké odkazy na HP (restaurace / pivovar) 40 → 72
  hpLink: {
    fontFamily: fonts.heading,
    fontWeight: 400,
    fontSize: fluid(40, 72),
    lineHeight: 1,
    color: colors.cream,
  },
  // Nadpis sekce (restaurace / řemeslný pivovar) 40 → 39, medium
  sectionHeading: {
    fontFamily: fonts.heading,
    fontWeight: 500,
    fontSize: fluid(40, 39),
    lineHeight: 1.2,
    color: colors.cream,
  },
  // Úvodní odstavec 20 → 30, line-height ~1.23
  intro: {
    fontFamily: fonts.heading,
    fontWeight: 400,
    fontSize: fluid(20, 30),
    lineHeight: 1.23,
    color: colors.cream,
  },
  // Pod-odkazy (polední menu, stálé menu, nabídka piva) 40 → 40
  subLink: {
    fontFamily: fonts.heading,
    fontWeight: 400,
    fontSize: fluid(40, 40),
    lineHeight: 1,
    color: colors.cream,
  },
  // Popisek kontaktu (rezervace / pronájem, adresa, ...) 20 → 33
  contactHeading: {
    fontFamily: fonts.heading,
    fontWeight: 400,
    fontSize: fluid(20, 33),
    lineHeight: 1.1,
    color: colors.cream,
  },
  // Hodnota kontaktu 20 → 33, line-height ~1.18
  contactBody: {
    fontFamily: fonts.heading,
    fontWeight: 400,
    fontSize: fluid(20, 33),
    lineHeight: 1.18,
    color: colors.cream,
  },
  // Drobný text provozovatele 9 → 16
  provozovatelSmall: {
    fontFamily: fonts.heading,
    fontWeight: 400,
    fontSize: fluid(9, 16),
    lineHeight: 1.2,
    color: colors.cream,
  },
  // Název piva 16 → 30
  beerName: {
    fontFamily: fonts.heading,
    fontWeight: 400,
    fontSize: fluid(16, 30),
    lineHeight: 1.1,
    color: colors.cream,
    textAlign: 'center',
  },
  // Popis piva 10 → 16
  beerDesc: {
    fontFamily: fonts.heading,
    fontWeight: 400,
    fontSize: fluid(10, 16),
    lineHeight: 1.25,
    color: colors.cream,
    textAlign: 'center',
  },
  // Položky rozbaleného menu (na krémovém panelu) 28 → 40, zelený text
  menuItem: {
    fontFamily: fonts.heading,
    fontWeight: 400,
    fontSize: fluid(28, 40),
    lineHeight: 1,
    color: colors.green,
  },
  // Copyright v patičce (10px, Inter)
  footerCopy: {
    fontFamily: fonts.small,
    fontWeight: 400,
    fontSize: fluid(10, 10),
    lineHeight: 1,
    color: colors.white,
  },
}
