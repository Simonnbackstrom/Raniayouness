# RAYN – landningssida för CO2 laser (Meta-annonser)

En ensidig sida för annonstrafik. Fokus: CO2 fraktionerad laser. Ett extra erbjudande: Microneedling 1 199 kr.
Samma design, CSS, cookiebanner och Meta-spårning som huvudsajten. Ren HTML, CSS och JavaScript – inga byggsteg.

## Filer

| Fil | Innehåll |
|---|---|
| `index.html` | Själva landningssidan |
| `integritetspolicy.html`, `credits.html` | Krävs av cookiebannern och bildlicenserna |
| `js/config.js` | Pixel-ID, CAPI, Bokadirekt-länkar, `SHOW_BEFORE_AFTER_ON_CAMPAIGNS["co2-laser"]` |
| `js/images.js` | Bildregister (bara bilderna som används här) |
| `images/resultat/co2-fore.webp`, `co2-efter.webp` | **Platshållare** för före/efter |

## Publicering

Lägg mappen som `/co2/` på domänen, t.ex. `https://www.raynbeauty.se/co2/`, och använd den adressen i annonsen.
Sidan har `noindex` eftersom den är en kampanjsida. Ska den i stället ersätta hela webbplatsen:
lägg innehållet i roten, ändra `noindex` till `index` och uppdatera `canonical`/`og:url` i de tre HTML-filerna.

## Ändra vanliga saker

- **Pixel-ID:** `js/config.js` → `META_PIXEL_ID`.
- **Kampanjens slutdatum:** CO2-priserna visas tills vidare utan datum. När salongen bestämt ett slutdatum:
  lägg till `data-offer-until="ÅÅÅÅ-MM-DD"` på prisblocken, eller be utvecklaren sätta `CO2_UNTIL` i generatorn.
  Kom ihåg att ändra priserna på Bokadirekt samtidigt – priset vid bokning är det som gäller.
- **Microneedling-priset** byter automatiskt till ordinarie 1 599 kr efter 29 november 2026.
- **Före/efter:** byt `images/resultat/co2-fore.webp` och `co2-efter.webp` (800×1000 px, samma ljus och vinkel).
  Använd ENDAST salongens egna kundbilder med skriftligt samtycke. Vill ni dölja sektionen tills bilderna finns:
  sätt `'co2-laser': false` i `SHOW_BEFORE_AFTER_ON_CAMPAIGNS` i `js/config.js`.
- **Annonsrubriken:** H1 på sidan är "CO2 laser för ansiktet till halva priset". Annonsens rubrik bör matcha.

## Spårning (samma som huvudsajten)

Pixeln laddas först efter samtycke. Händelser: `PageView`, `ViewContent` (CO2 fraktionerad laser),
`Lead` vid klick på bokningsknapp (med `data-position` för vilken knapp), `Contact` vid klick på telefon,
`BeforeAfterInteract` när någon drar i reglaget. Alla har `event_id` för deduplicering mot CAPI.
UTM-parametrar och `fbclid` följer med till Bokadirekt.
