# Podnik Mlýn

React + TypeScript + MUI aplikace sestavená pomocí Vite.

## Požadavky

- Node.js 18+
- npm

## Spuštění

```bash
npm install     # instalace závislostí
npm run dev     # vývojový server (Vite)
npm run build   # produkční build
npm run preview # náhled produkčního buildu
```

## Struktura projektu

```
public/
  icons/    – ikony (snake_case)
  images/   – obrázky (snake_case)
  videos/   – videa (snake_case)
src/
  components/  – znovupoužitelné komponenty (PascalCase)
  pages/       – stránky (PascalCase)
  hooks/       – vlastní hooky (např. useFetch)
  utils/       – pomocné funkce (např. fluid)
  content/     – všechny statické texty aplikace
  theme/       – MUI motiv
```

## Konvence

- **Responzivita:** používej funkci `fluid()` z `src/utils/fluid.ts` a CSS `clamp()`.
- **Vertikální odsazení:** vždy shora (`margin-top` / `padding-top`).
- **Statické texty:** pouze v `src/content/content.ts`, žádné hardcoded texty v komponentách.
- **Fetchování dat:** přes jednotný hook `useFetch`.

## Environment proměnné

Hodnoty doplň do `.env` (viz `.env.example`). Ve Vite musí mít proměnné prefix `VITE_`.
```
