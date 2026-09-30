// ════════════════════════════════════════════════════════════════════════
// Aztech II · FTC 17626 — interactividad del sitio
// El menú flotante de la trayectoria es 100% CSS (hover); aquí solo
// manejamos el respaldo visual si alguna imagen de temporada no carga.
// ════════════════════════════════════════════════════════════════════════
(function () {
  "use strict";

  // Si una imagen de temporada falla, la sustituimos por un placeholder.
  document.querySelectorAll(".season-photo").forEach(function (img) {
    img.addEventListener("error", function () {
      var fallback = document.createElement("div");
      fallback.className = "season-photo season-photo--missing";
      fallback.innerHTML = "Imagen<br>próximamente";
      img.replaceWith(fallback);
    });
  });

  // La foto del equipo también: si falta, evita el ícono roto.
  var team = document.querySelector(".team-photo");
  if (team) {
    team.addEventListener("error", function () {
      team.style.display = "none";
    });
  }

  // Imagen del Aztech Warrior Cycle: si aún no se sube, deja un aviso limpio.
  var cycleImg = document.querySelector(".cycle-figure img");
  if (cycleImg) {
    cycleImg.addEventListener("error", function () {
      var hint = document.createElement("span");
      hint.className = "cycle-figure-hint";
      hint.textContent = "Imagen del ciclo · brand/warrior-cycle.png";
      cycleImg.replaceWith(hint);
    });
  }

  // Menú desplegable "Our Pillars" (clic para abrir/cerrar; hover ya en CSS).
  var dropdowns = document.querySelectorAll(".nav-dropdown");

  function closeAll() {
    dropdowns.forEach(function (d) {
      d.classList.remove("open");
      var b = d.querySelector(".nav-dropdown-btn");
      if (b) b.setAttribute("aria-expanded", "false");
    });
  }

  dropdowns.forEach(function (d) {
    var btn = d.querySelector(".nav-dropdown-btn");
    if (!btn) return;
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var isOpen = d.classList.contains("open");
      closeAll();
      if (!isOpen) {
        d.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Cerrar al hacer clic fuera o con Escape.
  document.addEventListener("click", closeAll);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeAll();
  });

  // ── Menú lateral desplegable (drawer) ──────────────────────────────────
  var burger = document.querySelector(".nav-burger");
  var drawer = document.getElementById("site-drawer");
  var backdrop = document.querySelector(".drawer-backdrop");
  var drawerClose = document.querySelector(".drawer-close");

  function openDrawer() {
    document.body.classList.add("drawer-open");
    if (burger) burger.setAttribute("aria-expanded", "true");
    if (drawer) drawer.setAttribute("aria-hidden", "false");
  }
  function closeDrawer() {
    document.body.classList.remove("drawer-open");
    if (burger) burger.setAttribute("aria-expanded", "false");
    if (drawer) drawer.setAttribute("aria-hidden", "true");
  }

  if (burger) {
    burger.addEventListener("click", function (e) {
      e.stopPropagation();
      if (document.body.classList.contains("drawer-open")) closeDrawer();
      else openDrawer();
    });
  }
  if (backdrop) backdrop.addEventListener("click", closeDrawer);
  if (drawerClose) drawerClose.addEventListener("click", closeDrawer);
  if (drawer) {
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeDrawer);
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeDrawer();
  });
})();
