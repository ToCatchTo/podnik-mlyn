import type { Theme } from '@mui/material/styles'
import type { SystemStyleObject } from '@mui/system'
import { fluid } from '@/utils/fluid'
import { colors, fonts } from '@/theme/tokens'

// Textové styly odvozené z XD návrhu. Velikost i line-height (px) jsou fluidní:
// do 600px mobilní hodnota z návrhu (390), od 600 do 1920px plynule k desktopové.
// Kde je mobilní hodnota pro úzký desktop (600px) příliš velká, má desktop vlastní menší
// minimum přes { xs, md }.
const base = { fontFamily: fonts.heading, fontWeight: 400, color: colors.cream } as const

export const text: Record<string, SystemStyleObject<Theme>> = {
  // Navigace "menu" (26/31 → 48/58), podtržené
  navMenu: {
    ...base,
    fontSize: fluid(26, 48),
    lineHeight: fluid(31, 58),
    textDecoration: 'underline',
    textUnderlineOffset: fluid(3, 6),
    textDecorationThickness: fluid(1, 2),
  },
  // Velké odkazy na HP (restaurace / pivovar) 40/48 → 72/86; úzký desktop začíná na 34/41,
  // aby se "restaurace →" vešlo do pravé poloviny okna
  hpLink: {
    ...base,
    fontSize: { xs: '40px', md: fluid(34, 72) },
    lineHeight: { xs: '48px', md: fluid(41, 86) },
  },
  // Nadpis sekce (restaurace / řemeslný pivovar) 40/48 → 39/47, medium
  sectionHeading: {
    ...base,
    fontWeight: 500,
    fontSize: fluid(40, 39),
    lineHeight: fluid(48, 47),
  },
  // Úvodní odstavec 20/24 → 30/36
  intro: {
    ...base,
    fontSize: fluid(20, 30),
    lineHeight: fluid(24, 36),
  },
  // Pod-odkazy (polední menu, stálé menu, nabídka piva) 40/48 na obou; desktop (od 'wide')
  // začíná na 30/36, aby se vešly do levého sloupce na jeden řádek
  subLink: {
    ...base,
    fontSize: { xs: '40px', wide: fluid(30, 40) },
    lineHeight: { xs: '48px', wide: fluid(36, 48) },
  },
  // Kontaktní údaje na stránce Kontakt (popisek i hodnota) 20/24 → 33/40
  contactText: {
    ...base,
    fontSize: fluid(20, 33),
    lineHeight: fluid(24, 40),
  },
  // Kontaktní údaje na stránce Restaurace 20/24 → 30/36
  contactTextSmall: {
    ...base,
    fontSize: fluid(20, 30),
    lineHeight: fluid(24, 36),
  },
  // Drobný text provozovatele 9/10 → 16/19
  operatorSmall: {
    ...base,
    fontSize: fluid(9, 16),
    lineHeight: fluid(10, 19),
  },
  // Název a cena piva 16/19 → 30/36, na střed
  beerName: {
    ...base,
    fontSize: fluid(16, 30),
    lineHeight: fluid(19, 36),
    textAlign: 'center',
  },
  // Popis piva 10/12 → 16/19, na střed
  beerDesc: {
    ...base,
    fontSize: fluid(10, 16),
    lineHeight: fluid(12, 19),
    textAlign: 'center',
  },
  // Položky rozbaleného menu (na krémovém panelu) 28/34 → 40/48, zelený text
  menuItem: {
    ...base,
    color: colors.green,
    fontSize: fluid(28, 40),
    lineHeight: fluid(34, 48),
  },
  // Text lightboxu 40/48 → 69/83, zelený, na střed
  lightboxText: {
    ...base,
    color: colors.green,
    fontSize: fluid(40, 69),
    lineHeight: fluid(48, 83),
    textAlign: 'center',
  },
  // Copyright v patičce (10px, Inter)
  footerCopy: {
    fontFamily: fonts.small,
    fontWeight: 400,
    fontSize: '10px',
    lineHeight: 1,
    color: colors.white,
  },
}
