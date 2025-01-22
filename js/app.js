// ========== Theme Toggle ==========

const toggleBtn = document.getElementById("theme-toggle");
const root = document.documentElement;
const DARK_CLASS = "dark-mode";

// Apply saved theme on load
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    root.classList.add(DARK_CLASS);
  }
});

// Toggle theme on click
toggleBtn.addEventListener("click", () => {
  const isDark = root.classList.toggle(DARK_CLASS);
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
