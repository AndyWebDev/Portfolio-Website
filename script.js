document.addEventListener("DOMContentLoaded", () => {
  //-------------------- DARK / LIGHT TOGGLE --------------------
  const htmlEl = document.documentElement;
  const toggleBtn = document.getElementById("toggleBtn");
  const iconSun = document.getElementById("iconSun");
  const iconMoon = document.getElementById("iconMoon");

  // Initialize light mode
  htmlEl.classList.remove("dark");
  iconSun?.classList.remove("hidden");
  iconMoon?.classList.add("hidden");

  toggleBtn?.addEventListener("click", () => {
    const isDark = htmlEl.classList.toggle("dark");
    iconSun?.classList.toggle("hidden", isDark);
    iconMoon?.classList.toggle("hidden", !isDark);
  });

  //-------------------- MOBILE MENU --------------------
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  function toggleMenu() {
    mobileMenu?.classList.toggle("hidden");
  }

  menuToggle?.addEventListener("click", toggleMenu);

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    if (
      !mobileMenu?.contains(event.target) &&
      !menuToggle?.contains(event.target)
    ) {
      mobileMenu?.classList.add("hidden");
    }
  });

  // Close menu when a link/button inside menu is clicked
  mobileMenu?.querySelectorAll("a, button").forEach((link) => {
    link.addEventListener("click", () => mobileMenu.classList.add("hidden"));
  });

  //-------------------- CONTACT FORM MODAL --------------------
  const formDiv = document.getElementById("form");
  const form = document.getElementById("booking-form");
  const successMsg = document.getElementById("success");
  const closeBtn = document.getElementById("close-form");

  function openModal() {
    formDiv?.classList.remove("hidden");
    form?.classList.remove("hidden");
    form?.reset();
    successMsg?.classList.add("hidden");
    form
      ?.querySelectorAll("p.text-red-600")
      .forEach((el) => el.classList.add("hidden"));
  }

  document
    .querySelectorAll("#hero-btn, #cta-btn, #contact-btn")
    .forEach((btn) => {
      btn.addEventListener("click", openModal);
    });

  closeBtn?.addEventListener("click", () => formDiv?.classList.add("hidden"));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") formDiv?.classList.add("hidden");
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form) return;

    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      service: form.service.value,
      comments: form.comments.value.trim(),
    };

    const errors = {};
    if (!formData.name) errors.name = "Full name is required.";
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errors.email = "Enter a valid email address.";
    if (!formData.phone) errors.phone = "Telephone is required.";
    if (!formData.service) errors.service = "Please select a service.";

    // Clear previous errors
    form.querySelectorAll("p.text-red-600").forEach((el) => {
      el.textContent = "";
      el.classList.add("hidden");
    });

    // Display errors
    if (Object.keys(errors).length) {
      Object.entries(errors).forEach(([field, msg]) => {
        if (!msg) return;
        const input = form.querySelector(`[name="${field}"]`);
        const errorEl = input?.parentElement.querySelector("p.text-red-600");
        if (errorEl) {
          errorEl.textContent = msg;
          errorEl.classList.remove("hidden");
        }
      });
      return;
    }

    // Success
    form.classList.add("hidden");
    successMsg?.classList.remove("hidden");
  });

  //-------------------- COOKIE BANNER --------------------
  const overlay = document.getElementById("cookie-overlay");
  const acceptBtn = document.getElementById("accept-cookies");

  if (overlay && localStorage.getItem("cookiesAccepted") !== "true") {
    overlay.classList.remove("hidden");
  }

  acceptBtn?.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true");
    overlay?.classList.add("hidden");
  });

  //-------------------- DYNAMIC YEAR --------------------
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
