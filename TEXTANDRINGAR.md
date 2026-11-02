# Textändringar 2026-10-29

Genomgång av alla sidor och all text som skrivs ut via JavaScript, enligt reglerna för streck, avskiljare, vänsterställning och texthierarki. Bilder, bild-URL:er, färger, typsnitt, HTML-struktur, klassnamn, id:n, länkar, config.js och Meta-spårningen är oförändrade.

Kontrollerat automatiskt efter ändringen:
- **Inga förbjudna tecken:** ingen synlig text, alt-text, title, meta description eller aria-label innehåller – — · • | eller " / " längre.
- **HTML-strukturen är oförändrad:** alla `class`, `id`, `href` och `data-*` är identiska med förra versionen, tecken för tecken.
- **Meta-spårningen skickar samma värden.** `content_name` i events är oförändrad, eftersom de synliga namnen och spårningsnamnen nu är separerade.
- **Visuellt:** granskat i mobil (390 px) och desktop (1366 px).

---

## 1. Ändrade filer

| Fil | Vad |
|---|---|
| index.html, behandlingar.html, om-oss.html, kontakt.html, integritetspolicy.html, credits.html | Texter |
| kampanj/hydrafacial.html, japanese-head-spa.html, microneedling.html, _mall.html | Texter |
| css/style.css | Textjustering, knapparnas placering, `hyphens: none` (se avsnitt 3) |
| js/consent.js | Två meningar i cookiebannern och inställningarna |
| js/before-after.js | Skärmläsartexten för reglaget |
| js/images.js | Fältet `notering` för platshållare (visas inte på sidan) |

**Oförändrade filer:** js/config.js, js/tracking.js, js/main.js, sitemap.xml, robots.txt och alla bilder.

---

## 2. Omskrivna texter

Samma ändring kan förekomma på flera sidor, till exempel i sidhuvud och sidfot. Den listas då en gång.

| Före | Efter | Sidor |
|---|---|---|
| Behandlingar & priser – RAYN Beauty Spa & Wellness Helsingborg | Behandlingar och priser hos RAYN Beauty Spa & Wellness, Helsingborg | behandlingar.html |
| – till startsidan | , till startsidan | alla sidor |
| Från en snabb glow-behandling till djuprengörande Hydrafacial och microneedling som tar hjälp av hudens egen förnyelse. Varje behandling startar med att vi går igenom din hud. | Från en snabb behandling för lyster till djuprengörande Hydrafacial och microneedling som tar hjälp av hudens egen förnyelse. Varje behandling startar med att vi går igenom din hud. | behandlingar.html |
| Hydrafacial / Aqua Glow | Hydrafacial (Aqua Glow) | behandlingar.html, index.html, kampanj/hydrafacial.html |
| Boka | Boka tid | behandlingar.html, index.html, kampanj/_mall.html, kampanj/hydrafacial.html, kampanj/japanese-head-spa.html, kampanj/microneedling.html |
| Glow Express – ansiktsbehandling | Glow Express ansiktsbehandling | behandlingar.html |
| Spa-ansiktsbehandling & Gua Sha | Ansiktsbehandling med Gua Sha | behandlingar.html |
| Avkopplande ansiktsbehandling med hudanalys, rengöring och Gua Sha-massage. | Avkopplande ansiktsbehandling med hudanalys, rengöring och massage med Gua Sha. | behandlingar.html |
| Microneedling – Derma Pen | Microneedling med Derma Pen | behandlingar.html, index.html, kampanj/_mall.html, kampanj/microneedling.html |
| Microneedling – Derma Pen, kur (4 behandlingar) | Microneedling med Derma Pen, kur med 4 behandlingar | behandlingar.html |
| Hollywood Peel kombinerad med en Aqua Glow-ansiktsbehandling. Från 18 år. | Hollywood Peel kombinerad med ansiktsbehandlingen Aqua Glow. Från 18 år. | behandlingar.html |
| Antal behandlingstillfällen: [uppgift kommer] · Tid efter behandling: [uppgift kommer] | Antal behandlingstillfällen: [uppgift kommer]. Tid efter behandling: [uppgift kommer]. | behandlingar.html, index.html, kampanj/_mall.html, kampanj/microneedling.html |
| Med en Derma Pen skapas små, kontrollerade kanaler i huden. Det sätter igång hudens naturliga reparationsprocess. Enstaka behandlingar ger främst lyster – för större effekt rekommenderas en kur på flera behandlingar. | Med en Derma Pen skapas små, kontrollerade kanaler i huden. Det sätter igång hudens naturliga reparationsprocess. Enstaka behandlingar ger främst lyster. För större effekt rekommenderas en kur på flera behandlingar. | behandlingar.html, index.html, kampanj/_mall.html, kampanj/microneedling.html |
| Fraktionerad CO2-laser behandlar huden punktvis och sätter igång hudens naturliga förnyelseprocess. Huden bedövas med en lokalbedövande kräm innan behandlingen. Inför första behandlingen bokar du en konsultation. | CO2 fraktionerad laser behandlar huden punktvis och sätter igång hudens naturliga förnyelseprocess. Huden bedövas med en lokalbedövande kräm innan behandlingen. Inför första behandlingen bokar du en konsultation. | behandlingar.html |
| Konsultation – CO2 fraktionerad laser | Konsultation inför CO2 fraktionerad laser | behandlingar.html |
| CO2 fraktionerad laser – ansiktet | CO2 fraktionerad laser för ansiktet | behandlingar.html |
| CO2 fraktionerad laser – halsen | CO2 fraktionerad laser för halsen | behandlingar.html |
| CO2 fraktionerad laser – dekolletage | CO2 fraktionerad laser för dekolletaget | behandlingar.html |
| CO2 fraktionerad laser – kropp | CO2 fraktionerad laser för kroppen | behandlingar.html |
| CO2 fraktionerad laser – litet område | CO2 fraktionerad laser för ett litet område | behandlingar.html |
| HIFU 9D – ansikte & kropp | HIFU 9D för ansikte och kropp | behandlingar.html |
| HIFU är fokuserat ultraljud som verkar i hudens djupare lager och stimulerar hudens egen kollagenbildning – utan nålar. Effekten utvecklas gradvis under flera veckor. Konsultationen är kostnadsfri. | HIFU är fokuserat ultraljud som verkar i hudens djupare lager och stimulerar hudens egen kollagenbildning, helt utan nålar. Effekten utvecklas gradvis under flera veckor. Konsultationen är kostnadsfri. | behandlingar.html |
| Konsultation – Superlifter HIFU ansikte & kropp | Konsultation inför Superlifter HIFU | behandlingar.html |
| Kostnadsfri konsultation inför din HIFU-behandling. | Kostnadsfri konsultation inför din behandling med HIFU. | behandlingar.html |
| HIFU 9D – ansiktet | HIFU 9D för ansiktet | behandlingar.html, index.html |
| HIFU 9D – ansiktet & dubbelhaka | HIFU 9D för ansiktet och dubbelhakan | behandlingar.html |
| HIFU 9D – ansiktet & hals | HIFU 9D för ansiktet och halsen | behandlingar.html |
| HIFU 9D – ansiktet, dubbelhaka & hals | HIFU 9D för ansikte, dubbelhaka och hals | behandlingar.html |
| Vår mest omfattande HIFU-behandling för ansiktet. | Vår mest omfattande behandling med HIFU för ansiktet. | behandlingar.html |
| HIFU 9D – litet område | HIFU 9D för ett litet område | behandlingar.html |
| HIFU 9D – armar med uMPT | HIFU 9D för armarna med uMPT | behandlingar.html |
| Behandling av armarna med uMPT-teknik. | Behandling av armarna med tekniken uMPT. | behandlingar.html |
| HIFU 9D – ben/lår med uMPT | HIFU 9D för ben och lår med uMPT | behandlingar.html |
| Behandling av ben eller lår med uMPT-teknik. | Behandling av ben eller lår med tekniken uMPT. | behandlingar.html |
| Superlifter HIFU – magen | Superlifter HIFU för magen | behandlingar.html |
| Laserhårborttagning – 4-Wave Laser ICE | Laserhårborttagning med 4-Wave Laser ICE | behandlingar.html |
| Hårborttagning med 4-Wave Laser ICE, som är anpassad för olika hår- och hudtyper. Flera behandlingar behövs för bästa effekt – därför finns även paketpriser. Börja med en konsultation. | Hårborttagning med 4-Wave Laser ICE, som är anpassad för olika typer av hår och hud. Flera behandlingar behövs för bästa effekt, därför finns även paketpriser. Börja med en konsultation. | behandlingar.html |
| Konsultation – laserhårborttagning | Konsultation inför laserhårborttagning | behandlingar.html |
| Överläpp + haka | Överläpp och haka | behandlingar.html |
| Paket 5 gånger – brasiliansk inkl. bikinilinje och baksidan (för kvinnor) | Paket med 5 gånger, brasiliansk inkl. bikinilinje och baksidan (för kvinnor) | behandlingar.html |
| Paket 10 gånger – brasiliansk inkl. bikinilinje och baksidan (för kvinnor) | Paket med 10 gånger, brasiliansk inkl. bikinilinje och baksidan (för kvinnor) | behandlingar.html |
| Paket 5 gånger – hela ben | Paket med 5 gånger, hela ben | behandlingar.html |
| Paket 10 gånger – hela ben | Paket med 10 gånger, hela ben | behandlingar.html |
| Vaxning av ansikte och kropp – snabbt, noggrant och i en lugn miljö. | Vaxning av ansikte och kropp. Snabbt, noggrant och i en lugn miljö. | behandlingar.html |
| Nose clean-up | Vaxning av näsan | behandlingar.html |
| Brasiliansk + armhålor (för kvinnor) | Brasiliansk och armhålor (för kvinnor) | behandlingar.html |
| Bikinilinje + halva ben (för kvinnor) | Bikinilinje och halva ben (för kvinnor) | behandlingar.html |
| Bikinilinje + hela ben | Bikinilinje och hela ben | behandlingar.html |
| Brasiliansk + halva ben (för kvinnor) | Brasiliansk och halva ben (för kvinnor) | behandlingar.html |
| Brasiliansk + halva ben + armhålor (för kvinnor) | Brasiliansk, halva ben och armhålor (för kvinnor) | behandlingar.html |
| Brasiliansk + hela ben (för kvinnor) | Brasiliansk och hela ben (för kvinnor) | behandlingar.html |
| Brasiliansk + hela ben + armhålor (för kvinnor) | Brasiliansk, hela ben och armhålor (för kvinnor) | behandlingar.html |
| Lyft, form och färg för dina egna fransar och bryn – utan lösfransar. Har du känsliga ögon eller allergier gör vi gärna ett patchtest innan. | Lyft, form och färg för dina egna fransar och bryn, helt utan lösfransar. Har du känsliga ögon eller allergier gör vi gärna ett patchtest innan. | behandlingar.html |
| Lyfter, böjer och färgar dina egna fransar. Håller ofta i 6–8 veckor. | Lyfter, böjer och färgar dina egna fransar. Håller ofta i 6 till 8 veckor. | behandlingar.html |
| Brow lamination / browlift & färg | Brow lamination & färg | behandlingar.html |
| Lift-paket – lashlift + browlift & färg | Liftpaket med lashlift, browlift och färg | behandlingar.html |
| Antal behandlingstillfällen: 1 behandling · Tid efter behandling: [uppgift kommer] | Antal behandlingstillfällen: 1 behandling. Tid efter behandling: [uppgift kommer]. | behandlingar.html, index.html |
| Dina egna fransar lyfts och böjs med en silikonform och lyftande vätskor, och färgas sedan. Resultatet håller ofta i 6–8 veckor beroende på fransarnas växtfas. | Dina egna fransar lyfts och böjs med en silikonform och lyftande vätskor, och färgas sedan. Resultatet håller ofta i 6 till 8 veckor beroende på fransarnas växtfas. | behandlingar.html, index.html |
| Har du känsliga ögon eller allergier gör vi ett patchtest innan. Är du gravid – rådgör med oss först. | Har du känsliga ögon eller allergier gör vi ett patchtest innan. Är du gravid, rådgör gärna med oss först. | behandlingar.html, index.html |
| Japanese Head Spa – 60 min | Japanese Head Spa 60 min | behandlingar.html, kampanj/japanese-head-spa.html |
| Japanese Head Spa 60 min + håranalys | Japanese Head Spa 60 min med håranalys | behandlingar.html |
| Little Stars Head Spa – kids & teens | Little Stars Head Spa för barn och unga | behandlingar.html |
| Massage för avkoppling och återhämtning. Vi anpassar tryck och fokus efter dina önskemål. Flera massagebehandlingar kan betalas med friskvårdsbidrag – de är märkta ”Friskvård” på Bokadirekt. | Massage för avkoppling och återhämtning. Vi anpassar tryck och fokus efter dina önskemål. Flera massagebehandlingar kan betalas med friskvårdsbidrag. De är märkta ”Friskvård” på Bokadirekt. | behandlingar.html |
| Hot stone-massage (för kvinnor) | Hot stone massage (för kvinnor) | behandlingar.html |
| Rygg-, axel- och huvudmassage 45 min samt hand- och fotmassage 30 min. | Massage av rygg, axlar och huvud i 45 min samt av händer och fötter i 30 min. | behandlingar.html |
| Lyx Kombo – lymfmassage + ansiktslyftande massage | Lyx Kombo med lymfmassage och ansiktslyftande massage | behandlingar.html |
| Barn- & ungdomsmassage | Massage för barn och ungdomar | behandlingar.html |
| Mjuk massage för barn och ungdomar 6–18 år. Förälder är välkommen att vara med. | Mjuk massage för barn och ungdomar 6 till 18 år. Förälder är välkommen att vara med. | behandlingar.html |
| Behandlingar särskilt anpassade för dig som är gravid – i en bekväm position och med extra omtanke om dig och din växande mage. | Behandlingar särskilt anpassade för dig som är gravid. Du ligger eller sitter bekvämt, med extra omtanke om dig och din växande mage. | behandlingar.html |
| Mom to Be – Deep Relax | Mom to Be Deep Relax | behandlingar.html |
| Nack- och axelmassage sittande i en bekväm stol. | Massage av nacke och axlar, sittande i en bekväm stol. | behandlingar.html |
| Mom to Be – Leg & Foot Relief | Mom to Be Leg & Foot Relief | behandlingar.html |
| Mom to Be – Comfort & Care | Mom to Be Comfort & Care | behandlingar.html |
| Hårbottenmassage, mini-ansiktsbehandling, hand- och fotmassage samt paraffinbad. | Massage av hårbotten, händer och fötter, en kortare ansiktsbehandling och paraffinbad. | behandlingar.html |
| Mom to Be – Glow & Relax | Mom to Be Glow & Relax | behandlingar.html |
| Tatueringsborttagning – minsta området | Tatueringsborttagning, minsta området | behandlingar.html |
| Tatueringsborttagning – litet område | Tatueringsborttagning, litet område | behandlingar.html |
| Tatueringsborttagning – medium område | Tatueringsborttagning, medium område | behandlingar.html |
| Tatueringsborttagning – stort område | Tatueringsborttagning, stort område | behandlingar.html |
| Kosmetisk tandblekning där en blekningsgel aktiveras med LED- och plasmaljus. | Kosmetisk tandblekning där en blekningsgel aktiveras med ljus från LED och plasma. | behandlingar.html |
| Massage klippkort – 5 gånger | Massage klippkort för 5 gånger | behandlingar.html |
| Köp | Köp klippkort | behandlingar.html |
| Valfritt belopp – köps enkelt via Bokadirekt. | Valfritt belopp. Köps enkelt via Bokadirekt. | behandlingar.html |
| Köp | Köp presentkort | behandlingar.html |
| Ring oss så hjälper vi dig att välja – eller boka en konsultation online. | Ring oss så hjälper vi dig att välja. Du kan också boka en konsultation online. | behandlingar.html |
| Ring 073-649 76 52 | Ring oss | behandlingar.html, index.html, om-oss.html |
| 073-649 76 52 | 073 649 76 52 | alla sidor |
| Måndag–fredag | Måndag till fredag | behandlingar.html, credits.html, index.html, integritetspolicy.html, kontakt.html, om-oss.html |
| 10–19 | 10.00 till 19.00 | behandlingar.html, credits.html, index.html, integritetspolicy.html, kontakt.html, om-oss.html |
| 10–18 | 10.00 till 18.00 | behandlingar.html, credits.html, index.html, integritetspolicy.html, kontakt.html, om-oss.html |
| 12–16 | 12.00 till 16.00 | behandlingar.html, credits.html, index.html, integritetspolicy.html, kontakt.html, om-oss.html |
| RAYN Beauty Spa & Wellness · IVO-registrerad klinik med patientförsäkring · Bokning via Bokadirekt | RAYN Beauty Spa & Wellness. Registrerad hos IVO, med patientförsäkring. Bokning via Bokadirekt. | behandlingar.html, credits.html, index.html, integritetspolicy.html, kontakt.html, om-oss.html |
| Bildkällor – RAYN Beauty Spa & Wellness | Bildkällor för RAYN Beauty Spa & Wellness | credits.html |
| Bilder på teamet, lokalen, Instagram och resultat (före/efter) är salongens egna bilder och publiceras med samtycke från de som syns på bilderna. | Bilder på teamet, lokalen, Instagram och resultat före och efter är salongens egna bilder och publiceras med samtycke från de som syns på bilderna. | credits.html |
| RAYN Beauty Spa & Wellness – Hudvård, spa & massage i Helsingborg | RAYN Beauty Spa & Wellness, hudvård, spa och massage i Helsingborg | index.html |
| Skönhet · Spa · Välmående i Helsingborg | Skönhetsklinik i Helsingborg | index.html |
| Modern teknologi inom hud- och skönhetsbehandlingar, avkopplande spa och massage – utfört av certifierade terapeuter och anpassat efter dig. | Modern teknologi för hud och skönhet, avkopplande spa och massage. Allt utförs av certifierade terapeuter och anpassas efter dig. | index.html |
| IVO-registrerad | Registrerad hos IVO | index.html, kampanj/_mall.html, kampanj/hydrafacial.html, kampanj/japanese-head-spa.html, kampanj/microneedling.html |
| Välj det som känns rätt för dig | Välj det som passar dig | index.html |
| Alla behandlingar och priser | Se alla behandlingar | index.html |
| Rengöring, massage och vård för hårbotten – en stund av total avkoppling. | Rengöring, massage och vård för hårbotten. En stund av total avkoppling. | index.html |
| Fokuserat ultraljud som verkar i hudens djupare lager – utan nålar. | Fokuserat ultraljud som verkar i hudens djupare lager, helt utan nålar. | index.html |
| Lyfter, böjer och färgar dina egna fransar – utan lösfransar. | Lyfter, böjer och färgar dina egna fransar, helt utan lösfransar. | index.html |
| Hot stone-massage | Hot stone massage | index.html |
| Dra i reglaget för att jämföra. Alla bilder är våra egna kunder och publiceras endast med skriftligt samtycke. | Dra i reglaget för att jämföra. Bilderna visar våra egna kunder och publiceras endast med skriftligt samtycke. | index.html |
| Hos oss möts den senaste teknologin inom estetiska hud- och skönhetsbehandlingar och avkopplande spa- och massageupplevelser. Oavsett om du vill ge huden ny lyster, slappna av eller bara unna dig en stund för dig själv, skräddarsyr vi behandlingen efter dina behov. | Hos oss möts den senaste teknologin inom estetiska behandlingar för hud och skönhet med avkopplande spa och massage. Oavsett om du vill ge huden ny lyster, slappna av eller bara unna dig en stund för dig själv, skräddarsyr vi behandlingen efter dina behov. | index.html |
| IVO-registrerad klinik med patientförsäkring | Registrerad hos IVO, med patientförsäkring | index.html |
| Läs mer om oss | Läs om oss | index.html |
| · behandling hos Rania | , behandling hos Rania | index.html |
| · behandling hos Dana | , behandling hos Dana | index.html |
| Läs alla omdömen på Bokadirekt | Läs fler omdömen | index.html |
| Du bokar enkelt online via Bokadirekt – dygnet runt. Klicka på ”Boka” vid den behandling du vill ha så kommer du direkt till rätt tjänst och ser lediga tider. | Du bokar enkelt online via Bokadirekt, dygnet runt. Klicka på ”Boka” vid den behandling du vill ha så kommer du direkt till rätt tjänst och ser lediga tider. | index.html |
| Ja. RAYN är en IVO-registrerad klinik med patientförsäkring, och våra terapeuter är certifierade för de behandlingar de utför. | Ja. RAYN är registrerad hos IVO och har patientförsäkring. Våra terapeuter är certifierade för de behandlingar de utför. | index.html |
| Ge dig själv en stund för dig | En stund bara för dig | index.html |
| Boka online via Bokadirekt – välj behandling och den tid som passar dig. | Boka online via Bokadirekt. Välj behandling och den tid som passar dig. | index.html |
| 4,9 ★ · 187 omdömen | 4,9 ★ av 187 omdömen | index.html |
| Integritetspolicy & cookies – RAYN Beauty Spa & Wellness | Integritetspolicy och cookies för RAYN Beauty Spa & Wellness | integritetspolicy.html |
| , org.nr [XXXXXX-XXXX] | , org.nr [ERSÄTT] | integritetspolicy.html |
| E-post: | Mejl: | integritetspolicy.html |
| 2. Vilka uppgifter vi behandlar och varför | 2. Uppgifter vi behandlar och varför | integritetspolicy.html |
| – för att komma ihåg om du har godkänt marknadsföringscookies eller inte. Rättslig grund: vårt berättigade intresse av att respektera ditt val (och det är nödvändigt för tjänsten). | , för att komma ihåg om du har godkänt marknadsföringscookies eller inte. Rättslig grund: vårt berättigade intresse av att respektera ditt val (och det är nödvändigt för tjänsten). | integritetspolicy.html |
| – om du kommer till oss via en länk med kampanjparametrar (s.k. UTM-parametrar, t.ex. | . Kommer du via en kampanjlänk (UTM, t.ex. | integritetspolicy.html |
| ) eller via en annons på Facebook/Instagram (parametern | ) eller en annons på Facebook eller Instagram ( | integritetspolicy.html |
| ) sparar vi detta tillfälligt i din webbläsare så länge besöket pågår. UTM-parametrarna skickas med när du klickar vidare till bokningen på Bokadirekt, så att vi kan se vilka kampanjer som leder till bokningar. Uppgifterna raderas när du stänger fliken. | ) sparar vi det tillfälligt i din webbläsare. Kampanjuppgifterna följer med till bokningen på Bokadirekt så att vi ser vilka kampanjer som leder till bokningar. Allt raderas när du stänger fliken, och | integritetspolicy.html |
| Meta-pixeln | Metas pixel | integritetspolicy.html |
| – endast om du har godkänt marknadsföringscookies (se avsnitt 3). Rättslig grund: ditt samtycke. | , endast om du har godkänt marknadsföringscookies (se avsnitt 3). Rättslig grund: ditt samtycke. | integritetspolicy.html |
| . När du klickar på ”Boka” lämnar du vår webbplats och de uppgifter du lämnar vid bokningen (t.ex. namn, telefonnummer och e-post) behandlas enligt Bokadirekts villkor och integritetspolicy. Vi får tillgång till din bokning för att kunna ta emot dig och utföra behandlingen. Rättslig grund: avtal (för att kunna utföra den behandling du bokat). | . När du klickar på ”Boka” lämnar du vår webbplats, och uppgifterna du lämnar vid bokningen (t.ex. namn, telefonnummer och mejladress) behandlas enligt Bokadirekts villkor och integritetspolicy. Vi får tillgång till bokningen för att kunna ta emot dig och utföra behandlingen, med avtal som rättslig grund. | integritetspolicy.html |
| Ringer eller mejlar du oss behandlar vi de uppgifter du själv lämnar för att kunna svara dig. Rättslig grund: berättigat intresse. Skicka inte känsliga uppgifter, t.ex. om din hälsa, via e-post. | Ringer eller mejlar du oss behandlar vi de uppgifter du själv lämnar för att kunna svara dig. Rättslig grund: berättigat intresse. Skicka inte känsliga uppgifter, t.ex. om din hälsa, via mejl. | integritetspolicy.html |
| 3. Cookies och Meta-pixeln | 3. Cookies och Metas pixel | integritetspolicy.html |
| Om du godkänner marknadsföringscookies laddas Meta-pixeln, ett verktyg från Meta Platforms Ireland Ltd. (Facebook och Instagram). Pixeln laddas | Om du godkänner marknadsföringscookies laddas Metas pixel, ett verktyg från Meta Platforms Ireland Ltd. (Facebook och Instagram). Pixeln laddas | integritetspolicy.html |
| se vilka behandlingar som väcker intresse, hur många som använder före/efter-jämförelsen och hur många som klickar vidare till bokning eller ringer/mejlar oss, | se vilka behandlingar som väcker intresse, hur många som använder jämförelsen före och efter och hur många som bokar, ringer eller mejlar oss, | integritetspolicy.html |
| Uppgifter som kan skickas till Meta är bland annat vilken sida du besökt, vilken behandling du tittat på eller klickat på, tidpunkt, din webbläsares tekniska information och IP-adress samt cookie-ID:n. Vi skickar inte ditt namn, telefonnummer eller e-post. Om du är inloggad på Facebook eller Instagram kan Meta koppla uppgifterna till ditt konto. | Uppgifter som kan skickas till Meta är bland annat vilken sida du besökt, vilken behandling du tittat på eller klickat på, tidpunkt, din webbläsares tekniska information, din internetadress (IP) och identiteter som sparas i cookies. Vi skickar inte ditt namn, telefonnummer eller din mejladress. Om du är inloggad på Facebook eller Instagram kan Meta koppla uppgifterna till ditt konto. | integritetspolicy.html |
| . Meta kan överföra uppgifter till USA. Meta Platforms Inc. är certifierat enligt EU–US Data Privacy Framework, vilket enligt EU-kommissionen ger en adekvat skyddsnivå. | . Meta kan överföra uppgifter till USA, och Meta Platforms Inc. är certifierat enligt Data Privacy Framework mellan EU och USA, som enligt Europeiska kommissionen ger en adekvat skyddsnivå. | integritetspolicy.html |
| Vissa bilder på webbplatsen hämtas från bildtjänsten Unsplash (images.unsplash.com). När bilderna laddas skickas din IP-adress och webbläsarens tekniska information till Unsplash för att bilderna ska kunna levereras. Unsplash sätter inga cookies via bilderna. Se | Vissa bilder på webbplatsen hämtas från bildtjänsten Unsplash (images.unsplash.com). När bilderna laddas skickas din internetadress (IP) och webbläsarens tekniska information till Unsplash för att bilderna ska kunna levereras. Unsplash sätter inga cookies via bilderna. Se | integritetspolicy.html |
| Webbplatsens typsnitt hämtas från Google Fonts. Då skickas din IP-adress till Google för att typsnitten ska kunna levereras. Google Fonts sätter inga cookies. | Webbplatsens typsnitt hämtas från Google Fonts. Då skickas din internetadress (IP) till Google för att typsnitten ska kunna levereras. Google Fonts sätter inga cookies. | integritetspolicy.html |
| Kampanjparametrar (UTM/fbclid) under besöket | Kampanjparametrar (UTM och fbclid) under besöket | integritetspolicy.html |
| Google Maps-cookies | Cookies från Google Maps | integritetspolicy.html |
| På webbplatsen visar vi före- och efterbilder från behandlingar hos oss. Så hanterar vi dem: | På webbplatsen visar vi bilder före och efter behandlingar hos oss. Så hanterar vi dem: | integritetspolicy.html |
| Vi publicerar aldrig en bild utan att kunden först har gett ett skriftligt, frivilligt samtycke. Samtycket anger var bilden får visas (webbplats, sociala medier och/eller annonser). | Vi publicerar aldrig en bild utan att kunden först har gett ett skriftligt, frivilligt samtycke. Samtycket anger var bilden får visas: webbplats, sociala medier eller annonser. | integritetspolicy.html |
| Meta-cookies: upp till 90 dagar. Metas egen lagring styrs av Metas villkor. | Metas cookies: upp till 90 dagar. Metas egen lagring styrs av Metas villkor. | integritetspolicy.html |
| E-post och samtal: så länge det behövs för att hantera ditt ärende. | Mejl och samtal: så länge det behövs för att hantera ditt ärende. | integritetspolicy.html |
| – bokningssystem (när du bokar). | , vårt bokningssystem (när du bokar). | integritetspolicy.html |
| – annonsmätning (endast med ditt samtycke). | , för annonsmätning (endast med ditt samtycke). | integritetspolicy.html |
| – karta (endast om du klickar på den) och typsnitt. | , för karta (endast om du klickar på den) och typsnitt. | integritetspolicy.html |
| – leverans av vissa bilder. | , för leverans av vissa bilder. | integritetspolicy.html |
| – driftar webbplatsen och kan behandla tekniska loggar. | , som driftar webbplatsen och kan behandla tekniska loggar. | integritetspolicy.html |
| [ERSÄTT: Behandling + erbjudande] i Helsingborg – RAYN Beauty Spa & Wellness | [ERSÄTT: Behandling och erbjudande] i Helsingborg hos RAYN Beauty Spa & Wellness | kampanj/_mall.html |
| [ERSÄTT: 1–2 meningar som bekräftar löftet. Positiv och trygg ton – inga garantier.] | [ERSÄTT: En till två meningar som bekräftar löftet. Positiv och trygg ton, inga garantier.] | kampanj/_mall.html |
| [ERSÄTT: Vem passar behandlingen för – utan att värdera utseende.] | [ERSÄTT: Vem passar behandlingen för, utan att värdera utseende.] | kampanj/_mall.html |
| IVO-registrerad klinik | Registrerad hos IVO | kampanj/_mall.html, kampanj/hydrafacial.html, kampanj/japanese-head-spa.html, kampanj/microneedling.html, om-oss.html |
| under tillsyn av Inspektionen för vård och omsorg. | , Inspektionen för vård och omsorg. | kampanj/_mall.html, kampanj/hydrafacial.html, kampanj/japanese-head-spa.html, kampanj/microneedling.html |
| – du är skyddad om något mot förmodan inte blir som det ska. | som skyddar dig om något mot förmodan inte blir som det ska. | kampanj/_mall.html, kampanj/hydrafacial.html, kampanj/japanese-head-spa.html, kampanj/microneedling.html |
| Du bokar online via Bokadirekt, där du ser alla lediga tider. Vi har en avbokningspolicy på 24 timmar – vid senare avbokning eller uteblivet besök debiteras hela beloppet. | Du bokar online via Bokadirekt, där du ser alla lediga tider. Vi har en avbokningspolicy på 24 timmar. Vid senare avbokning eller uteblivet besök debiteras hela beloppet. | kampanj/_mall.html, kampanj/hydrafacial.html, kampanj/japanese-head-spa.html, kampanj/microneedling.html |
| [ERSÄTT: Behandling – tid – pris.] | [ERSÄTT: Behandling, tid och pris.] | kampanj/_mall.html |
| RAYN Beauty Spa & Wellness · Roskildegatan 4, 252 21 Helsingborg · | RAYN Beauty Spa & Wellness, Roskildegatan 4, 252 21 Helsingborg. Telefon | kampanj/_mall.html, kampanj/hydrafacial.html, kampanj/japanese-head-spa.html, kampanj/microneedling.html |
| [ERSÄTT: Behandling · tid] | [ERSÄTT: Behandling och tid] | kampanj/_mall.html |
| Hydrafacial för 799 kr i Helsingborg – RAYN Beauty Spa & Wellness | Hydrafacial för 799 kr i Helsingborg hos RAYN Beauty Spa & Wellness | kampanj/hydrafacial.html |
| Hydrafacial för 799 kr – djuprengöring och återfuktning på 60 minuter | Hydrafacial i 60 minuter för 799 kr | kampanj/hydrafacial.html |
| Ge huden en ordentlig nystart. Hydrafacial / Aqua Glow kombinerar exfoliering, porrengöring och återfuktning i en och samma avkopplande behandling. | Ge huden en ordentlig nystart. Hydrafacial (Aqua Glow) kombinerar exfoliering, porrengöring och återfuktning i en och samma avkopplande behandling. | kampanj/hydrafacial.html |
| Flera steg – i en behandling | Flera steg i en behandling | kampanj/hydrafacial.html |
| Hydrafacial, som vi kallar Aqua Glow, är en ansiktsbehandling i flera steg. Huden exfolieras varsamt, ångas för att öppna porerna och rengörs sedan med en smärtfri vakuumteknik samtidigt som den behandlas med tre olika återfuktande serum. | Hydrafacial, som vi kallar Aqua Glow, är en ansiktsbehandling i flera steg. Huden exfolieras varsamt och ångas för att öppna porerna. Sedan rengörs den med en smärtfri vakuumteknik samtidigt som den behandlas med tre olika återfuktande serum. | kampanj/hydrafacial.html |
| För dig som vill ge huden lite extra omtanke | Extra omtanke för din hud | kampanj/hydrafacial.html |
| Hydrafacial passar dig som vill ha en fräsch och återfuktad känsla i huden – inför en fest, som en återkommande del av din hudvård eller bara för att unna dig en stund för dig själv. Behandlingen startar alltid med en hälsodeklaration. | Hydrafacial passar dig som vill ha en fräsch och återfuktad känsla i huden. Den passar inför en fest, som en återkommande del av din hudvård eller när du bara vill unna dig en stund för dig själv. Behandlingen startar alltid med en hälsodeklaration. | kampanj/hydrafacial.html |
| Berätta för oss innan behandlingen om du är gravid, har en aktiv hudinfektion eller utslag, nyligen gjort en laser- eller peelingbehandling eller använder receptbelagd hudmedicin. Då anpassar vi behandlingen eller föreslår ett annat alternativ. | Berätta för oss innan behandlingen om du är gravid, har en aktiv hudinfektion eller utslag, nyligen gjort en behandling med laser eller peeling eller använder receptbelagd hudmedicin. Då anpassar vi behandlingen eller föreslår ett annat alternativ. | kampanj/hydrafacial.html |
| Hälsodeklaration & samtal | Hälsodeklaration och samtal | kampanj/hydrafacial.html |
| Rengöring & exfoliering | Rengöring och exfoliering | kampanj/hydrafacial.html |
| Radiofrekvens, ultraljud och kylning, sedan serum och kräm anpassade efter din hudtyp. | Radiofrekvens, ultraljud och kylning. Sist serum och kräm anpassade efter din hudtyp. | kampanj/hydrafacial.html |
| Hydrafacial / Aqua Glow – 60 minuter för 799 kr. Välj en tid som passar dig. | Hydrafacial (Aqua Glow) i 60 minuter för 799 kr. Välj en tid som passar dig. | kampanj/hydrafacial.html |
| Hydrafacial · 60 min | Hydrafacial, 60 min | kampanj/hydrafacial.html |
| 799 kr · kampanj | Kampanjpris 799 kr | kampanj/hydrafacial.html |
| Japanese Head Spa för 695 kr i Helsingborg – RAYN Beauty Spa & Wellness | Japanese Head Spa för 695 kr i Helsingborg hos RAYN Beauty Spa & Wellness | kampanj/japanese-head-spa.html |
| Japanese Head Spa – 60 minuter av total avkoppling för 695 kr | 60 minuter Japanese Head Spa för 695 kr | kampanj/japanese-head-spa.html |
| En stund där du bara får vara | En stund att bara vara | kampanj/japanese-head-spa.html |
| Japanese Head Spa är en lyxig behandling för hårbotten och hår med ursprung i Japan – ibland kallad ”ansiktsbehandling för hårbotten”. Den kombinerar djup rengöring, hårvård och avkopplande massage. | Japanese Head Spa är en lyxig behandling för hårbotten och hår med ursprung i Japan. Den kallas ibland ”ansiktsbehandling för hårbotten” och kombinerar djup rengöring, hårvård och avkopplande massage. | kampanj/japanese-head-spa.html |
| Du ligger bekvämt medan hårbotten rengörs, masseras och får vård. Behandlingen avslutas med torkning och tips för hår- och hårbottenvård. | Du ligger bekvämt medan hårbotten rengörs, masseras och får vård. Behandlingen avslutas med torkning och tips för vården av hår och hårbotten. | kampanj/japanese-head-spa.html |
| Varmvattenmassage | Massage med varmt vatten | kampanj/japanese-head-spa.html |
| Head spa passar dig som vill koppla av en stund från vardagen, som gärna blir ompysslad eller som vill ge bort en upplevelse till någon du tycker om. Du behöver inte förbereda något – kom som du är. | Head spa passar dig som vill koppla av en stund från vardagen, som gärna blir ompysslad eller som vill ge bort en upplevelse till någon du tycker om. Du behöver inte förbereda något. Kom som du är. | kampanj/japanese-head-spa.html |
| Så går din stund hos oss till | Så går stunden till | kampanj/japanese-head-spa.html |
| Vård & avslutning | Vård och avslutning | kampanj/japanese-head-spa.html |
| Ja. Japanese Head Spa Lyx 90 min finns både med ansiktsbehandling (kampanjpris 1 195 kr t.o.m. 16 november) och med ryggmassage. Det finns även en variant med håranalys. Du väljer när du bokar. | Ja. Japanese Head Spa Lyx 90 min finns både med ansiktsbehandling (kampanjpris 1 195 kr t.o.m. 16 november) och med ryggmassage. Det finns även en variant med håranalys, och du väljer när du bokar. | kampanj/japanese-head-spa.html |
| Ge dig själv 60 minuter av lugn | Unna dig 60 minuter lugn | kampanj/japanese-head-spa.html |
| Japanese Head Spa · 60 min | Japanese Head Spa, 60 min | kampanj/japanese-head-spa.html |
| 695 kr · kampanj | Kampanjpris 695 kr | kampanj/japanese-head-spa.html |
| Microneedling för 1 199 kr i Helsingborg – RAYN Beauty Spa & Wellness | Microneedling för 1 199 kr i Helsingborg hos RAYN Beauty Spa & Wellness | kampanj/microneedling.html |
| Microneedling med Derma Pen – nu 1 199 kr | Microneedling med Derma Pen för 1 199 kr | kampanj/microneedling.html |
| En behandling som tar hjälp av hudens egen förmåga att förnya sig. Utförs av certifierade terapeuter på en IVO-registrerad klinik med patientförsäkring. | En behandling som tar hjälp av hudens egen förmåga att förnya sig. Den utförs av certifierade terapeuter på en klinik som är registrerad hos IVO och har patientförsäkring. | kampanj/microneedling.html |
| En enstaka behandling ger främst lyster. För större effekt rekommenderas en kur på flera behandlingar över tid – resultatet utvecklas gradvis och varierar mellan individer. | En enstaka behandling ger främst lyster. För större effekt rekommenderas en kur på flera behandlingar över tid. Resultatet utvecklas gradvis och varierar mellan individer. | kampanj/microneedling.html |
| För dig som vill arbeta med hudens struktur | När du vill arbeta med hudstrukturen | kampanj/microneedling.html |
| Skin mask & eftervård | Skin mask och eftervård | kampanj/microneedling.html |
| Det beror på din hud och vad du vill arbeta med. En enstaka behandling ger främst lyster – för större effekt rekommenderas en kur. Vi erbjuder en kur med 4 behandlingar för 4 800 kr. | Det beror på din hud och vad du vill arbeta med. En enstaka behandling ger främst lyster, och för större effekt rekommenderas en kur. Vi erbjuder en kur med 4 behandlingar för 4 800 kr. | kampanj/microneedling.html |
| Undvik sol, smink och träning som ger mycket svett de första dygnen, och använd solskydd. Du får eftervårdsråd av oss. | Undvik sol, smink och träning som ger mycket svett de första dygnen, och använd solskydd. Du får råd om eftervård av oss. | kampanj/microneedling.html |
| Microneedling med Derma Pen – 60 minuter för 1 199 kr. Från 18 år. | Microneedling med Derma Pen i 60 minuter för 1 199 kr. Från 18 år. | kampanj/microneedling.html |
| Microneedling · 60 min | Microneedling, 60 min | kampanj/microneedling.html |
| 1 199 kr · från 18 år | 1 199 kr, från 18 år | kampanj/microneedling.html |
| Kontakt & hitta hit – RAYN Beauty Spa & Wellness Helsingborg | Kontakt och hitta hit, RAYN Beauty Spa & Wellness Helsingborg | kontakt.html |
| Vi finns på Roskildegatan 4 i Helsingborg. Ring, mejla eller boka direkt online – vi ser fram emot att träffa dig. | Vi finns på Roskildegatan 4 i Helsingborg. Ring, mejla eller boka direkt online, vi ser fram emot att träffa dig. | kontakt.html |
| E-post | Mejl | kontakt.html |
| Skicka inte känsliga hälsouppgifter via e-post – berätta hellre vid ditt besök. | Skicka inte känsliga hälsouppgifter via mejl. Berätta hellre vid ditt besök. | kontakt.html |
| All bokning sker online via Bokadirekt, dygnet runt. Vi har en avbokningspolicy på 24 timmar – vid senare avbokning eller uteblivet besök debiteras hela beloppet. | All bokning sker online via Bokadirekt, dygnet runt. Vi har en avbokningspolicy på 24 timmar. Vid senare avbokning eller uteblivet besök debiteras hela beloppet. | kontakt.html |
| Om oss – RAYN Beauty Spa & Wellness i Helsingborg | Om oss på RAYN Beauty Spa & Wellness i Helsingborg | om-oss.html |
| En klinik i Helsingborg där modern teknologi och omtanke får lika stor plats – och där din trygghet alltid står i fokus. | En klinik i Helsingborg där modern teknologi och omtanke får lika stor plats. Din trygghet står alltid i fokus. | om-oss.html |
| På Roskildegatan 4 i Helsingborg har vi länge tagit emot kunder för hud- och skönhetsbehandlingar – tidigare under namnet Pranari. I dag heter vi RAYN Beauty Spa & Wellness. | På Roskildegatan 4 i Helsingborg har vi länge tagit emot kunder för behandlingar av hud och skönhet, tidigare under namnet Pranari. I dag heter vi RAYN Beauty Spa & Wellness. | om-oss.html |
| Med det nya namnet vill vi visa vad vi alltid har trott på: att skönhet och välmående hör ihop. Här kombinerar vi den senaste teknologin inom estetiska behandlingar med avkopplande spa och massage – i en harmonisk miljö där du får ta den tid du behöver. | Med det nya namnet vill vi visa vad vi alltid har trott på: att skönhet och välmående hör ihop. Här kombinerar vi den senaste teknologin inom estetiska behandlingar med avkopplande spa och massage. Allt sker i en harmonisk miljö där du får ta den tid du behöver. | om-oss.html |
| Vi är en IVO-registrerad klinik med patientförsäkring. Innan en estetisk behandling går vi igenom din hälsa, din hud och dina förväntningar – och svarar ärligt på vad en behandling kan och inte kan göra. | Vi är registrerade hos IVO och har patientförsäkring. Innan en estetisk behandling går vi igenom din hälsa, din hud och dina förväntningar. Vi svarar ärligt på vad en behandling kan och inte kan göra. | om-oss.html |
| Hög service, personligt bemötande och behandlingar som utförs med stor noggrannhet och omtanke – från första kontakt till sista detalj. | Hög service, personligt bemötande och behandlingar som utförs med stor noggrannhet och omtanke. Från första kontakt till sista detalj. | om-oss.html |
| Klinikägare · spaterapeut | Klinikägare och spaterapeut | om-oss.html |
| Du ska kunna känna dig helt trygg | Trygghet i varje steg | om-oss.html |
| IVO-registrerad klinik. | Registrerad hos IVO. | om-oss.html |
| 18-årsgräns. | Från 18 år. | om-oss.html |
| Boka din behandling online – eller ring oss om du vill ha hjälp att välja. | Boka din behandling online. Ring oss gärna om du vill ha hjälp att välja. | om-oss.html |

## Sidtitlar och metabeskrivningar

| Före | Efter | Sida |
|---|---|---|
| [meta description] Alla behandlingar och priser: Hydrafacial, microneedling, CO2-laser, HIFU 9D, laserhårborttagning, vaxning, fransar & bryn, Japanese Head Spa, massage och mer. Boka direkt. | [meta description] Alla behandlingar och priser: Hydrafacial, microneedling, CO2 laser, HIFU 9D, laserhårborttagning, vaxning, fransar, bryn, Japanese Head Spa, massage och mer. Boka direkt. | behandlingar.html |
| [meta og:title] Behandlingar & priser – RAYN Beauty Spa & Wellness Helsingborg | [meta og:title] Behandlingar och priser hos RAYN Beauty Spa & Wellness, Helsingborg | behandlingar.html |
| [meta og:description] Alla behandlingar och priser: Hydrafacial, microneedling, CO2-laser, HIFU 9D, laserhårborttagning, vaxning, fransar & bryn, Japanese Head Spa, massage och mer. Boka direkt. | [meta og:description] Alla behandlingar och priser: Hydrafacial, microneedling, CO2 laser, HIFU 9D, laserhårborttagning, vaxning, fransar, bryn, Japanese Head Spa, massage och mer. Boka direkt. | behandlingar.html |
| [meta og:title] Bildkällor – RAYN Beauty Spa & Wellness | [meta og:title] Bildkällor för RAYN Beauty Spa & Wellness | credits.html |
| [meta description] Där skönhet möter välmående. Hydrafacial, microneedling, HIFU, laser, Japanese Head Spa, fransar & bryn och massage i Helsingborg. IVO-registrerad klinik. Boka online. | [meta description] Där skönhet möter välmående. Hydrafacial, microneedling, HIFU, laser, Japanese Head Spa, fransar, bryn och massage i Helsingborg. Klinik registrerad hos IVO. Boka online. | index.html |
| [meta og:title] RAYN Beauty Spa & Wellness – Hudvård, spa & massage i Helsingborg | [meta og:title] RAYN Beauty Spa & Wellness, hudvård, spa och massage i Helsingborg | index.html |
| [meta og:description] Där skönhet möter välmående. Hydrafacial, microneedling, HIFU, laser, Japanese Head Spa, fransar & bryn och massage i Helsingborg. IVO-registrerad klinik. Boka online. | [meta og:description] Där skönhet möter välmående. Hydrafacial, microneedling, HIFU, laser, Japanese Head Spa, fransar, bryn och massage i Helsingborg. Klinik registrerad hos IVO. Boka online. | index.html |
| [meta description] Så behandlar RAYN Beauty Spa & Wellness dina personuppgifter, hur vi använder cookies och Meta-pixeln, och vilka rättigheter du har enligt GDPR. | [meta description] Så behandlar RAYN Beauty Spa & Wellness dina personuppgifter, hur vi använder cookies och Metas pixel, och vilka rättigheter du har enligt GDPR. | integritetspolicy.html |
| [meta og:title] Integritetspolicy & cookies – RAYN Beauty Spa & Wellness | [meta og:title] Integritetspolicy och cookies för RAYN Beauty Spa & Wellness | integritetspolicy.html |
| [meta og:description] Så behandlar RAYN Beauty Spa & Wellness dina personuppgifter, hur vi använder cookies och Meta-pixeln, och vilka rättigheter du har enligt GDPR. | [meta og:description] Så behandlar RAYN Beauty Spa & Wellness dina personuppgifter, hur vi använder cookies och Metas pixel, och vilka rättigheter du har enligt GDPR. | integritetspolicy.html |
| [meta description] [ERSÄTT: 140–160 tecken som sammanfattar erbjudandet: behandling, pris, tid och trygghet.] | [meta description] [ERSÄTT: 140 till 160 tecken som sammanfattar erbjudandet: behandling, pris, tid och trygghet.] | kampanj/_mall.html |
| [meta og:title] [ERSÄTT: Behandling + erbjudande] i Helsingborg – RAYN Beauty Spa & Wellness | [meta og:title] [ERSÄTT: Behandling och erbjudande] i Helsingborg hos RAYN Beauty Spa & Wellness | kampanj/_mall.html |
| [meta og:description] [ERSÄTT: 140–160 tecken som sammanfattar erbjudandet: behandling, pris, tid och trygghet.] | [meta og:description] [ERSÄTT: 140 till 160 tecken som sammanfattar erbjudandet: behandling, pris, tid och trygghet.] | kampanj/_mall.html |
| [meta description] Hydrafacial / Aqua Glow för 799 kr (ord. 999 kr). Exfoliering, porrengöring och återfuktande serum på 60 minuter. IVO-registrerad klinik i Helsingborg. | [meta description] Hydrafacial (Aqua Glow) för 799 kr, ordinarie pris 999 kr. Exfoliering, porrengöring och återfuktande serum på 60 minuter. Klinik registrerad hos IVO i Helsingborg. | kampanj/hydrafacial.html |
| [meta og:title] Hydrafacial för 799 kr i Helsingborg – RAYN Beauty Spa & Wellness | [meta og:title] Hydrafacial för 799 kr i Helsingborg hos RAYN Beauty Spa & Wellness | kampanj/hydrafacial.html |
| [meta og:description] Hydrafacial / Aqua Glow för 799 kr (ord. 999 kr). Exfoliering, porrengöring och återfuktande serum på 60 minuter. IVO-registrerad klinik i Helsingborg. | [meta og:description] Hydrafacial (Aqua Glow) för 799 kr, ordinarie pris 999 kr. Exfoliering, porrengöring och återfuktande serum på 60 minuter. Klinik registrerad hos IVO i Helsingborg. | kampanj/hydrafacial.html |
| [meta description] Japanese Head Spa 60 min för 695 kr (ord. 895 kr). Rengöring, massage och vård för hårbotten, huvud, nacke och axlar i Helsingborg. | [meta description] Japanese Head Spa 60 min för 695 kr, ordinarie pris 895 kr. Rengöring, massage och vård för hårbotten, huvud, nacke och axlar i Helsingborg. | kampanj/japanese-head-spa.html |
| [meta og:title] Japanese Head Spa för 695 kr i Helsingborg – RAYN Beauty Spa & Wellness | [meta og:title] Japanese Head Spa för 695 kr i Helsingborg hos RAYN Beauty Spa & Wellness | kampanj/japanese-head-spa.html |
| [meta og:description] Japanese Head Spa 60 min för 695 kr (ord. 895 kr). Rengöring, massage och vård för hårbotten, huvud, nacke och axlar i Helsingborg. | [meta og:description] Japanese Head Spa 60 min för 695 kr, ordinarie pris 895 kr. Rengöring, massage och vård för hårbotten, huvud, nacke och axlar i Helsingborg. | kampanj/japanese-head-spa.html |
| [meta description] Microneedling med Derma Pen inkl. skin mask för 1 199 kr (ord. 1 599 kr). IVO-registrerad klinik med patientförsäkring i Helsingborg. Från 18 år. | [meta description] Microneedling med Derma Pen inkl. skin mask för 1 199 kr, ordinarie pris 1 599 kr. Klinik registrerad hos IVO, med patientförsäkring, i Helsingborg. Från 18 år. | kampanj/microneedling.html |
| [meta og:title] Microneedling för 1 199 kr i Helsingborg – RAYN Beauty Spa & Wellness | [meta og:title] Microneedling för 1 199 kr i Helsingborg hos RAYN Beauty Spa & Wellness | kampanj/microneedling.html |
| [meta og:description] Microneedling med Derma Pen inkl. skin mask för 1 199 kr (ord. 1 599 kr). IVO-registrerad klinik med patientförsäkring i Helsingborg. Från 18 år. | [meta og:description] Microneedling med Derma Pen inkl. skin mask för 1 199 kr, ordinarie pris 1 599 kr. Klinik registrerad hos IVO, med patientförsäkring, i Helsingborg. Från 18 år. | kampanj/microneedling.html |
| [meta description] RAYN Beauty Spa & Wellness, Roskildegatan 4, 252 21 Helsingborg. Telefon 073-649 76 52. Öppettider, karta och kontaktuppgifter. Boka online via Bokadirekt. | [meta description] RAYN Beauty Spa & Wellness, Roskildegatan 4, 252 21 Helsingborg. Telefon 073 649 76 52. Öppettider, karta och kontaktuppgifter. Boka online via Bokadirekt. | kontakt.html |
| [meta og:title] Kontakt & hitta hit – RAYN Beauty Spa & Wellness Helsingborg | [meta og:title] Kontakt och hitta hit, RAYN Beauty Spa & Wellness Helsingborg | kontakt.html |
| [meta og:description] RAYN Beauty Spa & Wellness, Roskildegatan 4, 252 21 Helsingborg. Telefon 073-649 76 52. Öppettider, karta och kontaktuppgifter. Boka online via Bokadirekt. | [meta og:description] RAYN Beauty Spa & Wellness, Roskildegatan 4, 252 21 Helsingborg. Telefon 073 649 76 52. Öppettider, karta och kontaktuppgifter. Boka online via Bokadirekt. | kontakt.html |
| [meta description] Lär känna RAYN Beauty Spa & Wellness – en IVO-registrerad klinik med patientförsäkring och certifierade terapeuter, där skönhet möter välmående. | [meta description] Lär känna RAYN Beauty Spa & Wellness. En klinik registrerad hos IVO, med patientförsäkring och certifierade terapeuter, där skönhet möter välmående. | om-oss.html |
| [meta og:title] Om oss – RAYN Beauty Spa & Wellness i Helsingborg | [meta og:title] Om oss på RAYN Beauty Spa & Wellness i Helsingborg | om-oss.html |
| [meta og:description] Lär känna RAYN Beauty Spa & Wellness – en IVO-registrerad klinik med patientförsäkring och certifierade terapeuter, där skönhet möter välmående. | [meta og:description] Lär känna RAYN Beauty Spa & Wellness. En klinik registrerad hos IVO, med patientförsäkring och certifierade terapeuter, där skönhet möter välmående. | om-oss.html |

## Skärmläsartexter (aria-label)

| Före | Efter | Sidor |
|---|---|---|
| Boka Hydrafacial / Aqua Glow på Bokadirekt (öppnas i ny flik) | Boka tid, Hydrafacial (Aqua Glow), på Bokadirekt (öppnas i ny flik) | behandlingar.html, kampanj/hydrafacial.html |
| Boka Glow Express – ansiktsbehandling på Bokadirekt (öppnas i ny flik) | Boka tid, Glow Express ansiktsbehandling, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Spa-ansiktsbehandling & Gua Sha på Bokadirekt (öppnas i ny flik) | Boka tid, Ansiktsbehandling med Gua Sha, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Ansiktsmassage på Bokadirekt (öppnas i ny flik) | Boka tid, Ansiktsmassage, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Microneedling – Derma Pen på Bokadirekt (öppnas i ny flik) | Boka tid, Microneedling med Derma Pen, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Microneedling – Derma Pen, kur (4 behandlingar) på Bokadirekt (öppnas i ny flik) | Boka tid, Microneedling med Derma Pen, kur med 4 behandlingar, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Hollywood Peel Classic på Bokadirekt (öppnas i ny flik) | Boka tid, Hollywood Peel Classic, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka RAYN Lyx Hollywood Peel på Bokadirekt (öppnas i ny flik) | Boka tid, RAYN Lyx Hollywood Peel, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Jämför före och efter: Microneedling – Derma Pen. Dra åt höger för att visa mer av före-bilden. | Jämför före och efter: Microneedling med Derma Pen. Dra åt höger för att visa mer av bilden före. | behandlingar.html, index.html, kampanj/_mall.html, kampanj/microneedling.html |
| Boka Microneedling – Derma Pen (öppnas i ny flik) | Boka Microneedling med Derma Pen (öppnas i ny flik) | behandlingar.html, index.html, kampanj/_mall.html, kampanj/microneedling.html |
| Boka Konsultation – CO2 fraktionerad laser på Bokadirekt (öppnas i ny flik) | Boka tid, Konsultation inför CO2 fraktionerad laser, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka CO2 fraktionerad laser – ansiktet på Bokadirekt (öppnas i ny flik) | Boka tid, CO2 fraktionerad laser för ansiktet, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka CO2 fraktionerad laser – halsen på Bokadirekt (öppnas i ny flik) | Boka tid, CO2 fraktionerad laser för halsen, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka CO2 fraktionerad laser – dekolletage på Bokadirekt (öppnas i ny flik) | Boka tid, CO2 fraktionerad laser för dekolletaget, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka CO2 fraktionerad laser – kropp på Bokadirekt (öppnas i ny flik) | Boka tid, CO2 fraktionerad laser för kroppen, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka CO2 fraktionerad laser – litet område på Bokadirekt (öppnas i ny flik) | Boka tid, CO2 fraktionerad laser för ett litet område, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Konsultation – Superlifter HIFU ansikte & kropp på Bokadirekt (öppnas i ny flik) | Boka tid, Konsultation inför Superlifter HIFU, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka HIFU 9D – ansiktet på Bokadirekt (öppnas i ny flik) | Boka tid, HIFU 9D för ansiktet, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka HIFU 9D – ansiktet & dubbelhaka på Bokadirekt (öppnas i ny flik) | Boka tid, HIFU 9D för ansiktet och dubbelhakan, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka HIFU 9D – ansiktet & hals på Bokadirekt (öppnas i ny flik) | Boka tid, HIFU 9D för ansiktet och halsen, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka HIFU 9D – ansiktet, dubbelhaka & hals på Bokadirekt (öppnas i ny flik) | Boka tid, HIFU 9D för ansikte, dubbelhaka och hals, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka HIFU 9D – litet område på Bokadirekt (öppnas i ny flik) | Boka tid, HIFU 9D för ett litet område, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka HIFU 9D – armar med uMPT på Bokadirekt (öppnas i ny flik) | Boka tid, HIFU 9D för armarna med uMPT, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka HIFU 9D – ben/lår med uMPT på Bokadirekt (öppnas i ny flik) | Boka tid, HIFU 9D för ben och lår med uMPT, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Superlifter HIFU – magen på Bokadirekt (öppnas i ny flik) | Boka tid, Superlifter HIFU för magen, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Konsultation – laserhårborttagning på Bokadirekt (öppnas i ny flik) | Boka tid, Konsultation inför laserhårborttagning, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Överläpp eller haka på Bokadirekt (öppnas i ny flik) | Boka tid, Överläpp eller haka, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Överläpp + haka på Bokadirekt (öppnas i ny flik) | Boka tid, Överläpp och haka, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Ansiktet på Bokadirekt (öppnas i ny flik) | Boka tid, Ansiktet, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Ansikte & hals på Bokadirekt (öppnas i ny flik) | Boka tid, Ansikte & hals, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Armhålor på Bokadirekt (öppnas i ny flik) | Boka tid, Armhålor, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Halva armar på Bokadirekt (öppnas i ny flik) | Boka tid, Halva armar, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Hela armar på Bokadirekt (öppnas i ny flik) | Boka tid, Hela armar, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Fingrar på Bokadirekt (öppnas i ny flik) | Boka tid, Fingrar, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Bröstvårta på Bokadirekt (öppnas i ny flik) | Boka tid, Bröstvårta, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Mage, kvinna på Bokadirekt (öppnas i ny flik) | Boka tid, Mage, kvinna, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Mage & bröst, man på Bokadirekt (öppnas i ny flik) | Boka tid, Mage & bröst, man, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Rygg på Bokadirekt (öppnas i ny flik) | Boka tid, Rygg, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Brasiliansk inkl. bikinilinje och baksidan (för kvinnor) på Bokadirekt (öppnas i ny flik) | Boka tid, Brasiliansk inkl. bikinilinje och baksidan (för kvinnor), på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Halva ben på Bokadirekt (öppnas i ny flik) | Boka tid, Halva ben, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Hela ben på Bokadirekt (öppnas i ny flik) | Boka tid, Hela ben, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Tår på Bokadirekt (öppnas i ny flik) | Boka tid, Tår, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Paket 5 gånger – brasiliansk inkl. bikinilinje och baksidan (för kvinnor) på Bokadirekt (öppnas i ny flik) | Boka tid, Paket med 5 gånger, brasiliansk inkl. bikinilinje och baksidan (för kvinnor), på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Paket 10 gånger – brasiliansk inkl. bikinilinje och baksidan (för kvinnor) på Bokadirekt (öppnas i ny flik) | Boka tid, Paket med 10 gånger, brasiliansk inkl. bikinilinje och baksidan (för kvinnor), på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Paket 5 gånger – hela ben på Bokadirekt (öppnas i ny flik) | Boka tid, Paket med 5 gånger, hela ben, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Paket 10 gånger – hela ben på Bokadirekt (öppnas i ny flik) | Boka tid, Paket med 10 gånger, hela ben, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Nose clean-up på Bokadirekt (öppnas i ny flik) | Boka tid, Vaxning av näsan, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Ansikte (hela) på Bokadirekt (öppnas i ny flik) | Boka tid, Ansikte (hela), på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Bikinilinje på Bokadirekt (öppnas i ny flik) | Boka tid, Bikinilinje, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Bikinivax på Bokadirekt (öppnas i ny flik) | Boka tid, Bikinivax, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Brasiliansk (för kvinnor) på Bokadirekt (öppnas i ny flik) | Boka tid, Brasiliansk (för kvinnor), på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Brasiliansk + armhålor (för kvinnor) på Bokadirekt (öppnas i ny flik) | Boka tid, Brasiliansk och armhålor (för kvinnor), på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Bikinilinje + halva ben (för kvinnor) på Bokadirekt (öppnas i ny flik) | Boka tid, Bikinilinje och halva ben (för kvinnor), på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Bikinilinje + hela ben på Bokadirekt (öppnas i ny flik) | Boka tid, Bikinilinje och hela ben, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Brasiliansk + halva ben (för kvinnor) på Bokadirekt (öppnas i ny flik) | Boka tid, Brasiliansk och halva ben (för kvinnor), på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Brasiliansk + halva ben + armhålor (för kvinnor) på Bokadirekt (öppnas i ny flik) | Boka tid, Brasiliansk, halva ben och armhålor (för kvinnor), på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Brasiliansk + hela ben (för kvinnor) på Bokadirekt (öppnas i ny flik) | Boka tid, Brasiliansk och hela ben (för kvinnor), på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Brasiliansk + hela ben + armhålor (för kvinnor) på Bokadirekt (öppnas i ny flik) | Boka tid, Brasiliansk, hela ben och armhålor (för kvinnor), på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Färgning av fransar eller bryn (inkl. plockning) på Bokadirekt (öppnas i ny flik) | Boka tid, Färgning av fransar eller bryn (inkl. plockning), på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Färgning av fransar & bryn (inkl. plockning) på Bokadirekt (öppnas i ny flik) | Boka tid, Färgning av fransar & bryn (inkl. plockning), på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Lashlift & färg på Bokadirekt (öppnas i ny flik) | Boka tid, Lashlift & färg, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Brow lamination / browlift & färg på Bokadirekt (öppnas i ny flik) | Boka tid, Brow lamination & färg, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Browlift & färg på Bokadirekt (öppnas i ny flik) | Boka tid, Browlift & färg, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Lift-paket – lashlift + browlift & färg på Bokadirekt (öppnas i ny flik) | Boka tid, Liftpaket med lashlift, browlift och färg, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Jämför före och efter: Lashlift & färg. Dra åt höger för att visa mer av före-bilden. | Jämför före och efter: Lashlift & färg. Dra åt höger för att visa mer av bilden före. | behandlingar.html, index.html |
| Jämför före och efter: Browlift & färg. Dra åt höger för att visa mer av före-bilden. | Jämför före och efter: Browlift & färg. Dra åt höger för att visa mer av bilden före. | behandlingar.html, index.html |
| Boka Japanese Head Spa – 60 min på Bokadirekt (öppnas i ny flik) | Boka tid, Japanese Head Spa 60 min, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Japanese Head Spa 60 min + håranalys på Bokadirekt (öppnas i ny flik) | Boka tid, Japanese Head Spa 60 min med håranalys, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Japanese Head Spa Lyx 90 min inkl. ansiktsbehandling på Bokadirekt (öppnas i ny flik) | Boka tid, Japanese Head Spa Lyx 90 min inkl. ansiktsbehandling, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Japanese Head Spa Lyx 90 min inkl. massage på Bokadirekt (öppnas i ny flik) | Boka tid, Japanese Head Spa Lyx 90 min inkl. massage, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Little Stars Head Spa – kids & teens på Bokadirekt (öppnas i ny flik) | Boka tid, Little Stars Head Spa för barn och unga, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Anti-migränmassage på Bokadirekt (öppnas i ny flik) | Boka tid, Anti-migränmassage, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Aromamassage (för kvinnor) på Bokadirekt (öppnas i ny flik) | Boka tid, Aromamassage (för kvinnor), på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Hot stone-massage (för kvinnor) på Bokadirekt (öppnas i ny flik) | Boka tid, Hot stone massage (för kvinnor), på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Healthwell Mix (för kvinnor) på Bokadirekt (öppnas i ny flik) | Boka tid, Healthwell Mix (för kvinnor), på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Body Scrub Massage (för kvinnor) på Bokadirekt (öppnas i ny flik) | Boka tid, Body Scrub Massage (för kvinnor), på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Spring Calm & Balance på Bokadirekt (öppnas i ny flik) | Boka tid, Spring Calm & Balance, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Lymfmassage (för kvinnor) på Bokadirekt (öppnas i ny flik) | Boka tid, Lymfmassage (för kvinnor), på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Lyx Kombo – lymfmassage + ansiktslyftande massage på Bokadirekt (öppnas i ny flik) | Boka tid, Lyx Kombo med lymfmassage och ansiktslyftande massage, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Barn- & ungdomsmassage på Bokadirekt (öppnas i ny flik) | Boka tid, Massage för barn och ungdomar, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Mom to Be – Deep Relax på Bokadirekt (öppnas i ny flik) | Boka tid, Mom to Be Deep Relax, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Mom to Be – Leg & Foot Relief på Bokadirekt (öppnas i ny flik) | Boka tid, Mom to Be Leg & Foot Relief, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Mom to Be – Comfort & Care på Bokadirekt (öppnas i ny flik) | Boka tid, Mom to Be Comfort & Care, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Mom to Be – Glow & Relax på Bokadirekt (öppnas i ny flik) | Boka tid, Mom to Be Glow & Relax, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Tatueringsborttagning – minsta området på Bokadirekt (öppnas i ny flik) | Boka tid, Tatueringsborttagning, minsta området, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Tatueringsborttagning – litet område på Bokadirekt (öppnas i ny flik) | Boka tid, Tatueringsborttagning, litet område, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Tatueringsborttagning – medium område på Bokadirekt (öppnas i ny flik) | Boka tid, Tatueringsborttagning, medium område, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Tatueringsborttagning – stort område på Bokadirekt (öppnas i ny flik) | Boka tid, Tatueringsborttagning, stort område, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Tandblekning på Bokadirekt (öppnas i ny flik) | Boka tid, Tandblekning, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Duo-behandling på Bokadirekt (öppnas i ny flik) | Boka tid, Duo-behandling, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Konsultation på Bokadirekt (öppnas i ny flik) | Boka tid, Konsultation, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Köp Massage klippkort – 5 gånger på Bokadirekt (öppnas i ny flik) | Köp klippkort, Massage klippkort för 5 gånger, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Köp Presentkort på Bokadirekt (öppnas i ny flik) | Köp presentkort, Presentkort, på Bokadirekt (öppnas i ny flik) | behandlingar.html |
| Boka Hydrafacial / Aqua Glow (öppnas i ny flik) | Boka Hydrafacial (Aqua Glow) (öppnas i ny flik) | index.html |
| Boka HIFU 9D – ansiktet (öppnas i ny flik) | Boka HIFU 9D för ansiktet (öppnas i ny flik) | index.html |
| Boka Hot stone-massage (öppnas i ny flik) | Boka Hot stone massage (öppnas i ny flik) | index.html |
| Boka [ERSÄTT: Behandlingens namn] på Bokadirekt (öppnas i ny flik) | Boka tid, [ERSÄTT: Behandlingens namn], på Bokadirekt (öppnas i ny flik) | kampanj/_mall.html |
| Boka din tid – [ERSÄTT: Behandlingens namn] på Bokadirekt (öppnas i ny flik) | Boka din tid, [ERSÄTT: Behandlingens namn], på Bokadirekt (öppnas i ny flik) | kampanj/_mall.html |
| Boka din tid – Hydrafacial / Aqua Glow på Bokadirekt (öppnas i ny flik) | Boka din tid, Hydrafacial (Aqua Glow), på Bokadirekt (öppnas i ny flik) | kampanj/hydrafacial.html |
| Boka Japanese Head Spa 60 min på Bokadirekt (öppnas i ny flik) | Boka tid, Japanese Head Spa 60 min, på Bokadirekt (öppnas i ny flik) | kampanj/japanese-head-spa.html |
| Boka din tid – Japanese Head Spa 60 min på Bokadirekt (öppnas i ny flik) | Boka din tid, Japanese Head Spa 60 min, på Bokadirekt (öppnas i ny flik) | kampanj/japanese-head-spa.html |
| Boka Microneedling - Derma Pen på Bokadirekt (öppnas i ny flik) | Boka tid, Microneedling med Derma Pen, på Bokadirekt (öppnas i ny flik) | kampanj/microneedling.html |
| Boka din tid – Microneedling - Derma Pen på Bokadirekt (öppnas i ny flik) | Boka din tid, Microneedling med Derma Pen, på Bokadirekt (öppnas i ny flik) | kampanj/microneedling.html |


### JavaScript

| Fil | Före | Efter |
|---|---|---|
| consent.js (banner) | Med ditt samtycke använder vi Meta-pixeln för att mäta och förbättra våra annonser på Facebook och Instagram. | Med ditt samtycke använder vi Metas pixel för att mäta och förbättra våra annonser på Facebook och Instagram. |
| consent.js (inställningar) | Meta-pixeln (Meta Platforms Ireland Ltd.) hjälper oss att mäta … | Metas pixel från Meta Platforms Ireland Ltd. hjälper oss att mäta … |
| before-after.js (aria-valuetext) | Före-bilden visas till X procent | Bilden före visas till X procent |
| images.js (notering) | Platshållare – byt mot salongens egen bild | Platshållare. Byt mot salongens egen bild |
| images.js (notering) | Platshållare – byt mot en bild från salongens Instagram | Platshållare. Byt mot en bild från salongens Instagram |
| images.js (notering) | Kundbild kommer – publiceras först när kunden gett skriftligt samtycke | Kundbild kommer. Publiceras först när kunden gett skriftligt samtycke |

---

## 3. Ändrade CSS-rader

### a) Uttryckligen tillåtna (text-align, knapparnas placering, hyphens)

```css
body                          + hyphens: none; -webkit-hyphens: none;
.section-head--center         text-align: center        → text-align: left
.cta-banner                   text-align: center        → text-align: left
.cta-band                     text-align: center        → text-align: left
.price-box                    text-align: center        → text-align: left
.team-card                    text-align: center        → text-align: left
.map                          text-align: center        → text-align: left
.hours td                     text-align: right         → text-align: left
.menu-item__price (≥640px)    text-align: right         → text-align: left
.dist__n                      text-align: right         → text-align: left
.cookie-dialog__more          text-align: center        → text-align: left
.cta-row--center              justify-content: center   → flex-start          (knappar)
.section-head--split          space-between, align-items: end → flex-direction: column, align-items: flex-start  (länkknapp under rubriken)
.ig-head                      space-between, align-items: end → flex-direction: column, align-items: flex-start  (knapp under rubriken)
.cookie-banner__actions .btn--text (≥480px)  justify-self: end → start      (knapp)
```

### b) Utöver regeln, men nödvändiga för att inget ska vara centrerat
Med bara `text-align: left` hade blocken fortfarande legat centrerade på sidan, eftersom de centreras med `margin: auto` eller `justify-content: center`. Bredderna är oförändrade, bara placeringen åt vänster har ändrats. Säg till om du hellre vill behålla någon av dem som den var.

```css
.section-head--center         margin-inline: auto → 0
.cta-banner h2, .cta-banner p margin-inline: auto → 0
.cta-band h2, .cta-band p     margin-inline: auto → 0
.team-grid--2                 margin-inline: auto → 0
.container--narrow            + margin-left: max(0px, calc((100% - (var(--container) + var(--gutter) * 2)) / 2)); margin-right: auto;
                              (smala textspalter, t.ex. vanliga frågor och kampanjsektioner, linjerar nu med sidans vänsterkant i stället för att ligga i mitten)
.team-card .arch              margin: 0 auto … → 0 0 …           (porträttet linjerar med namnet under)
.map                          place-items: center → center start  (texten i kartrutan)
.map__pin                     margin: 0 auto … → 0 0 …
.ornament                     justify-content: center → flex-start
.price-box .price             justify-content: center → flex-start
.price-box__meta              justify-content: center → flex-start
.eyebrow--center              justify-content: center → flex-start
.menu-item__price .price      justify-content: flex-end → flex-start
.site-footer__bottom          justify-content: space-between → flex-start
```

### c) Medvetet oförändrat
- **Boka-knappar i höger kolumn:** behandlingslistan, sidfoten i behandlingskorten och den fasta mobilknappen har kvar knappen till höger. Att flytta dem hade krävt nytt rutnät, vilket ligger utanför uppdraget.
- **Linjen efter överrubriken:** de överrubriker som tidigare var centrerade har kvar sin dekorativa linje även efter texten.
- **Cookiebannerns ruta** ligger kvar mitt på skärmen. Den är ett överlägg och ingen sektion.

---

## 4. Principer som använts
- **Streck:** tankstreck har ersatts med punkt, komma eller omskrivning. Det gäller även streck i namn, t.ex. "Microneedling – Derma Pen" som blev "Microneedling med Derma Pen".
- **Bindestreck:** delade sammansättningar har skrivits ut, t.ex. "hud- och skönhetsbehandlingar" som blev "behandlingar för hud och skönhet". Vanliga sammansättningar har skrivits om där det gick, t.ex. "IVO-registrerad" som blev "registrerad hos IVO", "e-post" som blev "mejl" och "Meta-pixeln" som blev "Metas pixel". Kvar finns bara produktnamnet **4-Wave Laser ICE**, mejladresser och tekniska namn i `code`, t.ex. `utm_campaign`.
- **Tider och telefon:** öppettider skrivs nu "10.00 till 19.00" och telefonnumret "073 649 76 52" (länken `tel:` är oförändrad).
- **Knappar:** knapptexterna har två till tre ord och börjar med verb. "Boka" blev "Boka tid", "Köp" blev "Köp presentkort" och "Köp klippkort", "Ring 073-649 76 52" blev "Ring oss", "Läs mer om oss" blev "Läs om oss", "Alla behandlingar och priser" blev "Se alla behandlingar" och "Läs alla omdömen på Bokadirekt" blev "Läs fler omdömen".
- **Cookieknapparna:** knapparna i cookiebannern ("Acceptera", "Endast nödvändiga", "Inställningar") är oförändrade, eftersom de är fastställda i specen för bannern.
- **Rubrikernas längd:** H1 har max åtta ord, H2 max sex ord, överrubriker max fyra ord och ingresser max två meningar.
- **Omdömen:** omdömena är oförändrade. De innehöll inga streck eller mittpunkter som påverkades.

---

## 5. Att verifiera med salongen
1. **Kampanjrubrikerna:** de nya H1-rubrikerna är kortare och måste matcha annonserna ordagrant.
   - "Hydrafacial i 60 minuter för 799 kr"
   - "60 minuter Japanese Head Spa för 695 kr"
   - "Microneedling med Derma Pen för 1 199 kr"
2. **Ändrade tjänstenamn:** några namn skiljer sig nu från Bokadirekt. Till exempel "Ansiktsbehandling med Gua Sha" (Bokadirekt: "Spa Ansiktsbehandling & Gua Sha"), "Vaxning av näsan" ("Nose Clean-up"), "Massage för barn och ungdomar", "Little Stars Head Spa för barn och unga" och "Liftpaket med lashlift, browlift och färg" ("Pranari Lift paket").
3. **Formuleringen om IVO:** "Registrerad hos IVO" ersätter "IVO-registrerad". Kontrollera att salongen är nöjd med den.
4. **Tidigare punkter som fortfarande gäller:**
   - domän
   - mejladress (fortfarande @pranari.se)
   - Instagramkonto
   - Pixel-ID
   - bolagsnamn och organisationsnummer
   - bilder på team, lokal och Instagram
   - före- och efterbilder med samtycke, samt `[uppgift kommer]` i resultatsektionerna
   - texterna om behandlingarna, inklusive biverkningar och kontraindikationer
   - 18-årsgränsen
   - friskvårdsbidrag (Epassi)
   - tandblekningens metod
   - kampanjdatum
