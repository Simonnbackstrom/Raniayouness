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
  "hero": {
    "url": "https://images.unsplash.com/photo-1544161515-4ab6ce6db874",
    "alt": "Terapeut häller varm massageolja i handen medan en kvinna vilar på en behandlingsbrits",
    "källa": "unsplash",
    "fotograf": "alan caishan",
    "fotografUrl": "https://unsplash.com/@caishan119",
    "sida": "https://unsplash.com/photos/woman-lying-with-prone-position-cU53ZFBr3lk",
    "licens": "Unsplash License",
    "licensUrl": "https://unsplash.com/license",
    "fokus": "30% 50%"
  },
  "om": {
    "url": "https://images.unsplash.com/photo-1706795033917-dee116e7cba2",
    "alt": "Mjuka handdukar i taupe och tända värmeljus",
    "källa": "unsplash",
    "fotograf": "Anna Keibalo",
    "fotografUrl": "https://unsplash.com/@anyutakejbalo",
    "sida": "https://unsplash.com/photos/a-couple-of-candles-sitting-on-top-of-a-table-q8xEBCO6DQg",
    "licens": "Unsplash License",
    "licensUrl": "https://unsplash.com/license",
    "fokus": "center"
  },
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
  "spadetalj": {
    "url": "https://images.unsplash.com/photo-1621468644467-37e6df96e446",
    "alt": "Vita rullade handdukar, ett doftljus och en borste",
    "källa": "unsplash",
    "fotograf": "Susan Wilkinson",
    "fotografUrl": "https://unsplash.com/@susan_wilkinson",
    "sida": "https://unsplash.com/photos/brown-can-on-white-textile-GmR4OXwt2p8",
    "licens": "Unsplash License",
    "licensUrl": "https://unsplash.com/license",
    "fokus": "center"
  },
  "serum": {
    "url": "https://images.unsplash.com/photo-1781344116880-029945a42b75",
    "alt": "Serumflaska i bärnstensfärgat glas med pipett",
    "källa": "unsplash",
    "fotograf": "Avtar Singh",
    "fotografUrl": "https://unsplash.com/@avtar9w",
    "sida": "https://unsplash.com/photos/amber-glass-dropper-bottle-with-blank-label-on-concrete-block-MkuwnDkT1s0",
    "licens": "Unsplash License",
    "licensUrl": "https://unsplash.com/license",
    "fokus": "center"
  },
  "ansikte": {
    "url": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881",
    "alt": "Kvinna med ansiktsmask vilar under en ansiktsbehandling",
    "källa": "unsplash",
    "fotograf": "Rosa Rafael",
    "fotografUrl": "https://unsplash.com/@rosarafael",
    "sida": "https://unsplash.com/photos/woman-receiving-facial-mask-treatment-at-spa-Pe9IXUuC6QU",
    "licens": "Unsplash License",
    "licensUrl": "https://unsplash.com/license",
    "fokus": "center"
  },
  "hydrafacial": {
    "url": "https://images.unsplash.com/photo-1761718210089-ba3bb5ccb54f",
    "alt": "Ansiktsbehandling där en vårdande mask appliceras",
    "källa": "unsplash",
    "fotograf": "kimia kazemi",
    "fotografUrl": "https://unsplash.com/@kimick",
    "sida": "https://unsplash.com/photos/a-person-receiving-a-facial-treatment-RbIcMsh0NSk",
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
  "headspa": {
    "url": "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0",
    "alt": "Hårtvätt och hårbottenbehandling vid ett tvättfat",
    "källa": "unsplash",
    "fotograf": "Lindsay Cash",
    "fotografUrl": "https://unsplash.com/@lindsayrc81",
    "sida": "https://unsplash.com/photos/a-woman-getting-her-hair-cut-by-a-hair-stylist-Md_DhaFsnCQ",
    "licens": "Unsplash License",
    "licensUrl": "https://unsplash.com/license",
    "fokus": "center"
  },
  "massage": {
    "url": "https://images.unsplash.com/photo-1745327883508-b6cd32e5dde5",
    "alt": "Händer som masserar en rygg i mjukt dagsljus",
    "källa": "unsplash",
    "fotograf": "Jakub Klucký",
    "fotografUrl": "https://unsplash.com/@jakubklucky",
    "sida": "https://unsplash.com/photos/massage-therapist-giving-a-back-massage-7yeqemd-p90",
    "licens": "Unsplash License",
    "licensUrl": "https://unsplash.com/license",
    "fokus": "center"
  },
  "hotstone": {
    "url": "https://images.unsplash.com/photo-1701917084224-cb59235d1d69",
    "alt": "Varma stenar placerade längs ryggen under en hot stone-massage",
    "källa": "unsplash",
    "fotograf": "Taylor Heery",
    "fotografUrl": "https://unsplash.com/@taylorheeryphoto",
    "sida": "https://unsplash.com/photos/a-woman-laying-on-top-of-a-bed-under-a-blanket-M7n7YTkPAfA",
    "licens": "Unsplash License",
    "licensUrl": "https://unsplash.com/license",
    "fokus": "center"
  },
  "laserhair": {
    "url": "https://images.unsplash.com/photo-1700760933574-9f0f4ea9aa3b",
    "alt": "Laserhårborttagning på benet",
    "källa": "unsplash",
    "fotograf": "Farhad Ibrahimzade",
    "fotografUrl": "https://unsplash.com/@ferhadd",
    "sida": "https://unsplash.com/photos/laser-hair-removal-on-leg-szpFxaqS658",
    "licens": "Unsplash License",
    "licensUrl": "https://unsplash.com/license",
    "fokus": "center"
  },
  "vaxning": {
    "url": "https://images.unsplash.com/photo-1661308675370-31455561e15e",
    "alt": "Släta ben mot en mjuk vit filt",
    "källa": "unsplash",
    "fotograf": "Mathilde Langevin",
    "fotografUrl": "https://unsplash.com/@mathildelangevin",
    "sida": "https://unsplash.com/photos/a-womans-feet-with-a-ring-on-her-toe-PPodmkas_j0",
    "licens": "Unsplash License",
    "licensUrl": "https://unsplash.com/license",
    "fokus": "center"
  },
  "lashbrow": {
    "url": "https://images.unsplash.com/photo-1589710751893-f9a6770ad71b",
    "alt": "Närbild på en fransbehandling",
    "källa": "unsplash",
    "fotograf": "Hayley Kim Studios",
    "fotografUrl": "https://unsplash.com/@hayleykimstudios",
    "sida": "https://unsplash.com/photos/eyelash-extensions-application-in-salon-sRSRuxkOuzI",
    "licens": "Unsplash License",
    "licensUrl": "https://unsplash.com/license",
    "fokus": "center"
  },
  "tatuering": {
    "url": "https://images.unsplash.com/photo-1542727365-19732a80dcfd",
    "alt": "Arm med små tatueringar mot ljus bakgrund",
    "källa": "unsplash",
    "fotograf": "Sincerely Media",
    "fotografUrl": "https://unsplash.com/@sincerelymedia",
    "sida": "https://unsplash.com/photos/person-showing-arm-and-wrist-tattoo-CjHJbp3zInA",
    "licens": "Unsplash License",
    "licensUrl": "https://unsplash.com/license",
    "fokus": "center"
  },
  "tandblekning": {
    "url": "https://images.unsplash.com/photo-1611166819595-ac34987dfa57",
    "alt": "Leende kvinna",
    "källa": "unsplash",
    "fotograf": "Alexander Krivitskiy",
    "fotografUrl": "https://unsplash.com/@krivitskiy",
    "sida": "https://unsplash.com/photos/woman-in-white-fur-coat--x5vrLlYEsw",
    "licens": "Unsplash License",
    "licensUrl": "https://unsplash.com/license",
    "fokus": "center"
  },
  "momtobe": {
    "url": "https://images.unsplash.com/photo-1457342813143-a1ae27448a82",
    "alt": "Gravid kvinna håller händerna om magen",
    "källa": "unsplash",
    "fotograf": "freestocks",
    "fotografUrl": "https://unsplash.com/@freestocks",
    "sida": "https://unsplash.com/photos/pregnant-woman-cradling-her-belly-ux53SGpRAHU",
    "licens": "Unsplash License",
    "licensUrl": "https://unsplash.com/license",
    "fokus": "center"
  },
  "presentkort": {
    "url": "https://images.unsplash.com/photo-1706795033855-eee02f726868",
    "alt": "Rullade handdukar i sandfärg",
    "källa": "unsplash",
    "fotograf": "Anna Keibalo",
    "fotografUrl": "https://unsplash.com/@anyutakejbalo",
    "sida": "https://unsplash.com/photos/a-couple-of-rolled-up-towels-sitting-on-top-of-a-bed--kYCpF55lIg",
    "licens": "Unsplash License",
    "licensUrl": "https://unsplash.com/license",
    "fokus": "center"
  },
  "team-rania": {
    "url": "images/team/rania.webp",
    "alt": "Rania, klinikägare och spaterapeut på RAYN",
    "källa": "egen",
    "fotograf": "RAYN Beauty Spa & Wellness",
    "licens": "Egen bild",
    "platshallare": true,
    "notering": "Platshållare. Byt mot salongens egen bild"
  },
  "team-dana": {
    "url": "images/team/dana.webp",
    "alt": "Dana, auktoriserad hudterapeut på RAYN",
    "källa": "egen",
    "fotograf": "RAYN Beauty Spa & Wellness",
    "licens": "Egen bild",
    "platshallare": true,
    "notering": "Platshållare. Byt mot salongens egen bild"
  },
  "lokal": {
    "url": "images/lokal/behandlingsrum.webp",
    "alt": "Behandlingsrum hos RAYN på Roskildegatan 4 i Helsingborg",
    "källa": "egen",
    "fotograf": "RAYN Beauty Spa & Wellness",
    "licens": "Egen bild",
    "platshallare": true,
    "notering": "Platshållare. Byt mot salongens egen bild"
  },
  "instagram-1": {
    "url": "images/instagram/instagram-1.webp",
    "alt": "Bild 1 från RAYN:s Instagram",
    "källa": "egen",
    "fotograf": "RAYN Beauty Spa & Wellness",
    "licens": "Egen bild",
    "platshallare": true,
    "notering": "Platshållare. Byt mot en bild från salongens Instagram"
  },
  "instagram-2": {
    "url": "images/instagram/instagram-2.webp",
    "alt": "Bild 2 från RAYN:s Instagram",
    "källa": "egen",
    "fotograf": "RAYN Beauty Spa & Wellness",
    "licens": "Egen bild",
    "platshallare": true,
    "notering": "Platshållare. Byt mot en bild från salongens Instagram"
  },
  "instagram-3": {
    "url": "images/instagram/instagram-3.webp",
    "alt": "Bild 3 från RAYN:s Instagram",
    "källa": "egen",
    "fotograf": "RAYN Beauty Spa & Wellness",
    "licens": "Egen bild",
    "platshallare": true,
    "notering": "Platshållare. Byt mot en bild från salongens Instagram"
  },
  "instagram-4": {
    "url": "images/instagram/instagram-4.webp",
    "alt": "Bild 4 från RAYN:s Instagram",
    "källa": "egen",
    "fotograf": "RAYN Beauty Spa & Wellness",
    "licens": "Egen bild",
    "platshallare": true,
    "notering": "Platshållare. Byt mot en bild från salongens Instagram"
  },
  "instagram-5": {
    "url": "images/instagram/instagram-5.webp",
    "alt": "Bild 5 från RAYN:s Instagram",
    "källa": "egen",
    "fotograf": "RAYN Beauty Spa & Wellness",
    "licens": "Egen bild",
    "platshallare": true,
    "notering": "Platshållare. Byt mot en bild från salongens Instagram"
  },
  "instagram-6": {
    "url": "images/instagram/instagram-6.webp",
    "alt": "Bild 6 från RAYN:s Instagram",
    "källa": "egen",
    "fotograf": "RAYN Beauty Spa & Wellness",
    "licens": "Egen bild",
    "platshallare": true,
    "notering": "Platshållare. Byt mot en bild från salongens Instagram"
  },
  "resultat-microneedling-fore": {
    "url": "images/resultat/microneedling-fore.webp",
    "alt": "Före microneedling-behandling",
    "källa": "egen",
    "fotograf": "RAYN Beauty Spa & Wellness",
    "licens": "Egen bild",
    "platshallare": true,
    "notering": "Kundbild kommer. Publiceras först när kunden gett skriftligt samtycke"
  },
  "resultat-microneedling-efter": {
    "url": "images/resultat/microneedling-efter.webp",
    "alt": "Efter microneedling-behandling",
    "källa": "egen",
    "fotograf": "RAYN Beauty Spa & Wellness",
    "licens": "Egen bild",
    "platshallare": true,
    "notering": "Kundbild kommer. Publiceras först när kunden gett skriftligt samtycke"
  },
  "resultat-lashlift-fore": {
    "url": "images/resultat/lashlift-fore.webp",
    "alt": "Före lashlift och färg",
    "källa": "egen",
    "fotograf": "RAYN Beauty Spa & Wellness",
    "licens": "Egen bild",
    "platshallare": true,
    "notering": "Kundbild kommer. Publiceras först när kunden gett skriftligt samtycke"
  },
  "resultat-lashlift-efter": {
    "url": "images/resultat/lashlift-efter.webp",
    "alt": "Efter lashlift och färg",
    "källa": "egen",
    "fotograf": "RAYN Beauty Spa & Wellness",
    "licens": "Egen bild",
    "platshallare": true,
    "notering": "Kundbild kommer. Publiceras först när kunden gett skriftligt samtycke"
  },
  "resultat-browlift-fore": {
    "url": "images/resultat/browlift-fore.webp",
    "alt": "Före browlift och färg",
    "källa": "egen",
    "fotograf": "RAYN Beauty Spa & Wellness",
    "licens": "Egen bild",
    "platshallare": true,
    "notering": "Kundbild kommer. Publiceras först när kunden gett skriftligt samtycke"
  },
  "resultat-browlift-efter": {
    "url": "images/resultat/browlift-efter.webp",
    "alt": "Efter browlift och färg",
    "källa": "egen",
    "fotograf": "RAYN Beauty Spa & Wellness",
    "licens": "Egen bild",
    "platshallare": true,
    "notering": "Kundbild kommer. Publiceras först när kunden gett skriftligt samtycke"
  }
};
