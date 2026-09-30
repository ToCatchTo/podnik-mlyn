// Centrální soubor se všemi statickými texty aplikace (přesně dle XD návrhu,
// včetně placeholderů jako "00:00 - 00:00", "Název piva", "12/2026").
// V komponentách nepoužívej hardcoded texty – vždy je ber odsud.
// Části označené "z BE" slouží zároveň jako fallback pro hooky v hooks/useContent.ts.

export const content = {
  brand: {
    name: 'Mlýn a chmel',
    logoAlt: 'Sezemický pivovar Mlýn a chmel',
  },

  nav: {
    menu: 'menu',
    openMenu: 'Otevřít menu',
    closeMenu: 'Zavřít menu',
    home: 'Domovská stránka',
  },

  // Položky rozbaleného menu (v pořadí dle návrhu). 'lunchMenu' = externí PDF (odkaz z BE)
  menu: {
    items: [
      { label: 'polední menu', to: 'lunchMenu' },
      { label: 'restaurace', to: '/restaurace' },
      { label: 'pivovar', to: '/pivovar' },
      { label: 'rezervace', to: '/kontakt' },
      { label: 'kontakt', to: '/kontakt' },
    ],
  },

  // Domovská stránka (heading = vizuálně skrytý h1 pro vyhledávače a čtečky)
  home: {
    heading: 'Mlýn a chmel – Sezemický pivovar a restaurace',
    links: [
      { label: 'pivovar', to: '/pivovar' },
      { label: 'restaurace', to: '/restaurace' },
    ],
  },

  // Lightbox s oznámením na domovské stránce (text z BE; prázdný = nezobrazí se)
  lightbox: {
    text: 'Plánované otevření\n12/2026',
    close: 'Zavřít oznámení',
  },

  // Společný úvodní odstavec (restaurace i pivovar)
  intro:
    'V historickém mlýně v Sezemicích jsme dali vzniknout místu, kde se snoubí vůně čerstvě uvařeného piva s vůní domácí kuchyně. Mlýn a chmel je řemeslný pivovar i restaurace v jednom – prostě hospoda, na kterou se nezapomíná. Každý šálek piva prochází rukama našich sládků, každý talíř vzniká ze surovin, kterým věříme. Vítejte u nás.',

  // Restaurace
  restaurace: {
    heading: 'restaurace',
    photoAlt: 'Kuchař při přípravě jídla',
    lunchMenu: 'polední menu',
    permanentMenu: 'stálé menu',
    // Odkazy na PDF s menu (placeholdery; skutečné adresy přijdou z BE)
    menuLinks: {
      lunchMenuUrl: '#',
      permanentMenuUrl: '#',
    },
    contactLabel: 'rezervace / pronájem',
    phone: '+420 607 13 12 12',
    email: 'info@mlynachmel.cz',
  },

  // Pivovar
  pivovar: {
    heading: 'řemeslný pivovar',
    photoAlt: 'Měděné varní kotle pivovaru',
    offerLink: 'nabídka piva',
    offerAnchor: 'nabidka',
    currency: 'Kč',
    // 6 karet s pivem (placeholder obsah dle návrhu; skutečná data z BE)
    beers: Array.from({ length: 6 }, () => ({
      name: 'Název piva',
      description: 'Krátká charakteristika piva na pár řádků. Krátká charakteristika piva na pár řádků.',
      price: '99',
      volume: '0,5l',
    })),
  },

  // Kontakt (heading = vizuálně skrytý h1 pro vyhledávače a čtečky)
  kontakt: {
    heading: 'Kontakt',
    reservation: {
      label: 'rezervace / pronájem',
      phone: '+420 607 13 12 12',
      email: 'info@mlynachmel.cz',
    },
    address: {
      label: 'adresa',
      lines: ['Tyršovo náměstí 12', '533 04 Sezemice'],
    },
    // Otevírací doba – placeholder, skutečná data z BE
    hours: {
      label: 'otevírací doba',
      lines: ['po-pá 00:00 - 00:00', 'sobota 00:00 - 00:00', 'neděle 00:00 - 00:00'],
    },
    operator: {
      label: 'provozovatel',
      lines: [
        'Mlýn a chmel s.r.o.',
        'IČ: 23941103',
        'Tyršovo náměstí 12, 533 04 Sezemice',
        'Společnost zapsána pod značkou',
        'C 55492 vedená u Krajského soudu v Hradci Králové',
      ],
    },
  },

  // Patička
  footer: {
    copyrightDesktop: 'tvoříme weby s radostí',
    copyrightMobile: 'copyright 2025, vytvoříme web i vám',
    matfixAlt: 'matfix',
    // Cílová adresa odkazu z patičky (otevírá se v novém okně)
    matfixUrl: 'https://matfix.cz',
  },
} as const

export type Content = typeof content

export default content
