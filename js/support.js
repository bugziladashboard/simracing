(function () {
  const CONFIG_URL = "./data/support.json?v=20260827-step5-10";

  function validHttpUrl(value) {
    try {
      const url = new URL(String(value || ""));
      return url.protocol === "https:" || url.protocol === "http:";
    } catch (_) {
      return false;
    }
  }

  function activateLink(id, provider, label) {
    const element = document.getElementById(id);
    if (!element) return;

    const url = provider?.url?.trim();
    if (!provider?.enabled || !validHttpUrl(url)) {
      element.href = "#";
      element.setAttribute("aria-disabled", "true");
      element.classList.add("is-pending");
      element.textContent = `${label} Link Pending`;
      element.addEventListener("click", (event) => event.preventDefault());
      return;
    }

    element.href = url;
    element.target = "_blank";
    element.rel = "noopener noreferrer";
    element.removeAttribute("aria-disabled");
    element.classList.remove("is-pending");
    element.textContent = label === "Ko-fi" ? "Leave a Tip on Ko-fi" : "Support with Stripe";
  }

  async function init() {
    try {
      const response = await fetch(CONFIG_URL, { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const config = await response.json();
      window.BugzilaSupport = { config };

      if (!config.enabled) return;
      activateLink("support-kofi", config.providers?.koFi, "Ko-fi");
      activateLink("support-stripe", config.providers?.stripe, "Stripe");
    } catch (error) {
      console.warn("Bugzila Support: unable to load support configuration", error);
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
