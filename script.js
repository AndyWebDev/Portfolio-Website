// v2 release

// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Theme toggle
  const toggleBtn = document.getElementById("themeToggle");
  const iconSun = document.getElementById("iconSun");
  const iconMoon = document.getElementById("iconMoon");

  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    document.documentElement.classList.add("dark");
    iconSun.classList.add("hidden");
    iconMoon.classList.remove("hidden");
  }

  toggleBtn.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    iconSun.classList.toggle("hidden");
    iconMoon.classList.toggle("hidden");
  });

  // ==== MOBILE MENU TOGGLE ====
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle("hidden");
  });

  // Hide menu when clicking links
  mobileMenu.querySelectorAll("a, button").forEach((link) => {
    link.addEventListener("click", () => mobileMenu.classList.add("hidden"));
  });

  // Hide menu on outside click
  document.addEventListener("click", (e) => {
    if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      mobileMenu.classList.add("hidden");
    }
  });

  // ==== CONTACT FORM MODAL ====
  const formDiv = document.getElementById("form");
  const form = document.getElementById("booking-form");
  const successMsg = document.getElementById("success");
  const closeBtn = document.getElementById("close-form");

  function openModal() {
    formDiv.classList.remove("hidden");
    form.classList.remove("hidden");
    form.reset();
    successMsg.classList.add("hidden");
    form
      .querySelectorAll("p.text-red-600")
      .forEach((el) => el.classList.add("hidden"));
  }

  // Buttons that open the form
  document
    .querySelectorAll("#hero-btn, #cta-btn, #contact-btn, #contact-btn-mobile")
    .forEach((btn) => btn.addEventListener("click", openModal));

  closeBtn.addEventListener("click", () => formDiv.classList.add("hidden"));

  // Close modal on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") formDiv.classList.add("hidden");
  });

  // ==== FORM SUBMISSION & VALIDATION ====
  form.addEventListener("submit", (e) => {
    e.preventDefault();
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

    form.querySelectorAll("p.text-red-600").forEach((el) => {
      el.textContent = "";
      el.classList.add("hidden");
    });

    if (Object.keys(errors).length) {
      Object.entries(errors).forEach(([field, msg]) => {
        if (!msg) return;
        const input = form.querySelector(`[name="${field}"]`);
        const errorEl = input.parentElement.querySelector("p.text-red-600");
        if (errorEl) {
          errorEl.textContent = msg;
          errorEl.classList.remove("hidden");
        }
      });
      return;
    }

    form.classList.add("hidden");
    successMsg.classList.remove("hidden");
  });

  // ==== CURRENT YEAR ====
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // ==== COOKIE BANNER ====
  const overlay = document.getElementById("cookie-overlay");
  const acceptBtn = document.getElementById("accept-cookies");

  if (localStorage.getItem("cookiesAccepted") !== "true") {
    overlay.classList.remove("hidden");
  }

  acceptBtn.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true");
    overlay.classList.add("hidden");
  });

  //====Bar filling====

  const bars = document.querySelectorAll(".animate-progress");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const target = bar.getAttribute("data-width");
          bar.style.width = target; // animate the bar
          observer.unobserve(bar); // stop observing once animated
        }
      });
    },
    {
      threshold: 0.5, // trigger when 50% of the bar is visible
    }
  );

  bars.forEach((bar) => {
    observer.observe(bar);
  });
});
