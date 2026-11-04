/* ==========================================================================
   RAYN – intresseformulär (landningssidan CO2)
   --------------------------------------------------------------------------
   Skickar formuläret till Web3Forms (https://web3forms.com), som mejlar
   intresseanmälan till salongen. Ingen egen server behövs.

   Inställningar i js/config.js → LEAD_FORM:
     ACCESS_KEY  Nyckel från Web3Forms (skapas gratis med salongens mejl).
                 Nyckeln är gjord för att ligga publikt i webbläsaren.
                 Tom nyckel = formuläret visar ett felmeddelande med telefonnummer.
     SUBJECT     Ämnesrad i mejlet till salongen.
     EVENT       Meta-event vid lyckad anmälan (standard 'Lead').

   Spårning: vid lyckad anmälan skickas EVENT via RAYN_TRACK (tracking.js) med
   lead_type 'intresseformular'. Namn, telefon och mejl skickas ALDRIG till Meta.
   ========================================================================== */
(function () {
  'use strict';

  var form = document.querySelector('[data-lead-form]');
  if (!form) return;

  var cfg = (window.RAYN_CONFIG && window.RAYN_CONFIG.LEAD_FORM) || {};
  var status = form.querySelector('[data-lead-status]');
  var submitBtn = form.querySelector('[type="submit"]');
  var success = document.querySelector('[data-lead-success]');
  var ENDPOINT = 'https://api.web3forms.com/submit';
  var sending = false;

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
      return 'Fyll i det här fältet.';
    }
    if (field.validity.typeMismatch && field.type === 'email') return 'Skriv en giltig mejladress.';
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
    if (first) first.focus();
    return !first;
  }

  function recheck(e) {
    var f = e.target;
    if (f.type === 'radio') {
      Array.prototype.forEach.call(form.querySelectorAll('input[type="radio"][name="' + f.name + '"]'), function (r) {
        if (r.getAttribute('aria-invalid') === 'true' && r.checkValidity()) fieldError(r, '');
      });
    } else if (f.getAttribute('aria-invalid') === 'true' && f.checkValidity()) fieldError(f, '');
    if (status && status.className.indexOf('--error') !== -1 && !form.querySelector('[aria-invalid="true"]')) setStatus('');
  }
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

    if (!cfg.ACCESS_KEY) {
      setStatus('Formuläret är inte aktiverat än. Ring oss gärna på 073 649 76 52 så hjälper vi dig.', 'error');
      if (window.RAYN_CONFIG && window.RAYN_CONFIG.DEBUG) console.warn('[RAYN] LEAD_FORM.ACCESS_KEY saknas i js/config.js');
      return;
    }

    var data = {};
    Array.prototype.forEach.call(form.elements, function (f) {
      if (!f.name || f.name === 'botcheck') return;
      if (f.type === 'checkbox') data[f.name] = f.checked ? 'Ja' : 'Nej';
      else if (f.type === 'radio') { if (f.checked) data[f.name] = f.value; }
      else data[f.name] = f.value.trim();
    });
    var a = attribution();
    data.access_key = cfg.ACCESS_KEY;
    data.subject = cfg.SUBJECT || 'Ny intresseanmälan från webbplatsen';
    data.from_name = 'RAYN webbplats';
    data['Sida'] = location.origin + location.pathname;
    var u = a.utm || {};
    data['Kampanjkälla'] = [u.utm_source, u.utm_campaign, u.utm_content].filter(Boolean).join(', ') || 'Okänd';
    if (a.fbclid) data['Klick från Meta'] = 'Ja';

    sending = true;
    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-busy', 'true');
    setStatus('Skickar…', 'info');

    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data)
    })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        if (!res.ok || res.j.success === false) throw new Error(res.j.message || 'Fel vid sändning');
        if (typeof window.RAYN_TRACK === 'function') {
          window.RAYN_TRACK(cfg.EVENT || 'Lead', {
            content_name: form.getAttribute('data-content-name') || '',
            content_category: 'Intresseformulär',
            lead_type: 'intresseformular',
            page_path: location.pathname
          });
        }
        form.hidden = true;
        if (success) {
          success.hidden = false;
          success.focus();
        }
      })
      .catch(function () {
        setStatus('Något gick fel och anmälan skickades inte. Försök igen eller ring oss på 073 649 76 52.', 'error');
      })
      .then(function () {
        sending = false;
        submitBtn.disabled = false;
        submitBtn.removeAttribute('aria-busy');
      });
  });
})();
