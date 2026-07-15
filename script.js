const modal = document.querySelector(".contact-modal");
const openers = document.querySelectorAll("[data-open-modal]");
const closeButton = document.querySelector(".close-modal");
const form = document.querySelector("#contact-form");
const success = document.querySelector(".form-success");
const cursorLight = document.querySelector(".cursor-light");
const animatedItems = document.querySelectorAll(
  ".section-space, .format-card, .shot, .photo-note, .steps li",
);

function openModal() {
  if (!modal.open) {
    modal.showModal();
    document.body.classList.add("modal-open");
  }
}

function closeModal() {
  modal.close();
  document.body.classList.remove("modal-open");
}

openers.forEach((button) => button.addEventListener("click", openModal));
closeButton.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

modal.addEventListener("close", () => {
  document.body.classList.remove("modal-open");
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  form.hidden = true;
  success.hidden = false;
});

window.addEventListener("pointermove", (event) => {
  if (!cursorLight) return;
  cursorLight.style.left = `${event.clientX}px`;
  cursorLight.style.top = `${event.clientY}px`;
});

if ("IntersectionObserver" in window) {
  animatedItems.forEach((item) => item.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
  );

  animatedItems.forEach((item) => observer.observe(item));
} else {
  animatedItems.forEach((item) => item.classList.add("is-visible"));
}

const previewParams = new URLSearchParams(window.location.search);
const previewSection = previewParams.get("preview");

if (previewSection) {
  window.addEventListener("load", () => {
    document.getElementById(previewSection)?.scrollIntoView({ block: "start" });
  });
}

if (previewParams.get("modal") === "1") {
  window.addEventListener("load", openModal);
}
