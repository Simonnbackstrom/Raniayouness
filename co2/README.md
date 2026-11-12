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
`LeadFormStart` när någon börjar fylla i formuläret, `Lead` **bara när intresseformuläret skickats in**,
`BookingClick` vid klick på bokningsknapp (med `data-position` för vilken knapp), `Contact` vid klick på telefon,
`BeforeAfterInteract` när någon drar i reglaget. Alla har `event_id` för deduplicering mot CAPI.
UTM-parametrar och `fbclid` följer med till Bokadirekt.

### Lead via Conversions API (server)

`api/kommo.js` skickar samma `Lead` från servern till Meta när leadet skapats i Kommo, med samma
`event_id` som pixeln, så att Meta räknar dem som **en** händelse. Det skickas bara om besökaren
godkänt marknadsföringscookies och inte är i testläge. Lägg till i Vercel → Settings → Environment Variables:

| Variabel | Värde |
|---|---|
| `META_PIXEL_ID` | `2060190041194622` |
| `META_CAPI_TOKEN` | Events Manager → pixeln → Inställningar → Conversions API → *Generera åtkomsttoken* |
| `META_TEST_EVENT_CODE` | (bara medan du testar) koden från fliken *Testhändelser* |
| `META_API_VERSION` | (valfritt) standard `v25.0` |

Gör om deployen efter att variablerna lagts till. I varje lead i Kommo står det om det skickades till Meta.
I Events Manager ska Lead då visa både *Webbläsare* och *Server*, med status *Deduplicerad*.

### Testläge – så räknas inte era egna tester

Öppna `https://<domän>/co2/?rayn_test=1` **en gång** i varje webbläsare och på varje mobil ni testar från.
En röd etikett "Testläge" syns nere till vänster, och inga events skickas till Meta från den webbläsaren.
Formuläret fungerar som vanligt, men leadet i Kommo taggas `Test` (inte `Meta annons`) och
notis-SMS:et börjar med "TEST". Stäng av med `?rayn_test=0`.

### Annonsens URL-parametrar

Lägg i Ads Manager → annonsen → *Webbplatsens URL* → *URL-parametrar*:

```
utm_source=facebook&utm_medium=paid&utm_campaign={{campaign.name}}&utm_content={{ad.name}}
```

Då står kampanj och annons i anteckningen i Kommo, och leadet taggas `Meta annons` även när `fbclid` saknas.
