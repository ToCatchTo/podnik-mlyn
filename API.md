# Napojení frontendu na API

Návod pro web [mlynachmel.cz](https://mlynachmel.cz). Web čte všechna data z API administrace
([webfix/admin-mlyn-a-chmel](https://gitlab.com/webfix/admin-mlyn-a-chmel)):

| Prostředí | Základní URL API |
|-----------|------------------|
| Produkce | `https://admin.mlynachmel.cz` |
| Lokální vývoj backendu | `https://mlynachmel.localhost` (self-signed certifikát) |

Interaktivní dokumentace (Swagger) je na `/api/doc`. Tlačítkem **Authorize** do ní vložíš token a endpointy zkusíš přes „Try it out“.

## Token

Každý požadavek na `/api/*` musí mít hlavičku `X-AUTH-TOKEN`.

- Token založí správce v administraci: **Nastavení → API tokeny**. Pro web stačí jeden token.
- Vypnutý token (`Aktivní` = ne) se chová jako neexistující. Token tak jde zneplatnit bez nasazení.
- Token je vidět v kódu webu v prohlížeči, takže to není tajemství. Slouží k identifikaci klienta a k jeho zneplatnění, ne k ochraně dat.
  Všechna data v API jsou stejně veřejná na webu.

Ověření tokenu (a zároveň CORS):

```bash
curl -H "X-AUTH-TOKEN: <token>" https://admin.mlynachmel.cz/api/ping
```
```json
{ "status": "ok" }
```

```js
const API_URL = 'https://admin.mlynachmel.cz';
const API_TOKEN = '<token>';

async function api(path) {
  const response = await fetch(API_URL + path, {
    headers: { 'X-AUTH-TOKEN': API_TOKEN },
  });
  if (!response.ok) {
    throw new Error(`API ${path}: ${response.status}`);
  }
  return response.json();
}
```

## CORS

API povoluje požadavky z prohlížeče jen z těchto originů:

- `https://mlynachmel.cz`
- `https://www.mlynachmel.cz`
- `http(s)://localhost` a `http(s)://127.0.0.1` na libovolném portu (lokální vývoj frontendu)

Kvůli hlavičce `X-AUTH-TOKEN` posílá prohlížeč před každým požadavkem preflight `OPTIONS`. API na něj odpovídá samo, frontend nemusí nic řešit.
Když web poběží na jiné doméně (např. testovací), je potřeba ji přidat do `CORS_ALLOW_ORIGIN` na serveru. Napiš správci.

## Chyby

| Status | Kdy | Tělo |
|--------|-----|------|
| `401` | chybí hlavička `X-AUTH-TOKEN` | `{"message": "Authentication Required"}` |
| `401` | neznámý nebo vypnutý token | `{"message": "Invalid credentials."}` |
| `404` | neexistující endpoint, nebo otevírací doba není v databázi | `{"title": "An error occurred", "status": 404, "detail": "..."}` |

Všechny endpointy jsou `GET`. Datumy jsou ve formátu ISO 8601 v UTC (`2026-10-12T07:41:00+00:00`). Pro zobrazení je převeď na místní čas (`new Date(...)`).
URL souborů jsou vždy absolutní (`https://admin.mlynachmel.cz/uploads/...`).

## Endpointy

| Endpoint | Co vrací | Kde na webu |
|----------|----------|-------------|
| `GET /api/special-event` | mimořádná událost, nebo `null` | lightbox |
| `GET /api/opening-hours` | řádky otevírací doby a poznámka | patička |
| `GET /api/restaurant-menus` | soubor stálého a poledního menu | stránka restaurace |
| `GET /api/beers` | aktivní pivní karty v pořadí | stránka pivovaru |
| `GET /api/ping` | `{"status": "ok"}` | jen kontrola tokenu |

### `GET /api/special-event`

Zapnutá událost:

```json
{
  "item": {
    "title": "Zavřeno z technických důvodů",
    "text": "<p>V sobotu 17. 10. máme <strong>zavřeno</strong>. Děkujeme za pochopení.</p>",
    "version": "2026-10-12T07:41:00+00:00"
  }
}
```

Vypnutá událost:

```json
{ "item": null }
```

- `text` je **HTML** z editoru v administraci (odstavce, tučné písmo, odkazy). Vlož ho jako HTML, ne jako text.
- `title` i `text` jsou u zapnuté události vždy vyplněné.

#### Kdy lightbox ukázat (`version`)

`version` je čas poslední úpravy události. Mění se při každém uložení v administraci, tedy i když obsluha událost jen vypne a znovu zapne, aniž by měnila text. Díky tomu se lightbox neukazuje pořád dokola,
ale nová zpráva se ukáže i tomu, kdo zavřel tu předchozí:

1. Když návštěvník lightbox zavře, ulož si `version` (např. do `localStorage`).
2. Při dalším načtení lightbox ukaž, jen když `item` není `null` **a** `item.version` se liší od uložené hodnoty.

```js
const { item } = await api('/api/special-event');
let dismissed = null;
try { dismissed = localStorage.getItem('specialEventDismissed'); } catch {}

if (item && item.version !== dismissed) {
  showLightbox(item.title, item.text, () => {
    try { localStorage.setItem('specialEventDismissed', item.version); } catch {}
  });
}
```

`version` porovnávej jen na rovnost. Je to identifikátor verze, ne čas, podle kterého by se mělo něco plánovat.

### `GET /api/opening-hours`

```json
{
  "items": [
    { "label": "Po–Čt", "value": "11:00–22:00" },
    { "label": "Pá–So", "value": "11:00–24:00" },
    { "label": "Ne", "value": "11:00–20:00" }
  ],
  "note": "Kuchyně vaří do 21:00."
}
```

- `items` jsou řádky v pořadí, v jakém je zadala obsluha. Zobraz je tak, jak jsou: `label` vlevo, `value` vpravo.
  Jsou to volné texty (může tam být třeba „Kuchyně“ → „do 21:00“), frontend je neparsuje.
- `note` může být `null`.
- `404` vrací jen tehdy, když otevírací doba v databázi vůbec není (chyba nasazení). Patička by se v tom případě měla vykreslit bez otevírací doby.

### `GET /api/restaurant-menus`

Vždy obsahuje oba klíče, `permanent` (stálé menu) a `lunch` (polední menu). Slot bez nahraného souboru je `null`.

```json
{
  "permanent": {
    "url": "https://admin.mlynachmel.cz/uploads/restaurant_menus/stale-menu-6527.pdf",
    "name": "stale-menu.pdf",
    "mimeType": "application/pdf",
    "size": 182044,
    "note": null,
    "updatedAt": "2026-10-01T12:02:00+00:00"
  },
  "lunch": {
    "url": "https://admin.mlynachmel.cz/uploads/restaurant_menus/poledni-41-6528.jpg",
    "name": "poledni-41.jpg",
    "mimeType": "image/jpeg",
    "size": 431220,
    "note": "Polední menu 12.–16. 10.",
    "updatedAt": "2026-10-12T06:15:00+00:00"
  }
}
```

- `mimeType` je jedno z `application/pdf`, `image/jpeg`, `image/png`, `image/webp`. Podle něj se rozhodni:
  obrázek (`image/*`) zobraz přímo, PDF dej jako odkaz (nebo `<iframe>`/`<embed>`).
- `name` je původní název souboru, hodí se jako text odkazu nebo atribut `download`.
- `size` je v bajtech.
- `note` je krátká poznámka obsluhy (např. pro jaký týden polední menu platí), může být `null`.
- Při nahrání nového souboru se změní `url` (soubor dostane nový název), takže cache prohlížeče starý soubor neukáže.

### `GET /api/beers`

Jen aktivní karty, seřazené podle pořadí z administrace.

```json
{
  "items": [
    {
      "id": 3,
      "name": "Mlynářská 11°",
      "text": "Světlý ležák z vlastního pivovaru.\nPlné tělo, jemná hořkost.",
      "image": "https://admin.mlynachmel.cz/uploads/beer_images/mlynarska-6529.jpg",
      "price": 59,
      "volumeMl": 500
    }
  ]
}
```

- Pořadí v `items` je finální, frontend ho nepřeřazuje.
- `text` je **prostý text** (ne HTML), zalomení řádků jsou `\n`. Zobraz ho např. s `white-space: pre-line`. Může být `null`.
- `image` může být `null`, počítej s náhradním obrázkem.
- `price` je v celých Kč, `volumeMl` v mililitrech. Formátování (`59 Kč`, `0,5 l`) je na frontendu.
- Prázdný seznam je `{"items": []}`.

## Statistiky (Umami)

Návštěvnost se měří v Umami na `analytics.matfix.cz`, správce ji vidí v administraci na stránce **Statistiky**.
Na web stačí do `<head>` každé stránky vložit:

```html
<script defer src="https://analytics.matfix.cz/script.js" data-website-id="d6129256-361e-4dab-b5d5-9e0ab7e6a85c"></script>
```

Website ID není tajné. Umami nepoužívá cookies, takže kvůli němu není potřeba cookie lišta.
