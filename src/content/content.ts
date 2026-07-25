// Centrální soubor se všemi statickými texty aplikace (přesně dle XD návrhu,
// včetně placeholderů jako "00:00 - 00:00", "pronájem???", "Název piva").
// V komponentách nepoužívej hardcoded texty – vždy je ber odsud.

export const content = {
  // Obecné
  brand: {
    name: 'MLÝN CHMEL',
    tagline: 'restaurace · minipivovar',
  },

  nav: {
    menu: 'menu',
  },

  // Položky rozbaleného menu (v pořadí dle návrhu)
  menu: {
    items: [
      { label: 'polední menu', to: '/restaurace' },
      { label: 'restaurace', to: '/restaurace' },
      { label: 'pivovar', to: '/pivovar' },
      { label: 'pronájem???', to: '/kontakt' },
      { label: 'akce???', to: '/' },
      { label: 'rezervace', to: '/kontakt' },
      { label: 'kontakt', to: '/kontakt' },
    ],
  },

  // Domovská stránka
  home: {
    links: [
      { label: 'restaurace', to: '/restaurace' },
      { label: 'pivovar', to: '/pivovar' },
    ],
  },

  // Společný úvodní odstavec (restaurace i pivovar)
  intro:
    'V historickém mlýně v Sezemicích jsme dali vzniknout místu, kde se snoubí vůně čerstvě uvařeného piva s vůní domácí kuchyně. Mlýn a chmel je řemeslný pivovar i restaurace v jednom – prostě hospoda, na kterou se nezapomíná. Každý šálek piva prochází rukama našich sládků, každý talíř vzniká ze surovin, kterým věříme. Vítejte u nás.',

  // Restaurace
  restaurace: {
    heading: 'restaurace',
    links: [
      { label: 'polední menu', to: '/restaurace' },
      { label: 'stálé menu', to: '/restaurace' },
    ],
    contactLabel: 'rezervace / pronájem',
    phone: '+420 607 13 12 12',
    email: 'info@mlynachmel.cz',
  },

  // Pivovar
  pivovar: {
    heading: 'řemeslný pivovar',
    headingMobile: 'řemeslný\npivovar',
    offerLink: 'nabídka piva',
    // 6 karet s pivem (placeholder obsah dle návrhu)
    beers: Array.from({ length: 6 }, () => ({
      name: 'Název piva',
      desc: 'Krátká charakteristika piva na pár řádků. Krátká charakteristika piva na pár řádků.\n2-3 řádky textu o pivě.',
    })),
  },

  // Kontakt
  kontakt: {
    reservation: {
      label: 'rezervace / pronájem',
      phone: '+420 607 13 12 12',
      email: 'info@mlynachmel.cz',
    },
    address: {
      label: 'adresa',
      lines: ['Tyršovo náměstí 12', '533 04 Sezemice'],
    },
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
    logo: 'matfix',
  },
} as const

export type Content = typeof content

export default content
