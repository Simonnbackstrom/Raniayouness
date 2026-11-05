# Kommo-koppling för "Fråga om pris"

Formuläret på CO2-sidan skickar förfrågan hit. Den här lilla serverfunktionen
(Cloudflare Worker) skapar ett **lead med kontakt i Kommo** och lägger en
anteckning med allt kunden skrev, plus kampanjkälla (UTM) och om hon kom från
en Meta-annons. Kommo-token ligger bara här, aldrig i webbsidans kod.

Cloudflare Workers är gratis upp till 100 000 anrop per dag.

## 1. Hämta token i Kommo

1. Logga in i Kommo som administratör.
2. **Inställningar → Integrationer → Skapa integration → Privat integration**.
3. Ge den namnet "RAYN webbformulär" och spara.
4. Öppna fliken **Nycklar och behörigheter** och klicka **Generera långlivad token**.
   Välj längsta giltighetstiden. Kopiera token, den visas bara en gång.
5. Notera kontots underdomän: `raniayouness.kommo.com` → `raniayouness`.

## 2. Publicera workern

**Enklast, i webbläsaren:**

1. Skapa ett gratis konto på cloudflare.com.
2. **Workers & Pages → Create → Create Worker**, namnge den `rayn-kommo`, klicka **Deploy**.
3. Klicka **Edit code**, ersätt allt med innehållet i `worker.js` och klicka **Deploy**.
4. **Settings → Variables and Secrets**, lägg till:

| Namn | Typ | Värde |
|---|---|---|
| `KOMMO_SUBDOMAIN` | Text | `raniayouness` |
| `KOMMO_TOKEN` | **Secret** | token från steg 1 |
| `ALLOWED_ORIGINS` | Text | `https://www.raynbeauty.se,https://raynbeauty.se,http://127.0.0.1:5500` |
| `KOMMO_TAGS` | Text | `Webbformulär,CO2 kampanj` (valfritt) |
| `KOMMO_PIPELINE_ID` | Text | valfritt, se nedan |
| `KOMMO_STATUS_ID` | Text | valfritt, se nedan |

5. Kopiera workerns adress, t.ex. `https://rayn-kommo.dittkonto.workers.dev`.

**Eller med terminalen:** fyll i `wrangler.toml`, kör sedan
`npx wrangler login`, `npx wrangler secret put KOMMO_TOKEN` och `npx wrangler deploy`.

## 3. Koppla sidan

Öppna `co2/js/config.js` och fyll i adressen:

```js
LEAD_FORM: {
  KOMMO_ENDPOINT: 'https://rayn-kommo.dittkonto.workers.dev',
  ACCESS_KEY: '',   // valfritt: Web3Forms-nyckel som reserv via mejl
  ...
}
```

## 4. Testa

Skicka formuläret på sidan med ditt eget nummer. Ett lead med namnet
"Prisfråga: (behandling)" ska dyka upp i Kommo inom några sekunder, med
kontakten och en anteckning. Syns inget: öppna workern i Cloudflare →
**Logs** och se felmeddelandet från Kommo.

## Valfria inställningar

- **Pipeline och steg:** utan `KOMMO_PIPELINE_ID` och `KOMMO_STATUS_ID` hamnar
  leadet i första steget i standardpipelinen. ID:n syns i adressfältet när du
  öppnar pipelinens inställningar i Kommo.
- **Ansvarig:** `KOMMO_RESPONSIBLE_USER` med användarens ID.
- **UTM-fält:** `KOMMO_UTM_FIELDS = true` fyller även Kommos egna UTM-fält
  (kräver att fälten finns i kontot). Annars står UTM i anteckningen.
- **Fler domäner:** lägg till dem i `ALLOWED_ORIGINS`, annars nekas formuläret.
