(() => {
  "use strict";
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
    }));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation");
      }
    });
  }

  const form = document.querySelector("#quote-form");
  if (form) {
    const note = document.querySelector("#form-note");
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const subject = "Project enquiry — " + String(data.get("service") || "Cosmicol Limited");
      const body = [
        "Hello Cosmicol Limited,",
        "",
        "I'd like to enquire about a project.",
        "",
        "Name / business: " + data.get("name"),
        "Email: " + data.get("email"),
        "Phone: " + (data.get("phone") || "Not provided"),
        "Service: " + data.get("service"),
        "Quantity / size: " + (data.get("quantity") || "Not specified"),
        "",
        "Project details:",
        data.get("details"),
        "",
        "Thank you."
      ].join("\n");
      if (note) note.textContent = "Opening your email app with the enquiry details. Please review the draft and press Send to contact Cosmicol.";
      window.location.href = "mailto:cosmicol.digital@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });
  }

  const workFilters = document.querySelectorAll("[data-work-filter]");
  const workCards = document.querySelectorAll("[data-work-category]");
  if (workFilters.length && workCards.length) {
    workFilters.forEach(filter => {
      filter.addEventListener("click", () => {
        const category = filter.dataset.workFilter;
        workFilters.forEach(button => {
          const active = button === filter;
          button.classList.toggle("active", active);
          button.setAttribute("aria-pressed", String(active));
        });
        workCards.forEach(card => {
          card.hidden = category !== "all" && card.dataset.workCategory !== category;
        });
      });
    });
  }
})();
