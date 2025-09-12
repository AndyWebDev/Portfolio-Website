// Grab DOM elements
const htmlEl = document.documentElement;
const toggleBtn = document.getElementById("themeToggle");
const iconSun = document.getElementById("iconSun");
const iconMoon = document.getElementById("iconMoon");

// Initialize icons based on saved preference
if (localStorage.theme === "dark") {
  htmlEl.classList.add("dark");
  iconSun.classList.add("hidden");
  iconMoon.classList.remove("hidden");
} else {
  htmlEl.classList.remove("dark");
  iconSun.classList.remove("hidden");
  iconMoon.classList.add("hidden");
}

// Toggle dark/light mode on button click
toggleBtn.addEventListener("click", () => {
  const isDark = htmlEl.classList.toggle("dark");
  localStorage.theme = isDark ? "dark" : "light";

  // Swap icons
  iconSun.classList.toggle("hidden", isDark);
  iconMoon.classList.toggle("hidden", !isDark);
});

// Toggle mobile menu

const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

// Toggle menu on hamburger click
menuToggle.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevent immediate close
  mobileMenu.classList.toggle("hidden");
});

// Close menu when a link/button is clicked
mobileMenu.querySelectorAll("a, button").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
});

// Close menu when clicking outside
document.addEventListener("click", (event) => {
  const isClickInsideMenu = mobileMenu.contains(event.target);
  const isClickOnToggle = menuToggle.contains(event.target);

  if (!isClickInsideMenu && !isClickOnToggle) {
    mobileMenu.classList.add("hidden");
  }
});

//-------------------- Contact form modal --------------------
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
  .forEach((btn) => btn.addEventListener("click", openModal));

closeBtn?.addEventListener("click", () => formDiv?.classList.add("hidden"));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") formDiv?.classList.add("hidden");
});

form?.addEventListener("submit", (e) => {
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
  if (!formData.email)
    errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ? null
      : "Enter a valid email address.";
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
      const errorEl = input?.parentElement.querySelector("p.text-red-600");
      if (errorEl) {
        errorEl.textContent = msg;
        errorEl.classList.remove("hidden");
      }
    });
    return;
  }

  form.classList.add("hidden");
  successMsg?.classList.remove("hidden");
});

const year = document.getElementById("year");
year.textContent = new Date().getFullYear();

const overlay = document.getElementById("cookie-overlay");
const banner = document.getElementById("cookie-banner");
const acceptBtn = document.getElementById("accept-cookies");

if (localStorage.getItem("cookiesAccepted") !== "true") {
  overlay.classList.remove("hidden");
}

acceptBtn.addEventListener("click", () => {
  localStorage.setItem("cookiesAccepted", "true");
  overlay.classList.add("hidden");
});
