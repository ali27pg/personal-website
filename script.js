/* Md Ali Akbar — Academic Portfolio interactions */

(function () {
  "use strict";

  /* Mobile menu */
  var menuBtn = document.getElementById("menuBtn");
  var nav = document.getElementById("nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Reveal on scroll */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* Animated stat counters */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var dur = 1400, start = null;
    function fmt(v) {
      var s = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString("en-US");
      return s + suffix;
    }
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll(".stat .num");
  if ("IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  /* Active nav link */
  var sections = document.querySelectorAll("main section[id]");
  var navLinks = document.querySelectorAll(".nav a[href^='#']");
  function setActive() {
    var current = null;
    sections.forEach(function (s) {
      var r = s.getBoundingClientRect();
      if (r.top <= 120) current = s.id;
    });
    navLinks.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
  }
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(function () { setActive(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });
  setActive();

  /* Header shadow on scroll */
  var header = document.getElementById("siteHeader");
  window.addEventListener("scroll", function () {
    header.style.boxShadow = window.scrollY > 8 ? "0 4px 18px rgba(28,26,22,.07)" : "none";
  }, { passive: true });

  /* Footer year */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();

/* ---------- Photo gallery (data injected at build time) ---------- */
(function () {
  "use strict";

  /* Filled by the build step: {src, cat, label, cap} */
var GALLERY = [
    {"src":"assets/gallery/convocations/01.jpg","cat":"convocations","label":"Convocations","cap":"5th Convocation Ceremony, Albukhary International University — graduates on stage"},
    {"src":"assets/gallery/convocations/02.jpg","cat":"convocations","label":"Convocations","cap":"Graduate portrait — 5th Convocation Ceremony"},
    {"src":"assets/gallery/convocations/03.jpg","cat":"convocations","label":"Convocations","cap":"Stage wide shot — 5th Convocation Ceremony"},
    {"src":"assets/gallery/convocations/04.jpg","cat":"convocations","label":"Convocations","cap":"Operating camera during the live ceremony coverage"},
    {"src":"assets/gallery/convocations/05.jpg","cat":"convocations","label":"Convocations","cap":"Graduates applauding — 5th Convocation Ceremony"},
    {"src":"assets/gallery/convocations/06.jpg","cat":"convocations","label":"Convocations","cap":"Celebration moment — 5th Convocation Ceremony"},
    {"src":"assets/gallery/convocations/07.jpg","cat":"convocations","label":"Convocations","cap":"Graduate with family — 5th Convocation Ceremony"},
    {"src":"assets/gallery/convocations/08.jpg","cat":"convocations","label":"Convocations","cap":"Graduates with certificates — 5th Convocation Ceremony"},
    {"src":"assets/gallery/broadcast/01.jpg","cat":"broadcast","label":"Broadcast & News","cap":"Broadcasting News Production — studio team"},
    {"src":"assets/gallery/broadcast/02.jpg","cat":"broadcast","label":"Broadcast & News","cap":"On the studio floor — Broadcasting News Production"},
    {"src":"assets/gallery/pr/01.jpg","cat":"pr","label":"PR Campaigns","cap":"Experience Baling 2.0 — PR campaign team with the 4Qaf Craft resin-art products"},
    {"src":"assets/gallery/pr/02.jpg","cat":"pr","label":"PR Campaigns","cap":"Experience Baling 2.0 — campaign team on location in Baling"},
    {"src":"assets/gallery/pr/03.jpg","cat":"pr","label":"PR Campaigns","cap":"“Navigating the Public Relations Landscape” — live webinar session"},
    {"src":"assets/gallery/pr/04.jpg","cat":"pr","label":"PR Campaigns","cap":"“Navigating the Public Relations Landscape” — event key visual"},
    {"src":"assets/gallery/film/01.jpg","cat":"film","label":"Short Film","cap":"“Petang di Kedai Uncle” — on location with the cast and crew"},
    {"src":"assets/gallery/film/02.jpg","cat":"film","label":"Short Film","cap":"“Petang di Kedai Uncle” — crew portrait between takes"},
    {"src":"assets/gallery/podcast/01.jpg","cat":"podcast","label":"Podcast","cap":"At the mixing desk — podcast production"},
    {"src":"assets/gallery/podcast/02.jpg","cat":"podcast","label":"Podcast","cap":"Social Business Podcast Series — directing from the control room"},
    {"src":"assets/gallery/community/01.jpg","cat":"community","label":"Community","cap":"GreenBite social business idea — presenting the product with a faculty mentor"},
    {"src":"assets/gallery/community/02.jpg","cat":"community","label":"Community","cap":"Community cooking and food distribution — volunteer team"},
    {"src":"assets/gallery/community/03.jpg","cat":"community","label":"Community","cap":"Community outreach — with local children"},
    {"src":"assets/gallery/leadership/01.jpg","cat":"leadership","label":"Leadership","cap":"Sports carnival — community football team"},
    {"src":"assets/gallery/leadership/02.jpg","cat":"leadership","label":"Leadership","cap":"Casting a vote — BASCA community election"},
    {"src":"assets/gallery/leadership/03.jpg","cat":"leadership","label":"Leadership","cap":"Echoes of July Revolution — debate final and cultural night"},
    {"src":"assets/gallery/leadership/04.jpg","cat":"leadership","label":"Leadership","cap":"Exclusive Interaction Session — BASCA community gathering"},
    {"src":"assets/gallery/leadership/05.jpg","cat":"leadership","label":"Leadership","cap":"BASCA community gathering"},
    {"src":"assets/gallery/leadership/06.jpg","cat":"leadership","label":"Leadership","cap":"Receiving a certificate of recognition on stage"},
  ];

  var grid = document.getElementById("galleryGrid");
  var filtersBox = document.getElementById("galleryFilters");
  if (!grid || !filtersBox) return;

  function render(filter) {
    grid.innerHTML = "";
    GALLERY.forEach(function (g, i) {
      if (filter !== "all" && g.cat !== filter) return;
      var b = document.createElement("button");
      b.type = "button";
      b.className = "g-item reveal visible";
      b.setAttribute("aria-label", g.cap + " (" + g.label + ")");
      var img = document.createElement("img");
      img.src = g.src;
      img.alt = g.cap;
      img.loading = "lazy";
      var tag = document.createElement("span");
      tag.className = "g-tag";
      tag.textContent = g.label;
      b.appendChild(img);
      b.appendChild(tag);
      b.addEventListener("click", function () { openLB(i, filter); });
      grid.appendChild(b);
    });
  }

  filtersBox.querySelectorAll(".filter").forEach(function (btn) {
    btn.addEventListener("click", function () {
      filtersBox.querySelectorAll(".filter").forEach(function (x) { x.classList.remove("active"); });
      btn.classList.add("active");
      render(btn.getAttribute("data-filter"));
    });
  });

  /* Lightbox */
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbCap = document.getElementById("lbCap");
  var lbList = [], lbIdx = 0;

  function openLB(i, filter) {
    lbList = GALLERY.map(function (g, idx) { return { g: g, idx: idx }; })
      .filter(function (x) { return filter === "all" || x.g.cat === filter; });
    lbIdx = 0;
    for (var k = 0; k < lbList.length; k++) {
      if (lbList[k].idx === i) { lbIdx = k; break; }
    }
    showLB();
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function showLB() {
    var item = lbList[lbIdx].g;
    lbImg.src = item.src;
    lbImg.alt = item.cap;
    lbCap.textContent = item.cap + " — " + item.label;
  }
  function closeLB() {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  function step(d) {
    lbIdx = (lbIdx + d + lbList.length) % lbList.length;
    showLB();
  }
  document.getElementById("lbClose").addEventListener("click", closeLB);
  document.getElementById("lbPrev").addEventListener("click", function (e) { e.stopPropagation(); step(-1); });
  document.getElementById("lbNext").addEventListener("click", function (e) { e.stopPropagation(); step(1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLB(); });
  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLB();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });

  render("all");
})();
