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
  // Project starter interactions and quote-form prefill.
  const briefOptions = document.querySelectorAll("[data-brief]");
  const briefCopy = {
    print: { title: "Let's plan your print.", copy: "Tell us what you need printed, the quantity and when you need it.", service: "Digital or offset printing", detail: "I'm interested in print materials.\nItem(s): \nQuantity: \nDeadline: " },
    brand: { title: "Let's shape your brand.", copy: "Share your business, audience and where the design will appear.", service: "Graphic design and branding", detail: "I'm interested in graphic design and branding.\nBusiness/project: \nAudience: \nWhat I need designed: " },
    signage: { title: "Let's make you visible.", copy: "Tell us where the sign or display will be used and the approximate size.", service: "Signs or large-format printing", detail: "I'm interested in signs or large-format printing.\nType/location: \nApproximate size: \nDeadline: " },
    campaign: { title: "Let's build the campaign.", copy: "Tell us what you're promoting, who it's for and which materials you have in mind.", service: "Promotional materials", detail: "I'm interested in promotional or campaign materials.\nCampaign/event: \nMaterials: \nQuantity/deadline: " }
  };
  briefOptions.forEach(option => option.addEventListener("click", () => {
    const item = briefCopy[option.dataset.brief];
    if (!item) return;
    briefOptions.forEach(button => {
      const active = button === option;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    const title = document.querySelector("#brief-result-title");
    const copy = document.querySelector("#brief-result-copy");
    const link = document.querySelector("#brief-result-link");
    const step = document.querySelector("#brief-step");
    if (title) title.textContent = item.title;
    if (copy) copy.textContent = item.copy;
    if (step) step.textContent = "DIRECTION SELECTED";
    if (link) link.href = "contact.html?service=" + encodeURIComponent(item.service) + "&brief=" + encodeURIComponent(item.detail) + "#quote";
  }));

  if (briefOptions.length) briefOptions[0].click();

  if (form) {
    const params = new URLSearchParams(window.location.search);
    const serviceSelect = form.querySelector('[name="service"]');
    const detailsField = form.querySelector('[name="details"]');
    const serviceParam = params.get("service");
    const briefParam = params.get("brief");
    if (serviceSelect && serviceParam) {
      const match = Array.from(serviceSelect.options).find(option => option.text.trim() === serviceParam);
      if (match) serviceSelect.value = match.value;
    }
    if (detailsField && briefParam && !detailsField.value) detailsField.value = briefParam;
  }

})();
