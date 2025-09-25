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
    .querySelectorAll(
      "#hero-btn, #cta-btn, #contact-btn, #contact-btn-mobile, #get-started, #get-growing, #get-selling"
    )
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

  //====Service shuffle cards====
  const cards = document.querySelectorAll(".package-card");

  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      // Reset all cards
      cards.forEach((c, i) => {
        c.style.zIndex = 10 + i;
        c.style.transform = "";
      });

      // Bring clicked card to front with scale animation
      card.style.zIndex = 50;
      card.style.transform = "scale(1.05)";
    });

    // Keyboard accessibility: focus brings card to front
    card.addEventListener("focus", () => {
      cards.forEach((c, i) => {
        c.style.zIndex = 10 + i;
        c.style.transform = "";
      });
      card.style.zIndex = 50;
      card.style.transform = "scale(1.05)";
    });
  });

  // ==== Code Background Typing Animation ====
  const codeBg = document.getElementById("code-bg");

  const codeLines = [
    "function buildWebsite() {",
    "  const client = 'Small or Medium Business';",
    "  const goal = 'Grow & scale';",
    "  const tools = ['HTML', 'CSS', 'JavaScript', 'TailwindCSS', 'WordPress', 'React', 'Wix', 'Webflow'];",
    "  console.log(`Building site for ${client} using ${tools.join(', ')}`);",
    "// SEO optimized, responsive on all devices and mobile friendly, performance focused and tailored for accessibility",
    "}",
  ];

  // Build a long single string of all lines joined by \n, repeated many times
  const longCode = Array(50).fill(codeLines.join("\n")).join("\n\n");

  // Typing variables
  let charIndex = 0;

  function typeForever() {
    codeBg.textContent = longCode.slice(0, charIndex);
    charIndex++;

    // If we've reached the bottom of the container, restart immediately
    if (
      charIndex >= longCode.length ||
      codeBg.scrollHeight > codeBg.offsetHeight * 1.1
    ) {
      codeBg.textContent = ""; // clear instantly
      charIndex = 0; // start again from top
    }

    setTimeout(typeForever, 20); // adjust typing speed here
  }

  typeForever();
});
