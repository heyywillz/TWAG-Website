/**
 * contact.js — True Worshippers A/G
 * Handles: Toast notifications & contact form submission handler
 */

function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `px-4 py-3 rounded-none font-sora text-xs font-semibold text-white shadow-lg transition-opacity duration-200 opacity-0 flex items-center gap-2 pointer-events-auto ${
    type === "success" ? "bg-navy text-white border border-white/20" : "bg-red-900 text-white"
  }`;
  toast.innerHTML = `<i class="fa-solid ${type === "success" ? "fa-check text-gold" : "fa-circle-info"}"></i> <span>${message}</span>`;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove("opacity-0");
  });

  setTimeout(() => {
    toast.classList.add("opacity-0");
    setTimeout(() => toast.remove(), 200);
  }, 3000);
}

function handleContactSubmit(event) {
  event.preventDefault();
  const nameInput = document.getElementById("full-name");
  const name = nameInput ? nameInput.value : "there";
  showToast(`Thank you, ${name}! Your message has been sent to True Worshippers A/G.`);
  const form = document.getElementById("contact-form");
  if (form) form.reset();
}
