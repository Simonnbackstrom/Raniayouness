/* ==========================================================================
   RAYN – bildregister
   --------------------------------------------------------------------------
   ALLA bilder på webbplatsen hämtas härifrån. Byt en bild genom att ändra
   "url" (och "alt") för nyckeln – den uppdateras då på alla sidor.

   Fält:
     url         Unsplash: https://images.unsplash.com/photo-…  (utan parametrar)
                 Pexels:   https://images.pexels.com/photos/…/….jpeg
                 Egen:     sökväg från webbplatsens rot, t.ex. 'images/team/rania.webp'
     alt         Svensk, beskrivande alt-text
     källa       "unsplash" | "pexels" | "egen"
     fotograf    Fotografens namn (visas på credits.html)
     licens      T.ex. "Unsplash License"
     fokus       (valfritt) object-position, t.ex. "30% 50%"
     platshallare true = neutral platshållare som ska bytas mot salongens egen bild

   Stockfoton får inte presenteras som salongens egna lokaler eller personal.
   Bilder på teamet, lokalen, Instagram och före/efter är därför platshållare
   tills salongen skickar egna bilder.

   Tips för bästa prestanda: uppdatera även src/srcset i HTML-filen för
   hero-bilden när du byter den (sök efter data-img="hero"). Övriga bilder
   byts automatiskt av js/main.js.
   ========================================================================== */
window.RAYN_IMAGES = {
  "cta": {
    "url": "https://images.unsplash.com/photo-1601479604588-68d9e6d386b5",
    "alt": "Tända blockljus i varmt ljus",
    "källa": "unsplash",
    "fotograf": "Sixteen Miles Out",
    "fotografUrl": "https://unsplash.com/@sixteenmilesout",
    "sida": "https://unsplash.com/photos/white-pillar-candles-on-brown-wooden-table-bdVmIkx_gIs",
    "licens": "Unsplash License",
    "licensUrl": "https://unsplash.com/license",
    "fokus": "center"
  },
  "microneedling": {
    "url": "https://images.unsplash.com/photo-1713085085470-fba013d67e65",
    "alt": "Hudterapeut behandlar pannan med ett handhållet hudvårdsinstrument",
    "källa": "unsplash",
    "fotograf": "Look Studio",
    "fotografUrl": "https://unsplash.com/@lookphoto",
    "sida": "https://unsplash.com/photos/a-woman-getting-a-facial-peel-from-a-doctor-HtXyytr9304",
    "licens": "Unsplash License",
    "licensUrl": "https://unsplash.com/license",
    "fokus": "center"
  },
  "co2": {
    "url": "https://images.unsplash.com/photo-1598300195998-364bf445842c",
    "alt": "Närbild på ett laserhandstycke mot huden",
    "källa": "unsplash",
    "fotograf": "Sam Moghadam",
    "fotografUrl": "https://unsplash.com/@sammoghadam",
    "sida": "https://unsplash.com/photos/person-holding-white-and-orange-device-IgAa6frsVyQ",
    "licens": "Unsplash License",
    "licensUrl": "https://unsplash.com/license",
    "fokus": "center"
  },
  "hifu": {
    "url": "https://images.unsplash.com/photo-1552693673-1bf958298935",
    "alt": "Kvinna får en hudvårdsbehandling i ansiktet",
    "källa": "unsplash",
    "fotograf": "karelys Ruiz",
    "fotografUrl": "https://unsplash.com/@karelysruiz",
    "sida": "https://unsplash.com/photos/woman-receiving-facial-skincare-treatment-PqyzuzFiQfY",
    "licens": "Unsplash License",
    "licensUrl": "https://unsplash.com/license",
    "fokus": "center"
  },
  "resultat-co2-fore": {
    "url": "images/resultat/co2-fore.webp",
    "alt": "Kundens ansikte före CO2 fraktionerad laser",
    "källa": "egen",
    "fotograf": "RAYN Beauty Spa & Wellness",
    "licens": "Egen bild, publicerad med kundens skriftliga samtycke"
  },
  "resultat-co2-efter": {
    "url": "images/resultat/co2-efter.webp",
    "alt": "Samma kunds ansikte efter CO2 fraktionerad laser",
    "källa": "egen",
    "fotograf": "RAYN Beauty Spa & Wellness",
    "licens": "Egen bild, publicerad med kundens skriftliga samtycke"
  },
  "stamning-hud": {
    "url": "https://images.unsplash.com/photo-1695990190064-e8ca2ca16af6",
    "alt": "Kvinna med fräknar vilar ansiktet i händerna i varmt kvällsljus",
    "källa": "unsplash",
    "fotograf": "Mohamed hamdi",
    "fotografUrl": "https://unsplash.com/@amdshutter",
    "sida": "https://unsplash.com/photos/woman-with-freckles-in-golden-light-_Yca73BgigE",
    "licens": "Unsplash License",
    "licensUrl": "https://unsplash.com/license",
    "fokus": "50% 35%"
  },
  "stamning-omsorg": {
    "url": "https://images.unsplash.com/photo-1643684391140-c5056cfd3436",
    "alt": "Händer som varsamt masserar en kvinnas ansikte",
    "källa": "unsplash",
    "fotograf": "Dominique Rivas",
    "fotografUrl": "https://unsplash.com/@dominiquerivu",
    "sida": "https://unsplash.com/photos/a-woman-getting-a-facial-massage-on-her-face-rWwuf8yKw4Y",
    "licens": "Unsplash License",
    "licensUrl": "https://unsplash.com/license",
    "fokus": "center"
  },
  "stamning-ljus": {
    "url": "https://images.unsplash.com/photo-1675773051474-55c4b7d2cf53",
    "alt": "Närbild på en kvinnas ansikte i mjukt ljus",
    "källa": "unsplash",
    "fotograf": "omid armin",
    "fotografUrl": "https://unsplash.com/@itsomidarmin",
    "sida": "https://unsplash.com/photos/a-close-up-of-a-womans-face-with-a-blurry-background-KDCsN92zVs8",
    "licens": "Unsplash License",
    "licensUrl": "https://unsplash.com/license",
    "fokus": "60% 40%"
  },
  "resultat-co2-hals-fore": {
    "url": "images/resultat/co2-hals-fore.webp",
    "alt": "Kundens hals före CO2 fraktionerad laser",
    "källa": "egen",
    "fotograf": "RAYN Beauty Spa & Wellness",
    "licens": "Egen bild, publicerad med kundens skriftliga samtycke"
  },
  "resultat-co2-hals-efter": {
    "url": "images/resultat/co2-hals-efter.webp",
    "alt": "Samma kunds hals efter CO2 fraktionerad laser",
    "källa": "egen",
    "fotograf": "RAYN Beauty Spa & Wellness",
    "licens": "Egen bild, publicerad med kundens skriftliga samtycke"
  },
  "resultat-co2-dek-fore": {
    "url": "images/resultat/co2-dekolletage-fore.webp",
    "alt": "Kundens dekolletage före CO2 fraktionerad laser",
    "källa": "egen",
    "fotograf": "RAYN Beauty Spa & Wellness",
    "licens": "Egen bild, publicerad med kundens skriftliga samtycke"
  },
  "resultat-co2-dek-efter": {
    "url": "images/resultat/co2-dekolletage-efter.webp",
    "alt": "Samma kunds dekolletage efter CO2 fraktionerad laser",
    "källa": "egen",
    "fotograf": "RAYN Beauty Spa & Wellness",
    "licens": "Egen bild, publicerad med kundens skriftliga samtycke"
  },
  "resultat-co2-litet-fore": {
    "url": "images/resultat/co2-litet-omrade-fore.webp",
    "alt": "Kundens kind före CO2 fraktionerad laser på ett litet område",
    "källa": "egen",
    "fotograf": "RAYN Beauty Spa & Wellness",
    "licens": "Egen bild, publicerad med kundens skriftliga samtycke"
  },
  "resultat-co2-litet-efter": {
    "url": "images/resultat/co2-litet-omrade-efter.webp",
    "alt": "Samma kunds kind efter CO2 fraktionerad laser på ett litet område",
    "källa": "egen",
    "fotograf": "RAYN Beauty Spa & Wellness",
    "licens": "Egen bild, publicerad med kundens skriftliga samtycke"
  },
  "resultat-co2-kropp-fore": {
    "url": "images/resultat/co2-kropp-fore.webp",
    "alt": "Bristningar på kundens lår före CO2 fraktionerad laser",
    "källa": "egen",
    "fotograf": "RAYN Beauty Spa & Wellness",
    "licens": "Egen bild, publicerad med kundens skriftliga samtycke"
  },
  "resultat-co2-kropp-efter": {
    "url": "images/resultat/co2-kropp-efter.webp",
    "alt": "Samma område på kundens lår efter CO2 fraktionerad laser",
    "källa": "egen",
    "fotograf": "RAYN Beauty Spa & Wellness",
    "licens": "Egen bild, publicerad med kundens skriftliga samtycke"
  },
  "resultat-co2-ogon-fore": {
    "url": "images/resultat/co2-ogon-fore.webp",
    "alt": "Huden runt kundens öga före CO2 fraktionerad laser",
    "källa": "egen",
    "fotograf": "RAYN Beauty Spa & Wellness",
    "licens": "Egen bild, publicerad med kundens skriftliga samtycke"
  },
  "resultat-co2-ogon-efter": {
    "url": "images/resultat/co2-ogon-efter.webp",
    "alt": "Huden runt samma kunds öga efter CO2 fraktionerad laser",
    "källa": "egen",
    "fotograf": "RAYN Beauty Spa & Wellness",
    "licens": "Egen bild, publicerad med kundens skriftliga samtycke"
  },
  "resultat-co2-arr-fore": {
    "url": "images/resultat/co2-arr-fore.webp",
    "alt": "Operationsärr på kundens mage före CO2 fraktionerad laser",
    "källa": "egen",
    "fotograf": "RAYN Beauty Spa & Wellness",
    "licens": "Egen bild, publicerad med kundens skriftliga samtycke"
  },
  "resultat-co2-arr-efter": {
    "url": "images/resultat/co2-arr-efter.webp",
    "alt": "Samma ärr på kundens mage efter CO2 fraktionerad laser",
    "källa": "egen",
    "fotograf": "RAYN Beauty Spa & Wellness",
    "licens": "Egen bild, publicerad med kundens skriftliga samtycke"
  }
};
