/* ==========================================================================
   RAYN – före/efter-jämförelse
   --------------------------------------------------------------------------
   Markup (genereras på sidorna):
     <figure class="ba" data-ba data-ba-name="Behandling">
       <div class="ba__frame">
         <img class="ba__img ba__img--after" …>          ← efter (underst)
         <div class="ba__before"><img class="ba__img" …></div>  ← före (beskärs)
         <span class="ba__label ba__label--before">Före</span>
         <span class="ba__label ba__label--after">Efter</span>
         <span class="ba__handle">…</span>
         <input class="ba__range" type="range" min="0" max="100" value="50" aria-label="…">
       </div>
       <figcaption>…</figcaption>
     </figure>

   Tillgänglighet: reglaget är ett vanligt <input type="range"> som ligger
   osynligt ovanpå bilderna. Det ger pekare, touch och tangentbord
   (piltangenter, Home/End, PageUp/PageDown) utan extra kod.

   Spårning: första gången någon drar i ett reglage skickas custom event
   "BeforeAfterInteract" (via RAYN_TRACK i tracking.js) – en gång per reglage
   och sidvisning.
   ========================================================================== */
(function () {
  'use strict';

  var sliders = document.querySelectorAll('[data-ba]');
  if (!sliders.length) return;

  Array.prototype.forEach.call(sliders, function (fig) {
    var frame = fig.querySelector('.ba__frame');
    var range = fig.querySelector('.ba__range');
    if (!frame || !range) return;

    var name = fig.getAttribute('data-ba-name') || '';
    var tracked = false;

    function update() {
      var v = Number(range.value);
      frame.style.setProperty('--pos', v + '%');
      range.setAttribute('aria-valuetext', 'Bilden före visas till ' + v + ' procent');
      frame.classList.toggle('is-before-hidden', v < 8);
      frame.classList.toggle('is-after-hidden', v > 92);
    }

    function onInput() {
      update();
      fig.classList.add('is-touched');
      if (!tracked && typeof window.RAYN_TRACK === 'function') {
        tracked = true;
        window.RAYN_TRACK('BeforeAfterInteract', {
          content_name: name,
          page_type: document.body.getAttribute('data-page-type') || '',
          page_path: location.pathname
        });
      }
    }

    range.addEventListener('input', onInput);
    range.addEventListener('change', onInput);
    range.addEventListener('focus', function () { frame.classList.add('is-focused'); });
    range.addEventListener('blur', function () { frame.classList.remove('is-focused'); });

    update();
  });
})();
