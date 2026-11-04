/* ==========================================================================
   RAYN Beauty Spa & Wellness – central konfiguration
   --------------------------------------------------------------------------
   ALL konfiguration för spårning och bokning ligger i den här filen.
   Ändra bara värdena här – övriga JS-filer läser från window.RAYN_CONFIG.
   ========================================================================== */
window.RAYN_CONFIG = {

  /* --- Meta-pixel ------------------------------------------------------
     Byt till ert riktiga Pixel-ID (15–16 siffror) från Meta Events Manager.
     Så länge värdet inte är ett giltigt ID laddas pixeln aldrig, även om
     besökaren samtycker (events loggas då bara i konsolen i debug-läge). */
  META_PIXEL_ID: 'ERSATT_MED_PIXEL_ID',

  /* Vilket event som skickas vid klick på Boka-knappar.
     'Lead'         = Metas standardevent (rekommenderas för optimering av annonser)
     'BookingClick' = eget custom event (trackCustom)                        */
  BOOKING_EVENT: 'Lead',

  /* --- Bokadirekt ------------------------------------------------------ */
  BOKADIREKT_URL: 'https://www.bokadirekt.se/places/rayn-beauty-spa-wellness-132804',

  /* Djuplänkar direkt till varje tjänst på Bokadirekt (hämtade 2026-10-28).
     Nyckeln matchar data-treatment-id på Boka-knapparna. Djuplänken står
     även direkt i HTML:en (href), så knapparna fungerar utan JavaScript.
     Ändrar salongen en tjänst i Bokadirekt kan dess länk ändras – uppdatera
     då här (öppna tjänsten på Bokadirekt och kopiera adressen).
     Tom sträng = salongens huvudsida på Bokadirekt.                        */
  TREATMENT_LINKS: {
    'hydrafacial-aqua-glow': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/hydrafacial-aqua-glow-3344926',
    'glow-express-ansiktsbehandling-45-min': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/glow-express-ansiktsbehandling-45-min-3517620',
    'spa-ansiktsbehandling-gua-sha': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/spa-ansiktsbehandling-gua-sha-3334343',
    'ansiktsmassage': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/ansiktsmassage-3334299',
    'microneedling-derma-pen': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/microneedling-derma-pen-3334348',
    'microneedling-derma-pen-kur-4-behandlingar': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/microneedling-derma-pen-kur-4-behandlingar-3343744',
    'hollywood-peel-classic': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/hollywood-peel-classic-3466863',
    'rayn-lyx-hollywood-peel': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/rayn-lyx-hollywood-peel-3466867',
    'konsultation-co2-fraktionerad-laser-vid-uteblivit-besok-debiteras-300-kr': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/konsultation-co2-fraktionerad-laser-vid-uteblivit-besok-debiteras-300-kr-3380521',
    'co2-fraktionerad-laser-ansiktet': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/co2-fraktionerad-laser-ansiktet-3381485',
    'co2-fractional-laser-halsen': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/co2-fractional-laser-halsen-3449199',
    'co2-fractional-laser-dekoltage': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/co2-fractional-laser-dekoltage-3513965',
    'co2-fraktionerad-laser-kropp': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/co2-fraktionerad-laser-kropp-3429239',
    'co2-fractional-laser-litet-omrade': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/co2-fractional-laser-litet-omrade-3380512',
    'konsultation-superlifter-hifu-ansikts-kropp': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/konsultation-superlifter-hifu-ansikts-kropp-3334327',
    'hifu-9d-ansiktet': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/hifu-9d-ansiktet-3334341',
    'hifu-9d-ansiktet-och-dubbelhaka': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/hifu-9d-ansiktet-och-dubbelhaka-3411702',
    'hifu-9d-ansiktet-och-hals': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/hifu-9d-ansiktet-och-hals-3334342',
    'hifu-9d-ansiktet-dubbelhaka-hals': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/hifu-9d-ansiktet-dubbelhaka-hals-3362456',
    'hifu-9d-litet-omradet-ex-ogonen-dubbelhaka': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/hifu-9d-litet-omradet-ex-ogonen-dubbelhaka-3334338',
    'hifu-9d-armar-med-umpt': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/hifu-9d-armar-med-umpt-3334288',
    'hifu-9d-benen-lar-med-umpt': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/hifu-9d-benen-lar-med-umpt-3334340',
    'superlifter-hifu-magen': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/superlifter-hifu-magen-3334339',
    'harborttagning-med-4-wave-laser-ice-konsultation': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/harborttagning-med-4-wave-laser-ice-konsultation-3337684',
    'laser-harborttagning-overlapp-eller-haka': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/laser-harborttagning-overlapp-eller-haka-3421506',
    'laser-harborttagning-overlapp-haka': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/laser-harborttagning-overlapp-haka-3337687',
    'laser-harborttagning-ansiktet': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/laser-harborttagning-ansiktet-3421490',
    'laser-harborttagning-ansikte-hals': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/laser-harborttagning-ansikte-hals-3337685',
    'laser-harborttagning-armhalor': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/laser-harborttagning-armhalor-3337689',
    'laser-harborttagning-halva-armar': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/laser-harborttagning-halva-armar-3337680',
    'laser-harborttagning-hela-armar': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/laser-harborttagning-hela-armar-3337692',
    'laser-harborttagning-fingrar': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/laser-harborttagning-fingrar-3421511',
    'laser-harborttagning-brostvarta': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/laser-harborttagning-brostvarta-3421509',
    'laser-harborttagning-mage-kvinna': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/laser-harborttagning-mage-kvinna-3337688',
    'laser-harborttagning-mage-brost-man': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/laser-harborttagning-mage-brost-man-3337690',
    'laser-harborttagning-rygg': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/laser-harborttagning-rygg-3337691',
    'laser-harborttagning-brasiliansk-inkl-bikinilinje-och-baksidan-for-kvinnor': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/laser-harborttagning-brasiliansk-inkl-bikinilinje-och-baksidan-for-kvinnor-3337681',
    'laser-harborttagning-halva-ben': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/laser-harborttagning-halva-ben-3337683',
    'laser-harborttagning-hela-ben': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/laser-harborttagning-hela-ben-3337686',
    'laser-harborttagning-tar': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/laser-harborttagning-tar-3421510',
    'paketpris-5-ganger-laser-harborttagning-brasiliansk-inkl-bikinilinje-och-baksidan-for-kvinnor': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/paketpris-5-ganger-laser-harborttagning-brasiliansk-inkl-bikinilinje-och-baksidan-for-kvinnor-3408914',
    'paketpris-10-ganger-laser-harborttagning-brasiliansk-inkl-bikinilinje-och-baksidan-for-kvinnor': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/paketpris-10-ganger-laser-harborttagning-brasiliansk-inkl-bikinilinje-och-baksidan-for-kvinnor-3408219',
    'paketpris-5-ganger-laser-harborttagning-hela-ben': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/paketpris-5-ganger-laser-harborttagning-hela-ben-3333992',
    'paketpris-10-ganger-laser-harborttagning-hela-ben': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/paketpris-10-ganger-laser-harborttagning-hela-ben-3421487',
    'nose-clean-up': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/nose-clean-up-3334325',
    'vax-overlapp-eller-haka': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/vax-overlapp-eller-haka-3334336',
    'vax-ansikte-hela': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/vax-ansikte-hela-3422631',
    'armhalor': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/armhalor-3355061',
    'halva-armar': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/halva-armar-3334320',
    'hela-armar': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/hela-armar-3334323',
    'bikinilinje': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/bikinilinje-3334302',
    'bikinivax': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/bikinivax-3334305',
    'brasiliansk-for-kvinnor': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/brasiliansk-for-kvinnor-3334314',
    'brasiliansk-armhalor-for-kvinnor': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/brasiliansk-armhalor-for-kvinnor-3334312',
    'vaxning-halva-ben': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/vaxning-halva-ben-3334321',
    'hela-ben': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/hela-ben-3334328',
    'vaxning-bikinilinje-halva-ben-for-kvinnor': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/vaxning-bikinilinje-halva-ben-for-kvinnor-3334303',
    'bikinilinje-hela-ben': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/bikinilinje-hela-ben-3334304',
    'brasiliansk-halva-ben-for-kvinnor': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/brasiliansk-halva-ben-for-kvinnor-3422629',
    'vaxning-brasiliansk-halva-ben-armhalor-for-kvinnor': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/vaxning-brasiliansk-halva-ben-armhalor-for-kvinnor-3334313',
    'brasiliansk-hela-ben-for-kvinnor': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/brasiliansk-hela-ben-for-kvinnor-3422628',
    'brasiliansk-hela-ben-armhalor-for-kvinnor': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/brasiliansk-hela-ben-armhalor-for-kvinnor-3422627',
    'fargning-av-fransar-eller-ogonbryn-inklplockning': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/fargning-av-fransar-eller-ogonbryn-inklplockning-3334319',
    'fargning-av-fransar-ogonbryn-inklplockning': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/fargning-av-fransar-ogonbryn-inklplockning-3334318',
    'lashlift-farg': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/lashlift-farg-3334326',
    'brow-lamination-browlift-farg': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/brow-lamination-browlift-farg-3391883',
    'browlift-farg': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/browlift-farg-3334316',
    'pranari-lift-paket': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/pranari-lift-paket-3334347',
    'japanese-head-spa-60min': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/japanese-head-spa-60min-3334329',
    'japanese-head-spa-60-min-15-min-haranalys': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/japanese-head-spa-60-min-15-min-haranalys-3396785',
    'japanese-head-spa-lyx-90-min-inkl-ansiktsbehandling': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/japanese-head-spa-lyx-90-min-inkl-ansiktsbehandling-3381535',
    'japanese-head-spa-lyx-90-min-inkl-massage': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/japanese-head-spa-lyx-90-min-inkl-massage-3334346',
    'little-stars-head-spa-kids-teens': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/little-stars-head-spa-kids-teens-3538413',
    'anti-migranmassage': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/anti-migranmassage-3380708',
    'aroma-maassage-60-min-for-kvinnor': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/aroma-maassage-60-min-for-kvinnor-3333989',
    'hot-stone-massage-for-kvinnor': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/hot-stone-massage-for-kvinnor-3538403',
    'healthwell-mix-75-min-for-kvinnor': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/healthwell-mix-75-min-for-kvinnor-3391426',
    'body-scrub-massage-for-kvinnor': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/body-scrub-massage-for-kvinnor-3334306',
    'spring-calm-balance-90-min': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/spring-calm-balance-90-min-3334345',
    'lymfmassage-for-kvinnor': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/lymfmassage-for-kvinnor-3334330',
    'lyx-kombo-lymfmassage-ansiktslyftande-massage': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/lyx-kombo-lymfmassage-ansiktslyftande-massage-3334332',
    'barn-ungdomsmassage': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/barn-ungdomsmassage-3538405',
    'mom-to-be-deep-relax': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/mom-to-be-deep-relax-3538385',
    'mom-to-be-leg-foot-relief': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/mom-to-be-leg-foot-relief-3538393',
    'mom-to-be-comfort-care': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/mom-to-be-comfort-care-3538369',
    'mom-to-be-glow-relax': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/mom-to-be-glow-relax-3538196',
    'tatueringsborttagning-picolaser': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/tatueringsborttagning-picolaser-3442376',
    'tatueringsborttagning-picolaser-litet-omrade-upp-till-10cm': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/tatueringsborttagning-picolaser-litet-omrade-upp-till-10cm-3442378',
    'tatueringsborttagning-picolaser-mediumom-rade-upp-till-15cm': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/tatueringsborttagning-picolaser-mediumom-rade-upp-till-15cm-3442381',
    'tatueringsborttagning-picolaser-stort-omrade-upp-till-20cm': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/tatueringsborttagning-picolaser-stort-omrade-upp-till-20cm-3442383',
    'tandblekning': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/tandblekning-3334337',
    'duo-behandling-kontakta-oss-for-att-boka-tid': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/duo-behandling-kontakta-oss-for-att-boka-tid-3437892',
    'konsultation-vid-uteblivit-besok-debiteras-300-kr': 'https://www.bokadirekt.se/boka-tjanst/rayn-beauty-spa-wellness-132804/konsultation-vid-uteblivit-besok-debiteras-300-kr-3340340',
    'massage-klippkort': 'https://www.bokadirekt.se/places/rayn-beauty-spa-wellness-132804',
    'presentkort': 'https://www.bokadirekt.se/places/rayn-beauty-spa-wellness-132804/giftcard/checkout'
  },

  /* --- Före/efter på kampanjsidor --------------------------------------
     true = resultatsektionen (före/efter-reglaget) visas på kampanjsidan.
     Sätt false om Meta nekar annonsen, och alltid false för kampanjer om
     rynkbehandling/injektioner. Nyckel = kampanjfilens namn utan .html.  */
  SHOW_BEFORE_AFTER_ON_CAMPAIGNS: {
    'co2-laser': true,  // false = dölj före/efter
    'hydrafacial': false,
    'japanese-head-spa': false,
    'microneedling': true,
    '_mall': false
  },

  /* --- Attribution -----------------------------------------------------
     Parametrar som fångas från URL:en vid landning, sparas i sessionStorage
     och läggs på alla utgående Bokadirekt-länkar. (fbclid fångas separat och
     skickas INTE vidare till Bokadirekt.) */
  ATTRIBUTION_PARAMS: ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id'],

  /* UTM som läggs på Bokadirekt-länkar när besökaren INTE kom via en
     UTM-taggad länk (t.ex. organisk trafik). Sätt till null för att stänga av. */
  DEFAULT_OUTBOUND_UTM: {
    utm_source: 'rayn-webbplats',
    utm_medium: 'website'
  },

  /* --- Conversions API (server-events) ---------------------------------
     URL till er CAPI-endpoint (Metas CAPI Gateway eller en egen serverless-
     funktion, se README.md). Tom sträng = inga server-events skickas.
     Skickas endast när besökaren har samtyckt till marknadsföringscookies. */
  CAPI_ENDPOINT: '',

  /* --- Samtycke --------------------------------------------------------
     Höj versionen om ni ändrar cookieanvändningen – då tillfrågas alla igen. */
  CONSENT_VERSION: 1,
  CONSENT_MAX_AGE_DAYS: 365,

  /* --- Övrigt ---------------------------------------------------------- */
  /* Instagram-URL, t.ex. 'https://www.instagram.com/kontonamn/'.
     Tom sträng = Instagram-sektionen och -länkarna döljs automatiskt. */
  INSTAGRAM_URL: '',

  /* true = logga alla events i konsolen. Kan även slås på per besök med
     ?rayn_debug=1 i URL:en. */
  DEBUG: false,

  /* --- Intresseformulär (landningssidan) ------------------------------
     Formuläret skickas via Web3Forms (https://web3forms.com) som mejlar
     anmälan till salongen. Skapa en gratis nyckel med salongens mejl på
     web3forms.com och klistra in den här. Nyckeln får ligga publikt.
     Tom nyckel = formuläret visar ett meddelande med telefonnumret i stället. */
  LEAD_FORM: {
    ACCESS_KEY: '',
    SUBJECT: 'Ny intresseanmälan: CO2 laser',
    /* Meta-event vid skickad anmälan. Skickas med lead_type 'intresseformular'
       så att den kan skiljas från klick på Boka-knappar. */
    EVENT: 'Lead'
  }
};

/* ---- Landningssidan: stämningsbilder ----
   Sektionen "Din stund hos oss" använder bildbanksbilder från Unsplash (se credits.html).
   De visar inte resultat och inte salongens kunder. Byt gärna mot egna bilder i js/images.js. */
