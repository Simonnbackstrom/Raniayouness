/* ==========================================================================
   RAYN – intresseformulär (landningssidan CO2)
   --------------------------------------------------------------------------
   Sidan har samma formulär på två ställen: överst (hero) och längst ner.
   Fält: namn, e-post, mobilnummer (frivilligt), meddelande + dolt fält "Intresse" som fylls i när
   kunden klickar på t.ex. "Visa intresse" vid ett priskort.

   Skickas till Kommo via Vercel-funktionen api/kommo.js i repots rot.
   Kommo-token ligger som miljövariabel i Vercel, aldrig här.

   Inställningar i js/config.js → LEAD_FORM:
     KOMMO_ENDPOINT  Adressen till funktionen, standard '/api/kommo'
     ACCESS_KEY      (valfritt) Web3Forms-nyckel som reserv. Om Kommo inte
                     svarar skickas förfrågan i stället som mejl via Web3Forms.
     SUBJECT         Ämnesrad i reservmejlet.
     EVENT           Meta-event vid lyckad anmälan (standard 'Lead').
   Båda tomma = formuläret visar ett meddelande med telefonnumret.

   Spårning (tracking.js):
     LeadFormStart  första gången någon börjar fylla i ett formulär
     Lead           när en anmälan har tagits emot (en gång per anmälan)
   Båda med form_position 'hero' eller 'bottom'. Namn och e-post skickas
   aldrig i klartext till Meta (se avancerad matchning nedan).
   ========================================================================== */
(function () {
  'use strict';

  var forms = document.querySelectorAll('[data-lead-form]');
  if (!forms.length) return;

  var cfg = (window.RAYN_CONFIG && window.RAYN_CONFIG.LEAD_FORM) || {};
  var WEB3FORMS = 'https://api.web3forms.com/submit';
  var PHONE = '073 649 76 52';
  var started = {};

  /* --- Avancerad matchning för Meta ---------------------------------
     Mejl, mobilnummer och förnamn normaliseras och krypteras med SHA-256 i
     webbläsaren. tracking.js skickar dem bara om besökaren har godkänt
     marknadsföringscookies. Meddelandet skickas aldrig. */
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
    else if (d.charAt(0) === '0') d = '46' + d.slice(1);
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

  function attribution() {
    try { return JSON.parse(sessionStorage.getItem('rayn_attribution')) || {}; } catch (e) { return {}; }
  }

  function track(name, data, userData) {
    if (typeof window.RAYN_TRACK === 'function') window.RAYN_TRACK(name, data, userData);
  }

  /* --- "Visa intresse"-knappar: fyll i vad kunden är intresserad av --- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-interest]');
    if (!a) return;
    var interest = a.getAttribute('data-interest');
    Array.prototype.forEach.call(forms, function (f) {
      if (f.elements['Intresse']) f.elements['Intresse'].value = interest;
      var msg = f.elements['Meddelande'];
      if (msg && (!msg.value.trim() || msg.getAttribute('data-prefilled') === '1')) {
        msg.value = 'Jag är intresserad av ' + interest.replace(/^CO2 laser, /, 'CO2 laser för ') + '.';
        msg.setAttribute('data-prefilled', '1');
      }
    });
  });

  Array.prototype.forEach.call(forms, setup);

  function setup(form) {
    var position = form.getAttribute('data-form-position') || 'okänd';
    var status = form.querySelector('[data-lead-status]');
    var submitBtn = form.querySelector('[type="submit"]');
    var card = form.parentNode;
    var success = card && card.querySelector('[data-lead-success]');
    var sending = false;

    function setStatus(msg, kind) {
      if (!status) return;
      status.textContent = msg || '';
      status.className = 'lead-form__status' + (kind ? ' lead-form__status--' + kind : '');
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
        if (field.type === 'email') return 'Fyll i din e-post så att vi kan kontakta dig.';
        if (field.type === 'tel') return 'Fyll i ditt mobilnummer så att vi kan kontakta dig.';
        if (field.name === 'name') return 'Fyll i ditt namn.';
        return 'Fyll i det här fältet.';
      }
      if (field.validity.typeMismatch && field.type === 'email') return 'Skriv en giltig e-postadress, t.ex. namn@exempel.se.';
      if (field.validity.patternMismatch && field.type === 'tel') return 'Skriv ett giltigt mobilnummer, t.ex. 070 123 45 67.';
      return '';
    }

    function validate() {
      var first = null;
      Array.prototype.forEach.call(form.querySelectorAll('input, textarea'), function (f) {
        if (f.name === 'botcheck' || f.type === 'hidden') return;
        var msg = f.checkValidity() ? '' : messageFor(f);
        fieldError(f, msg);
        if (msg && !first) first = f;
      });
      if (first) first.focus();
      return !first;
    }

    function recheck(e) {
      var f = e.target;
      if (f.getAttribute('aria-invalid') === 'true' && f.checkValidity()) fieldError(f, '');
      if (f.name === 'Meddelande' && e.type === 'input') f.removeAttribute('data-prefilled');
      if (status && status.className.indexOf('--error') !== -1 && !form.querySelector('[aria-invalid="true"]')) setStatus('');
    }
    form.addEventListener('input', recheck);
    form.addEventListener('change', recheck);

    /* Tratt: första gången någon börjar fylla i formuläret */
    form.addEventListener('focusin', function () {
      if (started[position]) return;
      started[position] = true;
      track('LeadFormStart', { content_name: form.getAttribute('data-content-name') || '', form_position: position, page_path: location.pathname });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (sending) return;
      setStatus('');
      if (!validate()) {
        setStatus('Kontrollera de markerade fälten.', 'error');
        return;
      }
      if (form.elements['botcheck'] && form.elements['botcheck'].checked) return; /* spam */

      if (!cfg.KOMMO_ENDPOINT && !cfg.ACCESS_KEY) {
        setStatus('Formuläret är inte aktiverat än. Ring oss gärna på ' + PHONE + ' så hjälper vi dig.', 'error');
        return;
      }

      function val(name) { var f = form.elements[name]; return f && f.value ? f.value.trim() : ''; }
      var a = attribution();
      var u = a.utm || {};
      var payload = {
        interest: val('Intresse') || 'CO2 laser',
        name: val('name'),
        email: val('email'),
        phone: val('Telefon'),
        message: val('Meddelande'),
        form_position: position,
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
          subject: cfg.SUBJECT || 'Ny intresseanmälan från webbplatsen',
          from_name: 'RAYN webbplats',
          name: payload.name,
          email: payload.email,
          'Intresse': payload.interest,
          'Formulär': position === 'hero' ? 'Överst på sidan' : 'Längst ner på sidan',
          'Sida': payload.page,
          'Kampanjkälla': [u.utm_source, u.utm_campaign, u.utm_content].filter(Boolean).join(', ') || 'Okänd'
        };
        if (payload.phone) data['Telefon'] = payload.phone;
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
          track(cfg.EVENT || 'Lead', {
            content_name: form.getAttribute('data-content-name') || '',
            content_category: 'Intresseformulär',
            lead_type: 'intresseformular',
            form_position: position,
            interest: payload.interest,
            page_path: location.pathname
          }, userData || undefined);
          setStatus('');
          form.hidden = true;
          if (success) {
            success.hidden = false;
            success.focus();
          }
        })
        .catch(function () {
          setStatus('Något gick fel och uppgifterna skickades inte. Försök igen eller ring oss på ' + PHONE + '.', 'error');
        })
        .then(function () {
          sending = false;
          submitBtn.disabled = false;
          submitBtn.removeAttribute('aria-busy');
        });
    });
  }
})();
