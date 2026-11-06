(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Theme toggle ---------- */
  document.getElementById('themeToggle').addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.getElementById('menuToggle');
  var links = document.getElementById('navLinks');
  function setMenu(open) {
    links.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  }
  menuBtn.addEventListener('click', function () { setMenu(!links.classList.contains('is-open')); });
  links.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* ---------- Dynamic values ---------- */
  var start = new Date(2019, 10, 1); // Nov 2019 — first full-time role
  var years = Math.floor((Date.now() - start.getTime()) / (365.25 * 864e5));
  document.querySelectorAll('.js-years').forEach(function (el) { el.textContent = years; });
  document.getElementById('year').textContent = new Date().getFullYear();

  var timeEl = document.getElementById('localTime');
  function tick() {
    try {
      timeEl.textContent = new Intl.DateTimeFormat('en-IN', {
        hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata'
      }).format(new Date()).toUpperCase() + ' IST';
    } catch (e) { timeEl.textContent = 'IST (UTC+5:30)'; }
  }
  tick();
  setInterval(tick, 30000);

  /* ---------- Marquees: duplicate content for a seamless loop ---------- */
  document.querySelectorAll('.marquee__track').forEach(function (track) {
    if (reduceMotion) return;
    Array.prototype.slice.call(track.children).forEach(function (child) {
      var clone = child.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.querySelectorAll('a').forEach(function (a) { a.tabIndex = -1; });
      track.appendChild(clone);
    });
  });

  /* ---------- Reveal on scroll + active nav link ---------- */
  if ('IntersectionObserver' in window && !reduceMotion) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(function (el, i) {
      // small stagger for siblings in grids
      el.style.transitionDelay = (Array.prototype.indexOf.call(el.parentNode.children, el) % 6) * 60 + 'ms';
      revealObs.observe(el);
    });
  } else {
    root.classList.add('no-anim');
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-visible'); });
  }

  if ('IntersectionObserver' in window) {
    var navMap = {};
    links.querySelectorAll('a').forEach(function (a) { navMap[a.getAttribute('href').slice(1)] = a; });
    var sectionObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var a = navMap[entry.target.id];
        if (a && entry.isIntersecting) {
          links.querySelectorAll('a').forEach(function (l) { l.classList.remove('is-active'); });
          a.classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { sectionObs.observe(s); });
  }

  /* ---------- Tile spotlight follows cursor ---------- */
  document.querySelectorAll('.tile').forEach(function (tile) {
    tile.addEventListener('pointermove', function (e) {
      var r = tile.getBoundingClientRect();
      tile.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      tile.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  /* ---------- Hide tech icons that fail to load ---------- */
  document.querySelectorAll('.icon-list img, .sk__icon--xl img').forEach(function (img) {
    img.addEventListener('error', function () { img.style.visibility = 'hidden'; });
  });

  /* ---------- Contact form (Formspree, AJAX with graceful fallback) ---------- */
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');
  form.addEventListener('submit', function (e) {
    if (!window.fetch) return;
    e.preventDefault();
    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    status.className = 'form__status';
    status.textContent = '';
    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (res) {
        if (!res.ok) throw new Error('Request failed');
        form.reset();
        status.className = 'form__status ok';
        status.textContent = 'Thanks! Your message has been sent — I\'ll be in touch soon.';
      })
      .catch(function () {
        status.className = 'form__status err';
        status.textContent = 'Something went wrong. Please try again or reach out on LinkedIn.';
      })
      .finally(function () {
        btn.disabled = false;
        btn.textContent = "Let's talk";
      });
  });
})();
