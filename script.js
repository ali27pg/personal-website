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
