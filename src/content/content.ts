// Centrální soubor se všemi statickými texty aplikace (přesně dle XD návrhu).
// V komponentách nepoužívej hardcoded texty – vždy je ber odsud.
// Dynamický obsah (lightbox, otevírací doba, menu, piva) přichází z API (hooks/useContent.ts),
// zde jsou jen jeho popisky.

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

  // Položky rozbaleného menu (v pořadí dle návrhu). 'lunchMenu' = soubor poledního menu z API
  // (zobrazí se jen když je nahraný)
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

  // Restaurace
  restaurace: {
    heading: 'restaurace',
    intro:
      'V Sezemickém mlýně jsme dali vzniknout místu, kde se snoubí vůně poctivé české kuchyně s příjemnou atmosférou a pohostinností. Naše restaurace staví na tradičních českých receptech, kvalitních surovinách a poctivé přípravě. Věříme, že dobré jídlo nepotřebuje zbytečné složitosti, ale čas, péči a kuchaře, který svou práci dělá srdcem. Chceme, abyste si u nás vychutnali nejen dobré jídlo, ale také chvíle strávené s rodinou, přáteli a těmi, na kterých vám záleží. Vážení hosté, přejeme Vám dobrou chuť a buďte vítáni.',
    photoAlt: 'Kuchař při přípravě jídla',
    lunchMenu: 'polední menu',
    permanentMenu: 'stálé menu',
    contactLabel: 'rezervace / pronájem',
    phone: '+420 607 13 12 12',
    email: 'info@mlynachmel.cz',
  },

  // Pivovar
  pivovar: {
    heading: 'řemeslný pivovar',
    intro:
      'V Sezemickém mlýně jsme dali vzniknout místu, kde se snoubí vůně čerstvě uvařeného piva s vůní domácí kuchyně. Náš řemeslný pivovar a restaurace je místem, na které se nezapomíná. Našemu pivu nic nebereme filtrací ani pasterizací. Je to pivo bez kompromisů ze surovin, které nám příroda už léta dává k jeho výrobě. Výsledná chuť je dána poměrem těchto surovin, které s láskou míchá náš sládek. Vážení hosté, přejeme Vám dobrou chuť, na zdraví a buďte vítáni.',
    photoAlt: 'Měděné varní kotle pivovaru',
    offerLink: 'nabídka piva',
    offerAnchor: 'nabidka',
    currency: 'Kč',
    // Náhradní obrázek karty, když pivo nemá vlastní fotku
    beerFallbackImage: '/images/beer_bottle.webp',
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
    // Otevírací doba – řádky přicházejí z API
    hours: {
      label: 'otevírací doba',
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
