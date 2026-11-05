/* ==========================================================================
   RAYN – formuläret "Fråga om pris" (landningssidan CO2)
   --------------------------------------------------------------------------
   Skickar formuläret till Kommo via Vercel-funktionen api/kommo.js i repots
   rot. Kommo-token ligger som miljövariabel i Vercel, aldrig här.

   Inställningar i js/config.js → LEAD_FORM:
     KOMMO_ENDPOINT  Adressen till funktionen, standard
                     '/api/kommo'
     ACCESS_KEY      (valfritt) Web3Forms-nyckel som reserv. Om Kommo inte
                     svarar skickas förfrågan i stället som mejl via Web3Forms.
     SUBJECT         Ämnesrad i reservmejlet.
     EVENT           Meta-event vid lyckad förfrågan (standard 'Lead').
   Båda tomma = formuläret visar ett meddelande med telefonnumret.

   Spårning: vid lyckad förfrågan skickas EVENT via RAYN_TRACK (tracking.js) med
   lead_type 'intresseformular'. Namn, telefon och e-post skickas ALDRIG till Meta.
   ========================================================================== */
(function () {
  'use strict';

  var form = document.querySelector('[data-lead-form]');
  if (!form) return;

  var cfg = (window.RAYN_CONFIG && window.RAYN_CONFIG.LEAD_FORM) || {};
  var status = form.querySelector('[data-lead-status]');
  var submitBtn = form.querySelector('[type="submit"]');
  var success = document.querySelector('[data-lead-success]');
  var WEB3FORMS = 'https://api.web3forms.com/submit';
  var sending = false;

  /* --- Avancerad matchning för Meta ---------------------------------
     Telefon, mejl och förnamn normaliseras och krypteras med SHA-256 i
     webbläsaren. tracking.js skickar dem bara om besökaren har godkänt
     marknadsföringscookies. Meddelande och behandling skickas aldrig. */
  function sha256(str) {
    if (!str || !window.crypto || !crypto.subtle || !window.TextEncoder) return Promise.resolve('');
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(str)).then(function (buf) {
      return Array.prototype.map.call(new Uint8Array(buf), function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
    });
  }
  function normPhone(p) {
    var d = String(p || '').replace(/\D/g, '');
    if (!d) return '';
    if (d.indexOf('00') === 0) d = d.slice(2);
    else if (d.charAt(0) === '0') d = '46' + d.slice(1); /* svenskt nummer, t.ex. 073… → 4673… */
    return d;
  }
  function hashedUserData(p) {
    var em = String(p.email || '').trim().toLowerCase();
    var fn = String(p.name || '').trim().split(/\s+/)[0].toLowerCase().replace(/[^\p{L}]/gu, '');
    return Promise.all([sha256(em), sha256(normPhone(p.phone)), sha256(fn), sha256('se')]).then(function (h) {
      var ud = {};
      if (h[0]) ud.em = h[0];
      if (h[1]) ud.ph = h[1];
      if (h[2]) ud.fn = h[2];
      if (h[3] && (h[0] || h[1])) ud.country = h[3];
      return (ud.em || ud.ph) ? ud : null;
    });
  }

  function setStatus(msg, kind) {
    if (!status) return;
    status.textContent = msg || '';
    status.className = 'lead-form__status' + (kind ? ' lead-form__status--' + kind : '');
  }

  function attribution() {
    try { return JSON.parse(sessionStorage.getItem('rayn_attribution')) || {}; } catch (e) { return {}; }
  }

  function fieldError(field, msg) {
    var wrap = field.closest('.lead-field') || field.parentNode;
    var err = wrap.querySelector('.lead-field__error');
    if (!err) {
      err = document.createElement('p');
      err.className = 'lead-field__error';
      err.id = (field.id || field.name) + '-error';
      wrap.appendChild(err);
    }
    err.textContent = msg || '';
    if (msg) {
      field.setAttribute('aria-invalid', 'true');
      field.setAttribute('aria-describedby', err.id);
    } else {
      field.removeAttribute('aria-invalid');
    }
  }

  function messageFor(field) {
    if (field.validity.valueMissing) {
      if (field.type === 'checkbox') return 'Kryssa i rutan för att gå vidare.';
      if (field.type === 'radio') return 'Välj ett alternativ.';
      if (field.tagName === 'SELECT') return 'Välj en behandling.';
      return 'Fyll i det här fältet.';
    }
    if (field.validity.typeMismatch && field.type === 'email') return 'Skriv en giltig e-postadress.';
    if (field.validity.patternMismatch && field.type === 'tel') return 'Skriv ett giltigt telefonnummer.';
    return '';
  }

  function validate() {
    var first = null;
    Array.prototype.forEach.call(form.querySelectorAll('input, select, textarea'), function (f) {
      if (f.name === 'botcheck' || f.type === 'hidden') return;
      var msg = f.checkValidity() ? '' : messageFor(f);
      fieldError(f, msg);
      if (msg && !first) first = f;
    });
    /* Minst ett av fälten med data-one-of="contact" (telefon eller mejl) */
    var contact = form.querySelectorAll('[data-one-of="contact"]');
    if (contact.length) {
      var anyFilled = Array.prototype.some.call(contact, function (f) { return f.value.trim() !== ''; });
      if (!anyFilled) {
        fieldError(contact[0], 'Fyll i telefon eller e-post så att vi kan nå dig.');
        contact[0].setAttribute('aria-describedby', contact[0].id + '-error lead-contact-hint');
        Array.prototype.forEach.call(contact, function (f) { f.setAttribute('aria-invalid', 'true'); });
        if (!first) first = contact[0];
      }
    }
    if (first) first.focus();
    return !first;
  }

  function recheck(e) {
    var f = e.target;
    if (f.getAttribute('data-one-of') && f.value.trim() !== '') {
      Array.prototype.forEach.call(form.querySelectorAll('[data-one-of="' + f.getAttribute('data-one-of') + '"]'), function (c) {
        if (c.checkValidity()) fieldError(c, '');
      });
    }
    if (f.type === 'radio') {
      Array.prototype.forEach.call(form.querySelectorAll('input[type="radio"][name="' + f.name + '"]'), function (r) {
        if (r.getAttribute('aria-invalid') === 'true' && r.checkValidity()) fieldError(r, '');
      });
    } else if (f.getAttribute('aria-invalid') === 'true' && f.checkValidity()) fieldError(f, '');
    if (status && status.className.indexOf('--error') !== -1 && !form.querySelector('[aria-invalid="true"]')) setStatus('');
  }
  /* Tratt: första gången någon börjar fylla i formuläret skickas LeadFormStart (custom event) */
  var started = false;
  function onStart() {
    if (started) return;
    started = true;
    if (typeof window.RAYN_TRACK === 'function') {
      window.RAYN_TRACK('LeadFormStart', { content_name: form.getAttribute('data-content-name') || '', page_path: location.pathname });
    }
  }
  form.addEventListener('focusin', onStart);

  form.addEventListener('input', recheck);
  form.addEventListener('change', recheck);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (sending) return;
    setStatus('');
    if (!validate()) {
      setStatus('Kontrollera de markerade fälten.', 'error');
      return;
    }
    if (form.botcheck && form.botcheck.checked) return; /* spam */

    if (!cfg.KOMMO_ENDPOINT && !cfg.ACCESS_KEY) {
      setStatus('Formuläret är inte aktiverat än. Ring oss gärna på 073 649 76 52 så hjälper vi dig.', 'error');
      if (window.RAYN_CONFIG && window.RAYN_CONFIG.DEBUG) console.warn('[RAYN] LEAD_FORM.KOMMO_ENDPOINT saknas i js/config.js');
      return;
    }

    function val(name) { var f = form.elements[name]; return f && f.value ? f.value.trim() : ''; }
    var a = attribution();
    var u = a.utm || {};
    var payload = {
      treatment: val('Behandling'),
      name: val('name'),
      phone: val('Telefon'),
      email: val('email'),
      message: val('Meddelande'),
      page: location.origin + location.pathname,
      utm: u,
      fbclid: !!a.fbclid
    };

    function post(url, body) {
      return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body)
      }).then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (j) {
          if (!r.ok || j.ok === false || j.success === false) throw new Error(j.error || j.message || 'Fel vid sändning');
          return j;
        });
      });
    }

    /* Ett nytt försök efter en kort paus om första försöket misslyckas (t.ex. dålig mobiltäckning) */
    function sendKommo() {
      return post(cfg.KOMMO_ENDPOINT, payload).catch(function () {
        return new Promise(function (r) { setTimeout(r, 1500); }).then(function () { return post(cfg.KOMMO_ENDPOINT, payload); });
      });
    }

    function sendWeb3Forms() {
      var data = {
        access_key: cfg.ACCESS_KEY,
        subject: cfg.SUBJECT || 'Ny prisfråga från webbplatsen',
        from_name: 'RAYN webbplats',
        'Behandling': payload.treatment,
        'Sida': payload.page,
        'Kampanjkälla': [u.utm_source, u.utm_campaign, u.utm_content].filter(Boolean).join(', ') || 'Okänd'
      };
      if (payload.name) data.name = payload.name;
      if (payload.phone) data['Telefon'] = payload.phone;
      if (payload.email) data.email = payload.email;
      if (payload.message) data['Meddelande'] = payload.message;
      if (payload.fbclid) data['Klick från Meta'] = 'Ja';
      return post(WEB3FORMS, data);
    }

    var send = cfg.KOMMO_ENDPOINT
      ? sendKommo().catch(function (err) {
          if (window.RAYN_CONFIG && window.RAYN_CONFIG.DEBUG) console.warn('[RAYN] Kommo misslyckades', err);
          if (cfg.ACCESS_KEY) return sendWeb3Forms(); /* reserv */
          throw err;
        })
      : sendWeb3Forms();

    sending = true;
    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-busy', 'true');
    setStatus('Skickar…', 'info');

    send
      .then(function () { return hashedUserData(payload).catch(function () { return null; }); })
      .then(function (userData) {
        if (typeof window.RAYN_TRACK === 'function') {
          window.RAYN_TRACK(cfg.EVENT || 'Lead', {
            content_name: form.getAttribute('data-content-name') || '',
            content_category: 'Intresseformulär',
            lead_type: 'intresseformular',
            page_path: location.pathname
          }, userData || undefined);
        }
        setStatus('');
        form.hidden = true;
        if (success) {
          success.hidden = false;
          success.focus();
        }
      })
      .catch(function () {
        setStatus('Något gick fel och förfrågan skickades inte. Försök igen eller ring oss på 073 649 76 52.', 'error');
      })
      .then(function () {
        sending = false;
        submitBtn.disabled = false;
        submitBtn.removeAttribute('aria-busy');
      });
  });
})();
