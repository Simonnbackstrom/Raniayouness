# RAYN Beauty Spa & Wellness – webbplats

En statisk webbplats i ren HTML, CSS och vanilla JavaScript för RAYN Beauty Spa & Wellness i Helsingborg. Den används som landningsyta för Meta-annonser (Facebook/Instagram). Den har inga ramverk och inget byggsteg: ladda upp mappen till valfritt webbhotell så fungerar den.

All bokning sker via Bokadirekt. Varje Boka-knapp går **direkt till rätt tjänst** på Bokadirekt (djuplänk), så besökaren slipper leta.

---

## Innehåll

1. [Filstruktur](#filstruktur)
2. [Kom igång lokalt](#kom-igång-lokalt)
3. [Konfiguration – js/config.js](#konfiguration--jsconfigjs)
4. [Byta Pixel-ID](#byta-pixel-id)
5. [Bilder – js/images.js](#bilder--jsimagesjs)
6. [Före/efter-bilder](#föreefter-bilder)
7. [Omdömen](#omdömen)
8. [Lägga till en ny kampanjsida](#lägga-till-en-ny-kampanjsida)
9. [Spårning: så fungerar det](#spårning-så-fungerar-det)
10. [Testa events](#testa-events)
11. [Koppla Conversions API](#koppla-conversions-api)
12. [Samtycke och GDPR](#samtycke-och-gdpr)
13. [Gemensam header/footer](#gemensam-headerfooter)
14. [Checklista före lansering](#checklista-före-lansering)

---

## Filstruktur

```
/index.html               Startsida: hero, förtroende, populära behandlingar, resultat,
                          om RAYN, omdömen, Instagram, vanliga frågor, CTA, hitta hit
/behandlingar.html        Alla 90+ behandlingar i 12 kategorier med bild, pris, tid och Boka
/om-oss.html              Historia, filosofi, team (Rania & Dana), trygghet
/kontakt.html             Adress, karta (laddas vid klick), öppettider, telefon, e-post
/integritetspolicy.html   GDPR, cookies, Meta-pixeln och kundbilder i resultatgalleriet
/credits.html             Fotografer och källor för stockfoton (länkas i sidfoten)
/kampanj/_mall.html       Mall för nya annonslandningssidor
/kampanj/hydrafacial.html, japanese-head-spa.html, microneedling.html   Exempel
/css/style.css            All CSS. Tokens (färger, typsnitt, avstånd) ligger i :root
/js/config.js             ALL konfiguration: Pixel-ID, djuplänkar, före/efter på kampanjer m.m.
/js/images.js             Bildregister – alla bilder hämtas härifrån
/js/consent.js            Cookiebanner och samtycke
/js/tracking.js           Meta-pixel, events, UTM/fbclid, Boka-länkar, CAPI-stub
/js/before-after.js       Före/efter-reglaget
/js/main.js               Meny, animationer, karusell, mobil-CTA, kampanjdatum, karta, bilder
/images/logo/             Salongens logga (från Bokadirekt), uppdelad i symbol och ordmärke
/images/team/, lokal/, instagram/   Platshållare – byt mot salongens egna bilder
/images/resultat/         Platshållare för före/efter ("Kundbild kommer")
/sitemap.xml, /robots.txt
```

**Färger:** Accentfärgen (aubergine, `--color-accent`) och kopparguldet (`--color-gold`) är hämtade från RAYN-loggans droppe och ordmärke. Ändra i `:root` i `css/style.css`.

## Kom igång lokalt

```bash
npx serve .            # eller: python -m http.server 8000
```

Öppna `http://localhost:3000` (eller 8000). Kampanjsidorna nås inte från menyn. Skriv in adressen direkt, t.ex. `/kampanj/microneedling.html`.

---

## Konfiguration – js/config.js

| Nyckel | Vad det är |
|---|---|
| `META_PIXEL_ID` | Pixel-ID från Meta Events Manager. Pixeln laddas aldrig så länge värdet inte är ett giltigt ID. |
| `BOOKING_EVENT` | `'Lead'` (standard) eller `'BookingClick'` (custom event). |
| `BOKADIREKT_URL` | Salongens sida på Bokadirekt. |
| `TREATMENT_LINKS` | Djuplänk per tjänst (hämtade från Bokadirekt 2026-10-28). Nyckeln = `data-treatment-id` på knappen. |
| `SHOW_BEFORE_AFTER_ON_CAMPAIGNS` | `true`/`false` per kampanjsida: om resultatsektionen (före/efter) ska visas. |
| `ATTRIBUTION_PARAMS` | UTM-parametrar som fångas och skickas vidare till Bokadirekt. |
| `DEFAULT_OUTBOUND_UTM` | UTM som läggs på Bokadirekt-länkar vid organisk trafik. `null` stänger av. |
| `CAPI_ENDPOINT` | URL till er Conversions API-endpoint. Tom = av. |
| `CONSENT_VERSION` | Höj siffran när cookieanvändningen ändras, så tillfrågas alla igen. |
| `INSTAGRAM_URL` | Instagram-konto. **Tomt = Instagram-sektionen på startsidan och länkarna döljs.** |
| `DEBUG` | `true` loggar alla events i konsolen (eller lägg till `?rayn_debug=1` i URL:en). |

**Djuplänkar:** Djuplänken står även direkt i HTML:en (`href`), så knapparna fungerar utan JavaScript. Om salongen byter namn på eller återskapar en tjänst i Bokadirekt kan länken ändras. Öppna då tjänsten på Bokadirekt, kopiera adressen och uppdatera den i `TREATMENT_LINKS`.

---

## Byta Pixel-ID

1. **Meta Events Manager → Datakällor → er pixel**. Kopiera Pixel-ID:t (15–16 siffror).
2. Öppna `js/config.js` och ersätt `'ERSATT_MED_PIXEL_ID'` med ID:t, t.ex. `META_PIXEL_ID: '123456789012345',`.
3. Ladda upp filen. Pixeln finns inte i någon HTML-fil.

---

## Bilder – js/images.js

Alla bilder på sajten läses från **`js/images.js`**:

```js
'hero': {
  url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874',
  alt: 'Terapeut häller varm massageolja …',
  källa: 'unsplash',            // "unsplash" | "pexels" | "egen"
  fotograf: 'alan caishan',
  licens: 'Unsplash License',
  fokus: '30% 50%'               // valfritt: object-position
}
```

HTML-filerna har bilderna förifyllda (för snabb laddning och för besökare utan JavaScript). `js/main.js` jämför med `images.js` och byter automatiskt `src`, `srcset` och `alt` om du har ändrat något. Rätt storlek och beskärning (4:5, 3:2, 16:9 osv.) räknas fram automatiskt för Unsplash- och Pexels-bilder.

### Byta stockbilder mot salongens egna foton

1. Spara fotot som WebP (t.ex. med [Squoosh](https://squoosh.app), kvalitet 75–80, minst 1600 px på längsta sidan) i `images/`, t.ex. `images/egna/ansiktsbehandling.webp`.
2. Ändra nyckeln i `js/images.js`:
   ```js
   'ansikte': { url: 'images/egna/ansiktsbehandling.webp', alt: 'Ansiktsbehandling hos RAYN', källa: 'egen', fotograf: 'RAYN', licens: 'Egen bild' },
   ```
3. Klart: bilden byts på alla sidor, och tas automatiskt bort från `credits.html`.
4. **Hero-bilden** (`hero`) laddas innan JavaScript körs. För bästa prestanda: sök efter `data-img="hero"` och `rel="preload"` i `index.html` och uppdatera även `src`/`srcset` där.

> Egna bilder visas i ett fast format via `object-fit: cover`. Ladda upp en version per bild (ingen srcset behövs), helst i 4:5 eller 3:2.

### Stockfoton som används (alla Unsplash License, verifierade 2026-10-28)

| Nyckel | Motiv | Fotograf |
|---|---|---|
| `hero` | Terapeut häller massageolja, kvinna vilar på brits | [alan caishan](https://unsplash.com/photos/woman-lying-with-prone-position-cU53ZFBr3lk) |
| `om` | Handdukar i taupe och värmeljus | [Anna Keibalo](https://unsplash.com/photos/a-couple-of-candles-sitting-on-top-of-a-table-q8xEBCO6DQg) |
| `cta` | Tända blockljus | [Sixteen Miles Out](https://unsplash.com/photos/white-pillar-candles-on-brown-wooden-table-bdVmIkx_gIs) |
| `spadetalj` | Vita handdukar, doftljus, borste | [Susan Wilkinson](https://unsplash.com/photos/brown-can-on-white-textile-GmR4OXwt2p8) |
| `serum` | Serumflaska i bärnstensglas (reserv, används inte just nu) | [Avtar Singh](https://unsplash.com/photos/amber-glass-dropper-bottle-with-blank-label-on-concrete-block-MkuwnDkT1s0) |
| `ansikte` | Ansiktsmask under behandling | [Rosa Rafael](https://unsplash.com/photos/woman-receiving-facial-mask-treatment-at-spa-Pe9IXUuC6QU) |
| `hydrafacial` | Mask appliceras med pensel | [kimia kazemi](https://unsplash.com/photos/a-person-receiving-a-facial-treatment-RbIcMsh0NSk) |
| `microneedling` | Handhållet hudvårdsinstrument mot pannan | [Look Studio](https://unsplash.com/photos/a-woman-getting-a-facial-peel-from-a-doctor-HtXyytr9304) |
| `co2` | Laserhandstycke mot huden | [Sam Moghadam](https://unsplash.com/photos/person-holding-white-and-orange-device-IgAa6frsVyQ) |
| `hifu` | Hudvårdsbehandling i ansiktet | [karelys Ruiz](https://unsplash.com/photos/woman-receiving-facial-skincare-treatment-PqyzuzFiQfY) |
| `headspa` | Hårtvätt vid tvättfat | [Lindsay Cash](https://unsplash.com/photos/a-woman-getting-her-hair-cut-by-a-hair-stylist-Md_DhaFsnCQ) |
| `massage` | Ryggmassage i dagsljus | [Jakub Klucký](https://unsplash.com/photos/massage-therapist-giving-a-back-massage-7yeqemd-p90) |
| `hotstone` | Varma stenar längs ryggen | [Taylor Heery](https://unsplash.com/photos/a-woman-laying-on-top-of-a-bed-under-a-blanket-M7n7YTkPAfA) |
| `laserhair` | Laserhårborttagning på benet | [Farhad Ibrahimzade](https://unsplash.com/photos/laser-hair-removal-on-leg-szpFxaqS658) |
| `vaxning` | Släta ben mot vit filt | [Mathilde Langevin](https://unsplash.com/photos/a-womans-feet-with-a-ring-on-her-toe-PPodmkas_j0) |
| `lashbrow` | Fransbehandling | [Hayley Kim Studios](https://unsplash.com/photos/eyelash-extensions-application-in-salon-sRSRuxkOuzI) |
| `tatuering` | Arm med små tatueringar | [Sincerely Media](https://unsplash.com/photos/person-showing-arm-and-wrist-tattoo-CjHJbp3zInA) |
| `tandblekning` | Leende kvinna | [Alexander Krivitskiy](https://unsplash.com/photos/woman-in-white-fur-coat--x5vrLlYEsw) |
| `momtobe` | Gravid kvinna | [freestocks](https://unsplash.com/photos/pregnant-woman-cradling-her-belly-ux53SGpRAHU) |
| `presentkort` | Rullade handdukar | [Anna Keibalo](https://unsplash.com/photos/a-couple-of-rolled-up-towels-sitting-on-top-of-a-bed--kYCpF55lIg) |

Unsplash-licensen kräver inte attribution, men vi visar den ändå på `credits.html`. Stockfoton får **inte** presenteras som salongens lokal, personal eller kunder. Därför är team, lokal, Instagram och resultat platshållare.

### Platshållare som ska bytas

| Nyckel | Fil | Vad som behövs | Sökord om ni vill ha stock i stället |
|---|---|---|---|
| `team-rania`, `team-dana` | `images/team/*.webp` | Porträtt, 4:5, mjukt dagsljus, neutral bakgrund | – (ska vara riktiga foton) |
| `lokal` | `images/lokal/behandlingsrum.webp` | Behandlingsrum/reception, 4:5 | – (ska vara riktiga foton) |
| `instagram-1` … `-6` | `images/instagram/*.webp` | Kvadratiska bilder från salongens Instagram | – |
| `resultat-*-fore/-efter` | `images/resultat/*.webp` | Före/efter, se nedan | – (aldrig stock) |

---

## Före/efter-bilder

### Komponenten
`js/before-after.js` + markup med `data-ba`. Två bilder ligger ovanpå varandra och ett osynligt `<input type="range">` styr reglaget, vilket ger pekare, touch och tangentbord (piltangenter, Home/End). Etiketterna "Före"/"Efter" syns alltid. Under varje jämförelse visas behandling, antal behandlingstillfällen, tid efter behandling och texten *"Resultat varierar mellan individer. Bilden publiceras med kundens samtycke."* Bredvid finns saklig info om behandlingen, möjliga biverkningar och konsultation.

Jämförelser finns för **Microneedling (hudförbättring)**, **Lashlift & färg (franslyft)** och **Browlift & färg (bryn)**: på startsidan, på behandlingssidan under respektive kategori och på kampanjsidan för microneedling.

Antal tillfällen och tid efter behandling ändrar du i HTML:en (sök efter `[uppgift kommer]`).

### Källor till salongens egna före/efter-bilder
Jag har letat efter bilder som RAYN/Pranari själva publicerat:

| Källa | Resultat |
|---|---|
| Bokadirekt-galleriet (6 bilder) | Inga före/efter-bilder: kampanjbild, lokalbilder och Epassi-loggor |
| Webbsökning efter RAYN/Pranari på Instagram och Facebook | Inget konto hittades. Salongen behöver uppge sitt konto. |

**Inga bilder hittades**, så alla sex resultatbilder är platshållare med texten "Kundbild kommer". Komponenten fungerar fullt ut. När salongen skickar bilder sparar du dem som:

```
images/resultat/microneedling-fore.webp   images/resultat/microneedling-efter.webp
images/resultat/lashlift-fore.webp        images/resultat/lashlift-efter.webp
images/resultat/browlift-fore.webp        images/resultat/browlift-efter.webp
```

(Samma filnamn = inget annat behöver ändras. Format 4:5, t.ex. 1000×1250 px.)

**Instagram-inlägg som alternativ:** Har salongen redan bilderna på Instagram går det att bädda in inlägget. Instagrams embed-skript sätter dock cookies, så det får bara laddas efter samtycke (eller vid klick, som kartan). Att använda egna filer är enklare och snabbare.

### Samtyckeschecklista – för VARJE bild innan den går live
- [ ] Kunden har gett **skriftligt** samtycke (papper eller digitalt, med datum och underskrift).
- [ ] Samtycket anger **var** bilden får visas: webbplats, sociala medier och/eller **annonser**.
- [ ] Kunden har informerats om att samtycket kan **återkallas** när som helst, och hur.
- [ ] Kunden är **över 18 år**.
- [ ] Bilden visar **bara** det behandlade området. Inga ansiktsdrag, tatueringar eller smycken som kan identifiera kunden, om inte kunden uttryckligen godkänt det.
- [ ] **Ingen retusch**, inga filter och ingen skillnad i ljus mellan före och efter.
- [ ] Antal behandlingstillfällen och tid efter behandling är ifyllda och stämmer.
- [ ] Samtycket arkiveras tillsammans med bilden. Bilden tas bort inom 30 dagar om samtycket återkallas.

### Fotoråd för nya före/efter-bilder
- **Samma vinkel och avstånd:** Markera kundens position (stol och huvudhöjd) och kamerans plats. Använd gärna stativ.
- **Samma ljus:** Fotografera i samma rum, med samma lampor och utan blixt. Inget dagsljus som varierar under dagen.
- **Samma bakgrund:** Neutral, ljus vägg eller skärm.
- **Samma inställningar:** Samma kamera eller telefon, samma zoom och inget porträttläge eller skönhetsfilter.
- **Ren hud:** Inget smink och håret undanfäst. Samma uttryck (avslappnat, munnen stängd).
- **Ingen redigering** utöver beskärning till 4:5. Beskär före- och efterbilden identiskt.
- **Dokumentera:** datum, antal behandlingar och tid sedan senaste behandling.

### Annonsregler för före/efter
Meta begränsar före/efter-bilder i annonser för kosmetiska behandlingar och granskar även landningssidan. Därför finns `SHOW_BEFORE_AFTER_ON_CAMPAIGNS` i `config.js`:
- Börja gärna med `false` och slå på `true` när annonsen är godkänd.
- Sätt **alltid `false`** för kampanjer om rynkbehandling och injektioner.
- Om Meta nekar en annons: sätt `false` för den kampanjsidan och skicka annonsen för ny granskning.

---

## Omdömen

Karusellen på startsidan visar **riktiga omdömen** som kopierats ordagrant från Bokadirekt 2026-10-28 (förnamn + initial, precis som där). Några är förkortade med "…". Betyget **4,9 av 5 (187 omdömen)** och fördelningen 169/13/4/1/0 kommer också därifrån.

Uppdatera dem i `index.html` (sök efter `class="review"`) och sök och ersätt `187` på alla sidor och i JSON-LD när antalet ändras. **Hitta aldrig på omdömen.**

---

## Lägga till en ny kampanjsida

1. Kopiera `kampanj/_mall.html` till t.ex. `kampanj/hifu.html`.
2. Sök efter `ERSÄTT` och fyll i allt. Instruktioner finns högst upp i mallen.
3. **`<h1>` = exakt samma löfte som annonsen.** Se kommentaren `ANNONSLÖFTE` högst upp i varje kampanjfil.
4. Sätt `data-campaign="hifu"` på `<body>` och lägg till `'hifu': true/false` i `SHOW_BEFORE_AFTER_ON_CAMPAIGNS`.
5. Byt Boka-knapparnas `href` mot tjänstens djuplänk (finns i `TREATMENT_LINKS`) och sätt rätt `data-treatment-id`.
6. Ange `data-offer-until="ÅÅÅÅ-MM-DD"`. Efter datumet visas ordinarie pris automatiskt.
7. Bild: välj nyckel i `images.js` eller lägg till en ny.
8. **Länka inte** sidan från menyn och lägg **inte** in den i `sitemap.xml`. Behåll `noindex`.
9. Annons-URL: `https://www.raynbeauty.se/kampanj/hifu.html?utm_source=meta&utm_medium=paid_social&utm_campaign=hifu_dec&utm_content={{ad.name}}`

---

## Spårning: så fungerar det

| Event | När | Parametrar |
|---|---|---|
| `PageView` | Alla sidor (efter samtycke) | `page_type` |
| `ViewContent` | Behandlings- och kampanjsidor | `content_name`, `content_category`, `content_type`, `page_type` |
| `Lead` *(eller `BookingClick`)* | Klick på alla Boka-länkar | `content_name`, `content_category`, `treatment_id`, `button_position`, `page_type`, `page_path`, `utm_campaign` |
| `Contact` | Klick på `tel:`/`mailto:` | `contact_method`, `button_position`, `page_path` |
| `BeforeAfterInteract` *(custom)* | Första dragningen i varje före/efter-reglage | `content_name`, `page_type`, `page_path` |

- **Ingen pixel före samtycke.** `fbevents.js` laddas först när besökaren accepterar marknadsföringscookies.
- **Unikt `event_id`** per event (`Lead.<uuid>`), som skickas till pixeln som `eventID`. Alla events sparas i `window.RAYN_EVENTS` i samma format som Conversions API använder.
- **UTM + fbclid** sparas i `sessionStorage` vid landning. UTM läggs på **alla** Bokadirekt-länkar, även på senare sidor. `fbclid` skickas inte till Bokadirekt utan används för `_fbc`-cookien efter samtycke.
- **Boka öppnas i ny flik** så att pixeln hinner skicka eventet.
- **`button_position`** (från `data-position`): `hero`, `header`, `featured-card`, `treatment-list`, `results`, `treatment-results`, `after-what`, `after-who`, `after-how`, `after-results`, `after-faq`, `price-box`, `bottom-cta`, `sticky-mobile`, `team`, `footer`. Med den ser ni i Events Manager vilka knappar som konverterar.

---

## Testa events

### 1. I webbläsaren
Öppna `…/kampanj/microneedling.html?rayn_debug=1&utm_source=test&utm_campaign=test&fbclid=test123`. Tryck F12 och öppna Console:
- Före samtycke: inga anrop till `connect.facebook.net` (kontrollera under fliken Network).
- **Acceptera**: PageView och ViewContent loggas.
- **Dra i före/efter-reglaget**: `BeforeAfterInteract` loggas en gång per reglage.
- **Boka**: `Lead` loggas, och länken går till rätt tjänst med `?utm_source=test&utm_campaign=test`.
- Skriv `RAYN_EVENTS` i konsolen för att se alla events med `event_id`.

### 2. Meta Pixel Helper
Installera [Meta Pixel Helper](https://chromewebstore.google.com/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc). Före samtycke ska tillägget visa ingen pixel. Efter "Acceptera" ska `PageView` (+ `ViewContent`) synas, och `Lead`, `Contact` och `BeforeAfterInteract` när du klickar eller drar.

### 3. Events Manager → Testa händelser
Ange webbplatsens URL och klicka **Öppna webbplats**. Acceptera cookies och klicka runt. Eventen visas i realtid. Med CAPI kopplat ska samma event synas som *Webbläsare* och *Server* med status *Deduplicerad*.

### 4. Återkalla samtycke
Gå till **Cookieinställningar** i sidfoten, slå av Marknadsföring och spara. `_fbp`/`_fbc` raderas och pixeln pausas.

---

## Koppla Conversions API

En statisk sajt kan inte skicka server-events själv, eftersom access-token aldrig får ligga i webbläsaren.

### Alternativ A: Metas CAPI Gateway (ingen kod)
Gå till Events Manager → pixel → **Inställningar → Conversions API → Konfigurera med Gateway** (AWS eller en partnerhostad gateway, t.ex. Stape). Gatewayen fångar pixelns events, och `eventID` gör att de dedupliceras automatiskt. Låt `CAPI_ENDPOINT` vara tom.

### Alternativ B: Egen serverless-funktion
`sendToCapi()` i `tracking.js` skickar varje event (efter samtycke) med `sendBeacon` som `text/plain` till `CAPI_ENDPOINT`. Exempel på en Cloudflare Worker, där `META_PIXEL_ID` och `META_ACCESS_TOKEN` ligger som *secrets*:

```js
export default {
  async fetch(request, env) {
    const cors = { 'Access-Control-Allow-Origin': 'https://www.raynbeauty.se', 'Access-Control-Allow-Methods': 'POST, OPTIONS' };
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });
    let evt; try { evt = JSON.parse(await request.text()); } catch { return new Response('Bad JSON', { status: 400 }); }
    const allowed = ['PageView', 'ViewContent', 'Lead', 'BookingClick', 'Contact', 'BeforeAfterInteract'];
    if (!allowed.includes(evt.event_name)) return new Response(null, { status: 204, headers: cors });
    const body = { data: [{
      event_name: evt.event_name, event_id: evt.event_id, event_time: evt.event_time,
      event_source_url: evt.event_source_url, action_source: 'website',
      user_data: { client_ip_address: request.headers.get('CF-Connecting-IP'), client_user_agent: request.headers.get('User-Agent'),
                   fbp: evt.user_data && evt.user_data.fbp, fbc: evt.user_data && evt.user_data.fbc },
      custom_data: evt.custom_data || {}
    }] /* , test_event_code: 'TEST12345' */ };
    const res = await fetch(`https://graph.facebook.com/v21.0/${env.META_PIXEL_ID}/events?access_token=${env.META_ACCESS_TOKEN}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    return new Response(res.ok ? 'ok' : await res.text(), { status: res.ok ? 200 : 502, headers: cors });
  }
};
```

Sätt `CAPI_ENDPOINT` till workerns URL. Access-token skapar du under Events Manager → Inställningar → Conversions API → *Generera åtkomsttoken*. Kontrollera aktuell Graph API-version hos Meta. Uppdatera integritetspolicyn när CAPI kopplas in (det finns en kommentar i avsnitt 3).

---

## Samtycke och GDPR

- Bannern har **Acceptera / Endast nödvändiga / Inställningar**. De två första är lika framträdande, i linje med IMY:s vägledning.
- Valet sparas i `localStorage` (`rayn_consent`) i 12 månader. Länken "Cookieinställningar" finns i alla sidfötter.
- Kartan laddas från Google först vid klick.
- Bilder från Unsplash och typsnitt från Google Fonts laddas utan cookies men skickar IP-adress. Detta beskrivs i policyn. För maximal integritet kan typsnitt och bilder laddas ned och hostas lokalt.
- Integritetspolicyn har ett eget avsnitt om **kundbilder i resultatgalleriet**: samtycke, minimering, ingen retusch, återkallelse och lagring.

---

## Gemensam header/footer

Header och footer är duplicerade i varje HTML-fil (inget byggsteg) och markerade med `<!-- ===== HEADER START … ===== -->` / `SLUT`. Ändra med "Sök och ersätt i alla filer". Kampanjsidorna har en egen minimal header och footer.

**Uppgifter som förekommer på flera ställen:** telefon, e-post, adress, öppettider, betyg/antal omdömen och domän (`https://www.raynbeauty.se` i canonical, Open Graph, JSON-LD, sitemap och robots).

---

## Checklista före lansering

- [ ] Rätt domän överallt (sök och ersätt `https://www.raynbeauty.se`)
- [ ] `META_PIXEL_ID` ifyllt
- [ ] `INSTAGRAM_URL` ifylld (då visas Instagram-sektionen)
- [ ] Riktiga bilder på Rania, Dana, lokalen och Instagram
- [ ] Före/efter-bilder med signerat samtycke, eller låt platshållarna stå men dölj resultatsektionen
- [ ] `[uppgift kommer]` ersatt i resultatsektionerna
- [ ] Bolagsnamn och org.nr i `integritetspolicy.html`
- [ ] Djuplänkarna testade (klicka på några Boka-knappar)
- [ ] Domänen verifierad i Meta Business Manager
- [ ] Testat med Pixel Helper och Events Manager
- [ ] Sitemap inskickad i Google Search Console
- [ ] HTTPS aktiverat
