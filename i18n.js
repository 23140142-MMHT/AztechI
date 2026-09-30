// ════════════════════════════════════════════════════════════════════════
// Aztech II · FTC 17626 — Selector de idioma (ES / EN / FR)
// Traducción 100% manual: el español es el contenido original del HTML;
// cada elemento traducible lleva data-en y data-fr con su versión.
// El idioma elegido se recuerda en localStorage para todo el sitio.
// ════════════════════════════════════════════════════════════════════════
(function () {
  "use strict";

  var KEY = "aztech-lang";
  var SUPPORTED = ["es", "en", "fr"];
  var cache = new WeakMap(); // guarda el HTML original (ES) de cada elemento

  function translateEl(el, lang) {
    if (!cache.has(el)) cache.set(el, el.innerHTML);
    var val = lang === "es" ? cache.get(el) : el.getAttribute("data-" + lang);
    if (val != null) el.innerHTML = val;
  }

  function apply(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = "es";
    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-en], [data-fr]").forEach(function (el) {
      translateEl(el, lang);
    });

    document.querySelectorAll(".lang-btn").forEach(function (b) {
      var on = b.getAttribute("data-lang") === lang;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });

    try { localStorage.setItem(KEY, lang); } catch (e) {}
  }

  function init() {
    var saved = "en";
    try { saved = localStorage.getItem(KEY) || "en"; } catch (e) {}

    document.querySelectorAll(".lang-btn").forEach(function (b) {
      b.addEventListener("click", function () {
        apply(b.getAttribute("data-lang"));
      });
    });

    apply(saved);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
