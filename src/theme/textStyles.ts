import type { Theme } from '@mui/material/styles'
import type { SystemStyleObject } from '@mui/system'
import { fluid, fitHeight } from '@/utils/fluid'
import { colors, fonts } from '@/theme/tokens'

// Textové styly odvozené z XD návrhu. Velikost i line-height (px) jsou fluidní:
// do 600px mobilní hodnota z návrhu (390), od 600 do 1920px plynule k desktopové.
// Kde je mobilní hodnota pro úzký desktop (600px) příliš velká, má desktop vlastní menší
// minimum přes { xs, md }.
// Texty úvodního bloku stránek Restaurace a Pivovar se na desktopu (od 'wide') zmenšují
// i podle výšky okna (fitHeight), aby se blok včetně odkazů vešel na první obrazovku.
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
    fontSize: { xs: fluid(40, 39), wide: fitHeight(fluid(40, 39), 39, 24) },
    lineHeight: { xs: fluid(48, 47), wide: fitHeight(fluid(48, 47), 47, 29) },
  },
  // Úvodní odstavec 20/24 → 30/36
  intro: {
    ...base,
    fontSize: { xs: fluid(20, 30), wide: fitHeight(fluid(20, 30), 30, 15) },
    lineHeight: { xs: fluid(24, 36), wide: fitHeight(fluid(24, 36), 36, 18) },
  },
  // Pod-odkazy (polední menu, stálé menu, nabídka piva) 40/48 na obou; desktop (od 'wide')
  // začíná na 30/36, aby se vešly do levého sloupce na jeden řádek
  subLink: {
    ...base,
    fontSize: { xs: '40px', wide: fitHeight(fluid(30, 40), 40, 22) },
    lineHeight: { xs: '48px', wide: fitHeight(fluid(36, 48), 48, 26.4) },
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
    fontSize: { xs: fluid(20, 30), wide: fitHeight(fluid(20, 30), 30, 15) },
    lineHeight: { xs: fluid(24, 36), wide: fitHeight(fluid(24, 36), 36, 18) },
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

// Vizuálně skrytý prvek – není vidět, ale zůstává pro vyhledávače a čtečky obrazovky
// (nadpisy h1/h2 na stránkách, kde je návrh nemá)
export const visuallyHidden: SystemStyleObject<Theme> = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  margin: '-1px',
  padding: 0,
  border: 0,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
}
