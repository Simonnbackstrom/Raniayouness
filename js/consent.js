/* ==========================================================================
   RAYN – cookiesamtycke
   --------------------------------------------------------------------------
   - Visar cookiebanner på svenska: Acceptera / Endast nödvändiga / Inställningar
   - Sparar valet i localStorage (nyckel: rayn_consent) med version + tidsstämpel
   - Länkar/knappar med attributet [data-consent-open] öppnar inställningarna igen
   - Meddelar resten av sidan via eventet "rayn:consent" på document
   - Exponerar window.RAYN_CONSENT = { get, hasMarketing, open, set }
   Meta-pixeln laddas av tracking.js – och bara när marketing === true.
   ========================================================================== */
(function () {
  'use strict';

  var cfg = window.RAYN_CONFIG || {};
  var KEY = 'rayn_consent';
  var VERSION = cfg.CONSENT_VERSION || 1;
  var MAX_AGE = (cfg.CONSENT_MAX_AGE_DAYS || 365) * 864e5;
  var root = document.documentElement.getAttribute('data-root') || '';
  var policyUrl = root + 'integritetspolicy.html#cookies';

  var state = read();
  var banner = null;
  var dialog = null;
  var lastFocus = null;

  /* ---------- Lagring ---------- */
  function read() {
    try {
      var v = JSON.parse(window.localStorage.getItem(KEY));
      if (!v || v.version !== VERSION) return null;
      if (Date.now() - v.ts > MAX_AGE) return null;
      return v;
    } catch (e) {
      return null;
    }
  }

  function save(marketing) {
    var previous = state;
    state = { version: VERSION, ts: Date.now(), necessary: true, marketing: !!marketing };
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) { /* t.ex. privat läge – valet gäller då bara denna sidvisning */ }

    hideBanner();
    closeDialog();

    document.dispatchEvent(new CustomEvent('rayn:consent', {
      detail: {
        marketing: state.marketing,
        changed: !previous || previous.marketing !== state.marketing,
        withdrawn: !!(previous && previous.marketing && !state.marketing)
      }
    }));
  }

  /* ---------- Banner ---------- */
  function buildBanner() {
    banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-labelledby', 'cookie-banner-title');
    banner.innerHTML =
      '<div class="cookie-banner__inner">' +
        '<p class="cookie-banner__title" id="cookie-banner-title">Vi värnar om din integritet</p>' +
        '<p class="cookie-banner__text">Med ditt samtycke använder vi Metas pixel för att mäta och förbättra våra annonser på Facebook och Instagram. ' +
        'Du kan ändra ditt val när som helst. <a href="' + policyUrl + '">Läs mer om cookies</a></p>' +
        '<div class="cookie-banner__actions">' +
          '<button type="button" class="btn btn--primary btn--sm" data-consent-action="accept">Acceptera</button>' +
          '<button type="button" class="btn btn--outline btn--sm" data-consent-action="necessary">Endast nödvändiga</button>' +
          '<button type="button" class="btn btn--text btn--sm" data-consent-action="settings">Inställningar</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(banner);
  }

  function showBanner() {
    if (!banner) buildBanner();
    banner.hidden = false;
    document.documentElement.classList.add('has-cookie-banner');
  }

  function hideBanner() {
    if (banner) banner.hidden = true;
    document.documentElement.classList.remove('has-cookie-banner');
  }

  /* ---------- Inställningsdialog ---------- */
  function buildDialog() {
    dialog = document.createElement('dialog');
    dialog.className = 'cookie-dialog';
    dialog.setAttribute('aria-labelledby', 'cookie-dialog-title');
    dialog.innerHTML =
      '<form method="dialog" class="cookie-dialog__form">' +
        '<h2 class="cookie-dialog__title" id="cookie-dialog-title">Cookieinställningar</h2>' +
        '<p>Välj vilka typer av cookies och lagring du godkänner. Ditt val sparas i 12 månader och kan ändras via länken ”Cookieinställningar” längst ned på varje sida.</p>' +
        '<div class="cookie-option">' +
          '<div class="cookie-option__text">' +
            '<p class="cookie-option__name" id="co-necessary-label">Nödvändiga</p>' +
            '<p class="cookie-option__desc">Krävs för att webbplatsen ska fungera, t.ex. för att komma ihåg ditt cookieval och vilken kampanj du kom ifrån (sparas bara under besöket). Kan inte stängas av.</p>' +
          '</div>' +
          '<input type="checkbox" class="switch" checked disabled aria-labelledby="co-necessary-label">' +
        '</div>' +
        '<div class="cookie-option">' +
          '<div class="cookie-option__text">' +
            '<label class="cookie-option__name" for="co-marketing">Marknadsföring</label>' +
            '<p class="cookie-option__desc">Metas pixel från Meta Platforms Ireland Ltd. hjälper oss att mäta hur våra annonser på Facebook och Instagram fungerar och att visa relevanta annonser. Sätter cookies som _fbp och _fbc.</p>' +
          '</div>' +
          '<input type="checkbox" class="switch" id="co-marketing">' +
        '</div>' +
        '<div class="cookie-dialog__actions">' +
          '<button type="button" class="btn btn--outline btn--sm" data-consent-action="save">Spara mina val</button>' +
          '<button type="button" class="btn btn--primary btn--sm" data-consent-action="accept">Acceptera alla</button>' +
        '</div>' +
        '<p class="cookie-dialog__more"><a href="' + policyUrl + '">Läs mer i integritetspolicyn</a></p>' +
        '<button type="button" class="cookie-dialog__close" data-consent-action="close" aria-label="Stäng">&times;</button>' +
      '</form>';
    document.body.appendChild(dialog);

    dialog.addEventListener('cancel', function () { restoreFocus(); });
    dialog.addEventListener('close', function () { restoreFocus(); });
  }

  function openDialog() {
    if (!dialog) buildDialog();
    lastFocus = document.activeElement;
    dialog.querySelector('#co-marketing').checked = !!(state && state.marketing);
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
    var first = dialog.querySelector('#co-marketing');
    if (first) first.focus();
  }

  function closeDialog() {
    if (!dialog) return;
    if (typeof dialog.close === 'function' && dialog.open) {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
  }

  function restoreFocus() {
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
    lastFocus = null;
  }

  /* ---------- Klickhantering (delegerad) ---------- */
  document.addEventListener('click', function (e) {
    var openEl = e.target.closest('[data-consent-open]');
    if (openEl) {
      e.preventDefault();
      openDialog();
      return;
    }
    var actionEl = e.target.closest('[data-consent-action]');
    if (!actionEl) return;
    var action = actionEl.getAttribute('data-consent-action');
    if (action === 'accept') save(true);
    else if (action === 'necessary') save(false);
    else if (action === 'settings') openDialog();
    else if (action === 'save') save(dialog.querySelector('#co-marketing').checked);
    else if (action === 'close') { closeDialog(); }
  });

  /* ---------- Publikt API ---------- */
  window.RAYN_CONSENT = {
    get: function () { return state; },
    hasMarketing: function () { return !!(state && state.marketing); },
    open: openDialog,
    set: function (marketing) { save(marketing); }
  };

  /* ---------- Start ---------- */
  if (!state) showBanner();
})();
