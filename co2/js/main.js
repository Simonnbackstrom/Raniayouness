/* ==========================================================================
   RAYN – gränssnitt
   - Bilder från js/images.js (byter src/srcset/alt om registret ändrats)
   - Mobilmeny, header vid scroll
   - Scroll-animationer (IntersectionObserver, respekterar prefers-reduced-motion)
   - Karusell för omdömen
   - Fast bokningsknapp på mobil
   - Kampanjpriser som löper ut automatiskt (data-offer-until)
   - Resultatsektion på kampanjsidor (SHOW_BEFORE_AFTER_ON_CAMPAIGNS)
   - Karta som laddas först vid klick
   - Instagram från config, bildkällor på credits.html, årtal i sidfoten
   ========================================================================== */
(function () {
  'use strict';

  var cfg = window.RAYN_CONFIG || {};
  var IMAGES = window.RAYN_IMAGES || {};
  var doc = document.documentElement;
  var root = doc.getAttribute('data-root') || '';
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var each = function (sel, fn, ctx) { Array.prototype.forEach.call((ctx || document).querySelectorAll(sel), fn); };

  /* ---------- Bilder från bildregistret ---------- */
  function imgUrl(url, w, ratio) {
    var p = (ratio || '4:5').split(':');
    var h = Math.round(w * Number(p[1]) / Number(p[0]));
    if (/images\.unsplash\.com/.test(url)) return url + '?w=' + w + '&h=' + h + '&fit=crop&q=75&fm=webp';
    if (/images\.pexels\.com/.test(url)) return url + '?auto=compress&cs=tinysrgb&w=' + w + '&h=' + h + '&fit=crop';
    return /^https?:/.test(url) ? url : root + url;
  }

  each('[data-img]', function (el) {
    var data = IMAGES[el.getAttribute('data-img')];
    if (!data || !data.url) return;
    if (el.tagName === 'IMG' && data.alt && el.getAttribute('alt') !== '') el.setAttribute('alt', data.alt);
    if (el.getAttribute('data-base') === data.url) return; /* oförändrad – inget att göra */
    var ratio = el.getAttribute('data-ratio');
    var widths = (el.getAttribute('data-widths') || '800').split(',').map(Number);
    var remote = /^https?:/.test(data.url);
    if (remote) {
      el.setAttribute('srcset', widths.map(function (w) { return imgUrl(data.url, w, ratio) + ' ' + w + 'w'; }).join(', '));
    } else {
      el.removeAttribute('srcset');
    }
    if (el.tagName === 'IMG') {
      el.setAttribute('src', imgUrl(data.url, widths[Math.min(1, widths.length - 1)], ratio));
      if (data.fokus) el.style.objectPosition = data.fokus;
    }
    el.setAttribute('data-base', data.url);
  });

  /* ---------- Mobilmeny ---------- */
  var toggle = document.querySelector('[data-nav-toggle]');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Stäng meny' : 'Öppna meny');
      doc.classList.toggle('nav-open', open);
    };
    toggle.addEventListener('click', function () { setOpen(toggle.getAttribute('aria-expanded') !== 'true'); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); }
    });
    window.matchMedia('(min-width: 900px)').addEventListener('change', function (mq) { if (mq.matches) setOpen(false); });
  }

  /* ---------- Header vid scroll ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Resultat på kampanjsidor ---------- */
  var campaign = document.body.getAttribute('data-campaign');
  var campaignResults = document.querySelector('[data-campaign-results]');
  if (campaign && campaignResults) {
    var show = cfg.SHOW_BEFORE_AFTER_ON_CAMPAIGNS || {};
    campaignResults.hidden = show[campaign] !== true;
  }

  /* ---------- Scroll-animationer ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    each('.reveal', function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    Array.prototype.forEach.call(reveals, function (el) { io.observe(el); });
  }

  /* ---------- Karusell (omdömen) ---------- */
  each('[data-carousel]', function (car) {
    var track = car.querySelector('[data-carousel-track]');
    var prev = car.querySelector('[data-carousel-prev]');
    var next = car.querySelector('[data-carousel-next]');
    if (!track) return;
    var step = function () {
      var item = track.querySelector('[data-carousel-item]');
      return item ? item.getBoundingClientRect().width + 20 : track.clientWidth * 0.8;
    };
    var updateButtons = function () {
      var max = track.scrollWidth - track.clientWidth - 2;
      if (prev) prev.disabled = track.scrollLeft <= 2;
      if (next) next.disabled = track.scrollLeft >= max;
    };
    if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: reduceMotion ? 'auto' : 'smooth' }); });
    if (next) next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: reduceMotion ? 'auto' : 'smooth' }); });
    track.addEventListener('scroll', updateButtons, { passive: true });
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); track.scrollBy({ left: step() }); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); track.scrollBy({ left: -step() }); }
    });
    window.addEventListener('resize', updateButtons);
    updateButtons();
  });

  /* ---------- Fast bokningsknapp (mobil) ---------- */
  var sticky = document.querySelector('.sticky-cta');
  var trigger = document.querySelector('[data-sticky-trigger]');
  if (sticky && trigger && 'IntersectionObserver' in window) {
    var triggerVisible = true;
    var endVisible = false;
    var update = function () {
      var showSticky = !triggerVisible && !endVisible;
      sticky.classList.toggle('is-visible', showSticky);
      sticky.setAttribute('aria-hidden', String(!showSticky));
      each('a, button', function (el) {
        if (showSticky) el.removeAttribute('tabindex'); else el.setAttribute('tabindex', '-1');
      }, sticky);
    };
    new IntersectionObserver(function (entries) { triggerVisible = entries[0].isIntersecting; update(); }).observe(trigger);
    /* Alla [data-sticky-hide] (t.ex. formuläret och avslutande CTA) döljer den fasta knappen när de syns */
    var hideZones = document.querySelectorAll('[data-sticky-hide]');
    var visibleZones = 0;
    Array.prototype.forEach.call(hideZones, function (zone) {
      var inView = false;
      new IntersectionObserver(function (entries) {
        var now = entries[0].isIntersecting;
        if (now !== inView) { visibleZones += now ? 1 : -1; inView = now; }
        endVisible = visibleZones > 0; update();
      }).observe(zone);
    });
    update();
  }

  /* ---------- Kampanjpriser som löper ut ---------- */
  var today = new Date();
  var todayStr = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
  each('[data-offer-until]', function (el) {
    var until = el.getAttribute('data-offer-until');
    if (until && todayStr > until) {
      el.hidden = true;
      var scope = el.closest('[data-offer-scope]') || el.parentNode;
      each('[data-offer-fallback]', function (fb) {
        var f = fb.getAttribute('data-offer-fallback');
        if (f === until || f === '') fb.hidden = false;
      }, scope);
    }
  });

  /* ---------- Karta: laddas först vid klick ---------- */
  each('[data-map-load]', function (btn) {
    btn.addEventListener('click', function () {
      var wrap = btn.closest('.map');
      if (!wrap) return;
      var iframe = document.createElement('iframe');
      iframe.src = btn.getAttribute('data-map-load');
      iframe.title = 'Karta: RAYN Beauty Spa & Wellness, Roskildegatan 4, Helsingborg';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.setAttribute('allowfullscreen', '');
      wrap.innerHTML = '';
      wrap.appendChild(iframe);
      wrap.classList.add('is-loaded');
      iframe.focus();
    });
  });

  /* ---------- Instagram ---------- */
  var ig = cfg.INSTAGRAM_URL || '';
  each('[data-instagram]', function (el) {
    if (ig) { el.setAttribute('href', ig); el.hidden = false; }
    else if (el.tagName === 'A' && !el.closest('[data-instagram-section]')) el.hidden = true;
  });
  each('[data-instagram-section]', function (sec) { sec.hidden = !ig; });
  if (ig) {
    var handle = ig.replace(/\/+$/, '').split('/').pop();
    each('[data-instagram-handle]', function (el) { el.textContent = '@' + handle; });
  }

  /* ---------- Bildkällor (credits.html) – byggs från bildregistret ---------- */
  var credits = document.querySelector('[data-credits-table] tbody');
  if (credits && Object.keys(IMAGES).length) {
    var esc = function (s) { var d = document.createElement('div'); d.textContent = s || ''; return d.innerHTML; };
    var rows = Object.keys(IMAGES).filter(function (k) { return IMAGES[k]['källa'] !== 'egen'; }).map(function (k) {
      var v = IMAGES[k];
      var src = v['källa'] === 'pexels' ? 'Pexels' : 'Unsplash';
      return '<tr><td><code>' + esc(k) + '</code></td><td>' + esc(v.alt) + '</td>' +
        '<td>' + (v.fotografUrl ? '<a href="' + esc(v.fotografUrl) + '" target="_blank" rel="noopener">' + esc(v.fotograf) + '</a>' : esc(v.fotograf)) + '</td>' +
        '<td>' + (v.sida ? '<a href="' + esc(v.sida) + '" target="_blank" rel="noopener">' + src + '</a>' : src) + '</td>' +
        '<td>' + (v.licensUrl ? '<a href="' + esc(v.licensUrl) + '" target="_blank" rel="noopener">' + esc(v.licens) + '</a>' : esc(v.licens)) + '</td></tr>';
    });
    credits.innerHTML = rows.join('');
  }

  /* ---------- Årtal ---------- */
  each('[data-year]', function (el) { el.textContent = String(today.getFullYear()); });
})();
