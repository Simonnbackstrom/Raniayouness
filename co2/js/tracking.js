/* ==========================================================================
   RAYN – spårning (Meta-pixel, attribution, Boka-länkar)
   --------------------------------------------------------------------------
   1. Fångar UTM-parametrar + fbclid vid landning → sessionStorage
   2. Bygger om alla Bokadirekt-länkar: ev. djuplänk per behandling,
      UTM-parametrar på, öppnas i ny flik
   3. Laddar Meta-pixeln FÖRST när besökaren samtyckt till marknadsföring
   4. Events:  PageView        – alla sidor
               ViewContent     – sidor med <body data-view-content>
               Lead/BookingClick – klick på alla Boka-länkar
               Contact         – klick på tel:- och mailto:-länkar
               BeforeAfterInteract – första dragningen i varje före/efter-reglage
                                 (skickas från js/before-after.js via RAYN_TRACK)
   5. Varje event får ett unikt event_id och sparas i window.RAYN_EVENTS
      (samma struktur som Conversions API förväntar sig) så att server-events
      kan dedupliceras mot pixeln. Se sendToCapi() och README.md.
   6. Testläge: öppna sidan en gång med ?rayn_test=1 så skickas INGA events
      till Meta från den webbläsaren (sparas tills ?rayn_test=0). Formulär-
      anmälningar hamnar ändå i Kommo, men taggas "Test". Använd det på alla
      egna datorer/mobiler så att era tester inte räknas som leads.
   ========================================================================== */
(function () {
  'use strict';

  var cfg = window.RAYN_CONFIG || {};
  var body = document.body;
  var ATTR_KEY = 'rayn_attribution';
  var DEBUG = !!cfg.DEBUG || /[?&]rayn_debug=1/.test(location.search);

  var pixelId = String(cfg.META_PIXEL_ID || '');
  var pixelIdValid = /^\d{10,20}$/.test(pixelId);
  var pixelLoaded = false;
  var pageEventsSent = false;

  /* Datastruktur för alla events – läs i konsolen: RAYN_EVENTS */
  var EVENTS = window.RAYN_EVENTS = window.RAYN_EVENTS || [];

  function log() {
    if (DEBUG && window.console) console.log.apply(console, ['[RAYN]'].concat([].slice.call(arguments)));
  }

  /* ---------------------------------------------------------------------
     0. Testläge (intern trafik)
     --------------------------------------------------------------------- */
  var TEST_KEY = 'rayn_test';

  (function readTestParam() {
    var v = new URLSearchParams(location.search).get('rayn_test');
    try {
      if (v === '1') localStorage.setItem(TEST_KEY, '1');
      else if (v === '0') localStorage.removeItem(TEST_KEY);
    } catch (e) { /* ignoreras */ }
  })();

  function isTestMode() {
    try { return localStorage.getItem(TEST_KEY) === '1'; } catch (e) { return false; }
  }

  function showTestBadge() {
    if (!isTestMode() || document.getElementById('rayn-test-badge')) return;
    var b = document.createElement('div');
    b.id = 'rayn-test-badge';
    b.textContent = 'Testläge – skickas inte till Meta';
    b.setAttribute('style', 'position:fixed;left:8px;bottom:8px;z-index:99999;padding:4px 8px;border-radius:4px;' +
      'background:#b00020;color:#fff;font:600 11px/1.3 system-ui,sans-serif;pointer-events:none;opacity:.85');
    document.body.appendChild(b);
  }

  /* ---------------------------------------------------------------------
     1. Attribution: UTM + fbclid
     --------------------------------------------------------------------- */
  function readAttribution() {
    try { return JSON.parse(sessionStorage.getItem(ATTR_KEY)) || null; } catch (e) { return null; }
  }

  function writeAttribution(a) {
    try { sessionStorage.setItem(ATTR_KEY, JSON.stringify(a)); } catch (e) { /* ignoreras */ }
  }

  function captureAttribution() {
    var params = new URLSearchParams(location.search);
    var current = readAttribution() || { utm: {}, fbclid: null, fbclid_ts: null, landing_page: null };
    var foundUtm = {};
    var hasUtm = false;

    (cfg.ATTRIBUTION_PARAMS || []).forEach(function (key) {
      var v = params.get(key);
      if (v) { foundUtm[key] = v.slice(0, 200); hasUtm = true; }
    });

    var fbclid = params.get('fbclid');

    if (hasUtm) current.utm = foundUtm; /* senaste kampanjen i sessionen vinner */
    if (fbclid) {
      current.fbclid = fbclid.slice(0, 500);
      current.fbclid_ts = Date.now();
    }
    if (hasUtm || fbclid || !current.landing_page) {
      current.landing_page = location.pathname;
    }
    writeAttribution(current);
    return current;
  }

  var attribution = captureAttribution();

  /* ---------------------------------------------------------------------
     2. Bokadirekt-länkar
     --------------------------------------------------------------------- */
  function isBookingLink(a) {
    return a && a.tagName === 'A' && (a.hasAttribute('data-book') || /bokadirekt\.se/i.test(a.getAttribute('href') || ''));
  }

  function buildBookingUrl(a) {
    var id = a.getAttribute('data-treatment-id');
    var links = cfg.TREATMENT_LINKS || {};
    var base = (id && links[id]) || a.getAttribute('data-original-href') || a.getAttribute('href') || cfg.BOKADIREKT_URL;
    var url;
    try { url = new URL(base, location.href); } catch (e) { return base; }

    var utm = (attribution && attribution.utm && Object.keys(attribution.utm).length)
      ? attribution.utm
      : (cfg.DEFAULT_OUTBOUND_UTM || {});

    Object.keys(utm).forEach(function (k) {
      if (!url.searchParams.has(k)) url.searchParams.set(k, utm[k]);
    });
    return url.toString();
  }

  function decorateBookingLinks() {
    var links = document.querySelectorAll('a[data-book], a[href*="bokadirekt.se"]');
    Array.prototype.forEach.call(links, function (a) {
      if (!a.hasAttribute('data-original-href')) a.setAttribute('data-original-href', a.getAttribute('href') || '');
      a.setAttribute('href', buildBookingUrl(a));
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
    });
  }

  /* ---------------------------------------------------------------------
     3. Meta-pixeln (laddas bara efter samtycke)
     --------------------------------------------------------------------- */
  function getCookie(name) {
    var m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/[$()*+.?[\\\]^{|}]/g, '\\$&') + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : null;
  }

  function setCookie(name, value, days) {
    var exp = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + exp + '; path=/; SameSite=Lax' +
      (location.protocol === 'https:' ? '; Secure' : '');
  }

  function deleteCookie(name) {
    var host = location.hostname;
    var parts = host.split('.');
    var domains = ['', host];
    if (parts.length > 1) domains.push('.' + parts.slice(-2).join('.'));
    domains.forEach(function (d) {
      document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + (d ? '; domain=' + d : '');
    });
  }

  /* Besökaren kan ha kommit via annons (fbclid) på en sida och samtyckt på en annan.
     Då finns fbclid inte längre i URL:en – vi sätter _fbc själva från sessionen. */
  function ensureFbcCookie() {
    if (!attribution || !attribution.fbclid) return;
    if (getCookie('_fbc')) return;
    setCookie('_fbc', 'fb.1.' + (attribution.fbclid_ts || Date.now()) + '.' + attribution.fbclid, 90);
  }

  function loadPixel() {
    if (pixelLoaded) return true;
    if (!pixelIdValid) {
      log('Meta-pixeln laddas inte: META_PIXEL_ID i js/config.js är inte ifyllt.');
      return false;
    }
    ensureFbcCookie();

    /* Metas officiella bas-kod (utan automatisk PageView – den skickas av track()) */
    /* eslint-disable */
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */

    window.fbq('consent', 'grant');
    window.fbq('init', pixelId);
    pixelLoaded = true;
    log('Meta-pixeln laddad', pixelId);
    return true;
  }

  function revokePixel() {
    if (window.fbq) window.fbq('consent', 'revoke');
    ['_fbp', '_fbc'].forEach(deleteCookie);
    log('Samtycke återkallat – pixeln pausad och _fbp/_fbc raderade.');
  }

  function hasConsent() {
    return !!(window.RAYN_CONSENT && window.RAYN_CONSENT.hasMarketing());
  }

  /* ---------------------------------------------------------------------
     4. Events
     --------------------------------------------------------------------- */
  var STANDARD_EVENTS = ['PageView', 'ViewContent', 'Lead', 'Contact', 'Schedule', 'Search'];

  function makeEventId(name) {
    var rand = (window.crypto && crypto.randomUUID)
      ? crypto.randomUUID()
      : Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 12);
    return name + '.' + rand;
  }

  /**
   * Skapar ett event, sparar det i RAYN_EVENTS och skickar det till pixeln
   * (och ev. CAPI) om samtycke finns.
   * @param {string} name  Eventnamn, t.ex. 'Lead'
   * @param {object} data  custom_data, t.ex. { content_name: 'Hydrafacial' }
   */
  /* userData (valfritt): SHA-256-krypterade kontaktuppgifter för avancerad matchning,
     t.ex. { em: '<hash>', ph: '<hash>' }. Skickas bara om besökaren samtyckt.
     opts (valfritt): { eventId: 'Lead.<uuid>', skipCapi: true }
       eventId  – använd ett redan skapat id (så att servern kan skicka samma)
       skipCapi – servern skickar själv eventet till Conversions API */
  function track(name, data, userData, opts) {
    opts = opts || {};
    var evt = {
      event_name: name,
      event_id: opts.eventId || makeEventId(name),
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: location.href.split('#')[0],
      action_source: 'website',
      custom_data: data || {},
      user_data: {
        fbp: getCookie('_fbp'),
        fbc: getCookie('_fbc'),
        client_user_agent: navigator.userAgent
      },
      sent_to_pixel: false,
      sent_to_capi: false,
      test_mode: isTestMode()
    };
    if (userData && hasConsent()) {
      Object.keys(userData).forEach(function (k) { if (userData[k]) evt.user_data[k] = userData[k]; });
    }

    if (evt.test_mode) {
      log('Testläge – skickas inte till Meta:', name, evt);
    } else if (hasConsent() && loadPixel()) {
      if (userData) {
        var am = {};
        Object.keys(userData).forEach(function (k) { if (userData[k]) am[k] = userData[k]; });
        if (Object.keys(am).length) window.fbq('init', pixelId, am); /* manuell avancerad matchning */
      }
      var isStandard = STANDARD_EVENTS.indexOf(name) !== -1;
      window.fbq(isStandard ? 'track' : 'trackCustom', name, evt.custom_data, { eventID: evt.event_id });
      evt.sent_to_pixel = true;
      evt.sent_to_capi = opts.skipCapi ? false : sendToCapi(evt);
    }

    EVENTS.push(evt);
    if (EVENTS.length > 100) EVENTS.shift();
    log(evt.sent_to_pixel ? 'Skickat' : 'Ej skickat (inget samtycke/pixel-ID)', name, evt);
    document.dispatchEvent(new CustomEvent('rayn:track', { detail: evt }));
    return evt;
  }

  /* ---------------------------------------------------------------------
     5. Conversions API – STUB
     ---------------------------------------------------------------------
     En statisk webbplats kan inte skicka server-events själv (access-token
     får aldrig ligga i webbläsaren). Den här funktionen skickar eventet till
     en endpoint ni själva driftar – t.ex. en liten serverless-funktion
     (Cloudflare Worker / Netlify / Vercel) som lägger till IP-adress och
     access-token och vidarebefordrar till:
       POST https://graph.facebook.com/v<VERSION>/<PIXEL_ID>/events
     Samma event_id som pixeln använde skickas med → Meta deduplicerar.
     Se README.md, avsnittet ”Conversions API”, för ett komplett exempel.

     Använder ni Metas CAPI Gateway (eller Stape m.fl.) behövs ingen kod här:
     den fångar pixel-eventen automatiskt. Låt då CAPI_ENDPOINT vara tom.
     --------------------------------------------------------------------- */
  function sendToCapi(evt) {
    if (!cfg.CAPI_ENDPOINT) return false;

    var payload = JSON.stringify({
      event_name: evt.event_name,
      event_id: evt.event_id,
      event_time: evt.event_time,
      event_source_url: evt.event_source_url,
      action_source: evt.action_source,
      user_data: {
        fbp: getCookie('_fbp') || undefined,
        fbc: getCookie('_fbc') || undefined,
        client_user_agent: navigator.userAgent,
        em: evt.user_data.em || undefined,
        ph: evt.user_data.ph || undefined,
        fn: evt.user_data.fn || undefined,
        country: evt.user_data.country || undefined
        /* client_ip_address läggs till på servern */
      },
      custom_data: evt.custom_data
    });

    try {
      /* text/plain undviker CORS-preflight; servern parsar JSON från texten */
      var blob = new Blob([payload], { type: 'text/plain;charset=UTF-8' });
      if (navigator.sendBeacon && navigator.sendBeacon(cfg.CAPI_ENDPOINT, blob)) return true;
      fetch(cfg.CAPI_ENDPOINT, { method: 'POST', body: payload, keepalive: true, headers: { 'Content-Type': 'text/plain;charset=UTF-8' } });
      return true;
    } catch (e) {
      log('CAPI-fel', e);
      return false;
    }
  }

  /* ---------------------------------------------------------------------
     Sid-events (PageView + ViewContent)
     --------------------------------------------------------------------- */
  function sendPageEvents() {
    if (pageEventsSent) return;
    if (!hasConsent()) {
      /* Loggas lokalt men skickas inte – skickas när/om samtycke ges */
      log('Väntar på samtycke innan PageView/ViewContent skickas.');
      return;
    }
    pageEventsSent = true;
    track('PageView', { page_type: body.getAttribute('data-page-type') || 'page' });

    if (body.hasAttribute('data-view-content')) {
      track('ViewContent', {
        content_name: body.getAttribute('data-content-name') || document.title,
        content_category: body.getAttribute('data-content-category') || '',
        content_type: 'service',
        page_type: body.getAttribute('data-page-type') || ''
      });
    }
  }

  /* ---------------------------------------------------------------------
     Klick: Boka + Contact
     --------------------------------------------------------------------- */
  function bookingData(a) {
    return {
      content_name: a.getAttribute('data-content-name') || body.getAttribute('data-content-name') || 'Allmän bokning',
      content_category: a.getAttribute('data-content-category') || body.getAttribute('data-content-category') || '',
      treatment_id: a.getAttribute('data-treatment-id') || '',
      button_position: a.getAttribute('data-position') || 'okänd',
      page_type: body.getAttribute('data-page-type') || '',
      page_path: location.pathname,
      utm_campaign: (attribution && attribution.utm && attribution.utm.utm_campaign) || ''
    };
  }

  function handleClick(e) {
    var a = e.target.closest && e.target.closest('a');
    if (!a) return;
    /* Endast vänsterklick/mittenklick */
    if (e.type === 'auxclick' && e.button !== 1) return;

    var href = a.getAttribute('href') || '';

    if (isBookingLink(a)) {
      /* Bygg om URL:en i sista stund (om attribution ändrats) */
      a.setAttribute('href', buildBookingUrl(a));
      var name = cfg.BOOKING_EVENT === 'BookingClick' ? 'BookingClick' : 'Lead';
      track(name, bookingData(a));
      return;
    }

    if (/^tel:/i.test(href)) {
      track('Contact', { contact_method: 'phone', button_position: a.getAttribute('data-position') || 'okänd', page_path: location.pathname });
    } else if (/^mailto:/i.test(href)) {
      track('Contact', { contact_method: 'email', button_position: a.getAttribute('data-position') || 'okänd', page_path: location.pathname });
    }
  }

  document.addEventListener('click', handleClick, true);
  document.addEventListener('auxclick', handleClick, true);

  /* ---------------------------------------------------------------------
     Samtycke ändras
     --------------------------------------------------------------------- */
  document.addEventListener('rayn:consent', function (e) {
    if (e.detail.marketing) {
      if (pixelLoaded && window.fbq) window.fbq('consent', 'grant');
      sendPageEvents();
    } else if (e.detail.withdrawn) {
      revokePixel();
    }
  });

  /* ---------------------------------------------------------------------
     Start
     --------------------------------------------------------------------- */
  decorateBookingLinks();
  showTestBadge();
  sendPageEvents();

  /* Publikt API för egna events, t.ex. RAYN_TRACK('Schedule', {...}) */
  window.RAYN_TRACK = track;
  window.RAYN_MAKE_EVENT_ID = makeEventId;

  /* Det formuläret skickar med till servern så att api/kommo.js kan skicka
     samma Lead till Conversions API (deduplicerat via event_id). */
  window.RAYN_META_CONTEXT = function () {
    var consent = hasConsent();
    return {
      consent: consent,
      test: isTestMode(),
      fbp: consent ? getCookie('_fbp') : null,
      fbc: consent ? getCookie('_fbc') : null,
      /* fbclid används på servern för att bygga fbc om cookien saknas */
      fbclid: consent && attribution && attribution.fbclid || null,
      fbclid_ts: consent && attribution && attribution.fbclid_ts || null,
      event_source_url: location.href.split('#')[0]
    };
  };
})();
