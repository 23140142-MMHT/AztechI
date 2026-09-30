(function () {
  "use strict";

  function initSeasonFallbacks() {
    var seasonPhotos = document.querySelectorAll(".season-photo");
    seasonPhotos.forEach(function (img) {
      if (!img) return;
      img.addEventListener("error", function () {
        var fallback = document.createElement("div");
        fallback.className = "season-photo season-photo--missing";
        fallback.innerHTML = "Imagen<br>próximamente";
        img.replaceWith(fallback);
      });
    });

    var team = document.querySelector(".team-photo");
    if (team) {
      team.addEventListener("error", function () {
        team.style.display = "none";
      });
    }

    var cycleImg = document.querySelector(".cycle-figure img");
    if (cycleImg) {
      cycleImg.addEventListener("error", function () {
        var hint = document.createElement("span");
        hint.className = "cycle-figure-hint";
        hint.textContent = "Imagen del ciclo · warrior-cycle.png";
        cycleImg.replaceWith(hint);
      });
    }
  }

  function initPillarsDropdown() {
    var dropdowns = document.querySelectorAll(".nav-dropdown");
    if (!dropdowns.length) return;

    function closeAll() {
      dropdowns.forEach(function (d) {
        d.classList.remove("open");
        var button = d.querySelector(".nav-dropdown-btn");
        if (button) button.setAttribute("aria-expanded", "false");
      });
    }

    dropdowns.forEach(function (d) {
      var button = d.querySelector(".nav-dropdown-btn");
      if (!button) return;

      button.addEventListener("click", function (e) {
        e.stopPropagation();
        var isOpen = d.classList.contains("open");
        closeAll();

        if (!isOpen) {
          d.classList.add("open");
          button.setAttribute("aria-expanded", "true");
        }
      });
    });

    document.addEventListener("click", closeAll);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeAll();
    });
  }

  function initDrawer() {
    var burger = document.querySelector(".nav-burger");
    var drawer = document.getElementById("site-drawer");
    var backdrop = document.querySelector(".drawer-backdrop");
    var drawerClose = document.querySelector(".drawer-close");

    if (!burger && !drawer && !backdrop && !drawerClose) return;

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
  }

  function init() {
    initSeasonFallbacks();
    initPillarsDropdown();
    initDrawer();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
