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

// ========== Gallery Filters ==========

const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");

    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    galleryItems.forEach((item) => {
      const category = item.getAttribute("data-category");

      if (filter === "all" || category === filter) {
        item.style.display = "block";
        item.classList.add("fade-in");
      } else {
        item.style.display = "none";
        item.classList.remove("fade-in");
      }
    });
  });
});

// Smooth fade effect class
const style = document.createElement("style");
style.textContent = `
  .fade-in {
    animation: fadeIn 0.4s ease-in;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.98); }
    to { opacity: 1; transform: scale(1); }
  }
`;
document.head.appendChild(style);

// ========== Lightbox Modal ==========

const gallery = document.querySelector(".gallery-grid");
const modal = document.createElement("div");
modal.classList.add("lightbox");
modal.innerHTML = `
  <div class="lightbox-content">
    <img src="" alt="" class="lightbox-img" />
    <p class="lightbox-caption"></p>
    <button class="lightbox-close" aria-label="Close">&times;</button>
  </div>
`;
document.body.appendChild(modal);

const lightboxImg = modal.querySelector(".lightbox-img");
const lightboxCaption = modal.querySelector(".lightbox-caption");
const closeBtn = modal.querySelector(".lightbox-close");

gallery.addEventListener("click", (e) => {
  const item = e.target.closest(".gallery-item");
  if (!item) return;

  const img = item.querySelector("img");
  const caption = item.querySelector("h3")?.textContent || "";

  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = caption;

  modal.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("active");
});

// ========== Contact Form Validation ==========

const form = document.getElementById("contactForm");
const nameInput = form.querySelector("#name");
const emailInput = form.querySelector("#email");
const messageInput = form.querySelector("#message");

const nameError = form.querySelector("#nameError");
const emailError = form.querySelector("#emailError");
const messageError = form.querySelector("#messageError");
const successMsg = form.querySelector("#formSuccess");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let isValid = true;
  clearMessages();

  if (nameInput.value.trim().length < 2) {
    nameError.textContent = "Please enter your name";
    isValid = false;
  }

  if (!validateEmail(emailInput.value.trim())) {
    emailError.textContent = "Please enter a valid email";
    isValid = false;
  }

  if (messageInput.value.trim().length < 10) {
    messageError.textContent = "Message must be at least 10 characters";
    isValid = false;
  }

  if (isValid) {
    successMsg.textContent = "Thanks! Your message has been sent.";
    form.reset();
  }
});

function clearMessages() {
  nameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";
  successMsg.textContent = "";
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ========== GSAP Animations ==========

window.addEventListener("load", () => {
  // Animate call-to-action button
  gsap.from(".cta", {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.4,
    ease: "power2.out",
  });

  // Animate skill bars when #about is in view
  const skills = document.querySelectorAll(".skill .bar-fill");
  let skillsAnimated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !skillsAnimated) {
        skills.forEach((bar) => {
          const percentage = parseFloat(bar.dataset.percentage) * 100;
          bar.style.width = "0%";
          gsap.to(bar, {
            width: `${percentage}%`,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.2,
          });
        });
        skillsAnimated = true;
      }
    },
    { threshold: 0.4 }
  );

  const skillsSection = document.querySelector("#about");
  if (skillsSection) {
    observer.observe(skillsSection);
  }
});
