(function () {
  const backToTop = document.getElementById("back-to-top");

  if (backToTop) {
    const updateVisibility = () => {
      backToTop.classList.toggle("is-visible", window.scrollY > 560);
    };

    window.addEventListener("scroll", updateVisibility, { passive: true });
    updateVisibility();

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.getElementById("mobile-nav");

  if (toggle && mobileNav) {
    const closeMenu = () => {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation menu");
      mobileNav.hidden = true;
    };

    const openMenu = () => {
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close navigation menu");
      mobileNav.hidden = false;
    };

    toggle.addEventListener("click", () => {
      if (toggle.getAttribute("aria-expanded") === "true") closeMenu();
      else openMenu();
    });

    mobileNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 720) closeMenu();
    });
  }
})();
